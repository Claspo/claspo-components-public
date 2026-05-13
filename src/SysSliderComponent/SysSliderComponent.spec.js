import SysSliderComponent from './SysSliderComponent';
import { createMockProps } from "../../tests/utils";
import { fireEvent } from "@testing-library/dom";


// Register the custom element
customElements.define('sys-slider', SysSliderComponent);


describe('SysSliderComponent', () => {
  let slider;
  let rootElement;


  let listener = (event) => {
    event.detail.props = createMockProps({
      content: {
        sliderMode: 'DEFAULT',
        isSlidingIntervalEnabled: true,
        slidingInterval: 2, // seconds
        stopSlideshowOnMouseover: true,
        adaptiveStyles: {},
        slideIndex: 0,
        loopSlides: true,
      },
    }
    );
  };

  beforeAll(() => {
    window.addEventListener('cl-props-request', listener);
  });

  afterAll(() => {
    window.removeEventListener('cl-props-request', listener);
  });

  beforeEach(() => {

    jest.useFakeTimers();
    const widgetContainerNode = document.createElement('div');
    // widgetContainerNode.setAttribute('cl-type', 'CONTAINER');
    widgetContainerNode.setAttribute('cl-path', '0');
    slider = new SysSliderComponent();
    widgetContainerNode.appendChild(slider);
    document.body.appendChild(widgetContainerNode);

    rootElement = slider.getRootElement();

    // Mock slides
    const slidesContainer = rootElement.querySelector('.slides-container');
    for (let i = 0; i < 3; i++) {
      const slide = document.createElement('div');
      slide.setAttribute('cl-type', 'CONTAINER');
      slide.setAttribute('cl-id', `${i}`);
      slidesContainer.appendChild(slide);
    }
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should initialize with default settings', () => {

    // Check that arrow controls are created
    const prevControl = rootElement.querySelector('.prevSlideControl');
    const nextControl = rootElement.querySelector('.nextSlideControl');
    expect(prevControl).not.toBeNull();
    expect(nextControl).not.toBeNull();

  });

  test('RTL: should navigate to the prev(last) slide on next arrow click', () => {
    // GIVEN
    slider.isRTL = () => true;
    slider.createArrowControls();
    expect(slider.isRTL()).toBe(true);
    expect(slider.currentSlideIndex).toBe(0);

    // WHEN
    jest.advanceTimersByTime(2000); // slidingInterval * 1000

    // THEN
    expect(slider.currentSlideIndex).toBe(2);
  });

  test('LTR: should navigate to the next slide on next arrow click', () => {
    // GIVEN
    const nextControl = rootElement.querySelector('.nextSlideControl');
    expect(slider.currentSlideIndex).toBe(0);

    // WHEN
    nextControl.click();

    // THEN
    expect(slider.currentSlideIndex).toBe(1);
  });

  test('should navigate to the next slide on Enter keydown on next arrow', () => {
    const nextControl = rootElement.querySelector('.nextSlideControl');

    fireEvent.keyDown(nextControl, { key: 'Enter' });

    expect(slider.currentSlideIndex).toBe(1);
  });

  test('LTR: should navigate to the previous slide on prev arrow click', () => {
    // GIVEN
    const prevControl = rootElement.querySelector('.prevSlideControl');
    slider.currentSlideIndex = 1;

    // WHEN
    prevControl.click();

    // THEN
    expect(slider.currentSlideIndex).toBe(0);
  });

  test('should expose slider controls as keyboard-focusable buttons', () => {
    const prevControl = rootElement.querySelector('.prevSlideControl');
    const nextControl = rootElement.querySelector('.nextSlideControl');
    slider.getSlideElements = () => [document.createElement('div'), document.createElement('div')];
    const dotsContainer = slider.createNavigationDotsSlideControl(0);
    const firstDot = dotsContainer.querySelector('.navigationDot');

    expect(prevControl.getAttribute('role')).toBe('button');
    expect(prevControl.getAttribute('tabindex')).toBe('0');
    expect(nextControl.getAttribute('role')).toBe('button');
    expect(nextControl.getAttribute('tabindex')).toBe('0');
    expect(firstDot.getAttribute('role')).toBe('button');
    expect(firstDot.getAttribute('tabindex')).toBe('0');
  });

  test('should auto-slide between slides at specified interval', async () => {
    // GIVEN
    expect(slider.currentSlideIndex).toBe(0);


    // WHEN
    // Fast-forward time to trigger auto-slide
    jest.advanceTimersByTime(2000); // slidingInterval * 1000


    // THEN
    expect(slider.currentSlideIndex).toBe(1);

    // AND
    jest.advanceTimersByTime(2000);


    // THEN
    expect(slider.currentSlideIndex).toBe(2);

    // AND
    // Should loop back to the first slide
    jest.advanceTimersByTime(2000);


    // THEN
    expect(slider.currentSlideIndex).toBe(0);
  });

  test('should stop auto-sliding on mouseover when enabled', () => {

    const hostElement = slider.getHostElement();
    jest.advanceTimersByTime(0);
    expect(slider.currentSlideIndex).toBe(0);

    // Simulate mouseenter
    fireEvent.mouseEnter(hostElement);

    // Fast-forward time
    jest.advanceTimersByTime(2000);

    // Slide index should remain the same
    expect(slider.currentSlideIndex).toBe(0);

    // Simulate mouseleave
    fireEvent.mouseLeave(hostElement);

    // Auto-sliding should resume
    jest.advanceTimersByTime(2000);
    expect(slider.currentSlideIndex).toBe(1);
  });

  test('should display one random slide in ONE_RANDOM mode', () => {

    // GIVEN
    slider.getProps = () => ({
      content: {
        sliderMode: 'ONE_RANDOM',
        isSlidingIntervalEnabled: false,
        stopSlideshowOnMouseover: false,
        adaptiveStyles: {},
        slideIndex: 0,
      },
    });


    // WHEN
    slider.createArrowControls();

    // THEN
    const slides = slider.getSlideElements();
    expect(slides.length).toBeGreaterThan(0);

    // Ensure navigation controls are removed
    const prevControl = rootElement.querySelector('.prevSlideControl');
    const nextControl = rootElement.querySelector('.nextSlideControl');
    expect(prevControl).toBeNull();
    expect(nextControl).toBeNull();

    // Ensure navigation dots are removed
    const dotsContainer = rootElement.querySelector('.navigationDotsContainer');
    expect(dotsContainer).toBeNull();
  });

  test('should clean up listeners on disconnection', () => {

    const hostElement = slider.getHostElement();
    const removeEventListenerSpy = jest.spyOn(hostElement, 'removeEventListener');

    slider.disconnectedCallback();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseenter', slider.stopSlideshow);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseleave', slider.resetSlideshow);

    // Verify that resource loaded listener is removed
    if (slider.resourcesLoadedListener) {
      expect(slider.resourcesLoadedListener.off).toHaveBeenCalled();
    }

    // Verify that resize observer is unobserved
    if (window.ResizeObserver) {
      const unobserveSpy = jest.spyOn(slider.sliderResizeObserver, 'unobserve');
      expect(unobserveSpy).toHaveBeenCalledWith(slider.getHostElement());
    }
  });
})
  ;
