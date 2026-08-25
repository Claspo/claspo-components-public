export default `
    /* The host is the flex container, and the wrapper chain below carries its
       height inwards through flex sizing rather than percentages. height:100%
       is not an option on these wrappers: in a quirks-mode document (the
       dashboard preview iframes are about:blank, and some customer pages have
       no doctype) WebKit resolves a percentage height under the auto-height
       host against the enclosing page column instead, so in Safari the buttons
       grew to the column and spilled out of the component. min-height:0 keeps
       each level able to shrink to a host smaller than the content, which is
       what the percentages used to allow. */
    :host {
      display: flex;
      flex-direction: column;
    }

    .main-container {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      min-height: 0;
    }

    .container-with-label {
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    .label {
      min-height: 10px;
    }

    .label.cl-focused {
      min-height: auto;
    }

    .container-with-tooltip {
      position: relative;
      display: flex;
      flex: 1 1 auto;
      min-height: 0;
      width: 100%;
      cursor: pointer;
    }
    
    .buttons-container {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .buttons-container [cl-element="button"] {
      appearance: none;
      -webkit-appearance: none;
      font: inherit;
      color: inherit;
      text-align: inherit;
      background: transparent;
      border: none;
      padding: 0;
      margin: 0;
      width: 100%;
      cursor: pointer;
      /* Share out whatever height the component is given. With the default
         by-content height there is no spare room and the buttons keep their
         own size, so this only takes effect once a height is actually set. */
      flex-grow: 1;
    }

    .buttons-container [cl-element="button"]:disabled {
      opacity: 1;
      cursor: default;
    }
    
    .invalid {
      border: 1px solid #ff0000 !important;
    }
    
    .tooltip {
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
`;
