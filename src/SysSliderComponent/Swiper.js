import DefaultEventEmitter from "@claspo/common/DefaultEventEmitter";

export const DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
  NONE: 'none'
}

export const EVENTS = {
  SWIPE_LEFT: 'swipe-left',
  SWIPE_RIGHT: 'swipe-right',
  SWIPE_UP: 'swipe-up',
  SWIPE_DOWN: 'swipe-down',
  SWIPING_IN_PROCESS: 'swiping-in-process',
  SWIPE_STARTED: 'swipe-started',
  SWIPE_ENDED: 'swipe-ended'
}

export class Swiper extends DefaultEventEmitter {
  _startX;
  _startY;
  _endX;
  _endY;

  minSwipeDistance = 50;

  constructor(element) {
    super();
    this.element = element;
    this.registerTouchEvents();
  }

  destroy() {
    if (!this.element) {
      return;
    }

    this.element.removeEventListener("touchstart", this._handleTouchStart, false);
    this.element.removeEventListener("touchmove", this._handleTouchMove, false);
    this.element.removeEventListener("touchend", this._handleSwipingEnd, false);
    this.element.removeEventListener("mousedown", this._handleMouseDown, false);
    this.element.removeEventListener("mousemove", this._handleMouseMove, false);
    document.removeEventListener("mouseup", this._handleSwipingEnd, true);
    this.element = null;
  }

  registerTouchEvents() {
    this.element.addEventListener("touchstart", this._handleTouchStart, false);
    this.element.addEventListener("touchmove", this._handleTouchMove, false);
    this.element.addEventListener("touchend", this._handleSwipingEnd, false);
    this.element.addEventListener("mousedown", this._handleMouseDown, false);
  }

  // #region Touch Event Handlers
  _handleTouchStart = (event) => {
    event.stopPropagation();
    this._startX = event.touches[0].clientX;
    this._startY = event.touches[0].clientY;
    this._endX = this._startX;
    this._endY = this._startY;
    this._notifySwipeStarted();
  }

  _handleTouchMove = (event) => {
    event.stopPropagation();
    this._endX = event.touches[0].clientX;
    this._endY = event.touches[0].clientY;
    this._notifySwipingInProcess();
  }
  // #endregion

  // #region Mouse Event Handlers
  _handleMouseDown = (event) => {
    event.stopPropagation();
    this._startX = event.clientX;
    this._startY = event.clientY;
    this.element.addEventListener("mousemove", this._handleMouseMove, false);
    document.addEventListener("mouseup", this._handleSwipingEnd, true);
    this._notifySwipeStarted();
  }

  _handleMouseMove = (event) => {
    event.stopPropagation();
    this._endX = event.clientX;
    this._endY = event.clientY;
    this._notifySwipingInProcess();
  }
  // #endregion

  // #region Common Event Handlers
  _handleSwipingEnd = (event) => {
    event.stopPropagation();
    this.element.removeEventListener("mousemove", this._handleMouseMove, false);
    document.removeEventListener("mouseup", this._handleSwipingEnd, true);

    this.emit(EVENTS.SWIPE_ENDED, {
      direction: this._getSwipeDirection(),
    });
  }
  // #endregion

  _getSwipeDirection = () => {
    const deltaX = this._endX - this._startX;
    const deltaY = this._endY - this._startY;

    // Check if the swipe distance meets the minimum requirement
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
      // Horizontal Swipe
      if (deltaX > 0) {
        return DIRECTIONS.RIGHT;
      } else {
        return DIRECTIONS.LEFT;
      }
    } else if (Math.abs(deltaY) > this.minSwipeDistance) {
      // Vertical Swipe
      if (deltaY > 0) {
        return DIRECTIONS.DOWN;
      } else {
        return DIRECTIONS.UP;
      }
    }

    return DIRECTIONS.NONE;
  }

  _notifySwipeStarted = () => {
    this.emit(EVENTS.SWIPE_STARTED, { startX: this._startX, startY: this._startY });
  }

  _notifySwipingInProcess = () => {
    const deltaX = this._endX - this._startX;
    const deltaY = this._endY - this._startY;
    const direction = this._getSwipeDirection();

    this.emit(EVENTS.SWIPING_IN_PROCESS, {
      startX: this._startX,
      startY: this._startY,
      endX: this._endX,
      endY: this._endY,
      deltaX,
      deltaY,
      direction
    });
  }
}
