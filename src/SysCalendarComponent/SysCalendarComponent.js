import WcControlledElement from "@claspo/renderer/sdk/WcControlledElement";
import SysCalendarManifest from "./SysCalendar.manifest";
import getStyleElement from "./getStyleElement";
import getTemplate from "./getTemplate";
import { normalizeLanguage } from '@claspo/renderer/sdk/TranslationUtils';
import { applyInputLabelStyles, setFocusOutline, setInputHostSize } from '@claspo/renderer/sdk/HtmlStyleUtils';
import { getPlaceholderColor } from '@claspo/renderer/sdk/ModelStyleUtils';
import { getISODate } from './dateUtils';
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';

export default class SysCalendarComponent extends WcControlledElement {
  static define = {
    name: 'sys-calendar',
    model: SysCalendarManifest.name,
    manifest: SysCalendarManifest,
  };
  manifest = SysCalendarManifest;

  registeredControl;
  isCalendarDisplayed = false;
  DEFAULT_PLACEHOLDER_VALUE = {
    'en': 'Choose a date',
    'ru': 'Выберите дату',
    'uk': 'Оберіть дату',
    'es': 'Elige una fecha',
  };

  markCalendarDisplayFalseIfClickedOutsideListenerCb;
  markCalendarDisplayFalseListenerCb;
  closeCalendarOnEscapeIfItPresentListenerCb;

  constructor() {
    super();
    this.getRootElement().innerHTML = `
      ${getStyleElement()}
      ${getTemplate()}    
    `;
  }

  setPlaceholder = (props, env) => {
    this.setCalendarPlaceholder();
    this.applyPlaceholderColor(props, env);
  }

  applyPlaceholderColor = (props, env) => {
    const placeholderColor = getPlaceholderColor(props, env, this.getShared());

    this.getHostElement().style.setProperty('--cl-calendar-input-placeholder-color', placeholderColor);
  }

  setCalendarPlaceholder = () => {
    const placeholderNode = this.getRootElement().querySelector('.selected-date-value');
    const calendarValue = this.registeredControl.getValue();

    if (!placeholderNode || calendarValue) {
      return;
    }

    const placeholderValue = this.getTranslationsMap(this.DEFAULT_PLACEHOLDER_VALUE).translations;
    insertHtmlIntoElement({
      element: placeholderNode,
      html: `<span class="calendar-placeholder" style="color: var(--cl-calendar-input-placeholder-color)">${placeholderValue}</span>`,
    });
  }

  registerControl = (rootElement) => {
    const isInEditor = this.services.config.getConfig('entryModuleType') === 'UPDATING';

    if (isInEditor) {
      rootElement.querySelector('#cl-date-input').style.pointerEvents = 'none';
    }

    const dateInputElement = rootElement.querySelector('.input-ui-override');

    this.registeredControl = this.createControlWithValidation([], {
      element: this.getHostElement(),
    }, {
      elementToListen: dateInputElement,
    });
  }

  formatCurrentLocaleDate = (localeLang, date) => {
    const normalizedLanguage = normalizeLanguage(localeLang);
    const dateObj = date ? new Date(date + 'T00:00:00Z') : new Date();

    return new Intl.DateTimeFormat(normalizedLanguage, {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }).format(dateObj);
  }

  setTime = (rootElement, timeValue) => {
    const originalDateInput = rootElement.querySelector('#cl-date-input');

    originalDateInput.value = timeValue;
    originalDateInput.dispatchEvent(new Event('change'));

    this.registeredControl.setValue(timeValue);
  }

  setMinTimeRange = (rootElement) => {
    rootElement.querySelector('#cl-date-input').min = getISODate();
  }

  clearMinTimeRange = (rootElement) => {
    rootElement.querySelector('#cl-date-input').removeAttribute('min');
  }

  setUpdatedValueOnChange = (rootElement) => {
    const originalDateInput = rootElement.querySelector('#cl-date-input');

    originalDateInput.addEventListener('change', () => {
      this.registeredControl.setValue(originalDateInput.value || null);

      if (!originalDateInput.value) {
        this.setCalendarPlaceholder();
      } else {
        const widgetLanguage = this.getPreferredWidgetLanguage();
        rootElement.querySelector('.selected-date-value').textContent = this.formatCurrentLocaleDate(widgetLanguage, originalDateInput.value);
      }
    });
  }

  handleDateFocusOut = () => {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    if (isFirefox) {
      return;
    }

    this.markCalendarDisplayFalse();
  }

  markCalendarDisplayFalse = () => {
    this.isCalendarDisplayed = false;
  }

  addCalendarRelatedEventListeners = (rootElement) => {
    const dateInput = rootElement.querySelector('#cl-date-input');
    const isInEditor = this.services.config.getConfig('entryModuleType') === 'UPDATING';

    if (isInEditor) {
      return;
    }

    this.removeListeners();

    dateInput.addEventListener('click', (e) => this.showCalendarProgrammatically(e));
    dateInput.addEventListener('change', () => this.closeNativeCalendarProgrammatically());
    dateInput.addEventListener('focusout', () => this.handleDateFocusOut());

    this.markCalendarDisplayFalseIfClickedOutsideListenerCb = (e) => this.markCalendarDisplayFalseIfClickedOutside(e);
    this.markCalendarDisplayFalseListenerCb = () => this.markCalendarDisplayFalse();
    this.closeCalendarOnEscapeIfItPresentListenerCb = (e) => this.closeCalendarOnEscapeIfItPresent(e);

    window.addEventListener('click', this.markCalendarDisplayFalseIfClickedOutsideListenerCb);
    window.addEventListener('mousewheel', this.markCalendarDisplayFalseListenerCb);
    window.addEventListener('keyup', this.closeCalendarOnEscapeIfItPresentListenerCb, true);
  }

  markCalendarDisplayFalseIfClickedOutside = (event) => {
    const isClickOnCalendarInput = event.composedPath()[0] && event.composedPath()[0].id === 'cl-date-input';
    this.isCalendarDisplayed = isClickOnCalendarInput;
  }

  showCalendarProgrammatically = (event) => {
    if (event.target?.showPicker) {
      try {
        event.target.showPicker(); // Firefox hack (does not open native calendar without this call)
      } catch (e) {
        return;
      }
      this.isCalendarDisplayed = true;
    }
  }

  closeCalendarOnEscapeIfItPresent = (event) => {
    if (event.key === 'Escape' && this.isCalendarDisplayed) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.closeNativeCalendarProgrammatically();
    }
  }

  closeNativeCalendarProgrammatically = () => {
    const rootElement = this.getRootElement();
    const dateInput = rootElement.querySelector('#cl-date-input');

    // Note: There is no hidePicker function for native date calendar, so following hack is used
    dateInput.setAttribute('type', 'text');
    dateInput.setAttribute('type', 'date');

    this.isCalendarDisplayed = false;
  }

  removeListeners = () => {
    window.removeEventListener('click', this.markCalendarDisplayFalseIfClickedOutsideListenerCb);
    window.removeEventListener('mousewheel', this.markCalendarDisplayFalseListenerCb);
    window.removeEventListener('keyup', this.closeCalendarOnEscapeIfItPresentListenerCb, true);
  }

  setCalendarIconStyles = () => {
    const inputTextColor = this.getElement('input').style.color;
    this.getRootElement().querySelector('.calendar-icon').style.color = inputTextColor;
  }

  connectedCallback() {
    super.connectedCallback();

    const rootElement = this.getRootElement();
    const props = this.getProps();

    this.registerControl(rootElement);
    let calendarValue = this.registeredControl.value || getISODate();

    this.isCalendarDisplayed = false;

    this.setUpdatedValueOnChange(rootElement);
    this.setTime(rootElement, calendarValue);

    this.addCalendarRelatedEventListeners(rootElement);

    this.observeProps((prev, next) => {
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);

      const env = this.getEnvironment();

      applyInputLabelStyles(next, env, rootElement, '.label-and-controls-container');
      setInputHostSize(next, env, this.getHostElement(), this.getElement('input'), this.getElement('label'));
      setFocusOutline(this.getElement('input'));

      if (props.content.onlyInFuture) {
        this.setMinTimeRange(rootElement);
      } else {
        this.clearMinTimeRange(rootElement);
      }

      this.setPlaceholder(this.getProps(), this.getEnvironment());
      this.setCalendarIconStyles();
    });

    this.observeShared(() => {
      this.setPlaceholder(this.getProps(), this.getEnvironment());
      this.setCalendarIconStyles();
    });

    this.observeEnvironment((prev, next) => {
      const props = this.getProps();
      applyInputLabelStyles(props, next, rootElement, '.label-and-controls-container');
      setInputHostSize(props, next, this.getHostElement(), this.getElement('input'), this.getElement('label'));
      this.setPlaceholder(props, next);
      this.setCalendarIconStyles();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeListeners();
  }

}
