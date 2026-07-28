import WcElement from "@claspo/renderer/sdk/WcElement";

import SysTextManifest from "./SysText.manifest";
import { createStaticTextRoller, createUpdatingTextRoller } from "./TextRoller";
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';


export default class SysTextComponent extends WcElement {
  static define = {
    name: 'sys-text',
    model: SysTextManifest.name,
    manifest: SysTextManifest,
  };

  manifest = SysTextManifest;

  constructor() {
    super();
    this.getRootElement().innerHTML = `
      <style>
        .text {
          outline: none;
          min-height: fit-content;
          width: 100%;
          overflow-wrap: break-word;
        }
      </style>
      
      <style>
        [cl-type="TEXT_ROLLER"] {
          position: relative;
        }

        .text {
          align-items: center;
        }
        
        .container--staticTextRoller {
          display: inline-flex;
          max-width: 100%;
          width: fit-content;
        }
      
        .container {
          display: inline-flex;
          align-items: center;
          overflow: hidden;
          position: relative;
          height: 100%;
        }

        .opts {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 1;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 1px;
          flex-direction: column-reverse;
          transform: translateY(-100%);
        }
      
        .opt {
          width: 100%;
          height: 100%;
          text-align: center;
          display: inline-flex;
          justify-content: center;
        }
  
        .opt span {
         white-space: nowrap;
         align-items: center;
         text-overflow: ellipsis;
         overflow: hidden;
         width: fit-content;
         max-width: 100%;
         padding: 0 2px;
        }
      </style>

      <div class="text" cl-element="text" cl-inline-edit="content, text"></div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.observeProps((prev, next) => {
      this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles);

      if (next.content?.text && this.getElement('text')) {
        insertHtmlIntoElement({
          element: this.getElement('text'),
          html: next.content?.text,
        });
        this.mergeTagsProcessor.process(this.getElement('text'), next.content.mergeTags, this.getModel().id);
      }

      this.processTextRoller(next.content?.textrollers);
    })

    this.observeShared(() => {
      const props = this.getProps();

      this.processTextRoller(props.content?.textrollers);
    })
  }

  processTextRoller(textrollersProps = {}) {
    const container = this.getElement('text');
    if (!container) {
      return;
    }
    const isStatic = this.isStaticRenderMode();

    // querySelectorAll, not childNodes: a roller may be nested inside inline
    // formatting wrappers (e.g. a full-content styling <span>, <b>) in content.text
    container.querySelectorAll('[cl-type="TEXT_ROLLER"]').forEach((node) => {
      const id = node.getAttribute('cl-id');
      const props = textrollersProps[id];

      if (!props) {
        return;
      }

      if (isStatic) {
        createStaticTextRoller(node, props);
      } else {
        createUpdatingTextRoller(node, props);
      }
    });
  }

  stylesAppliedToElement(htmlElement, elementModel) {
    if (elementModel.element === 'text') {
      if (elementModel.styleAttributes.textAlign && getComputedStyle(htmlElement).display === 'flex') {
        htmlElement.style.justifyContent = elementModel.styleAttributes.textAlign === 'center'
          ? 'center' : `flex-${elementModel.styleAttributes.textAlign}`;
      }
    }
  }
}
