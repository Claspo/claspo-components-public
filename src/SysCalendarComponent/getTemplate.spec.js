import getTemplate from './getTemplate';

describe('SysCalendarComponent template', () => {
  let host;

  beforeEach(() => {
    host = document.createElement('div');
    host.innerHTML = getTemplate();
  });

  it('links the date input to the label via aria-labelledby', () => {
    const label = host.querySelector('.label');
    const dateInput = host.querySelector('#cl-date-input');
    const inputUiOverride = host.querySelector('.input-ui-override');
    const tooltip = host.querySelector('.input-tooltip');

    expect(label.id).toBe('cl-calendar-label');
    expect(dateInput.getAttribute('aria-labelledby')).toBe(label.id);
    expect(inputUiOverride.getAttribute('aria-hidden')).toBe('true');
    expect(tooltip.getAttribute('aria-hidden')).toBe('true');
  });
});
