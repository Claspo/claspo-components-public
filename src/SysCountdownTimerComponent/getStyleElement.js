export default function getStyleElement() {
  return `
<style>
.countdownContainer {
  display: flex;
  flex-direction: column;
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
