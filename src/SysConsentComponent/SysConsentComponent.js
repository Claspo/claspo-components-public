import SysConsentComponentManifest from "./SysConsent.manifest";
import WcControlledElement from "@claspo/renderer/sdk/WcControlledElement";
import getStyleElement from "./getStyleElement";
import deprecatedCheckboxVariablesMap from "@claspo/renderer/backward-compatibility/deprecatedCheckboxVariablesMap";
import { setFocusOutline } from '@claspo/renderer/sdk/HtmlStyleUtils';
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';

export default class SysConsentComponent extends WcControlledElement {
  static define = {
    name: 'sys-consent',
    model: SysConsentComponentManifest.name,
    manifest: SysConsentComponentManifest,
  };
  manifest = SysConsentComponentManifest;

  defaultCheckmarkStyleAttributes = {
    inputSize: "22px",
    inputToTextGapSize: "13px",
    selectedBackground: "rgb(255,255,255)",
    defaultBackground: "rgb(255,255,255)",
    backdropFilter: "none",
  };

  connectedCallback() {
    super.connectedCallback();

    this.getRootElement().innerHTML += `
      ${getStyleElement()}
      <div class="main-container">
        <div class="label-with-input-container">
          <div class="input-with-tooltip">
            <label class="checkmark-container">
              <input type="checkbox"
                     name="fname">
              <span cl-element="input" class="checkmark"></span>
            </label>
            <div class="input-tooltip">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 13.0604C1.5 19.4116 6.6481 24.5605 13.0075 24.5605C19.353 24.5605 24.5 19.4107 24.5 13.0604C24.5 6.70865 19.3531 1.55909 13.0075 1.55908C6.64806 1.55908 1.5 6.7077 1.5 13.0604ZM12.9775 17.9668C12.7032 17.9668 12.4807 17.7443 12.4807 17.47C12.4807 17.1956 12.7032 16.9732 12.9775 16.9732C13.2519 16.9732 13.4743 17.1956 13.4743 17.47C13.4743 17.7443 13.2519 17.9668 12.9775 17.9668ZM12.9775 13.4764C12.7032 13.4764 12.4807 13.254 12.4807 12.9796L12.4807 8.48924C12.4807 8.21487 12.7032 7.99245 12.9775 7.99245C13.2519 7.99245 13.4743 8.21487 13.4743 8.48924L13.4743 12.9796C13.4743 13.254 13.2519 13.4764 12.9775 13.4764Z" fill="#FF0000" stroke="white" stroke-width="2"></path>
              </svg>
            </div>
            <div cl-element="label"
                 cl-inline-edit="content, label"
                 class="label">
            </div>
          </div>
        </div>
      </div>
    `;

    const rootElement = this.getRootElement();
    const checkMark = rootElement.querySelector('.checkmark');

    const control = this.createControlWithValidation([], {
      element: rootElement.querySelector('input'),
      validCallback: () => {
        if (checkMark.classList.contains('invalid')) {
          checkMark.classList.remove('invalid');
        }
      },
      invalidCallback: () => {
        if (!checkMark.classList.contains('invalid')) {
          checkMark.classList.add('invalid');
        }
      },
    });
    control.on('valueChanged', (value) => {
      this.updateCheckmark(value)
    });
    this.updateCheckmark(!!control.getValue());

    this.observeProps((prev, next) => {
      this.applyAutoAdaptiveStyles(next.adaptiveStyles);

      const labelElement = this.getRootElement().querySelector('.label');
      insertHtmlIntoElement({
        element: labelElement,
        html: next.content.label,
      });
      this.registerLabelControl(next.content.label);

      this.setStylesVariables(this.getHostElement());

      const checkboxContainer = this.getRootElement().querySelector('.checkmark-container');
      checkboxContainer.style.width = this.getCheckmarkStyleAttributes('inputSize');
      checkboxContainer.style.height = this.getCheckmarkStyleAttributes('inputSize');

      setFocusOutline(this.getElement('input'));
    });
  };

  updateCheckmark = (value) => {
    const rootElement = this.getRootElement();
    const checkMark = rootElement.querySelector('.checkmark');
    let background;

    if (value) {
      checkMark.classList.add('checkmark-checked');
      background = this.getCheckmarkStyleAttributes('selectedBackground');
    } else {
      checkMark.classList.remove('checkmark-checked');
      background = this.getCheckmarkStyleAttributes('defaultBackground');
    }
    checkMark.style.background = `${background}`;
    checkMark.style['backdrop-filter'] = this.getCheckmarkStyleAttributes('backdropFilter');
  }

  getInputAdaptiveStyles = () => {
    const props = this.getProps();
    const env = this.getEnvironment();
    return props.adaptiveStyles[env].filter(item => item.element === 'input');
  };

  getCheckmarkStyleAttributes = (key) => {
    const inputAdaptiveStyles = this.getInputAdaptiveStyles();

    if (inputAdaptiveStyles.length && inputAdaptiveStyles[0].markerStyleAttributes) {
      return key ? inputAdaptiveStyles[0].markerStyleAttributes[key] : inputAdaptiveStyles[0].markerStyleAttributes;
    }

    if (inputAdaptiveStyles.length && inputAdaptiveStyles[0].checkmarkStyleAttributes) { // Older widgets backward compatibility
      if (key) {
        return inputAdaptiveStyles[0].checkmarkStyleAttributes[key];
      } else {
        if (
          inputAdaptiveStyles[0].checkmarkStyleAttributes.checkboxSize ||
          inputAdaptiveStyles[0].checkmarkStyleAttributes.inputSize
        ) {
          return inputAdaptiveStyles[0].checkmarkStyleAttributes;
        } else {
          return {
            inputSize: "22px",
            inputToTextGapSize: "16px",
            ...inputAdaptiveStyles[0].checkmarkStyleAttributes,
          }
        }
      }
    }

    return key ? this.defaultCheckmarkStyleAttributes[key] : this.defaultCheckmarkStyleAttributes;
  };

  registerLabelControl = (value) => {
    const props = this.getProps();
    const controlName = `${props.control.name}_label`;

    if (!this.services.form.hasControl(controlName)) {
      const config = { name: controlName, defaultValue: value };
      this.services.form.registerControl({ ...config, componentId: this.getModel().id, viewIdx: this.getModel().path[0] }, null);
    }
  };

  setStylesVariables = (element) => {
    const markerStyleAttributes = this.getCheckmarkStyleAttributes();
    Object.keys(markerStyleAttributes)
      .forEach(key => {
        const upToDateKey = deprecatedCheckboxVariablesMap.get(key) || key;
        element.style.setProperty(`--${upToDateKey}`, markerStyleAttributes[key]);
      });
  };
}
