let SysButtonStyles = `
.main-container {
  position: relative;
  display: flex;
  width: 100%;
  height: inherit;
}

button {
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  outline: none;
  min-height: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: var(--iconDistanceToText, 15px);
  z-index: 0;
  position: relative;
}

.editable-text {
  display: var(--textDisplay, 'inline');
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

.icon {
  display: var(--iconDisplay, none);
  width: var(--iconSize, 20px);
  height: var(--iconSize, 20px);
  order: var(--iconOrder, -1);
  background: var(--iconURL);
  margin-top: 0px;
  margin-bottom: 0px;
  background-size: cover;
}

button.focus-outline-defined:focus {
  outline: var(--clFocusOutline);
}

.button-asyncLoader {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  z-index: 1;
  pointer-events: none;
}

.main-container.cl-button-loading .button-asyncLoader {
  display: block;
}

.button-success-icon {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 22px;
  height: 22px;
  margin: -11px 0 0 -11px;
  z-index: 1;
  pointer-events: none;
}

.button-success-icon svg {
  width: 22px;
  height: 22px;
}

.main-container.cl-button-success .button-success-icon {
  display: block;
}

/* Once the success checkmark is shown the button is disabled and final, so
   suppress hover feedback. Removing pointer interaction stops the SDK :hover
   rules and the FILL_UP hover animation from matching, which keeps the button
   visually static while the checkmark is displayed. */
.main-container.cl-button-success button {
  pointer-events: none;
}

.main-container.cl-button-loading .editable-text,
.main-container.cl-button-loading .icon,
.main-container.cl-button-success .editable-text,
.main-container.cl-button-success .icon {
  visibility: hidden;
}

.button-asyncLoader .spinner--icon {
  width: 20px;
  height: 20px;
  transform-origin: center;
  animation: cl-button-spinner-rotate 0.8s linear infinite;
}

.button-asyncLoader .spinner--icon .path {
  stroke: currentColor;
  stroke-linecap: round;
  stroke-dasharray: 24 32;
}

@keyframes cl-button-spinner-rotate {
  100% {
    transform: rotate(360deg);
  }
}
`;
export default SysButtonStyles;
