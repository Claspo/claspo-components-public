import fs from 'fs';
import path from 'path';

jest.mock('@claspo/renderer/sdk/ManifestUtils', () => ({
  // the real one clones a control list across desktop/mobile; only the shape
  // matters here, so hand the list straight back
  cloneControlsToAllEnvs: (controls) => controls,
}));

// eslint-disable-next-line import/first
import manifest from './SysChoiceButtons.manifest';

const componentStyle = fs.readFileSync(path.join(__dirname, 'componentStyle.js'), 'utf8');

const sizeControl = (controls) => controls.find((c) => c.name === 'SIZE');
const hostStyles = (env) => manifest.props.adaptiveStyles[env].find((s) => s.element === 'host').styleAttributes;

const FLOATING_SIZE = sizeControl(manifest.floatingControlsModel);
const PANE_SIZE = sizeControl(manifest.propertyPaneModel.content);

describe('SysChoiceButtons height', () => {
  // Unlike the checkbox and radio components this one was modelled on, these are
  // buttons: height is part of the design, not just a function of the content.
  it('is offered on the drag handles', () => {
    expect(FLOATING_SIZE.params?.height?.hide).toBeFalsy();
  });

  it('can be set to a fixed value or left to the content', () => {
    expect(PANE_SIZE.params.height.options).toEqual(['fixed', 'hug']);
  });

  it.each(['desktop', 'mobile'])('starts out following the content on %s', (env) => {
    // the pane reads 'auto' as "hug"; see getTypeByValue in the editor
    expect(hostStyles(env).height).toBe('auto');
  });

  it('still lets the width be filled, which height cannot be', () => {
    expect(PANE_SIZE.params.width.options).toContain('fill');
    expect(PANE_SIZE.params.height.options).not.toContain('fill');
  });

  // Offering the control is only half of it: without this the buttons keep their
  // own height and a set height just leaves empty space under them.
  it('is shared out across the buttons by the stylesheet', () => {
    const buttonRule = componentStyle.match(
      /\.buttons-container \[cl-element="button"\] \{[^}]*\}/
    );

    expect(buttonRule).not.toBeNull();
    expect(buttonRule[0]).toMatch(/flex-grow:\s*1/);
  });

  // The host height has to travel through the wrapper chain before the buttons
  // can share it. The host is the flex container and each wrapper a growing
  // item, so the height moves through flex sizing; min-height:0 lets the chain
  // clamp to a host smaller than the buttons.
  it('is carried inwards by the stylesheet', () => {
    const hostRule = componentStyle.match(/:host \{[^}]*\}/);

    expect(hostRule).not.toBeNull();
    expect(hostRule[0]).toMatch(/display:\s*flex/);
    expect(hostRule[0]).toMatch(/flex-direction:\s*column/);

    ['.main-container', '.container-with-label', '.container-with-tooltip'].forEach((selector) => {
      const rule = componentStyle.match(new RegExp(`\\${selector} \\{[^}]*\\}`));

      expect(rule).not.toBeNull();
      expect(rule[0]).toMatch(/flex:\s*1 1 auto/);
      expect(rule[0]).toMatch(/min-height:\s*0/);
    });
  });

  // Percentage heights on the wrappers are what flex sizing replaces. Not just
  // redundant: in a quirks-mode document (the dashboard preview iframes are
  // about:blank, some customer pages carry no doctype) WebKit resolves a
  // percentage height past the auto-height host against the enclosing page
  // column, so the buttons grew to the column and spilled out of the component
  // in Safari while Chrome showed nothing wrong.
  it('does not size the wrappers with a percentage height', () => {
    ['.main-container', '.container-with-label', '.container-with-tooltip'].forEach((selector) => {
      const rule = componentStyle.match(new RegExp(`\\${selector} \\{[^}]*\\}`));

      expect(rule[0]).not.toMatch(/[^-]height:/);
    });
  });
});
