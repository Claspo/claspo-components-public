import WcControlledElement from "@claspo/renderer/sdk/WcControlledElement";
import SysRadioGroupManifest from "./SysRadioGroup.manifest";
import ComponentStyle from "./componentStyle";
import ComponentTemplate from "./componentTemplate";
import RadioGroupButtonMenuStyles from "./radioGroupButtonMenuStyles";
import DefaultMarkerStyleAttributes from "./defaultMarkerStyleAttributes";
import { sort } from "@claspo/common/utils/objectSort";
import {
  applyInputLabelStyles,
  getStylesFromElement, setFocusOutline, setInputHostSize,
  setStylesToElement
} from '@claspo/renderer/sdk/HtmlStyleUtils';
import {getAdaptiveStylesForPlatform} from '@claspo/renderer/sdk/ModelStyleUtils';
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';

export default class SysRadioGroupComponent extends WcControlledElement {
  static define = {
    name: 'sys-radio-group',
    model: SysRadioGroupManifest.name,
    manifest: SysRadioGroupManifest,
  };
  manifest = SysRadioGroupManifest;

  static componentStyle = ComponentStyle;
  static componentTemplate = ComponentTemplate;
  static radioGroupButtonMenuStyles = RadioGroupButtonMenuStyles;
  static defaultMarkerStyleAttributes = DefaultMarkerStyleAttributes;
  registeredControl;
  controlExportId;
  markerStyleAttributes;

  constructor() {
    super();
    this.getRootElement().innerHTML = `
        <style>${SysRadioGroupComponent.componentStyle}</style>
        ${SysRadioGroupComponent.componentTemplate}
        `;
  }

  connectedCallback() {
    super.connectedCallback();
    const rootElement = this.getRootElement();
    const props = this.getProps();
    this.controlExportId = props.control.integrationName;

    this.registerControl(rootElement);

    this.observeProps((prev, next) => {
      const env = this.getEnvironment();

      applyInputLabelStyles(next, env, rootElement, '.label-with-radio-group-container');
      setInputHostSize(next, env, this.getHostElement(), this.getElement('input'), this.getElement('label'));
      this.setMarkerStyleAttributes();
      this.createContent();
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);
      this.handleSafariHeightIssue();
      this.applyStylesToMarkers();
      this.applyStylesToMarkersShadows();
      this.applyStylesToOptionWrapper();
      this.updateGap();
    });

    this.observeShared((prev, next) => {
      this.applyStyleToOptionLabels(this.getProps(), this.getEnvironment());
    });

    this.observeEnvironment((prev, next) => {
      const props = this.getProps();

      this.setMarkerStyleAttributes();
      this.applyStylesToMarkers();
      this.applyStylesToMarkersShadows();
      applyInputLabelStyles(props, next, rootElement, '.label-with-radio-group-container');
      setInputHostSize(props, next, this.getHostElement(), this.getElement('input'), this.getElement('label'));
      this.handleSafariHeightIssue();
      this.applyStyleToOptionLabels(props, next);
      this.updateGap();
    });
  }

  getInputAdaptiveStyles() {
    const props = this.getProps();
    const env = this.getEnvironment();
    return props.adaptiveStyles[env].filter(item => item.element === 'input');
  }

  setMarkerStyleAttributes() {
    const inputAdaptiveStyles = this.getInputAdaptiveStyles();
    if (inputAdaptiveStyles.length && inputAdaptiveStyles[0].markerStyleAttributes) {
      this.markerStyleAttributes = {
        ...DefaultMarkerStyleAttributes,
        ...inputAdaptiveStyles[0].markerStyleAttributes
      };

      const inputEnvIndependentStyles = this.getProps().styles?.find(item => item.element === 'input')?.markerStyleAttributes;

      if (inputEnvIndependentStyles) {
        this.markerStyleAttributes = {
          ...this.markerStyleAttributes,
          ...inputEnvIndependentStyles,
        };
      }

      return;
    }

    this.markerStyleAttributes = SysRadioGroupComponent.defaultMarkerStyleAttributes;
  }

  setStylesVariables(element) {
    Object.keys(this.markerStyleAttributes)
      .forEach(key => element.style.setProperty(`--${key}`, this.markerStyleAttributes[key]))
  }

  getOptions() {
    const options = this.getProps().control.options;
    const optionsWithIds = {};
    Object.keys(options).forEach(id => {
      const option = options[id];
      optionsWithIds[id] = {
        id,
        label: option.label,
        exportId: option.exportId,
        sort: option.sort,
      };
    });

    const orderProperty = this.getProps().control.optionsAlphabeticSort?.enabled ? 'label' : 'sort';
    return sort(this.getProps().control.options, orderProperty);
  }

  applyStylesToOptionWrapper() {
    const container = this.getElement('listContainer');
    const styles = getAdaptiveStylesForPlatform(this.getProps().adaptiveStyles, this.getEnvironment(), 'optionWrapper');
    const optionWrappers = container.querySelectorAll('.option-wrapper');

    if (styles) {
      const keys = Object.keys(styles);
      optionWrappers.forEach(optionWrapper => {
        keys.forEach(key => {
          optionWrapper.style[key] = styles[key];
        });
      });
    } else {
      optionWrappers.forEach(optionWrapper => {
        optionWrapper.style.margin = '10px 3px';
      });
      container.style.gap = '0px';
    }
  }

  createRadioGroupItemComponent(option, selected, styles) {
    const hostElement = this.getHostElement();
    const button = document.createElement('div');
    button.classList.add('option-wrapper');
    button.setAttribute('cl-element', 'optionWrapper');

    const radioMarkContainer = document.createElement('label');
    radioMarkContainer.classList.add('radio-mark-container');

    const radioMarkShadow = document.createElement('div');
    radioMarkShadow.classList.add('radio-mark-shadow');
    radioMarkContainer.appendChild(radioMarkShadow);

    const radio = document.createElement('input');
    radio.setAttribute('type', 'radio');
    radio.setAttribute('name', this.controlExportId)
    radioMarkContainer.appendChild(radio);

    const radioMark = document.createElement('span');
    radioMark.classList.add('radio-mark');
    radioMarkContainer.appendChild(radioMark);

    const label = document.createElement('span');
    label.classList.add('radio-box-label');
    label.textContent = option.label;

    this.setStylesVariables(hostElement);
    setStylesToElement(label, styles);

    radioMarkContainer.appendChild(label);

    if (selected) {
      const borderColor = this.markerStyleAttributes['selectedColor'];
      radioMark.classList.add('radio-mark-checked');
      radioMark.style.borderColor = borderColor;
      radioMark.style.outlineColor = borderColor;
      this.getHostElement().style.setProperty('--selectedColor', `${borderColor}`);
      radioMark.style.setProperty('--borderColor', `${borderColor}`);
    } else {
      radioMark.style.borderColor = null;
      radioMark.style.outlineColor = null;
      this.getHostElement().style.setProperty('--borderColor', 'rgba(0,0,0, 0.7)');
    }
    button.appendChild(radioMarkContainer);

    return button;
  }

  updateGap() {
    const container = this.getElement('listContainer');

    if (!container) {
      return;
    }

    [
      ...container.querySelectorAll('.radio-mark-container'),
      ...container.querySelectorAll('.radio-mark-shadow'),
      ...container.querySelectorAll('.radio-mark'),
    ].forEach(element => {
      this.updateElementSizeStyles(element, this.markerStyleAttributes);
    });
  }

  updateElementSizeStyles(element, attrs) {
    element.style.setProperty(`--inputSize`, attrs['inputSize']);
    element.style.setProperty(`--inputToTextGapSize`, attrs['inputToTextGapSize']);
  }

  applyStyleToOptionLabels() {
    const inputButton = this.getElement('input');
    const styles = getStylesFromElement(inputButton, SysRadioGroupComponent.radioGroupButtonMenuStyles);
    const labels = inputButton.querySelectorAll('.radio-box-label');
    labels.forEach(label => {
      setStylesToElement(label, styles);
    });
  }

  applyStylesToMarkers() {
    const inputButton = this.getElement('input');
    const radioMarks = inputButton.querySelectorAll('.radio-mark');
    radioMarks.forEach(radioMark => {
      this.setStylesVariables(radioMark);
      setFocusOutline(radioMark);
    });
  }

  applyStylesToMarkersShadows() {
    const inputButton = this.getElement('input');
    const radioMarksShadows = inputButton.querySelectorAll('.radio-mark-shadow');
    radioMarksShadows.forEach(radioMarksShadow => {
      this.setStylesVariables(radioMarksShadow);
    });
  }

  unselectButtons(container, skipId) {
    const radioGroupItems = container.querySelectorAll('.radioGroupItem');
    radioGroupItems.forEach(radioGroupItem => {
      const id = radioGroupItem.getAttribute('name');
      if (id === skipId) {
        return;
      }
      const radioMark = radioGroupItem.querySelector('.radio-mark');
      radioMark.classList.remove('radio-mark-checked');
      radioMark.style.borderColor = null;
      radioMark.style.outlineColor = null;
    })
  }

  setSelectedBorderColor(element) {
    const borderColor = this.markerStyleAttributes['selectedColor'];
    element.style.borderColor = `${borderColor}`;
    element.style.outlineColor = `${borderColor}`;
    element.style.setProperty('--borderColor', `${borderColor}`);
  }

  setBorderTopWidth(element) {
    const borderTopWidth = this.markerStyleAttributes['borderTopWidth'];
    element.style.setProperty('--borderTopWidth', `${borderTopWidth}`);
  }

  createContent() {
    const inputButton = this.getElement('input');
    const optionLabelStyles = getStylesFromElement(inputButton, SysRadioGroupComponent.radioGroupButtonMenuStyles);
    const value = this.registeredControl?.getValue() || null;
    const options = this.getOptions();
    const radioButtonsList = document.createElement('div');
    radioButtonsList.classList.add('radio-buttons-list');
    radioButtonsList.setAttribute('cl-element', 'listContainer');

    Object.entries(options)
      .forEach(([id]) => {
        const option = options[id];
        const selected = value?.id === id;
        const radioGroupItemEl = this.createRadioGroupItemComponent(option, selected, optionLabelStyles);
        radioGroupItemEl.classList.add('radioGroupItem');
        radioGroupItemEl.setAttribute('name', option.id);
        this.setBorderTopWidth(radioGroupItemEl);

        if (this.isStaticRenderMode()) {
          radioGroupItemEl.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            const radioMark = radioGroupItemEl.querySelector('.radio-mark');
            radioMark.classList.add('radio-mark-checked');
            this.setSelectedBorderColor(radioMark);
            this.registeredControl.setValue({ id, exportId: options[id].exportId });
            this.unselectButtons(radioButtonsList, id);
          });
        }
        radioButtonsList.appendChild(radioGroupItemEl);
      });

    insertHtmlIntoElement({
      element: inputButton,
      html: '',
    });
    inputButton.append(radioButtonsList);
  }

  registerControl(rootElement) {
    const tooltipElement = rootElement.querySelector('.radio-group-tooltip');
    this.registeredControl = this.createControlWithValidation([], {
      tooltipElement
    });
  }

  handleSafariHeightIssue() {
    const host = this.getHostElement();

    if (!host.style.height || host.style.height === 'auto') {
      host.style.height = 'fit-content';
    }
  }
}
