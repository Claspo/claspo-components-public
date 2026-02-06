import { cloneStylesToAllEnvs } from '@claspo/renderer/sdk/ModelStyleUtils';

export default {
  "name": "SysColumnsComponent",
  "componentType": "COLUMNS",
  "version": "1.0.0",
  "contextMenuModel": [],
  "floatingControlsModel": [
    {
      "type": "GROUP",
      "propPath": [
        "adaptiveStyles",
        "desktop"
      ],
      "children": [
        {
          "type": "CONTROL",
          "name": "SIZE",
          "elementProp": "styleAttributes",
          "element": "host",
          "params": {
            "width": {
              "minValue": 50,
            },
            "height": {
              "minValue": 50,
            }
          }
        },
        {
          "type": "CONTROL",
          "name": "CONTAINER_PADDING",
          "propPathCondition": "return sdk.component.type === 'VIEW' ? {element: 'host', elementProp: 'styleAttributes'} : {propPath: ['styles', '[element=host]', 'styleAttributes']}",
        },
        {
          "type": "CONTROL",
          "name": "PARENT_ALIGNMENT",
          "elementProp": "styleAttributes",
          "element": "host",
          "params": {
            "mode": "horizontal"
          }
        },
        {
          "type": "CONTROL",
          "name": "COLUMNS_PROPORTIONS",
          "propPath": [
            "content",
            "size"
          ],
          "params": {
            "parent": true
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
          "name": "SIZE",
          "elementProp": "styleAttributes",
          "element": "host",
          "params": {
            "width": {
              "minValue": 50,
            },
            "height": {
              "minValue": 50,
            }
          }
        },
        {
          "type": "CONTROL",
          "name": "CONTAINER_PADDING",
          "propPathCondition": "return sdk.component.type === 'VIEW' ? {element: 'host', elementProp: 'styleAttributes'} : {propPath: ['styles', '[element=host]', 'styleAttributes']}",
        },
        {
          "type": "CONTROL",
          "name": "PARENT_ALIGNMENT",
          "elementProp": "styleAttributes",
          "element": "host"
        },
        {
          "type": "CONTROL",
          "name": "COLUMNS_PROPORTIONS",
          "propPath": [
            "content",
            "size"
          ],
          "params": {
            "parent": true
          }
        }
      ]
    }
  ],
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
            "name": "SIZE",
            "element": "host",
            "elementProp": "styleAttributes",
            "params": {
              "width": {
                "options": [
                  "fixed",
                  "fill",
                  "hug"
                ],
                minValue: 50,
              },
              "height": {
                "options": [
                  "fixed",
                  "fill",
                  "hug"
                ],
                minValue: 50,
              }
            },
            "displayCondition": "return sdk.component.type === 'VIEW' ? sdk.layoutType !== 'CONTENT_LOCKER' : true",
            "syncSelectDisplayCondition": "return sdk.component.type === 'VIEW'",
          },
          {
            "type": "CONTROL",
            "name": "COLUMNS",
            "elementProp": "styleAttributes",
            "element": "host"
          },
          {
            "type": "CONTROL",
            "name": "SWITCH",
            "propPath": [
              "isResponsive",
            ],
            "params": {
              "label": "ADAPTIVE_COLUMNS",
              "boldLabel": true,
            }
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND",
            "elementProp": "styleAttributes",
            "element": "host",
            "syncSelectDisplayCondition": "return sdk.component.type === 'VIEW'",
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
            "syncSelectDisplayCondition": "return sdk.component.type === 'VIEW'"
          },
          {
            "type": "CONTROL",
            "name": "BORDERS",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "displayCondition": "return sdk.component.type === 'VIEW' ? sdk.layoutType !== 'CONTENT_LOCKER' : true",
            "syncSelectDisplayCondition": "return sdk.component.type === 'VIEW'",
          },
          {
            "type": "CONTROL",
            "name": "BOX_SHADOW",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "displayCondition": "return sdk.component.type === 'VIEW' ? sdk.layoutType !== 'CONTENT_LOCKER' : true",
            "syncSelectDisplayCondition": "return sdk.component.type === 'VIEW'",
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "displayCondition": "return sdk.component.type === 'VIEW' ? sdk.layoutType !== 'CONTENT_LOCKER' : true",
            "syncSelectDisplayCondition": "return sdk.component.type === 'VIEW'",
          },
          {
            "type": "CONTROL",
            "name": "INDENTATION",
            "propPathCondition": "return sdk.component.type === 'VIEW' ? {element: 'host', elementProp: 'styleAttributes'} : {propPath: ['styles', '[element=host]', 'styleAttributes']}",
            "params": {
              "indentationType": "PADDING"
            },
            "syncSelectDisplayCondition": "return sdk.component.type === 'VIEW'",
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
            "syncSelectDisplayCondition": "return sdk.widgetType !== 'TEASER'"
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
            "displayCondition": "return sdk.component.type === 'VIEW' ? sdk.layoutType !== 'CONTENT_LOCKER' : true",
            "syncSelectDisplayCondition": "return sdk.component.type === 'VIEW'",
          },
          {
            "type": "CONTROL",
            "name": "COLUMNS",
            "elementProp": "styleAttributes",
            "element": "host"
          },
          {
            "type": "CONTROL",
            "name": "SWITCH",
            "propPath": [
              "isResponsive",
            ],
            "params": {
              "label": "ADAPTIVE_COLUMNS",
              "boldLabel": true,
            }
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND",
            "elementProp": "styleAttributes",
            "element": "host",
            "syncSelectDisplayCondition": "return sdk.component.type === 'VIEW'",
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
            "syncSelectDisplayCondition": "return sdk.component.type === 'VIEW'",
          },
          {
            "type": "CONTROL",
            "name": "BORDERS",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "displayCondition": "return sdk.component.type === 'VIEW' ? sdk.layoutType !== 'CONTENT_LOCKER' : true",
            "syncSelectDisplayCondition": "return sdk.component.type === 'VIEW'",
          },
          {
            "type": "CONTROL",
            "name": "BOX_SHADOW",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "displayCondition": "return sdk.component.type === 'VIEW' ? sdk.layoutType !== 'CONTENT_LOCKER' : true",
            "syncSelectDisplayCondition": "return sdk.component.type === 'VIEW'",
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "displayCondition": "return sdk.component.type === 'VIEW' ? sdk.layoutType !== 'CONTENT_LOCKER' : true",
            "syncSelectDisplayCondition": "return sdk.component.type === 'VIEW'",
          },
          {
            "type": "CONTROL",
            "name": "INDENTATION",
            "propPathCondition": "return sdk.component.type === 'VIEW' ? {element: 'host', elementProp: 'styleAttributes'} : {propPath: ['styles', '[element=host]', 'styleAttributes']}",
            "params": {
              "indentationType": "PADDING"
            }
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
            "syncSelectDisplayCondition": "return sdk.widgetType !== 'TEASER'"
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
        }
      }
    ]
  },
  "events": {
    "dispatch": [],
    "listen": []
  },
  "props": {
    "styles": [
      {
        "element": "host",
        "styleAttributes": {}
      }
    ],
    "adaptiveStyles": cloneStylesToAllEnvs([
      {
        "element": "host",
        "styleAttributes": {
          "position": "relative",
          "width": "100%",
          "minWidth": "50px",
          "height": "auto",
          "gap": "10px"
        }
      }
    ]),
    "isResponsive": true
  },
  "metaDescription": {
    "icon": "/SysColumnsComponent/assets/img/columns-component-icon.svg",
    "label": {
      "en": "Columns",
      "ru": "Колонки",
      "uk": "Колонки",
      "es": "Columns",
      "fr": "Columns",
      "de": "Columns",
      "it": "Columns",
      "pt": "Columns",
      "ro": "Columns",
      "bg": "Columns",
      "cs": "Columns",
      "el": "Columns",
      "nl": "Columns",
      "pl": "Columns",
      "sv": "Columns",
      "tr": "Columns",
      "ar": "Columns",
      "zh": "Columns",
      "da": "Columns",
      "he": "Columns",
      "fi": "Columns",
      "hi": "Columns",
      "hr": "Columns",
      "hu": "Columns",
      "id": "Columns",
      "ja": "Columns",
      "ko": "Columns",
      "no": "Columns",
      "sk": "Columns",
      "sl": "Columns",
      "sr": "Columns",
    },
    "defaultPreset": "50%-50%"
  },
  "waitForResourcesLoad": true,
  "resourcesPropPaths": [
    ["adaptiveStyles", ":ENV", "styleAttributes", "background"],
  ],
  "syncEnabled": true,
  "stylesImitationEnabled": true,
}
