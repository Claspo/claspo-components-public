import SysSlideManifest from "../SysSlideComponent/SysSlide.manifest";

export default ({ background }) => {
  return ({
    "path": [],
    "type": SysSlideManifest.componentType,
    "name": SysSlideManifest.name,
    "version": SysSlideManifest.version,
    "focusParentOnClick": true,
    "preventDraggable": true,
    "props": {
      ...SysSlideManifest.props,
      "content": {
        "name": null
      },
      styles: SysSlideManifest.props.styles.map(element => {
        if (element.element === "host") {
          return {
            ...element,
            styleAttributes: {
              ...element.styleAttributes,
              background,
            }
          };
        }

        return element;
      }),
    },
    "children": []
  });
}
