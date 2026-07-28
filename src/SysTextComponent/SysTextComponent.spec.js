import SysTextComponent from './SysTextComponent';
import { createStaticTextRoller, createUpdatingTextRoller } from './TextRoller';

jest.mock('./TextRoller', () => ({
  createStaticTextRoller: jest.fn(),
  createUpdatingTextRoller: jest.fn(),
}));

describe('SysTextComponent.processTextRoller', () => {
  const rollerProps = { options: ['Option 1'], styleAttributes: {}, animationSpeedInSec: 1 };

  // processTextRoller only needs getElement/isStaticRenderMode from the instance,
  // so it is invoked on a stub to avoid the custom-element constructor
  const processTextRoller = (container, textrollers, isStatic = false) =>
    SysTextComponent.prototype.processTextRoller.call(
      {
        getElement: () => container,
        isStaticRenderMode: () => isStatic,
      },
      textrollers,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('processes a roller that is a direct child of the text element', () => {
    const container = document.createElement('div');
    container.innerHTML = 'Hello <span cl-type="TEXT_ROLLER" cl-id="r1"><span>Option 1</span></span>';

    processTextRoller(container, { r1: rollerProps });

    expect(createUpdatingTextRoller).toHaveBeenCalledTimes(1);
    expect(createUpdatingTextRoller).toHaveBeenCalledWith(container.querySelector('[cl-id="r1"]'), rollerProps);
  });

  it('processes a roller nested inside inline formatting wrappers', () => {
    const container = document.createElement('div');
    container.innerHTML =
      '<span style="">Spin to <span cl-type="TEXT_ROLLER" cl-id="r1"><span>Claim</span></span> <b>your <span cl-type="TEXT_ROLLER" cl-id="r2"><span>Prize</span></span></b></span>';

    processTextRoller(container, { r1: rollerProps, r2: rollerProps });

    expect(createUpdatingTextRoller).toHaveBeenCalledTimes(2);
    expect(createUpdatingTextRoller).toHaveBeenCalledWith(container.querySelector('[cl-id="r1"]'), rollerProps);
    expect(createUpdatingTextRoller).toHaveBeenCalledWith(container.querySelector('[cl-id="r2"]'), rollerProps);
  });

  it('uses the static roller in static render mode', () => {
    const container = document.createElement('div');
    container.innerHTML = '<span style="">Hi <span cl-type="TEXT_ROLLER" cl-id="r1"><span>Option 1</span></span></span>';

    processTextRoller(container, { r1: rollerProps }, true);

    expect(createStaticTextRoller).toHaveBeenCalledTimes(1);
    expect(createStaticTextRoller).toHaveBeenCalledWith(container.querySelector('[cl-id="r1"]'), rollerProps);
    expect(createUpdatingTextRoller).not.toHaveBeenCalled();
  });

  it('skips rollers with no props entry and handles a missing text element', () => {
    const container = document.createElement('div');
    container.innerHTML = '<span cl-type="TEXT_ROLLER" cl-id="unknown"><span>Option 1</span></span>';

    processTextRoller(container, {});
    processTextRoller(null, { r1: rollerProps });

    expect(createUpdatingTextRoller).not.toHaveBeenCalled();
    expect(createStaticTextRoller).not.toHaveBeenCalled();
  });
});
