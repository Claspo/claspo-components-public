import { cloneStylesToAllEnvs } from '@claspo/renderer/sdk/ModelStyleUtils';
import {cloneControlsToAllEnvs} from '@claspo/renderer/sdk/ManifestUtils';

export default {
  "name": "SysCheckboxListComponent",
  "componentType": "MULTIPLE_INPUT",
  "version": "1.0.0",
  "mappingTypes": ["CHECKBOX_LIST"],
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
      "element": "input",
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
            "element": "input",
            "elementProp": "styleAttributes",
            "params": {
              "width": {
                "options": [
                  "fixed",
                  "hug",
                  "fill"
                ]
              },
              "height": {
                "options": [
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
                "element": "input",
                "showPlaceholderControl": false,
                "isLineSpaceAvailable": true,
                "isTextTransformAvailable": true
              },
              {
                "element": "label",
                "displayCondition": "return !!sdk.component.getProps().styles.find(element => element.element === 'label').params.enabled",
                "isLineSpaceAvailable": true,
                "isTextTransformAvailable": true
              }
            ]
          },
          {
            "type": "CONTROL",
            "name": "LIST_POSITION",
            "elementProp": "styleAttributes",
            "element": "listContainer"
          },
          {
            "type": "CONTROL",
            "name": "MULTIPLE_INPUT_SIZE",
            "element": "input",
            "params": {
              "inputType": "CHECKBOX"
            }
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND_MARKER_SELECTED",
            "propPath": [
              "styles",
              "[element=input]",
              "markerStyleAttributes"
            ],
            "params": {
              "label": "DOCUMENT_CHOSEN_ITEM_COLOR_TITLE",
              "property": "selectedColor",
              "onlyColorSelection": true,
              "disableGradientSelection": true,
              "hideSwitch": true
            }
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND",
            "propPath": [
              "styles",
              "[element=input]",
              "markerStyleAttributes"
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
              "[element=input]",
              "markerStyleAttributes"
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
              "[element=input]",
              "markerStyleAttributes"
            ],
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "propPath": [
              "styles",
              "[element=input]",
              "markerStyleAttributes"
            ],
          },
          {
            "type": "CONTROL",
            "name": "INPUT_LABEL",
            "propPath": [
              "styles",
              "[element=label]",
              "params"
            ],
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
            "element": "input",
            "elementProp": "styleAttributes",
            "params": {
              "width": {
                "options": [
                  "fixed",
                  "hug",
                  "fill"
                ]
              },
              "height": {
                "options": [
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
                "element": "input",
                "showPlaceholderControl": false,
                "isLineSpaceAvailable": true,
                "isTextTransformAvailable": true
              },
              {
                "element": "label",
                "displayCondition": "return !!sdk.component.getProps().styles.find(element => element.element === 'label').params.enabled",
                "isLineSpaceAvailable": true,
                "isTextTransformAvailable": true
              }
            ]
          },
          {
            "type": "CONTROL",
            "name": "LIST_POSITION",
            "elementProp": "styleAttributes",
            "element": "listContainer"
          },
          {
            "type": "CONTROL",
            "name": "MULTIPLE_INPUT_SIZE",
            "element": "input",
            "params": {
              "inputType": "CHECKBOX"
            }
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND_MARKER_SELECTED",
            "propPath": [
              "styles",
              "[element=input]",
              "markerStyleAttributes"
            ],
            "params": {
              "label": "DOCUMENT_CHOSEN_ITEM_COLOR_TITLE",
              "property": "selectedColor",
              "onlyColorSelection": true,
              "disableGradientSelection": true,
              "hideSwitch": true
            }
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND",
            "propPath": [
              "styles",
              "[element=input]",
              "markerStyleAttributes"
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
              "[element=input]",
              "markerStyleAttributes"
            ],
            "params": {
              "minValue": 1,
              "maxValue": 4,
              "hideAdditionalParams": true
            }
          },
          {
            "type": "CONTROL",
            "name": "BOX_SHADOW",
            "propPath": [
              "styles",
              "[element=input]",
              "markerStyleAttributes"
            ],
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "propPath": [
              "styles",
              "[element=input]",
              "markerStyleAttributes"
            ],
          },
          {
            "type": "CONTROL",
            "name": "INPUT_LABEL",
            "propPath": [
              "styles",
              "[element=label]",
              "params"
            ],
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
        ]
      }
    ],
    "general": [
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
  "autoContrast": [
    {
      "slave": {
        "element": "input",
        "propPath": [
          "styles",
          "[element=input]",
          "markerStyleAttributes",
          "selectedColor",
        ],
      },
      "master": {
        "element": "input",
        "propPath": [
          "styles",
          "[element=input]",
          "markerStyleAttributes",
          "background",
        ],
      },
      "enabledPropPath": [
        "content",
        "selectedColorContrastEnabled"
      ],
    }
  ],
  "focusableElements": ["input", "label"],
  "events": {
    "dispatch": [],
    "listen": []
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
      "selectedColorContrastEnabled": true
    },
    "control": {
      "name": "checkboxList",
      "integrationName": "checkboxList",
      "defaultValue": null,
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
        },
        "option_3": {
          "exportId": "other",
          "label": "Other",
          "id": "option_3",
          "sort": 2
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
        "element": "input",
        "markerStyleAttributes": {
          "selectedColor": "rgba(0, 0, 0, 1)",
          "background": "rgba(255, 255, 255, 1)",
          "borderTopStyle": "solid",
          "borderRightStyle": "solid",
          "borderBottomStyle": "solid",
          "borderLeftStyle": "solid",
          "borderTopWidth": "1px",
          "borderTopColor": "rgba(68, 68, 68, 1)",
          "borderBottomWidth": "1px",
          "borderBottomColor": "rgba(68, 68, 68, 1)",
          "borderLeftWidth": "1px",
          "borderLeftColor": "rgba(68, 68, 68, 1)",
          "borderRightWidth": "1px",
          "borderRightColor": "rgba(68, 68, 68, 1)",
          "borderTopLeftRadius": "0px",
          "borderTopRightRadius": "0px",
          "borderBottomLeftRadius": "0px",
          "borderBottomRightRadius": "0px",
          "boxShadow": "none",
        }
      },
      {
        "element": "label",
        "params": {
          "enabled": true,
          "position": "TOP",
          "margin": 5
        },
      },
    ],
    "adaptiveStyles": cloneStylesToAllEnvs([
      {
        "element": "host",
        "styleAttributes": {
          "marginTop": "0px",
          "marginBottom": "0px",
          "marginLeft": "0px",
          "marginRight": "0px",
          "_marginEnabled": false,
        },
        "classes": ""
      },
      {
        "element": "listContainer",
        "styleAttributes": {
          "display": "flex",
          "flexDirection": "column",
          "alignItems": "start",
          "justifyContent": "start",
          "gap": "20px"
        },
        "classes": ""
      },
      {
        "element": "input",
        "styleAttributes": {
          "width": "100%",
          "minWidth": null,
          "height": "auto",
          "minHeight": null,
          "background": "rgba(0, 0, 0, 0)",
          "color": "rgba(68, 68, 68, 1)",
          "paddingBottom": "0",
          "paddingLeft": "0",
          "paddingRight": "0",
          "paddingTop": "0",
          "_paddingEnabled": false,
          "textAlign": "start",
          "lineHeight": "120%",
          "fontWeight": "400",
          "fontSize": "14px",
          "textShadow": "none"
        },
        "markerStyleAttributes": {
          "inputSize": "22px",
          "inputToTextGapSize": "13px",
          "textShadow": "none",
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
        "element": "optionWrapper",
        "styleAttributes": {
          "margin": "0 3px",
        },
      }
    ]),
  },
  "metaDescription": {
    "icon": "/SysCheckboxListComponent/assets/img/component-icon.svg",
    "label": {
      "en": "Checkbox",
      "ru": "Чекбокс",
      "uk": "Чекбокс",
      "es": "Casilla de verificación",
      "fr": "Case à cocher",
      "de": "Kontrollkästchen",
      "it": "Checkbox",
      "pt": "Caixa de seleção",
      "ro": "Casetă de control",
      "bg": "Поле за маркиране",
      "cs": "Zaškrtávací pole",
      "el": "Πλαίσιο ελέγχου",
      "nl": "Selectievakje",
      "pl": "Pole wyboru",
      "sv": "Kryssruta",
      "tr": "Onay kutusu",
      "ar": "خانة اختيار",
      "zh": "复选框",
      "da": "Afkrydsningsfelt",
      "he": "תיבת סימון",
      "fi": "Valintaruutu",
      "hi": "चेकबॉक्स",
      "hr": "Potvrdni okvir",
      "hu": "Jelölőnégyzet",
      "id": "Kotak Centang",
      "ja": "チェックボックス",
      "ko": "체크 박스",
      "no": "Avmerkingsboks",
      "sk": "Začiarkavacie políčko",
      "sl": "Potrditveno polje",
      "sr": "Polje za potvrdu"
    }
  },
  "syncEnabled": true,
  "stylesImitationEnabled": true,
  "openComponentOptionsPropertyPaneOnInsert": true,
  "showIntegrationFieldMappingPropertyPaneOnInsert": true,
}

