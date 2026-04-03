import { cloneControlsToAllEnvs } from '@claspo/renderer/sdk/ManifestUtils';

export default {
  "name": "SysContainerComponent",
  "componentType": "CONTAINER",
  "version": "1.0.0",
  "contextMenuModel": [
    {
      "type": "CONTROL",
      "name": "COMPONENT_OPERATIONS"
    },
    {
      "type": "CONTROL",
      "name": "FOCUS_PARENT_COMPONENT",
      "params": {
        "hideForEntryType": "VIEW"
      }
    }
  ],
  "floatingControlsModel": cloneControlsToAllEnvs([
    {
      "type": "CONTROL",
      "name": "SIZE",
      "elementProp": "styleAttributes",
      "element": "host"
    },
    {
      "type": "CONTROL",
      "name": "MARGIN",
      "elementProp": "styleAttributes",
      "element": "host"
    },
    {
      "type": "CONTROL",
      "name": "CONTAINER_PADDING",
      "elementProp": "styleAttributes",
      "element": "host"
    },
    {
      "type": "CONTROL",
      "name": "PARENT_ALIGNMENT",
      "elementProp": "styleAttributes",
      "element": "host"
    }
  ]),
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
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "SIZE",
            "element": "host",
            "elementProp": "styleAttributes",
            "params": {
              "width": {
                "options": [
                  "fixed",
                  "fill",
                  "hug"
                ]
              },
              "height": {
                "options": [
                  "fixed",
                  "fill",
                  "hug"
                ]
              }
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND",
            "elementProp": "styleAttributes",
            "element": "host",
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER',
            "syncSelectOptions": [
              'SAME_TYPE_CROSS_ENV_WHILE_VALUES_MATCH',
              null,
            ]
          },
          {
            "type": "CONTROL",
            "name": "BACKDROP_FILTER",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "hideSyncSelect": true,
            "displayCondition": (sdk) => sdk.component.type === 'VIEW' ? (sdk.editorConfig.allowBackdropFilterOnView ?? true) : true,
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "BORDERS",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "BOX_SHADOW",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "INDENTATION",
            "elementProp": "styleAttributes",
            "element": "host",
            "params": {
              "indentationType": "PADDING"
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "INDENTATION",
            "elementProp": "styleAttributes",
            "element": "host",
            "params": {
              "indentationType": "MARGIN"
            },
            "displayCondition": (sdk) => sdk.component.type === 'VIEW' ? sdk.layoutType === 'BUILT_IN' : true,
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "SWITCH",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes",
              "overflow"
            ],
            "params": {
              "label": "DOCUMENT_OVERFLOW_TITLE",
              "boldLabel": true,
              "description": "DOCUMENT_OVERFLOW_ENABLED_DESCRIPTION",
              "getValueMapper": {
                'undefined': false,
                '': false,
                'visible': false,
                'hidden': true,
              },
              "setValueMapper": {
                'true': 'hidden',
                'false': 'visible'
              }
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
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
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "SIZE",
            "element": "host",
            "elementProp": "styleAttributes",
            "params": {
              "width": {
                "options": [
                  "fixed",
                  "fill",
                  "hug"
                ]
              },
              "height": {
                "options": [
                  "fixed",
                  "fill",
                  "hug"
                ]
              }
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND",
            "elementProp": "styleAttributes",
            "element": "host",
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER',
            "syncSelectOptions": [
              'SAME_TYPE_CROSS_ENV_WHILE_VALUES_MATCH',
              null,
            ]
          },
          {
            "type": "CONTROL",
            "name": "BACKDROP_FILTER",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "hideSyncSelect": true,
            "displayCondition": (sdk) => sdk.component.type === 'VIEW' ? (sdk.editorConfig.allowBackdropFilterOnView ?? true) : true,
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "BORDERS",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "BOX_SHADOW",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "INDENTATION",
            "elementProp": "styleAttributes",
            "element": "host",
            "params": {
              "indentationType": "PADDING"
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "INDENTATION",
            "elementProp": "styleAttributes",
            "element": "host",
            "params": {
              "indentationType": "MARGIN"
            },
            "displayCondition": (sdk) => sdk.component.type === 'VIEW' ? sdk.layoutType === 'BUILT_IN' : true,
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "SWITCH",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes",
              "overflow"
            ],
            "params": {
              "label": "DOCUMENT_OVERFLOW_TITLE",
              "boldLabel": true,
              "description": "DOCUMENT_OVERFLOW_ENABLED_DESCRIPTION",
              "getValueMapper": {
                undefined: false,
                '': false,
                'visible': false,
                'hidden': true,
              },
              "setValueMapper": {
                'true': 'hidden',
                'false': 'visible'
              }
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
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
        },
        "displayCondition": (sdk) => sdk.widgetType !== 'TEASER'
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
        },
        "displayCondition": (sdk) => sdk.widgetType !== 'TEASER'
      }
    ]
  },
  "i18nPropPaths": [
    "handlers,[id],actions,[id],params,link",
    "handlers,[id],actions,[id],params,customData"
  ],
  "props": {
    "styles": [
      {
        "element": "host",
        "styleAttributes": {
          "overflow": "visible",
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
    "adaptiveStyles": {
      "desktop": [
        {
          "element": "host",
          "styleAttributes": {
            "position": "relative",
            "width": "100%",
            "minWidth": "min-content",
            "height": "auto",
            "minHeight": null,
            "flexDirection": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "gap": "10px",
            "paddingTop": "10px",
            "paddingBottom": "10px",
            "paddingLeft": "10px",
            "paddingRight": "10px",
            "_paddingEnabled": true,
            "marginTop": "0px",
            "marginBottom": "0px",
            "marginLeft": "0px",
            "marginRight": "0px",
            "_marginEnabled": false,
            "background": "rgba(0, 0, 0, 0.06)",
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
            "minWidth": "min-content",
            "height": "auto",
            "minHeight": null,
            "flexDirection": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "gap": "10px",
            "paddingTop": "10px",
            "paddingBottom": "10px",
            "paddingLeft": "10px",
            "paddingRight": "10px",
            "_paddingEnabled": true,
            "marginTop": "0px",
            "marginBottom": "0px",
            "marginLeft": "0px",
            "marginRight": "0px",
            "_marginEnabled": false,
            "background": "rgba(0, 0, 0, 0.06)",
          },
          "classes": ""
        }
      ]
    }
  },
  "metaDescription": {
    "icon": "/SysContainerComponent/assets/img/component-icon.svg",
    "label": {
      "en": "Container",
      "ru": "Контейнер",
      "uk": "Контейнер",
      "es": "Envase",
      "fr": "Récipient",
      "de": "Container",
      "it": "Contenitore",
      "pt": "Embalagem",
      "ro": "Container",
      "bg": "Контейнер",
      "cs": "Kontejner",
      "el": "Περιέκτης",
      "nl": "Container",
      "pl": "Kontener",
      "sv": "Behållare",
      "tr": "Konteyner",
      "ar": "الحاوية",
      "zh": "容器",
      "da": "Beholder",
      "he": "קונטיינר",
      "fi": "Säiliö",
      "hi": "कंटेनर",
      "hr": "Kontejner",
      "hu": "Tárhely",
      "id": "Kontainer",
      "ja": "コンテナ",
      "ko": "컨테이너",
      "no": "Container",
      "sk": "Krabica",
      "sl": "Rezervoar",
      "sr": "Kontejner"
    }
  },
  "waitForResourcesLoad": true,
  "resourcesPropPaths": [
    ["adaptiveStyles", ":ENV", "styleAttributes", "background"],
  ],
  "syncEnabled": true,
  "stylesImitationEnabled": true,
}
