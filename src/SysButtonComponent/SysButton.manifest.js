import {cloneControlsToAllEnvs} from '@claspo/renderer/sdk/ManifestUtils';
import {cloneStylesToAllEnvs} from "@claspo/renderer/sdk/ModelStyleUtils";

export default {
  "name": "SysButtonComponent",
  "componentType": "BUTTON",
  "version": "1.0.0",
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
            "element": "button"
          }
        ]
      },
      {
        "type": "CONTROL",
        "name": "BACKGROUND",
        "propPath": [
          "styles",
          "[element=button]",
          "styleAttributes"
        ],
      },
      {
        "type": "CONTROL",
        "name": "ICON",
        "propPath": [
          "styles",
          "[element=button]",
          "styleAttributes"
        ],
        "params": {
          "visibleDisplayValue": "block"
        },
        "hideSyncSelect": true,
      },
      {
        "type": "CONTROL",
        "name": "TEXT_VISIBILITY",
        "elementSubProp": "--textDisplay",
        "elementProp": "styleAttributes",
        "element": "button",
        "params": {
          "visibleDisplayValue": "inline"
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
        "name": "HOVER_ANIMATION",
        "propPath": [
          "styles",
          "[element=button]",
          "hoverStyleAttributes"
        ],
        "params": {
          "animationTypeProp": {
            "propPath": [
              "styles",
              "[element=button]",
              "hoverAnimationType"
            ]
          }
        },
      },
      {
        "type": "CONTROL",
        "name": "LOOP_ANIMATION",
        "propPath": [
          "styles",
          "[element=button]"
        ],
        "params": {
          "label": "LOOP_ANIMATION_LABEL",
        }
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
        "name": "NPS_ACTIONS",
        "propPath": [
          "content"
        ],
        "params": {
          "syncContentComponentName": "SysNetPromoterScoreComponent",
        },
        "displayCondition": "return (sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysNetPromoterScoreComponent'])?.length === 1) " +
          "&& (sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysFeedbackComponent'])?.length === 0) " +
          "&& sdk.component.getProps().handlers?.find(h => h.type === 'CLICK')?.actions?.some(a => ['REQUEST', 'SUBSCRIBE_CONTACT'].includes(a.type))",
      },
      {
        "type": "CONTROL",
        "name": "FEEDBACK_ACTIONS",
        "propPath": [
          "content"
        ],
        "params": {
          "syncContentComponentName": "SysFeedbackComponent"
        },
        "displayCondition": "return (sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysFeedbackComponent'])?.length === 1) " +
          "&& (sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysNetPromoterScoreComponent'])?.length === 0) " +
          "&& sdk.component.getProps().handlers?.find(h => h.type === 'CLICK')?.actions?.some(a => ['REQUEST', 'SUBSCRIBE_CONTACT'].includes(a.type))",
      },
      {
        "type": "CONTROL",
        "name": "ACTIONS",
        "propPath": [
          "handlers"
        ],
        "params": {
          "origin": true,
          "hideSubmitActionCondition": "return (sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysNetPromoterScoreComponent', 'SysFeedbackComponent'])?.length === 1) " +
            "&& sdk.component.getProps().handlers?.find(h => h.type === 'CLICK')?.actions?.some(a => ['REQUEST', 'SUBSCRIBE_CONTACT'].includes(a.type))",
          "hideGoToViewActionCondition": "return (sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysNetPromoterScoreComponent', 'SysFeedbackComponent'])?.length === 1) " +
            "&& sdk.component.getProps().handlers?.find(h => h.type === 'CLICK')?.actions?.some(a => ['REQUEST', 'SUBSCRIBE_CONTACT'].includes(a.type))",
          "showTitleCondition": "return sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysNetPromoterScoreComponent', 'SysFeedbackComponent'])?.length === 0",
          "showRunGameActionCondition": "return sdk.documentUtils.getExternalStartGamingComponents([sdk.componentView], sdk.manifests)?.length !== 0",
        },
      },
    ]
  },
  "autoContrast": [
    {
      "slave": {
        "element": "button",
        "elementProp": "styleAttributes",
        "elementSubProp": "color",
      },
      "master": {
        "element": "button",
        "elementProp": "styleAttributes",
        "elementSubProp": "background",
      },
      "enabledPropPath": [
        "content",
        "textContrastEnabled"
      ],
    }
  ],
  'keepGeneralTabOpenUntilInteracted': true,
  "events": {
    "dispatch": [],
    "listen": []
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
        }
      }
    ]
  },
  "i18nPropPaths": [
    "content,text",
    "handlers,[id],actions,[id],params,link",
    "handlers,[id],actions,[id],params,customData"
  ],
  "i18n": {
    "en": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "At least one field is required: email or phone number"
    },
    "ru": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Хотя бы одно из полей должно быть заполнено: Email или Номер телефона"
    },
    "uk": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Хоча б одне з полів має бути заповнене: Email або Номер телефону"
    },
    "es": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Necesita, como mínimo, un campo obligatorio: email o número de teléfono"
    },
    "de": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Mindestens ein Feld ist erforderlich: E-Mail-Adresse oder Telefonnummer"
    },
    "fr": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Au moins un champ est obligatoire : courriel ou numéro de téléphone"
    },
    "it": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Almeno un campo è obbligatorio: email o numero di telefono"
    },
    "pt": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "É necessário pelo menos um campo: email ou número de telefone"
    },
    "ro": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Cel puțin un câmp este obligatoriu: e-mail sau număr de telefon"
    },
    "bg": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Изисква се поне едно поле: имейл или телефонен номер"
    },
    "cs": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Je vyžadováno alespoň jedno pole: e-mail nebo telefonní číslo"
    },
    "el": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Απαιτείται τουλάχιστον ένα πεδίο: ηλεκτρονική διεύθυνση ή τηλέφωνο"
    },
    "nl": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Er is minimaal één veld vereist: e-mail of telefoonnummer"
    },
    "pl": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Wymagane jest co najmniej jedno pole: adres e-mail lub numer telefonu"
    },
    "sv": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Minst ett fält krävs: e-post eller telefonnummer"
    },
    "tr": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "En az bir alan gereklidir: e-posta veya telefon numarası"
    },
    "ar": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "مطلوب حقل واحد على الأقل: البريد الإلكتروني أو رقم الهاتف"
    },
    "zh": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "至少一个字段为必填：电子邮箱或电话号码"
    },
    "da": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Mindst ét ​​felt er påkrævet: e-mail eller telefonnummer"
    },
    "he": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "נדרש לפחות שדה אחד: אימייל או מספר טלפון"
    },
    "fi": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Vähintään yksi kenttä vaaditaan: sähköposti tai puhelinnumero"
    },
    "hi": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "कम से कम एक फ़ील्ड आवश्यक है: ईमेल या फ़ोन नंबर"
    },
    "hr": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Potrebno je ispuniti barem jedno polje: e-mail ili telefonski broj"
    },
    "hu": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Legalább egy mező kitöltése kötelező: e-mail vagy telefonszám."
    },
    "id": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Setidaknya satu bidang wajib diisi: email atau nomor telepon"
    },
    "ja": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "少なくとも1つのフィールドが必須です：メールアドレスまたは電話番号"
    },
    "ko": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "최소 한 칸 필수 입력: 이메일 또는 전화번호"
    },
    "no": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Minst ett felt er obligatorisk: e-post eller telefonnummer"
    },
    "sk": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Aspoň jedno pole je povinné: e-mail alebo telefónne číslo"
    },
    "sl": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Vsaj eno polje je obvezno: e-poštni naslov ali telefonska številka"
    },
    "sr": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Najmanje jedno polje je obavezno: e-pošta ili broj telefona"
    },
  },
  "props": {
    "styles": [
      {
        "element": "button",
        "styleAttributes": {
          "background": "var(--cl-schema-accent, rgb(0, 0, 0))",
          "--iconDisplay": "none",
          "--iconSize": "20px",
          "--iconOrder": "-1",
          "--iconDistanceToText": "15px",
          "--iconURL": "",
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
          "borderTopLeftRadius": "200px",
          "borderTopRightRadius": "200px",
          "borderBottomLeftRadius": "200px",
          "borderBottomRightRadius": "200px",
          "boxShadow": "none",
        },
        "hoverStyleAttributes": {
          "background": "rgba(0, 0, 0, 0.2)",
        },
        "classes": "cl-loop-animation-PULSE"
      }
    ],
    "adaptiveStyles": cloneStylesToAllEnvs([
      {
        "element": "host",
        "styleAttributes": {
          "width": "auto",
          "minWidth": null,
          "height": "35px",
          "minHeight": "35px",
          "marginTop": "0px",
          "marginBottom": "0px",
          "marginLeft": "0px",
          "marginRight": "0px",
          "_marginEnabled": false,
        }
      },
      {
        "element": "button",
        "styleAttributes": {
          "width": "100%",
          "height": "100%",
          "display": "flex",
          "align-items": "center",
          "justify-content": "center",
          "flexDirection": "row",
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
    ]),
    "content": {
      "text": "Subscribe",
      "textContrastEnabled": true
    }
  },
  "metaDescription": {
    "icon": "/SysButtonComponent/assets/img/component-icon.svg",
    "label": {
      "en": "Button",
      "ru": "Кнопка",
      "uk": "Кнопка",
      "es": "Botón",
      "fr": "Bouton",
      "de": "Schaltfläche",
      "it": "Pulsante",
      "pt": "Botão",
      "ro": "Buton",
      "bg": "Копче",
      "cs": "Tlačítko",
      "el": "Πλήκτρο",
      "nl": "Knop",
      "pl": "Przycisk",
      "sv": "Knapp",
      "tr": "Buton",
      "ar": "الزِّر",
      "zh": "按钮",
      "da": "Knap",
      "he": "כפתור",
      "fi": "Painike",
      "hi": "बटन",
      "hr": "Gumb",
      "hu": "Gomb",
      "id": "Tombol",
      "ja": "ボタン",
      "ko": "버튼",
      "no": "Knapp",
      "sk": "Tlačidlo",
      "sl": "Gumb",
      "sr": "Dugme",
    }
  },
  "syncEnabled": true,
  "stylesImitationEnabled": true,
}
