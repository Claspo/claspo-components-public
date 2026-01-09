export default {
  "name": "SysConsentComponent",
  "componentType": "CONSENT",
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
                "element": "label",
                "isLineSpaceAvailable": true,
                "isTextTransformAvailable": true
              }
            ]
          },
          {
            "type": "CONTROL",
            "name": "INSERT_BLOCK",
            "params": [
              {
                "element": "label",
                "label": "DOCUMENT_TEXT",
                "isLinkAvailable": true,
                "origin": true
              }
            ]
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
            "name": "BACKGROUND",
            "element": "input",
            "elementProp": "markerStyleAttributes",
            "params": {
              "label": "DOCUMENT_CHECKBOX_BACKGROUND_DEFAULT_TITLE",
              "property": "defaultBackground"
            }
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND",
            "element": "input",
            "elementProp": "markerStyleAttributes",
            "params": {
              "label": "DOCUMENT_CHECKBOX_BACKGROUND_SELECTED_TITLE",
              "property": "selectedBackground"
            }
          },
          {
            "type": "CONTROL",
            "name": "BORDERS",
            "elementProp": "styleAttributes",
            "element": "input"
          },
          {
            "type": "CONTROL",
            "name": "BOX_SHADOW",
            "elementProp": "styleAttributes",
            "element": "input"
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "elementProp": "styleAttributes",
            "element": "input"
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
                "element": "label",
                "isLineSpaceAvailable": true,
                "isTextTransformAvailable": true
              }
            ]
          },
          {
            "type": "CONTROL",
            "name": "INSERT_BLOCK",
            "params": [
              {
                "element": "label",
                "label": "DOCUMENT_TEXT",
                "isLinkAvailable": true,
                "origin": true
              }
            ]
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
            "name": "BACKGROUND",
            "element": "input",
            "elementProp": "markerStyleAttributes",
            "params": {
              "label": "DOCUMENT_CHECKBOX_BACKGROUND_DEFAULT_TITLE",
              "property": "defaultBackground"
            }
          },
          {
            "type": "CONTROL",
            "name": "BACKGROUND",
            "element": "input",
            "elementProp": "markerStyleAttributes",
            "params": {
              "label": "DOCUMENT_CHECKBOX_BACKGROUND_SELECTED_TITLE",
              "property": "selectedBackground"
            }
          },
          {
            "type": "CONTROL",
            "name": "BORDERS",
            "elementProp": "styleAttributes",
            "element": "input"
          },
          {
            "type": "CONTROL",
            "name": "BOX_SHADOW",
            "elementProp": "styleAttributes",
            "element": "input"
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "elementProp": "styleAttributes",
            "element": "input"
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
    ]
  },
  "events": {
    "dispatch": [],
    "listen": []
  },
  "i18nPropPaths": [
    "content,label"
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
  "i18n": {
    "en": {
      "control,validation,validationErrors,REQUIRED": "Accept consent to subscribe",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "ru": {
      "control,validation,validationErrors,REQUIRED": "Примите соглашение для подписки",
      "content,label": "Я даю согласие на обработку своих персональных данных и ознакомлен с <a href=\"https://example.com/termsofuse\" target=\"_blank\">условиями использования сервиса</a>"
    },
    "uk": {
      "control,validation,validationErrors,REQUIRED": "Прийміть угоду для підписки",
      "content,label": "Я даю згоду на обробку своїх персональних даних та ознайомлений з <a href=\"https://example.com/termsofuse\" target=\"_blank\">умовами використання сервісу</a>"
    },
    "es": {
      "control,validation,validationErrors,REQUIRED": "Aceptar el consentimiento para suscribirse",
      "content,label": "Doy mi consentimiento para el procesamiento de mis datos personales y he leído y acepto los <a href=\"https://example.com/termsofuse\" target=\"_blank\">Términos de uso</a>"
    },
    "de": {
      "control,validation,validationErrors,REQUIRED": "Zustimmung zum Abonnement akzeptieren",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "fr": {
      "control,validation,validationErrors,REQUIRED": "Accepter le consentement pour s'abonner",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "it": {
      "control,validation,validationErrors,REQUIRED": "Accetti il consenso per iscriversi",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "pt": {
      "control,validation,validationErrors,REQUIRED": "Aceitar consentimento para subscrever",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "ro": {
      "control,validation,validationErrors,REQUIRED": "Acceptați consimțământul pentru abonare",
      "content,label": "Sunt de acord cu prelucrarea datelor mele personale și am citit și accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Termenii de utilizare</a>"
    },
    "bg": {
      "control,validation,validationErrors,REQUIRED": "Приемете съгласието, за да се абонирате",
      "content,label": "Съгласен съм с обработката на личните ми данни и прочетох и приемам <a href=\"https://example.com/termsofuse\" target=\"_blank\">Условията за ползване</a>"
    },
    "cs": {
      "control,validation,validationErrors,REQUIRED": "Pro odběr přijměte souhlas",
      "content,label": "Souhlasím se zpracováním mých osobních údajů a přečetl jsem si a přijímám <a href=\"https://example.com/termsofuse\" target=\"_blank\">Podmínky použití</a>"
    },
    "el": {
      "control,validation,validationErrors,REQUIRED": "Αποδέχεστε τη συναίνεση στην εγγραφή",
      "content,label": "Συναινώ στην επεξεργασία των προσωπικών μου δεδομένων και έχω διαβάσει και αποδέχομαι τους <a href=\"https://example.com/termsofuse\" target=\"_blank\">Όρους Χρήσης</a>"
    },
    "nl": {
      "control,validation,validationErrors,REQUIRED": "Accepteer toestemming om u te abonneren",
      "content,label": "Jeg giver samtykke til behandlingen af mine personlige data, og jeg har læst og accepterer <a href=\"https://example.com/termsofuse\" target=\"_blank\">Brugervilkår</a>"
    },
    "pl": {
      "control,validation,validationErrors,REQUIRED": "Wyraź zgodę, aby zasubskrybować",
      "content,label": "Wyrażam zgodę na przetwarzanie moich danych osobowych oraz zapoznałem się i akceptuję <a href=\"https://example.com/termsofuse\" target=\"_blank\">Warunki użytkowania</a>"
    },
    "sv": {
      "control,validation,validationErrors,REQUIRED": "Acceptera samtycke för att prenumerera",
      "content,label": "Jag samtycker till behandlingen av mina personuppgifter och jag har läst och accepterar <a href=\"https://example.com/termsofuse\" target=\"_blank\">Användarvillkor</a>"
    },
    "tr": {
      "control,validation,validationErrors,REQUIRED": "Abone olmak için onayı kabul edin",
      "content,label": "Kişisel verilerimin işlenmesine izin veriyorum ve <a href=\"https://example.com/termsofuse\" target=\"_blank\">Kullanım Koşulları</a>'nı okudum ve kabul ediyorum."
    },
    "ar": {
      "control,validation,validationErrors,REQUIRED": "قبول الموافقة على الاشتراك",
      "content,label": "أوافق على معالجة بياناتي الشخصية وقد قرأت وأوافق على <a href=\"https://example.com/termsofuse\" target=\"_blank\"> شروط الاستخدام </a>"
    },
    "zh": {
      "control,validation,validationErrors,REQUIRED": "接受同意订阅",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "da": {
      "control,validation,validationErrors,REQUIRED": "Accepter samtykke til at abonnere",
      "content,label": "Jeg giver samtykke til behandlingen af ​​mine personoplysninger, og jeg har læst og accepterer <a href=\"https://example.com/termsofuse\" target=\"_blank\">Vilkår for brug</a>"
    },
    "he": {
      "control,validation,validationErrors,REQUIRED": "קבלו הסכמה להירשם",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "fi": {
      "control,validation,validationErrors,REQUIRED": "Anna suostumus tilaukseen",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "hi": {
      "control,validation,validationErrors,REQUIRED": "सदस्यता लेने के लिए सहमति स्वीकार करें",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "hr": {
      "control,validation,validationErrors,REQUIRED": "Prihvatite privolu za pretplatu",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "hu": {
      "control,validation,validationErrors,REQUIRED": "Az előfizetéshez való hozzájárulás elfogadása",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "id": {
      "control,validation,validationErrors,REQUIRED": "Terima persetujuan untuk berlangganan",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "ja": {
      "control,validation,validationErrors,REQUIRED": "サブスクリプションへの同意を承諾",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "ko": {
      "control,validation,validationErrors,REQUIRED": "구독하려면 동의 수락",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "no": {
      "control,validation,validationErrors,REQUIRED": "Godta samtykke for å abonnere",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "sk": {
      "control,validation,validationErrors,REQUIRED": "Udeľte súhlas s odberom",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "sl": {
      "control,validation,validationErrors,REQUIRED": "Sprejmite soglasje za naročnino",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "sr": {
      "control,validation,validationErrors,REQUIRED": "Prihvatite saglasnost za pretplatu",
      "content,label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
  },
  "props": {
    "content": {
      "label": "I consent to the processing of my personal data and I have read and I do accept <a href=\"https://example.com/termsofuse\" target=\"_blank\">Terms of Use</a>"
    },
    "control": {
      "name": "consentId",
      "defaultValue": false,
      "validation": {
        "required": true,
        "validationErrors": {
          "REQUIRED": "Accept consent to subscribe"
        }
      }
    },
    "adaptiveStyles": {
      "desktop": [
        {
          "element": "host",
          "styleAttributes": {
            "paddingTop": "0px",
            "paddingBottom": "0px",
            "paddingLeft": "0px",
            "paddingRight": "0px",
            "_paddingEnabled": false,
            "width": "100%",
            "minWidth": null,
            "height": "auto",
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
            "borderBottomRightRadius": "0px"
          },
          "markerStyleAttributes": {
            "inputSize": "22px",
            "inputToTextGapSize": "13px",
            "defaultBackground": "rgb(255, 255, 255)",
            "selectedBackground": "rgb(255, 255, 255)"
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
        }
      ],
      "mobile": [
        {
          "element": "host",
          "styleAttributes": {
            "paddingTop": "0px",
            "paddingBottom": "0px",
            "paddingLeft": "0px",
            "paddingRight": "0px",
            "_paddingEnabled": false,
            "width": "100%",
            "minWidth": null,
            "height": "auto",
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
            "boxShadow": "none"
          },
          "markerStyleAttributes": {
            "inputSize": "22px",
            "inputToTextGapSize": "13px",
            "defaultBackground": "rgb(255, 255, 255)",
            "selectedBackground": "rgb(255, 255, 255)"
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
        }
      ]
    }
  },
  "metaDescription": {
    "icon": "/SysConsentComponent/assets/img/consent-component-icon.svg",
    "label": {
      "en": "Data processing and terms of use",
      "ru": "Обработка данных и условия использования",
      "uk": "Обробка даних та умови використання",
      "es": "Tratamiento de datos y condiciones de uso",
      "fr": "Traitement des données et conditions d'utilisation",
      "de": "Datenverarbeitung und Nutzungsbedingungen",
      "it": "Trattamento dei dati e condizioni d'uso",
      "pt": "Processamento de dados e termos de utilização",
      "ro": "Prelucrarea datelor și condițiile de utilizare",
      "bg": "Обработка на данни и условия за ползване",
      "cs": "Zpracování dat a podmínky použití",
      "el": "Επεξεργασία δεδομένων και όροι χρήσης",
      "nl": "Gegevensverwerking en gebruiksvoorwaarden",
      "pl": "Przetwarzanie danych i warunki użytkowania",
      "sv": "Databehandling och användarvillkor",
      "tr": "Veri işleme ve kullanım koşulları",
      "ar": "معالجة البيانات وشروط الاستخدام",
      "zh": "数据处理和使用条款",
      "da": "Databehandling og brugsbetingelser",
      "he": "עיבוד נתונים ותנאי השימוש"
    }
  }
}
