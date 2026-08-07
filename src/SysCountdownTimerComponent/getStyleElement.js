export default function getStyleElement() {
  return `
<style>
.countdownContainer {
  display: flex;
  flex-direction: column;
  /* Carries the host height inwards. Without it this box is content-sized, and
     the flex-grow below plus the counters' height:100% never get any room to
     share - which is why setting a height used to do nothing at all. Under the
     default by-content height this resolves to auto, so nothing changes. */
  height: 100%;
}

.labelsContainer,
.countersContainer {
  display: flex;
  align-items: center;
  width: 100%;
}

.countersContainer {
  flex-grow: 1;
  margin-bottom: 5px;
}

/* that margin only exists to separate the counters from the labels below */
.countdownContainer--noLabels .countersContainer {
  margin-bottom: 0;
}

.counterLabelContainer,
.counterContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  min-width: 40px;
}

.counterContainer {
  height: 100%;
}

.counter-separator,
.label-separator {
  margin: 0 5px;
  font-weight: 700;
  font-size: 16px;
}

.label-separator {
  /* 
  limit label separator height so that it never will be higher than label or container,
  still having the same width as counter separator
  */
  height: 3px;
  opacity: 0;
}

.counter, .counterLabel {
  width: 100%;
}

.counter {
  margin: 5px;
}

.counterLabel {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
    `;
}
