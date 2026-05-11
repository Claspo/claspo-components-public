export default `
    .main-container {
        height: 100%;
    }
    
    .label-with-checkbox-list-container {
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
    
    .buttons-list {
      width: 100%;
      height: auto;
      text-align: inherit;
    }
    
    .checkbox-list-with-tooltip {
      position: relative;
      display: flex;
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
    
    .invalid {
      border: 1px solid #ff0000 !important;
    }
    
    .list-tooltip {
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
    
    .checkbox-list-content {
      display: flex;
      /*align-items: center;*/
      /*position: absolute;*/
      height: 100%;
      width: 100%;
      padding: 0;
      /*padding: 0 35px 0 20px;*/
      cursor: pointer;
      border: 1px solid transparent;
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
    .checkmark-container {
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
    
    /* Visually hide the native checkbox while keeping it in the accessibility
       tree. width/height: 0 caused Safari + VoiceOver to skip checked-state
       announcements. */
    .checkmark-container input {
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
    
    .checkmark-container .checkbox-label {
      display: block;
    }
    
    /* Create a custom checkbox */
    .checkmark {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      height: var(--inputSize, 22px);
      width: var(--inputSize, 22px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 2px;
      /*border-style: var(--borderStyle);
      border-color: var(--borderTopColor);
      border-width: var(--borderTopWidth);*/
      border-top-left-radius: var(--borderTopLeftRadius);
      border-top-right-radius: var(--borderTopRightRadius);
      border-bottom-left-radius: var(--borderBottomLeftRadius);
      border-bottom-right-radius: var(--borderBottomRightRadius);
      box-shadow: 0 0 0 var(--borderTopWidth) var(--borderTopColor);
      background: var(--background, rgb(256, 256, 256));
      backdrop-filter: var(--backdropFilter);
    }
    
    .checkmark-shadow {
      box-shadow: var(--boxShadow);
      position: absolute;
      top: 0;
      left: 0;
      height: var(--inputSize, 22px);
      width: var(--inputSize, 22px);
      padding-bottom: 2px;
      z-index: 1;
      border-top-left-radius: var(--borderTopLeftRadius);
      border-top-right-radius: var(--borderTopRightRadius);
      border-bottom-left-radius: var(--borderBottomLeftRadius);
      border-bottom-right-radius: var(--borderBottomRightRadius);
    }
    
    .checkmark:after {
      content: "L";
      position: absolute;
      display: none;
      transform: rotate(45deg) scaleX(-1);
      font-family: 'Arial';
    }
    
    .checkmark-checked {
      box-shadow: 0 0 0 var(--borderTopWidth) var(--selectedColor);
    }
    
    .checkmark-checked:after {
      display: block;
    }
    
    .checkmark-container .checkmark:after {
      width: var(--inputSize, 22px);
      height: var(--inputSize, 22px);
      font-size: var(--inputSize, 22px);
      line-height: var(--inputSize, 22px);
      text-align: center;
      color: var(--borderColor);
      margin-left: 10%;
      margin-bottom: 10%;
    }
    
    .checkbox-label {
      margin: 0;
      height: auto;
      min-height: 10px;
      width: auto;
      align-self: center;
      text-shadow: var(--textShadow);
    }
    
    input:focus ~ .checkmark.focus-outline-defined {
      /*outline: var(--clFocusOutline);*/
      z-index: 3;
      outline-width: calc(var(--borderTopWidth) + 3px);
      outline-color: var(--borderTopColor);
      outline-style: solid;
      opacity: 0.7;
    }
    
    input:focus ~ .checkmark.checkmark-checked.focus-outline-defined {
      outline-color: var(--selectedColor);
    }
`;
