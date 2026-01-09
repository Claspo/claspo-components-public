import WcElement from "@claspo/renderer/sdk/WcElement";

export default class SysBaseContainerComponent extends WcElement {
  manifest = {
    name: 'SysContainerComponent'
  };

  getComponentName = () => {
    return this.manifest.name;
  }

  connectedCallback() {
    super.connectedCallback();
    this.processStyles();

    this.observeProps((prev, next) => {
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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

