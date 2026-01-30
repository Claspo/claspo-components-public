export default {
  "name": "SysSlideComponent",
  "componentType": "SLIDE",
  "version": "1.0.0",
  "focusParentOnClick": true,
  "preventDraggable": true,
  "propertyPaneModel": {
    "content": [
      {
        "type": "GROUP",
        "propPath": [
          "adaptiveStyles",
          "desktop"
        ],
        "children": [
          {
            "type": "CONTROL",
            "name": "ALIGNMENT",
            "elementProp": "styleAttributes",
            "element": "host",
            "hideSyncSelect": true
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "hideSyncSelect": true
          },
          {
            "type": "CONTROL",
            "name": "INDENTATION",
            "elementProp": "styleAttributes",
            "element": "host",
            "hideSyncSelect": true,
            "params": {
              "indentationType": "PADDING"
            }
          }
        ]
      },
      {
        "type": "GROUP",
        "propPath": [
          "adaptiveStyles",
          "mobile"
        ],
        "children": [
          {
            "type": "CONTROL",
            "name": "ALIGNMENT",
            "elementProp": "styleAttributes",
            "element": "host",
            "hideSyncSelect": true
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "hideSyncSelect": true
          },
          {
            "type": "CONTROL",
            "name": "INDENTATION",
            "elementProp": "styleAttributes",
            "element": "host",
            "hideSyncSelect": true,
            "params": {
              "indentationType": "PADDING"
            }
          }
        ]
      }
    ],
    "general": [
      {
        "type": "CONTROL",
        "name": "ACTIONS",
        "propPath": [
          "handlers"
        ],
        "params": {
          "origin": true
        }
      }
    ]
  },
  "events": {
    "dispatch": [],
    "listen": []
  },
  "i18nPropertyPaneModel": {
    "content": [
      {
        "type": "CONTROL",
        "name": "ACTIONS",
        "propPath": [
          "handlers"
        ],
        "params": {
          "origin": false
        }
      }
    ]
  },
  "i18nPropPaths": [
    "handlers,[id],actions,[id],params,link"
  ],
  "props": {
    "content": {
      "name": null
    },
    "styles": [
      {
        "element": "host",
        "styleAttributes": {
          "background": "#FFFFFF",
        },
        "classes": ""
      }
    ],
    "adaptiveStyles": {
      "desktop": [
        {
          "element": "host",
          "styleAttributes": {
            "display": "inline-flex",
            "position": "relative",
            "width": "100%",
            "minWidth": null,
            "height": "auto",
            "minHeight": null,
            "overflow": "hidden",
            "flexDirection": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "gap": "20px",
            "paddingTop": "0px",
            "paddingBottom": "0px",
            "paddingLeft": "0px",
            "paddingRight": "0px",
            "_paddingEnabled": false,
            "marginTop": "0px",
            "marginBottom": "0px",
            "marginLeft": "0px",
            "marginRight": "0px",
            "_marginEnabled": false,
            "borderTopStyle": "solid",
            "borderRightStyle": "solid",
            "borderBottomStyle": "solid",
            "borderLeftStyle": "solid",
            "borderTopWidth": "0px",
            "borderTopColor": "rgb(0, 0, 0)",
            "borderBottomWidth": "0px",
            "borderBottomColor": "rgb(0, 0, 0)",
            "borderLeftWidth": "0px",
            "borderLeftColor": "rgb(0, 0, 0)",
            "borderRightWidth": "0px",
            "borderRightColor": "rgb(0, 0, 0)",
            "borderTopLeftRadius": "0px",
            "borderTopRightRadius": "0px",
            "borderBottomLeftRadius": "0px",
            "borderBottomRightRadius": "0px",
            "boxShadow": "none"
          },
          "classes": ""
        }
      ],
      "mobile": [
        {
          "element": "host",
          "styleAttributes": {
            "position": "relative",
            "width": "100%",
            "minWidth": null,
            "height": "auto",
            "minHeight": null,
            "overflow": "hidden",
            "flexDirection": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "gap": "20px",
            "paddingTop": "0px",
            "paddingBottom": "0px",
            "paddingLeft": "0px",
            "paddingRight": "0px",
            "_paddingEnabled": false,
            "marginTop": "0px",
            "marginBottom": "0px",
            "marginLeft": "0px",
            "marginRight": "0px",
            "_marginEnabled": false,
            "borderTopStyle": "solid",
            "borderRightStyle": "solid",
            "borderBottomStyle": "solid",
            "borderLeftStyle": "solid",
            "borderTopWidth": "0px",
            "borderTopColor": "rgb(0, 0, 0)",
            "borderBottomWidth": "0px",
            "borderBottomColor": "rgb(0, 0, 0)",
            "borderLeftWidth": "0px",
            "borderLeftColor": "rgb(0, 0, 0)",
            "borderRightWidth": "0px",
            "borderRightColor": "rgb(0, 0, 0)",
            "borderTopLeftRadius": "0px",
            "borderTopRightRadius": "0px",
            "borderBottomLeftRadius": "0px",
            "borderBottomRightRadius": "0px",
            "boxShadow": "none"
          },
          "classes": ""
        }
      ]
    }
  },
  "waitForResourcesLoad": true,
  "resourcesPropPaths": [
    ["adaptiveStyles", ":ENV", "styleAttributes", "background"],
    ["styles", "styleAttributes", "background"],
  ],
  "metaDescription": {
    "label": {
      "en": "Slide",
      "ru": "Слайд",
      "uk": "Слайд",
      "es": "Diapositiva",
      "fr": "Diapositive",
      "de": "Slide",
      "it": "Slide",
      "pt": "Diapositivo",
      "ro": "Slide",
      "bg": "Слайд",
      "cs": "Slide",
      "el": "Slide",
      "nl": "Slide",
      "pl": "Slajd",
      "sv": "Slide",
      "tr": "Slide",
      "ar": "Slide",
      "zh": "Slide",
      "da": "Slide",
      "he": "Slide",
      "fi": "Slide",
      "hi": "Slide",
      "hr": "Slide",
      "hu": "Slide",
      "id": "Slide",
      "ja": "Slide",
      "ko": "Slide",
      "no": "Slide",
      "sk": "Slide",
      "sl": "Slide",
      "sr": "Slide",
    },
  },
  "syncEnabled": true,
  "stylesImitationEnabled": true,
}
