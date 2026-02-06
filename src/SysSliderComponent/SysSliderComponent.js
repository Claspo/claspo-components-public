import WcElement from "@claspo/renderer/sdk/WcElement";

import SysSliderManifest from "./SysSlider.manifest";
import getStyleElement from "./getStyleElement";
import { Swiper, DIRECTIONS, EVENTS } from "./Swiper";
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';

export default class SysSliderComponent extends WcElement {
  static define = {
    name: 'sys-slider',
    model: SysSliderManifest.name,
    manifest: SysSliderManifest,
  };

  manifest = SysSliderManifest;

  swiper = null;
  sliderInitialised = false;
  currentSlideIndex = 0;
  sliderResizeObserver;
  slideSwitchTimeout;
  viewHasPendingResources;
  resourcesLoadedListener;

  prevSlideControlClass = 'prevSlideControl';
  nextSlideControlClass = 'nextSlideControl';
  dotsContainerClass = 'navigationDotsContainer';

  constructor() {
    super();
    this.originalApplyStylesToElement = this.applyStylesToElement;
    this.applyStylesToElement = this.applyStylesToElementOverride;
    this.getRootElement().innerHTML = `
      ${getStyleElement()}
      <div class="slider-container">
        <div cl-render-outlet class="slides-container"></div>
      </div>
      <div class="indicatorControl" cl-element="indicator"></div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.viewHasPendingResources = this.viewResourceManager.viewHasPendingResources();
    this.createArrowControls();
    this.listenForSlideshowStopOnHover();

    if (window.ResizeObserver) {
      this.sliderResizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }

        if (this.sliderInitialised) {
          this.slideTo(this.currentSlideIndex, 0);
        }
      });

      this.sliderResizeObserver.observe(this.getHostElement());
    }

    if (this.viewHasPendingResources) {
      this.resourcesLoadedListener = this.services.eventEmitter.on('VIEW_COMPONENT_RESOURCES_LOADED', () => {
        this.slideTo(this.currentSlideIndex);
        this.viewHasPendingResources = false;
      });
    }

    this.observeProps((prev, next) => {
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);

      this.createArrowControls();

      // wait for children to render
      setTimeout(() => {
        if (!this.viewHasPendingResources) {
          this.slideTo(this.sliderInitialised ? next.content.slideIndex : 0);
        }
        this.updateDotsControl();
      });
    });

    if (this.getAvailableSwipes()) {
      this.turnOnSwiping();
    }
  };

  getAvailableSwipes() {
    const isStatic = this.isStaticRenderMode();
    const { sliderMode } = this.getProps().content || {};

    return isStatic && sliderMode !== 'ONE_RANDOM';
  }

  canSwipe(direction) {
    if (this.isFirstSlideActive() && direction === DIRECTIONS.RIGHT) {
      return false;
    }

    if (this.isLastSlideActive() && direction === DIRECTIONS.LEFT) {
      return false;
    }

    return true;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const hostElement = this.getHostElement();
    hostElement.removeEventListener('mouseenter', this.stopSlideshow);
    hostElement.removeEventListener('mouseleave', this.resetSlideshow);

    if (this.resourcesLoadedListener) {
      this.resourcesLoadedListener.off();
    }

    if (window.ResizeObserver) {
      this.sliderResizeObserver?.unobserve(this.getHostElement());
    }

    this.swiper?.destroy();
  }

  getSlideElements() {
    return Array
      .from(this.getRootElement().querySelector('.slides-container').children)
      .filter(element => element.getAttribute('cl-type') === 'CONTAINER' || element.getAttribute('cl-type') === 'SLIDE');
  }

  shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  isRTL() {
    return getComputedStyle(this.getHostElement()).direction === 'rtl';
  }

  shuffleSlides() {
    const rootElement = this.getRootElement();
    const slidesContainer = rootElement.querySelector('.slides-container');
    const reshuffledChildren = this.shuffleArray([...slidesContainer.children]);

    reshuffledChildren.forEach((child, newIndex) => {
      child.style.order = newIndex;
    });
  }

  turnOnSwiping() {
    this.swiper = new Swiper(this.getRootElement().querySelector('.slider-container'));
    this.swiper.on(EVENTS.SWIPE_ENDED, ({ direction }) => {
      if (direction === DIRECTIONS.LEFT || direction === DIRECTIONS.RIGHT) {
        if (direction === DIRECTIONS.LEFT) {
          if (this.canSwipe(DIRECTIONS.LEFT)) {
            this.slideTo(this.currentSlideIndex + 1);
          } else {
            this.resetSlidePosition();
          }
        } else {
          if (this.canSwipe(DIRECTIONS.RIGHT)) {
            this.slideTo(this.currentSlideIndex - 1);
          } else {
            this.resetSlidePosition();
          }
        }
      } else {
        this.resetSlidePosition();
      }
    });
    this.swiper.on(EVENTS.SWIPING_IN_PROCESS, ({ direction, deltaX }) => {
      const shiftValue = this.getSlideShiftValue(this.currentSlideIndex) + deltaX;
      const MAX_THRESHOLD_FOR_DISABLED = this.swiper.minSwipeDistance * 1.5;
      const nextValue = this.canSwipe(direction) ?
        shiftValue :
        direction === DIRECTIONS.RIGHT
          ? Math.min(shiftValue, MAX_THRESHOLD_FOR_DISABLED)
          : Math.max(shiftValue, this.getSlideShiftValue(this.currentSlideIndex) - MAX_THRESHOLD_FOR_DISABLED);

      this.applyShiftValue(nextValue, 0);
    });
  }

  getSlideWidth() {
    const hostElement = this.getHostElement();
    const hostElementStyles = getComputedStyle(hostElement);
    return (parseFloat(hostElementStyles.width) - parseFloat(hostElementStyles.borderWidth) * 2);
  }

  getSlideShiftValue(index) {
    const shiftDirection = this.isRTL() ? 1 : -1;
    return index === 0 ? 0 : shiftDirection * (this.getSlideWidth() * index);
  }

  applyShiftValue(shiftValue = 0, animationDuration = 0) {
    const element = this.getRootElement().querySelector('.slides-container');
    element.style.transition = `transform ${animationDuration}ms`;
    element.style.transform = `translate3d(${shiftValue}px, 0px, 0px)`;
  }

  slideTo(index, speed, shouldNotSlideFurtherIfMouseover) {
    const {
      sliderMode,
      isSlidingIntervalEnabled,
      slidingInterval,
      stopSlideshowOnMouseover,
      loopSlides,
    } = this.getProps().content || {};

    if (
      !this.sliderInitialised &&
      this.isStaticRenderMode() &&
      (sliderMode === 'RANDOM_ORDER' || sliderMode === 'ONE_RANDOM')
    ) {
      this.shuffleSlides();
    }

    this.sliderInitialised = true;
    const shiftValue = this.getSlideShiftValue(index);

    clearTimeout(this.slideSwitchTimeout);

    this.currentSlideIndex = index;
    this.updateArrowsAvailabilities();

    this.applyShiftValue(shiftValue, speed ?? window.clSliderSpeed ?? 300);

    this.highlightActiveSlideOnDotsControl(index);

    if (
      isSlidingIntervalEnabled &&
      slidingInterval &&
      sliderMode !== 'ONE_RANDOM'
    ) {
      if (this.isUpdatingRenderMode()) {
        return;
      }

      if (shouldNotSlideFurtherIfMouseover && stopSlideshowOnMouseover) {
        return;
      }

      let nextIndex;
      if (this.isRTL()) {
        const isReachedLeftEdge = index - 1 < 0;
        nextIndex = isReachedLeftEdge ? this.getSlideElements().length - 1 : index - 1;

        if (isReachedLeftEdge && !loopSlides) {
          return;
        }
      } else {
        const isReachedRightEdge = index + 1 > this.getSlideElements().length - 1;
        nextIndex = isReachedRightEdge ? 0 : index + 1;

        if (isReachedRightEdge && !loopSlides) {
          return;
        }
      }

      this.slideSwitchTimeout = setTimeout(
        () => this.slideTo(nextIndex),
        +slidingInterval * 1000
      );
    }
  }

  resetSlidePosition() {
    const slideValue = this.getSlideShiftValue(this.currentSlideIndex);
    this.applyShiftValue(slideValue, 300);
  }

  updateArrowsAvailabilities() {
    const { loopSlides } = this.getProps().content || {};

    const prevControlElement = this.getRootElement().querySelector(`.${this.prevSlideControlClass}`);

    if (prevControlElement) {
      const isReachedLeftEdge = this.currentSlideIndex <= 0;
      if (isReachedLeftEdge && !loopSlides) {
        prevControlElement.classList.add('not-reachable-element');
      } else {
        prevControlElement.classList.remove('not-reachable-element');
      }
    }

    const nextControlElement = this.getRootElement().querySelector(`.${this.nextSlideControlClass}`);

    if (nextControlElement) {
      const isReachedRightEdge = this.currentSlideIndex + 1 >= this.getSlideElements().length;
      if (isReachedRightEdge && !loopSlides) {
        nextControlElement.classList.add('not-reachable-element');
      } else {
        nextControlElement.classList.remove('not-reachable-element');
      }
    }
  }

  highlightActiveSlideOnDotsControl(index) {
    const dotsCoinainer = this.getRootElement().querySelector('.navigationDotsContainer');

    if (!dotsCoinainer) {
      return;
    }

    [...dotsCoinainer.children].forEach(dot => dot.classList.remove('active'));

    dotsCoinainer.querySelector(`.navigationDot:nth-child(${index + 1})`)?.classList.add('active');
  }

  createPrevSlideControl(arrowIcon) {
    const prevControlElement = document.createElement('div');
    prevControlElement.classList.add(this.prevSlideControlClass);
    if (this.isUpdatingRenderMode()) {
      prevControlElement.classList.add('highligh-on-hover-with-pseudo-element');
    }
    prevControlElement.setAttribute('cl-element', 'arrows');
    insertHtmlIntoElement({
      element: prevControlElement,
      html: arrowIcon,
    });
    prevControlElement.onclick = (event) => {
      event.stopPropagation();

      if (this.isUpdatingRenderMode()) {
        return;
      }


      let newIndex;
      if (this.isRTL()) {
        const isReachedRightEdge = this.currentSlideIndex + 1 > this.getSlideElements().length - 1;
        newIndex = isReachedRightEdge ? 0 : this.currentSlideIndex + 1;
      } else {
        const isReachedLeftEdge = this.currentSlideIndex - 1 < 0;
        newIndex = isReachedLeftEdge ? this.getSlideElements().length - 1 : this.currentSlideIndex - 1;
      }

      this.slideTo(newIndex, null, true);
    };

    return prevControlElement;
  }

  createNextSlideControl(arrowIcon) {
    const nextControlElement = document.createElement('div');
    nextControlElement.classList.add(this.nextSlideControlClass);
    if (this.isUpdatingRenderMode()) {
      nextControlElement.classList.add('highligh-on-hover-with-pseudo-element');
    }
    nextControlElement.setAttribute('cl-element', 'arrows');
    insertHtmlIntoElement({
      element: nextControlElement,
      html: arrowIcon,
    });
    nextControlElement.onclick = (event) => {
      event.stopPropagation();

      if (this.isUpdatingRenderMode()) {
        return;
      }


      let newIndex;
      if (this.isRTL()) {
        const isReachedLeftEdge = this.currentSlideIndex - 1 < 0;
        newIndex = isReachedLeftEdge ? this.getSlideElements().length - 1 : this.currentSlideIndex - 1;
      } else {
        const isReachedRightEdge = this.currentSlideIndex + 1 > this.getSlideElements().length - 1;
        newIndex = isReachedRightEdge ? 0 : this.currentSlideIndex + 1;
      }

      this.slideTo(newIndex, null, true);
    };

    return nextControlElement;
  }

  createNavigationDotsSlideControl(activeDotIndex) {
    const navigationDotsContainer = document.createElement('div');
    navigationDotsContainer.classList.add(this.dotsContainerClass);
    if (this.isUpdatingRenderMode()) {
      this.getRootElement().querySelector('.indicatorControl').classList.add('highligh-on-hover');
    }

    for (let i = 0; i < this.getSlideElements().length; i++) {
      const sliderNavigationDot = document.createElement('div');
      sliderNavigationDot.classList.add('navigationDot');

      if (i === activeDotIndex) {
        sliderNavigationDot.classList.add('active');
      }

      sliderNavigationDot.onclick = (event) => {
        event.stopPropagation();

        if (this.isUpdatingRenderMode()) {
          return;
        }

        this.slideTo(i, null, true);
      };

      navigationDotsContainer.appendChild(sliderNavigationDot);
    }

    return navigationDotsContainer;
  }

  removeDotsControl() {
    const rootElement = this.getRootElement();
    const dotsContainer = rootElement.querySelector(`.${this.dotsContainerClass}`);

    if (dotsContainer) {
      dotsContainer.remove();
    }
  }

  applyStylesToElementOverride(htmlElement, elementModel, commonStyleElement) {
    if (elementModel.element === 'arrows') {
      if (!('marginLeft' in elementModel.styleAttributes)) {
        elementModel.styleAttributes.marginLeft = '15px';
        elementModel.styleAttributes.marginRight = '15px';
      }
    }

    this.originalApplyStylesToElement(htmlElement, elementModel, commonStyleElement);
  }

  updateDotsControl() {
    const props = this.getProps();

    if (props.content.sliderMode === 'ONE_RANDOM'
      || props.content.showIndicator === false
    ) {
      return this.removeDotsControl();
    }

    setTimeout(() => {
      const currentDotsContainer = this.getRootElement().querySelector('.navigationDotsContainer');

      if (!currentDotsContainer || currentDotsContainer.children.length !== this.getSlideElements().length) {
        const isInitialCreate = !currentDotsContainer;
        currentDotsContainer?.remove();
        const navigationDotsSlideControl = this.createNavigationDotsSlideControl(isInitialCreate ? 0 : this.getSlideElements().length - 1);
        this.getRootElement().querySelector('.indicatorControl').append(navigationDotsSlideControl);
      }
    });
  }

  removeArrowControls() {
    const rootElement = this.getRootElement();

    const prevCtrl = rootElement.querySelector(`.${this.prevSlideControlClass}`);
    const nextCtrl = rootElement.querySelector(`.${this.nextSlideControlClass}`);

    if (prevCtrl || nextCtrl) {
      prevCtrl?.remove();
      nextCtrl?.remove();
    }
  }

  createArrowControls() {
    const props = this.getProps();

    if (
      props.content.sliderMode === 'ONE_RANDOM'
      || props.content.showArrows === false
    ) {
      return this.removeArrowControls();
    }

    const rootElement = this.getRootElement();

    if (rootElement.querySelector(`.${this.prevSlideControlClass}`)) {
      return;
    }

    const arrowIcon = `
      <svg viewBox="0 0 11 7">
        <path d="M 10.5248 1.90196L 9.57381 2.71322L 6.05712 5.71322L 5.24395 6.40691L 4.4324 5.71132L 0.949088 2.72576L 0 1.91229L 1.62694 0.0141139L 2.57603 0.827583L 5.24778 3.11756L 7.9513 0.811257L 8.90228 0L 10.5248 1.90196Z"/>
      </svg>
    `;

    const prevSlideControl = this.createPrevSlideControl(arrowIcon);
    const nextSlideControl = this.createNextSlideControl(arrowIcon);

    this.getRootElement().append(prevSlideControl, nextSlideControl);
  }

  stopSlideshow() {
    clearTimeout(this.slideSwitchTimeout);
  }

  resetSlideshow() {
    this.slideTo(this.currentSlideIndex);
  }

  listenForSlideshowStopOnHover() {
    if (!this.getProps().content.stopSlideshowOnMouseover) {
      return;
    }

    const hostElement = this.getHostElement();
    hostElement.addEventListener('mouseenter', this.stopSlideshow);
    hostElement.addEventListener('mouseleave', this.resetSlideshow);
  }

  isLastSlideActive() {
    return this.currentSlideIndex === this.getSlideElements().length - 1;
  }

  isFirstSlideActive() {
    return this.currentSlideIndex === 0;
  }
}
