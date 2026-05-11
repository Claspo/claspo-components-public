const TEMPLATE = `
  <div class="main-container">
    <div class="label-with-input-container">
      <div cl-element="label"
           cl-inline-edit="content, label"
           class="label"
           id="cl-textarea-label"></div>
      <div class="input-with-tooltip">
        <textarea cl-element="input" name="fname" aria-labelledby="cl-textarea-label"></textarea>
      </div>
    </div>
  </div>
`;

describe('SysTextAreaComponent template', () => {
  let host;

  beforeEach(() => {
    host = document.createElement('div');
    host.innerHTML = TEMPLATE;
  });

  it('links the textarea to the label via aria-labelledby', () => {
    const label = host.querySelector('.label');
    const textarea = host.querySelector('textarea[cl-element="input"]');
    expect(label.id).toBe('cl-textarea-label');
    expect(textarea.getAttribute('aria-labelledby')).toBe(label.id);
  });
});
