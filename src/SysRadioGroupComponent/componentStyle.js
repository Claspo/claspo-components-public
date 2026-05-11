export default `
    .main-container {
      height: 100%;
    }
    
    .label-with-radio-group-container {
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
    
    .radio-buttons-list {
      width: 100%;
      height: auto;
      text-align: inherit;
    }
    
    .radio-group-with-tooltip {
      position: relative;
      display: flex;
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
    
    .invalid {
      border: 1px solid #ff0000 !important;
    }
    
    .radio-group-tooltip {
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
    
    .radio-group-content {
      display: flex;
      /*align-items: center;*/
      /*position: absolute;*/
      height: 100%;
      width: 100%;
      /*padding: 0 35px 0 20px;*/
      cursor: pointer;
      border: 1px solid transparent;
      /*TODO*/
      /*padding: 10px;
      margin: -10px;*/
    }
    
    .option-wrapper {
      border: 0;
      align-items: center;
      outline: 0;
      text-align: inherit;
      padding: var(--borderTopWidth);
    }
    
    input {
      -moz-appearance: none;
      -webkit-appearance: none;
      -o-appearance: none;
      width: 24px;
      height: auto;
      padding: 0 10px;
      margin: 0;
    }
    
    /* The container */
    .radio-mark-container {
      cursor: pointer;
      display: flex;
      position: relative;
      padding-left: calc(var(--inputSize, 22px) + var(--inputToTextGapSize, 18px) + var(--borderTopWidth, 1));
      height: var(--inputSize, 22px);
      width: 100%;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    
    /* Visually hide the native radio while keeping it in the accessibility
       tree (1x1 with clip). width/height: 0 caused Safari + VoiceOver to
       skip checked-state announcements. */
    .radio-mark-container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }
    
    .radio-mark-container .radio-box-label {
      display: block;
    }
    
    /* Create a custom radio */
    .radio-mark {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      height: var(--inputSize, 22px);
      width: var(--inputSize, 22px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;
      border-radius: 50px;
      box-shadow: 0 0 0 var(--borderTopWidth) var(--borderTopColor);
      outline: none;
      /*border-style:  var(--borderStyle);
      border-color: var(--borderTopColor);
      border-width: var(--borderTopWidth);*/
      /*outline-width: var(--borderTopWidth);
      outline-color: var(--borderTopColor);
      outline-style: var(--borderStyle);*/
      z-index: 2;
      background: var(--background, rgb(256, 256, 256));
      backdrop-filter: var(--backdropFilter);
    }
    
    .radio-mark-shadow {
      box-shadow: var(--boxShadow);
      position: absolute;
      top: 0;
      left: 0;
      height: var(--inputSize, 22px);
      width: var(--inputSize, 22px);
      border-radius: 50px;
      z-index: 1;
    }
    
    .radio-mark:after {
      content: "";
      position: absolute;
      display: none;
    }
    
    .radio-mark-checked {
      box-shadow: 0 0 0 var(--borderTopWidth) var(--selectedColor);
    }
    
    .radio-mark-checked:after {
      display: block;
    }
    
    .radio-mark-container .radio-mark:after {
      width: var(--inputSize, 22px);
      height: var(--inputSize, 22px);
      border-radius: 50px;
      border-width: 1px;
      border-style: solid;
      background: var(--borderColor);
      border-color: var(--borderColor);
      scale: 0.8;
    }
    
    .radio-box-label {
      margin: 0;
      height: auto;
      min-height: 10px;
      width: auto;
      align-self: center;
      text-shadow: var(--textShadow);
    }
    
    input:focus ~ .radio-mark.focus-outline-defined {
      /*outline: var(--clFocusOutline);*/
      z-index: 3;
      outline-width: calc(var(--borderTopWidth) + 3px);
      outline-color: var(--borderTopColor);
      outline-style: solid;
      opacity: 0.7;
    }
    
    input:focus ~ .radio-mark.radio-mark-checked.focus-outline-defined {
      outline-color: var(--selectedColor);
    }
`;
