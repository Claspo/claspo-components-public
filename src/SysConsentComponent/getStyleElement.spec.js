import getStyleElement from './getStyleElement';

// Splits at commas or combinators that are not inside parentheses, e.g. in :host(:not(a, b)).
const splitTopLevel = (selector, separator) => {
  const parts = [];
  let depth = 0;
  let start = 0;

  [...selector].forEach((char, index) => {
    if (char === '(') depth++;
    if (char === ')') depth--;
    if (depth === 0 && separator.test(char)) {
      parts.push(selector.slice(start, index));
      start = index + 1;
    }
  });
  parts.push(selector.slice(start));

  return parts.map((part) => part.trim()).filter(Boolean);
};

// the compound selector that picks the styled element: the part after the last combinator
const subjectsOf = (selectorText) => splitTopLevel(selectorText, /,/)
  .map((selector) => splitTopLevel(selector, /[\s>+~]/).pop());

const matchesTarget = (subject, target) => (target === ':host'
  ? /^:host(-context)?(\(|$)/.test(subject)
  : new RegExp(`\\.${target.slice(1)}(?![\\w-])`).test(subject));

const declarations = (rule) => Array.from({ length: rule.style.length }, (_, i) => rule.style[i])
  .map((property) => [property, rule.style.getPropertyValue(property)]);

let rules;

const rulesFor = (target) => rules
  .filter((rule) => subjectsOf(rule.selectorText).some((subject) => matchesTarget(subject, target)));

const ruleFor = (target) => {
  const found = rulesFor(target);

  expect(found).toHaveLength(1);

  return found[0];
};

const WRAPPERS = ['.main-container', '.label-with-input-container', '.input-with-tooltip'];

describe('SysConsent height', () => {
  beforeAll(() => {
    const container = document.createElement('div');
    container.innerHTML = getStyleElement();
    document.body.appendChild(container);
    rules = Array.from(container.querySelector('style').sheet.cssRules);
    container.remove();
  });

  // any second rule that picks one of these elements - :host(...), div.main-container,
  // .main-container:not(.x) - could undo the chain without failing the checks below
  it('styles the host and each wrapper in a single rule, plus the hidden-attribute rule', () => {
    expect(rulesFor(':host').map((rule) => rule.selectorText)).toEqual([':host', ':host([hidden])']);
    WRAPPERS.forEach((selector) => {
      expect(rulesFor(selector).map((rule) => rule.selectorText)).toEqual([selector]);
    });
  });

  it('is carried from the host to the checkbox row by flex sizing', () => {
    const host = rulesFor(':host').find((rule) => rule.selectorText === ':host');
    const main = ruleFor('.main-container');
    const row = ruleFor('.label-with-input-container');

    expect(host.style.getPropertyValue('display')).toBe('flex');
    expect(host.style.getPropertyValue('flex-direction')).toBe('column');

    expect(main.style.getPropertyValue('display')).toBe('flex');
    expect(main.style.getPropertyValue('flex-direction')).toBe('column');
    expect(main.style.getPropertyValue('flex')).toBe('1 1 auto');
    // lets the box clamp to a host smaller than its content, as height:100% did
    expect(main.style.getPropertyValue('min-height')).toMatch(/^0(px)?$/);

    expect(row.style.getPropertyValue('display')).toBe('flex');
    expect(row.style.getPropertyValue('flex-direction')).not.toMatch(/column/);
    expect(row.style.getPropertyValue('flex')).toBe('1 1 auto');
    expect(row.style.getPropertyValue('min-height')).toMatch(/^0(px)?$/);
  });

  // .input-with-tooltip is the item of the .label-with-input-container row. align-self:stretch
  // gives it the row's height whatever the row's align-items; an auto margin across the row
  // would switch the stretch off.
  it('stretches the checkbox box to the row', () => {
    const box = ruleFor('.input-with-tooltip');

    expect(box.style.getPropertyValue('align-self')).toBe('stretch');
    declarations(box)
      .filter(([property]) => property.startsWith('margin'))
      .forEach(([, value]) => expect(value).not.toMatch(/auto/));
  });

  // :host { display: flex } is an author rule, so it beats the user-agent [hidden] { display: none }
  it('keeps the hidden attribute hiding the host', () => {
    const hidden = rulesFor(':host').find((rule) => rule.selectorText === ':host([hidden])');

    expect(hidden.style.getPropertyValue('display')).toBe('none');
  });

  // see the quirks-mode note at :host in getStyleElement.js
  it.each(WRAPPERS)('does not size %s with a height of its own', (selector) => {
    declarations(ruleFor(selector))
      .filter(([property]) => /(^|-)(height|block-size)$/.test(property))
      .forEach(([property, value]) => {
        expect(property).toMatch(/^min-/);
        expect(value).not.toMatch(/%/);
      });
  });
});
