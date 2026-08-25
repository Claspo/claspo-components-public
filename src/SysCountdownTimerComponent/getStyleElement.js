export default function getStyleElement() {
  return `
<style>
/* The host is the flex container, so the root box below takes the host height
   through flex sizing rather than a percentage. With a fixed or filled host the
   box grows to it; with the default by-content host it hugs the counters; and
   min-height:0 lets it clamp to a host that is smaller than the counters, so the
   numbers are the same a height:100% used to give in Chrome.
   height:100% itself is not an option here: in a quirks-mode document (the
   dashboard preview iframes are about:blank, and some customer pages have no
   doctype) WebKit resolves a percentage height on a child of an auto-height
   block against the parent flex column instead, so in Safari the counters grew
   to the column and spilled out of the timer. */
:host {
  display: flex;
  flex-direction: column;
}

.countdownContainer {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
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
