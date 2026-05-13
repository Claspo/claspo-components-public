import { getStylesFromElement } from '@claspo/renderer/sdk/HtmlStyleUtils';
import {
  getMenuItemHoverColor,
  getMenuOverlayContentClassName,
  getOverlayBackgroundColor
} from '@claspo/renderer/sdk/OverlayUtils';

export default function getOverlayStyles(rootElement, overlayContentStyles, dropdownMenuOptionLabelStyles) {
  const overlayContentClassName = getMenuOverlayContentClassName();
  const inputButton = rootElement.querySelector('#cl-month-dropdown');
  const backgroundColor = getOverlayBackgroundColor(
    getStylesFromElement(inputButton, overlayContentStyles).background,
    getStylesFromElement(inputButton, dropdownMenuOptionLabelStyles).color,
  );

  return `
      .${overlayContentClassName} {
        height: 196px;
        width: 199px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.28);
        border-radius: 4px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        min-width: fit-content;
      }
  
      .${overlayContentClassName} div {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 9px;
        padding: 10px 15px 10px;
      }
  
      .${overlayContentClassName} div {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 9px;
        padding: 10px 14px 10px;
      }
  
      .option-wrapper {
        border: 0;
        align-items: center;
        font-size: 16px;
        padding: 10px 20px;
        outline: 0;
        cursor: pointer;
        text-align: left;
        transition: background-color 0.15s ease, box-shadow 0.15s ease;
      }
      
      .option-wrapper span {
        word-break: keep-all;
      }
  
      .option-wrapper:hover,
      .option-wrapper:focus,
      .option-wrapper.option-active,
      .option-wrapper.option-selected {
        background-color: var(--option-selected-background, ${getMenuItemHoverColor(backgroundColor)});
      }

      .option-wrapper.option-active {
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
      }

      .option-wrapper:hover {
        background-color: ${getMenuItemHoverColor(backgroundColor)};
      }
    `;
}
