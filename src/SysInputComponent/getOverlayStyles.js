export default function getOverlayStyles(overlayContentClassName) {
  const afterBorderWidth = '12px';
  const beforeBorderWidth = '14px';

  return `
    .${overlayContentClassName} {
      position: absolute;
      display: flex;
      width: fit-content;
      height: fit-content;
      padding: 20px 0;
      background: #000000;
      border: 2px solid #FFFFFF;
      border-radius: 5px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.28);
      animation: jello-animation 10.9s both;
      animation-iteration-count: 1;
    }

    .${overlayContentClassName}[cl-overlay-position='top']:after {
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

    .${overlayContentClassName}[cl-overlay-position='top']:before {
        content: "";
        position: absolute;
        top: 100%;
        left: calc(50% - 15px);
        border-width: ${beforeBorderWidth};
        border-style: solid;
        border-color: white transparent transparent transparent;
    }
    
    .${overlayContentClassName}[cl-overlay-position='bottom']:after {
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

    .${overlayContentClassName}[cl-overlay-position='bottom']:before {
      content: "";
      position: absolute;
      top: -28px;
      left: calc(50% - 11px);
      border-width: ${beforeBorderWidth};
      border-style: solid;
      border-color: transparent transparent white transparent;
    }

    .${overlayContentClassName}[cl-overlay-position='right']:after {
      content: "";
      position: absolute;
      top: calc(50% - 7px);
      left: -18px;
      margin-left: -5px;
      border-width: ${afterBorderWidth};
      border-style: solid;
      border-color: transparent black transparent transparent;
    }

    .${overlayContentClassName}[cl-overlay-position='right']:before {
      content: "";
      position: absolute;
      top: calc(50% - 9px);
      left: -28px;
      border-width: ${beforeBorderWidth};
      border-style: solid;
      border-color: transparent white transparent transparent;
    }

    .${overlayContentClassName}[cl-overlay-position='left']:after {
      content: "";
      position: absolute;
      top: calc(50% - 7px);
      right: -22px;
      margin-left: -5px;
      border-width: ${afterBorderWidth};
      border-style: solid;
      border-color: transparent transparent transparent black;
    }

    .${overlayContentClassName}[cl-overlay-position='left']:before {
      content: "";
      position: absolute;
      top: calc(50% - 9px);
      right: -28px;
      border-width: ${beforeBorderWidth};
      border-style: solid;
      border-color: transparent transparent transparent white;
    }

    .suggestion-text-container {
      height: fit-content;
      width: fit-content;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 3px;
      margin: 2px 10px;
      letter-spacing: normal;
      font-size: 14px;
    }

    .did-you-mean-text {
      height: 16px;
      white-space: nowrap;
      width: fit-content;
      line-height: 16px;
      letter-spacing: normal;
      font-size: 14px;
      color: white;
    }

    .suggestion-text {
      height: 16px;
      white-space: nowrap;
      width: fit-content;
      color: white;
      line-height: 16px;
      font-weight: bold;
      letter-spacing: normal;
      font-size: 14px;
    }

    .accept-button {
      position: relative;
      width: 36px;
      height: 36px;

      border: 2px solid #FFFFFF;
      border-radius: 7px;
      cursor: pointer;
    }

    .accept-button:after {
      content: '';
      position: absolute;
      top: 42%;
      left: 50%;
      width: 9px;
      height: 14px;
      border: solid;
      border-color: white;
      border-width: 0 3px 3px 0;
      -webkit-transform: translate(-50%, -50%) rotate(45deg);
      -ms-transform: translate(-50%, -50%) rotate(45deg);
      transform: translate(-50%, -50%) rotate(45deg);
    }

    .deny-button {
      position: relative;
      width: 36px;
      height: 36px;
      border: 2px solid black;
      border-radius: 7px;
      cursor: pointer;
    }

    .deny-button:before, .deny-button:after {
      position: absolute;
      top: 50%;
      left: 50%;
      content: '';
      height: 18px;
      width: 2px;
      background-color: #595959;
    }

    .deny-button:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    .deny-button:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    @keyframes jello-animation {
      0% {
        transform: scale3d(1, 1, 1);
      }
      3% {
        transform: scale3d(1.25, 0.75, 1);
      }
      4% {
        transform: scale3d(0.75, 1.25, 1);
      }
      5% {
        transform: scale3d(1.15, 0.85, 1);
      }
      6.5% {
        transform: scale3d(0.95, 1.05, 1);
      }
      7.5% {
        transform: scale3d(1.05, 0.95, 1);
      }
      10% {
        transform: scale3d(1, 1, 1);
      }
      100% {
        transform: scale3d(1, 1, 1);
      }
    }
  `;
}
