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
  // - which is why the control used to change nothing at all.
  it('is carried inwards by the stylesheet', () => {
    const rootRule = styleElement.match(/\.countdownContainer \{[^}]*\}/);

    expect(rootRule).not.toBeNull();
    expect(rootRule[0]).toMatch(/height:\s*100%/);
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

describe('SysCountdownTimer labels switch', () => {
  const LABELS_SWITCH = manifest.propertyPaneModel.general
    .find((c) => c.name === 'SWITCH' && c.propPath?.[1] === 'labelsEnabled');

  it('sits directly above the languages note', () => {
    const general = manifest.propertyPaneModel.general;

    expect(LABELS_SWITCH).toBeDefined();
    expect(LABELS_SWITCH.propPath).toEqual(['content', 'labelsEnabled']);
    // that note describes the Days/Hours/Minutes texts this switch controls
    expect(general.indexOf(LABELS_SWITCH))
      .toBe(general.findIndex((c) => c.name === 'SUPPORTED_LANGUAGES') - 1);
  });

  it('carries a label the editor can translate', () => {
    expect(LABELS_SWITCH.params.label).toMatch(/^[A-Z0-9_]+$/);
  });

  it('starts switched on', () => {
    expect(manifest.props.content.labelsEnabled).toBe(true);
  });
});
