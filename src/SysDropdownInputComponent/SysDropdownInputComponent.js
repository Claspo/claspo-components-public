import WcControlledElement from "@claspo/renderer/sdk/WcControlledElement";

import SysDropdownManifest from "./SysDropdown.manifest";
import DefaultPlaceholderValue from "./defaultPlaceholderValue";
import OverlayContentStyles from "./overlayContentStyles";
import DropdownMenuOptionLabelStyles from "./dropdownMenuOptionLabelStyles";
import ComponentStyle from "./componentStyle";
import ComponentTemplate from "./componentTemplate";
import { sort } from "@claspo/common/utils/objectSort";
import waitForKeyboardHide from '@claspo/renderer/common/WaitForKeyboardHide';
import noMatchesOption from "./noMatchesOptionTranslations";
import selectOptionTranslations from "./selectOptionTranslations";
import {
  applyInputLabelStyles,
  getStylesFromElement, setFocusOutline, setInputHostSize,
  setStylesToElement
} from '@claspo/renderer/sdk/HtmlStyleUtils';
import {
  createMenuOverlay,
  getMenuItemHoverColor,
  getMenuOverlayContentClassName,
  getOverlayBackgroundColor
} from '@claspo/renderer/sdk/OverlayUtils';
import { getPlaceholderColor } from '@claspo/renderer/sdk/ModelStyleUtils';

export default class SysDropdownInputComponent extends WcControlledElement {
  static define = {
    name: 'sys-dropdown-input',
    model: SysDropdownManifest.name,
    manifest: SysDropdownManifest,
  };
  manifest = SysDropdownManifest;

  static DEFAULT_PLACEHOLDER_VALUE = DefaultPlaceholderValue;
  static NO_MATCHES_OPTION = noMatchesOption;
  static SELECT_OPTION = selectOptionTranslations;
  static overlayContentStyles = OverlayContentStyles;
  static dropdownMenuOptionLabelStyles = DropdownMenuOptionLabelStyles;
  static componentStyle = ComponentStyle;
  static componentTemplate = ComponentTemplate;
  registeredControl;
  overlayBackdrop;
  enableSearchOptionsCount = 5;

  constructor() {
    super();

    this.getRootElement().innerHTML = `
      <style id="cl-dropdown-styles">${SysDropdownInputComponent.componentStyle()}</style>
      ${SysDropdownInputComponent.componentTemplate}
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const rootElement = this.getRootElement();
    const props = this.getProps();

    this.registerControl(rootElement);

    this.setPlaceholder(props, this.getEnvironment());
    this.setDropdownInputText(this.getOptions());

    this.applyTriggerAriaLabel();

    this.observeProps((prev, next) => {
      const env = this.getEnvironment();
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);
      applyInputLabelStyles(next, env, rootElement, '.label-with-dropdown-input-container');
      setInputHostSize(next, env, this.getHostElement(), this.getElement('input'), this.getElement('label'));

      this.setPlaceholder(next, env);
      this.setDropdownInputText(this.getOptions());

      this.setArrowIconStyles(next, env);
      setFocusOutline(this.getElement('input'));
      this.getElement('input').setAttribute('aria-required', String(!!next.control?.validation?.required));
    });

    this.observeShared(() => {
      this.setPlaceholder(this.getProps(), this.getEnvironment());
      this.setArrowIconStyles(this.getProps(), this.getEnvironment());
    });

    this.observeEnvironment((prev, next) => {
      const props = this.getProps();
      applyInputLabelStyles(props, next, rootElement, '.label-with-dropdown-input-container');
      setInputHostSize(props, next, this.getHostElement(), this.getElement('input'), this.getElement('label'));
      this.setPlaceholder(props, next);
      this.setArrowIconStyles(props, next);
    });

    rootElement.querySelector('.dropdown-input-with-tooltip').addEventListener('click', () => {
      waitForKeyboardHide(() => this.createOverlay(this.getOptions()));
    });

    this.configInputEventListeners();
  };

  registerControl(rootElement) {
    this.registeredControl = this.createControlWithValidation();
  }

  getOptions(search = '') {
    const orderProperty = this.getProps().control.optionsAlphabeticSort?.enabled ? 'label' : 'sort';
    return sort(
      this.filterOptionsBySearchValue(this.getProps().control.options, search),
      orderProperty
    );
  }

  filterOptionsBySearchValue(options, search) {
    if (!search.trim()) {
      return options;
    }

    const searchValue = search.trim().toLowerCase();
    let filteredOptions = [];

    if (searchValue.length === 1) {
      filteredOptions = Object.entries(options)
        .filter(([id, option]) => {
          return option.label[0].toLowerCase() === searchValue;
        });

      if (!filteredOptions.length) {
        filteredOptions = Object.entries(options)
          .filter(([id, option]) => {
            return option.label.toLowerCase().includes(searchValue);
          });
      }

    } else {
      filteredOptions = Object.entries(options)
        .filter(([id, option]) => {
          return option.label.toLowerCase().includes(searchValue);
        });
    }

    return Object.fromEntries(filteredOptions);
  }

  createDropdownButtonMenuButtonComponent(option, selected, optionLabelStyles, overlayBackgroundColor) {
    const containerElement = document.createElement('div');
    containerElement.classList.add('option-wrapper');
    containerElement.setAttribute('role', 'option');
    containerElement.setAttribute('aria-selected', selected ? 'true' : 'false');
    if (option.id != null) {
      containerElement.id = `cl-dropdown-option-${option.id}`;
    }

    const labelElement = document.createElement('span');

    labelElement.textContent = option.label;
    setStylesToElement(labelElement, optionLabelStyles);

    if (selected) {
      containerElement.style.backgroundColor = getMenuItemHoverColor(overlayBackgroundColor);
    }

    containerElement.appendChild(labelElement);

    return containerElement;
  }

  setDropdownInputText(options) {
    const inputElement = this.getElement('input');
    const value = this.registeredControl?.getValue() || null;
    let selectedOption;
    if (options.hasOwnProperty(value?.id)) {
      selectedOption = options[value.id];
    }

    inputElement.value = selectedOption ? selectedOption.label : '';
  }

  createOverlayContent(backdrop, overlayContentContainer, filteredOptions, allOptions) {
    const inputElement = this.getElement('input');
    const optionLabelStyles = getStylesFromElement(inputElement, SysDropdownInputComponent.dropdownMenuOptionLabelStyles);
    const overlayStyles = getStylesFromElement(inputElement, SysDropdownInputComponent.overlayContentStyles);
    overlayStyles.background = getOverlayBackgroundColor(overlayStyles.background, optionLabelStyles.color);

    const overlayBorderRadius = 4;
    setStylesToElement(overlayContentContainer, {
      ...overlayStyles,
      'border-top-left-radius': `${overlayBorderRadius}px`,
      'border-top-right-radius': `${overlayBorderRadius}px`,
      'border-bottom-left-radius': `${overlayBorderRadius}px`,
      'border-bottom-right-radius': `${overlayBorderRadius}px`,
    });

    const value = this.registeredControl?.getValue() || null;

    const buttonsList = document.createElement('div');

    let selectedOptionId = null;
    Object.entries(filteredOptions)
      .forEach(([id]) => {
        const option = filteredOptions[id];
        const selected = value?.id === id;
        if (selected) {
          selectedOptionId = id;
        }
        const menuButtonEl = this.createDropdownButtonMenuButtonComponent(option, selected, optionLabelStyles, overlayStyles.background);
        menuButtonEl.addEventListener('click', () => {
          const value = { id, exportId: filteredOptions[id].exportId };

          this.registeredControl.setValue(value);
          inputElement.value = option.label;
          inputElement.dispatchEvent(new Event('input', { bubbles: true }));
          inputElement.dispatchEvent(new Event('change', { bubbles: true }));

          backdrop.click();
          inputElement.focus();
        });
        buttonsList.appendChild(menuButtonEl);
      });

    if (selectedOptionId != null) {
      inputElement.setAttribute('aria-activedescendant', `cl-dropdown-option-${selectedOptionId}`);
    } else {
      inputElement.removeAttribute('aria-activedescendant');
    }

    const optionsLength = Object.keys(filteredOptions).length;
    if (!optionsLength) {
      const noMatchesOption = {
        exportId: null,
        id: null,
        sort: 0,
        label: this.getTranslationsMap(SysDropdownInputComponent.NO_MATCHES_OPTION).translations,
      };
      const noMatchesElement = this.createDropdownButtonMenuButtonComponent(noMatchesOption, false, optionLabelStyles, overlayStyles.background);
      buttonsList.appendChild(noMatchesElement);
    }

    overlayContentContainer.appendChild(buttonsList);

    const allOptionsLength = Object.keys(allOptions).length;
    if (allOptionsLength > optionsLength) {
      const missingOptionsHeight = Object.keys(allOptions)
        .filter(optionId => !filteredOptions.hasOwnProperty(optionId))
        .reduce((height, optionId) => {
          const missingOption = allOptions[optionId];

          const missingMenuButtonEl = this.createDropdownButtonMenuButtonComponent(missingOption, false, optionLabelStyles, overlayStyles.background);
          missingMenuButtonEl.style.visibility = 'hidden';

          buttonsList.appendChild(missingMenuButtonEl);

          const missingMenuButtonElHeight = parseFloat(missingMenuButtonEl.getBoundingClientRect().height);
          buttonsList.removeChild(missingMenuButtonEl);

          return height + missingMenuButtonElHeight;
        }, 0);

      setStylesToElement(overlayContentContainer, {
        'margin-bottom': `${missingOptionsHeight}px`,
      });
    }
  }

  getOverlayStyles() {
    const overlayContentClassName = getMenuOverlayContentClassName();
    const inputElement = this.getElement('input');
    const backgroundColor = getOverlayBackgroundColor(
      getStylesFromElement(inputElement, SysDropdownInputComponent.overlayContentStyles).background,
      getStylesFromElement(inputElement, SysDropdownInputComponent.dropdownMenuOptionLabelStyles).color,
    );

    return `
            .${overlayContentClassName} {
              max-height: 380px;
              box-shadow: 0 1px 5px rgba(0, 0, 0, 0.28);
              border-radius: 4px;
              padding: 5px 0;
              overflow: auto;
              background-color: #fff;
              display: flex;
              flex-direction: column;
            }
            
            .${overlayContentClassName}::-webkit-scrollbar {
              width: 6px;
              height: 6px;
              background-color: transparent;
            }
            
            .${overlayContentClassName}::-webkit-scrollbar-thumb {
              border-radius: 6px;
              background-color: #848484;
            }
            
            .option-wrapper {
              border: 0;
              align-items: center;
              font-size: 16px;
              padding: 10px 20px;
              outline: 0;
              cursor: pointer;
              text-align: left;
            }
            
            .option-wrapper:hover {
              background-color: ${getMenuItemHoverColor(backgroundColor)};
            }
        `;
  }

  createOverlay(options) {
    if (this.overlayBackdrop) {
      this.overlayBackdrop.click();
    }
    const triggerElement = this.getElement('input');
    triggerElement.setAttribute('aria-expanded', 'true');
    const result = createMenuOverlay({
      triggerElement,
      overlayStyles: this.getOverlayStyles(),
      createOverlayContent: (backdrop, overlayContentContainer) => {
        overlayContentContainer.setAttribute('role', 'listbox');
        this.createOverlayContent(backdrop, overlayContentContainer, options, this.getProps().control.options);
      },
      overlayWidth: triggerElement.getBoundingClientRect().width,
      onDestroy: () => {
        this.overlayBackdrop = null;
        triggerElement.setAttribute('aria-expanded', 'false');
        triggerElement.removeAttribute('aria-activedescendant');
      },
      positionByDefault: 'bottom',
      htmlDocumentObject: this.htmlDocumentObject,
    });
    this.overlayBackdrop = result.backdrop;
    this.overlayBackdrop.addEventListener('click', (e) => {
      if (e.isTrusted) {
        this.setDropdownInputText(options);
      }
    });
  }

  applyTriggerAriaLabel() {
    const inputElement = this.getElement('input');
    if (!inputElement) {
      return;
    }
    if (!inputElement.hasAttribute('aria-label')) {
      const ariaLabel = this.getTranslationsMap(SysDropdownInputComponent.SELECT_OPTION).translations;
      inputElement.setAttribute('aria-label', ariaLabel);
    }
  }

  setPlaceholder(props, env) {
    const dropdownInputElement = this.getElement('input');
    const placeholderColor = getPlaceholderColor(props, env, this.getShared());

    const stylesElement = this.getRootElement().querySelector('#cl-dropdown-styles');
    stylesElement.textContent = SysDropdownInputComponent.componentStyle({ placeholderColor });

    const placeholderValue = props.content.placeholder
      || this.getTranslationsMap(SysDropdownInputComponent.DEFAULT_PLACEHOLDER_VALUE).translations;
    dropdownInputElement.setAttribute('placeholder', placeholderValue);
  }

  setArrowIconStyles(props, env) {
    const rootElement = this.getRootElement();

    const placeholderColor = getPlaceholderColor(props, env, this.getShared());
    const dropdownInputSelectButtonElement = rootElement.querySelector('.dropdown-input-select-button');

    if (dropdownInputSelectButtonElement) {
      dropdownInputSelectButtonElement.style.color = placeholderColor;
    }
  }

  configInputEventListeners() {
    const inputElement = this.getElement('input');
    if (Object.values(this.getOptions()).length < this.enableSearchOptionsCount) {
      inputElement.setAttribute('readonly', 'readonly');

    } else {
      inputElement.addEventListener('input', ({ target }) => {
        waitForKeyboardHide(() => this.createOverlay(this.getOptions(target.value)));
      });
    }
  }
}
