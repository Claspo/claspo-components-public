import WcElement from "@claspo/renderer/sdk/WcElement";

import SysPromoCodeManifest from "./SysPromoCode.manifest";
import promocodeStyles from "./promocodeStyles";
import copyToClipboard from "@claspo/common/dom/copyToClipboard";
import promocodeTooltipTranslations from "./promocodeTooltipTranslations";
import strokeIcons from "@claspo/renderer/wc-renderer/icons/promoCodeStrokeIcons";
import copyIcons from "@claspo/renderer/wc-renderer/icons/promoCodeCopyIcons";
import tooltipStyles from "./tooltipStyles";
import {setTooltipPosition} from '@claspo/renderer/sdk/TooltipUtils';
import {setFocusOutline} from '@claspo/renderer/sdk/HtmlStyleUtils';
import {ContextEvents} from "@claspo/renderer/sdk/context/ContextEvents";
import SysEventTypes from "@claspo/renderer/common/SysEventTypes";
import PrizePoolEvents from "@claspo/renderer/prize-pool/PrizePoolEvents";
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';

const LAST_PROMOCODE_RECORD_KEY = 'lastPromoCode';

export default class SysPromoCodeComponent extends WcElement {
  static define = {
    name: 'sys-promo-code',
    model: SysPromoCodeManifest.name,
    manifest: SysPromoCodeManifest,
  };

  manifest = SysPromoCodeManifest;

  tooltipContainerElement;
  firstTooltipTimer;
  secondTooltipTimer;
  thirdTooltipTimer;
  boundOnScrollHandler;
  contextSubscriptions = [];
  prizePool = null;
  prizePoolSubscription = null;
  prizePoolCode = null;
  promoCodeShownEmitted = false;

  tooltipStylesId = 'cl-promo-code-tooltip-styles';
  inlineEditPromocodeClass = 'cl--inline--edit';
  inlineEditAttributeName = 'cl-inline-edit';
  inlineEditAttributeValue = 'content, text';
  isByContainerWidth = false;
  isByContentWidth = false;

  constructor() {
    super();

    this.getRootElement().innerHTML = `
    <style>${promocodeStyles}</style>
    <button class="text" cl-element="text">
        <span class="${this.inlineEditPromocodeClass}" ${this.inlineEditAttributeName}="${this.inlineEditAttributeValue}"></span>
    </button>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addTooltipStyles();

    const textElement = this.getElement('text');
    const inlineEditElement = textElement.querySelector(`[${this.inlineEditAttributeName}="${this.inlineEditAttributeValue}"]`);

    this.contextSubscriptions = [
      this.services.context.on(ContextEvents.RECORD_ADDED, this._handleContextRecord.bind(this)),
      this.services.context.on(ContextEvents.RECORD_UPDATED, this._handleContextRecord.bind(this)),
      this.services.context.on(ContextEvents.RECORD_DELETED, this._handleContextRecord.bind(this))
    ];

    if (this.isStaticRenderMode()) {
      textElement.addEventListener('click', (e) => {
        e.stopPropagation();
        copyToClipboard(inlineEditElement.textContent)
          .then(() => {
            this.destroyTooltip();
            this.clearTooltipTimers();
            this.removeScrollListener();
            this.renderTooltip(textElement);
          })
          .catch((e) => console.error('SysPromoCodeComponent couldn\'t write to clipboard', e));

        // stopPropagation() prevents from bubbling to widget click handler
        this.services.trackingService.send(`FormClick_[Name]`);

        this.services.trackingService.trackClick({countAsTargetAction: this.getProps().content.countAsTargetAction});
        this.services.trackingService.trackTargetAction(this.getProps().content.countAsTargetAction);
      });
    }

    this.observeProps((prev, next) => {
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);

      this.checkWidthMode(next);

      this.renderCode(next);

      this.mapAlignValueToTextElementContent(this.getElement('text'));
      this.mapStyleControlValuesToInnerContent();
      this.showIconIfAny(textElement, next);
      this.storeStrokeTopWidthAsCssVar();
      this.handleSafariHeightIssue();
      setFocusOutline(this.getElement('text'));
    });

    this.observeShared(() => {
      this.mapAlignValueToTextElementContent(this.getElement('text'));
      this.mapStyleControlValuesToInnerContent();
    });

    this.observeEnvironment(() => {
      this.handleSafariHeightIssue();
      this.mapStyleControlValuesToInnerContent();
    });

    this.connectToPrizePool();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.destroyTooltip();
    this.clearTooltipTimers();
    this.removeScrollListener();
    this.removeTooltipStyles();

    this.contextSubscriptions.forEach(subscription => subscription.off());

    if (this.prizePoolSubscription) {
      this.prizePoolSubscription.off();
      this.prizePoolSubscription = null;
    }
  };

  /**
   * A widget holds one prize pool per prize-carrying component, and this component's own props
   * name the one it hands out: two Promocodes on two branches of a flow are two codes. A static
   * render loads that pool through the factory; the editor's updating render answers the deferred
   * request with a push addressed to this component, and a push for another component is ignored.
   *
   * A pool that cannot be handed out keeps the widget from rendering at all - the pending resource
   * this takes is never released - because a promo code that redeems nothing is worse than no
   * widget.
   */
  connectToPrizePool() {
    if (this.isStaticRenderMode()) {
      const prize = this.getProps().content.prize;
      // TODO: temporal backward compatibility for old PrizePool.ts that can't handle absent "prize" object. Remove code starting from here
      const hasPoolToResolve = !!prize && (!!prize.id || !!prize.options || prize.model === 'FIXED');

      if (!hasPoolToResolve) {
        this.applyPrizePoolPrize(null);
        return Promise.resolve();
      }
      // TODO: and up to here

      this.prizePool = this.services.prizePoolFactory.get(prize, this.getModel().id);
      this.componentResourceManager.getPending().increment();

      return this.prizePool.load()
        .then(() => this.prizePool.getPrize())
        .then(
          (prize) => {
            this.componentResourceManager.getPending().decrement();
            this.applyPrizePoolPrize(prize);
          },
          (error) => {
            // the pending resource is deliberately NOT released: rendering waits on it, so a pool
            // that cannot be handed out - no usable options, or the request failed - leaves the
            // widget unshown rather than presenting a promo code that redeems nothing
            console.error('SysPromoCodeComponent: prize pool unavailable, the widget stays hidden', error);
          },
        );
    } else {
      this.prizePoolSubscription = this.services.eventEmitter.on(
        PrizePoolEvents.PRIZE_POOL_UPDATED,
        async ({componentId, prizePool}) => {
          // a widget holds one pool per prize-carrying component, so a push is only this
          // component's when it is addressed to it - two Promocodes on two branches of a flow
          // would otherwise show whichever code arrived last
          if (this.getModel().id !== componentId) {
            return;
          }

          this.prizePool = this.services.prizePoolFactory.get(prizePool, this.getModel().id);
          this.applyPrizePoolPrize(await this.prizePool.getPrize());
        },
      );

      // components present while the editor is still loading would emit into the
      // void - defer the request one task (same workaround as the gamified base)
      setTimeout(() => {
        this.services.eventEmitter.emit(PrizePoolEvents.REQUEST_PRIZE_POOL, this.getModel().id);
      });
    }
  }

  applyPrizePoolPrize(prize) {
    this.prizePoolCode = prize?.value || null;
    this.renderCode(this.getProps());
    this.emitPromoCodeShownOnce();
  }

  emitPromoCodeShownOnce() {
    if (this.promoCodeShownEmitted) {
      return;
    }

    const code = this.getResolvedCode() || this.getProps().content.text;
    if (!code) {
      return;
    }

    this.promoCodeShownEmitted = true;
    this.services.eventEmitter.emit(SysEventTypes.PROMO_CODE_SHOWN, {
      code,
      autoRedeem: this.getProps()?.content?.autoRedeem !== false,
    });
  }

  renderTooltip(textElement) {
    const translation = this.getTranslationsMap(promocodeTooltipTranslations).translations;

    this.tooltipContainerElement = document.createElement('div');
    this.tooltipContainerElement.classList.add('cl-promo-code-tooltip-container');

    const tooltipTextElement = document.createElement('div');
    tooltipTextElement.style.padding = '5px';
    tooltipTextElement.style.color = '#fff';
    tooltipTextElement.innerText = translation;

    this.tooltipContainerElement.append(tooltipTextElement);
    this.htmlDocumentObject.body.appendChild(this.tooltipContainerElement);

    this.firstTooltipTimer = setTimeout(() => {
      setTooltipPosition({
        triggerElement: textElement,
        tooltipElement: this.tooltipContainerElement,
        htmlDocumentObject: this.htmlDocumentObject,
      });

      this.boundOnScrollHandler = () => setTooltipPosition({
        triggerElement: textElement,
        tooltipElement: this.tooltipContainerElement,
        htmlDocumentObject: this.htmlDocumentObject,
      });
      document.addEventListener('scroll', this.boundOnScrollHandler, true);

      this.secondTooltipTimer = setTimeout(() => {
        this.removeScrollListener();

        this.tooltipContainerElement.style.transition = '0.15s';
        this.tooltipContainerElement.style.top = `${textElement.getBoundingClientRect().top + window.pageYOffset}px`;
        this.tooltipContainerElement.style.opacity = '0';

        this.thirdTooltipTimer = setTimeout(() => {
          this.destroyTooltip();
        }, 150);
      }, 1500);
    });
  }

  getTooltipTopPosition(textElement, containerElementCoords, tooltipIconHeight) {
    const textElementCoords = textElement.getBoundingClientRect();
    return `${textElementCoords.top - containerElementCoords.height - tooltipIconHeight + window.pageYOffset}px`;
  }

  getTooltipLeftPosition(textElement, containerElementCoords) {
    const textElementCoords = textElement.getBoundingClientRect();
    return `${textElementCoords.left + (textElementCoords.width / 2) - (containerElementCoords.width / 2) + window.pageXOffset}px`;
  }

  destroyTooltip() {
    if (this.tooltipContainerElement) {
      this.tooltipContainerElement.remove();
      this.tooltipContainerElement = null;
    }
  }

  clearTooltipTimers() {
    clearTimeout(this.firstTooltipTimer);
    clearTimeout(this.secondTooltipTimer);
    clearTimeout(this.thirdTooltipTimer);
  }

  removeScrollListener() {
    document.removeEventListener('scroll', this.boundOnScrollHandler, true);
  }

  mapStyleControlValuesToInnerContent() {
    const promocodeTextElement = this.getElement('text');
    const editableText = this.getRootElement().querySelector('[cl-inline-edit="content, text"]');

    const textOuterElement = this.getElement('text');
    const textInnerElement = textOuterElement.querySelector(`.${this.inlineEditPromocodeClass}`);

    textInnerElement.style.whiteSpace = this.isByContentWidth ? 'nowrap' : '';

    if (!promocodeTextElement || !editableText) {
      return;
    }

    editableText.style.minWidth = '20px';
    editableText.style.width = 'max-content';
    editableText.style.minHeight = promocodeTextElement.style.fontSize;

    editableText.style.textAlign = promocodeTextElement.style.textAlign;
    editableText.style.lineHeight = promocodeTextElement.style.lineHeight;
    editableText.style.fontWeight = promocodeTextElement.style.fontWeight;
    editableText.style.fontSize = promocodeTextElement.style.fontSize;
    editableText.style.textShadow = promocodeTextElement.style.textShadow;
    editableText.style.letterSpacing = promocodeTextElement.style.letterSpacing;
    editableText.style.fontFamily = promocodeTextElement.style.fontFamily;
  }

  mapAlignValueToTextElementContent(textElement) {
    if (textElement.style.textAlign === 'center') {
      textElement.style.justifyContent = 'center';
    }

    if (textElement.style.textAlign === 'start') {
      textElement.style.justifyContent = 'flex-start';
    }

    if (textElement.style.textAlign === 'end') {
      textElement.style.justifyContent = 'flex-end';
    }
  }

  handleSafariHeightIssue() {
    const host = this.getHostElement();

    if (host.style.height === 'auto') {
      host.style.height = 'fit-content';
    }
  }

  storeStrokeTopWidthAsCssVar() {
    const hostNode = this.getElement('host');
    const textNode = this.getElement('text');

    hostNode.style.setProperty('--clStrokeForIconWidth', textNode.style.borderTopWidth || 0);
  }

  destroyExistingIcon() {
    const iconNode = this.getRootElement().querySelector('[cl-element="icon"]');
    if (iconNode) {
      iconNode.remove();
    }
  }

  showIconIfAny(textElement, props) {
    const iconContent = props.content.iconContent;
    const inlineIndex = parseFloat(iconContent);
    const isInlineSvgIcon = !isNaN(inlineIndex);

    this.destroyExistingIcon();

    if (iconContent === null || iconContent === undefined) {
      return;
    }

    if (isInlineSvgIcon) {
      const isStrokeIcon = props.styles
        ? props.styles.find(el => el.element === 'icon').styleAttributes.position === 'absolute'
        : props.adaptiveStyles[this.getEnvironment()].find(el => el.element === 'icon').styleAttributes.position === 'absolute';
      const inlineContent = isStrokeIcon ? strokeIcons[inlineIndex] : copyIcons[inlineIndex];
      const iconNode = document.createElement('span');
      iconNode.classList.add('promocode-icon');
      iconNode.setAttribute('cl-element', 'icon');
      insertHtmlIntoElement({
        element: iconNode,
        html: inlineContent,
      });
      textElement.appendChild(iconNode);
    } else {
      const iconNode = document.createElement('img');
      iconNode.src = iconContent;
      iconNode.classList.add('promocode-icon');
      iconNode.setAttribute('cl-element', 'icon');
      textElement.appendChild(iconNode);
    }

    this.applyAutoAdaptiveStyles(props.adaptiveStyles, props.styles);
  }

  addTooltipStyles() {
    if (this.htmlDocumentObject.head.querySelector(`#${this.tooltipStylesId}`)) {
      return;
    }
    const styles = document.createElement('style');
    styles.setAttribute('id', this.tooltipStylesId);
    insertHtmlIntoElement({
      element: styles,
      html: tooltipStyles,
    });

    this.htmlDocumentObject.head.appendChild(styles);
  }

  removeTooltipStyles() {
    const styles = this.htmlDocumentObject.head.querySelector(`#${this.tooltipStylesId}`);
    if (styles) {
      styles.remove();
    }
  }

  _handleContextRecord(record) {
    if (record.key !== LAST_PROMOCODE_RECORD_KEY) {
      return;
    }

    this.renderCode(this.getProps());
  }

  /**
   * Display priority: the widget's pool code first, then published state - the
   * context "promoCode" key-value, then an earlier view's lastPromoCode record
   * (how widgets from before widget-level pools publish the code) - then
   * nothing: the caller falls back to the props placeholder.
   */
  getResolvedCode() {
    if (this.prizePoolCode) {
      return this.prizePoolCode;
    }

    const promoCodeValue = this.services.context.getKVMap().promoCode;
    if (promoCodeValue) {
      return promoCodeValue;
    }

    const lastPromoCodeRecord = this.services.context.getRecord(LAST_PROMOCODE_RECORD_KEY);
    if (lastPromoCodeRecord && lastPromoCodeRecord.value.viewIndex < this.getModel().path[0]) {
      return lastPromoCodeRecord.value.value || null;
    }

    return null;
  }

  renderCode(props) {
    const textOuterElement = this.getElement('text');
    const textInnerElement = textOuterElement.querySelector(`.${this.inlineEditPromocodeClass}`);
    const resolvedCode = this.getResolvedCode();

    this.applyInlineEditability(textInnerElement, !resolvedCode);

    if (resolvedCode) {
      textInnerElement.innerText = resolvedCode;
    } else {
      insertHtmlIntoElement({
        element: textInnerElement,
        html: props.content.text,
      });
    }
  }

  /** Only the props placeholder is editable inline - the attribute is the editor's guard. */
  applyInlineEditability(textInnerElement, editable) {
    if (editable) {
      textInnerElement.setAttribute(this.inlineEditAttributeName, this.inlineEditAttributeValue);
    } else {
      textInnerElement.removeAttribute(this.inlineEditAttributeName);
    }
  }

  checkWidthMode(props) {
    const env = this.getEnvironment();
    const hostWidth = props.adaptiveStyles[env]?.find(item => item.element === 'host')?.styleAttributes.width;

    this.isByContentWidth = hostWidth === 'auto';
    this.isByContainerWidth = hostWidth === '100%';
  }
}
