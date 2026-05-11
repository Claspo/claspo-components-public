import componentTemplate from './componentTemplate';

describe('SysChoiceButtonsComponent template', () => {
  let host;

  beforeEach(() => {
    host = document.createElement('div');
    host.innerHTML = componentTemplate;
  });

  it('links the choice-buttons group to the .label via aria-labelledby and role="group"', () => {
    const container = host.querySelector('.container-with-label');
    const label = host.querySelector('.label');

    expect(container.getAttribute('role')).toBe('group');
    expect(label.id).toBe('cl-choice-buttons-label');
    expect(container.getAttribute('aria-labelledby')).toBe(label.id);
  });

  it('marks the tooltip and icon as decorative', () => {
    const tooltip = host.querySelector('.tooltip');
    const icon = host.querySelector('.tooltip svg');

    expect(tooltip.getAttribute('aria-hidden')).toBe('true');
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });
});
