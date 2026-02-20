import {cloneControlsToAllEnvs} from '@claspo/renderer/sdk/ManifestUtils';
import {cloneStylesToAllEnvs} from "@claspo/renderer/sdk/ModelStyleUtils";

export default {
  "name": "SysTextComponent",
  "componentType": "TEXT",
  "version": "1.0.0",
  "events": {
    "dispatch": [],
    "listen": []
  },
  "contextMenuModel": cloneControlsToAllEnvs([
    {
      "type": "CONTROL",
      "name": "COMPONENT_OPERATIONS"
    },
    {
      "type": "CONTROL",
      "name": "BRING_BACK_FORWARD",
      "element": "host",
      "elementProp": "styleAttributes",
      "elementSubProp": "zIndex"
    },
    {
      "type": "CONTROL",
      "name": "FOCUS_PARENT_COMPONENT"
    }
  ]),
  "floatingControlsModel": cloneControlsToAllEnvs([
    {
      "type": "CONTROL",
      "name": "SIZE",
      "elementProp": "styleAttributes",
      "element": "host",
      "params": {
        "height": {
          "hide": true
        }
      }
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
    }
  ]),
  "propertyPaneModel": {
    "content": cloneControlsToAllEnvs([
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
              "hug"
            ]
          }
        },
        "syncSelectDisplayCondition": "return sdk.widgetType !== 'TEASER'"
      },
      {
        "type": "CONTROL",
        "name": "TEXT_PARAMS",
        "params": [
          {
            "element": "text"
          }
        ]
      },
      {
        "type": "CONTROL",
        "name": "INSERT_BLOCK",
        "params": [
          {
            "element": "text",
            "label": "DOCUMENT_TEXT",
            "isLinkAvailable": true,
            "origin": true
          }
        ]
      },
      {
        "type": "CONTROL",
        "name": "BACKGROUND",
        "propPath": [
          "styles",
          "[element=host]",
          "styleAttributes"
        ],
        "params": {
          "onlyColorSelection": true
        },
        "syncSelectDisplayCondition": "return sdk.widgetType !== 'TEASER'"
      },
      {
        "type": "CONTROL",
        "name": "INDENTATION",
        "elementProp": "styleAttributes",
        "element": "text",
        "params": {
          "indentationType": "PADDING"
        },
        "syncSelectDisplayCondition": "return sdk.widgetType !== 'TEASER'"
      },
      {
        "type": "CONTROL",
        "name": "INDENTATION",
        "elementProp": "styleAttributes",
        "element": "host",
        "params": {
          "indentationType": "MARGIN"
        },
        "syncSelectDisplayCondition": "return sdk.widgetType !== 'TEASER'"
      }
    ])
  },
  "autoContrast": [
    {
      "slave": {
        "element": "text",
        "elementProp": "styleAttributes",
        "elementSubProp": "color",
      },
      "master": {
        "element": "host",
        "propPath": [
          "styles",
          "[element=host]",
          "styleAttributes",
          "background"
        ],
      },
      "enabledPropPath": [
        "content",
        "textContrastEnabled"
      ],
    }
  ],
  "i18nPropPaths": [
    "content,text",
    "content,textrollers",
    "content,mergeTags"
  ],
  "i18nPropertyPaneModel": {
    "content": [
      {
        "type": "CONTROL",
        "name": "INSERT_BLOCK",
        "params": [
          {
            "element": "text",
            "label": "DOCUMENT_TEXT",
            "isLinkAvailable": true,
            "origin": false
          }
        ]
      }
    ]
  },
  "props": {
    "styles": [
      {
        "element": "host",
        "styleAttributes": {
          "background": "transparent"
        }
      },
    ],
    "adaptiveStyles": cloneStylesToAllEnvs([
      {
        "element": "host",
        "styleAttributes": {
          "width": "100%",
          "minWidth": null,
          "height": "auto",
          "minHeight": null,
          "marginTop": "0px",
          "marginBottom": "0px",
          "marginLeft": "0px",
          "marginRight": "0px",
          "_marginEnabled": false
        }
      },
      {
        "element": "text",
        "styleAttributes": {
          "paddingTop": "0px",
          "paddingBottom": "0px",
          "paddingLeft": "0px",
          "paddingRight": "0px",
          "_paddingEnabled": false,
          "color": "var(--cl-schema-text, rgb(50, 66, 67))",
          "textAlign": "start",
          "lineHeight": "120%",
          "fontWeight": "500",
          "fontSize": "16px",
          "textShadow": "none"
        },
        "classes": ""
      }
    ]),
    "content": {
      "text": "Text",
      "textContrastEnabled": true
    }
  },
  "metaDescription": {
    "icon": "/SysTextComponent/assets/img/component-icon.svg",
    "label": {
      "en": "Text",
      "ru": "Текст",
      "uk": "Текст",
      "es": "Texto",
      "de": "Text",
      "fr": "Texte",
      "it": "Testo",
      "pt": "Texto",
      "ro": "Text",
      "bg": "Текст",
      "cs": "Text",
      "el": "Κείμενο",
      "nl": "Tekst",
      "pl": "Tekst",
      "sv": "Text",
      "tr": "Metin",
      "ar": "النَّص",
      "zh": "文本字段",
      "da": "Tekst",
      "he": "טקסט",
      "fi": "Teksti",
      "hi": "टेक्स्ट",
      "hr": "Tekst",
      "hu": "Szöveg",
      "id": "Teks",
      "ja": "テキスト",
      "ko": "텍스트",
      "no": "Tekst",
      "sk": "Text",
      "sl": "Besedilo",
      "sr": "Tekst"
    }
  },
  "syncEnabled": true,
  "stylesImitationEnabled": true,
}
