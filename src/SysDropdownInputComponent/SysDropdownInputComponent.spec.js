import SysDropdownInputComponent from './SysDropdownInputComponent';

jest.mock('@claspo/renderer/common/WaitForKeyboardHide', () => jest.fn((callback) => callback()));
jest.mock('@claspo/renderer/sdk/HtmlStyleUtils', () => ({
  applyInputLabelStyles: jest.fn(),
  getStylesFromElement: jest.fn((element, styleKeys) => {
    if (Array.isArray(styleKeys) && styleKeys.includes('background')) {
      return { background: 'rgb(255, 255, 255)' };
    }

    return {
      color: 'rgb(0, 0, 0)',
      background: 'rgb(255, 255, 255)',
      height: '40px',
      borderTopLeftRadius: '4',
      borderTopRightRadius: '4',
      borderBottomLeftRadius: '4',
      borderBottomRightRadius: '4',
    };
  }),
  setFocusOutline: jest.fn(),
  setInputHostSize: jest.fn(),
  setStylesToElement: jest.fn((element, styles) => Object.assign(element.style, styles)),
}));

if (!customElements.get('sys-dropdown-input')) {
  customElements.define('sys-dropdown-input', SysDropdownInputComponent);
}

describe('SysDropdownInputComponent accessibility', () => {
  let component;
  let inputElement;

  beforeEach(() => {
    component = new SysDropdownInputComponent();
    inputElement = component.getRootElement().querySelector('[cl-element="input"]');

    component.getElement = jest.fn((element) => {
      if (element === 'input') {
        return inputElement;
      }

      return null;
    });

    component.getProps = jest.fn(() => ({
      control: {
        options: {
          alpha: { id: 'alpha', label: 'Alpha', exportId: 'alpha' },
          beta: { id: 'beta', label: 'Beta', exportId: 'beta' },
          gamma: { id: 'gamma', label: 'Gamma', exportId: 'gamma' },
          delta: { id: 'delta', label: 'Delta', exportId: 'delta' },
          epsilon: { id: 'epsilon', label: 'Epsilon', exportId: 'epsilon' },
        },
      },
    }));

    component.getTranslationsMap = jest.fn(() => ({ translations: 'No matches' }));
    component.registeredControl = {
      getValue: jest.fn(() => ({ id: 'beta' })),
      setValue: jest.fn(),
    };
    component.createOverlay = jest.fn();
    component.selectActiveOption = jest.fn();
    component.closeOverlay = jest.fn();
  });

  it('switches to searchable combobox mode when enough options are available', () => {
    component.updateInputMode();

    expect(inputElement.hasAttribute('readonly')).toBe(false);
    expect(inputElement.getAttribute('aria-autocomplete')).toBe('list');
    expect(inputElement.getAttribute('aria-readonly')).toBe('false');
  });

  it('opens the list with ArrowDown when closed', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true });

    component.handleInputKeydown(event);

    expect(event.defaultPrevented).toBe(true);
    expect(component.createOverlay).toHaveBeenCalledWith(component.getOptions(), 'first');
  });

  it('opens the full list with ArrowDown even when the selected option label is in the input', () => {
    inputElement.value = 'Beta';

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true });
    component.handleInputKeydown(event);

    expect(component.createOverlay).toHaveBeenCalledWith(component.getOptions(), 'first');
  });

  it('filters options only from real search input', () => {
    component.createOverlay.mockClear();

    component.handleSearchInput({ target: { value: 'Beta' } });

    expect(component.createOverlay).toHaveBeenCalledWith(component.getOptions('Beta'), 'first');
  });

  it('updates the control directly on option selection without synthetic input events', () => {
    inputElement.focus = jest.fn();
    inputElement.dispatchEvent = jest.fn();
    const backdrop = { click: jest.fn() };

    component.selectOption('beta', { id: 'beta', label: 'Beta', exportId: 'beta' }, backdrop);

    expect(component.registeredControl.setValue).toHaveBeenCalledWith({ id: 'beta', exportId: 'beta' });
    expect(inputElement.value).toBe('Beta');
    expect(inputElement.dispatchEvent).not.toHaveBeenCalled();
    expect(backdrop.click).toHaveBeenCalled();
    expect(inputElement.focus).toHaveBeenCalled();
  });

  it('selects the active option with Enter when the list is open', () => {
    component.overlayBackdrop = document.createElement('div');

    const event = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
    component.handleInputKeydown(event);

    expect(event.defaultPrevented).toBe(true);
    expect(component.selectActiveOption).toHaveBeenCalled();
  });

  it('restores selected text and closes the list on Escape', () => {
    component.overlayBackdrop = document.createElement('div');
    const stopPropagation = jest.fn();

    component.handleInputKeydown({
      key: 'Escape',
      preventDefault: jest.fn(),
      stopPropagation,
    });

    expect(stopPropagation).toHaveBeenCalled();
    expect(component.closeOverlay).toHaveBeenCalledWith(true);
  });

  it('closes the overlay on Escape from overlay content as well', () => {
    component.overlayBackdrop = document.createElement('div');
    const stopPropagation = jest.fn();

    component.handleOverlayKeydown({
      key: 'Escape',
      preventDefault: jest.fn(),
      stopPropagation,
    });

    expect(stopPropagation).toHaveBeenCalled();
    expect(component.closeOverlay).toHaveBeenCalledWith(true);
  });

  it('arms a one-time Escape keyup guard after local closing', () => {
    component.armEscapeKeyupGuard();
    component.boundEscapeKeyupGuard({
      key: 'Escape',
      preventDefault: jest.fn(),
      stopImmediatePropagation: jest.fn(),
    });

    expect(component.boundEscapeKeyupGuard).toBeNull();
  });

  it('tracks the selected option through aria-activedescendant', () => {
    const overlayContentContainer = document.createElement('div');

    component.navigationHint = 'selected';
    SysDropdownInputComponent.prototype.createOverlayContent.call(
      component,
      document.createElement('div'),
      overlayContentContainer,
      component.getProps().control.options,
      component.getProps().control.options,
    );

    expect(inputElement.getAttribute('aria-activedescendant')).toBe(component.getOptionId('beta'));
    expect(overlayContentContainer.querySelectorAll('[role="option"]').length).toBe(5);
  });

  it('does not add compensating bottom margin when only the no-matches option is shown', () => {
    const overlayContentContainer = document.createElement('div');

    SysDropdownInputComponent.prototype.createOverlayContent.call(
      component,
      document.createElement('div'),
      overlayContentContainer,
      {},
      component.getProps().control.options,
    );

    expect(overlayContentContainer.style.marginBottom).toBe('');
    expect(overlayContentContainer.querySelectorAll('[role="option"]').length).toBe(0);
    expect(overlayContentContainer.textContent).toContain('No matches');
  });
});
