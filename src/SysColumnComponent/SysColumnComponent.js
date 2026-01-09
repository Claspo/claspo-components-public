import SysColumnManifest from "./SysColumn.manifest";
import SysBaseContainerComponent from "../SysContainerComponent/SysBaseContainerComponent";
import { applySysAttrPrefix } from "@claspo/renderer/renderer/RenderConstants";


export default class SysColumnComponent extends SysBaseContainerComponent {
  static define = {
    name: 'sys-column',
    model: SysColumnManifest.name,
    manifest: SysColumnManifest
  };

  manifest = SysColumnManifest;

  connectedCallback() {
    super.connectedCallback();
    this.updateEmptyState();
    this.watchChildren();

    this.observeEnvironment(() => {
      this.updateResponsiveStyles();
    });
    this.observeProps((prev, next) => {
      this.updateResponsiveStyles();
      this.processSize(next.content?.size);
    });
    this.getParentComponent()?.observeProps(() => {
      this.updateResponsiveStyles();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();
  }

  updateResponsiveStyles = () => {
    const areColumnsResponsive = this.getParentComponent()?.getProps()?.isResponsive;
    const columnComponents = [...this.shadowRoot.children].filter(el => el.hasAttribute('cl-element'));

    const hostStyle = this.getHostElement().style;

    if (columnComponents.length) {
      hostStyle.minWidth = 'min-content';
    } else {
      const hasSomePadding = ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'padding']
        .map(prop => hostStyle[prop])
        .map(value => value && parseFloat(value))
        .some(Boolean);

      if (hasSomePadding) {
        hostStyle.minWidth = 'min-content';
      } {
        hostStyle.minWidth = '20px';
      }
    }

    if (this.getEnvironment() !== 'mobile' || !areColumnsResponsive) {
      return;
    }

    if (columnComponents.length) {
      hostStyle.minHeight = 'auto';
    } else if (hostStyle.background.includes('url')) {
      hostStyle.minHeight = '150px';
    } else if (!columnComponents.length) {
      hostStyle.minHeight = '50px';
    }

  }

  updateEmptyState = () => {
    const elements = Array
      .from(this.getRootElement().children)
      .filter(el => el.tagName !== 'STYLE' && el.tagName !== 'SCRIPT') || [];
    const isEmpty = !elements.length;

    this.setAttribute(applySysAttrPrefix('empty'), isEmpty);
  }

  watchChildren = () => {
    const self = this;
    this.mutationObserver = new MutationObserver(function () {
      self.updateEmptyState();
      self.updateResponsiveStyles();
    });
    this.mutationObserver.observe(this.getRootElement(), { childList: true });
  }

  processSize = (size) => {
    const sizeProperty = 'flexGrow';
    const sizeValue = size ?? this.style[sizeProperty] ?? '1';
    this.style[sizeProperty] = sizeValue;
  }

  processStyles = () => {
    this.innerHTML += `
      <style>
      [cl-component="${this.getComponentName()}"] {
        position: relative;
        min-width: 50px;
        min-height: 50px;
      }
      </style>`;
  }
}

