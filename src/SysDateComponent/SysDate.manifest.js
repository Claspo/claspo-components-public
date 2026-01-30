export default {
  "name": "SysDateComponent",
  "componentType": "INPUT",
  "version": "1.0.0",
  "mappingTypes": ["DATE"],
  "contextMenuModel": [
    {
      "type": "GROUP",
      "propPath": [
        "adaptiveStyles",
        "desktop"
      ],
      "children": [
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
      ]
    }
  ],
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
          "element": "input",
          "params": {
            "width": {
              "getValueFromElement": "host"
            },
            "height": {
              "getValueFromElement": "host"
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
          "element": "input",
          "params": {
            "width": {
              "getValueFromElement": "host"
            },
            "height": {
              "getValueFromElement": "host"
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
        ]
      }
    ],
    "general": [
      {
        "type": "CONTROL",
        "name": "DATE_FORMAT",
        "propPath": [
          "content",
          "askYear"
        ],
        "displayCondition": "return !sdk.appConfig.useContactFields"
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
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Only integers, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Only integers, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Invalid date",
      "content,label": "Title"
    },
    "ru": {
      "control,validation,validationErrors,REQUIRED": "Обязательное поле",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Только целые числа, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Только целые числа, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Недействительная дата",
      "content,label": "Заголовок"
    },
    "uk": {
      "control,validation,validationErrors,REQUIRED": "Обов'язкове поле",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Тільки цілі числа, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Тільки цілі числа, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Недійсна дата",
      "content,label": "Заголовок"
    },
    "es": {
      "control,validation,validationErrors,REQUIRED": "Campo obligatorio",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Solo enteros, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Solo enteros, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Fecha invalida",
      "content,label": "Título"
    },
    "de": {
      "control,validation,validationErrors,REQUIRED": "Pflichtfeld",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Nur ganze Zahlen, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Nur ganze Zahlen, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Ungültiges Datum",
      "content,label": "Titel"
    },
    "fr": {
      "control,validation,validationErrors,REQUIRED": "Champs requis",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Seuls les entiers, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Seuls les entiers, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Date invalide",
      "content,label": "Titre"
    },
    "it": {
      "control,validation,validationErrors,REQUIRED": "Campo obbligatorio",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Solo numeri interi, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Solo numeri interi, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Data non valida",
      "content,label": "Titolo"
    },
    "pt": {
      "control,validation,validationErrors,REQUIRED": "Campo obrigatório",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Apenas integrais, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Apenas integrais, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Data inválida",
      "content,label": "Título"
    },
    "ro": {
      "control,validation,validationErrors,REQUIRED": "Câmp obligatoriu",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Numai numere întregi, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Numai numere întregi, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Data nevalidă",
      "content,label": "Titlu"
    },
    "bg": {
      "control,validation,validationErrors,REQUIRED": "Изисквано поле",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Само цели числа, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Само цели числа, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Невалидна дата",
      "content,label": "Заглавие"
    },
    "cs": {
      "control,validation,validationErrors,REQUIRED": "Vyžadované pole",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Jen celá čísla, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Jen celá čísla, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Neplatné datum",
      "content,label": "Titul"
    },
    "el": {
      "control,validation,validationErrors,REQUIRED": "Απαιτητό πεδίο",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Μόνο ακέραιοι αριθμοί, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Μόνο ακέραιοι αριθμοί, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Άκυρη ημερομηνία",
      "content,label": "Τίτλος"
    },
    "nl": {
      "control,validation,validationErrors,REQUIRED": "Verplicht veld",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Alleen gehele getallen, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Alleen gehele getallen, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Ongeldige datum",
      "content,label": "Titel"
    },
    "pl": {
      "control,validation,validationErrors,REQUIRED": "Wymagane pole",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Tylko liczby całkowite, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Tylko liczby całkowite, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Nieprawidłowa data",
      "content,label": "Tytuł"
    },
    "sv": {
      "control,validation,validationErrors,REQUIRED": "Obligatoriskt fält",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Endast heltal, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Endast heltal, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Ogiltigt datum",
      "content,label": "Tytuł"
    },
    "tr": {
      "control,validation,validationErrors,REQUIRED": "Gerekli alan",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Yalnızca tam sayılar, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Yalnızca tam sayılar, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Geçersiz tarih",
      "content,label": "Başlık"
    },
    "ar": {
      "control,validation,validationErrors,REQUIRED": "الحقل المطلوب",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "\"الأعداد الصحيحة فقط, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "\"الأعداد الصحيحة فقط, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "تاريخ غير صالح",
      "content,label": "عنوان"
    },
    "zh": {
      "control,validation,validationErrors,REQUIRED": "必填字段",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "仅限整数, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "仅限整数, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "无效日期",
      "content,label": "Title"
    },
    "da": {
      "control,validation,validationErrors,REQUIRED": "Påkrævet felt",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Kun heltal, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Kun heltal, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Ugyldig dato",
      "content,label": "Titel"
    },
    "he": {
      "control,validation,validationErrors,REQUIRED": "שדה נדרש",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "רק מספרים שלמים ,1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "רק מספרים שלמים ,0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "תאריך לא תקין",
      "content,label": "Title"
    },
    "fi": {
      "control,validation,validationErrors,REQUIRED": "Vaadittu kenttä",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Vain kokonaisluvut, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Vain kokonaisluvut, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Virheellinen päivämäärä",
      "content,label": "Title"
    },
    "hi": {
      "control,validation,validationErrors,REQUIRED": "आवश्यक फील्ड",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "केवल पूर्णांक, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "केवल पूर्णांक, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "अमान्य तारीख़",
      "content,label": "Title"
    },
    "hr": {
      "control,validation,validationErrors,REQUIRED": "Obavezno polje",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Samo cijeli brojevi, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Samo cijeli brojevi, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Nevažeći datum",
      "content,label": "Title"
    },
    "hu": {
      "control,validation,validationErrors,REQUIRED": "Kötelező mező",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Csak egész számok, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Csak egész számok, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Érvénytelen dátum",
      "content,label": "Title"
    },
    "id": {
      "control,validation,validationErrors,REQUIRED": "Bidang yang wajib diisi",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Hanya bilangan bulat, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Hanya bilangan bulat, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Tanggal tidak valid",
      "content,label": "Title"
    },
    "ja": {
      "control,validation,validationErrors,REQUIRED": "必須フィールド",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "整数のみ, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "整数のみ, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "日付が無効です",
      "content,label": "Title"
    },
    "ko": {
      "control,validation,validationErrors,REQUIRED": "필수 칸",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "정수만, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "정수만, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "유효하지 않은 날짜",
      "content,label": "Title"
    },
    "no": {
      "control,validation,validationErrors,REQUIRED": "Obligatorisk felt",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Bare heltall, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Bare heltall, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Ugyldig dato",
      "content,label": "Title"
    },
    "sk": {
      "control,validation,validationErrors,REQUIRED": "Povinné pole",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Iba celé čísla, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Iba celé čísla, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Neplatný dátum",
      "content,label": "Title"
    },
    "sl": {
      "control,validation,validationErrors,REQUIRED": "Obvezno polje",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Samo cela števila, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Samo cela števila, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Neveljaven datum",
      "content,label": "Title"
    },
    "sr": {
      "control,validation,validationErrors,REQUIRED": "Obavezno polje",
      "control,validation,validationErrors,DAY_INVALID_ERROR_TEXT": "Samo celi brojevi, 1 - 31",
      "control,validation,validationErrors,YEAR_INVALID_ERROR_TEXT": "Samo celi brojevi, 0 - 3000",
      "control,validation,validationErrors,DATE_INVALID_ERROR_TEXT": "Nevažeći datum",
      "content,label": "Title"
    },
  },
  "props": {
    "content": {
      "label": "Title",
      "askYear": true,
      "textContrastEnabled": true,
      "placeholderTextContrastEnabled": true,
    },
    "control": {
      "name": "date",
      "integrationName": "date",
      "defaultValue": null,
      "validation": {
        "required": true,
        "validator": "SYS_DATE"
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
            "_marginEnabled": false
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
    "icon": "/SysDateComponent/assets/img/date-component-icon.svg",
    "label": {
      "en": "Date",
      "ru": "Дата",
      "uk": "Дата",
      "es": "Fecha",
      "fr": "Date",
      "de": "Datum",
      "it": "Data",
      "pt": "Data",
      "ro": "Data",
      "bg": "Дата",
      "cs": "Datum",
      "el": "Ημερομηνία",
      "nl": "Datum",
      "pl": "Data",
      "sv": "Datum",
      "tr": "Tarih",
      "ar": "التاريخ",
      "zh": "日期",
      "da": "Dato",
      "he": "תאריך",
      "fi": "Päivämäärä",
      "hi": "तारीख़ ",
      "hr": "Datum",
      "hu": "Dátum",
      "id": "Tanggal",
      "ja": "日付",
      "ko": "날짜",
      "no": "Dato",
      "sk": "Dátum",
      "sl": "Datum",
      "sr": "Datum"
    }
  },
  "syncEnabled": true,
  "stylesImitationEnabled": true,
}
