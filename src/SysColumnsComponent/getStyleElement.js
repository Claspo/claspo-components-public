export default function getStyleElement() {
  return `
  <style>
    :host {
      position: relative;
      min-width: 50px;
      min-height: 50px; 
      display:flex;
    }

    .columns-container {
      height: auto;
      min-height: 50px; 
      width: 100%;
      min-width: 50px;
      display: flex;
      gap: inherit;
    }
  </style>
  `;
}
