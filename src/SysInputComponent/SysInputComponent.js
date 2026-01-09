import SysInputComponentManifest from "./SysInput.manifest";
import WcControlledElement from "@claspo/renderer/sdk/WcControlledElement";
import getStyleElement from "./getStyleElement";
import InputFormControl from "./InputFormControl";
import { applyInputLabelStyles, setFocusOutline, setInputHostSize } from '@claspo/renderer/sdk/HtmlStyleUtils';

export default class SysInputComponent extends WcControlledElement {
  static define = {
    name: 'sys-input',
    model: SysInputComponentManifest.name,
    manifest: SysInputComponentManifest,
  };
  manifest = SysInputComponentManifest;

  inputFormControl = null;

  connectedCallback() {
    super.connectedCallback();

    this.getRootElement().innerHTML += `
      ${getStyleElement()}
      <div class="main-container">
        <div class="label-with-input-container">
          <div cl-element="label"
               cl-inline-edit="content, label"
               class="label">
          </div>
          <div class="input-with-tooltip">
            <input cl-element="input"
                   type="text"
                   name="fname">
            <div class="input-tooltip">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 13.0604C1.5 19.4116 6.6481 24.5605 13.0075 24.5605C19.353 24.5605 24.5 19.4107 24.5 13.0604C24.5 6.70865 19.3531 1.55909 13.0075 1.55908C6.64806 1.55908 1.5 6.7077 1.5 13.0604ZM12.9775 17.9668C12.7032 17.9668 12.4807 17.7443 12.4807 17.47C12.4807 17.1956 12.7032 16.9732 12.9775 16.9732C13.2519 16.9732 13.4743 17.1956 13.4743 17.47C13.4743 17.7443 13.2519 17.9668 12.9775 17.9668ZM12.9775 13.4764C12.7032 13.4764 12.4807 13.254 12.4807 12.9796L12.4807 8.48924C12.4807 8.21487 12.7032 7.99245 12.9775 7.99245C13.2519 7.99245 13.4743 8.21487 13.4743 8.48924L13.4743 12.9796C13.4743 13.254 13.2519 13.4764 12.9775 13.4764Z" fill="#FF0000" stroke="white" stroke-width="2"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `;

    this.inputFormControl = new InputFormControl(
      this.createControlWithValidation.bind(this),
      this.getModel.bind(this),
      this.getProps.bind(this),
      this.getRootElement.bind(this),
      this.services.form,
      this.services.config,
      this.manifest.i18n,
      this.htmlDocumentObject,
    );
    this.inputFormControl.init();

    this.observeProps((prev, next) => {
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);

      const env = this.getEnvironment();
      const inputElement = this.getElement('input');

      applyInputLabelStyles(next, env, this.getRootElement(), '.label-with-input-container');
      inputElement.setAttribute('placeholder', next.content.placeholder);
      setInputHostSize(next, env, this.getHostElement(), inputElement, this.getElement('label'));
      setFocusOutline(inputElement);
      this.updateContext();
    });

    this.observeEnvironment((prev, next) => {
      const props = this.getProps();

      applyInputLabelStyles(props, next, this.getRootElement(), '.label-with-input-container');
      setInputHostSize(props, next, this.getHostElement(), this.getElement('input'), this.getElement('label'));
    });

    this.addContextRecord();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.inputFormControl.destroy();
    this.services.context.deleteRecord(this.getModel().id);
  }
}
