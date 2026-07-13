import SysPhoneInputComponent from './SysPhoneInputComponent';
import WcControlledElement from '@claspo/renderer/sdk/WcControlledElement';

customElements.define('sys-phone-input-autofill-test', SysPhoneInputComponent);

const COUNTRY_DATA = [
  { countryCode: 'US', label: 'United States', prefix: '+1', position: -100 },
  { countryCode: 'DE', label: 'Germany', prefix: '+49', position: -200 },
  { countryCode: 'UA', label: 'Ukraine', prefix: '+380', position: -300 },
];

const AUTOFILLED_GERMAN_NUMBER = '+491512345678';

function createStateStub() {
  let state = {};

  return {
    getState: () => state,
    setState: jest.fn((next) => {
      state = { ...state, ...next };
    }),
  };
}

function createComponent({ autofillValue, required = false } = {}) {
  const element = new SysPhoneInputComponent();
  const state = createStateStub();
  const context = { addRecord: jest.fn(), updateRecord: jest.fn(), deleteRecord: jest.fn() };

  element.services = {
    state,
    context,
    form: { hasControl: () => false },
    config: { getConfig: () => 'http://localhost:9590/static/' },
  };
  element.model = {
    id: 'phone-1',
    type: 'phone-input',
    path: [0],
    props: {
      control: { name: 'phone', validation: { required } },
    },
  };
  element.htmlDocumentObject = document;
  element.getTranslationsMap = () => ({ translations: 'Select country code' });
  element.getAutofillValue = () => autofillValue;
  element.observeProps = () => {};
  element.observeEnvironment = () => {};
  element.observeShared = () => {};

  jest.spyOn(WcControlledElement.prototype, 'connectedCallback').mockImplementation(() => {});
  jest.spyOn(element, 'requestCountryData').mockResolvedValue(COUNTRY_DATA.map((option) => ({ ...option })));
  jest.spyOn(element, 'createPhoneInputFormControl').mockImplementation(() => {});
  jest.spyOn(element, 'setValue');
  jest.spyOn(element, 'valueChangedCallback');

  return { element, state, context };
}

async function bootComponent(element) {
  element.connectedCallback();
  await new Promise((resolve) => setTimeout(resolve, 0));
}

function getFlagElement(element) {
  return element.shadowRoot.querySelector('.phone-input-select-button-flag');
}

afterEach(() => {
  jest.restoreAllMocks();
});

describe('SysPhoneInputComponent autofill', () => {
  it('creates the form control eagerly for an autofilled non-required field and syncs the dial code', async () => {
    const { element, state } = createComponent({ autofillValue: AUTOFILLED_GERMAN_NUMBER, required: false });

    await bootComponent(element);

    expect(element.createPhoneInputFormControl).toHaveBeenCalled();
    expect(element.valueChangedCallback).toHaveBeenCalledWith(AUTOFILLED_GERMAN_NUMBER);
    // the parse must run after setValue, which paints the flag from the default country
    expect(element.setValue.mock.invocationCallOrder[0])
      .toBeLessThan(element.valueChangedCallback.mock.invocationCallOrder[0]);

    expect(state.setState).toHaveBeenCalledWith({ currentCountryCode: 'DE' });
    expect(getFlagElement(element).style.backgroundPositionY).toBe('-200px');
    expect(element.getInputElement().value).toBe(AUTOFILLED_GERMAN_NUMBER);
  });

  it('seeds currentCountryCode into state before creating the control for an autofilled value', async () => {
    // '0501234567' matches no COUNTRY_DATA prefix, so the validator's only source
    // for the country is state.currentCountryCode — it must be set by then
    const { element, state } = createComponent({ autofillValue: '0501234567', required: false });

    let countryCodeAtControlCreation;
    element.createPhoneInputFormControl.mockImplementation(() => {
      countryCodeAtControlCreation = state.getState().currentCountryCode;
    });

    await bootComponent(element);

    expect(element.createPhoneInputFormControl).toHaveBeenCalled();
    expect(countryCodeAtControlCreation).toBe('US');
  });

  it('keeps lazy control creation when there is no autofill value and the field is not required', async () => {
    const { element, state } = createComponent({ autofillValue: undefined, required: false });

    await bootComponent(element);

    expect(element.createPhoneInputFormControl).not.toHaveBeenCalled();
    expect(element.valueChangedCallback).not.toHaveBeenCalled();
    expect(state.setState).not.toHaveBeenCalledWith({ currentCountryCode: 'DE' });
    expect(getFlagElement(element).style.backgroundPositionY).toBe('-100px');
  });

  it('still creates the control eagerly for a required field without autofill', async () => {
    const { element } = createComponent({ autofillValue: undefined, required: true });

    await bootComponent(element);

    expect(element.createPhoneInputFormControl).toHaveBeenCalled();
    expect(element.valueChangedCallback).not.toHaveBeenCalled();
  });

  it('seeds the context record with the fallback until the autofill value passes validation', async () => {
    const { element, context } = createComponent({ autofillValue: AUTOFILLED_GERMAN_NUMBER, required: false });

    await bootComponent(element);

    expect(context.addRecord).toHaveBeenCalledWith('phone-1', expect.objectContaining({ value: '' }));
  });

  describe('getCountryOptionByValue', () => {
    const componentLikeThis = { availableOptions: COUNTRY_DATA };

    it('matches the country by prefix with and without a leading +', () => {
      const getCountryOptionByValue = SysPhoneInputComponent.prototype.getCountryOptionByValue;

      expect(getCountryOptionByValue.call(componentLikeThis, '+491512345678').countryCode).toBe('DE');
      expect(getCountryOptionByValue.call(componentLikeThis, '491512345678').countryCode).toBe('DE');
      expect(getCountryOptionByValue.call(componentLikeThis, '+380501234567').countryCode).toBe('UA');
      expect(getCountryOptionByValue.call(componentLikeThis, '+999123')).toBeUndefined();
    });
  });
});
