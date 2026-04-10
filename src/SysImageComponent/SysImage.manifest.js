import {cloneControlsToAllEnvs} from '@claspo/renderer/sdk/ManifestUtils';

export default {
  "name": "SysImageComponent",
  "componentType": "IMAGE",
  "version": "1.0.0",
  "contextMenuModel": [
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
  ],
  "floatingControlsModel": cloneControlsToAllEnvs([
    {
      "type": "CONTROL",
      "name": "SIZE",
      "elementProp": "styleAttributes",
      "element": "host",
      "params": {
        "rotation": {
          "elementProp": "styleAttributes",
          "element": "host",
        },
      },
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
      "name": "ROTATION",
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
                ]
              }
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "RADIO_BUTTONS",
            "elementProp": "styleAttributes",
            "elementSubProp": "objectFit",
            "element": "image",
            "params": {
              "label": "DOCUMENT_IMAGE",
              "options": [
                {
                  "label": "DOCUMENT_IMAGE_RESIZE_COVER",
                  "value": "cover"
                },
                {
                  "label": "DOCUMENT_IMAGE_RESIZE_CONTAIN",
                  "value": "contain"
                },
                {
                  "label": "DOCUMENT_IMAGE_RESIZE_NONE",
                  "value": "none"
                }
              ]
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "IMAGE_SOURCES",
            "element": "image",
            "propPath": [
              "control",
              "imageSource"
            ]
          },
          {
            "type": "CONTROL",
            "name": "FLOATING_COMPONENT_POSITION",
            "element": "host",
            "elementProp": "styleAttributes",
            "displayCondition": (sdk) => sdk.component.getProps().floating ? !sdk.component.getProps().control.positioning : false,
            "params": {
              "label": "DOCUMENT_POSITION"
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "DISPLAY",
            "elementProp": "styleAttributes",
            "elementSubProp": "display",
            "element": "host",
            "params": {
              "label": "DOCUMENT_DISPLAY_ON_DESKTOP"
            }
          },
          {
            "type": "CONTROL",
            "name": "DISPLAY",
            "propPath": [
              "adaptiveStyles",
              "mobile"
            ],
            "elementProp": "styleAttributes",
            "elementSubProp": "display",
            "element": "host",
            "params": {
              "label": "DOCUMENT_DISPLAY_ON_MOBILE"
            }
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "elementProp": "styleAttributes",
            "element": "image",
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "INDENTATION",
            "elementProp": "styleAttributes",
            "element": "host",
            "displayCondition": (sdk) => !sdk.component.getProps().floating,
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
            "displayCondition": (sdk) => !sdk.component.getProps().floating,
            "params": {
              "indentationType": "MARGIN"
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
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
                ]
              }
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "RADIO_BUTTONS",
            "elementProp": "styleAttributes",
            "elementSubProp": "objectFit",
            "element": "image",
            "params": {
              "label": "DOCUMENT_IMAGE",
              "options": [
                {
                  "label": "DOCUMENT_IMAGE_RESIZE_COVER",
                  "value": "cover"
                },
                {
                  "label": "DOCUMENT_IMAGE_RESIZE_CONTAIN",
                  "value": "contain"
                },
                {
                  "label": "DOCUMENT_IMAGE_RESIZE_NONE",
                  "value": "none"
                }
              ]
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "IMAGE_SOURCES",
            "element": "image",
            "propPath": [
              "control",
              "imageSource"
            ]
          },
          {
            "type": "CONTROL",
            "name": "FLOATING_COMPONENT_POSITION",
            "element": "host",
            "elementProp": "styleAttributes",
            "displayCondition": (sdk) => sdk.component.getProps().floating ? !sdk.component.getProps().control.positioning : false,
            "params": {
              "label": "DOCUMENT_POSITION"
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "DISPLAY",
            "elementProp": "styleAttributes",
            "elementSubProp": "display",
            "element": "host",
            "params": {
              "label": "DOCUMENT_DISPLAY_ON_MOBILE"
            }
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "elementProp": "styleAttributes",
            "element": "image",
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
          },
          {
            "type": "CONTROL",
            "name": "INDENTATION",
            "elementProp": "styleAttributes",
            "element": "host",
            "displayCondition": (sdk) => !sdk.component.getProps().floating,
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
            "displayCondition": (sdk) => !sdk.component.getProps().floating,
            "params": {
              "indentationType": "MARGIN"
            },
            "syncSelectDisplayCondition": (sdk) => sdk.widgetType !== 'TEASER'
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
        },
        "displayCondition": (sdk) => sdk.widgetType !== 'TEASER'
      },
      {
        "type": "CONTROL",
        "name": "TEXT_INPUT",
        "propPath": [
          "control",
          "altText"
        ],
        "params": {
          "label": "DOCUMENT_IMAGE_ALT_TEXT",
          "tooltip": "DOCUMENT_IMAGE_ALT_TEXT_TOOLTIP"
        }
      }
    ]
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
      },
      {
        "type": "CONTROL",
        "name": "TEXT_INPUT",
        "propPath": [
          "control",
          "altText"
        ],
        "params": {
          "label": "DOCUMENT_IMAGE_ALT_TEXT",
          "tooltip": "DOCUMENT_IMAGE_ALT_TEXT_TOOLTIP"
        }
      }
    ]
  },
  "i18nPropPaths": [
    "handlers,[id],actions,[id],params,link",
    "handlers,[id],actions,[id],params,customData",
    "control,altText"
  ],
  "events": {
    "dispatch": [],
    "listen": []
  },
  "props": {
    "control": {
      "imageSource": {
        "url": ""
      },
      "altText": ""
    },
    "adaptiveStyles": {
      "desktop": [
        {
          "element": "host",
          "styleAttributes": {
            "width": "150px",
            "minWidth": "150px",
            "height": "auto",
            "minHeight": null,
            "paddingTop": "0px",
            "paddingBottom": "0px",
            "paddingLeft": "0px",
            "paddingRight": "0px",
            "_paddingEnabled": false,
            "display": "block"
          },
          "classes": ""
        },
        {
          "element": "image",
          "styleAttributes": {
            "background": "transparent",
            "objectFit": "cover",
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
            "borderBottomRightRadius": "0px"
          },
          "classes": ""
        }
      ],
      "mobile": [
        {
          "element": "host",
          "styleAttributes": {
            "width": "150px",
            "minWidth": "150px",
            "height": "auto",
            "minHeight": null,
            "paddingTop": "0px",
            "paddingBottom": "0px",
            "paddingLeft": "0px",
            "paddingRight": "0px",
            "_paddingEnabled": false,
            "display": "block"
          },
          "classes": ""
        },
        {
          "element": "image",
          "styleAttributes": {
            "background": "transparent",
            "objectFit": "cover",
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
            "borderBottomRightRadius": "0px"
          },
          "classes": ""
        }
      ]
    }
  },
  "metaDescription": {
    "icon": "/SysImageComponent/assets/img/image-component-icon.svg",
    "label": {
      "en": "Image",
      "ru": "Изображение",
      "uk": "Зображення",
      "es": "Imagen",
      "fr": "Menu déroulant",
      "de": "Bild",
      "it": "Immagine",
      "pt": "Imagem",
      "ro": "Imagine",
      "bg": "Изображение",
      "cs": "Obrázek",
      "el": "Εικόνα",
      "nl": "Afbeelding",
      "pl": "Obraz",
      "sv": "Bild",
      "tr": "Resim",
      "ar": "الصورة",
      "zh": "图像",
      "da": "Billede",
      "he": "תמונה",
      "fi": "Kuva",
      "hi": "इमेज ",
      "hr": "Slika",
      "hu": "Kép",
      "id": "Gambar",
      "ja": "画像",
      "ko": "이미지",
      "no": "Bilde",
      "sk": "Obrázok",
      "sl": "Slika",
      "sr": "Slika"
    }
  },
  "waitForResourcesLoad": true,
  "resourcesPropPaths": [
    ["control", "imageSource", "url"]
  ],
  "syncEnabled": true,
  "stylesImitationEnabled": true,
}
