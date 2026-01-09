export default function getStyleElement() {
    return `
        <style>
            :host {
              transform: rotate(var(--rotation, 0deg));
            }
        
            img {
              display: block;
              max-height: inherit;
              height: inherit;
              min-height: inherit;
            }
        </style>
    `;
}
