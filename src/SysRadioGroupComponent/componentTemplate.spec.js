import componentTemplate from './componentTemplate';

describe('SysRadioGroupComponent template', () => {
  let host;

  beforeEach(() => {
    host = document.createElement('div');
    host.innerHTML = componentTemplate;
  });

  it('links the group container to the .label via aria-labelledby and role="radiogroup"', () => {
    const container = host.querySelector('.label-with-radio-group-container');
    const label = host.querySelector('.label');
    expect(container.getAttribute('role')).toBe('radiogroup');
    expect(label.id).toBe('cl-radio-group-label');
    expect(container.getAttribute('aria-labelledby')).toBe(label.id);
  });
});
