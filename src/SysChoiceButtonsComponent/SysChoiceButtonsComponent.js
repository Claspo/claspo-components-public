import WcControlledElement from "@claspo/renderer/sdk/WcControlledElement";
import SysCheckboxListManifest from "./SysChoiceButtons.manifest";
import componentStyles from "./componentStyle";
import componentTemplate from "./componentTemplate";
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';
import {sort} from '@claspo/common/utils/objectSort';
import {setStylesToElement} from '@claspo/renderer/sdk/HtmlStyleUtils';

export default class SysChoiceButtonsComponent extends WcControlledElement {
  static define = {
    name: 'sys-choice-buttons',
    model: SysCheckboxListManifest.name,
    manifest: SysCheckboxListManifest,
  };
  manifest = SysCheckboxListManifest;

  constructor() {
    super();
    this.getRootElement().innerHTML = `
      <style>${componentStyles}</style>
      ${componentTemplate}
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.registerControl();

    this.observeProps((prev, next) => {
      this.setLabelStylesAndContent(next);
      this.createButtons();
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);
      this.applySelectedStylesToCurrentValue(next);
    });
  }

  setLabelStylesAndContent(props) {
    const labelElement = this.getElement('label');

    labelElement.style.display = props.content.labelEnabled ? 'block' : 'none';

    insertHtmlIntoElement({
      element: labelElement,
      html: props.content.label,
    });
  }

  createButtons() {
    const buttonsContainerElement = this.getElement('buttonsContainer');
    const optionsMap = this.getOptionsMap();
    const currentProps = this.getProps();
    const isInteractive = this.isStaticRenderMode();

    buttonsContainerElement.innerHTML = '';

    Object.keys(optionsMap)
      .forEach((id) => {
        const option = optionsMap[id];

        const buttonElement = document.createElement('button');
        buttonElement.type = 'button';
        buttonElement.setAttribute('cl-element', 'button');
        buttonElement.setAttribute('option-id', id);
        buttonElement.setAttribute('aria-pressed', 'false');
        buttonElement.setAttribute('aria-disabled', String(!isInteractive));

        if (isInteractive) {
          buttonElement.addEventListener('click', () => {
            const currentOptionsValue = this.getCurrentValue();
            const latestProps = this.getProps();

            if (currentOptionsValue?.[id]) {
              this.removeSelectedOptionStyles(buttonElement, latestProps);
              delete currentOptionsValue[id];

              const updatedValue = Object.keys(currentOptionsValue).length ? currentOptionsValue : null;
              this.registeredControl.setValue(updatedValue);
            } else {
              if (!latestProps.control.multipleChoice) {
                this.removeSelectionFromAllButtons(buttonsContainerElement, latestProps);
              }

              this.setSelectedOptionStyles(buttonElement, latestProps);
              const updatedValue = latestProps.control.multipleChoice
                ? {...currentOptionsValue, [id]: optionsMap[id].exportId}
                : {[id]: optionsMap[id].exportId};
              this.registeredControl.setValue(updatedValue);
            }
          });
        }

        insertHtmlIntoElement({
          element: buttonElement,
          html: option.label,
        });

        buttonsContainerElement.append(buttonElement);
      });
  }

  getOptionsMap() {
    const orderProperty = this.getProps().control.optionsAlphabeticSort?.enabled ? 'label' : 'sort';
    return sort(this.getProps().control.options, orderProperty);
  }

  registerControl() {
    const tooltipElement = this.getRootElement().querySelector('.tooltip');
    this.registeredControl = this.createControlWithValidation([], {
      tooltipElement
    });
  }

  getCurrentValue() {
    return this.registeredControl?.getValue() || null;
  }

  setSelectedOptionStyles(buttonElement, props) {
    const selectedStyles = props.styles.find(elementParams => elementParams.element === 'button').selectedStyleAttributes;
    setStylesToElement(buttonElement, selectedStyles);
    buttonElement.setAttribute('aria-pressed', 'true');
  }

  removeSelectedOptionStyles(buttonElement, props) {
    const defaultStyles = props.styles.find(elementParams => elementParams.element === 'button').styleAttributes;
    setStylesToElement(buttonElement, defaultStyles);
    buttonElement.setAttribute('aria-pressed', 'false');
  }

  removeSelectionFromAllButtons(buttonsContainerElement, props) {
    buttonsContainerElement.querySelectorAll('[cl-element=button]').forEach((buttonElement) => {
      this.removeSelectedOptionStyles(buttonElement, props);
    });
  }

  applySelectedStylesToCurrentValue(props) {
    const optionsValue = this.getCurrentValue();

    if (!optionsValue) {
      this.removeSelectionFromAllButtons(this.getElement('buttonsContainer'), props);
      return;
    }

    const buttonsContainerElement = this.getElement('buttonsContainer');

    buttonsContainerElement.querySelectorAll('[cl-element=button]').forEach((buttonElement) => {
      const id = buttonElement.getAttribute('option-id');

      if (optionsValue[id]) {
        this.setSelectedOptionStyles(buttonElement, props);
      } else {
        this.removeSelectedOptionStyles(buttonElement, props);
      }
    });
  }
}
