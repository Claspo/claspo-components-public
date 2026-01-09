import InputValidators from "./inputValidators";
import { EmailSuggesting } from "./EmailSuggesting";
import { getTranslationsMap, getWidgetLanguages } from '@claspo/renderer/sdk/TranslationUtils';

export default class InputFormControl {

  getModel = null;
  getProps = null;
  getRootElement = null;
  formService = null;
  configService = null;
  utils = null;
  emailSuggesting = new EmailSuggesting();
  i18n = null;
  forbiddenChar = '';

  constructor(
    controlFactory,
    getModel,
    getProps,
    getRootElement,
    formService,
    configService,
    i18n,
    htmlDocumentObject,
  ) {
    this.controlFactory = controlFactory;
    this.componentId = getModel().id;
    this.getProps = getProps;
    this.getModel = getModel;
    this.getRootElement = getRootElement;
    this.formService = formService;
    this.configService = configService;
    this.i18n = i18n;
    this.htmlDocumentObject = htmlDocumentObject;
  }

  init() {
    const props = this.getProps();

    const rootElement = this.getRootElement();
    const tooltipElement = rootElement.querySelector('.input-tooltip');
    const inputElement = rootElement.querySelector('input');

    if (props.control.name === 'first_name') {
      inputElement.setAttribute('name', 'name');
      inputElement.setAttribute('autocomplete', 'off');
    }

    if (props.control.name === 'email') {
      inputElement.setAttribute('name', 'email');
      inputElement.setAttribute('autocomplete', 'on');
    }

    const validationMap = {
      ...Object
        .keys(InputValidators.validationMap)
        .reduce((acc, key) => {
          acc[key] = (...args) => {
            const result = InputValidators.validationMap[key](...args);

            if (result.forbiddenChar !== undefined) {
              this.forbiddenChar = result.forbiddenChar;
            }

            return result;
          };
          return acc;
        }, {}),
        EMAIL: (value) => InputValidators.validationMap.EMAIL(value, this.getProps()),
    }

    const control = this.controlFactory([], {
      validationMap,
      validCallback: () => {
        if (props.control.name === 'email' && rootElement.activeElement !== inputElement) {
          this.suggestEmailFix(inputElement, control, true);
        }
      },
      errorMessageMapper: (firstErrorKey, translatedValue) => {
        if (firstErrorKey === InputValidators.validationErrorKeys.CONTAINS_FORBIDDEN_CHARACTERS) {
          return translatedValue.replace('{{characters}}', this.forbiddenChar);
        } else {
          return translatedValue;
        }
      },
    });

    if (props.control.name === 'email') {
      this.listenForEmailValueChanges(control);
      this.suggestEmailFixOnFocusOut(inputElement, control);
    }
  }

  destroy() {
    this.emailSuggesting.hideEmailSuggestion();
  }

  listenForEmailValueChanges(control) {
    control.on('valueChanged', value => {
      this.emailSuggesting.emailValueChanged();
      this.emailSuggesting.hideEmailSuggestion();
      this.formatEmailValue(value, control);
    });
  }

  formatEmailValue(value, control) {
    const formattedValue = value.trim().toLowerCase();

    if (formattedValue !== value) {
      control.setValue(value.trim().toLowerCase());
    }
  }

  suggestEmailFixOnFocusOut(inputElement, control) {
    inputElement.addEventListener('focusout', () => this.suggestEmailFix(inputElement, control));
  }

  suggestEmailFix(inputElement, control, shouldSkipLastEmailSuggestionCheck) {
    this.emailSuggesting.suggestEmail(
      this.getProps(),
      inputElement,
      shouldSkipLastEmailSuggestionCheck,
      this.formService,
      control,
      this.getCurrentLanguageMap.bind(this),
      this.htmlDocumentObject,
    );
  }

  getCurrentLanguageMap() {
    return getTranslationsMap(this.i18n, getWidgetLanguages(this.configService)).translations;
  }
}
