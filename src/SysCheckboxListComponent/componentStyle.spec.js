import checkboxListStyle from './componentStyle';
import radioGroupStyle from '../SysRadioGroupComponent/componentStyle';

/** The rule of a component's stylesheet with exactly this selector, as the browser parses it. */
function ruleOf(css, selector) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  const rule = Array.from(style.sheet.cssRules).find((cssRule) => cssRule.selectorText === selector);
  style.remove();

  return rule;
}

describe('SysCheckboxListComponent styles', () => {
  it('takes the hidden native checkbox out of the option row, as the radio group does with its input', () => {
    // Left in the row, the input keeps the shared input rule's padding (0 10px) and pushes every label 20px past its
    // Distance before text, so a checkbox list and a radio group with the same gap look different.
    const checkboxInput = ruleOf(checkboxListStyle, '.checkmark-container input');
    const radioInput = ruleOf(radioGroupStyle, '.radio-mark-container input');

    expect(checkboxInput.style.position).toBe('absolute');
    expect(checkboxInput.style.position).toBe(radioInput.style.position);
  });

  it('draws the tick of a checked answer in the selected colour, which the host holds for every answer', () => {
    // a colour set per answer on the shared host is overwritten by the next answer drawn: with the last answer
    // unchecked, every tick turned grey while its box kept the selected colour
    expect(ruleOf(checkboxListStyle, '.checkmark-container .checkmark:after').style.color).toBe('var(--selectedColor)');
  });

  it.each([
    { list: 'a checkbox list', css: checkboxListStyle, container: '.buttons-list' },
    { list: 'a radio group', css: radioGroupStyle, container: '.radio-buttons-list' },
  ])('keeps a --optionRowHeight of the host page off the rows of $list', ({ css, container }) => {
    // the rows read the variable to grow in columns, where the list sets it inline; a page variable of the same name,
    // inherited through the shadow root, would otherwise set the height of every row of a list in one column
    expect(ruleOf(css, container).style.getPropertyValue('--optionRowHeight')).toBe('initial');
  });
});
