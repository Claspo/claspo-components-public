export default function getOverlayStyles(overlayContentClassName, staticResourcesUrl) {
  return `
.${overlayContentClassName} {
  width: 270px;
  max-height: 380px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.28);
  border-radius: 4px;
  padding: 20px 0;
  overflow: auto;
  position: absolute;
  background-color: #fff;
}

.${overlayContentClassName}::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: transparent;
}

.${overlayContentClassName}::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: #848484;
}

.search-country-input-container {
  display: flex;
  align-items: center;
  padding: 0 20px 20px;
}

.option-wrapper {
  background-color: #fff;
  border: 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 10px 20px;
  outline: 0;
  cursor: pointer;
  text-align: left;
  flex-direction: row;
  transition: background-color 0.15s ease, box-shadow 0.15s ease;
}
.option-wrapper:hover,
.option-wrapper.option-active,
.option-wrapper.option-selected {
  background-color: #fafafa;
}

.option-wrapper.option-active {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}
.phone-input-flag-icon {
  background: url(${staticResourcesUrl}img/flags.png) no-repeat 0 0;
  background-size: 24px 3876px;
  background-position-x: -1px;
  min-width: 24px;
  height: 16px;
  margin: 0 5px;
}
.phone-input-prefix {
  margin-left: 8px;
  color: #999;
  font-size: 14px;
}

.search-country-input {
  border: 0;
  border-bottom: 1px solid #000;
  border-radius: 0;
  outline: 0;
  margin-left: 10px;
  width: 170px;
  line-height: 1.42857143;
}
  `;
}
