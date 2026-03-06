import WcElement from "@claspo/renderer/sdk/WcElement";

import SysSlideManifest from "./SysSlide.manifest";


export default class SysSlideComponent extends WcElement {
  static define = {
    name: 'sys-slide',
    model: SysSlideManifest.name,
    manifest: SysSlideManifest,
  };

  manifest = SysSlideManifest;


  constructor() {
    super();
    this.getRootElement().innerHTML = `
      <style>
        :host {
          position: relative;
          flex: 0 0 100%;
          min-width: 20px;
          min-height: 20px;
        }
      </style>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.observeProps((prev, next) => {
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);
    })
  }

}
