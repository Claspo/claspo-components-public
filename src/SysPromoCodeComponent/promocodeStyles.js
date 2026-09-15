const promocodeStyles = `
.text {
  outline: none;
  min-height: 20px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.promocode-icon {
  top: calc(((var(--clPromocodeIconHeight) / 2) * -1) - var(--clStrokeForIconWidth));
  width: var(--clPromocodeIconWidth);
  height: var(--clPromocodeIconHeight);
}

.promocode-icon svg {
  display: flex;
  width: 100%;
  height: auto;
}

button.focus-outline-defined:focus {
  outline: var(--clFocusOutline);
}

.cl--inline--edit {
   overflow-wrap: break-word;
   max-width: 100%;
}

/* The spinner shown while the prize pool is being resolved and its code claimed. Same shape, size
   and rotation as the one SysButton shows during a submit, so the two read as one product. It
   centres on .text, which is already position: relative, and takes its colour from that
   element's own text colour - set in showPendingLoader, because the colour is an inline style the
   SDK writes per widget theme and no stylesheet here can know it. */
.promocode-asyncLoader {
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

.text.cl-promocode-loading .promocode-asyncLoader {
  display: block;
}

/* The code itself is hidden rather than removed, so the component keeps the width it will have once
   the real code lands and nothing reflows around it when the spinner stops. The decorative stroke
   icons stay - they are the ticket, not the code. */
.text.cl-promocode-loading .cl--inline--edit {
  visibility: hidden;
}

.promocode-asyncLoader .spinner--icon {
  width: 20px;
  height: 20px;
  transform-origin: center;
  animation: cl-promocode-spinner-rotate 0.8s linear infinite;
}

.promocode-asyncLoader .spinner--icon .path {
  stroke: currentColor;
  stroke-linecap: round;
  stroke-dasharray: 24 32;
}

@keyframes cl-promocode-spinner-rotate {
  100% {
    transform: rotate(360deg);
  }
}
`;
export default promocodeStyles;
