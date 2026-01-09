import { flat } from "@claspo/common/flat";
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';

const DEFAULT_PARENT_CONTAINER_STYLES = {
  maxWidth: '100%',
  width: 'fit-content',
  display: 'inline-flex',
  fontFamily: 'inherit',
}

const DEFAULT_INNER_STYLES = {
  padding: '0 5px',
  display: 'inline-block',
  maxWidth: 'calc(100% - 0px)',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}

const DEFAULT_OUTER_STYLES = {
  display: 'inline-flex',
  justifyContent: 'center',
  minHeight: 'fit-content',
}

export function createStaticTextRoller(container, props) {
  const id = props.id;
  
  const longestOption = getLongestOptionByRenderedTextWidth(props.options);
  const innerStyles = { ...DEFAULT_INNER_STYLES, ...props.styleAttributes };

  const optionElements = props.options.map((option) => {
    const optionElement = document.createElement('span');
    optionElement.classList.add('opt');
    const inner = document.createElement('span');
    inner.innerText = option;
    optionElement.appendChild(inner);
    
    const containerParentStyles = window.getComputedStyle(container.parentElement);
    
    applyStyles(inner, innerStyles);

    applyStyles(
      optionElement,
      {
        display: 'inline-flex',
        justifyContent: containerParentStyles['text-align'] || DEFAULT_OUTER_STYLES.justifyContent,
      },
      longestOption,
      innerStyles
    );

    return optionElement;
  });

  const containerStyles = { ...DEFAULT_PARENT_CONTAINER_STYLES };
  const innerContainerElement = document.createElement('span');
  innerContainerElement.classList.add('container');

  const paddings = {
    paddingLeft: props.styleAttributes.borderLeftWidth || 0,
    paddingRight: props.styleAttributes.borderRightWidth || 0,
    paddingTop: props.styleAttributes.borderTopWidth || 0,
    paddingBottom: props.styleAttributes.borderBottomWidth || 0,
  }
  applyStyles(innerContainerElement, paddings);

  const hiddenPlaceholderElement = document.createElement('span');
  hiddenPlaceholderElement.innerText = longestOption;

  applyStyles(hiddenPlaceholderElement, {
    ...innerStyles,
    visibility: 'hidden',
  });

  const optsElement = document.createElement('span');
  optsElement.classList.add('opts');
  optionElements.forEach((optionElement) => {
    optsElement.appendChild(optionElement);
  });

  innerContainerElement.append(hiddenPlaceholderElement, optsElement);
  insertHtmlIntoElement({
    element: container,
    html: '',
  });
  container.appendChild(innerContainerElement);

  applyStyles(container, containerStyles);

  const calculatedOptionHeight = innerContainerElement.querySelectorAll('.opt')[0].offsetHeight;
  const newHeight = `${calculatedOptionHeight}px`;

  innerContainerElement.style.height = newHeight;
  hiddenPlaceholderElement.style.height = newHeight;

  container.classList.add('container--staticTextRoller');

  const durations = prepareAnimationDurations(props);
  createSlideDownAnimation(container, props, durations);
  runAnimation(optsElement, props, durations);

  return {element: container, id};
}

const DEFAULT_OPTION = 'Option 1';

function prepareAnimationDurations(props) {
  const DEFAULT_TIME_PER_OPTION = (props.animationSpeedInSec || 1) * 1000 // customizable speed in seconds, converted to ms
  const optionTransitionTime = 500; //ms
  const MAX_CHARACTERS_PER_WORD = 15;
  const longestOptionLength = Math.max(...props.options.map(option => option.replace(/\s+/g, '').length));
  const longestOptionFractions = Math.max(Math.ceil(longestOptionLength / MAX_CHARACTERS_PER_WORD), 1);
  const optionsCount = props.options.length;
  const optionTime = longestOptionFractions * DEFAULT_TIME_PER_OPTION;
  const timePerOption = optionTime + optionTransitionTime;
  const duration = optionsCount * timePerOption;
  const optionTimePercentage = 100 / optionsCount;

  return {
    optionTimePercentage,
    duration,
    longestOptionFractions
  }
}

export function createUpdatingTextRoller(container, props) {
  const id = props.id;
  const outer = document.createElement('span');
  outer.classList.add('outer');

  const longestOption = getLongestOptionByRenderedTextWidth(props.options);

  const inner = document.createElement('span');
  inner.classList.add('inner');
  // use textContent to prevent HTML injection from options
  inner.textContent = props.options.at(0) || DEFAULT_OPTION;
  inner.setAttribute('contenteditable', 'false');
  outer.appendChild(inner);

  const containerParentStyles = window.getComputedStyle(container.parentElement);
  const containerTextStyleAttributes = getElementTextRelatedStyleAttributes(containerParentStyles);

  const innerStyles = {
    ...DEFAULT_INNER_STYLES,
    ...props.styleAttributes,
    ...containerTextStyleAttributes
  };

  applyStyles(inner, innerStyles);
  applyStyles(
    outer,
    {
      ...DEFAULT_OUTER_STYLES,
      borderRadius: inner.style['border-radius'] || DEFAULT_OUTER_STYLES.borderRadius,
      justifyContent: containerParentStyles['text-align'] || DEFAULT_OUTER_STYLES.justifyContent,
    },
    longestOption,
    innerStyles,
    parseFloat(containerParentStyles.width)
  );

  insertHtmlIntoElement({
    element: container,
    html: '',
  });
  applyStyles(container, { ...DEFAULT_PARENT_CONTAINER_STYLES })
  container.appendChild(outer);

  return {element: container, id};
}

function runAnimation(element, props, durations) {
  const duration = durations.duration / 1000; // in sec
  // if 1 element don't start animation
  if (props.options.length > 1) {
    element.style.animation = `slide-down ${duration}s infinite`;
  } else {
    element.style.transform = 'translateY(0%)';
    element.querySelectorAll('.opt')[0].style.display = 'none';
  }
}

function applyStyles(element, styles, longestOption, childStyles, elementParentWidth) {
  let defaultStyles = {};
  if (!!longestOption) {
    const width = getTextWidth(longestOption, styles, childStyles);
    const minWidth = `${(width > elementParentWidth) ? width : Math.min(width, elementParentWidth)}px`;

    defaultStyles = {
      minWidth
    };
  }

  Object.entries({...defaultStyles, ...styles} || {}).forEach(([key, value]) => {
    element.style[key] = value;
  });
}

function getTextWidth(text, styles = {}, childStyles = {}) {
  const out = document.createElement('span');
  const inn = document.createElement('span');
  inn.innerText = text;
  out.appendChild(inn);

  for (const [key, value] of Object.entries(childStyles)) {
    inn.style[key] = value;
  }
  for (const [key, value] of Object.entries(styles)) {
    out.style[key] = value;
  }

  out.style.visibility = 'hidden';
  document.body.appendChild(out);

  const { width } = out.getBoundingClientRect();

  document.body.removeChild(out);

  return width;
}

function createSlideDownAnimation(container, props, durations) {
  const GAP_BETWEEN_ITEMS = 1; // 1px
  const MAX_GAP_BETWEEN_ITEMS = (props.options.length - 1) * GAP_BETWEEN_ITEMS;
  const transitionSpeedMultiplier = durations.longestOptionFractions > 1 ? 1.5 : 3
  const transitionPercentage = durations.optionTimePercentage / transitionSpeedMultiplier;

  // second keyframe is for the pause
  const keyframes = flat(props.options.map((_, index) => {
    return `
    ${index * durations.optionTimePercentage}% {
      transform: translateY(calc(${index * 100}% + ${index * GAP_BETWEEN_ITEMS}px));
    }
    ${index * durations.optionTimePercentage + transitionPercentage}% {
      transform: translateY(calc(${index * 100}% + ${index * GAP_BETWEEN_ITEMS}px));
    }`;
  })).concat(`
    100% {
      transform: translateY(calc(${props.options.length * 100}% + ${MAX_GAP_BETWEEN_ITEMS}px));
    }
    `).join('\n');
  
  const style = document.createElement('style');
  insertHtmlIntoElement({
    element: style,
    html: `@keyframes slide-down {${keyframes}}`,
  });

  const firstOption = container.querySelector('.opt');
  const clonedFirstOption = firstOption.cloneNode(true);

  container.appendChild(style);
  container.querySelector('.opts').appendChild(clonedFirstOption);
}


function getLongestOptionByRenderedTextWidth(options) {
  return options
    .map(o => ({
      value: o,
      width: getTextWidth(o)
    }))
    .sort((a, b) => b.width - a.width)
    .at(0)
    .value;
}

function getElementTextRelatedStyleAttributes(elStyles) {
  let elTextStyleAttributes = {};
  const textStyleProperties = [
    'font-size',
    'font-weight',
    'font-style',
    'font-family',
    'text-align',
    'text-shadow',
    'letter-spacing',
    'line-height'
  ];

  Object.keys(elStyles)
    .forEach((idx) => {
      if (!Number.isInteger(Number(idx))) {
        return;
      }
      const cssPropertyName = elStyles[idx];
      if (!textStyleProperties.includes(cssPropertyName)) {
        return;
      }

      elTextStyleAttributes[cssPropertyName] = elStyles.getPropertyValue(cssPropertyName);
    });

  return elTextStyleAttributes;
}
