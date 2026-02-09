import {cloneControlsToAllEnvs} from '@claspo/renderer/sdk/ManifestUtils';

export default {
  "name": "SysPromoCodeComponent",
  "componentType": "PROMO_CODE",
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
              "fixed",
              "fill",
              "hug"
            ]
          }
        }
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
        "name": "BACKGROUND",
        "propPath": [
          "styles",
          "[element=text]",
          "styleAttributes"
        ],
      },
      {
        "type": "CONTROL",
        "name": "PROMOCODE_ICON",
        "propPath": [
          "styles",
          "[element=icon]",
          "styleAttributes"
        ],
        "params": {
          "visibleDisplayValue": "flex"
        }
      },
      {
        "type": "CONTROL",
        "name": "BORDERS",
        "propPath": [
          "styles",
          "[element=text]",
          "styleAttributes"
        ],
      },
      {
        "type": "CONTROL",
        "name": "BOX_SHADOW",
        "propPath": [
          "styles",
          "[element=text]",
          "styleAttributes"
        ],
      },
      {
        "type": "CONTROL",
        "name": "BORDER_RADIUS",
        "propPath": [
          "styles",
          "[element=text]",
          "styleAttributes"
        ],
      },
      {
        "type": "CONTROL",
        "name": "HOVER_ANIMATION",
        "propPath": [
          "styles",
          "[element=text]",
          "hoverStyleAttributes"
        ],
        "params": {
          "animationTypeProp": {
            "propPath": [
              "styles",
              "[element=text]",
              "hoverAnimationType"
            ]
          }
        }
      },
      {
        "type": "CONTROL",
        "name": "INDENTATION",
        "elementProp": "styleAttributes",
        "element": "text",
        "params": {
          "indentationType": "PADDING"
        }
      },
      {
        "type": "CONTROL",
        "name": "INDENTATION",
        "elementProp": "styleAttributes",
        "element": "host",
        "params": {
          "indentationType": "MARGIN"
        }
      }
    ]),
    "general": [
      {
        "type": "TEXT",
        "params": {
          "text": "DOCUMENT_CLICK_COMPONENT_TO_COPY_TO_CLIPBOARD",
          "type": "SECONDARY"
        },
        "displayCondition": "return !sdk.documentUtils.findComponentsByTypes(sdk.views ,['PRIZE_BASED_GAMING']).some(c => c.path[0] < sdk.component.path[0])"
      },
      {
        "type": "CONTROL",
        "name": "PRIZE_SETTINGS",
        "propPath": [
          "content",
          "prize"
        ],
        "params": {
          "linkedGamifiedComponentType": "PRIZE_BASED_GAMING",
        },
        "displayCondition": "return sdk.documentUtils.findComponentsByTypes(sdk.views ,['PRIZE_BASED_GAMING']).some(c => c.path[0] < sdk.component.path[0])"
      },
      {
        "type": "CONTROL",
        "name": "SWITCH",
        "propPath": [
          "content",
          "countAsTargetAction"
        ],
        "params": {
          "label": "i18n_DOCUMENT_COUNT_AS_TARGET_ACTION_LABEL",
          "boldLabel": true,
          "tooltip": "i18n_DOCUMENT_COUNT_AS_TARGET_ACTION_TOOLTIP",
        },
        "displayCondition": "return sdk.widgetType === 'INFORMER'"
      },
    ]
  },
  "autoContrast": [
    {
      "slave": {
        "element": "text",
        "elementProp": "styleAttributes",
        "elementSubProp": "color",
      },
      "master": {
        "element": "text",
        "elementProp": "styleAttributes",
        "elementSubProp": "background",
      },
      "enabledPropPath": [
        "content",
        "textContrastEnabled"
      ],
    },
    {
      "slave": {
        "element": "icon",
        "elementProp": "styleAttributes",
        "elementSubProp": "color",
      },
      "master": {
        "element": "text",
        "elementProp": "styleAttributes",
        "elementSubProp": "background",
      },
      "enabledPropPath": [
        "content",
        "iconContrastEnabled"
      ],
    }
  ],
  "i18nPropPaths": [
    "content,text"
  ],
  "props": {
    "styles": [
      {
        "element": "text",
        "styleAttributes": {
          "borderTopStyle": "dashed",
          "borderRightStyle": "dashed",
          "borderBottomStyle": "dashed",
          "borderLeftStyle": "dashed",
          "borderTopWidth": "2px",
          "borderTopColor": "rgba(68, 68, 68, 1)",
          "borderBottomWidth": "2px",
          "borderBottomColor": "rgba(68, 68, 68, 1)",
          "borderLeftWidth": "2px",
          "borderLeftColor": "rgba(68, 68, 68, 1)",
          "borderRightWidth": "2px",
          "borderRightColor": "rgba(68, 68, 68, 1)",
          "borderTopLeftRadius": "0px",
          "borderTopRightRadius": "0px",
          "borderBottomLeftRadius": "0px",
          "borderBottomRightRadius": "0px",
          "boxShadow": "none",
          "background": "transparent",
        },
        "hoverStyleAttributes": {},
      },
      {
        "element": "icon",
        "styleAttributes": {
          "display": "flex",
          "position": "static",
          "marginLeft": "10px",
          "right": "5px",
          "color": "rgba(68, 68, 68, 1)",
          "--clPromocodeIconWidth": "18px",
          "--clPromocodeIconHeight": "18px"
        }
      }
    ],
    "adaptiveStyles": {
      "desktop": [
        {
          "element": "host",
          "styleAttributes": {
            "width": "auto",
            "minWidth": null,
            "height": "auto",
            "minHeight": null,
            "marginTop": "0px",
            "marginBottom": "0px",
            "marginLeft": "0px",
            "marginRight": "0px",
            "_marginEnabled": false,
          }
        },
        {
          "element": "text",
          "styleAttributes": {
            "paddingTop": "10px",
            "paddingBottom": "10px",
            "paddingLeft": "20px",
            "paddingRight": "20px",
            "_paddingEnabled": true,
            "color": "rgba(68, 68, 68, 1)",
            "textAlign": "center",
            "lineHeight": "120%",
            "fontWeight": "500",
            "fontSize": "18px",
            "textShadow": "none"
          },
          "classes": ""
        },
      ],
      "mobile": [
        {
          "element": "host",
          "styleAttributes": {
            "width": "auto",
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
            "paddingTop": "10px",
            "paddingBottom": "10px",
            "paddingLeft": "20px",
            "paddingRight": "20px",
            "_paddingEnabled": true,
            "color": "rgba(68, 68, 68, 1)",
            "textAlign": "center",
            "lineHeight": "120%",
            "fontWeight": "500",
            "fontSize": "18px",
            "textShadow": "none"
          },
          "classes": ""
        },
      ]
    },
    "content": {
      "text": "SALE_15",
      "iconContent": 0,
      "iconContrastEnabled": true,
      "textContrastEnabled": true
    }
  },
  "metaDescription": {
    "icon": "/SysPromoCodeComponent/assets/img/component-icon.svg",
    "label": {
      "en": "Promo code",
      "ru": "Промокод",
      "uk": "Промокод",
      "es": "Código promocional",
      "fr": "Code promo",
      "de": "Gutscheincode",
      "it": "Codice promozionale",
      "pt": "Código promocional",
      "ro": "Cod promoțional",
      "bg": "Промоционален код",
      "cs": "Promo kód",
      "el": "Κωδικός προσφοράς",
      "nl": "Promotiecode",
      "pl": "Kod promocyjny",
      "sv": "Rabattkod",
      "tr": "Promosyon kodu",
      "ar": "الرمز الترويجي",
      "zh": "促销码",
      "da": "Kampagnekode",
      "he": "קוד קידום",
      "fi": "Alennuskoodi",
      "hi": "प्रोमो कोड",
      "hr": "Promotivni kod",
      "hu": "Promo kód",
      "id": "Kode promo",
      "ja": "プロモコード",
      "ko": "프로모션 코드",
      "no": "Kampanjekode",
      "sk": "Propagačný kód",
      "sl": "Promocijska koda",
      "sr": "Promo kod"
    }
  },
  "syncEnabled": true,
  "stylesImitationEnabled": true,
}
