import SysButtonManifest from "./SysButton.manifest";
import sysButtonStyles from "./SysButton.styles";
import WcElement from "@claspo/renderer/sdk/WcElement";
import { HandlerTypes } from "@claspo/common/handler/HandlerTypes";
import SysActionTypes from "@claspo/renderer/action/SysActionTypes";
import getComponentCountOnView from "@claspo/renderer/sdk/getComponentCountOnView";
import { setFocusOutline } from '@claspo/renderer/sdk/HtmlStyleUtils';
import { setInvalidStyle } from '@claspo/renderer/sdk/FormUtils';
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';


export default class SysButtonComponent extends WcElement {
  static define = {
    name: 'sys-button',
    model: SysButtonManifest.name,
    manifest: SysButtonManifest
  };
  manifest = SysButtonManifest;

  invalidListener;
  validListener;
  stylesUpdateObserver;


  constructor() {
    super();
    this.getRootElement().innerHTML = `
<style>${sysButtonStyles}</style>
<div class="main-container">
  <button cl-element="button">
    <div class="editable-text" cl-inline-edit="content, text"></div>
  </button>

  <div class="input-tooltip">
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 13.0604C1.5 19.4116 6.6481 24.5605 13.0075 24.5605C19.353 24.5605 24.5 19.4107 24.5 13.0604C24.5 6.70865 19.3531 1.55909 13.0075 1.55908C6.64806 1.55908 1.5 6.7077 1.5 13.0604ZM12.9775 17.9668C12.7032 17.9668 12.4807 17.7443 12.4807 17.47C12.4807 17.1956 12.7032 16.9732 12.9775 16.9732C13.2519 16.9732 13.4743 17.1956 13.4743 17.47C13.4743 17.7443 13.2519 17.9668 12.9775 17.9668ZM12.9775 13.4764C12.7032 13.4764 12.4807 13.254 12.4807 12.9796L12.4807 8.48924C12.4807 8.21487 12.7032 7.99245 12.9775 7.99245C13.2519 7.99245 13.4743 8.21487 13.4743 8.48924L13.4743 12.9796C13.4743 13.254 13.2519 13.4764 12.9775 13.4764Z" fill="#FF0000" stroke="white" stroke-width="2"></path>
    </svg>
  </div>
</div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.stylesUpdateObserver = new MutationObserver(this.mapStyleControlValuesToInnerButtonContent.bind(this));
    this.stylesUpdateObserver.observe(this.getRootElement().querySelector('button'), {
      attributes: true,
      childList: false,
      subtree: false
    });

    const buttonElement = this.getElement('button');
    buttonElement.addEventListener('click', (e) => {
      this.services.trackingService.send(`FormButtonClick_[Name]`);
    });

    if (this.getProps().handlers) {
      const clickHandler = this.getProps().handlers.find(handler => handler.type === 'CLICK');

      if (clickHandler && clickHandler.actions) {
        const subscribeContactAction = clickHandler.actions.find(action => action.type === 'SUBSCRIBE_CONTACT');
        const requestAction = clickHandler.actions.find(action => action.type === 'REQUEST');

        if (subscribeContactAction) {
          this.invalidListener = this.services.eventEmitter.on('SET_SUBSCRIBE_CONTACT_BUTTON_AS_INVALID', () => {
            this.showErrorTooltip('EMAIL_OR_PHONE_IS_REQUIRED');
          });

          this.validListener = this.services.eventEmitter.on('SET_SUBSCRIBE_CONTACT_BUTTON_AS_VALID', () => {
            this.hideErrorTooltip();
          });
        }

        if (subscribeContactAction || requestAction) {
          this.services.eventEmitter.on('CONTACT_DATA_SUBMIT', () => {
            buttonElement.disabled = true;
          });
        }
      }
    }

    this.observeProps((prev, next) => {
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);
      setFocusOutline(this.getElement('button'));
      this.mapStyleControlValuesToInnerButtonContent();

      const button = this.getRootElement().querySelector('button');
      this.updateButtonTextNode(next);
      this.createIconNode(button);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.invalidListener) {
      this.invalidListener.off();
    }

    if (this.validListener) {
      this.validListener.off();
    }

    this.stylesUpdateObserver?.disconnect();
  }

  hideErrorTooltip = () => {
    this.getRootElement()
      .querySelector('.input-tooltip')
      .style.visibility = 'hidden';
  }

  updateButtonTextNode = (props) => {
    const existingEditableTextNode = this.getRootElement().querySelector('.editable-text');
    insertHtmlIntoElement({
      element: existingEditableTextNode,
      html: props.content.text,
    });
  }

  mapStyleControlValuesToInnerButtonContent = () => {
    const button = this.getRootElement().querySelector('button');
    const editableText = this.getRootElement().querySelector('.editable-text');

    if (!button || !editableText) {
      return;
    }

    this.mapAlignValueToButtonContent(button);

    editableText.style.minWidth = '20px';
    editableText.style.width = 'max-content';
    editableText.style.minHeight = button.style.fontSize;

    // Workaround for inline edit (copying text-related styles, so inline edit looks same)
    editableText.style.textAlign = button.style.textAlign;
    editableText.style.lineHeight = button.style.lineHeight;
    editableText.style.fontWeight = button.style.fontWeight;
    editableText.style.fontSize = button.style.fontSize;
    editableText.style.textShadow = button.style.textShadow;
    editableText.style.textTransform = button.style.textTransform;
    editableText.style.letterSpacing = button.style.letterSpacing;
    editableText.style.fontFamily = button.style.fontFamily;
  }

  mapAlignValueToButtonContent = (button) => {
    if (button.style.textAlign === 'center') {
      button.style.alignItems = 'center';
      button.style.justifyContent = 'center';
    }

    if (button.style.textAlign === 'start') {
      button.style.alignItems = button.style.flexDirection === 'column' ? 'flex-start' : 'center';
      button.style.justifyContent = button.style.flexDirection === 'column' ? 'center' : 'flex-start';
    }

    if (button.style.textAlign === 'end') {
      button.style.alignItems = button.style.flexDirection === 'column' ? 'flex-end' : 'center';
      button.style.justifyContent = button.style.flexDirection === 'column' ? 'center' : 'flex-end';
    }
  }

  createIconNode = (button) => {
    if (!button.querySelector('.icon')) {
      const iconElement = document.createElement('p');
      iconElement.classList.add('icon');
      button.appendChild(iconElement);
    }
  }
  showErrorTooltip = (errorKey) => {
    const mainContainerElement = this.getRootElement().querySelector('.main-container');
    const tooltipElement = mainContainerElement.querySelector('.input-tooltip');

    const componentLanguageMap = this.getTranslationsMap(this.manifest.i18n).translations;
    const targetPropPathKey = Object.keys(componentLanguageMap).find(key => key.includes(errorKey));
    const translatedValue = targetPropPathKey ? componentLanguageMap[targetPropPathKey] : errorKey;

    setInvalidStyle(mainContainerElement, tooltipElement, translatedValue, this.htmlDocumentObject);
  }

  getHandlers = () => {
    let handlers = (this.getProps().handlers && this.getProps().handlers.length)
      ? [...this.getProps().handlers]
      : [];
    const model = this.getModel();

    if (
      (model?.path?.[0] === undefined)
      || !this.documentModel
    ) {
      return handlers;
    }

    const currentView = this.documentModel.getView(model.path[0]);

    let clickHandler = handlers
      ?.find(handler => handler.type === HandlerTypes.CLICK);

    if (!clickHandler) {
      return handlers;
    }

    const hasSubmitAction = clickHandler.actions?.some(a => {
      return [
        SysActionTypes.REQUEST,
        SysActionTypes.SUBSCRIBE_CONTACT,
      ].includes(a.type);
    });

    const feedbackAndNpsComponentsCount = getComponentCountOnView(currentView, 'SysFeedbackComponent')
      + getComponentCountOnView(currentView, 'SysNetPromoterScoreComponent');

    if ((feedbackAndNpsComponentsCount !== 1) || !hasSubmitAction) {
      return handlers;
    }

    clickHandler.actions = clickHandler.actions?.filter(a => {
      return ![
        SysActionTypes.GO_TO_VIEW,
        SysActionTypes.GO_TO_PREVIOUS_VIEW,
        SysActionTypes.GO_TO_NEXT_VIEW,
      ].includes(a.type);
    });

    handlers = [
      ...handlers.filter(handler => handler.type !== HandlerTypes.CLICK),
      clickHandler
    ]

    return handlers;
  }
}
