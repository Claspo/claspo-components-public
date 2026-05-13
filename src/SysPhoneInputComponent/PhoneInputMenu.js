import getOverlayStyles from "./getOverlayStyles";
import debounce from "@claspo/common/async/debounce";
import { getTranslationsMap, getWidgetLanguages } from '@claspo/renderer/sdk/TranslationUtils';
import { getStylesFromElement, setStylesToElement } from '@claspo/renderer/sdk/HtmlStyleUtils';
import { createMenuOverlay, getMenuOverlayContentClassName, getOverlayBorderRadius } from '@claspo/renderer/sdk/OverlayUtils';
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';

export default class PhoneInputMenu {

  getRootElement = null;
  overlayElement = null;
  overlayBackdrop = null;
  configService = null;
  stateService = null;
  valueChangedCallback = null;
  overlayOptions = [];
  activeOptionIndex = -1;
  searchInputElement = null;
  triggerElement = null;
  listboxId = `cl-phone-input-listbox-${Math.random().toString(36).slice(2, 11)}`;
  navigationHint = 'selected';
  boundEscapeKeyupGuard = null;

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

  createOverlay(availableOptions, onDestroy, { navigationHint = 'selected' } = {}) {
    const rootElement = this.getRootElement();
    this.triggerElement = rootElement.querySelector('.phone-input-select-button');
    this.navigationHint = navigationHint;

    if (this.overlayBackdrop) {
      this.closeOverlay(false);
    }

    const result = createMenuOverlay({
      triggerElement: rootElement.querySelector('.phone-input-with-tooltip'),
      overlayStyles: getOverlayStyles(
        getMenuOverlayContentClassName(),
        this.configService.getConfig('staticResourcesUrl').replace(/\/$/, '') + '/SysPhoneInputComponent/assets/',
      ),
      createOverlayContent: (backdrop, overlayContentContainer) => {
        overlayContentContainer.setAttribute('role', 'listbox');
        overlayContentContainer.id = this.listboxId;
        this.createOverlayContent(rootElement, backdrop, overlayContentContainer, availableOptions);
        this.overlayElement = overlayContentContainer;
      },
      overlayWidth: 270,
      overlayHeight: 380,
      htmlDocumentObject: this.htmlDocumentObject,
      onDestroy: () => {
        this.overlayElement = null;
        this.overlayBackdrop = null;
        this.overlayOptions = [];
        this.activeOptionIndex = -1;
        this.searchInputElement = null;
        this.triggerElement?.removeAttribute('aria-controls');
        this.triggerElement?.removeAttribute('aria-activedescendant');
        onDestroy?.();
      },
    });

    this.overlayBackdrop = result.backdrop;
    this.triggerElement?.setAttribute('aria-controls', this.listboxId);
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
      searchInput.setAttribute('role', 'combobox');
      searchInput.setAttribute('aria-autocomplete', 'list');
      searchInput.setAttribute('aria-expanded', 'true');
      searchInput.setAttribute('aria-controls', this.listboxId);
      searchInput.setAttribute('aria-label', 'Search country code');
      searchInput.addEventListener('input', (event) => onChangeValue(event.currentTarget.value));
      searchInput.addEventListener('keydown', (event) => this.handleSearchInputKeydown(event));
      this.searchInputElement = searchInput;
      searchInputContainer.appendChild(this.getSearchIcon());
      searchInputContainer.appendChild(searchInput);
      overlayContentContainer.appendChild(searchInputContainer);
      setTimeout(() => {
        searchInput.focus();
      }, 0);
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

    const buttonsList = document.createElement('div');
    setStylesToElement(buttonsList, { display: 'flex', flexDirection: 'column' });
    overlayContentContainer.appendChild(buttonsList);

    const onChangeValue = debounce((value) => {
      const filteredOptions = this.filterOptions(value, availableOptions);
      buttonsList.replaceChildren();
      this.overlayOptions = [];

      if (filteredOptions.length) {
        filteredOptions.forEach((country, index) => {
          const selected = currentCountryCode === country.countryCode;
          const menuButtonEl = this.createMenuButtonComponent(country, selected);

          menuButtonEl.addEventListener('click', () => {
            this.selectCountry(country, buttonIcon, backdrop);
          });
          menuButtonEl.addEventListener('mouseenter', () => {
            this.setActiveOption(index, false);
          });
          buttonsList.appendChild(menuButtonEl);
          this.overlayOptions.push({ country, element: menuButtonEl });
        });
        this.setInitialActiveOption();

      } else {
        this.clearActiveDescendant();
        buttonsList.appendChild(this.getNothingFoundComponent());
      }
    }, 100);

    onChangeValue('');
  }

  createMenuButtonComponent(country, selected) {
    const button = document.createElement('div');
    button.classList.add('option-wrapper');
    if (selected) {
      button.classList.add('option-selected');
    }
    button.setAttribute('role', 'option');
    button.setAttribute('aria-selected', selected ? 'true' : 'false');
    button.id = this.getOptionId(country.countryCode);
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

  isOpen() {
    return !!this.overlayBackdrop;
  }

  handleSearchInputKeydown(event) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActiveOption(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActiveOption(-1);
        break;
      case 'Home':
        event.preventDefault();
        this.setActiveOption(0);
        break;
      case 'End':
        event.preventDefault();
        this.setActiveOption(this.overlayOptions.length - 1);
        break;
      case 'Enter':
        event.preventDefault();
        this.selectActiveOption();
        break;
      case 'Escape':
        event.preventDefault();
        event.stopPropagation?.();
        this.armEscapeKeyupGuard();
        this.closeOverlay();
        break;
      case 'Tab':
        this.closeOverlay(false);
        break;
    }
  }

  moveActiveOption(direction) {
    if (!this.overlayOptions.length) {
      return;
    }

    const nextIndex = this.activeOptionIndex < 0
      ? (direction > 0 ? 0 : this.overlayOptions.length - 1)
      : Math.max(0, Math.min(this.activeOptionIndex + direction, this.overlayOptions.length - 1));

    this.setActiveOption(nextIndex);
  }

  setInitialActiveOption() {
    if (!this.overlayOptions.length) {
      this.clearActiveDescendant();
      return;
    }

    if (this.navigationHint === 'first') {
      this.setActiveOption(0, false);
      return;
    }

    if (this.navigationHint === 'last') {
      this.setActiveOption(this.overlayOptions.length - 1, false);
      return;
    }

    const selectedCountryCode = this.stateService.getState().currentCountryCode;
    const selectedOptionIndex = this.overlayOptions.findIndex((option) => option.country.countryCode === selectedCountryCode);

    this.setActiveOption(selectedOptionIndex >= 0 ? selectedOptionIndex : 0, false);
  }

  setActiveOption(index, shouldScroll = true) {
    if (!this.overlayOptions.length || index < 0) {
      return;
    }

    this.activeOptionIndex = Math.max(0, Math.min(index, this.overlayOptions.length - 1));

    this.overlayOptions.forEach(({ element }, optionIndex) => {
      element.classList.toggle('option-active', optionIndex === this.activeOptionIndex);
    });

    const activeOption = this.overlayOptions[this.activeOptionIndex];
    this.setActiveDescendant(activeOption.element.id);

    if (shouldScroll) {
      activeOption.element.scrollIntoView({ block: 'nearest' });
    }
  }

  selectActiveOption() {
    if (this.activeOptionIndex < 0) {
      return;
    }

    const activeOption = this.overlayOptions[this.activeOptionIndex];
    const buttonIcon = this.getRootElement().querySelector('.phone-input-select-button-flag');
    this.selectCountry(activeOption.country, buttonIcon, this.overlayBackdrop);
  }

  selectCountry(country, buttonIcon, backdrop) {
    this.valueChangedCallback(country);
    buttonIcon.style.backgroundPositionY = `${country.position}px`;
    backdrop.click();
    this.triggerElement?.focus();
  }

  closeOverlay(restoreFocus = true) {
    this.overlayBackdrop?.click();
    if (restoreFocus) {
      this.triggerElement?.focus();
    }
  }

  armEscapeKeyupGuard() {
    this.removeEscapeKeyupGuard();

    this.boundEscapeKeyupGuard = (event) => {
      if (event.key !== 'Escape') {
        return;
      }

      event.preventDefault?.();
      event.stopImmediatePropagation?.();
      this.removeEscapeKeyupGuard();
    };

    window.addEventListener('keyup', this.boundEscapeKeyupGuard, true);
  }

  removeEscapeKeyupGuard() {
    if (!this.boundEscapeKeyupGuard) {
      return;
    }

    window.removeEventListener('keyup', this.boundEscapeKeyupGuard, true);
    this.boundEscapeKeyupGuard = null;
  }

  getActiveDescendantOwner() {
    return this.searchInputElement || this.triggerElement;
  }

  setActiveDescendant(optionId) {
    this.getActiveDescendantOwner()?.setAttribute('aria-activedescendant', optionId);
  }

  clearActiveDescendant() {
    this.searchInputElement?.removeAttribute('aria-activedescendant');
    this.triggerElement?.removeAttribute('aria-activedescendant');
  }

  getOptionId(countryCode) {
    return `cl-phone-input-option-${String(countryCode).replace(/[^a-zA-Z0-9_-]/g, '-')}`;
  }
}
