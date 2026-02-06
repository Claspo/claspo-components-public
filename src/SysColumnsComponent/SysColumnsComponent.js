import SysColumnsManifest from "./SysColumns.manifest";
import WcElement from "@claspo/renderer/sdk/WcElement";
import getStyleElement from "./getStyleElement";
import { applySysAttrPrefix } from "@claspo/renderer/renderer/RenderConstants";
import MobileDeviceOrientationListener from "@claspo/renderer/renderer/style/MobileDeviceOrientationListener";

export default class SysColumnsComponent extends WcElement {
  static define = {
    name: 'sys-columns',
    model: SysColumnsManifest.name,
    manifest: SysColumnsManifest
  };

  manifest = SysColumnsManifest;

  constructor() {
    super();
    this.getRootElement().innerHTML = `
      ${getStyleElement()}
      <div ${applySysAttrPrefix('render-outlet')} class="columns-container"></div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.observeProps((prev, next) => {
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);
      this.updateResponsiveStyles();
    });

    this.observeEnvironment((_, env) => {
      this.updateResponsiveStyles();
    });

    this.subscriptions.push(
      this.mobileDeviceOrientationListener.on(MobileDeviceOrientationListener.changeEventName, () => {
        this.updateResponsiveStyles();
      })
    );
  };

  updateResponsiveStyles() {
    if (this.getProps().isResponsive && this.getEnvironment() === 'mobile' && this.mobileDeviceOrientationListener.isPortrait()) {
      this.getRootElement().querySelector('.columns-container').style.flexDirection = 'column';
    } else {
      this.getRootElement().querySelector('.columns-container').style.flexDirection = 'row';
    }
  }
}

