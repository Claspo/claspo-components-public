import WcControlledElement from "@claspo/renderer/sdk/WcControlledElement";

import SysCheckboxListManifest from "./SysCheckboxList.manifest";
import ComponentStyle from "./componentStyle";
import ComponentTemplate from "./componentTemplate";
import CheckboxListButtonMenuStyles from "./checkboxListButtonMenuStyles";
import DefaultMarkerStyleAttributes from "./defaultMarkerStyleAttributes";
import deprecatedCheckboxVariablesMap from "@claspo/renderer/backward-compatibility/deprecatedCheckboxVariablesMap";
import { sort } from "@claspo/common/utils/objectSort";
import {
  applyInputLabelStyles,
  getStylesFromElement, setFocusOutline, setInputHostSize,
  setStylesToElement
} from '@claspo/renderer/sdk/HtmlStyleUtils';
import { getAdaptiveStylesForPlatform } from '@claspo/renderer/sdk/ModelStyleUtils';
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';


export default class SysCheckboxListComponent extends WcControlledElement {
  static define = {
    name: 'sys-checkbox-list',
    model: SysCheckboxListManifest.name,
    manifest: SysCheckboxListManifest,
  };
  manifest = SysCheckboxListManifest;
  static componentStyle = ComponentStyle;
  static componentTemplate = ComponentTemplate;
  static checkboxListButtonMenuStyles = CheckboxListButtonMenuStyles;
  static defaultMarkerStyleAttributes = DefaultMarkerStyleAttributes;
  registeredControl;
  markerStyleAttributes;

  constructor() {
    super();
    this.getRootElement().innerHTML = `
        <style>${SysCheckboxListComponent.componentStyle}</style>
        ${SysCheckboxListComponent.componentTemplate}
        `;
  }

  connectedCallback() {
    super.connectedCallback();
    const rootElement = this.getRootElement();

    this.registerControl(rootElement);

    this.observeProps((prev, next) => {
      const env = this.getEnvironment();
      applyInputLabelStyles(next, env, rootElement, '.label-with-checkbox-list-container');
      setInputHostSize(next, env, this.getHostElement(), this.getElement('input'), this.getElement('label'));
      this.setMarkerStyleAttributes();
      this.createContent();
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);
      this.handleSafariHeightIssue();
      this.applyStylesToOptionWrapper();
    });

    this.observeShared((prev, next) => {
      this.applyStyleToOptionLabels(this.getProps(), this.getEnvironment());
    });

    this.observeEnvironment((prev, next) => {
      this.setMarkerStyleAttributes();
      this.applyStylesToMarkers();
      this.applyStylesToMarkersShadows();

      const props = this.getProps();

      applyInputLabelStyles(props, next, rootElement, '.label-with-checkbox-list-container');
      setInputHostSize(props, next, this.getHostElement(), this.getElement('input'), this.getElement('label'));
      this.handleSafariHeightIssue();
      this.applyStyleToOptionLabels(props, next);
      this.updateElementSizeStyles();
    });
  }

  updateElementSizeStyles() {

    const container = this.getElement('listContainer');

    if (!container) {
      return;
    }

    this.applyStylesToMarkersShadows();
    this.applyStylesToMarkers();

    container.querySelectorAll('.checkmark-container').forEach(markContainer => {
      this.setStylesVariables(markContainer);
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

    this.markerStyleAttributes = SysCheckboxListComponent.defaultMarkerStyleAttributes;
  }

  setStylesVariables(element) {
    Object.keys(this.markerStyleAttributes)
      .forEach(key => {
        const upToDateKey = deprecatedCheckboxVariablesMap.get(key) || key;
        element.style.setProperty(`--${upToDateKey}`, this.markerStyleAttributes[key]);
      })
  }

  getOptions() {
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

  createCheckboxListItemComponent(option, selected, styles) {
    const hostElement = this.getHostElement();
    const button = document.createElement('div');
    button.classList.add('option-wrapper');
    button.setAttribute('cl-element', 'optionWrapper');

    const checkMarkContainer = document.createElement('label');
    checkMarkContainer.classList.add('checkmark-container');

    const checkMarkShadow = document.createElement('div');
    checkMarkShadow.classList.add('checkmark-shadow');
    checkMarkContainer.appendChild(checkMarkShadow);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkMarkContainer.appendChild(checkbox);

    const checkMark = document.createElement('span');
    checkMark.classList.add('checkmark');
    checkMarkContainer.appendChild(checkMark);

    const label = document.createElement('span');
    label.classList.add('checkbox-label');
    label.textContent = option.label;

    this.setStylesVariables(hostElement);
    setStylesToElement(label, styles);

    checkMarkContainer.appendChild(label);

    if (selected) {
      const selectedBorderColor = this.markerStyleAttributes['selectedColor'];
      checkMark.classList.add('checkmark-checked');
      checkMark.style.borderColor = selectedBorderColor;
      checkMark.style.outlineColor = selectedBorderColor;
      hostElement.style.setProperty('--selectedColor', selectedBorderColor);
      hostElement.style.setProperty('--borderColor', selectedBorderColor);
    } else {
      checkMark.style.borderColor = null;
      checkMark.style.outlineColor = null;
      hostElement.style.setProperty('--borderColor', 'rgba(0,0,0, 0.7)');
    }
    //.checkmark:after
    button.appendChild(checkMarkContainer);

    return button;
  }

  getCurrentValue() {
    return JSON.parse(this.registeredControl?.getValue() || null);
  }

  applyStylesToMarkersShadows() {
    const inputButton = this.getElement('input');
    const checkMarksShadows = inputButton.querySelectorAll('.checkmark-shadow');
    checkMarksShadows.forEach(checkMarkShadow => {
      this.setStylesVariables(checkMarkShadow);
    });
  }

  applyStyleToOptionLabels() {
    const inputButton = this.getElement('input');
    const styles = getStylesFromElement(inputButton, SysCheckboxListComponent.checkboxListButtonMenuStyles);
    const labels = inputButton.querySelectorAll('.checkbox-label');
    labels.forEach(label => {
      setStylesToElement(label, styles);
    });
  }

  applyStylesToMarkers() {
    const inputButton = this.getElement('input');
    const checkMarks = inputButton.querySelectorAll('.checkmark');
    checkMarks.forEach(checkMark => {
      this.setStylesVariables(checkMark);
      setFocusOutline(checkMark);
    });
  }

  createContent() {
    const inputButton = this.getElement('input');
    const optionLabelStyles = getStylesFromElement(inputButton, SysCheckboxListComponent.checkboxListButtonMenuStyles);
    const optionsValue = this.getCurrentValue();
    const options = this.getOptions();
    const buttonsList = document.createElement('div');
    buttonsList.classList.add('buttons-list');
    buttonsList.setAttribute('cl-element', 'listContainer');

    Object.entries(options)
      .forEach(([id]) => {
        const option = options[id];
        let selected = !!optionsValue && optionsValue.hasOwnProperty(id);
        const checkboxListItemEl = this.createCheckboxListItemComponent(option, selected, optionLabelStyles);
        checkboxListItemEl.classList.add('checkboxListItem');

        if (this.isStaticRenderMode()) {
          checkboxListItemEl.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            const checkMark = checkboxListItemEl.querySelector('.checkmark');
            let currentValue = this.getCurrentValue();
            if (currentValue && currentValue[id]) {
              delete currentValue[id];
              checkMark.classList.remove('checkmark-checked');
              checkMark.style.borderColor = null;
              checkMark.style.outlineColor = null;
              this.getHostElement().style.setProperty('--borderColor', 'rgba(0,0,0, 0.7)');
            } else {
              currentValue = {
                ...currentValue,
                [id]: options[id].exportId
              };
              checkMark.classList.add('checkmark-checked');
              const borderColor = this.markerStyleAttributes['selectedColor'];
              checkMark.style.borderColor = `${borderColor}`;
              checkMark.style.outlineColor = `${borderColor}`;
              this.getHostElement().style.setProperty('--selectedColor', `${borderColor}`);
              this.getHostElement().style.setProperty('--borderColor', `${borderColor}`);
            }
            const value = JSON.stringify(currentValue);
            this.registeredControl.setValue(value === '{}' ? null : value);
          });
        }
        buttonsList.appendChild(checkboxListItemEl);
      });

    insertHtmlIntoElement({
      element: inputButton,
      html: '',
    });
    inputButton.append(buttonsList);
  }

  registerControl(rootElement) {
    const tooltipElement = rootElement.querySelector('.list-tooltip');
    this.registeredControl = this.createControlWithValidation([], {
      tooltipElement
    });
    this.registeredControl.setValue(null, { silent: true, skipValidation: true });
  }

  handleSafariHeightIssue() {
    const host = this.getHostElement();

    if (host.style.height === 'auto') {
      host.style.height = 'fit-content';
    }
  }
}
