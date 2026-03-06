import addEventListenerToElement from "@claspo/common/utils/addEventListener";
import SysImageManifest from "./SysImage.manifest";
import WcElement from "@claspo/renderer/sdk/WcElement";
import getStyleElement from "./getStyleElement";
import omitKeys from '@claspo/common/object/omitKeys';
import { getAdaptiveStylesForPlatform, replaceStyleAttributes } from '@claspo/renderer/sdk/ModelStyleUtils';

export const VerticalPosition = {
  TOP: 'top',
  CENTER: 'center',
  BOTTOM: 'bottom'
}
export const HorizontalPosition = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right'
}

export const PositioningModes = {
  FIXED: 'fixed',
  STICKY: 'sticky',
}

export default class SysImageComponent extends WcElement {
  static define = {
    name: 'sys-image',
    model: SysImageManifest.name,
    manifest: SysImageManifest,
  };


  constructor() {
    super();
    this.originalApplyAutoAdaptiveStyles = this.applyAutoAdaptiveStyles;
    this.applyAutoAdaptiveStyles = this.applyStylesRespectingRelativePositioning;
    this.getRootElement().innerHTML = `
        ${getStyleElement()}
        <img cl-element="image" draggable="false" alt="">
    `;
    /**
     * height: auto; is a fix for webkit browsers that overrides the height of the host element, for more details
     * @see: https://stackoverflow.com/questions/8468066/child-inside-parent-with-min-height-100-not-inheriting-height
     */

  }

  connectedCallback() {
    super.connectedCallback();
    this.skipGameBlur = !this._isFloating();

    this.componentResourceManager.getPending().increment();
    this.recalculateStylesAfterImageLoad();

    this.observeProps((prev, next) => {
      this.applyAutoAdaptiveStyles(next.adaptiveStyles);

      const imageElement = this.getElement('image');

      if (
        next.control?.imageSource.url
        && imageElement
        // possible fix for TypeError: Cannot set properties of undefined (setting 'src')
        && 'src' in imageElement
      ) {
        imageElement.src = next.control.imageSource.url;
      }

      const nextUrl = next.control.imageSource.url;
      const prevUrl = prev && prev.control.imageSource.url;

      const nextInlineSVGUrl = String(next.control.imageSource.url).endsWith('.svg') ? next.control.imageSource.url : null;
      const prevInlineSVGUrl = prev && String(prev.control.imageSource.url).endsWith('.svg') ? prev.control.imageSource.url : null;

      if (nextInlineSVGUrl) {

        if (nextInlineSVGUrl === prevInlineSVGUrl) {
          this.applyAdaptiveStyles(next);
          return;
        }

        this.deleteElementIfPresent(this.getRootElement(), 'img');
        this.upsertSvg(this.getRootElement(), nextInlineSVGUrl).then(() => {
          this.applyAdaptiveStyles(next);
        });

      } else if (nextUrl) {

        if (nextUrl === prevUrl) {
          this.applyAdaptiveStyles(next);
          return;
        }

        this.deleteElementIfPresent(this.getRootElement(), '.svgOverflowContainer');
        this.upsertImage(this.getRootElement(), nextUrl)
          .then(() => {
            this.applyAdaptiveStyles(next);
            // this.componentResourceManager.getPending().decrement();

          });


      } else {

        this.deleteElementIfPresent(this.getRootElement(), '.svgOverflowContainer');
        this.upsertImage(this.getRootElement(), this.assets('img/image-placeholder.svg'))
          .then(() => {
            this.applyAdaptiveStyles(next);
          });

      }


    });

  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resourcesLoadedListener?.off();
  }

  applyStylesRespectingRelativePositioning() {
    const adaptiveStyles = this.processPositioningStyles(this.getProps());
    this.originalApplyAutoAdaptiveStyles(adaptiveStyles);
    this.fixFloatingImageSize(adaptiveStyles);
  }

  recalculateStylesAfterImageLoad() {
    this.resourcesLoadedListener = this.services.eventEmitter.on('VIEW_COMPONENT_RESOURCES_LOADED', () => {
      requestAnimationFrame(() => {
        this.applyAdaptiveStyles(this.getProps());
      });
    });
  }

  processPositioningStyles(props) {
    const adaptiveStyles = props.adaptiveStyles;
    const mode = props.control?.positioningMode || PositioningModes.FIXED;

    if (mode === PositioningModes.FIXED) {
      return adaptiveStyles
    }

    const environment = this.getEnvironment();
    const positioning = props.control?.positioning?.[environment] || {};
    const diff = positioning?.diff || {};
    const hasDiff = Boolean('x' in diff && 'y' in diff);

    if (!hasDiff) {
      return adaptiveStyles;
    }

    const { styleAttributes } = getAdaptiveStylesForPlatform(adaptiveStyles, environment, 'host');
    const { width, height } = this._getHostNewDimensionsWithStyles(styleAttributes);
    const newStyleAttributes = omitKeys(styleAttributes, ['left', 'right', 'top', 'bottom']);

    // process x
    const xCenter = width / 2;
    const shiftedX = diff.x - xCenter;
    if (positioning.horizontalPosition === HorizontalPosition.LEFT) {
      newStyleAttributes.left = `${shiftedX}px`;
      newStyleAttributes.right = 'auto';
    } else if (positioning.horizontalPosition === HorizontalPosition.RIGHT) {
      newStyleAttributes.right = `${-width - shiftedX}px`;
      newStyleAttributes.left = 'auto';
    } else {
      newStyleAttributes.left = `calc(50% + ${shiftedX}px)`;
      newStyleAttributes.right = 'auto';
    }

    // process y
    const yCenter = height / 2;
    const shiftedY = diff.y - yCenter;
    if (positioning.verticalPosition === VerticalPosition.TOP) {
      newStyleAttributes.top = `${shiftedY}px`;
      newStyleAttributes.bottom = 'auto';
    } else if (positioning.verticalPosition === VerticalPosition.BOTTOM) {
      newStyleAttributes.bottom = `${-height - shiftedY}px`;
      newStyleAttributes.top = 'auto';
    } else {
      newStyleAttributes.top = `calc(50% + ${shiftedY}px)`;
      newStyleAttributes.bottom = 'auto';
    }

    return replaceStyleAttributes(adaptiveStyles, environment, 'host', newStyleAttributes);
  }

  deleteElementIfPresent(rootElement, cssSelector) {
    const element = rootElement.querySelector(cssSelector);
    if (element) {
      element.remove();
    }
  }

  upsertSvg(rootElement, inlineSVGUrl) {
    const alreadyPresent = rootElement.querySelector('svg');

    // if we have the same SVG then we do not have to redraw
    if (alreadyPresent && alreadyPresent.getAttribute('inline-svg-url') === inlineSVGUrl) {
      return Promise.resolve();

      // if we have different SVG, then we have to redraw
    } else if (alreadyPresent) {
      this.deleteElementIfPresent(this.getRootElement(), '.svgOverflowContainer');
    }

    return fetch(inlineSVGUrl).then(r => r.text()).then((inlineSVG) => {
      const htmlTemplateElement = document.createElement('template');
      const containerWithOverflow = document.createElement('div');
      containerWithOverflow.style.overflow = 'hidden';
      containerWithOverflow.style.width = '100%';
      containerWithOverflow.style.height = 'inherit';
      containerWithOverflow.classList.add('svgOverflowContainer');

      htmlTemplateElement.append(containerWithOverflow);
      htmlTemplateElement.firstChild.innerHTML = inlineSVG.trim();

      const svgElementContainer = htmlTemplateElement.firstChild;
      const svgNode = svgElementContainer.querySelector('svg');
      svgNode.setAttribute('cl-element', 'image');
      svgNode.setAttribute('inline-svg-url', inlineSVGUrl);

      this.componentResourceManager.getPending().decrement();
      rootElement.append(svgElementContainer);
      return rootElement;
    }).catch((err) => {
      console.error(err);
      this.upsertImage(rootElement, null);
    });

  }

  upsertImage(rootElement, imgUrl) {
    const alreadyPresentImgElement = rootElement.querySelector('img');
    if (alreadyPresentImgElement) {
      alreadyPresentImgElement.src = imgUrl;
      addEventListenerToElement(alreadyPresentImgElement, 'load', () => {
        this.componentResourceManager.getPending().decrement();
      });
      addEventListenerToElement(alreadyPresentImgElement, 'error', () => {
        this.componentResourceManager.onResourceLoadFailure(alreadyPresentImgElement.src);
      });
      return Promise.resolve();
    }

    const imageElement = new Image();
    imageElement.setAttribute('cl-element', 'image');
    imageElement.src = imgUrl;
    addEventListenerToElement(imageElement, 'load', () => {
      this.componentResourceManager.getPending().decrement();
    });
    addEventListenerToElement(imageElement, 'error', () => {
      this.componentResourceManager.onResourceLoadFailure(imageElement.src);
    });
    rootElement.append(imageElement);

    return Promise.resolve();
  }

  applyAdaptiveStyles(next) {
    this.applyAutoAdaptiveStyles(next.adaptiveStyles);

    const environment = this.getEnvironment();

    const envModels = next.adaptiveStyles[environment];
    const hostElementModel = envModels.find(e => e.element === 'host');
    const imageElementModel = envModels.find(e => e.element === 'image');
    const imageElement = this.getElement('image');

    const svgObjectFitMapper = {
      cover: 'xMidYMid slice', contain: 'xMidYMid meet', none: '',
    };

    const isImageNodeSVG = imageElement && imageElement.nodeName === 'svg';
    const elementModelHasObjectFit = imageElementModel?.styleAttributes?.objectFit && svgObjectFitMapper.hasOwnProperty(imageElementModel.styleAttributes.objectFit);

    if (isImageNodeSVG && elementModelHasObjectFit) {
      imageElement.setAttribute('preserveAspectRatio', svgObjectFitMapper[imageElementModel.styleAttributes.objectFit]);

      if (imageElementModel.styleAttributes.objectFit === 'none') {
        imageElement.setAttribute('width', imageElement.viewBox.baseVal.width + 'px');
        imageElement.setAttribute('height', imageElement.viewBox.baseVal.height + 'px');
      } else {
        const aspectRatio = imageElement.viewBox.baseVal.width / imageElement.viewBox.baseVal.height;

        if (hostElementModel.styleAttributes.width !== 'auto' && hostElementModel.styleAttributes.height !== 'auto') {
          imageElement.setAttribute('height', '100%');
          imageElement.setAttribute('width', '100%');
          return;
        }

        if (hostElementModel.styleAttributes.width === 'auto' && hostElementModel.styleAttributes.height === 'auto') {
          imageElement.setAttribute('width', imageElement.viewBox.baseVal.width + 'px');
          imageElement.setAttribute('height', imageElement.viewBox.baseVal.height + 'px');
          return;
        }

        if (hostElementModel.styleAttributes.width === 'auto') {
          imageElement.setAttribute('height', '100%');

          if (hostElementModel.styleAttributes.height !== '100%' && hostElementModel.styleAttributes.height !== 'calc(100% - 0px)') {
            imageElement.setAttribute('width', `${Math.round(parseInt(hostElementModel.styleAttributes.height, 10) * aspectRatio)}px`);
          }
        }

        if (hostElementModel.styleAttributes.height === 'auto') {
          imageElement.setAttribute('width', '100%');

          if (hostElementModel.styleAttributes.width !== '100%' && hostElementModel.styleAttributes.width !== 'calc(100% - 0px)') {
            imageElement.setAttribute('height', `${Math.round(parseInt(hostElementModel.styleAttributes.width, 10) / aspectRatio)}px`);
          }
        }
      }
    }
  }

  fixFloatingImageSize(adaptiveStyles) {
    const imageElement = this.getElement('image');

    // svg image
    if (!imageElement) {
      return;
    }

    if (!this._isFloating()) {
      imageElement.style.width = '100%';
      return;
    }

    const imageStyles = getAdaptiveStylesForPlatform(adaptiveStyles, this.getEnvironment(), 'host');

    // when <img> has width 100% and floating host has width auto it causes image to change size depending on image position in widget:
    // the closer image to the left side of a widget, the smaller it gets. We could not find source of the issue,
    // it persists even at 10.11.23 revisions, so it's looks like browsers changed behaviour in recent versions
    if (imageStyles.styleAttributes.width === 'auto') {
      imageElement.style.width = '';
    } else {
      imageElement.style.width = '100%';
    }
  }

  _getHostNewDimensionsWithStyles(styleAttributes = {}) {
    const host = this.getHostElement();
    const dimensionalStyleNames = ['height', 'width', 'minHeight', 'minWidth', 'maxHeight', 'maxWidth', 'display'];
    dimensionalStyleNames.forEach((style) => {
      if (styleAttributes[style]) {
        host.style[style] = styleAttributes[style];
      } else if (host.style[style]) {
        host.style[style] = '';
      }
    });
    const { offsetWidth: width, offsetHeight: height } = host;
    return { width, height };
  }

  _isFloating() {
    return this.getProps().floating
      // for backward compatibility
      || this.getModel().floating;
  }
}
