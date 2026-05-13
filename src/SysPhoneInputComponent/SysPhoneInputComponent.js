import SysPhoneInputManifest from "./SysPhoneInput.manifest";
import WcControlledElement from "@claspo/renderer/sdk/WcControlledElement";
import getStyleElement from "./getStyleElement";
import getTemplate from "./getTemplate";
import PhoneInputMenu from "./PhoneInputMenu";
import selectCountryCodeTranslations from "./selectCountryCodeTranslations";
import waitForKeyboardHide from '@claspo/renderer/common/WaitForKeyboardHide';
import { phone } from "./validators/phone";
import {applyInputLabelStyles, setFocusOutline, setInputHostSize, setStylesToElement} from '@claspo/renderer/sdk/HtmlStyleUtils';

export default class SysPhoneInputComponent extends WcControlledElement {
  static define = {
    name: 'sys-phone-input',
    model: SysPhoneInputManifest.name,
    manifest: SysPhoneInputManifest,
  };
  manifest = SysPhoneInputManifest;

  countryData = null;
  registeredControl = null;
  countryCodeSelectedAtLeastOnce = false;
  availableOptions = [];
  defaultCountryCode = 'US';
  openSelectMenu = null;
  handleSelectButtonKeydown = null;

  connectedCallback() {
    super.connectedCallback();

    const selectCountryLabel = this.getTranslationsMap(selectCountryCodeTranslations).translations;
    this.getRootElement().innerHTML += `
      ${getStyleElement()}
      ${getTemplate({selectCountryLabel})}
    `;

    const rootElement = this.getRootElement();
    const inputElement = this.getInputElement();
    const flagButtonElement = rootElement.querySelector('.phone-input-select-button-flag');
    flagButtonElement.style.opacity = '0';
    flagButtonElement.style.backgroundImage = `url(${this.assets('img/flags.png')})`;

    this.requestCountryData()
      .then(data => {
        const props = this.getProps();
        this.countryData = data;
        const countryCode = this.services.state.getState().currentCountryCode
          || props.control.countryCode
          || this.defaultCountryCode;
        const countriesPriority = props.control.countriesPriority || {
          includedList: [countryCode],
          allowToAddOnlyFromIncludedList: false,
        };
        this.availableOptions = this.getAvailableOptions(this.countryData.slice(), countriesPriority);

        const isRequired = this.getProps().control?.validation?.required || false;
        if (isRequired) {
          this.createPhoneInputFormControl();
        } else {
          this.createPhoneInputFormControlHandler = () => this.createPhoneInputFormControl();
          inputElement.addEventListener('input', this.createPhoneInputFormControlHandler);
        }
  
        this.setValue(props, props.control.defaultValue || null);

        this.phoneInputMenu = new PhoneInputMenu(
          this.getRootElement.bind(this),
          this.getElement.bind(this),
          this.services.config,
          this.services.state,
          this.menuOptionSelected.bind(this),
          this.htmlDocumentObject,
        );

        const defaultCountryCodeOption = data.find(option => option.countryCode === countryCode);
        this.addContextRecord(defaultCountryCodeOption?.prefix || '+380');
      })
      .catch(error => {
        console.error('SysPhoneInputComponent: could not load country data', error);
        this.addContextRecord('+1');
      });

    this.observeProps((prev, next) => {
      const env = this.getEnvironment();

      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);
      applyInputLabelStyles(next, env, rootElement, '.label-with-input-container');
      setInputHostSize(next, env, this.getHostElement(), this.getElement('input'), this.getElement('label'));
      setFocusOutline(this.getElement('input'));
      this.getElement('input').setAttribute('aria-required', String(!!next.control?.validation?.required));
      this.applyParams(next, env);

      this.setArrowIconStyles();
      this.updateContext();

      if (this.countryData) {
        const prevControl = prev?.control || {};
        const nextControl = next.control || {};
        const countryCodeChanged = prevControl.countryCode !== nextControl.countryCode;

        if (countryCodeChanged) {
          const countryCode = nextControl.countryCode || this.defaultCountryCode;
          const newCountryData = this.countryData.find(c => c.countryCode === countryCode);
          this.services.state.setState({ currentCountryCode: countryCode });
          this.setValue(next, newCountryData?.prefix);
        }
      }
    });

    this.observeEnvironment((prev, next) => {
      const props = this.getProps();
      this.applyParams(props, next);
      applyInputLabelStyles(props, next, rootElement, '.label-with-input-container');
      setInputHostSize(props, next, this.getHostElement(), this.getElement('input'), this.getElement('label'));
      this.setArrowIconStyles();
    });

    this.observeShared(() => {
      this.applyParams(this.getProps(), this.getEnvironment());
      this.setArrowIconStyles();
    });

    const selectButtonElement = rootElement.querySelector('.phone-input-select-button');
    this.openSelectMenu = (navigationHint = 'selected') => {
      if (!this.countryData || this.isUpdatingRenderMode()) {
        return;
      }

      selectButtonElement.setAttribute('aria-expanded', 'true');
      waitForKeyboardHide(() => this.phoneInputMenu.createOverlay(this.availableOptions, () => {
        selectButtonElement.setAttribute('aria-expanded', 'false');
      }, { navigationHint }));
      setTimeout(() => {
        this.phoneInputMenu.focusSearchInput();
      }, 0);
    };

    this.handleSelectButtonKeydown = (event) => {
      const isMenuOpen = this.phoneInputMenu?.isOpen();

      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          if (isMenuOpen) {
            this.phoneInputMenu.selectActiveOption();
          } else {
            this.openSelectMenu();
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (isMenuOpen) {
            this.phoneInputMenu.moveActiveOption(1);
          } else {
            this.openSelectMenu('first');
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (isMenuOpen) {
            this.phoneInputMenu.moveActiveOption(-1);
          } else {
            this.openSelectMenu('last');
          }
          break;
        case ' ':
        case 'Spacebar':
          event.preventDefault();
          if (isMenuOpen) {
            this.phoneInputMenu.selectActiveOption();
          } else {
            this.openSelectMenu();
          }
          break;
        case 'Home':
          if (isMenuOpen) {
            event.preventDefault();
            this.phoneInputMenu.setActiveOption(0);
          }
          break;
        case 'End':
          if (isMenuOpen) {
            event.preventDefault();
            this.phoneInputMenu.setActiveOption(this.availableOptions.length - 1);
          }
          break;
        case 'Escape':
          if (isMenuOpen) {
            event.preventDefault();
            event.stopPropagation?.();
            this.phoneInputMenu.armEscapeKeyupGuard();
            this.phoneInputMenu.closeOverlay();
          }
          break;
      }
    };

    selectButtonElement.addEventListener('click', () => this.openSelectMenu());
    selectButtonElement.addEventListener('keydown', this.handleSelectButtonKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.services.context.deleteRecord(this.getModel().id);
    this.phoneInputMenu?.removeEscapeKeyupGuard?.();
    const selectButtonElement = this.getRootElement().querySelector('.phone-input-select-button');
    selectButtonElement?.removeEventListener('keydown', this.handleSelectButtonKeydown);
  }

  getValidators() {
    return [
      phone(),
    ];
  }

  addContextRecord(phonePrefix) {
    const componentModel = this.getModel();
    this.services.context.addRecord(componentModel.id, {
      recordKey: componentModel.id,
      id: componentModel.props.control.name,
      label: 'PHONE',
      value: componentModel.props.control.defaultValue || '',
      viewIndex: componentModel.path?.[0],
      sourceId: 'FORM',
      initialData: {
        fallbackValue: '',
        exampleValue: `${phonePrefix}6402577610`,
      },
    });
  }

  updateContext() {
    const componentModel = this.getModel();
    this.services.context.updateRecord(componentModel.id, {
      viewIndex: componentModel.path?.[0],
    });
  }

  requestCountryData() {
    return fetch(`${this.assets('json/country-code-options.json')}`)
      .then(response => response.json());
  }

  applyParams(props, env) {
    const rootElement = this.getRootElement();
    const inputSelectButtonElement = rootElement.querySelector('.phone-input-select-button');
    const inputElement = this.getInputElement();
    const inputElementOriginalPaddingLeft = props.adaptiveStyles[env].find(element => element.element === 'input').styleAttributes.paddingLeft || '10px';

    setStylesToElement(inputSelectButtonElement, { left: inputElementOriginalPaddingLeft });
    setStylesToElement(inputElement, {
      paddingLeft: `${parseFloat(inputElementOriginalPaddingLeft) + 51}px`,
    });
  }

  getInputElement() {
    const rootElement = this.getRootElement();
    return rootElement.querySelector('.phone-input');
  }

  setValue(props, phone = null) {
    const defaultCountryCode = this.services.state.getState().currentCountryCode
      || props.control.countryCode
      || this.defaultCountryCode;

    this.services.state.setState({
      currentCountryCode: defaultCountryCode
    });

    const defaultCountryData = this.countryData.find((c) => c.countryCode === defaultCountryCode);
    const defaultCountry = {
      position: '-2721px',
      prefix: '+380',
    }

    const rootElement = this.getRootElement();
    const inputElement = this.getInputElement();
    const flagButtonElement = rootElement.querySelector('.phone-input-select-button-flag');
    const countryPrefix = defaultCountryData
      ? defaultCountryData.prefix || defaultCountry.prefix
      : defaultCountry.prefix;

    flagButtonElement.style.backgroundPositionY = defaultCountryData
      ? `${defaultCountryData.position}px` || defaultCountry.position
      : defaultCountry.position;
    flagButtonElement.style.opacity = '1';

    const formControl = this.services.form.hasControl(props.control.name)
      ? this.services.form.getControl(props.control.name)
      : null;
    const valueToUse = phone || formControl?.getValue() || countryPrefix;

    inputElement.value = valueToUse;

    if (formControl) {
      formControl.setValue(valueToUse, { silent: true, skipValidation: true });
    }
  }

  getAvailableOptions(allOptions, countriesPriority) {
    if (countriesPriority.allowToAddOnlyFromIncludedList) {
      allOptions = countriesPriority.includedList.map(countryCode => {
        const option = allOptions.find(data => data.countryCode === countryCode);

        if (!option) {
          throw new Error(`SysPhoneInputComponent: could not found ${countryCode} in options array`);
        }

        return option;
      });
    }

    return this.sortOptionsByPriority(allOptions, countriesPriority);
  }

  sortOptionsByPriority(allOptions, countriesPriority) {
    countriesPriority.includedList.reverse().forEach(countryCode => {
      const optionIndex = allOptions.findIndex(option => option.countryCode === countryCode);

      if (optionIndex === -1) {
        throw new Error(`SysPhoneInputComponent: could not found ${countryCode} in options array`);
      }

      const option = allOptions[optionIndex];

      allOptions.splice(optionIndex, 1);
      allOptions.unshift(option);
    });

    return allOptions;
  }

  setArrowIconStyles() {
    const inputTextColor = this.getElement('input').style.color;
    this.getRootElement().querySelector('.dropdown-icon').style.color = inputTextColor;
  }

  valueChangedCallback(value) {
    if (this.countryCodeSelectedAtLeastOnce || !this.countryData) {
      return;
    }

    const matchedCountry = this.getCountryOptionByValue(value);

    if (!matchedCountry) {
      return;
    }

    const selectedCountryCode = this.services.state.getState().currentCountryCode;

    if (matchedCountry.countryCode !== selectedCountryCode) {
      this.services.state.setState({
        currentCountryCode: matchedCountry.countryCode
      });

      const buttonIcon = this.getRootElement().querySelector('.phone-input-select-button-flag');
      buttonIcon.style.backgroundPositionY = `${matchedCountry.position}px`;
    }
  }

  getCountryOptionByValue(value) {
    const valueWithCountryPrefix = value.startsWith('+') ? value : `+${value}`;
    return this.availableOptions.find(country => valueWithCountryPrefix.startsWith(country.prefix));
  }

  createPhoneInputFormControl() {
    const rootElement = this.getRootElement();
    const inputElement = this.getInputElement();
    const asyncLoaderElement = rootElement.querySelector('.phone-input-asyncLoader');
    this.phoneInputFormControl = this.createControlWithValidation(
      this.getValidators(),
      {
        validCallback: () => asyncLoaderElement.style.visibility = 'hidden',
        invalidCallback: () => asyncLoaderElement.style.visibility = 'hidden',
        pendingCallback: () => asyncLoaderElement.style.visibility = 'visible',
      }
    );
    this.phoneInputFormControl.on('valueChanged', (value) => {
      this.valueChangedCallback((value || '').trim());
    })
    if (this.createPhoneInputFormControlHandler) {
      inputElement.removeEventListener('input', this.createPhoneInputFormControlHandler);
    }
  }

  menuOptionSelected(country) {
    if (!this.phoneInputFormControl) {
      this.createPhoneInputFormControl();
    }

    this.phoneInputFormControl.setValue(country.prefix);
    this.countryCodeSelectedAtLeastOnce = true;
    this.services.state.setState({
      currentCountryCode: country.countryCode
    });
  }
}
