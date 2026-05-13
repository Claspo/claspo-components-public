import SysDateComponent from './SysDateComponent';

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
  });

  it('moves focus between month options with arrow keys', () => {
    const componentLike = {
      focusMonthOption: SysDateComponent.prototype.focusMonthOption,
    };
    const buttonsList = document.createElement('div');
    const firstOption = document.createElement('div');
    const secondOption = document.createElement('div');

    firstOption.setAttribute('tabindex', '0');
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
