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
`;
export default promocodeStyles;
