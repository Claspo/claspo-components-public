export default function getStyleElement() {
  return `
  <style>
            :host {
              position: relative;
              min-width: 20px;
              min-height: 20px;
            }
            
            .slider-container {
              width: 100%;
              height: 100%;
              overflow: hidden;
              border-radius: inherit;
            }
            
            .slides-container {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: row;
            }
            
            .prevSlideControl,
            .nextSlideControl {
              position: absolute;
              z-index: 1;
              top: 50%;
              transform: translateY(-50%);
              display: flex;
              justify-content: center;
              align-items: center;
              width: var(--clSliderNavigationButtonsSize, 35px);
              height: var(--clSliderNavigationButtonsSize, 35px);
              background: #fff;
              border-radius: 999px;
              cursor: pointer;
            }
            
            .prevSlideControl {
              left: 0px;
            }
            
            .nextSlideControl {
              right: 0px;
            }
            
            .prevSlideControl svg,
            .nextSlideControl svg {
              width: 15px;
              fill: var(--clSliderArrowColor, #000);
            }
            
            .prevSlideControl svg {
              margin-right: 3px;
              margin-top: 1px;
              transform: rotate(90deg);
            }
            
            .nextSlideControl svg {
              margin-left: 3px;
              margin-bottom: 1px;
              transform: rotate(-90deg);
            }
            
            .indicatorControl {
              position: absolute;
              right: 50%;
              bottom: 10px;
              overflow: hidden;
              max-width: 100%;
              transform: translateX(50%);
              z-index: 1;
            }
            
            .navigationDotsContainer {
              display: flex;
              gap: 5px;
            }
            
            .navigationDot {
              width: var(--clSliderIndicationSize, 7px);
              height: var(--clSliderIndicationSize, 7px);
              min-width: var(--clSliderIndicationSize, 7px);
              background: var(--clSliderIndicationColor, #fff);
              opacity: 0.5;
              border-radius: 999px;
              cursor: pointer;
            }
            
            .navigationDot.active,
            .navigationDot:hover {
              opacity: 1;
            }
            
            .highligh-on-hover-with-pseudo-element:after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
            
            .highligh-on-hover:hover,
            .highligh-on-hover-with-pseudo-element:hover:after {
              outline: 2px solid rgba(0, 0, 0, 0.5);
            }

            .not-reachable-element {
              display: none !important;
            }
      </style>
  `;
}
