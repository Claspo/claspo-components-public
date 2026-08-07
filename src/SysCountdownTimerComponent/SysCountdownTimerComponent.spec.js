jest.mock('./SysCountdownTimer.manifest', () => ({ __esModule: true, default: {} }));
jest.mock('./getStyleElement', () => ({ __esModule: true, default: jest.fn(() => '') }));
jest.mock('@claspo/common/utils/NumericDecline', () => ({ __esModule: true, default: jest.fn(() => '') }));
jest.mock('@claspo/common/utils/checkTimeZone', () => ({ checkTimeZone: jest.fn() }));
jest.mock('@claspo/common/dom/insertHtmlIntoElement', () => ({
  __esModule: true,
  default: ({ element, html }) => { element.innerHTML = html; },
}));
jest.mock('@claspo/renderer/sdk/WcElement', () => ({
  __esModule: true,
  default: class MockWcElement {},
}));

// eslint-disable-next-line import/first
import SysCountdownTimerComponent from './SysCountdownTimerComponent';

// createElementContainers touches no instance state, so it can be exercised
// straight off the prototype.
const createContainers = (labelsEnabled) => {
  const root = document.createElement('div');
  root.className = 'countdownContainer';
  const containers = SysCountdownTimerComponent.prototype.createElementContainers
    .apply({}, labelsEnabled === undefined ? [root] : [root, labelsEnabled]);

  return { root, containers };
};

describe('countdown timer labels', () => {
  it('shows the label row by default', () => {
    const { root } = createContainers(true);

    expect(root.querySelector('.labelsContainer')).not.toBeNull();
    expect(root.classList.contains('countdownContainer--noLabels')).toBe(false);
  });

  it('keeps the label row out of the document when switched off', () => {
    const { root } = createContainers(false);

    expect(root.querySelector('.labelsContainer')).toBeNull();
    expect(root.querySelector('.countersContainer')).not.toBeNull();
  });

  // The counters carry a bottom margin that only exists to separate them from
  // the labels, so the root is flagged for the stylesheet to drop it.
  it('flags the root so the gap under the counters goes away', () => {
    const { root } = createContainers(false);

    expect(root.classList.contains('countdownContainer--noLabels')).toBe(true);
  });

  // The counter and separator code writes into both rows regardless, so the
  // detached row still has to be handed back.
  it('still returns the label row so the counters can fill it', () => {
    const { containers } = createContainers(false);

    expect(containers.labelsContainerElement).toBeInstanceOf(HTMLElement);
    expect(containers.labelsContainerElement.className).toBe('labelsContainer');
  });

  // Widgets saved before the switch existed carry no such prop.
  it('shows labels when the caller says nothing', () => {
    const { root } = createContainers(undefined);

    expect(root.querySelector('.labelsContainer')).not.toBeNull();
  });
});
