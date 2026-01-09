import SysContainerManifest from '../SysContainerComponent/SysContainer.manifest.js';
import { cloneToAllPlatforms } from '@claspo/renderer/sdk/ModelStyleUtils';

export default {
  ...SysContainerManifest,
  "name": "SysColumnComponent",
  "componentType": "COLUMN",
  "preventDraggable": false,
  "focusParentOnClick": false,
  "recursiveRemove": true,
  "canStack": false,
  "version": "1.0.0",
  "props": {
    ...SysContainerManifest.props,
    "styles": [
      {
        "element": "host",
        "styleAttributes": {
          "position": "relative",
          "width": "auto",
          "minWidth": "min-content",
          "height": "100%",
          "borderStyle": "solid",
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
          "boxShadow": "none",
          "flexBasis": "0"
        },
        "classes": ""
      }
    ],
    "adaptiveStyles": cloneToAllPlatforms([
      {
        "element": "host",
        "styleAttributes": {
          "display": "inline-flex",
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
        },
        "classes": ""
      }
    ]),
    "content": {
      "size": 1
    }
  },
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
            "params": {
              "mode": "horizontal"
            },
            "hideSyncSelect": true
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND",
            "elementProp": "styleAttributes",
            "element": "host",
            "hideSyncSelect": true
          },
          {
            "type": "CONTROL",
            "name": "BACKDROP_FILTER",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "hideSyncSelect": true
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
            "hideSyncSelect": true
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
            "hideSyncSelect": true
          },
          {
            "type": "CONTROL",
            "name": "INDENTATION",
            "elementProp": "styleAttributes",
            "element": "host",
            "params": {
              "indentationType": "PADDING"
            },
            "hideSyncSelect": true
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
            "params": {
              "mode": "horizontal"
            },
            "hideSyncSelect": true
          },
          {
            "type": "CONTROL",
            "name": "DISPLAY",
            "elementProp": "styleAttributes",
            "elementSubProp": "display",
            "element": "host",
            "params": {
              "label": "DOCUMENT_DISPLAY_ON_MOBILE",
              "displayPropertyValue": 'inline-flex'
            },
            "displayCondition": "return (sdk.appConfig.columnsOptions?.allowHideColumnOnMobile ?? true) === true",
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND",
            "elementProp": "styleAttributes",
            "element": "host",
            "hideSyncSelect": true
          },
          {
            "type": "CONTROL",
            "name": "BACKDROP_FILTER",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
            "hideSyncSelect": true
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
            "hideSyncSelect": true
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
            "hideSyncSelect": true
          },
          {
            "type": "CONTROL",
            "name": "INDENTATION",
            "elementProp": "styleAttributes",
            "element": "host",
            "params": {
              "indentationType": "PADDING"
            },
            "hideSyncSelect": true
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
          "name": "COLUMNS_PROPORTIONS",
          "propPath": [
            "content",
            "size"
          ],
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
          "name": "CONTAINER_PADDING",
          "elementProp": "styleAttributes",
          "element": "host"
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
          "name": "COLUMNS_PROPORTIONS",
          "propPath": [
            "content",
            "size"
          ],
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
          "name": "CONTAINER_PADDING",
          "elementProp": "styleAttributes",
          "element": "host"
        },
      ]
    }
  ],
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
  "metaDescription": {
    "label": {
      "en": "Column",
      "ru": "Колонка",
      "uk": "Колонка",
      "es": "Columna",
      "fr": "Colonne",
      "de": "Spalte",
      "it": "Colonna",
      "pt": "Coluna",
      "ro": "Coloană",
      "bg": "Колона",
      "cs": "Column",
      "el": "Column",
      "nl": "Column",
      "pl": "Column",
      "sv": "Column",
      "tr": "Column",
      "ar": "Column",
      "zh": "Column",
      "da": "Column",
      "he": "Column",
      "fi": "Column",
      "hi": "Column",
      "hr": "Column",
      "hu": "Column",
      "id": "Column",
      "ja": "Column",
      "ko": "Column",
      "no": "Column",
      "sk": "Column",
      "sl": "Column",
      "sr": "Column",
    },
  },
}
