const TEMPLATE = `
  <div class="main-container">
    <div class="label-with-input-container">
      <div cl-element="label"
           cl-inline-edit="content, label"
           class="label"
           id="cl-input-label"></div>
      <div class="input-with-tooltip">
        <input cl-element="input" type="text" name="fname" aria-labelledby="cl-input-label">
      </div>
    </div>
  </div>
`;

describe('SysInputComponent template', () => {
  let host;

  beforeEach(() => {
    host = document.createElement('div');
    host.innerHTML = TEMPLATE;
  });

  it('links the input to the label via aria-labelledby', () => {
    const label = host.querySelector('.label');
    const input = host.querySelector('input[cl-element="input"]');
    expect(label.id).toBe('cl-input-label');
    expect(input.getAttribute('aria-labelledby')).toBe(label.id);
  });
});
