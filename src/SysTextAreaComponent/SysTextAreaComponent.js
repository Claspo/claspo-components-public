import WcControlledElement from "@claspo/renderer/sdk/WcControlledElement";
import textAreaStyles from "./textAreaStyles";
import SysTextAreaManifest from "./SysTextArea.manifest";
import { applyInputLabelStyles, setFocusOutline, setInputHostSize } from '@claspo/renderer/sdk/HtmlStyleUtils';
import { maxLength } from "./validators/maxLength";

export default class SysTextAreaComponent extends WcControlledElement {
  static define = {
    name: 'sys-text-area',
    model: SysTextAreaManifest.name,
    manifest: SysTextAreaManifest,
  };

  manifest = SysTextAreaManifest;

  constructor(props) {
    super(props);
    this.getRootElement().innerHTML = `
    <style>${textAreaStyles}</style>
    <div class="main-container">
      <div class="label-with-input-container">
        <div cl-element="label"
             cl-inline-edit="content, label"
             class="label"
             id="cl-textarea-label">
        </div>
        <div class="input-with-tooltip">
          <textarea cl-element="input" name="fname" aria-labelledby="cl-textarea-label"></textarea>
          <div class="input-tooltip" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M1.5 13.0604C1.5 19.4116 6.6481 24.5605 13.0075 24.5605C19.353 24.5605 24.5 19.4107 24.5 13.0604C24.5 6.70865 19.3531 1.55909 13.0075 1.55908C6.64806 1.55908 1.5 6.7077 1.5 13.0604ZM12.9775 17.9668C12.7032 17.9668 12.4807 17.7443 12.4807 17.47C12.4807 17.1956 12.7032 16.9732 12.9775 16.9732C13.2519 16.9732 13.4743 17.1956 13.4743 17.47C13.4743 17.7443 13.2519 17.9668 12.9775 17.9668ZM12.9775 13.4764C12.7032 13.4764 12.4807 13.254 12.4807 12.9796L12.4807 8.48924C12.4807 8.21487 12.7032 7.99245 12.9775 7.99245C13.2519 7.99245 13.4743 8.21487 13.4743 8.48924L13.4743 12.9796C13.4743 13.254 13.2519 13.4764 12.9775 13.4764Z" fill="#FF0000" stroke="white" stroke-width="2"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
   `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.observeProps((prev, next) => {
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);

      const env = this.getEnvironment();

      applyInputLabelStyles(next, env, this.getRootElement(), '.label-with-input-container');
      setInputHostSize(next, env, this.getHostElement(), this.getElement('input'), this.getElement('label'));
      setFocusOutline(this.getElement('input'));
      this.applyParams(next, env);
    });

    this.observeEnvironment((prev, next) => {
      const props = this.getProps();

      applyInputLabelStyles(props, next, this.getRootElement(), '.label-with-input-container');
      setInputHostSize(props, next, this.getHostElement(), this.getElement('input'), this.getElement('label'));
      this.applyParams(props, next);
    });

    const rootElement = this.getRootElement();
    const inputElement = rootElement.querySelector('textarea');

    this.registeredControl = this.createControlWithValidation([
      maxLength(5000),
    ],
      {
        element: inputElement,
      }
    );
    inputElement.value = this.registeredControl.value || '';
  }

  applyParams(props, env) {
    const rootElement = this.getRootElement();
    const textAreaElement = rootElement.querySelector('textarea');
    textAreaElement.setAttribute('placeholder', props.content.placeholder);
    textAreaElement.setAttribute('aria-required', String(!!props.control?.validation?.required));
  }

}
