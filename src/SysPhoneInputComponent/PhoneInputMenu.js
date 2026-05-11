import getOverlayStyles from "./getOverlayStyles";
import debounce from "@claspo/common/async/debounce";
import { getTranslationsMap, getWidgetLanguages } from '@claspo/renderer/sdk/TranslationUtils';
import { getStylesFromElement, setStylesToElement } from '@claspo/renderer/sdk/HtmlStyleUtils';
import { createMenuOverlay, getMenuOverlayContentClassName, getOverlayBorderRadius } from '@claspo/renderer/sdk/OverlayUtils';
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';

export default class PhoneInputMenu {

  getRootElement = null;
  overlayElement = null;
  configService = null;
  stateService = null;
  valueChangedCallback = null;

  constructor(
    getRootElement,
    getElement,
    configService,
    stateService,
    valueChangedCallback,
    htmlDocumentObject,
  ) {
    this.getRootElement = getRootElement;
    this.getElement = getElement;
    this.configService = configService;
    this.stateService = stateService;
    this.valueChangedCallback = valueChangedCallback;
    this.htmlDocumentObject = htmlDocumentObject;
  }

  createOverlay(availableOptions, onDestroy) {
    const rootElement = this.getRootElement();
    createMenuOverlay({
      triggerElement: rootElement.querySelector('.phone-input-with-tooltip'),
      overlayStyles: getOverlayStyles(
        getMenuOverlayContentClassName(),
        this.configService.getConfig('staticResourcesUrl').replace(/\/$/, '') + '/SysPhoneInputComponent/assets/',
      ),
      createOverlayContent: (backdrop, overlayContentContainer) => {
        overlayContentContainer.setAttribute('role', 'listbox');
        this.createOverlayContent(rootElement, backdrop, overlayContentContainer, availableOptions);
        this.overlayElement = overlayContentContainer;
      },
      overlayWidth: 270,
      overlayHeight: 380,
      htmlDocumentObject: this.htmlDocumentObject,
      onDestroy,
    });
  }

  createOverlayContent(rootElement, backdrop, overlayContentContainer, availableOptions) {
    const currentCountryCode = this.stateService.getState().currentCountryCode;
    const buttonIcon = rootElement.querySelector('.phone-input-select-button-flag');

    const searchInputAvailable = availableOptions.length > 8;

    if (searchInputAvailable) {
      const searchInputContainer = document.createElement('div');
      searchInputContainer.classList.add('search-country-input-container');
      const searchInput = document.createElement('input');
      searchInput.classList.add('search-country-input');
      searchInput.addEventListener('input', (event) => onChangeValue(event.currentTarget.value));
      searchInputContainer.appendChild(this.getSearchIcon());
      searchInputContainer.appendChild(searchInput);
      overlayContentContainer.appendChild(searchInputContainer);
    }

    const inputElement = this.getElement('input');
    const inputStyles = getStylesFromElement(inputElement, [
      'height',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-left-radius',
      'border-bottom-right-radius',
    ]);
    const overlayBorderRadius = getOverlayBorderRadius(inputStyles.height, inputStyles);
    setStylesToElement(overlayContentContainer, {
      'border-top-left-radius': `${overlayBorderRadius}px`,
      'border-top-right-radius': `${overlayBorderRadius}px`,
      'border-bottom-left-radius': `${overlayBorderRadius}px`,
      'border-bottom-right-radius': `${overlayBorderRadius}px`,
    });

    let buttonsList;

    const onChangeValue = debounce((value) => {
      if (buttonsList) {
        buttonsList.remove();
      }

      const filteredOptions = this.filterOptions(value, availableOptions);

      buttonsList = document.createElement('div');
      setStylesToElement(buttonsList, { display: 'flex', flexDirection: 'column' });

      if (filteredOptions.length) {
        filteredOptions.forEach((country) => {
          const selected = currentCountryCode === country.countryCode;
          const menuButtonEl = this.createMenuButtonComponent(country, selected);

          menuButtonEl.addEventListener('click', () => {
            this.valueChangedCallback(country);
            buttonIcon.style.backgroundPositionY = `${country.position}px`;
            backdrop.click();
          });
          buttonsList.appendChild(menuButtonEl);
        });

      } else {
        buttonsList.appendChild(this.getNothingFoundComponent());
      }

      overlayContentContainer.appendChild(buttonsList);
    }, 100);

    onChangeValue('');
  }

  createMenuButtonComponent(country, selected) {
    const button = document.createElement('div');
    button.classList.add('option-wrapper');
    button.setAttribute('role', 'option');
    button.setAttribute('aria-selected', selected ? 'true' : 'false');
    const countryFlag = document.createElement('span');
    countryFlag.classList.add('phone-input-flag-icon');
    countryFlag.setAttribute('aria-hidden', 'true');
    const countryPrefix = document.createElement('span');
    countryPrefix.classList.add('phone-input-prefix');

    const labelElement = document.createElement('span');
    labelElement.textContent = getTranslationsMap(country.label, getWidgetLanguages(this.configService)).translations;
    labelElement.style.color = '#000';
    countryFlag.style.backgroundPositionY = `${country.position}px`;
    countryPrefix.textContent = country.prefix;

    if (selected) {
      button.style.backgroundColor = '#fafafa';
    }

    button.appendChild(countryFlag);
    button.appendChild(labelElement);
    button.appendChild(countryPrefix);

    return button;
  }

  getNothingFoundComponent() {
    const nothingFoundComponent = document.createElement('p');
    nothingFoundComponent.style.padding = '0 20px';
    nothingFoundComponent.textContent = 'Nothing found';
    return nothingFoundComponent;
  }

  filterOptions(value, options) {
    const searchString = value.trim().toLowerCase();

    if (!searchString) {
      return options;
    }

    return options.filter(option =>
      getTranslationsMap(option.label, getWidgetLanguages(this.configService))
        .translations
        .toLowerCase()
        .includes(searchString)
    );
  }

  getSearchIcon() {
    const iconContainer = document.createElement('div');
    insertHtmlIntoElement({
      element: iconContainer,
      html: `
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.005 14.9871C18.9001 12.2585 18.6317 8.48222 16.1997 6.05025C13.4661 3.31658 9.03392 3.31658 6.30025
         6.05025C3.56658 8.78392 3.56658 13.2161 6.30025 15.9497C8.73224 18.3817 12.5085 18.6501 15.2372
         16.7549L19.1369 20.6546L20.9046 18.8868L17.005 14.9871ZM14.7855 7.46447C16.7382 9.41709 16.7382 12.5829
         14.7855 14.5355C12.8329 16.4882 9.66709 16.4882 7.71447 14.5355C5.76184 12.5829
          5.76184 9.41709 7.71447 7.46447C9.66709 5.51184 12.8329 5.51184 14.7855 7.46447Z"
        fill="#5F5F5F"/>
    </svg>`,
      isSvg: true,
    });
    return iconContainer;
  }

  focusSearchInput() {
    this.overlayElement?.querySelector('.search-country-input')?.focus();
  }
}
