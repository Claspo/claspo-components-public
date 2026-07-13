import {cloneControlsToAllEnvs} from '@claspo/renderer/sdk/ManifestUtils';
import {cloneStylesToAllEnvs} from "@claspo/renderer/sdk/ModelStyleUtils";

export default {
  "name": "SysTextAreaComponent",
  "componentType": "INPUT",
  "version": "1.0.0",
  "mappingTypes": ["TEXT_AREA"],
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
            "showPlaceholderControl": true
          },
          {
            "element": "label"
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
        "name": "AUTOFILL",
        "params": {
          "autofillPropPath": ["control", "autofill"]
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
    "content,placeholder"
  ],
  "i18n": {
    "en": {
      "control,validation,validationErrors,REQUIRED": "Required field",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Invalid characters used: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Maximum length is 5000",
      "content,placeholder": "Text area",
      "content,label": "Title"
    },
    "ru": {
      "control,validation,validationErrors,REQUIRED": "Обязательное поле",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Недопустимые символы: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Максимальная длина 5000 символов",
      "content,placeholder": "Текстовая область",
      "content,label": "Заголовок"
    },
    "uk": {
      "control,validation,validationErrors,REQUIRED": "Обов'язкове поле",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Заборонені символи: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Максимальна довжина 5000",
      "content,placeholder": "Текстова область",
      "content,label": "Заголовок"
    },
    "es": {
      "control,validation,validationErrors,REQUIRED": "Campo obligatorio",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Invalid characters used: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Longitud máxima es de 5000",
      "content,placeholder": "Área de texto",
      "content,label": "Título"
    },
    "de": {
      "control,validation,validationErrors,REQUIRED": "Pflichtfeld",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Ungültige Zeichen verwendet: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Maximale Länge beträgt 5000",
      "content,placeholder": "Textbereich",
      "content,label": "Titel"
    },
    "fr": {
      "control,validation,validationErrors,REQUIRED": "Champs requis",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Caractères non valides utilisés: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "La longueur maximale est de 5000",
      "content,placeholder": "Zone de texte",
      "content,label": "Titre"
    },
    "it": {
      "control,validation,validationErrors,REQUIRED": "Campo obbligatorio",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Caratteri non validi utilizzati: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "La lunghezza massima è 5000",
      "content,placeholder": "Area del testo",
      "content,label": "Titolo"
    },
    "pt": {
      "control,validation,validationErrors,REQUIRED": "Campo obrigatório",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Caracteres inválidos usados: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Comprimento máximo de 5000",
      "content,placeholder": "Área de texto",
      "content,label": "Título"
    },
    "ro": {
      "control,validation,validationErrors,REQUIRED": "Câmp obligatoriu",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Caractere nevalide folosite: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Lungimea maximă este de 5000",
      "content,placeholder": "Zona de text",
      "content,label": "Titlu"
    },
    "bg": {
      "control,validation,validationErrors,REQUIRED": "Изисквано поле",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Използвани са невалидни: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Максималната дължина е 5000",
      "content,placeholder": "Поле за текст",
      "content,label": "Заглавие"
    },
    "cs": {
      "control,validation,validationErrors,REQUIRED": "Vyžadované pole",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Použité neplatné znaky: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Maximální délka je 5000",
      "content,placeholder": "Oblast textu",
      "content,label": "Titul"
    },
    "el": {
      "control,validation,validationErrors,REQUIRED": "Απαιτητό πεδίο",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Χρησιμοποιήθηκαν άκυροι χαρακτήρες: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Το μέγιστο μήκος είναι 5000",
      "content,placeholder": "Περιοχή κειμένου",
      "content,label": "Τίτλος"
    },
    "nl": {
      "control,validation,validationErrors,REQUIRED": "Verplicht veld",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Ongeldige tekens gebruikt: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Maximale lengte is 5000",
      "content,placeholder": "Tekstgebied",
      "content,label": "Titel"
    },
    "pl": {
      "control,validation,validationErrors,REQUIRED": "Wymagane pole",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Użyto nieprawidłowych znaków: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Maksymalna długość to 5000",
      "content,placeholder": "Obszar tekstu",
      "content,label": "Tytuł"
    },
    "sv": {
      "control,validation,validationErrors,REQUIRED": "Obligatoriskt fält",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Ogiltiga tecken används: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Maximal längd är 5000",
      "content,placeholder": "Textområde",
      "content,label": "Tytuł"
    },
    "tr": {
      "control,validation,validationErrors,REQUIRED": "Gerekli alan",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Geçersiz karakterler kullanıldı: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Maksimum uzunluk 5000",
      "content,placeholder": "Metin alanı",
      "content,label": "Başlık"
    },
    "ar": {
      "control,validation,validationErrors,REQUIRED": "الحقل المطلوب",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "الأحرف غير الصالحة المستخدَمة {{characters}}",
      "control,validation,validationErrors,MAX_LENGTH_5000": "الحد الأقصى للطول هو 5000",
      "content,placeholder": "منطقة النص",
      "content,label": "عنوان"
    },
    "zh": {
      "control,validation,validationErrors,REQUIRED": "必填字段",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "使用了无效的字符 \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "最大长度为 5000",
      "content,placeholder": "文本区域",
      "content,label": "Title"
    },
    "da": {
      "control,validation,validationErrors,REQUIRED": "Påkrævet felt",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Ugyldige tegn brugt: \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Maksimum længde er 5000",
      "content,placeholder": "Tekstfelt",
      "content,label": "Titel"
    },
    "he": {
      "control,validation,validationErrors,REQUIRED": "שדה נדרש",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "שימוש בתווים לא חוקיים \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "אורך מקסימלי הוא 5000",
      "content,placeholder": "אזור הטקסט",
      "content,label": "Title"
    },
    "fi": {
      "control,validation,validationErrors,REQUIRED": "Vaadittu kenttä",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Virheellisiä merkkejä käytettiin \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Maksimipituus on 5000",
      "content,placeholder": "Tekstialue",
      "content,label": "Title"
    },
    "hi": {
      "control,validation,validationErrors,REQUIRED": "आवश्यक फील्ड",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "अमान्य वर्णों का उपयोग किया गया \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "अधिकतम लंबाई 5000 है",
      "content,placeholder": "टेक्स्ट एरिया",
      "content,label": "Title"
    },
    "hr": {
      "control,validation,validationErrors,REQUIRED": "Obavezno polje",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Korišteni su nevažeći znakovi \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Maksimalna duljina je 5000",
      "content,placeholder": "Tekstualno područje",
      "content,label": "Title"
    },
    "hu": {
      "control,validation,validationErrors,REQUIRED": "Kötelező mező",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Érvénytelen karakterek használata \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "A maximális hossz 5000",
      "content,placeholder": "Szövegterület",
      "content,label": "Title"
    },
    "id": {
      "control,validation,validationErrors,REQUIRED": "Bidang yang wajib diisi",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Karakter tidak valid yang digunakan \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Panjang maksimum adalah 5000",
      "content,placeholder": "Area teks",
      "content,label": "Title"
    },
    "ja": {
      "control,validation,validationErrors,REQUIRED": "必須フィールド",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "無効な文字が使用されています \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "最長5000文字です",
      "content,placeholder": "テキストエリア",
      "content,label": "Title"
    },
    "ko": {
      "control,validation,validationErrors,REQUIRED": "필수 칸",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "\"{{characters}}\"(이)가 사용된 잘못된 문자",
      "control,validation,validationErrors,MAX_LENGTH_5000": "최대 길이 5000",
      "content,placeholder": "텍스트 영역",
      "content,label": "Title"
    },
    "no": {
      "control,validation,validationErrors,REQUIRED": "Obligatorisk felt",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Ugyldige tegn brukt \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Maksimal lengde er 5000",
      "content,placeholder": "Tekstområde",
      "content,label": "Title"
    },
    "sk": {
      "control,validation,validationErrors,REQUIRED": "Povinné pole",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Použité neplatné znaky \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Maximálna dĺžka je 5000",
      "content,placeholder": "Oblasť textu",
      "content,label": "Title"
    },
    "sl": {
      "control,validation,validationErrors,REQUIRED": "Obvezno polje",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Uporabljeni neveljavni znaki \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Največja dolžina je 5000",
      "content,placeholder": "Območje besedila",
      "content,label": "Title"
    },
    "sr": {
      "control,validation,validationErrors,REQUIRED": "Obavezno polje",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Korišćeni su nevažeći znakovi \"{{characters}}\"",
      "control,validation,validationErrors,MAX_LENGTH_5000": "Maksimalna dužina je 5000",
      "content,placeholder": "Oblast teksta",
      "content,label": "Title"
    }
  },
  "props": {
    "content": {
      "placeholder": "Text area",
      "label": "Title",
      "textContrastEnabled": true,
      "placeholderTextContrastEnabled": true
    },
    "control": {
      "name": "textArea",
      "defaultValue": "",
      "integrationName": "text_area",
      "validation": {
        "required": true
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
    "adaptiveStyles": cloneStylesToAllEnvs([
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
          "height": "80px",
          "minHeight": "80px",
          "color": "var(--cl-schema-text, rgb(0, 0, 0))",
          "textAlign": "start",
          "lineHeight": "120%",
          "fontWeight": "400",
          "fontSize": "16px",
          "textShadow": "none",
          "paddingTop": "10px",
          "paddingBottom": "10px",
          "paddingLeft": "10px",
          "paddingRight": "10px",
          "_paddingEnabled": true
        },
        "placeholderStyleAttributes": {
          "color": "rgb(81, 81, 81)"
        },
        "classes": ""
      },
      {
        "element": "label",
        "styleAttributes": {
          "color": "var(--cl-schema-text, rgb(0, 0, 0))",
          "textAlign": "start",
          "lineHeight": "120%",
          "fontWeight": "400",
          "fontSize": "16px",
          "textShadow": "none"
        },
        "classes": ""
      }
    ])
  },
  "metaDescription": {
    "icon": "/SysTextAreaComponent/assets/img/component-icon.svg",
    "label": {
      "en": "Text area",
      "ru": "Текстовое область",
      "uk": "Текстова область",
      "es": "Área de texto",
      "fr": "Zone de texte",
      "de": "Textbereich",
      "it": "Area del testo",
      "pt": "Área de texto",
      "ro": "Zona de text",
      "bg": "Поле за текст",
      "cs": "Oblast textu",
      "el": "Περιοχή κειμένου",
      "nl": "Tekstgebied",
      "pl": "Obszar tekstu",
      "sv": "Textområde",
      "tr": "Metin alanı",
      "ar": "منطقة النص",
      "zh": "文本区域",
      "da": "Tekstfelt",
      "he": "אזור הטקסט",
      "fi": "Tekstialue",
      "hi": "टेक्स्ट एरिया",
      "hr": "Tekstualno područje",
      "hu": "Szövegterület",
      "id": "Area teks",
      "ja": "テキストエリア",
      "ko": "텍스트 영역",
      "no": "Tekstområde",
      "sk": "Oblasť textu",
      "sl": "Območje besedila",
      "sr": "Oblast teksta"
    }
  },
  "syncEnabled": true,
  "stylesImitationEnabled": true,
  "showIntegrationFieldMappingPropertyPaneOnInsert": true,
}
