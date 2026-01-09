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

.phone-input-with-tooltip {
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
  height: 100%;
  -moz-appearance:none;
  -webkit-appearance:none;
  -o-appearance:none;
}

.phone-input-select-button {
  background: transparent;
  border: none;
  min-width: max-content;
  width: 24px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: absolute;
}

.phone-input {
  height: 100%;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin: 0;
  text-align: start !important;
}

.phone-input-select-button-flag {
  background-repeat: no-repeat;
  background-size: 24px 3876px;
  background-position-x: -1px;
  min-width: 24px;
  width: 24px;
  height: 16px;
  margin: auto 5px auto 0;
}

.phone-input-asyncLoader {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background-color: #ffffff;
  position: absolute;
  right: -9px;
  top: -9px;
  visibility: hidden;
}

.phone-input-asyncLoader .spinner--icon {
  animation: rotates 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -9px 0 0 -9px;
  width: 18px;
  height: 18px;
}

.phone-input-asyncLoader .spinner--icon .path {
  stroke: #9B9B9B;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

.phone-input-asyncLoader .spinner--icon .path1 {
  stroke: #9B9B9B;
  stroke-linecap: round;
  animation: dash 1.25s ease-in-out infinite;
}

.phone-input-asyncLoader .spinner--icon @keyframes rotates {
  100% {
    transform: rotate(360deg);
  }
}

.phone-input-asyncLoader .spinner--icon @keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

input {
  width: 100%;
}

input.focus-outline-defined:focus {
  outline: var(--clFocusOutline);
}
</style>
  `;
}
