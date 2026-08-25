import SysPromoCodeComponent from './SysPromoCodeComponent';
import PrizePoolEvents from '@claspo/renderer/prize-pool/PrizePoolEvents';
import SysEventTypes from '@claspo/renderer/common/SysEventTypes';

/**
 * The component unconditionally resolves the widget-level prize pool (a widget
 * has at most one, so every component sees the same prize) and displays its
 * code with priority pool > published state > props placeholder. The
 * published-code event waits for resolution; failures fall back to the
 * placeholder and never hide the widget. Any resolved code strips the
 * inline-edit attribute.
 */
describe('SysPromoCodeComponent pool resolution', () => {
  const INLINE_EDIT_ATTRIBUTE = 'cl-inline-edit';

  function buildTextDom() {
    const textOuterElement = document.createElement('button');
    const textInnerElement = document.createElement('span');
    textInnerElement.classList.add('cl--inline--edit');
    textInnerElement.setAttribute(INLINE_EDIT_ATTRIBUTE, 'content, text');
    textOuterElement.appendChild(textInnerElement);
    return {textOuterElement, textInnerElement};
  }

  function componentLike(overrides = {}) {
    const {textOuterElement, textInnerElement} = buildTextDom();
    const pendingResources = {increment: jest.fn(), decrement: jest.fn()};

    const component = {
      inlineEditPromocodeClass: 'cl--inline--edit',
      inlineEditAttributeName: INLINE_EDIT_ATTRIBUTE,
      inlineEditAttributeValue: 'content, text',
      prizePoolCode: null,
      prizePool: null,
      prizePoolSubscription: null,
      promoCodeShownEmitted: false,
      getModel: () => ({id: 'promo-1', path: [1, 0]}),
      getProps: () => ({content: {text: 'SALE_15', autoRedeem: true, prize: {id: 'pool-branch-a'}}}),
      getElement: () => textOuterElement,
      isStaticRenderMode: () => true,
      services: {
        context: {
          getKVMap: () => ({}),
          getRecord: () => undefined,
        },
        eventEmitter: {
          emit: jest.fn(),
          on: jest.fn(() => ({off: jest.fn()})),
        },
        prizePoolFactory: {get: jest.fn()},
      },
      // rendering waits on pending resources: what the widget shows is decided by whether this
      // ever gets released
      componentResourceManager: {
        getPending: () => pendingResources,
      },
      getResolvedCode: SysPromoCodeComponent.prototype.getResolvedCode,
      renderCode: SysPromoCodeComponent.prototype.renderCode,
      applyInlineEditability: SysPromoCodeComponent.prototype.applyInlineEditability,
      connectToPrizePool: SysPromoCodeComponent.prototype.connectToPrizePool,
      applyPrizePoolPrize: SysPromoCodeComponent.prototype.applyPrizePoolPrize,
      emitPromoCodeShownOnce: SysPromoCodeComponent.prototype.emitPromoCodeShownOnce,
      _handleContextRecord: SysPromoCodeComponent.prototype._handleContextRecord,
      ...overrides,
    };

    return {component, textInnerElement, pendingResources};
  }

  function poolMock(prize) {
    return {
      load: jest.fn(() => Promise.resolve()),
      getPrize: jest.fn(() => Promise.resolve(prize)),
    };
  }

  describe('getResolvedCode display priority', () => {
    it('pool code wins over the context key-value and record state', () => {
      const {component} = componentLike({prizePoolCode: 'POOL_CODE'});
      component.services.context.getKVMap = () => ({promoCode: 'KV_CODE'});
      component.services.context.getRecord = () => ({key: 'lastPromoCode', value: {value: 'RECORD_CODE', viewIndex: 0}});

      expect(component.getResolvedCode()).toBe('POOL_CODE');
    });

    it('key-value promoCode wins over the lastPromoCode record when no pool resolved', () => {
      const {component} = componentLike();
      component.services.context.getKVMap = () => ({promoCode: 'KV_CODE'});
      component.services.context.getRecord = () => ({key: 'lastPromoCode', value: {value: 'RECORD_CODE', viewIndex: 0}});

      expect(component.getResolvedCode()).toBe('KV_CODE');
    });

    it('takes the lastPromoCode record only from an earlier view', () => {
      const {component} = componentLike();
      component.services.context.getRecord = () => ({key: 'lastPromoCode', value: {value: 'RECORD_CODE', viewIndex: 0}});
      expect(component.getResolvedCode()).toBe('RECORD_CODE');

      component.services.context.getRecord = () => ({key: 'lastPromoCode', value: {value: 'RECORD_CODE', viewIndex: 1}});
      expect(component.getResolvedCode()).toBeNull();
    });

    it('resolves nothing when no pool, key-value or record state exists', () => {
      const {component} = componentLike();
      expect(component.getResolvedCode()).toBeNull();
    });
  });

  describe('renderCode + inline editability', () => {
    it('a resolved code is displayed as text with the inline-edit attribute stripped', () => {
      const {component, textInnerElement} = componentLike({prizePoolCode: 'POOL_CODE'});

      component.renderCode(component.getProps());

      expect(textInnerElement.innerText).toBe('POOL_CODE');
      expect(textInnerElement.hasAttribute(INLINE_EDIT_ATTRIBUTE)).toBe(false);
    });

    it('a key-value resolved code also strips the attribute (the old asymmetry is closed)', () => {
      const {component, textInnerElement} = componentLike();
      component.services.context.getKVMap = () => ({promoCode: 'KV_CODE'});

      component.renderCode(component.getProps());

      expect(textInnerElement.innerText).toBe('KV_CODE');
      expect(textInnerElement.hasAttribute(INLINE_EDIT_ATTRIBUTE)).toBe(false);
    });

    it('no resolved code renders the props placeholder and restores the attribute', () => {
      const {component, textInnerElement} = componentLike();
      textInnerElement.removeAttribute(INLINE_EDIT_ATTRIBUTE);

      component.renderCode(component.getProps());

      expect(textInnerElement.innerHTML).toBe('SALE_15');
      expect(textInnerElement.getAttribute(INLINE_EDIT_ATTRIBUTE)).toBe('content, text');
    });

    it('a stale lastPromoCode leftover does not override a pool code', () => {
      const {component, textInnerElement} = componentLike({prizePoolCode: 'POOL_CODE'});
      component.services.context.getRecord = () => ({key: 'lastPromoCode', value: {value: 'STALE_CODE', viewIndex: 0}});

      component.renderCode(component.getProps());

      expect(textInnerElement.innerText).toBe('POOL_CODE');
    });
  });

  describe('static render pool lane', () => {
    it('resolves the pool through the factory, displays the code and emits the shown event', async () => {
      const {component, textInnerElement} = componentLike();
      const pool = poolMock({id: 'option-1', label: '10%', value: 'POOL_CODE'});
      component.services.prizePoolFactory.get = jest.fn(() => pool);

      await component.connectToPrizePool();

      // the component hands the factory the pool ITS OWN props name: a widget holds one pool per
      // prize-carrying component, so two Promocodes on two branches hand out two codes
      expect(component.services.prizePoolFactory.get)
        .toHaveBeenCalledWith({id: 'pool-branch-a'}, 'promo-1');
      expect(pool.load).toHaveBeenCalledTimes(1);
      expect(component.prizePoolCode).toBe('POOL_CODE');
      expect(textInnerElement.innerText).toBe('POOL_CODE');
      expect(component.services.eventEmitter.emit).toHaveBeenCalledWith(
        SysEventTypes.PROMO_CODE_SHOWN,
        {code: 'POOL_CODE', autoRedeem: true},
      );
    });

    /**
     * A widget whose Promocode was never given a pool - no gamified component, nothing to draw -
     * must still render. Its props name no pool, so the load returns without asking the server,
     * releases the pending resource and leaves the component showing its own text.
     */
    it('renders its own text and blocks nothing when props name no pool', async () => {
      const {component, textInnerElement, pendingResources} = componentLike({
        getProps: () => ({content: {text: 'SALE_15', autoRedeem: true}}),
      });
      component.services.prizePoolFactory.get = jest.fn(() => ({
        load: jest.fn(() => Promise.resolve()),
        getPrize: jest.fn(() => Promise.resolve(null)),
      }));

      await component.connectToPrizePool();

      expect(component.services.prizePoolFactory.get).toHaveBeenCalledWith(undefined, 'promo-1');
      expect(pendingResources.decrement).toHaveBeenCalledTimes(1);
      expect(textInnerElement.innerHTML).toBe('SALE_15');
    });

    it('an unresolved pool falls back to the placeholder for display and emit', async () => {
      const {component, textInnerElement} = componentLike();
      component.services.prizePoolFactory.get = jest.fn(() => poolMock(null));

      await component.connectToPrizePool();

      expect(component.prizePoolCode).toBeNull();
      expect(textInnerElement.innerHTML).toBe('SALE_15');
      expect(component.services.eventEmitter.emit).toHaveBeenCalledWith(
        SysEventTypes.PROMO_CODE_SHOWN,
        {code: 'SALE_15', autoRedeem: true},
      );
    });

    /**
     * A pool that cannot be handed out keeps the widget unshown: the pending resource rendering
     * waits on is never released. Showing a promo code that redeems nothing would be worse - the
     * visitor takes it to the checkout and it fails there instead of here.
     */
    it('a failed pool load keeps the widget unshown - the pending resource is never released', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      const {component, pendingResources} = componentLike();
      component.services.prizePoolFactory.get = jest.fn(() => ({
        load: jest.fn(() => Promise.reject(new Error('network'))),
        getPrize: jest.fn(),
      }));

      await component.connectToPrizePool();

      expect(pendingResources.increment).toHaveBeenCalledTimes(1);
      expect(pendingResources.decrement).not.toHaveBeenCalled();
      expect(component.services.eventEmitter.emit).not.toHaveBeenCalledWith(
        SysEventTypes.PROMO_CODE_SHOWN,
        expect.anything(),
      );
      consoleError.mockRestore();
    });

    it('emits nothing when neither pool nor placeholder yields a code, then once on a later resolution', async () => {
      const {component} = componentLike();
      component.getProps = () => ({content: {text: '', autoRedeem: true}});
      component.services.prizePoolFactory.get = jest.fn(() => poolMock(null));

      await component.connectToPrizePool();
      expect(component.services.eventEmitter.emit).not.toHaveBeenCalled();

      component.applyPrizePoolPrize({id: 'option-1', label: 'X', value: 'LATE_CODE'});
      component.applyPrizePoolPrize({id: 'option-1', label: 'X', value: 'LATE_CODE'});
      expect(component.services.eventEmitter.emit).toHaveBeenCalledTimes(1);
    });

    it('respects autoRedeem false from props in the emitted payload', async () => {
      const {component} = componentLike();
      component.getProps = () => ({content: {text: 'SALE_15', autoRedeem: false}});
      component.services.prizePoolFactory.get = jest.fn(() => poolMock({id: 'o', label: 'l', value: 'POOL_CODE'}));

      await component.connectToPrizePool();

      expect(component.services.eventEmitter.emit).toHaveBeenCalledWith(
        SysEventTypes.PROMO_CODE_SHOWN,
        {code: 'POOL_CODE', autoRedeem: false},
      );
    });
  });

  describe('updating render pool lane (editor canvas)', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('subscribes to pool pushes and requests the pool deferred', () => {
      const {component} = componentLike({isStaticRenderMode: () => false});

      component.connectToPrizePool();

      expect(component.services.eventEmitter.on).toHaveBeenCalledWith(
        PrizePoolEvents.PRIZE_POOL_UPDATED,
        expect.any(Function),
      );
      expect(component.services.eventEmitter.emit).not.toHaveBeenCalled();

      jest.runAllTimers();
      expect(component.services.eventEmitter.emit).toHaveBeenCalledWith(
        PrizePoolEvents.REQUEST_PRIZE_POOL,
        'promo-1',
      );
    });

    // a widget holds one pool per prize-carrying component, so the addressee decides: two
    // Promocodes on two branches of a flow would otherwise show whichever code arrived last
    it('applies the push addressed to it and ignores one for another component', async () => {
      const {component, textInnerElement} = componentLike({isStaticRenderMode: () => false});
      const pushedPool = {id: 'pool-1', sourceType: 'MANUAL', options: [{id: 'o1', value: '10', code: 'POOL_CODE', weight: 10}]};
      const otherPool = {id: 'pool-2', sourceType: 'MANUAL', options: [{id: 'o2', value: '20', code: 'OTHER_CODE', weight: 10}]};
      component.services.prizePoolFactory.get = jest.fn(() => poolMock({id: 'o1', label: '10', value: 'POOL_CODE'}));

      component.connectToPrizePool();
      const pushHandler = component.services.eventEmitter.on.mock.calls[0][1];

      await pushHandler({componentId: 'someone-else', prizePool: otherPool});
      expect(component.services.prizePoolFactory.get).not.toHaveBeenCalled();

      await pushHandler({componentId: 'promo-1', prizePool: pushedPool});
      expect(component.services.prizePoolFactory.get).toHaveBeenCalledWith(pushedPool, 'promo-1');
      expect(component.prizePoolCode).toBe('POOL_CODE');
      expect(textInnerElement.innerText).toBe('POOL_CODE');
      expect(textInnerElement.hasAttribute(INLINE_EDIT_ATTRIBUTE)).toBe(false);
    });
  });

  describe('context record events', () => {
    it('re-renders for lastPromoCode records and ignores other keys', () => {
      const {component, textInnerElement} = componentLike();
      component.services.context.getRecord = () => ({key: 'lastPromoCode', value: {value: 'RECORD_CODE', viewIndex: 0}});

      component._handleContextRecord({key: 'somethingElse', value: {}});
      expect(textInnerElement.innerText).toBeUndefined();

      component._handleContextRecord({key: 'lastPromoCode', value: {value: 'RECORD_CODE', viewIndex: 0}});
      expect(textInnerElement.innerText).toBe('RECORD_CODE');
      expect(textInnerElement.hasAttribute(INLINE_EDIT_ATTRIBUTE)).toBe(false);
    });

    it('a deleted record restores the placeholder and inline editability', () => {
      const {component, textInnerElement} = componentLike();
      component.services.context.getRecord = () => undefined;
      textInnerElement.removeAttribute(INLINE_EDIT_ATTRIBUTE);
      textInnerElement.innerText = 'OLD_CODE';

      component._handleContextRecord({key: 'lastPromoCode', value: {value: null, viewIndex: 0}});

      expect(textInnerElement.innerHTML).toBe('SALE_15');
      expect(textInnerElement.getAttribute(INLINE_EDIT_ATTRIBUTE)).toBe('content, text');
    });
  });
});
