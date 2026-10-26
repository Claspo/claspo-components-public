import fs from 'fs';
import path from 'path';

jest.mock('@claspo/renderer/sdk/ManifestUtils', () => ({
  cloneControlsToAllEnvs: (controls) => controls,
}));
jest.mock('@claspo/renderer/sdk/ModelStyleUtils', () => ({
  cloneStylesToAllEnvs: (styles) => ({ desktop: styles, mobile: styles }),
}));

// eslint-disable-next-line import/first
import manifest from './SysCountdownTimer.manifest';

const styleElement = fs.readFileSync(path.join(__dirname, 'getStyleElement.js'), 'utf8');

// the pane keeps a SIZE control per environment group
const PANE_SIZES = manifest.propertyPaneModel.content
  .filter((c) => c.type === 'GROUP')
  .map((group) => group.children.find((c) => c.name === 'SIZE'))
  .filter(Boolean);

describe('SysCountdownTimer height', () => {
  it('is offered in both environments', () => {
    expect(PANE_SIZES).toHaveLength(2); // desktop + mobile

    for (const control of PANE_SIZES) {
      expect(control.params.height.options).toEqual(expect.arrayContaining(['fixed', 'hug']));
    }
  });

  // Offering the control is only half of it. The host height stops at
  // .countdownContainer unless that box passes it on, and then the flex-grow on
  // .countersContainer and the height:100% on the counters have nothing to share
  // - which is why the control used to change nothing at all. The host is made
  // the flex container and the root box a growing item, so the height travels
  // through flex sizing.
  it('is carried inwards by the stylesheet', () => {
    const hostRule = styleElement.match(/:host \{[^}]*\}/);
    const rootRule = styleElement.match(/\.countdownContainer \{[^}]*\}/);

    expect(hostRule).not.toBeNull();
    expect(hostRule[0]).toMatch(/display:\s*flex/);
    expect(hostRule[0]).toMatch(/flex-direction:\s*column/);

    expect(rootRule).not.toBeNull();
    expect(rootRule[0]).toMatch(/flex:\s*1 1 auto/);
    // lets the box clamp to a host smaller than the counters, as height:100% did
    expect(rootRule[0]).toMatch(/min-height:\s*0/);
  });

  // A percentage height on the root box is what flex sizing replaces. It is not
  // just redundant: in a quirks-mode document (the dashboard preview iframes are
  // about:blank, some customer pages carry no doctype) WebKit resolves a child's
  // percentage height past an auto-height block against the enclosing flex
  // column, so with the default by-content host the counters grew to the column
  // and spilled out of the timer in Safari while Chrome showed nothing wrong.
  it('does not size the root box with a percentage height', () => {
    const rootRule = styleElement.match(/\.countdownContainer \{[^}]*\}/);

    expect(rootRule[0]).not.toMatch(/[^-]height:/);
  });

  // Both selectors appear twice - once sharing a rule with their label
  // counterpart, once on their own - so every matching rule has to be checked
  // rather than just the first one.
  const rulesFor = (selector) => styleElement.match(new RegExp(`\\${selector} \\{[^}]*\\}`, 'g')) || [];

  it('reaches the counters, which are what the styling controls target', () => {
    expect(rulesFor('.countersContainer').some((r) => /flex-grow:\s*1/.test(r))).toBe(true);
    expect(rulesFor('.counterContainer').some((r) => /height:\s*100%/.test(r))).toBe(true);
  });

  // The floor moves with the chosen D/H/M/S format and with the counter and label
  // font sizes, so a single number in the manifest cannot describe it. Clamping
  // the resize frame to it belongs to the editor, which can measure the element.
  it('declares no static size minimum', () => {
    for (const control of PANE_SIZES) {
      expect(control.params.width.minValue).toBeUndefined();
      expect(control.params.height.minValue).toBeUndefined();
    }
  });
});

// The timer's settings - the countdown, the digits, the unit names - are one editor control,
// first on the timer's only tab in each environment, as a game's rewards are. With nothing on
// General the editor shows no Style/General switch.
describe('SysCountdownTimer settings in the pane', () => {
  const GROUPS = manifest.propertyPaneModel.content.filter((c) => c.type === 'GROUP');

  // the editor reads the tab as environment groups only while its first item is one; anything
  // placed before them would turn the whole tab into plain controls
  it('sit in the environment groups, with nothing beside them', () => {
    expect(manifest.propertyPaneModel.content.every((c) => c.type === 'GROUP')).toBe(true);
  });

  // the control names the props it edits, the timer's content: the editor's SDK describes and
  // writes a control by its own path, and the group's would be the timer's styles
  it('come first in both environments, on the timer\'s content', () => {
    expect(GROUPS.map((group) => group.propPath[1])).toEqual(['desktop', 'mobile']);

    for (const group of GROUPS) {
      expect(group.children[0]).toEqual({ type: 'CONTROL', name: 'DATEPICKER_COUNTDOWN_TIMER', propPath: ['content'] });
    }
  });

  it('leave the General tab empty, the format and the unit names switch included', () => {
    expect(manifest.propertyPaneModel.general).toBeUndefined();
    // with no General tab there is nothing to keep open
    expect(manifest.keepGeneralTabOpenUntilInteracted).toBeUndefined();

    const controls = GROUPS.flatMap((group) => group.children);
    expect(controls.some((c) => c.propPath?.includes('format') || c.propPath?.includes('labelsEnabled'))).toBe(false);
  });

  it('start with hours, minutes and seconds, the unit names switched on', () => {
    expect(manifest.props.content.format).toBe('HH:MM:SS');
    expect(manifest.props.content.labelsEnabled).toBe(true);
  });
});
