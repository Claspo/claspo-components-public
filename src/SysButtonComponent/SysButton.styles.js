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
`;
export default SysButtonStyles;
