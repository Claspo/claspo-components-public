export default `
    .main-container {
        height: 100%;
    }
    
    .container-with-label {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .label {
      min-height: 10px;
    }
    
    .label.cl-focused {
      min-height: auto;
    }
    
    .container-with-tooltip {
      position: relative;
      display: flex;
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
    
    .buttons-container {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .buttons-container [cl-element="button"] {
      appearance: none;
      -webkit-appearance: none;
      font: inherit;
      color: inherit;
      text-align: inherit;
      background: transparent;
      border: none;
      padding: 0;
      margin: 0;
      width: 100%;
      cursor: pointer;
    }

    .buttons-container [cl-element="button"]:disabled {
      opacity: 1;
      cursor: default;
    }
    
    .invalid {
      border: 1px solid #ff0000 !important;
    }
    
    .tooltip {
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
`;
