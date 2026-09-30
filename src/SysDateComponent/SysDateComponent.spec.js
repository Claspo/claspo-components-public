import SysDateComponent from './SysDateComponent';
import getTemplate from './getTemplate';
import { SysDateTranslationUtils } from './SysDateTranslationUtils';

describe('SysDateComponent month value', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  // A browser's innerText returns the text as displayed, so the "all caps" text style
  // (text-transform: uppercase) turns "Лют." into "ЛЮТ.". jsdom does no layout, so emulate it.
  function displayInCapitals(element) {
    Object.defineProperty(element, 'innerText', {
      configurable: true,
      get: () => element.textContent.toLocaleUpperCase('uk'),
      set: (value) => {
        element.textContent = value;
      },
    });
  }

  function componentLike({ askYear = true } = {}) {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = getTemplate();
    const monthButton = rootElement.querySelector('#cl-month-dropdown');
    monthButton.style.background = 'rgb(255, 255, 255)';
    monthButton.style.color = 'rgb(0, 0, 0)';
    displayInCapitals(monthButton);
    const control = { setValue: jest.fn(), emit: jest.fn() };

    const component = Object.assign(Object.create(SysDateComponent.prototype), {
      validationErrorKeys: SysDateTranslationUtils.validationErrorKeys,
      MONTH_DROPDOWN_PLACEHOLDER: SysDateTranslationUtils.MONTH_DROPDOWN_PLACEHOLDER,
      overlayContentStyles: ['background'],
      dropdownMenuOptionLabelStyles: ['color'],
      registeredControl: control,
      services: { form: { getControl: () => control } },
      getRootElement: () => rootElement,
      getProps: () => ({ content: { askYear }, control: { name: 'birthday' } }),
      getPreferredWidgetLanguage: () => 'uk',
      getTranslationsMap: (translations) => ({ translations: translations.uk }),
    });

    return { component, rootElement };
  }

  function fillDayAndYear(rootElement) {
    rootElement.querySelector('#cl-day-input').value = '15';
    rootElement.querySelector('#cl-year-input').value = '1990';
  }

  function pickMonthFromDropdown(component, monthLabel) {
    const overlayContent = document.createElement('div');
    component.createOverlayContent({ click: jest.fn() }, overlayContent);
    [...overlayContent.querySelectorAll('.option-wrapper')]
      .find((option) => option.textContent === monthLabel)
      .click();
  }

  it('accepts a month picked from the dropdown while its label is displayed in capitals', () => {
    const { component, rootElement } = componentLike();
    fillDayAndYear(rootElement);

    pickMonthFromDropdown(component, 'Лют.');

    expect(component.getDateValueAsString()).toBe('1990-02-15');
    expect(component.dateValidation()).toEqual({ isValid: true });
  });

  function lastSavedValue(component) {
    const { calls } = component.registeredControl.setValue.mock;
    return calls[calls.length - 1][0];
  }

  // Navigating away destroys the component while the form keeps its value; coming back
  // recreates the component, which restores its controls from that value.
  it.each([
    ['with a year', true, '1990'],
    ['without a year', false, ''],
  ])('shows a date saved %s again when the component is recreated', (_, askYear, year) => {
    const { component: firstComponent, rootElement: firstRootElement } = componentLike({ askYear });
    firstRootElement.querySelector('#cl-day-input').value = '15';
    firstRootElement.querySelector('#cl-year-input').value = year;
    pickMonthFromDropdown(firstComponent, 'Лют.');
    const savedValue = lastSavedValue(firstComponent);

    const { component, rootElement } = componentLike({ askYear });
    component.setStringDateValue(savedValue);
    component.setControlValueProxy();

    expect(rootElement.querySelector('#cl-day-input').value).toBe('15');
    expect(rootElement.querySelector('#cl-month-dropdown').textContent).toBe('Лют.');
    expect(rootElement.querySelector('#cl-year-input').value).toBe(year);
    expect(component.dateValidation()).toEqual({ isValid: true });
    expect(lastSavedValue(component)).toBe(savedValue);
  });

  it('treats the month as unselected again once the placeholder is shown', () => {
    const { component, rootElement } = componentLike();
    fillDayAndYear(rootElement);
    pickMonthFromDropdown(component, 'Лют.');

    component.setMonthPlaceholder();

    expect(component.dateValidation().errorKey).toBe(SysDateTranslationUtils.validationErrorKeys.REQUIRED);
  });
});

describe('SysDateComponent month dropdown accessibility', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('marks the selected month option as focusable', () => {
    const option = SysDateComponent.prototype.createDropdownButtonMenuComponent(
      { label: 'Jan' },
      true,
      {},
      'rgb(255, 255, 255)'
    );

    expect(option.getAttribute('role')).toBe('option');
    expect(option.getAttribute('tabindex')).toBe('0');
    expect(option.getAttribute('aria-selected')).toBe('true');
    expect(option.classList.contains('option-selected')).toBe(true);
  });

  it('moves focus between month options with arrow keys', () => {
    const componentLike = {
      focusMonthOption: SysDateComponent.prototype.focusMonthOption,
    };
    const buttonsList = document.createElement('div');
    const firstOption = document.createElement('div');
    const secondOption = document.createElement('div');

    firstOption.classList.add('option-selected');
    firstOption.setAttribute('aria-selected', 'true');
    firstOption.setAttribute('tabindex', '0');
    secondOption.setAttribute('aria-selected', 'false');
    secondOption.setAttribute('tabindex', '-1');
    buttonsList.append(firstOption, secondOption);
    document.body.appendChild(buttonsList);

    SysDateComponent.prototype.handleMonthOptionKeydown.call(
      componentLike,
      {
        key: 'ArrowDown',
        preventDefault: jest.fn(),
      },
      firstOption,
      buttonsList,
      jest.fn(),
    );

    expect(document.activeElement).toBe(secondOption);
    expect(firstOption.getAttribute('tabindex')).toBe('-1');
    expect(secondOption.getAttribute('tabindex')).toBe('0');
    expect(firstOption.classList.contains('option-active')).toBe(false);
    expect(firstOption.classList.contains('option-selected')).toBe(false);
    expect(secondOption.classList.contains('option-active')).toBe(true);
  });

  it('selects the focused month on Enter', () => {
    const onSelect = jest.fn();

    SysDateComponent.prototype.handleMonthOptionKeydown.call(
      {},
      {
        key: 'Enter',
        preventDefault: jest.fn(),
      },
      document.createElement('div'),
      document.createElement('div'),
      onSelect,
    );

    expect(onSelect).toHaveBeenCalled();
  });

  it('closes the month dropdown on Escape', () => {
    const onClose = jest.fn();
    const stopPropagation = jest.fn();

    SysDateComponent.prototype.handleMonthOptionKeydown.call(
      {
        armEscapeKeyupGuard: jest.fn(),
      },
      {
        key: 'Escape',
        preventDefault: jest.fn(),
        stopPropagation,
      },
      document.createElement('div'),
      document.createElement('div'),
      jest.fn(),
      onClose,
    );

    expect(stopPropagation).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('focuses the selected month from the opened overlay', () => {
    const listbox = document.createElement('div');
    listbox.setAttribute('role', 'listbox');
    const firstOption = document.createElement('div');
    const selectedOption = document.createElement('div');

    firstOption.classList.add('option-wrapper');
    firstOption.setAttribute('tabindex', '-1');
    selectedOption.classList.add('option-wrapper');
    selectedOption.setAttribute('aria-selected', 'true');
    selectedOption.setAttribute('tabindex', '-1');

    listbox.append(firstOption, selectedOption);
    document.body.appendChild(listbox);

    const componentLike = {
      overlayBackdrop: {
        querySelector: jest.fn(() => listbox),
      },
      focusMonthOption: SysDateComponent.prototype.focusMonthOption,
    };

    SysDateComponent.prototype.focusSelectedMonthAfterOverlayOpen.call(componentLike);

    expect(document.activeElement).toBe(selectedOption);
    expect(selectedOption.getAttribute('tabindex')).toBe('0');
  });

  it('restores focus to the month trigger after the overlay closes', () => {
    const triggerButton = document.createElement('button');
    document.body.appendChild(triggerButton);

    SysDateComponent.prototype.restoreFocusToMonthTrigger(triggerButton);
    jest.runAllTimers();

    expect(document.activeElement).toBe(triggerButton);
  });

  it('arms a one-time Escape keyup guard for the month dropdown', () => {
    const componentLike = {
      boundEscapeKeyupGuard: null,
      removeEscapeKeyupGuard: SysDateComponent.prototype.removeEscapeKeyupGuard,
    };

    SysDateComponent.prototype.armEscapeKeyupGuard.call(componentLike);
    componentLike.boundEscapeKeyupGuard({
      key: 'Escape',
      preventDefault: jest.fn(),
      stopImmediatePropagation: jest.fn(),
    });

    expect(componentLike.boundEscapeKeyupGuard).toBeNull();
  });
});
