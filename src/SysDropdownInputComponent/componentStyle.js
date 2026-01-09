export default (options = {}) => {
  const placeholderColor = options.placeholderColor || '#808080';

  return `
    .main-container {
      height: 100%;
    }
    
    .label-with-dropdown-input-container {
      height: 100%;
      display: flex;
    }
    
    .label {
      min-height: 10px;
    }
    
    .label.cl-focused {
      min-height: auto;
    }
    
    .dropdown-input-with-tooltip {
      position: relative;
      display: flex;
      height: 100%;
      width: 100%;
      cursor: pointer;
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
      -webkit-user-select: none; /* Chrome/Safari/Opera */
      -khtml-user-select: none; /* Konqueror */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
    }
    
    .dropdown-label {
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
      padding: 0 35px 0 20px;
      cursor: pointer;
    }
    
    .dropdown-label::placeholder {
      color: ${placeholderColor};
    }
    
    .dropdown-input-select-button {
      background: transparent;
      border: none;
      min-width: max-content;
      width: 24px;
      height: 100%;
      display: flex;
      align-items: center;
      margin-right: 5px;
      position: absolute;
      right: 0;
      z-index: 2;
    }
    
     button.focus-outline-defined:focus {
      outline: var(--clFocusOutline);
    }
`
};

