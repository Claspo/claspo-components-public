import PhoneInputMenu from './PhoneInputMenu';

jest.mock('@claspo/common/async/debounce', () => jest.fn((callback) => callback));
jest.mock('@claspo/renderer/sdk/TranslationUtils', () => ({
  getTranslationsMap: jest.fn((label) => ({ translations: label })),
  getWidgetLanguages: jest.fn(() => []),
}));
jest.mock('@claspo/renderer/sdk/HtmlStyleUtils', () => ({
  getStylesFromElement: jest.fn(() => ({
    height: '40px',
    borderTopLeftRadius: '4',
    borderTopRightRadius: '4',
    borderBottomLeftRadius: '4',
    borderBottomRightRadius: '4',
  })),
  setStylesToElement: jest.fn((element, styles) => Object.assign(element.style, styles)),
}));

describe('PhoneInputMenu keyboard accessibility', () => {
  let rootElement;
  let inputElement;
  let triggerElement;
  let menu;
  let onSelect;
  let backdrop;

  beforeEach(() => {
    HTMLElement.prototype.scrollIntoView = jest.fn();

    rootElement = document.createElement('div');
    rootElement.innerHTML = `
      <div class="phone-input-select-button" tabindex="0"></div>
      <div class="phone-input-select-button-flag"></div>
    `;
    inputElement = document.createElement('input');
    triggerElement = rootElement.querySelector('.phone-input-select-button');
    onSelect = jest.fn();
    backdrop = document.createElement('div');
    backdrop.click = jest.fn();

    menu = new PhoneInputMenu(
      () => rootElement,
      (element) => element === 'input' ? inputElement : null,
      { getConfig: () => 'http://localhost:9590/bundled-components/' },
      { getState: () => ({ currentCountryCode: 'US' }) },
      onSelect,
      document,
    );
    menu.triggerElement = triggerElement;
    menu.overlayBackdrop = backdrop;
  });

  it('navigates filtered options from the search input and selects with Enter', () => {
    const overlayContentContainer = document.createElement('div');
    const countries = [
      { countryCode: 'US', label: 'United States', prefix: '+1', position: '-1' },
      { countryCode: 'CA', label: 'Canada', prefix: '+1', position: '-2' },
      { countryCode: 'GB', label: 'United Kingdom', prefix: '+44', position: '-3' },
      { countryCode: 'DE', label: 'Germany', prefix: '+49', position: '-4' },
      { countryCode: 'FR', label: 'France', prefix: '+33', position: '-5' },
      { countryCode: 'ES', label: 'Spain', prefix: '+34', position: '-6' },
      { countryCode: 'IT', label: 'Italy', prefix: '+39', position: '-7' },
      { countryCode: 'PT', label: 'Portugal', prefix: '+351', position: '-8' },
      { countryCode: 'UA', label: 'Ukraine', prefix: '+380', position: '-9' },
    ];

    menu.createOverlayContent(rootElement, backdrop, overlayContentContainer, countries);

    const searchInput = overlayContentContainer.querySelector('.search-country-input');
    searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));

    expect(searchInput.getAttribute('aria-activedescendant')).toBe(menu.getOptionId('CA'));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ countryCode: 'CA' }));
    expect(backdrop.click).toHaveBeenCalled();
  });

  it('tracks the selected country as the active descendant when opened without search', () => {
    const overlayContentContainer = document.createElement('div');
    const countries = [
      { countryCode: 'US', label: 'United States', prefix: '+1', position: '-1' },
      { countryCode: 'CA', label: 'Canada', prefix: '+1', position: '-2' },
    ];

    menu.createOverlayContent(rootElement, backdrop, overlayContentContainer, countries);

    expect(triggerElement.getAttribute('aria-activedescendant')).toBe(menu.getOptionId('US'));
    expect(overlayContentContainer.querySelectorAll('[role="option"]').length).toBe(2);
  });

  it('closes on Escape from the search input and arms a keyup guard', () => {
    menu.closeOverlay = jest.fn();
    menu.armEscapeKeyupGuard = jest.fn();

    menu.handleSearchInputKeydown({
      key: 'Escape',
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    });

    expect(menu.armEscapeKeyupGuard).toHaveBeenCalled();
    expect(menu.closeOverlay).toHaveBeenCalled();
  });

  it('clears the one-time Escape keyup guard after handling Escape', () => {
    menu.armEscapeKeyupGuard();

    menu.boundEscapeKeyupGuard({
      key: 'Escape',
      preventDefault: jest.fn(),
      stopImmediatePropagation: jest.fn(),
    });

    expect(menu.boundEscapeKeyupGuard).toBeNull();
  });
});
