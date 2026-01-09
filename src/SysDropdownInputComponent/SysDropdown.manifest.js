export default {
  "name": "SysDropdownInputComponent",
  "componentType": "INPUT",
  "version": "1.0.0",
  "mappingTypes": ["SELECT"],
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
        "name": "TEXT_INPUT",
        "propPath": [
          "content",
          "placeholder"
        ],
        "params": {
          "label": "DOCUMENT_INPUT_PLACEHOLDER"
        }
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
          "integrationNamePropPath": ["control", "integrationName"],
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
  "i18nPropertyPaneModel": {
    "content": [
      {
        "type": "CONTROL",
        "name": "TEXT_INPUT",
        "propPath": [
          "content",
          "placeholder"
        ],
        "params": {
          "label": "DOCUMENT_INPUT_PLACEHOLDER"
        }
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
          "integrationNamePropPath": ["control", "integrationName"],
        }
      }
    ]
  },
  "focusableElements": ["input", "label"],
  "events": {
    "dispatch": [],
    "listen": []
  },
  "i18nPropPaths": [
    "content,label",
    "content,placeholder",
    "control,options,[id],label"
  ],
  "i18n": {
    "en": {
      "control,validation,validationErrors,REQUIRED": "Required field",
      "content,label": "Title",
      "content,placeholder": "Choose an option"
    },
    "ru": {
      "control,validation,validationErrors,REQUIRED": "Обязательное поле",
      "content,label": "Заголовок",
      "content,placeholder": "Выберите опцию"
    },
    "uk": {
      "control,validation,validationErrors,REQUIRED": "Обов'язкове поле",
      "content,label": "Заголовок",
      "content,placeholder": "Оберіть опцію"
    },
    "es": {
      "control,validation,validationErrors,REQUIRED": "Campo obligatorio",
      "content,label": "Título",
      "content,placeholder": "Escoja una opción"
    },
    "de": {
      "control,validation,validationErrors,REQUIRED": "Pflichtfeld",
      "content,label": "Titel",
      "content,placeholder": "Wählen Sie eine Option."
    },
    "fr": {
      "control,validation,validationErrors,REQUIRED": "Champs requis",
      "content,label": "Titre",
      "content,placeholder": "Choisissez une option"
    },
    "it": {
      "control,validation,validationErrors,REQUIRED": "Campo obbligatorio",
      "content,label": "Titolo",
      "content,placeholder": "Scegli un'opzione"
    },
    "pt": {
      "control,validation,validationErrors,REQUIRED": "Campo obrigatório",
      "content,label": "Título",
      "content,placeholder": "Alege o opțiune"
    },
    "ro": {
      "control,validation,validationErrors,REQUIRED": "Câmp obligatoriu",
      "content,label": "Titlu",
      "content,placeholder": "Alege o opțiune"
    },
    "bg": {
      "control,validation,validationErrors,REQUIRED": "Изисквано поле",
      "content,label": "Заглавие",
      "content,placeholder": "Изберете опция"
    },
    "cs": {
      "control,validation,validationErrors,REQUIRED": "Vyžadované pole",
      "content,label": "Titul",
      "content,placeholder": "Vyberte si možnost"
    },
    "el": {
      "control,validation,validationErrors,REQUIRED": "Απαιτητό πεδίο",
      "content,label": "Τίτλος",
      "content,placeholder": "Διαλέξτε μια επιλογή"
    },
    "nl": {
      "control,validation,validationErrors,REQUIRED": "Verplicht veld",
      "content,label": "Titel",
      "content,placeholder": "Kies een optie"
    },
    "pl": {
      "control,validation,validationErrors,REQUIRED": "Wymagane pole",
      "content,label": "Tytuł",
      "content,placeholder": "Wybierz opcję"
    },
    "sv": {
      "control,validation,validationErrors,REQUIRED": "Obligatoriskt fält",
      "content,label": "Tytuł",
      "content,placeholder": "Välj ett alternativ"
    },
    "tr": {
      "control,validation,validationErrors,REQUIRED": "Gerekli alan",
      "content,label": "Başlık",
      "content,placeholder": "Bir seçenek belirleyin"
    },
    "ar": {
      "control,validation,validationErrors,REQUIRED": "الحقل المطلوب",
      "content,label": "عنوان",
      "content,placeholder": "اختر خيارًا"
    },
    "zh": {
      "control,validation,validationErrors,REQUIRED": "必填字段",
      "content,label": "Title",
      "content,placeholder": "选择一项"
    },
    "da": {
      "control,validation,validationErrors,REQUIRED": "Påkrævet felt",
      "content,label": "Titel",
      "content,placeholder": "Vælg en mulighed"
    },
    "he": {
      "control,validation,validationErrors,REQUIRED": "שדה נדרש",
      "content,label": "Title",
      "content,placeholder": "בחרו חלופה"
    },
    "fi": {
      "control,validation,validationErrors,REQUIRED": "Vaadittu kenttä",
      "content,label": "Title",
      "content,placeholder": "Valitse vaihtoehto"
    },
    "hi":
    {
      "control,validation,validationErrors,REQUIRED": "आवश्यक फील्ड",
      "content,label": "Title",
      "content,placeholder": "एक विकल्प चुनें"
    },
    "hr":
    {
      "control,validation,validationErrors,REQUIRED": "Obavezno polje",
      "content,label": "Title",
      "content,placeholder": "Odaberite opciju"
    },
    "hu":
    {
      "control,validation,validationErrors,REQUIRED": "Kötelező mező",
      "content,label": "Title",
      "content,placeholder": "Válasszon egy opciót"
    },
    "id":
    {
      "control,validation,validationErrors,REQUIRED": "Bidang yang wajib diisi",
      "content,label": "Title",
      "content,placeholder": "Pilih satu opsi"
    },
    "ja":
    {
      "control,validation,validationErrors,REQUIRED": "必須フィールド",
      "content,label": "Title",
      "content,placeholder": "オプションを選択"
    },
    "ko":
    {
      "control,validation,validationErrors,REQUIRED": "필수 칸",
      "content,label": "Title",
      "content,placeholder": "옵션 선택"
    },
    "no":
    {
      "control,validation,validationErrors,REQUIRED": "Obligatorisk felt",
      "content,label": "Title",
      "content,placeholder": "Velg et alternativ"
    },
    "sk":
    {
      "control,validation,validationErrors,REQUIRED": "Povinné pole",
      "content,label": "Title",
      "content,placeholder": "Vyberte si možnosť"
    },
    "sl":
    {
      "control,validation,validationErrors,REQUIRED": "Obvezno polje",
      "content,label": "Title",
      "content,placeholder": "Izberite možnost"
    },
    "sr":
    {
      "control,validation,validationErrors,REQUIRED": "Obavezno polje",
      "content,label": "Title",
      "content,placeholder": "Izaberite opciju"
    }
  },
  "props": {
    "content": {
      "label": "Title",
      "placeholder": "Choose an option",
      "textContrastEnabled": true,
      "placeholderTextContrastEnabled": true
    },
    "control": {
      "name": "dropdown",
      "integrationName": "dropdown",
      "defaultValue": null,
      "hoverColor": "rgba(0, 0, 0, 0)",
      "selectedColor": "rgba(0, 0, 0, 0)",
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
    "icon": "/SysDropdownInputComponent/assets/img/dropdown-component-icon.svg",
    "label": {
      "en": "Dropdown",
      "ru": "Выпадающий список",
      "uk": "Випадаючий список",
      "es": "Desplegable",
      "fr": "Menu déroulant",
      "de": "Dropdown",
      "it": "A tendina",
      "pt": "Suspenso",
      "ro": "Derulantă",
      "bg": "Падащо меню",
      "cs": "Rozevírací seznam",
      "el": "Αναπτυσσόμενη λίστα",
      "nl": "Vervolgkeuzelijst",
      "pl": "Lista rozwijana",
      "sv": "Rullgardin",
      "tr": "Açılır",
      "ar": "القائمة المنسدلة",
      "zh": "下拉菜单",
      "da": "Dropdown",
      "he": "רשימה נפתחת",
      "fi": "Pudotus",
      "hi": "ड्रॉपडाउन",
      "hr": "Padajući izbornik",
      "hu": "Legördülő menü",
      "id": "tarik-turun",
      "ja": "ドロップダウン",
      "ko": "드롭다운",
      "no": "Nedtrekk",
      "sk": "Rozbaľovacia ponuka",
      "sl": "Spustni meni",
      "sr": "Padajući meni"
    }
  }
}
