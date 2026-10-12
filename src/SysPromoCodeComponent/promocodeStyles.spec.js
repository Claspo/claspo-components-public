import promocodeStyles from './promocodeStyles';

const getRule = (selector) => {
  const escapedSelector = selector.replace(/[.:]/g, '\\$&');
  const match = promocodeStyles.match(new RegExp(`(^|\\n)${escapedSelector} \\{[^}]*\\}`));

  return match ? match[0] : null;
};

describe('SysPromoCode height', () => {
  it('is carried from the host to the code box by flex sizing', () => {
    const hostRule = getRule(':host');
    const textRule = getRule('.text');

    expect(hostRule).not.toBeNull();
    expect(hostRule).toMatch(/display:\s*flex/);
    expect(hostRule).toMatch(/flex-direction:\s*column/);

    expect(textRule).not.toBeNull();
    expect(textRule).toMatch(/flex:\s*1 1 auto/);
    expect(textRule).toMatch(/min-height:\s*20px/);
  });

  // see the quirks-mode note at :host in promocodeStyles.js
  it('does not size the code box with a percentage height', () => {
    expect(getRule('.text')).not.toMatch(/[^-]height:/);
  });
});
