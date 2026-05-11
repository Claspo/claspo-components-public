describe('SysConsentComponent template', () => {
  let host;

  beforeEach(() => {
    host = document.createElement('div');
    host.innerHTML = `
      <div class="main-container">
        <div class="label-with-input-container">
          <div class="input-with-tooltip">
            <label class="checkmark-container">
              <input type="checkbox" name="fname" aria-labelledby="cl-consent-label">
              <span cl-element="input" class="checkmark"></span>
            </label>
            <div cl-element="label"
                 cl-inline-edit="content, label"
                 class="label"
                 id="cl-consent-label">
            </div>
          </div>
        </div>
      </div>
    `;
  });

  it('keeps the visual checkmark wrapped by the existing <label class="checkmark-container">', () => {
    const checkmarkLabel = host.querySelector('label.checkmark-container');
    expect(checkmarkLabel).toBeTruthy();
    expect(checkmarkLabel.querySelector('input[type="checkbox"]')).toBeTruthy();
    expect(checkmarkLabel.querySelector('.checkmark')).toBeTruthy();
  });

  it('links the checkbox to the rich-text consent label via aria-labelledby', () => {
    const checkbox = host.querySelector('input[type="checkbox"]');
    const consentLabel = host.querySelector('div.label');
    expect(consentLabel.id).toBe('cl-consent-label');
    expect(checkbox.getAttribute('aria-labelledby')).toBe(consentLabel.id);
  });
});
