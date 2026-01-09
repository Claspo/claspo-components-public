export default function getStyleElement() {
  return `
   <style>
        .main-container {
          height: 100%;
        }
        
        .label-and-controls-container {
          height: 100%;
          display: flex;
        }
        
        .controls-container {
          position: relative;
          height: 100%;
          min-height: 15px;
          width: 100%;
          display: flex;
          gap: 5px;
        }
        
        .label {
          min-height: 10px;
        }
        
        .label.cl-focused {
          min-height: auto;
        }
        
        .dropdown-placeholder {
          width: calc(100% - 15px);
          text-overflow: ellipsis;
          overflow: hidden;
        }
        
        .day-input-with-tooltip {
          min-width: 54px;
          height: inherit;
        }
        
        .month-dropdown-input {
          position: relative;
          display: flex;
          height: inherit;
          width: 100%;
          cursor: pointer;
          min-width: 82px;
        }
        
        .year-input-with-tooltip {
          min-width: 56px;
          height: 100%;
        }
        
        .cl-date-input-control {
          position: relative;
          width: 100%;
        }
        
        .cl-date-input-control input {
          width: 100%;
          height: 100%;
        }
        
        .cl-date-input-control input::placeholder {
          color: var(--cl-date-input-placeholder-color);
          opacity: 1;
        }
        
        .cl-date-input-control input::-ms-input-placeholder {
          color: var(--cl-date-input-placeholder-color);
          opacity: 1;
        }
        
        .cl-date-input-control .month-dropdown-input .dropdown-input-select-button {
          bottom: calc(50% - 17px);
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
          position: absolute;
          height: 100%;
          width: 100%;
          padding: 0 35px 0 20px;
          cursor: pointer;
        }
        
        .dropdown-input-select-button {
          background: transparent;
          border: none;
          min-width: max-content;
          width: 24px;
          height: 100%;
          display: flex;
          align-items: center;
          position: absolute;
          right: 0;
          z-index: 2;
        }
        
        .label-and-controls-container.focus-outline-defined input:focus, .dropdown-label:focus {
          outline: var(--clFocusOutline);
        }
      </style>
  `;
}
