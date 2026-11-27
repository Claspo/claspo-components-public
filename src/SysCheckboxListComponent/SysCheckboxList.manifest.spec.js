import manifest from './SysCheckboxList.manifest';
import componentStyle from './componentStyle';

const ENVS = ['desktop', 'mobile'];

const listPositionControls = (env) => manifest.propertyPaneModel.content
  .find((group) => group.propPath[1] === env)
  .children
  .filter((control) => control.name === 'LIST_POSITION');

const listContainerStyles = (env) => manifest.props.adaptiveStyles[env]
  .find((style) => style.element === 'listContainer')
  .styleAttributes;

describe('SysCheckboxList columns', () => {
  // The editor's list position control shows its Columns stepper only when the manifest asks for it,
  // and each environment has a control of its own.
  it.each(ENVS)('are offered by the list position control on %s', (env) => {
    const controls = listPositionControls(env);

    expect(controls).toHaveLength(1);
    expect(controls[0].params?.columnsEnabled).toBe(true);
  });

  // Columns are styles the editor writes into the list container; a new list starts without them,
  // as a flex column of options.
  it.each(ENVS)('are not there when a list is added on %s', (env) => {
    expect(listContainerStyles(env)).toEqual(expect.objectContaining({display: 'flex', flexDirection: 'column'}));
    expect(listContainerStyles(env)).not.toHaveProperty('gridTemplateColumns');
    expect(listContainerStyles(env)).not.toHaveProperty('--optionRowHeight');
  });

  // In columns the editor sets --optionRowHeight: auto on the list, so a wrapped label grows its row instead of
  // running into the next one; without it a row keeps the marker's height, as one-column lists always had.
  it('let a row grow with its label only while the list sets --optionRowHeight', () => {
    const rowRule = componentStyle.match(/\.checkmark-container \{[^}]*\}/);

    expect(rowRule).not.toBeNull();
    expect(rowRule[0]).toMatch(/[^-]height:\s*var\(--optionRowHeight,\s*var\(--inputSize,\s*22px\)\);/);
    expect(rowRule[0]).toMatch(/min-height:\s*var\(--inputSize,\s*22px\);/);
  });
});
