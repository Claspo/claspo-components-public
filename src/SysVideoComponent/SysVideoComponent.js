import WcElement from "@claspo/renderer/sdk/WcElement";
import { PreviewMode } from '@claspo/renderer/sdk/PreviewMode';

import SysVideoManifest from "./SysVideo.manifest";
import getStyleElement from "./getStyleElement";


export default class SysVideoComponent extends WcElement {
  static define = {
    name: 'sys-video',
    model: SysVideoManifest.name,
    manifest: SysVideoManifest,
  };

  manifest = SysVideoManifest;

  resizeObserver;

  constructor() {
    super();
    this.getRootElement().innerHTML = `
      ${getStyleElement()}
      <div class="main-container" cl-element="main">
        <div class="video-overlay" cl-element="overlay"></div>
        <iframe
          id="youtube-player"
          src=""
          allow="autoplay"
          frameborder="0">
        </iframe>
      </div>
    `;
  }

  handleOverlayKeydown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    event.currentTarget.click();
  };

  connectedCallback() {
    super.connectedCallback();
    const rootElement = this.getRootElement();
    const isInEditor = this.isUpdatingRenderMode();
    const isInSmallPreview = this.services.config.getConfig(PreviewMode.CABINET_PREVIEW);

    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver((entries) => {
        window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }

          const rect = entries[0].contentRect;
          this.adjustVideoHeight(this.getProps().content.aspectRatio, rect.width);
        });
      });

      this.resizeObserver.observe(rootElement.querySelector(".main-container"));
    }

    const getIsAutoplayEnabled = (isAutoplayEnabled) => {
      if (isInEditor || isInSmallPreview) {
        return false;
      }
      return isAutoplayEnabled;
    };

    const setVideoParams = (videoId, isAutoplayEnabled) => {
      const player = rootElement.querySelector('#youtube-player');

      if (videoId) {
        const updatedSrc = `https://www.youtube.com/embed/${videoId}?controls=1${getIsAutoplayEnabled(isAutoplayEnabled) ? '&autoplay=1&mute=1' : ''}`;
        if (!player || player.src !== updatedSrc) {
          const updatedIframe = this.createUpdatedIFrame(updatedSrc);

          rootElement.querySelector('#youtube-player')?.remove();
          rootElement.querySelector('.main-container').appendChild(updatedIframe);

          if (getIsAutoplayEnabled(isAutoplayEnabled)) {
            updatedIframe.onload = () => {
              this.hidePreviewImage(rootElement);
            };
          }
        }
      } else {
        rootElement.querySelector('#youtube-player')?.remove();
      }
    };

    this.observeProps((prev, next) => {
      const env = this.getEnvironment();
      const customCover = next.adaptiveStyles[env]?.find(item => item.element === 'overlay')?.styleAttributes.background;

      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);

      if (!isInSmallPreview) {
        setVideoParams(next.content.videoId, next.content.autoplay);
      }

      if (isInSmallPreview || customCover) {
        this.displayPreviewImageAfterImageLoaded(rootElement, next.content.videoPreviewImageUrl, customCover, setVideoParams);
      }

      this.updatePlayButtonVisibility(next, customCover, isInSmallPreview);

      this.adjustVideoHeight(next.content.aspectRatio);
    });
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    if (window.ResizeObserver) {
      this.resizeObserver?.unobserve(this.getRootElement().querySelector(".main-container"));
    }
  };

  adjustVideoHeight(aspectRatio, width) {
    if (!aspectRatio) {
      return;
    }

    const hostElement = this.getHostElement();
    const numericWidth = width || hostElement.getBoundingClientRect().width;
    const calculatedHeightValue = `${numericWidth / aspectRatio}px`;

    hostElement.style.height = calculatedHeightValue;
    hostElement.style.minHeight = calculatedHeightValue;
  }

  updatePlayButtonVisibility(props, customCover, isInSmallPreview) {
    const previewEl = this.getRootElement().querySelector('.video-overlay');
    const playBtnVisibilityFlag = '--cl-video-component-play-btn-visibility';

    if (isInSmallPreview && !customCover) {
      return previewEl.style.setProperty(playBtnVisibilityFlag, 'visible');
    }

    if (!customCover) {
      return previewEl.style.setProperty(playBtnVisibilityFlag, 'hidden');
    }

    if (props.content.showPlayButton) {
      previewEl.style.setProperty(playBtnVisibilityFlag, 'visible');
    } else {
      previewEl.style.setProperty(playBtnVisibilityFlag, 'hidden');
    }
  }

  preloadImage(src, cb) {
    const img = new Image();
    img.src = src;
    img.onload = () => cb();
    img.onerror = () => cb();
  }

  displayPreviewImageAfterImageLoaded(rootElement, imgUrl, customCover) {
    if (!imgUrl && !customCover) {
      return;
    }

    const isInDev = this.isUpdatingRenderMode();
    const player = rootElement.querySelector('#youtube-player');

    if (customCover) {
      const url = customCover.split(')')[0].slice(5, -1);

      if (!isInDev && player) {
        player.style.opacity = '0';
      }

      this.preloadImage(url, () => {
        this.displayPreviewImage(rootElement, imgUrl, customCover);

        if (!isInDev && player) {
          player.style.opacity = '1';
        }
      });
    } else {
      this.displayPreviewImage(rootElement, imgUrl, customCover);
    }
  }

  displayPreviewImage(rootElement, imgUrl, customCover) {
    const previewEl = rootElement.querySelector('.video-overlay');
    const player = rootElement.querySelector('#youtube-player');
    previewEl.style.setProperty('--cl-video-component-overlay-visibility', 'visible');
    previewEl.setAttribute('role', 'button');
    previewEl.setAttribute('tabindex', '0');
    previewEl.setAttribute('aria-label', 'Play video');

    if (!customCover) {
      setTimeout(() => previewEl.style.backgroundImage = `url(${imgUrl})`);
    }

    if (!player) {
      return;
    }

    previewEl.onclick = () => {
      player.src = player.src + '&autoplay=1';
      player.onload = () => this.hidePreviewImage(rootElement);
    };
    previewEl.onkeydown = this.handleOverlayKeydown;
  }

  hidePreviewImage(rootElement) {
    const previewEl = rootElement.querySelector('.video-overlay');
    previewEl.style.setProperty('--cl-video-component-overlay-visibility', 'hidden');
    previewEl.style.setProperty('--cl-video-component-play-btn-visibility', 'hidden');
    previewEl.style.backgroundImage = `none`;
    previewEl.removeAttribute('tabindex');
    previewEl.removeAttribute('role');
    previewEl.removeAttribute('aria-label');
    previewEl.onkeydown = null;
  }

  createUpdatedIFrame(updatedSrc) {
    const iframeElement = document.createElement('iframe');
    iframeElement.src = updatedSrc;
    iframeElement.id = 'youtube-player';
    iframeElement.allow = 'autoplay';
    iframeElement.setAttribute('frameborder', '0');

    return iframeElement;
  }
}
