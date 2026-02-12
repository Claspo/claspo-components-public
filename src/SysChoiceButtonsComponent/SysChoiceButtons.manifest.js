import {cloneControlsToAllEnvs} from '@claspo/renderer/sdk/ManifestUtils';

export default {
  "name": "SysChoiceButtonsComponent",
  "componentType": "MULTIPLE_INPUT",
  "version": "1.0.0",
  "mappingTypes": ["CHECKBOX_LIST"],
  "focusableElements": ["label", "button"],
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
              "hug",
              "fill"
            ]
          }
        }
      },
      {
        "type": "CONTROL",
        "name": "TEXT_PARAMS",
        "params": [
          {
            "element": "button"
          },
          {
            "element": "label"
          }
        ]
      },
      {
        "type": "CONTROL",
        "name": "NUMBER_INPUT",
        "element": "buttonsContainer",
        "elementProp": "styleAttributes",
        "elementSubProp": "gap",
        params: {
          label: 'DOCUMENT_FLEX_GAP',
          "validators": {
            "min": 0,
          },
        },
        valueTransformers: [{name: 'px'}],
      },
      {
        "type": "CONTROL",
        "name": "BACKGROUND",
        "propPath": [
          "styles",
          "[element=button]",
          "styleAttributes"
        ],
        "params": {
          "onlyColorSelection": true
        }
      },
      {
        "type": "CONTROL",
        "name": "BORDERS",
        "propPath": [
          "styles",
          "[element=button]",
          "styleAttributes"
        ],
        "params": {
          "minValue": 1,
          "maxValue": 5,
          "hideAdditionalParams": true
        }
      },
      {
        "type": "CONTROL",
        "name": "BOX_SHADOW",
        "propPath": [
          "styles",
          "[element=button]",
          "styleAttributes"
        ],
      },
      {
        "type": "CONTROL",
        "name": "BORDER_RADIUS",
        "propPath": [
          "styles",
          "[element=button]",
          "styleAttributes"
        ],
      },
      {
        "type": "CONTROL",
        "name": "INDENTATION",
        "elementProp": "styleAttributes",
        "element": "button",
        "params": {
          "indentationType": "PADDING"
        }
      },
      {
        "type": "CONTROL",
        "name": "HOVER_ANIMATION",
        "propPath": [
          "styles",
          "[element=button]",
          "hoverStyleAttributes"
        ],
      },
      {
        "type": "CONTROL",
        "name": "BACKGROUND",
        "propPath": [
          "styles",
          "[element=button]",
          "selectedStyleAttributes"
        ],
        "params": {
          "onlyColorSelection": true,
          "label": "i18n_DOCUMENT_SELECTED_BUTTON_BACKGROUND"
        }
      },
      {
        "type": "CONTROL",
        "name": "BORDERS",
        "propPath": [
          "styles",
          "[element=button]",
          "selectedStyleAttributes"
        ],
        "params": {
          "minValue": 1,
          "maxValue": 5,
          "hideAdditionalParams": true,
          "label": "i18n_DOCUMENT_SELECTED_BUTTON_BORDERS"
        }
      },
      {
        "type": "CONTROL",
        "name": "BOX_SHADOW",
        "propPath": [
          "styles",
          "[element=button]",
          "selectedStyleAttributes"
        ],
        "params": {
          "label": "i18n_DOCUMENT_SELECTED_BUTTON_SHADOW"
        }
      },
      {
        "type": "CONTROL",
        "name": "SWITCH",
        "propPath": [
          "content",
          "labelEnabled",
        ],
        params: {
          label: 'DOCUMENT_SHOW_INPUT_LABELS',
          boldLabel: true,
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
      /*{
        "type": "CONTROL",
        "name": "SWITCH",
        "propPath": [
          "control",
          "multipleChoice",
        ],
        params: {
          label: 'i18n_DOCUMENT_MULTIPLE_CHOICE'
        }
      },*/
      {
        "type": "CONTROL",
        "name": "ACTIONS",
        "propPath": [
          "handlers"
        ],
        "params": {
          "origin": true,
        },
      },
      {
        "type": "CONTROL",
        "name": "INTEGRATION_FIELD_MAPPING",
        "params": {
          "integrationNamePropPath": ["control", "integrationName"],
          "groupNamePropPath": ["control", "groupName"],
          "fieldNamePropPath": ["control", "fieldName"],
          "fieldTypePropPath": ["control", "fieldType"],
          "validationPropPath": ["control", "validation"],
          "placeholderPropPath": ["content", "placeholder"],
          "labelPropPath": ["content", "label"],
          "optionsPropPath": ["control", "options"],
          "optionsAlphabeticSortPropPath": ["control", "optionsAlphabeticSort"]
        }
      },
      {
        "type": "CONTROL",
        "name": "COMPONENT_OPTIONS",
        "params": {
          "label": "DOCUMENT_EXPORT_ID",
          "header": "DOCUMENT_OPTIONS_HEADER",
          "tooltip": "DOCUMENT_OPTIONS_TOOLTIP_PART1,DOCUMENT_OPTIONS_TOOLTIP_PART2",
          "origin": true,
          "optionsPropPath": ["control", "options"],
          "optionsAlphabeticSortPropPath": ["control", "optionsAlphabeticSort"],
          "integrationNamePropPath": ["control", "integrationName"]
        }
      },
      {
        "type": "CONTROL",
        "name": "INPUT_VALIDATION",
        "params": {
          "validationPropPath": ["control", "validation"],
          "fieldTypePropPath": ["control", "fieldType"],
          "required": true
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
          "origin": false,
        },
      },
      {
        "type": "CONTROL",
        "name": "COMPONENT_OPTIONS",
        "params": {
          "label": "DOCUMENT_EXPORT_ID",
          "header": "DOCUMENT_OPTIONS_HEADER",
          "tooltip": "DOCUMENT_OPTIONS_TOOLTIP_PART1,DOCUMENT_OPTIONS_TOOLTIP_PART2",
          "origin": false,
          "optionsPropPath": ["control", "options"],
          "optionsAlphabeticSortPropPath": ["control", "optionsAlphabeticSort"],
          "integrationNamePropPath": ["control", "integrationName"]
        }
      }
    ]
  },
  "i18nPropPaths": [
    "content,label",
    "control,options,[id],label"
  ],
  "i18n": {
    "en": {
      "control,validation,validationErrors,REQUIRED": "Required field",
      "content,label": "Title"
    },
    "ru": {
      "control,validation,validationErrors,REQUIRED": "Обязательное поле",
      "content,label": "Заголовок"
    },
    "uk": {
      "control,validation,validationErrors,REQUIRED": "Обов'язкове поле",
      "content,label": "Заголовок"
    },
    "es": {
      "control,validation,validationErrors,REQUIRED": "Campo obligatorio",
      "content,label": "Título"
    },
    "de": {
      "control,validation,validationErrors,REQUIRED": "Pflichtfeld",
      "content,label": "Titel"
    },
    "fr": {
      "control,validation,validationErrors,REQUIRED": "Champs requis",
      "content,label": "Titre"
    },
    "it": {
      "control,validation,validationErrors,REQUIRED": "Campo obbligatorio",
      "content,label": "Titolo"
    },
    "pt": {
      "control,validation,validationErrors,REQUIRED": "Campo obrigatório",
      "content,label": "Título"
    },
    "ro": {
      "control,validation,validationErrors,REQUIRED": "Câmp obligatoriu",
      "content,label": "Titlu"
    },
    "bg": {
      "control,validation,validationErrors,REQUIRED": "Изисквано поле",
      "content,label": "Заглавие"
    },
    "cs": {
      "control,validation,validationErrors,REQUIRED": "Vyžadované pole",
      "content,label": "Titul"
    },
    "el": {
      "control,validation,validationErrors,REQUIRED": "Απαιτητό πεδίο",
      "content,label": "Τίτλος"
    },
    "nl": {
      "control,validation,validationErrors,REQUIRED": "Verplicht veld",
      "content,label": "Titel"
    },
    "pl": {
      "control,validation,validationErrors,REQUIRED": "Wymagane pole",
      "content,label": "Tytuł"
    },
    "sv": {
      "control,validation,validationErrors,REQUIRED": "Obligatoriskt fält",
      "content,label": "Tytuł"
    },
    "tr": {
      "control,validation,validationErrors,REQUIRED": "Gerekli alan",
      "content,label": "Başlık"
    },
    "ar": {
      "control,validation,validationErrors,REQUIRED": "الحقل المطلوب",
      "content,label": "عنوان"
    },
    "zh": {
      "control,validation,validationErrors,REQUIRED": "必填字段",
      "content,label": "Title"
    },
    "da": {
      "control,validation,validationErrors,REQUIRED": "Påkrævet felt",
      "content,label": "Titel"
    },
    "he": {
      "control,validation,validationErrors,REQUIRED": "Required field",
      "content,label": "Title"
    },
    "fi": {
      "control,validation,validationErrors,REQUIRED": "Vaadittu kenttä",
      "content,label": "Title"
    },
    "hi":
      {
        "control,validation,validationErrors,REQUIRED": "आवश्यक फील्ड",
        "content,label": "Title"
      },
    "hr":
      {
        "control,validation,validationErrors,REQUIRED": "Obavezno polje",
        "content,label": "Title"
      },
    "hu":
      {
        "control,validation,validationErrors,REQUIRED": "Kötelező mező",
        "content,label": "Title"
      },
    "id":
      {
        "control,validation,validationErrors,REQUIRED": "Bidang yang wajib diisi",
        "content,label": "Title"
      },
    "ja":
      {
        "control,validation,validationErrors,REQUIRED": "必須フィールド",
        "content,label": "Title"
      },
    "ko":
      {
        "control,validation,validationErrors,REQUIRED": "필수 칸",
        "content,label": "Title"
      },
    "no":
      {
        "control,validation,validationErrors,REQUIRED": "Obligatorisk felt",
        "content,label": "Title"
      },
    "sk":
      {
        "control,validation,validationErrors,REQUIRED": "Povinné pole",
        "content,label": "Title"
      },
    "sl":
      {
        "control,validation,validationErrors,REQUIRED": "Obvezno polje",
        "content,label": "Title"
      },
    "sr":
      {
        "control,validation,validationErrors,REQUIRED": "Obavezno polje",
        "content,label": "Title"
      }
  },
  "props": {
    "content": {
      "label": "Title",
      "labelEnabled": false,
    },
    "control": {
      "name": "choiceButtons",
      "integrationName": "choiceButtons",
      "defaultValue": null,
      "multipleChoice": false,
      "options": {
        "option_1": {
          "exportId": "option_1",
          "label": "Option 1",
          "id": "option_1",
          "sort": 0
        },
        "option_2": {
          "exportId": "option_2",
          "label": "Option 2",
          "id": "option_2",
          "sort": 1
        }
      },
      "optionsAlphabeticSort": {
        "enabled": false,
      },
      "validation": {
        "required": true,
      }
    },
    "styles": [
      {
        "element": "button",
        "styleAttributes": {
          "background": "rgb(0, 0, 0)",
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
          "borderTopLeftRadius": "8px",
          "borderTopRightRadius": "8px",
          "borderBottomLeftRadius": "8px",
          "borderBottomRightRadius": "8px",
          "boxShadow": "none"
        },
        "hoverStyleAttributes": {
          "background": "rgba(35, 35, 35, 1)",
          "externalBackgroundUrlSource": false,
          "borderTopColor": "rgb(0, 0, 0)",
          "borderBottomColor": "rgb(0, 0, 0)",
          "borderLeftColor": "rgb(0, 0, 0)",
          "borderRightColor": "rgb(0, 0, 0)",
          "boxShadow": null
        },
        "selectedStyleAttributes": {
          "background": "rgba(35, 35, 35, 1)",
          "borderTopStyle": "solid",
          "borderRightStyle": "solid",
          "borderBottomStyle": "solid",
          "borderLeftStyle": "solid",
          "borderTopWidth": "2px",
          "borderTopColor": "rgba(108, 108, 108, 1)",
          "borderBottomWidth": "2px",
          "borderBottomColor": "rgba(108, 108, 108, 1)",
          "borderLeftWidth": "2px",
          "borderLeftColor": "rgba(108, 108, 108, 1)",
          "borderRightWidth": "2px",
          "borderRightColor": "rgba(108, 108, 108, 1)",
          "boxShadow": "none",
          "externalBackgroundUrlSource": false
        },
        "hoverAnimationType": null
      }
    ],
    "adaptiveStyles": {
      "desktop": [
        {
          "element": "host",
          "styleAttributes": {
            "width": "230px",
            "minHeight": "35px",
            "marginTop": "0px",
            "marginBottom": "0px",
            "marginLeft": "0px",
            "marginRight": "0px",
            "_marginEnabled": false,
            "zIndex": "0",
            "minWidth": "230px"
          },
          "classes": ""
        },
        {
          "element": "label",
          "styleAttributes": {
            "color": "rgba(68, 68, 68, 1)",
            "textAlign": "start",
            "lineHeight": "120%",
            "fontWeight": "400",
            "fontSize": "14px",
            "textShadow": "none"
          },
          "classes": ""
        },
        {
          "element": "buttonsContainer",
          "styleAttributes": {
            "gap": "10px"
          }
        },
        {
          "element": "button",
          "styleAttributes": {
            "paddingTop": "12px",
            "paddingBottom": "12px",
            "paddingLeft": "20px",
            "paddingRight": "20px",
            "_paddingEnabled": true,
            "color": "rgba(255, 255, 255, 1)",
            "textAlign": "center",
            "lineHeight": "120%",
            "fontWeight": "500",
            "fontSize": "16px",
            "textShadow": "none",
            "--textDisplay": "inline",
            "fontFamily": "Montserrat",
            "letterSpacing": "0px",
            "textTransform": "none"
          },
          "classes": "cl-text-class-button",
        }
      ],
      "mobile": [
        {
          "element": "host",
          "styleAttributes": {
            "width": "auto",
            "minHeight": "35px",
            "marginTop": "0px",
            "marginBottom": "0px",
            "marginLeft": "0px",
            "marginRight": "0px",
            "_marginEnabled": false,
            "zIndex": "0"
          },
          "classes": ""
        },
        {
          "element": "label",
          "styleAttributes": {
            "color": "rgba(68, 68, 68, 1)",
            "textAlign": "start",
            "lineHeight": "120%",
            "fontWeight": "400",
            "fontSize": "14px",
            "textShadow": "none"
          },
          "classes": ""
        },
        {
          "element": "buttonsContainer",
          "styleAttributes": {
            "gap": "10px"
          }
        },
        {
          "element": "button",
          "styleAttributes": {
            "paddingTop": "10px",
            "paddingBottom": "10px",
            "paddingLeft": "20px",
            "paddingRight": "20px",
            "_paddingEnabled": true,
            "color": "rgba(255, 255, 255, 1)",
            "textAlign": "center",
            "lineHeight": "120%",
            "fontWeight": "700",
            "fontSize": "16px",
            "textShadow": "none",
            "--textDisplay": "inline"
          },
          "classes": "cl-text-class-button"
        }
      ]
    }
  },
  "metaDescription": {
    "icon": "/SysChoiceButtonsComponent/assets/img/component-icon.svg",
    "label": {
      "en": "Choice",
      "ru": "Один вариант",
      "uk": "Один варіант",
      "es": "Opción única",
      "fr": "Choix unique",
      "de": "Einzelauswahl",
      "it": "Scelta singola",
      "pt": "Escolha única",
      "ro": "Alegere unică",
      "bg": "Единичен избор",
      "cs": "Jeden výběr",
      "el": "Μία επιλογή",
      "nl": "Enkele keuze",
      "pl": "Pojedynczy wybór",
      "sv": "Enskilt val",
      "tr": "Tek seçim",
      "ar": "اختيار واحد",
      "zh": "单选",
      "da": "Enkelt valg",
      "he": "בחירה יחידה",
      "fi": "Yksittäinen valinta",
      "hi": "एकल विकल्प",
      "hr": "Jedan izbor",
      "hu": "Egyetlen választás",
      "id": "Pilihan tunggal",
      "ja": "単一選択",
      "ko": "단일 선택",
      "no": "Enkelt valg",
      "sk": "Jednoduchá voľba",
      "sl": "Ena izbira",
      "sr": "Један избор",
    }
  },
  "showComponentOptionsPropertyPaneOnInsert": true,
  "showIntegrationFieldMappingPropertyPaneOnInsert": true,
}

