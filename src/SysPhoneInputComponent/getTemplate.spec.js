import getTemplate from './getTemplate';

describe('SysPhoneInputComponent template', () => {
  let host;

  beforeEach(() => {
    host = document.createElement('div');
    host.innerHTML = getTemplate({ selectCountryLabel: 'Select country code' });
  });

  it('exposes the country selector as a focusable combobox with an aria-label', () => {
    const trigger = host.querySelector('.phone-input-select-button');
    expect(trigger.getAttribute('role')).toBe('combobox');
    expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('aria-label')).toBe('Select country code');
    expect(trigger.getAttribute('tabindex')).toBe('0');
  });

  it('marks decorative flag and svg icons as aria-hidden', () => {
    expect(host.querySelector('.phone-input-select-button-flag').getAttribute('aria-hidden')).toBe('true');
    expect(host.querySelector('.dropdown-icon').getAttribute('aria-hidden')).toBe('true');
  });

  it('links the phone input to the .label via aria-labelledby', () => {
    const label = host.querySelector('.label');
    const input = host.querySelector('[cl-element="input"]');
    expect(label.id).toBe('cl-phone-label');
    expect(input.getAttribute('aria-labelledby')).toBe(label.id);
  });
});
