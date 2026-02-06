import SysContainerManifest from "./SysContainer.manifest";
import SysBaseContainerComponent from "./SysBaseContainerComponent";
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';


export default class SysContainerComponent extends SysBaseContainerComponent {
  static define = {
    name: 'sys-container',
    model: SysContainerManifest.name,
    manifest: SysContainerManifest
  };

  manifest = SysContainerManifest;


  connectedCallback() {
    super.connectedCallback();
    this.appendResponsiveStyles();


    this.observeProps((_, next) => {
      if (next.isResponsive) {
        this.updateResponsiveRules(this.getResponsiveStyleElement());
      }
    });

    if (this.getProps().isResponsive) {
      this.connectResizeObserver();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  connectResizeObserver() {
    this.resizeObserver = new ResizeObserver((entries) => {

      for (const entry of entries) {

        if (entry.contentRect) {
          this.updateResponsiveRules(this.getResponsiveStyleElement());

        }
      }

    });
    this.resizeObserver.observe(this.getWidgetContainerNode());
  }

  updateResponsiveRules(styleElement) {
    if (!this.getProps().isResponsive) {
      insertHtmlIntoElement({
        element: styleElement,
        html: '',
      });
      return;
    }

    const parentNode = this.getWidgetContainerNode();
    const {width, height} = parentNode.getBoundingClientRect();

    if (height / width > 1.6) {
      styleElement.innerHTML = `[cl-component="${this.getComponentName()}"] {flex-direction: column !important;}`;
    } else {
      styleElement.innerHTML = `[cl-component="${this.getComponentName()}"] {flex-direction: row !important;}`;

    }

  }


  getResponsiveStyleElement() {
    return [...this.children]
      .find(child => child.getAttribute('name') === 'responsive-styles');
  }


  appendResponsiveStyles() {
    this.innerHTML += `<style name="responsive-styles">
      [cl-component="${this.getComponentName()}"] {}
    </style>`;
  }
}

