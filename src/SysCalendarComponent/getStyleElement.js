export default function getStyleElement() {
  return `
  <style>
        .main-container {
          height: 100%;
        }
        
        .label-and-controls-container {
          height: 100%;
          display: flex;
          position: relative;
        }
        
        .input-ui-override {
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .selected-date-value {
          width: 100%;
        }
        
        input[type="date"] {
          position: absolute;
          left: 0;
          top: 0;
          background: transparent;
          text-indent: 999px;
          opacity: 0.01;
          border: none;
          cursor: pointer;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        
        .label {
          min-height: 10px;
        }

        .label.cl-focused {
          min-height: auto;
        }
        
        .calendar-placeholder {
          width: 100%;
        }
        
        .cl-calendar-input-control {
          position: relative;
          height: 100%;
          width: 100%;
          min-height: 15px;
        }
        
        .cl-calendar-input-control input {
          width: 100%;
          height: 100%;
        }
        
        .calendar-placeholder {
          color: var(--cl-calendar-input-placeholder-color);
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
        
        input:focus ~ .input-ui-override.focus-outline-defined {
          outline: var(--clFocusOutline);
        }
      </style>
  `;
}
