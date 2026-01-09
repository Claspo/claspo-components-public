export default {
  "name": "SysPhoneInputComponent",
  "componentType": "INPUT",
  "version": "1.0.0",
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
                "hideTextAlign": true,
              },
              {
                "element": "label",
                "displayCondition": "return !!sdk.component.getProps().styles.find(element => element.element === 'label').params.enabled",
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
            "name": "BORDER_RADIUS",
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
                "hideTextAlign": true,
              },
              {
                "element": "label",
                "displayCondition": "return !!sdk.component.getProps().styles.find(element => element.element === 'label').params.enabled",
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
            "name": "BORDER_RADIUS",
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
        "name": "COUNTRY_PHONE_SELECT",
        "element": "input",
        "propPath": [
          "control"
        ]
      },
      {
        "type": "CONTROL",
        "name": "INPUT_VALIDATION",
        "params": {
          "validationPropPath": ["control", "validation"],
          "fieldTypePropPath": ["control", "fieldType"],
          "required": true,
          "options": [
            {
              "label": "Phone",
              "value": "PHONE"
            }
          ],
          "validationErrors": {
            "PHONE": [
              {
                "key": "PHONE_INVALID_NUMBER",
                "value": "Phone number is invalid"
              }
            ]
          }
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
    }
  ],
  "focusableElements": ["input", "label"],
  "events": {
    "dispatch": [],
    "listen": []
  },
  "i18nPropPaths": [
    "content,label",
    "content,placeholder"
  ],
  "i18n": {
    "en": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Phone number is invalid",
      "control,validation,validationErrors,REQUIRED": "Required field",
      "content,label": "Title"
    },
    "ru": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Неверно заполнен номер телефона",
      "control,validation,validationErrors,REQUIRED": "Обязательное поле",
      "content,label": "Заголовок"
    },
    "uk": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Неправильно заповнено номер телефону",
      "control,validation,validationErrors,REQUIRED": "Обов'язкове поле",
      "content,label": "Заголовок"
    },
    "es": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "El número de teléfono no es válido",
      "control,validation,validationErrors,REQUIRED": "Campo obligatorio",
      "content,label": "Título"
    },
    "de": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Telefonnummer ist ungültig",
      "control,validation,validationErrors,REQUIRED": "Pflichtfeld",
      "content,label": "Titel"
    },
    "fr": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Le numéro de téléphone est invalide",
      "control,validation,validationErrors,REQUIRED": "Champs requis",
      "content,label": "Titre"
    },
    "it": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Il numero di telefono non è valido",
      "control,validation,validationErrors,REQUIRED": "Campo obbligatorio",
      "content,label": "Titolo"
    },
    "pt": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Número de telefone inválido",
      "control,validation,validationErrors,REQUIRED": "Campo obrigatório",
      "content,label": "Título"
    },
    "ro": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Numărul de telefon nu este valid",
      "control,validation,validationErrors,REQUIRED": "Câmp obligatoriu",
      "content,label": "Titlu"
    },
    "bg": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Телефонният номер е невалиден",
      "control,validation,validationErrors,REQUIRED": "Изисквано поле",
      "content,label": "Заглавие"
    },
    "cs": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Telefonní číslo je neplatné",
      "control,validation,validationErrors,REQUIRED": "Vyžadované pole",
      "content,label": "Titul"
    },
    "el": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Ο αριθμός τηλεφώνου είναι άκυρος",
      "control,validation,validationErrors,REQUIRED": "Απαιτητό πεδίο",
      "content,label": "Τίτλος"
    },
    "nl": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Telefoonnummer is ongeldig",
      "control,validation,validationErrors,REQUIRED": "Verplicht veld",
      "content,label": "Titel"
    },
    "pl": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Numer telefonu jest nieprawidłowy",
      "control,validation,validationErrors,REQUIRED": "Wymagane pole",
      "content,label": "Tytuł"
    },
    "sv": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Telefonnumret är ogiltigt",
      "control,validation,validationErrors,REQUIRED": "Obligatoriskt fält",
      "content,label": "Tytuł"
    },
    "tr": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Telefon numarası geçersiz",
      "control,validation,validationErrors,REQUIRED": "Gerekli alan",
      "content,label": "Başlık"
    },
    "ar": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "رقم الهاتف غير صالح",
      "control,validation,validationErrors,REQUIRED": "الحقل المطلوب",
      "content,label": "عنوان"
    },
    "zh": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "电话号码无效",
      "control,validation,validationErrors,REQUIRED": "必填字段",
      "content,label": "Title"
    },
    "da": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Telefonnummer er ugyldigt",
      "control,validation,validationErrors,REQUIRED": "Påkrævet felt",
      "content,label": "Titel"
    },
    "he": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "מספר טלפון לא תקין",
      "control,validation,validationErrors,REQUIRED": "שדה נדרש",
      "content,label": "Title"
    },
    "fi": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Puhelinnumero on virheellinen",
      "control,validation,validationErrors,REQUIRED": "Vaadittu kenttä",
      "content,label": "Title"
    },
    "hi": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "फ़ोन नंबर अमान्य है",
      "control,validation,validationErrors,REQUIRED": "आवश्यक फील्ड",
      "content,label": "Title"
    },
    "hr": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Telefonski broj nije ispravan",
      "control,validation,validationErrors,REQUIRED": "Obavezno polje",
      "content,label": "Title"
    },
    "hu": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "A telefonszám érvénytelen",
      "control,validation,validationErrors,REQUIRED": "Kötelező mező",
      "content,label": "Title"
    },
    "id": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Nomor telepon tidak valid",
      "control,validation,validationErrors,REQUIRED": "Bidang yang wajib diisi",
      "content,label": "Title"
    },
    "ja": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "電話番号が無効です",
      "control,validation,validationErrors,REQUIRED": "必須フィールド",
      "content,label": "Title"
    },
    "ko": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "유효하지 않은 전화번호",
      "control,validation,validationErrors,REQUIRED": "필수 칸",
      "content,label": "Title"
    },
    "no": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Telefonnummeret er ugyldig",
      "control,validation,validationErrors,REQUIRED": "Obligatorisk felt",
      "content,label": "Title"
    },
    "sk": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Telefónne číslo je neplatné",
      "control,validation,validationErrors,REQUIRED": "Povinné pole",
      "content,label": "Title"
    },
    "sl": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Telefonska številka je neveljavna",
      "control,validation,validationErrors,REQUIRED": "Obvezno polje",
      "content,label": "Title"
    },
    "sr": {
      "control,validation,validationErrors,PHONE_INVALID_NUMBER": "Broj telefona je nevažeći",
      "control,validation,validationErrors,REQUIRED": "Obavezno polje",
      "content,label": "Title"
    }
  },
  "props": {
    "content": {
      "label": "Title",
      "textContrastEnabled": true
    },
    "control": {
      "name": "phone",
      "countryCode": "UA",
      "countriesPriority": {
        "includedList": ["UA"],
        "allowToAddOnlyFromIncludedList": false
      },
      "validation": {
        "required": true,
        "validator": "PHONE"
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
            "textShadow": "none",
            "paddingTop": "10px",
            "paddingBottom": "10px",
            "paddingLeft": "10px",
            "paddingRight": "10px",
            "_paddingEnabled": true,
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
            "textShadow": "none",
            "paddingTop": "10px",
            "paddingBottom": "10px",
            "paddingLeft": "10px",
            "paddingRight": "10px",
            "_paddingEnabled": true,
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
    "icon": "/SysPhoneInputComponent/assets/img/phone-input-component-icon.svg",
    "label": {
      "en": "Phone",
      "ru": "Телефон",
      "uk": "Телефон",
      "es": "Teléfono",
      "fr": "Téléphone",
      "de": "Telefon",
      "it": "Telefono",
      "pt": "Telefone",
      "ro": "Telefon",
      "bg": "Телефон",
      "cs": "Telefon",
      "el": "Τηλέφωνο",
      "nl": "Telefoon",
      "pl": "Telefon",
      "sv": "Telefon",
      "tr": "Telefon",
      "ar": "الهاتف",
      "zh": "电话",
      "da": "Telefon",
      "he": "טלפון",
      "fi": "Puhelin",
      "hi": "फ़ोन",
      "hr": "Telefon",
      "hu": "Telefon",
      "id": "Telepon",
      "ja": "電話",
      "ko": "휴대폰",
      "no": "Telefon",
      "sk": "Telefón",
      "sl": "Telefon",
      "sr": "Telefon"
    }
  }
}
