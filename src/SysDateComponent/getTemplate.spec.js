import getTemplate from './getTemplate';

describe('SysDateComponent template', () => {
  let host;

  beforeEach(() => {
    host = document.createElement('div');
    host.innerHTML = getTemplate();
  });

  it('links the date controls to the label via aria-labelledby', () => {
    const label = host.querySelector('.label');
    const controlsGroup = host.querySelector('.controls-container');
    const dayInput = host.querySelector('#cl-day-input');
    const monthButton = host.querySelector('#cl-month-dropdown');
    const yearInput = host.querySelector('#cl-year-input');

    expect(label.id).toBe('cl-date-label');
    expect(controlsGroup.getAttribute('role')).toBe('group');
    expect(controlsGroup.getAttribute('aria-labelledby')).toBe(label.id);
    expect(dayInput.getAttribute('aria-labelledby')).toBe(label.id);
    expect(monthButton.getAttribute('aria-labelledby')).toBe(label.id);
    expect(yearInput.getAttribute('aria-labelledby')).toBe(label.id);
  });

  it('marks decorative tooltips as hidden and exposes the month trigger state', () => {
    const tooltips = [...host.querySelectorAll('.input-tooltip')];
    const tooltipIcons = [...host.querySelectorAll('.input-tooltip svg')];
    const monthButton = host.querySelector('#cl-month-dropdown');

    expect(monthButton.getAttribute('type')).toBe('button');
    expect(monthButton.getAttribute('aria-haspopup')).toBe('listbox');
    expect(monthButton.getAttribute('aria-expanded')).toBe('false');
    expect(tooltips.every((tooltip) => tooltip.getAttribute('aria-hidden') === 'true')).toBe(true);
    expect(tooltipIcons.every((icon) => icon.getAttribute('aria-hidden') === 'true')).toBe(true);
  });
});
