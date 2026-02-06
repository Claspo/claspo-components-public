import {cloneControlsToAllEnvs} from '@claspo/renderer/sdk/ManifestUtils';

export default {
  "name": "SysCalendarComponent",
  "componentType": "INPUT",
  "version": "1.0.0",
  "mappingTypes": ["DATE"],
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
      "element": "input"
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
        "element": "input",
        "elementProp": "styleAttributes",
        "params": {
          "width": {
            "options": [
              "fixed",
              "fill"
            ]
          },
          "height": {
            "options": [
              "fixed",
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
            "showPlaceholderControl": true,
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
        "name": "BACKGROUND",
        "propPath": [
          "styles",
          "[element=input]",
          "styleAttributes"
        ],
      },
      {
        "type": "CONTROL",
        "name": "BORDER_RADIUS",
        "propPath": [
          "styles",
          "[element=input]",
          "styleAttributes"
        ],
      },
      {
        "type": "CONTROL",
        "name": "BORDERS",
        "propPath": [
          "styles",
          "[element=input]",
          "styleAttributes"
        ],
      },
      {
        "type": "CONTROL",
        "name": "BOX_SHADOW",
        "propPath": [
          "styles",
          "[element=input]",
          "styleAttributes"
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
        "element": "input",
        "params": {
          "indentationType": "PADDING",
          "horizontalOnly": true
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
          "optionsPropPath": ["control", "options"]
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
      },
      {
        "type": "CONTROL",
        "name": "SWITCH",
        "propPath": [
          "content",
          "onlyInFuture"
        ],
        "params": {
          "label": "DOCUMENT_ONLY_IN_FUTURE"
        }
      }
    ]
  },
  "autoContrast": [
    {
      "slave": {
        "element": "input",
        "elementProp": "styleAttributes",
        "elementSubProp": "color",
      },
      "master": {
        "element": "input",
        "propPath": [
          "styles",
          "[element=input]",
          "styleAttributes",
          "background",
        ],
      },
      "enabledPropPath": [
        "content",
        "textContrastEnabled"
      ],
    },
    {
      "slave": {
        "element": "input",
        "elementProp": "placeholderStyleAttributes",
        "elementSubProp": "color",
        "dimmed": true
      },
      "master": {
        "element": "input",
        "propPath": [
          "styles",
          "[element=input]",
          "styleAttributes",
          "background",
        ],
      },
      "enabledPropPath": [
        "content",
        "placeholderTextContrastEnabled"
      ],
    }
  ],
  "focusableElements": ["input", "label"],
  "events": {
    "dispatch": [],
    "listen": []
  },
  "i18nPropPaths": [
    "content,label"
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
      "control,validation,validationErrors,REQUIRED": "שדה נדרש",
      "content,label": "Title"
    },
    "fi": {
      "control,validation,validationErrors,REQUIRED": "Vaadittu kenttä",
      "content,label": "Title"
    } ,
    "hi": {
      "control,validation,validationErrors,REQUIRED": "आवश्यक फील्ड",
      "content,label": "Title"
    },
    "hr": {
      "control,validation,validationErrors,REQUIRED": "Obavezno polje",
      "content,label": "Title"
    },
    "hu": {
      "control,validation,validationErrors,REQUIRED": "Kötelező mező",
      "content,label": "Title"
    },
    "id": {
      "control,validation,validationErrors,REQUIRED": "Bidang yang wajib diisi",
      "content,label": "Title"
    },
    "ja": {
      "control,validation,validationErrors,REQUIRED": "必須フィールド",
      "content,label": "Title"
    },
    "ko": {
      "control,validation,validationErrors,REQUIRED": "필수 칸",
      "content,label": "Title"
    },
    "no": {
      "control,validation,validationErrors,REQUIRED": "Obligatorisk felt",
      "content,label": "Title"
    },
    "sk": {
      "control,validation,validationErrors,REQUIRED": "Povinné pole",
      "content,label": "Title"
    },
    "sl": {
      "control,validation,validationErrors,REQUIRED": "Obvezno polje",
      "content,label": "Title"
    },
    "sr": {
      "control,validation,validationErrors,REQUIRED": "Obavezno polje",
      "content,label": "Title"
    }
  },
  "props": {
    "content": {
      "label": "Title",
      "onlyInFuture": true,
      "textContrastEnabled": true,
      "placeholderTextContrastEnabled": true
    },
    "control": {
      "name": "calendar",
      "integrationName": "calendar",
      "defaultValue": null,
      "validation": {
        "required": true,
        "validator": "SYS_CALENDAR"
      }
    },
    "styles": [
      {
        "element": "input",
        "styleAttributes": {
          "background": "rgb(255, 255, 255)",
          "borderTopStyle": "solid",
          "borderRightStyle": "solid",
          "borderBottomStyle": "solid",
          "borderLeftStyle": "solid",
          "borderTopWidth": "1px",
          "borderTopColor": "rgba(0, 0, 0, 0.1)",
          "borderBottomWidth": "1px",
          "borderBottomColor": "rgba(0, 0, 0, 0.1)",
          "borderLeftWidth": "1px",
          "borderLeftColor": "rgba(0, 0, 0, 0.1)",
          "borderRightWidth": "1px",
          "borderRightColor": "rgba(0, 0, 0, 0.1)",
          "borderTopLeftRadius": "0px",
          "borderTopRightRadius": "0px",
          "borderBottomLeftRadius": "0px",
          "borderBottomRightRadius": "0px",
          "boxShadow": "none",
        },
      },
      {
        "element": "label",
        "params": {
          "enabled": false,
          "position": "TOP",
          "margin": 5
        },
      }
    ],
    "adaptiveStyles": {
      "desktop": [
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
          "element": "input",
          "styleAttributes": {
            "width": "100%",
            "minWidth": null,
            "height": "35px",
            "minHeight": "35px",
            "color": "rgb(0, 0, 0)",
            "textAlign": "start",
            "lineHeight": "120%",
            "fontWeight": "400",
            "fontSize": "16px",
            "textShadow": "none"
          },
          "placeholderStyleAttributes": {
            "color": "rgb(81, 81, 81)"
          },
          "classes": ""
        },
        {
          "element": "label",
          "styleAttributes": {
            "color": "rgb(0, 0, 0)",
            "textAlign": "start",
            "lineHeight": "120%",
            "fontWeight": "400",
            "fontSize": "16px",
            "textShadow": "none"
          },
          "classes": ""
        }
      ],
      "mobile": [
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
          "element": "input",
          "styleAttributes": {
            "width": "100%",
            "minWidth": null,
            "height": "35px",
            "minHeight": "35px",
            "color": "rgb(0, 0, 0)",
            "textAlign": "start",
            "lineHeight": "120%",
            "fontWeight": "400",
            "fontSize": "16px",
            "textShadow": "none"
          },
          "placeholderStyleAttributes": {
            "color": "rgb(81, 81, 81)"
          },
          "classes": ""
        },
        {
          "element": "label",
          "styleAttributes": {
            "color": "rgb(0, 0, 0)",
            "textAlign": "start",
            "lineHeight": "120%",
            "fontWeight": "400",
            "fontSize": "16px",
            "textShadow": "none"
          },
          "classes": ""
        }
      ]
    }
  },
  "metaDescription": {
    "icon": "/SysCalendarComponent/assets/img/component-icon.svg",
    "label": {
      "en": "Calendar",
      "ru": "Календарь",
      "uk": "Календар",
      "es": "Calendario",
      "de": "Kalender",
      "fr": "Calendrier",
      "it": "Calendario",
      "pt": "Calendário",
      "ro": "Calendar",
      "bg": "Календар",
      "cs": "Kalendář",
      "el": "Ημερολόγιο",
      "nl": "Kalender",
      "pl": "Kalendarz",
      "sv": "Kalender",
      "tr": "Takvim",
      "ar": "التقويم",
      "zh": "日历",
      "da": "Kalender",
      "he": "לוח שנה",
      "fi": "Kalenteri",
      "hi": "कैलेंडर",
      "hr": "Kalendar",
      "hu": "Naptár",
      "id": "Kalender",
      "ja": "カレンダー",
      "ko": "달력",
      "no": "Kalender",
      "sk": "Kalendár",
      "sl": "Koledar",
      "sr": "Kalendar",
    }
  },
  "syncEnabled": true,
  "stylesImitationEnabled": true,
  "showIntegrationFieldMappingPropertyPaneOnInsert": true,
}
