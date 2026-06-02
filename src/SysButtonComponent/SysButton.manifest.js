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
        "displayCondition": (sdk) => (sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysNetPromoterScoreComponent'])?.length === 1)
          && (sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysFeedbackComponent'])?.length === 0)
          && sdk.component.getProps().handlers?.find(h => h.type === 'CLICK')?.actions?.some(a => ['REQUEST', 'SUBSCRIBE_CONTACT'].includes(a.type)),
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
        "displayCondition": (sdk) => (sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysFeedbackComponent'])?.length === 1)
          && (sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysNetPromoterScoreComponent'])?.length === 0)
          && sdk.component.getProps().handlers?.find(h => h.type === 'CLICK')?.actions?.some(a => ['REQUEST', 'SUBSCRIBE_CONTACT'].includes(a.type)),
      },
      {
        "type": "CONTROL",
        "name": "ACTIONS",
        "propPath": [
          "handlers"
        ],
        "params": {
          "origin": true,
          "hideSubmitActionCondition": (sdk) => (sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysNetPromoterScoreComponent', 'SysFeedbackComponent'])?.length === 1)
            && sdk.component.getProps().handlers?.find(h => h.type === 'CLICK')?.actions?.some(a => ['REQUEST', 'SUBSCRIBE_CONTACT'].includes(a.type)),
          "hideGoToViewActionCondition": (sdk) => (sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysNetPromoterScoreComponent', 'SysFeedbackComponent'])?.length === 1)
            && sdk.component.getProps().handlers?.find(h => h.type === 'CLICK')?.actions?.some(a => ['REQUEST', 'SUBSCRIBE_CONTACT'].includes(a.type)),
          "showTitleCondition": (sdk) => sdk.documentUtils.findComponentsByNames([sdk.componentView], ['SysNetPromoterScoreComponent', 'SysFeedbackComponent'])?.length === 0,
          "showRunGameActionCondition": (sdk) => sdk.documentUtils.getExternalStartGamingComponents([sdk.componentView], sdk.manifests)?.length !== 0,
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
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "At least one field is required: email or phone number",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Something went wrong. Please try again later"
    },
    "ru": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Хотя бы одно из полей должно быть заполнено: Email или Номер телефона",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Что-то пошло не так. Пожалуйста, попробуйте позже"
    },
    "uk": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Хоча б одне з полів має бути заповнене: Email або Номер телефону",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Щось пішло не так. Будь ласка, спробуйте пізніше"
    },
    "es": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Necesita, como mínimo, un campo obligatorio: email o número de teléfono",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Algo salió mal. Por favor, inténtalo de nuevo más tarde"
    },
    "de": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Mindestens ein Feld ist erforderlich: E-Mail-Adresse oder Telefonnummer",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut"
    },
    "fr": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Au moins un champ est obligatoire : courriel ou numéro de téléphone",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Une erreur s'est produite. Veuillez réessayer plus tard"
    },
    "it": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Almeno un campo è obbligatorio: email o numero di telefono",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Qualcosa è andato storto. Riprova più tardi"
    },
    "pt": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "É necessário pelo menos um campo: email ou número de telefone",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Algo deu errado. Por favor, tente novamente mais tarde"
    },
    "ro": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Cel puțin un câmp este obligatoriu: e-mail sau număr de telefon",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Ceva nu a funcționat. Vă rugăm să încercați din nou mai târziu"
    },
    "bg": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Изисква се поне едно поле: имейл или телефонен номер",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Нещо се обърка. Моля, опитайте отново по-късно"
    },
    "cs": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Je vyžadováno alespoň jedno pole: e-mail nebo telefonní číslo",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Něco se pokazilo. Zkuste to prosím znovu později"
    },
    "el": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Απαιτείται τουλάχιστον ένα πεδίο: ηλεκτρονική διεύθυνση ή τηλέφωνο",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά αργότερα"
    },
    "nl": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Er is minimaal één veld vereist: e-mail of telefoonnummer",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Er is iets misgegaan. Probeer het later opnieuw"
    },
    "pl": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Wymagane jest co najmniej jedno pole: adres e-mail lub numer telefonu",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Coś poszło nie tak. Spróbuj ponownie później"
    },
    "sv": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Minst ett fält krävs: e-post eller telefonnummer",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Något gick fel. Försök igen senare"
    },
    "tr": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "En az bir alan gereklidir: e-posta veya telefon numarası",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyin"
    },
    "ar": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "مطلوب حقل واحد على الأقل: البريد الإلكتروني أو رقم الهاتف",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقًا"
    },
    "zh": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "至少一个字段为必填：电子邮箱或电话号码",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "出了点问题。请稍后再试"
    },
    "da": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Mindst ét ​​felt er påkrævet: e-mail eller telefonnummer",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Noget gik galt. Prøv venligst igen senere"
    },
    "he": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "נדרש לפחות שדה אחד: אימייל או מספר טלפון",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "משהו השתבש. אנא נסה שוב מאוחר יותר"
    },
    "fi": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Vähintään yksi kenttä vaaditaan: sähköposti tai puhelinnumero",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Jotain meni pieleen. Yritä myöhemmin uudelleen"
    },
    "hi": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "कम से कम एक फ़ील्ड आवश्यक है: ईमेल या फ़ोन नंबर",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "कुछ गलत हो गया। कृपया बाद में पुनः प्रयास करें"
    },
    "hr": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Potrebno je ispuniti barem jedno polje: e-mail ili telefonski broj",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Nešto je pošlo po zlu. Pokušajte ponovno kasnije"
    },
    "hu": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Legalább egy mező kitöltése kötelező: e-mail vagy telefonszám.",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Valami hiba történt. Kérjük, próbálja újra később"
    },
    "id": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Setidaknya satu bidang wajib diisi: email atau nomor telepon",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Terjadi kesalahan. Silakan coba lagi nanti"
    },
    "ja": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "少なくとも1つのフィールドが必須です：メールアドレスまたは電話番号",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "問題が発生しました。後でもう一度お試しください"
    },
    "ko": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "최소 한 칸 필수 입력: 이메일 또는 전화번호",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "문제가 발생했습니다. 나중에 다시 시도해 주세요"
    },
    "no": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Minst ett felt er obligatorisk: e-post eller telefonnummer",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Noe gikk galt. Vennligst prøv igjen senere"
    },
    "sk": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Aspoň jedno pole je povinné: e-mail alebo telefónne číslo",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Niečo sa pokazilo. Skúste to znova neskôr"
    },
    "sl": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Vsaj eno polje je obvezno: e-poštni naslov ali telefonska številka",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Nekaj ​​je šlo narobe. Poskusite znova pozneje"
    },
    "sr": {
      "control,validation,validationErrors,EMAIL_OR_PHONE_IS_REQUIRED": "Najmanje jedno polje je obavezno: e-pošta ili broj telefona",
      "control,validation,validationErrors,SUBMIT_REQUEST_FAILED": "Нешто је пошло наопако. Покушајте поново касније"
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
