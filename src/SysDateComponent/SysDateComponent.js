import WcControlledElement from "@claspo/renderer/sdk/WcControlledElement";
import SysDateManifest from "./SysDate.manifest";
import { SysDateTranslationUtils } from "./SysDateTranslationUtils";
import { DateUtils } from "./DateUtils";
import getStyleElement from "./getStyleElement";
import getTemplate from "./getTemplate";
import getOverlayStyles from "./getOverlayStyles";
import FormControlEvents from "@claspo/renderer/form/FormControlEvents";
import waitForKeyboardHide from '@claspo/renderer/common/WaitForKeyboardHide';
import {
  applyInputLabelStyles,
  getStylesFromElement, setFocusOutline,
  setStylesToElement,
  getLabelParamsFromProps
} from '@claspo/renderer/sdk/HtmlStyleUtils';
import {
  createMenuOverlay,
  getMenuItemHoverColor,
  getOverlayBackgroundColor,
  getOverlayBorderRadius
} from '@claspo/renderer/sdk/OverlayUtils';
import { getTranslation } from '@claspo/renderer/sdk/TranslationUtils';
import { getPlaceholderColor } from '@claspo/renderer/sdk/ModelStyleUtils';
import { setInvalidStyle } from '@claspo/renderer/sdk/FormUtils';
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';

export default class SysDateComponent extends WcControlledElement {
  static define = {
    name: 'sys-date',
    model: SysDateManifest.name,
    manifest: SysDateManifest,
  };

  manifest = SysDateManifest;

  registeredControl;
  overlayBackdrop;

  DAY_PLACEHOLDER = SysDateTranslationUtils.DAY_PLACEHOLDER;
  MONTH_DROPDOWN_PLACEHOLDER = SysDateTranslationUtils.MONTH_DROPDOWN_PLACEHOLDER;
  YEAR_PLACEHOLDER = SysDateTranslationUtils.YEAR_PLACEHOLDER;
  validationErrorKeys = SysDateTranslationUtils.validationErrorKeys;

  dropdownMenuOptionLabelStyles = [
    'color',
    'font-family',
    'font-size',
    'letter-spacing',
    'text-shadow',
    'font-weight',
    'line-height',
    'text-align',
  ];

  overlayContentStyles = [
    'background',
    'border-style',
    'border-top-width',
    'border-top-color',
    'border-bottom-width',
    'border-bottom-color',
    'border-left-width',
    'border-left-color',
    'border-right-width',
    'border-right-color',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-left-radius',
    'border-bottom-right-radius',
  ];


  constructor() {
    super();
    this.getRootElement().innerHTML = `
     ${getStyleElement()}
      ${getTemplate()}
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const rootElement = this.getRootElement();
    const props = this.getProps();

    this.registerControl(rootElement);
    const dateValue = this.registeredControl?.value || null;

    this.setControlsOrder(rootElement);
    if (dateValue) {
      this.setStringDateValue(dateValue);

    } else {
      this.setPlaceholders(props, this.getEnvironment(), true);
    }

    this.observeProps((prev, next) => {
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);

      const env = this.getEnvironment();

      applyInputLabelStyles(next, env, rootElement, '.label-and-controls-container');
      this.setInputHostSize(next, env);
      this.applyControlsDisplayRules(next);
      this.setPlaceholders(next, env);
      this.setArrowIconStyles();
      setFocusOutline(this.getElement('input'), rootElement.querySelector('.label-and-controls-container'));
    });

    this.observeShared(() => {
      const props = this.getProps();
      const env = this.getEnvironment();
      this.setPlaceholders(props, env);
      this.setInputHostSize(props, env);
      this.setArrowIconStyles();
    });

    this.observeEnvironment((prev, next) => {
      const props = this.getProps();
      applyInputLabelStyles(props, next, rootElement, '.label-and-controls-container');
      this.setInputHostSize(props, next);
      this.setPlaceholders(props, next);
      this.setArrowIconStyles();
    });

    rootElement.querySelector('.month-dropdown-input').addEventListener('click', () => {
      waitForKeyboardHide(() => this.createOverlay());
    });
  }

  setControlsOrder = (rootElement) => {
    const widgetLanguage = this.getPreferredWidgetLanguage();
    const datePartsOrder = DateUtils.getDatePartsOrder(widgetLanguage);
    const {
      dayInputContainerElement,
      monthInputContainerElement,
      yearInputContainerElement,
    } = this.getControlElementNodes(rootElement);

    const inputsInRightOrder = [];
    inputsInRightOrder[datePartsOrder.indexOf('day')] = dayInputContainerElement;
    inputsInRightOrder[datePartsOrder.indexOf('month')] = monthInputContainerElement;
    inputsInRightOrder[datePartsOrder.indexOf('year')] = yearInputContainerElement;

    const inputsContainerElement = this.getRootElement().querySelector('.controls-container');
    insertHtmlIntoElement({
      element: inputsContainerElement,
      html: '',
    });
    inputsInRightOrder.forEach((element) => inputsContainerElement.appendChild(element));
  }

  setControlValueProxy = (value, params) => {
    let currentValue = this.getDateValueAsString();
    if (!currentValue && !value) {
      return;
    }

    if (!this.getProps().content.askYear) {
      currentValue = `-${currentValue}`; // Note: ISO 8601: If no year - date should display as e.g.: "--2-19" (for Feb 19)
    }

    return this.registeredControl.setValue(value ? value : currentValue, params);
  }

  dateValidation = () => {
    const rootElement = this.getRootElement();
    const currentValueAsDate = DateUtils.convertDashedStringDateIntoDate(this.getDateValueAsString());
    const currentValueAsString = this.getDateValueAsString();

    const { dayInputElement, yearInputElement } = this.getControlElementNodes(rootElement);

    const currentDayRawValue = dayInputElement.value;
    const currentDayValue = +dayInputElement.value;
    const currentMonthValue = +currentValueAsString.split('-')[1];
    const currentYearRawValue = yearInputElement.value;
    const currentYearValue = +yearInputElement.value;

    if (
      +currentDayRawValue < 0 ||
      isNaN(currentDayValue) ||
      currentDayRawValue === '0' ||
      (currentDayValue) && (currentDayValue > 31 || currentDayValue < 1)
    ) {
      return {
        isValid: false,
        errorKey: this.validationErrorKeys.DAY_INVALID_ERROR_TEXT
      }
    }

    if (
      +currentYearRawValue < 0 ||
      isNaN(currentYearValue) ||
      currentYearValue > 3000 ||
      currentYearValue < 0
    ) {
      return {
        isValid: false,
        errorKey: this.validationErrorKeys.YEAR_INVALID_ERROR_TEXT
      }
    }

    if (currentDayValue && currentMonthValue && (isNaN(currentValueAsDate.getTime()) || !this.isCurrentDateExist())) {
      return {
        isValid: false,
        errorKey: this.validationErrorKeys.DATE_INVALID_ERROR_TEXT
      }
    }

    if (
      !currentDayValue && !isNaN(currentDayValue) ||
      !currentMonthValue ||
      this.getProps().content.askYear && !currentYearRawValue
    ) {
      return {
        isValid: false,
        errorKey: this.validationErrorKeys.REQUIRED
      }
    }

    return {
      isValid: true
    };
  }

  isCurrentDateExist = () => {
    const currentValueAsString = this.getDateValueAsString();

    const currentDayValue = +currentValueAsString.split('-')[2];
    const currentMonthValue = +currentValueAsString.split('-')[1];
    const currentYearValue = +currentValueAsString.split('-')[0];

    const constructedDateFromInput = DateUtils.convertDashedStringDateIntoDate(currentValueAsString);

    return constructedDateFromInput.getDate() === currentDayValue &&
      constructedDateFromInput.getMonth() + 1 === currentMonthValue && // Note: +1 because getMonth() starts from 0: Jan - 0, Feb - 1
      constructedDateFromInput.getFullYear() === currentYearValue;
  }

  getDateValueAsString = () => {
    const root = this.getRootElement();

    let day = root.querySelector('#cl-day-input').value;
    let month = root.querySelector('#cl-month-dropdown').innerText;
    let year = root.querySelector('#cl-year-input').value;

    if (this.isMonthUnselected(month)) {
      month = null;
    }

    if (+day < 0) {
      day = '';
    }

    if (+year < 0) {
      year = '';
    }

    const widgetLanguage = this.getPreferredWidgetLanguage();
    const formattedMonth = DateUtils.convertToDoubleDigit(DateUtils.convertMonthToNumeric(month, widgetLanguage));

    return `${DateUtils.normalizeYearInput(year)}-${formattedMonth}-${DateUtils.convertToDoubleDigit(`${+day}`)}`;
  }

  setStringDateValue = (dateValue) => {
    const [year, month, day] = dateValue.split('-');
    const widgetLanguage = this.getPreferredWidgetLanguage();
    const root = this.getRootElement();

    root.querySelector('#cl-day-input').value = day;
    root.querySelector('#cl-month-dropdown').innerText = DateUtils.convertNumericToMonth(month, widgetLanguage);
    root.querySelector('#cl-year-input').value = +year;

    this.registeredControl.setValue(dateValue);
  }

  getOptions = () => {
    const options = {};

    DateUtils
      .getAllMonthsByLanguage('short', this.getPreferredWidgetLanguage())
      .forEach((monthName, i) =>
        options[`month-${i + 1}`] = {
          label: monthName,
          id: i,
        }
      );

    return options;
  }

  createDropdownButtonMenuComponent = (option, selected, optionLabelStyles, overlayBackgroundColor) => {
    const containerElement = document.createElement('div');
    containerElement.classList.add('option-wrapper');

    const labelElement = document.createElement('span');

    labelElement.textContent = option.label;
    setStylesToElement(labelElement, optionLabelStyles);

    if (selected) {
      containerElement.style.backgroundColor = getMenuItemHoverColor(overlayBackgroundColor);
    }

    containerElement.appendChild(labelElement);

    return containerElement;
  }

  getCurrentSelectedMonthValue = () => {
    let month = this.getRootElement().querySelector('#cl-month-dropdown').innerText;

    if (this.isMonthUnselected(month)) {
      return null;
    }

    return DateUtils.convertMonthToNumeric(month, this.getPreferredWidgetLanguage());
  }

  isMonthUnselected = (monthValue) => {
    return monthValue === this.getTranslationsMap(this.MONTH_DROPDOWN_PLACEHOLDER).translations;
  }

  createOverlayContent = (backdrop, overlayContentContainer) => {
    const control = this.services.form.getControl(this.getProps().control.name);
    const inputButton = this.getRootElement().querySelector('#cl-month-dropdown');
    const optionLabelStyles = getStylesFromElement(inputButton, this.dropdownMenuOptionLabelStyles);
    const overlayStyles = getStylesFromElement(inputButton, this.overlayContentStyles);
    overlayStyles.background = getOverlayBackgroundColor(overlayStyles.background, optionLabelStyles.color);
    const inputButtonHeight = getStylesFromElement(inputButton, ['height']).height;
    const overlayBorderRadius = getOverlayBorderRadius(inputButtonHeight, overlayStyles);
    setStylesToElement(overlayContentContainer, {
      ...overlayStyles,
      'border-top-left-radius': `${overlayBorderRadius}px`,
      'border-top-right-radius': `${overlayBorderRadius}px`,
      'border-bottom-left-radius': `${overlayBorderRadius}px`,
      'border-bottom-right-radius': `${overlayBorderRadius}px`,
    });
    const currentMonthNumber = this.getCurrentSelectedMonthValue();

    const options = this.getOptions();
    const buttonsList = document.createElement('div');

    Object.entries(options)
      .forEach(([id]) => {
        const option = options[id];
        const selected = `month-${currentMonthNumber}` === id;
        const menuButtonEl = this.createDropdownButtonMenuComponent(option, selected, optionLabelStyles, overlayStyles.background);

        menuButtonEl.addEventListener('click', () => {
          inputButton.textContent = option.label;
          backdrop.click();
          this.setControlValueProxy();
          control.emit('RUN_SINGLE_ELEMENT_VALIDATION', inputButton);
        });

        buttonsList.appendChild(menuButtonEl);
      });

    overlayContentContainer.appendChild(buttonsList);
  }

  createOverlay = () => {
    if (this.overlayBackdrop) {
      this.overlayBackdrop.click();
    }

    const result = createMenuOverlay({
      triggerElement: this.getRootElement().querySelector('#cl-month-dropdown'),
      overlayStyles: getOverlayStyles(
        this.getRootElement(),
        this.overlayContentStyles,
        this.dropdownMenuOptionLabelStyles,
      ),
      createOverlayContent: (backdrop, overlayContentContainer) => {
        this.createOverlayContent(backdrop, overlayContentContainer);
      },
      overlayWidth: this.getRootElement().querySelector('#cl-month-dropdown').getBoundingClientRect().width,
      onDestroy: () => { this.overlayBackdrop = null },
      htmlDocumentObject: this.htmlDocumentObject,
    });

    this.overlayBackdrop = result.backdrop;
  }

  applyControlsDisplayRules = (props) => {
    const rootElement = this.getRootElement();

    if (props.content.askYear) {
      rootElement.querySelector('.year-input-with-tooltip').style.display = 'block';
    } else {
      rootElement.querySelector('.year-input-with-tooltip').style.display = 'none';
    }
  }

  getControlElementNodes = (rootElement) => {
    const dayInputElement = rootElement.querySelector('#cl-day-input');
    const dayTooltipElement = rootElement.querySelector('.day-input-with-tooltip .input-tooltip');
    const dayInputContainerElement = rootElement.querySelector('.day-input-with-tooltip');

    const monthInputElement = rootElement.querySelector('#cl-month-dropdown');
    const monthTooltipElement = rootElement.querySelector('.month-dropdown-input .input-tooltip');
    const monthInputContainerElement = rootElement.querySelector('.month-dropdown-input');

    const yearInputElement = rootElement.querySelector('#cl-year-input');
    const yearTooltipElement = rootElement.querySelector('.year-input-with-tooltip .input-tooltip');
    const yearInputContainerElement = rootElement.querySelector('.year-input-with-tooltip');

    return {
      dayInputElement,
      dayTooltipElement,
      dayInputContainerElement,
      monthInputElement,
      monthTooltipElement,
      monthInputContainerElement,
      yearInputElement,
      yearTooltipElement,
      yearInputContainerElement,
    };
  }

  setPlaceholders = (props, env, force = false) => {
    if (
      (this.isUpdatingRenderMode())
      || force
    ) {
      this.setDayPlaceholder();
      this.setMonthPlaceholder();
      this.setYearPlaceholder();
      this.applyPlaceholdersColor(props, env);
    }
  }

  applyPlaceholdersColor = (props, env) => {
    const placeholderColor = getPlaceholderColor(props, env, this.getShared());

    this.getHostElement().style.setProperty('--cl-date-input-placeholder-color', placeholderColor);
  }

  setDayPlaceholder = () => {
    const inputNode = this.getRootElement().querySelector('#cl-day-input');

    if (!inputNode) {
      return;
    }

    inputNode.placeholder = this.getTranslationsMap(this.DAY_PLACEHOLDER).translations;
  }

  setMonthPlaceholder = () => {
    const inputNode = this.getRootElement().querySelector('#cl-month-dropdown');

    if (!inputNode) {
      return;
    }

    const placeholderValue = this.getTranslationsMap(this.MONTH_DROPDOWN_PLACEHOLDER).translations;
    const placeholderDiv = document.createElement('div');
    placeholderDiv.classList.add('dropdown-placeholder');
    placeholderDiv.style.color = 'var(--cl-date-input-placeholder-color)';
    placeholderDiv.textContent = placeholderValue;
    insertHtmlIntoElement({
      element: inputNode,
      html: '',
    });
    inputNode.appendChild(placeholderDiv);
  }

  setYearPlaceholder = () => {
    const inputNode = this.getRootElement().querySelector('#cl-year-input');

    if (!inputNode) {
      return;
    }

    inputNode.placeholder = this.getTranslationsMap(this.YEAR_PLACEHOLDER).translations;
  }

  getTranslatedKey = (keyName) => {
    return getTranslation(this.services.config, this.manifest.i18n, keyName);
  }

  setInvalidStyleToElement = (error, element, elementTooltip, elementToMatch) => {
    if (elementToMatch && element !== elementToMatch) {
      return;
    }

    setInvalidStyle(element, elementTooltip, error, this.htmlDocumentObject);
  }

  registerControl = (rootElement) => {
    const hostElement = this.getHostElement();
    const {
      dayInputElement,
      dayTooltipElement,
      monthInputElement,
      monthTooltipElement,
      yearInputElement,
      yearTooltipElement,
    } = this.getControlElementNodes(rootElement);

    const validationMap = {
      SYS_DATE: () => this.dateValidation(),
    }

    this.registeredControl = this.createControlWithValidation([], {
      element: hostElement,
      listenStatusChange: false,
      validationMap,
    });

    hostElement.addEventListener('input', (e) => {
      this.registeredControl.emit('RUN_SINGLE_ELEMENT_VALIDATION', e.composedPath()[0]);
      this.setControlValueProxy();
    });

    function isElementEmpty(element) {
      if (element === dayInputElement || element === yearInputElement) {
        return !element.value;
      }

      if (element === monthInputElement) {
        return this.isMonthUnselected(monthInputElement.textContent);
      }

      return false;
    }

    function validateSingleControlElement(element) {
      this.registeredControl.validate()
        .then(() => {
          const errorKeys = this.registeredControl.getErrorKeys();

          if (!errorKeys) {
            return;
          }

          let errorToDisplay = errorKeys[0];

          if (errorToDisplay === this.validationErrorKeys.REQUIRED && isElementEmpty.call(this, element)) {
            errorToDisplay = errorKeys[1] || errorKeys[0];
          }

          const translatedValue = this.getTranslatedKey(errorToDisplay);

          setInvalidStyle.call(this, translatedValue, errorToDisplay, false, element);
        });
    }

    function setValidStyles(isSetForAllElements, element) {
      if (element === dayInputElement) {
        return setValidDayInput.call(this);
      }

      if (element === monthInputElement) {
        return setValidMonthInput.call(this);
      }

      if (element === yearInputElement) {
        return setValidYearInput.call(this);
      }

      if (isSetForAllElements) {
        setValidDayInput.call(this);
        setValidMonthInput.call(this);
        setValidYearInput.call(this);
      }
    }

    function setValidDayInput() {
      if (dayInputElement.classList.contains('invalid')) {
        dayInputElement.classList.remove('invalid');
      }

      dayTooltipElement.style.visibility = 'hidden';
    }

    function setValidMonthInput() {
      if (monthInputElement.classList.contains('invalid')) {
        monthInputElement.classList.remove('invalid');
      }

      monthTooltipElement.style.visibility = 'hidden';
    }

    function setValidYearInput() {
      if (yearInputElement.classList.contains('invalid')) {
        yearInputElement.classList.remove('invalid');
      }

      yearTooltipElement.style.visibility = 'hidden';
    }

    function setInvalidStyle(error, errorKey, isWhileSubmitAttempt, element) {
      if (element) {
        setValidStyles.call(this, false, element);
      } else {
        setValidStyles.call(this, true);
      }

      if (errorKey === this.validationErrorKeys.YEAR_INVALID_ERROR_TEXT) {
        return this.setInvalidStyleToElement(error, yearInputElement, yearTooltipElement, element);
      }

      if (errorKey === this.validationErrorKeys.DAY_INVALID_ERROR_TEXT) {
        return this.setInvalidStyleToElement(error, dayInputElement, dayTooltipElement, element);
      }

      if (errorKey === this.validationErrorKeys.DATE_INVALID_ERROR_TEXT) {
        return this.setInvalidStyleToElement(error, dayInputElement, dayTooltipElement);
      }

      if (errorKey === this.validationErrorKeys.REQUIRED) {
        if (!dayInputElement.value && (element === dayInputElement || isWhileSubmitAttempt)) {
          this.setInvalidStyleToElement(error, dayInputElement, dayTooltipElement, element);
        }

        if (this.isMonthUnselected(monthInputElement.textContent) && (element === monthInputElement || isWhileSubmitAttempt)) {
          this.setInvalidStyleToElement(error, monthInputElement, monthTooltipElement, element);
        }

        if (!yearInputElement.value && (element === yearInputElement || isWhileSubmitAttempt)) {
          this.setInvalidStyleToElement(error, yearInputElement, yearTooltipElement, element);
        }
      }
    }

    function setPendingStyle() {
      monthTooltipElement.style.visibility = 'hidden';

      if (monthInputElement.classList.contains('invalid')) {
        monthInputElement.classList.remove('invalid');
      }
    }

    this.services.eventEmitter.on('INVALID_CONTACT_DATA_SUBMIT_ATTEMPT', () => {
      const errorKeys = this.registeredControl.getErrorKeys();

      if (errorKeys) {
        const translatedValue = this.getTranslatedKey(errorKeys[0]);
        setInvalidStyle.call(this, translatedValue, errorKeys[0], true);
      }
    });

    this.registeredControl.on('RUN_SINGLE_ELEMENT_VALIDATION', (el) => {
      validateSingleControlElement.call(this, el);
    });

    this.registeredControl.on(FormControlEvents.validationStatusChanged, (status) => {
      switch (status) {
        case 'valid':
          setValidStyles.call(this, true);
          break;

        case 'pending':
          setPendingStyle.call(this);
          break;
      }
    });
  }

  setArrowIconStyles = () => {
    const rootElement = this.getRootElement();

    rootElement
      .querySelector('.dropdown-input-select-button')
      .style.color = getPlaceholderColor(this.getProps(), this.getEnvironment(), this.getShared());
  }

  // other inputs have only one "input" element, but this component has 3.
  // When sync is on, each input has same size as singular input so host's size is inputSize * 3. Here is workaround
  setInputHostSize = (props, env) => {
    const styleAttributes = props.adaptiveStyles[env].find(element => element.element === 'input').styleAttributes;
    const hostElement = this.getHostElement();
    const inputElements = this.getRootElement().querySelectorAll('[cl-element="input"]');
    const labelElement = this.getElement('label');
    const labelParams = getLabelParamsFromProps(props, env);
    const labelHeight = labelElement && labelParams.enabled && labelParams.position === 'TOP'
      ? labelElement.getBoundingClientRect().height + labelParams.margin
      : 0;
    const hostHeight = `${parseFloat(styleAttributes.height) + labelHeight}px`;

    hostElement.style.width = styleAttributes.width;
    hostElement.style.minWidth = styleAttributes.minWidth;
    hostElement.style.height = hostHeight;
    hostElement.style.minHeight = hostHeight;

    inputElements.forEach(element => {
      element.style.width = '';
      element.style.minWidth = '';
      element.style.height = '';
      element.style.minHeight = '';
    });
  }

}
