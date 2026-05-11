import componentTemplate from './componentTemplate';

describe('SysCheckboxListComponent template', () => {
  let host;

  beforeEach(() => {
    host = document.createElement('div');
    host.innerHTML = componentTemplate;
  });

  it('links the group container to the .label via aria-labelledby and role="group"', () => {
    const container = host.querySelector('.label-with-checkbox-list-container');
    const label = host.querySelector('.label');
    expect(container.getAttribute('role')).toBe('group');
    expect(label.id).toBe('cl-checkbox-list-label');
    expect(container.getAttribute('aria-labelledby')).toBe(label.id);
  });
});
