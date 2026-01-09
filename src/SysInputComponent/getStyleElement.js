export default function getStyleElement() {
  return `
<style>
.main-container {
  height: 100%;
}

.label-with-input-container {
  height: 100%;
  display: flex;
}

.label {
  min-height: 10px;
}

.label.cl-focused {
  min-height: auto;
}

.input-with-tooltip {
  position: relative;
  display: flex;
  height: 100%;
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
  width: 100%;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin: 0;
  -moz-appearance:none;
  -webkit-appearance:none;
  -o-appearance:none;
}

input.focus-outline-defined:focus {
  outline: var(--clFocusOutline);
}
</style>
    `;
}
