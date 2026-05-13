import componentTemplate from './componentTemplate';

describe('SysDropdownInputComponent template', () => {
  let host;

  beforeEach(() => {
    host = document.createElement('div');
    host.innerHTML = componentTemplate;
  });

  it('marks the input with combobox semantics', () => {
    const input = host.querySelector('[cl-element="input"]');
    expect(input.getAttribute('role')).toBe('combobox');
    expect(input.getAttribute('aria-haspopup')).toBe('listbox');
    expect(input.getAttribute('aria-autocomplete')).toBe('none');
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });

  it('marks the decorative arrow icon container as aria-hidden', () => {
    const arrowContainer = host.querySelector('.dropdown-input-select-button');
    expect(arrowContainer.getAttribute('aria-hidden')).toBe('true');
  });

  it('links the input to the .label via aria-labelledby', () => {
    const label = host.querySelector('.label');
    const input = host.querySelector('[cl-element="input"]');
    expect(label.id).toBe('cl-dropdown-label');
    expect(input.getAttribute('aria-labelledby')).toBe(label.id);
  });
});
