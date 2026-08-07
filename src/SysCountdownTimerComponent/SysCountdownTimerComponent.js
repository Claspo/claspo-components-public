import SysCountdownTimerComponentManifest from "./SysCountdownTimer.manifest";
import WcElement from "@claspo/renderer/sdk/WcElement";

import getNumericDecline from '@claspo/common/utils/NumericDecline';
import getStyleElement from "./getStyleElement";
import { checkTimeZone } from "@claspo/common/utils/checkTimeZone";
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';


export default class SysCountdownTimerComponent extends WcElement {
  static define = {
    name: 'sys-countdown-timer',
    model: SysCountdownTimerComponentManifest.name,
    manifest: SysCountdownTimerComponentManifest,
  };

  manifest = SysCountdownTimerComponentManifest;

  connectedCallback() {
    super.connectedCallback();

    this.getRootElement().innerHTML += `
${getStyleElement()}
<div class="countdownContainer"></div>
`;
    this.observeProps((prev, next) => {
      clearInterval(this.intervalId);
      const timeZone = next.content.mode === 'FROM_THE_START_OF_DISPLAYING' ? null : checkTimeZone(next.content.timeZone);
      let endDateData = this.getEndDateData(next);
      let endDate = endDateData.dateInMs;
      let diffInMilliseconds = endDate - this.getDateWithTimeZone(timeZone).getTime();

      if (diffInMilliseconds <= 0) {
        this.clearRelativeStartDate();
        endDateData = this.getEndDateData(next);
        endDate = endDateData.dateInMs;
        diffInMilliseconds = endDate - this.getDateWithTimeZone(timeZone).getTime();
      }

      if (endDateData.shouldBeStored) {
        this.storeRelativeStartDate(endDate);
      }

      this.drawTimer(next, diffInMilliseconds >= 0 ? diffInMilliseconds : 0);

      if (diffInMilliseconds <= 0 || this.services.config.getConfig('devMode')) {
        return;
      }

      this.intervalId = setInterval(() => {
        const nextDiffInMilliseconds = endDate - this.getDateWithTimeZone(timeZone).getTime();

        this.drawTimer(next, nextDiffInMilliseconds >= 0 ? nextDiffInMilliseconds : 0);

        if (nextDiffInMilliseconds <= 0) {
          clearInterval(this.intervalId);
        }
      }, 1000);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.intervalId);
  }

  getEndDateData(next) {
    if (next.content.mode === 'FROM_THE_START_OF_DISPLAYING') {
      const storedRelativeStartDate = this.getStoredRelativeStartDate();
      const lengthInMs = this.getLengthMs(next.content.lengthFromTheStart);

      if (storedRelativeStartDate) {
        return {
          dateInMs: new Date(storedRelativeStartDate).getTime() + lengthInMs,
          shouldBeStored: false,
        };
      } else {
        return {
          dateInMs: new Date().getTime() + lengthInMs,
          shouldBeStored: true
        };
      }
    } else {
      return {
        dateInMs: new Date(next.content.endDate).getTime(),
        shouldBeStored: false,
      };
    }
  }

  getLengthMs(lengthFromTheStart) {
    const [days, hours, minutes, seconds] = lengthFromTheStart.split('.').map(Number);
    return days * 86400000 + hours * 3600000 + minutes * 60000 + seconds * 1000;
  }

  getStoredRelativeStartDate() {
    if (this.isStaticRenderMode() && this.getProps().content.mode === 'FROM_THE_START_OF_DISPLAYING') {
      return this.services.config.getConfig('getRelativeTimerViewDate')?.();
    }
  }

  storeRelativeStartDate() {
    if (this.isStaticRenderMode() && this.getProps().content.mode === 'FROM_THE_START_OF_DISPLAYING') {
      this.services.config.getConfig('storeRelativeTimerViewDate')?.();
    }
  }

  clearRelativeStartDate() {
    if (this.isStaticRenderMode() && this.getProps().content.mode === 'FROM_THE_START_OF_DISPLAYING') {
      this.services.config.getConfig('clearRelativeTimerViewDate')?.();
    }
  }

  getDateWithTimeZone(timeZone, dateString) {
    const dateObject = dateString ? new Date(dateString) : new Date();

    if (!timeZone) {
      return dateObject;
    }

    return new Date(
      dateObject.toLocaleString('en-US', {
        timeZone,
      }),
    );
  }

  splitMilliseconds(milliseconds, config = {}) {
    if (typeof milliseconds !== 'number' || milliseconds < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      }
    }

    const MS_PER_SECOND = 1000;
    const MS_PER_MINUTE = MS_PER_SECOND * 60;
    const MS_PER_HOUR = MS_PER_MINUTE * 60;
    const MS_PER_DAY = MS_PER_HOUR * 24;

    let remainingMs = milliseconds;
    const result = {};

    const calculateUnit = (msPerUnit, includeUnit, unitName) => {
      const value = Math.floor(remainingMs / msPerUnit);
      result[unitName] = includeUnit ? value : 0;
      remainingMs = includeUnit
        ? remainingMs - (value * msPerUnit)
        : remainingMs;
    };

    calculateUnit(MS_PER_DAY, config.days, "days");
    calculateUnit(MS_PER_HOUR, config.hours, "hours");
    calculateUnit(MS_PER_MINUTE, config.minutes, "minutes");
    calculateUnit(MS_PER_SECOND, config.seconds, "seconds");

    result.milliseconds = remainingMs;

    return result;
  }

  drawTimer(props, diffInMilliseconds) {
    const mainContainer = this.getRootElement().querySelector('.countdownContainer');
    // absent on widgets built before the switch existed, where labels were shown
    const labelsEnabled = props.content.labelsEnabled !== false;
    const containers = this.createElementContainers(mainContainer, labelsEnabled);

    const { translations: componentLanguageMap, language: usedLanguage } = this.getTranslationsMap(this.manifest.i18n);

    const format = props.content.format || (props.content.showDays ? 'DD:HH:MM:SS' : 'HH:MM:SS');
    const show = this.parseFormat(format);
    const diff = diffInMilliseconds + 50; // Add 50ms to remove the engine delays for new interval
    const { days, hours, minutes, seconds } = this.splitMilliseconds(diff, show);


    if (show.days) {
      this.createCounterElement(containers, days, 'day', componentLanguageMap, usedLanguage);
    }
    if (show.hours) {
      if (show.days) {
        this.addSeparatorElements(containers);
      }
      this.createCounterElement(containers, hours, 'hour', componentLanguageMap, usedLanguage);
    }

    if (show.minutes) {
      if (show.days || show.hours) {
        this.addSeparatorElements(containers);
      }
      this.createCounterElement(containers, minutes, 'minute', componentLanguageMap, usedLanguage);
    }

    if (show.seconds) {
      if (show.days || show.hours || show.minutes) {
        this.addSeparatorElements(containers);
      }
      this.createCounterElement(containers, seconds, 'second', componentLanguageMap, usedLanguage);
    }

    this.applyAutoAdaptiveStyles(props.adaptiveStyles, props.styles);
  }

  createElementContainers(mainContainer, labelsEnabled = true) {
    insertHtmlIntoElement({
      element: mainContainer,
      html: '',
    });

    const countersContainerElement = document.createElement('div');
    countersContainerElement.className = 'countersContainer';

    const labelsContainerElement = document.createElement('div');
    labelsContainerElement.className = 'labelsContainer';

    // The labels are still built and filled either way - the counter and
    // separator code writes into both rows - but with the switch off the row
    // never reaches the document, so it leaves no gap behind it.
    mainContainer.classList.toggle('countdownContainer--noLabels', !labelsEnabled);
    mainContainer.append(countersContainerElement);

    if (labelsEnabled) {
      mainContainer.append(labelsContainerElement);
    }

    return { countersContainerElement, labelsContainerElement };
  }

  parseFormat(format = '') {
    const upperFormat = format.toUpperCase();
    return {
      days: upperFormat.includes('D'),
      hours: upperFormat.includes('H'),
      minutes: upperFormat.includes('M'),
      seconds: upperFormat.includes('S'),
    }
  }

  createCounterElement(containers, counterValue, labelKey, componentLanguageMap, language) {
    const counterContainerElement = document.createElement('div');
    counterContainerElement.setAttribute('cl-element', 'counterContainer');
    counterContainerElement.className = 'counterContainer';

    const counterElement = document.createElement('span');
    counterElement.setAttribute('cl-element', 'counter');
    counterElement.className = 'counter';
    insertHtmlIntoElement({
      element: counterElement,
      html: counterValue >= 10 ? counterValue : `0${counterValue}`,
    });

    const labelContainerElement = document.createElement('div');
    labelContainerElement.className = 'counterLabelContainer';
    const labelElement = document.createElement('span');
    labelElement.setAttribute('cl-element', 'label');
    labelElement.className = 'counterLabel';
    insertHtmlIntoElement({
      element: labelElement,
      html: getNumericDecline(
        counterValue,
        this.getLabelKeys(componentLanguageMap, labelKey),
        language,
      ),
    });

    counterContainerElement.appendChild(counterElement);
    labelContainerElement.appendChild(labelElement);
    containers.countersContainerElement.appendChild(counterContainerElement);
    containers.labelsContainerElement.appendChild(labelContainerElement);
  }

  getLabelKeys(componentLanguageMap, key) {
    return [
      componentLanguageMap[`content,counterLabel,${key},single`],
      componentLanguageMap[`content,counterLabel,${key},upToFour`],
      componentLanguageMap[`content,counterLabel,${key},fromFive`],
    ];
  }

  addSeparatorElements(containers) {
    const counterSeparator = document.createElement('div');
    counterSeparator.setAttribute('cl-element', 'separator');
    counterSeparator.className = 'counter-separator';
    counterSeparator.textContent = ':';

    const labelSeparator = counterSeparator.cloneNode(true);
    labelSeparator.className = 'label-separator';

    containers.countersContainerElement.appendChild(counterSeparator);
    containers.labelsContainerElement.appendChild(labelSeparator);
  }
}

