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
      this.createButtons(next);
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);
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

  createButtons(props) {
    const buttonsContainerElement = this.getElement('buttonsContainer');
    const optionsMap = this.getOptionsMap();

    buttonsContainerElement.innerHTML = '';
    const optionsValue = this.getCurrentValue();

    Object.keys(optionsMap)
      .forEach((id) => {
        const option = optionsMap[id];

        const buttonElement = document.createElement('div');
        buttonElement.setAttribute('cl-element', 'button');

        if (optionsValue?.[id]) {
          this.setSelectedOptionStyles(buttonElement, props);
        }

        if (this.isStaticRenderMode()) {
          buttonElement.addEventListener('click', () => {
            const currentOptionsValue = this.getCurrentValue();
            const currentProps = this.getProps()

            if (currentOptionsValue?.[id]) {
              this.removeSelectedOptionStyles(buttonElement, currentProps);
              delete currentOptionsValue[id];

              const updatedValue = Object.keys(currentOptionsValue).length ? currentOptionsValue : null;
              this.registeredControl.setValue(updatedValue);
            } else {
              if (!currentProps.control.multipleChoice) {
                this.removeSelectionFromAllButtons(buttonsContainerElement, currentProps);
              }

              this.setSelectedOptionStyles(buttonElement, currentProps);
              const updatedValue = currentProps.control.multipleChoice
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
    this.registeredControl.setValue(null, { silent: true, skipValidation: true });
  }

  getCurrentValue() {
    return this.registeredControl?.getValue() || null;
  }

  setSelectedOptionStyles(buttonElement, props) {
    const selectedStyles = props.styles.find(elementParams => elementParams.element === 'button').selectedStyleAttributes;
    setStylesToElement(buttonElement, selectedStyles);
  }

  removeSelectedOptionStyles(buttonElement, props) {
    const defaultStyles = props.styles.find(elementParams => elementParams.element === 'button').styleAttributes;
    setStylesToElement(buttonElement, defaultStyles);
  }

  removeSelectionFromAllButtons(buttonsContainerElement, props) {
    buttonsContainerElement.querySelectorAll('[cl-element=button]').forEach((buttonElement) => {
      this.removeSelectedOptionStyles(buttonElement, props);
    });
  }
}
