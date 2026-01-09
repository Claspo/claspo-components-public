const afterBorderWidth = '12px';
const beforeBorderWidth = '14px';

const tooltipStyles = `
  .cl-promo-code-tooltip-container {
    z-index: ${String(Number.MAX_SAFE_INTEGER)};
    padding: 10px;
    display: inline-block;
    position: fixed;
    background: #000;
    opacity: 1;
    border: 2px solid #FFF;
    border-radius: 5px;
    max-height: fit-content;
  }
  
  .cl-promo-code-tooltip-container[cl-tooltip-position='top']:after {
    content: "";
    position: absolute;
    top: 100%;
    left: calc(50% - 5px);
    margin-left: -8px;
    margin-top: -2px;
    border-width: ${afterBorderWidth};
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  .cl-promo-code-tooltip-container[cl-tooltip-position='top']:before {
    content: "";
    position: absolute;
    top: 100%;
    left: calc(50% - 15px);
    border-width: ${beforeBorderWidth};
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
  
  .cl-promo-code-tooltip-container[cl-tooltip-position='bottom']:after {
    content: "";
    position: absolute;
    top: -22px;
    left: calc(50% - 4px);
    margin-left: -5px;
    margin-bottom: -2px;
    border-width: ${afterBorderWidth};
    border-style: solid;
    border-color: transparent transparent black transparent;
  }

  .cl-promo-code-tooltip-container[cl-tooltip-position='bottom']:before {
    content: "";
    position: absolute;
    top: -28px;
    left: calc(50% - 11px);
    border-width: ${beforeBorderWidth};
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
`;
export default tooltipStyles;
