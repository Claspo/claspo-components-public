export default function getStyleElement() {
  return `
<style>
/* The host height reaches the checkbox row through flex sizing, not height:100%:
   in a quirks-mode document (the dashboard preview iframes are about:blank, some
   customer pages have no doctype) WebKit resolves that percentage past the
   auto-height host against the enclosing flex column, so in Safari the consent
   grew to the column and pushed everything below it out of the view.
   min-height:0 lets the boxes clamp to a host smaller than the label, as
   height:100% did. The chain only works while the host stays display:flex. */
:host {
  display: flex;
  flex-direction: column;
}

/* an author :host display beats the user-agent [hidden] rule */
:host([hidden]) {
  display: none;
}

.main-container {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}

.label-with-input-container {
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  min-height: 0;
}

.input-with-tooltip {
  position: relative;
  display: flex;
  align-items: baseline;
  align-self: stretch;
  width: 100%;
}

.invalid {
  border: 1px solid #ff0000 !important;
}

.input-tooltip {
  visibility: hidden;
  position: absolute;
  right: -10px;
  top: -10px;
  z-index: 1;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;
}

input {
  -moz-appearance:none;
  -webkit-appearance:none;
  -o-appearance:none;
  width: 24px;
  height: 24px;
  padding: 0 10px;
  margin: 0;
}

/* The container */
.checkmark-container {
  display: block;
  position: relative;
  height: 25px;
  width: 25px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkmark-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: var(--inputSize, 22px);
  width: var(--inputSize, 22px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2px;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkmark-checked:after {
  display: block;
}

.checkmark-container .checkmark:after {
  width: 9px;
  height: 14px;
  border: solid #000000;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.label {
  margin: auto auto  auto var(--inputToTextGapSize, 18px);
  flex: 1;
  height: auto;
  min-height: 10px;
}

input:focus ~ .checkmark.focus-outline-defined {
  outline: var(--clFocusOutline);
}

</style>
    `;
}
