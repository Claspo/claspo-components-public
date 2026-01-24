import SysPhoneInputManifest from "./SysPhoneInput.manifest";
import WcControlledElement from "@claspo/renderer/sdk/WcControlledElement";
import getStyleElement from "./getStyleElement";
import getTemplate from "./getTemplate";
import PhoneInputMenu from "./PhoneInputMenu";
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

  connectedCallback() {
    super.connectedCallback();

    this.getRootElement().innerHTML += `
      ${getStyleElement()}
      ${getTemplate()}
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
          || 'UA';
        const countriesPriority = props.control.countriesPriority || {
          includedList: [countryCode],
          allowToAddOnlyFromIncludedList: false,
        };
        this.availableOptions = this.getAvailableOptions(this.countryData.slice(), countriesPriority);

        const isRequired = this.getProps().control?.validation?.required || false;
        if (isRequired) {
          this.createPhoneInputFormControl();
        } else {
          inputElement.addEventListener('input', this.createPhoneInputFormControl);
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
      this.applyParams(next, env);

      this.setArrowIconStyles();
      this.updateContext();
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

    rootElement.querySelector('.phone-input-select-button').addEventListener('click', () => {
      if (!this.countryData || this.isUpdatingRenderMode()) {
        return;
      }

      waitForKeyboardHide(() => this.phoneInputMenu.createOverlay(this.availableOptions));
      setTimeout(() => {
        this.phoneInputMenu.focusSearchInput();
      }, 500);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.services.context.deleteRecord(this.getModel().id);
  }

  getValidators = () => {
    return [
      phone(),
    ];
  }

  addContextRecord = (phonePrefix) => {
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

  updateContext = () => {
    const componentModel = this.getModel();
    this.services.context.updateRecord(componentModel.id, {
      viewIndex: componentModel.path?.[0],
    });
  }

  requestCountryData = () => {
    return fetch(`${this.assets('json/country-code-options.json')}`)
      .then(response => response.json());
  }

  applyParams = (props, env) => {
    const rootElement = this.getRootElement();
    const inputSelectButtonElement = rootElement.querySelector('.phone-input-select-button');
    const inputElement = this.getInputElement();
    const inputElementOriginalPaddingLeft = props.adaptiveStyles[env].find(element => element.element === 'input').styleAttributes.paddingLeft || '10px';

    setStylesToElement(inputSelectButtonElement, { left: inputElementOriginalPaddingLeft });
    setStylesToElement(inputElement, {
      paddingLeft: `${parseFloat(inputElementOriginalPaddingLeft) + 51}px`,
    });
  }

  getInputElement = () => {
    const rootElement = this.getRootElement();
    return rootElement.querySelector('.phone-input');
  }

  setValue = (props, phone = null) => {
    const defaultCountryCode = this.services.state.getState().currentCountryCode
      || props.control.countryCode
      || 'UA';

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
    inputElement.value = phone || countryPrefix;

    if (this.services.form.hasControl(props.control.name)) {
      const control = this.services.form.getControl(props.control.name);
      control.setValue(phone || countryPrefix, { silent: true, skipValidation: true })
    }
  }

  getAvailableOptions = (allOptions, countriesPriority) => {
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

  sortOptionsByPriority = (allOptions, countriesPriority) => {
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

  setArrowIconStyles = () => {
    const inputTextColor = this.getElement('input').style.color;
    this.getRootElement().querySelector('.dropdown-icon').style.color = inputTextColor;
  }

  valueChangedCallback = (value) => {
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

  getCountryOptionByValue = (value) => {
    const valueWithCountryPrefix = value.startsWith('+') ? value : `+${value}`;
    return this.availableOptions.find(country => valueWithCountryPrefix.startsWith(country.prefix));
  }

  createPhoneInputFormControl = () => {
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
      this.valueChangedCallback(value);
    })
    inputElement.removeEventListener('input', this.createPhoneInputFormControl);
  }

  menuOptionSelected = (country) => {
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
