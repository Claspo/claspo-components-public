import { cloneControlsToAllEnvs } from '@claspo/renderer/sdk/ManifestUtils';

export default {
  "name": "SysCountdownTimerComponent",
  "componentType": "COUNTDOWN_TIMER",
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
                  "fill"
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
                "element": "counter"
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
              "[element=counterContainer]",
              "styleAttributes"
            ],
          },
          {
            "type": "CONTROL",
            "name": "TEXT_COLOR",
            "propPath": [
              "styles",
              "[element=separator]",
              "styleAttributes",
              "color"
            ],
            "params": {
              "label": "DOCUMENT_SEPARATOR_COLOR"
            }
          },
          {
            "type": "CONTROL",
            "name": "BORDERS",
            "propPath": [
              "styles",
              "[element=counterContainer]",
              "styleAttributes",
            ],
          },
          {
            "type": "CONTROL",
            "name": "BOX_SHADOW",
            "propPath": [
              "styles",
              "[element=counterContainer]",
              "styleAttributes",
            ],
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "propPath": [
              "styles",
              "[element=counterContainer]",
              "styleAttributes",
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
                "element": "counter"
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
              "[element=counterContainer]",
              "styleAttributes",
            ],
          },
          {
            "type": "CONTROL",
            "name": "TEXT_COLOR",
            "propPath": [
              "styles",
              "[element=separator]",
              "styleAttributes",
              "color"
            ],
            "params": {
              "label": "DOCUMENT_SEPARATOR_COLOR"
            }
          },
          {
            "type": "CONTROL",
            "name": "BORDERS",
            "propPath": [
              "styles",
              "[element=counterContainer]",
              "styleAttributes",
            ],
          },
          {
            "type": "CONTROL",
            "name": "BOX_SHADOW",
            "propPath": [
              "styles",
              "[element=counterContainer]",
              "styleAttributes",
            ],
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "propPath": [
              "styles",
              "[element=counterContainer]",
              "styleAttributes",
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
        "name": "SELECT",
        "propPath": [
          "content",
          "format"
        ],
        "params": {
          "label": "DOCUMENT_DATE_FORMAT_TITLE",
          "options": [
            {
              "label": "DOCUMENT_COUNTDOWN_TIMER_FORMAT_DD_HH_MM_SS",
              "value": "DD:HH:MM:SS"
            },
            {
              "label": "DOCUMENT_COUNTDOWN_TIMER_FORMAT_HH_MM_SS",
              "value": "HH:MM:SS"
            },
            {
              "label": "DOCUMENT_COUNTDOWN_TIMER_FORMAT_MM_SS",
              "value": "MM:SS"
            },
            {
              "label": "DOCUMENT_COUNTDOWN_TIMER_FORMAT_SS",
              "value": "SS"
            },
          ]
        }
      },
      {
        "type": "CONTROL",
        "name": "DATEPICKER_COUNTDOWN_TIMER"
      },
      {
        "type": "CONTROL",
        "name": "SUPPORTED_LANGUAGES",
        "params": {
          "text": "DOCUMENT_COUNTDOWN_TIMER_LANGUAGES_DESCR"
        }
      }
    ]
  },
  "autoContrast": [
    {
      "slave": {
        "element": "counter",
        "elementProp": "styleAttributes",
        "elementSubProp": "color",
      },
      "master": {
        "element": "counterContainer",
        "propPath": [
          "styles",
          "[element=counterContainer]",
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
  'keepGeneralTabOpenUntilInteracted': true,
  "focusableElements": ["counter", "label"],
  "events": {
    "dispatch": [],
    "listen": []
  },
  "i18n": {
    "en": {
      "content,counterLabel,day,single": "Day",
      "content,counterLabel,day,upToFour": "Days",
      "content,counterLabel,day,fromFive": "Days",
      "content,counterLabel,hour,single": "Hour",
      "content,counterLabel,hour,upToFour": "Hours",
      "content,counterLabel,hour,fromFive": "Hours",
      "content,counterLabel,minute,single": "Minute",
      "content,counterLabel,minute,upToFour": "Minutes",
      "content,counterLabel,minute,fromFive": "Minutes",
      "content,counterLabel,second,single": "Second",
      "content,counterLabel,second,upToFour": "Seconds",
      "content,counterLabel,second,fromFive": "Seconds"
    },
    "ru": {
      "content,counterLabel,day,single": "День",
      "content,counterLabel,day,upToFour": "Дня",
      "content,counterLabel,day,fromFive": "Дней",
      "content,counterLabel,hour,single": "Час",
      "content,counterLabel,hour,upToFour": "Часа",
      "content,counterLabel,hour,fromFive": "Часов",
      "content,counterLabel,minute,single": "Минута",
      "content,counterLabel,minute,upToFour": "Минуты",
      "content,counterLabel,minute,fromFive": "Минут",
      "content,counterLabel,second,single": "Секунда",
      "content,counterLabel,second,upToFour": "Секунды",
      "content,counterLabel,second,fromFive": "Секунд"
    },
    "uk": {
      "content,counterLabel,day,single": "День",
      "content,counterLabel,day,upToFour": "Дні",
      "content,counterLabel,day,fromFive": "Днів",
      "content,counterLabel,hour,single": "Година",
      "content,counterLabel,hour,upToFour": "Години",
      "content,counterLabel,hour,fromFive": "Годин",
      "content,counterLabel,minute,single": "Хвилина",
      "content,counterLabel,minute,upToFour": "Хвилини",
      "content,counterLabel,minute,fromFive": "Хвилин",
      "content,counterLabel,second,single": "Секунда",
      "content,counterLabel,second,upToFour": "Секунди",
      "content,counterLabel,second,fromFive": "Секунд"
    },
    "de": {
      "content,counterLabel,day,single": "Tag",
      "content,counterLabel,day,upToFour": "Tage",
      "content,counterLabel,day,fromFive": "Tage",
      "content,counterLabel,hour,single": "Stunde",
      "content,counterLabel,hour,upToFour": "Stunden",
      "content,counterLabel,hour,fromFive": "Stunden",
      "content,counterLabel,minute,single": "Minute",
      "content,counterLabel,minute,upToFour": "Minuten",
      "content,counterLabel,minute,fromFive": "Minuten",
      "content,counterLabel,second,single": "Sekunde",
      "content,counterLabel,second,upToFour": "Sekunden",
      "content,counterLabel,second,fromFive": "Sekunden"
    },
    "es": {
      "content,counterLabel,day,single": "Día",
      "content,counterLabel,day,upToFour": "Días",
      "content,counterLabel,day,fromFive": "Días",
      "content,counterLabel,hour,single": "Hora",
      "content,counterLabel,hour,upToFour": "Horas",
      "content,counterLabel,hour,fromFive": "Horas",
      "content,counterLabel,minute,single": "Minuto",
      "content,counterLabel,minute,upToFour": "Minutos",
      "content,counterLabel,minute,fromFive": "Minutos",
      "content,counterLabel,second,single": "Segundo",
      "content,counterLabel,second,upToFour": "Segundos",
      "content,counterLabel,second,fromFive": "Segundos"
    },
    "fr": {
      "content,counterLabel,day,single": "Jour",
      "content,counterLabel,day,upToFour": "Jours",
      "content,counterLabel,day,fromFive": "Jours",
      "content,counterLabel,hour,single": "Heure",
      "content,counterLabel,hour,upToFour": "Heures",
      "content,counterLabel,hour,fromFive": "Heures",
      "content,counterLabel,minute,single": "Minute",
      "content,counterLabel,minute,upToFour": "Minutes",
      "content,counterLabel,minute,fromFive": "Minutes",
      "content,counterLabel,second,single": "Seconde",
      "content,counterLabel,second,upToFour": "Secondes",
      "content,counterLabel,second,fromFive": "Secondes"
    },
    "it": {
      "content,counterLabel,day,single": "Giorno",
      "content,counterLabel,day,upToFour": "Giorni",
      "content,counterLabel,day,fromFive": "Giorni",
      "content,counterLabel,hour,single": "Ora",
      "content,counterLabel,hour,upToFour": "Ore",
      "content,counterLabel,hour,fromFive": "Ore",
      "content,counterLabel,minute,single": "Minuto",
      "content,counterLabel,minute,upToFour": "Minuti",
      "content,counterLabel,minute,fromFive": "Minuti",
      "content,counterLabel,second,single": "Secondo",
      "content,counterLabel,second,upToFour": "Secondi",
      "content,counterLabel,second,fromFive": "Secondi"
    },
    "pt": {
      "content,counterLabel,day,single": "Dia",
      "content,counterLabel,day,upToFour": "Dias",
      "content,counterLabel,day,fromFive": "Dias",
      "content,counterLabel,hour,single": "Hora",
      "content,counterLabel,hour,upToFour": "Horas",
      "content,counterLabel,hour,fromFive": "Horas",
      "content,counterLabel,minute,single": "Minuto",
      "content,counterLabel,minute,upToFour": "Minutos",
      "content,counterLabel,minute,fromFive": "Minutos",
      "content,counterLabel,second,single": "Segundo",
      "content,counterLabel,second,upToFour": "Segundos",
      "content,counterLabel,second,fromFive": "Segundos"
    },
    "pt-BR": {
      "content,counterLabel,day,single": "Dia",
      "content,counterLabel,day,upToFour": "Dias",
      "content,counterLabel,day,fromFive": "Dias",
      "content,counterLabel,hour,single": "Hora",
      "content,counterLabel,hour,upToFour": "Horas",
      "content,counterLabel,hour,fromFive": "Horas",
      "content,counterLabel,minute,single": "Minuto",
      "content,counterLabel,minute,upToFour": "Minutos",
      "content,counterLabel,minute,fromFive": "Minutos",
      "content,counterLabel,second,single": "Segundo",
      "content,counterLabel,second,upToFour": "Segundos",
      "content,counterLabel,second,fromFive": "Segundos"
    },
    "sv": {
      "content,counterLabel,day,single": "Dag",
      "content,counterLabel,day,upToFour": "Dagar",
      "content,counterLabel,day,fromFive": "Dagar",
      "content,counterLabel,hour,single": "Timme",
      "content,counterLabel,hour,upToFour": "Timmar",
      "content,counterLabel,hour,fromFive": "Timmar",
      "content,counterLabel,minute,single": "Minutt",
      "content,counterLabel,minute,upToFour": "Minuter",
      "content,counterLabel,minute,fromFive": "Minuter",
      "content,counterLabel,second,single": "Sekund",
      "content,counterLabel,second,upToFour": "Sekunder",
      "content,counterLabel,second,fromFive": "Sekunder"
    },
    "et": {
      "content,counterLabel,day,single": "Päev",
      "content,counterLabel,day,upToFour": "Päeva",
      "content,counterLabel,day,fromFive": "Päeva",
      "content,counterLabel,hour,single": "Tund",
      "content,counterLabel,hour,upToFour": "Tundi",
      "content,counterLabel,hour,fromFive": "Tundi",
      "content,counterLabel,minute,single": "Minut",
      "content,counterLabel,minute,upToFour": "Minutit",
      "content,counterLabel,minute,fromFive": "Minutit",
      "content,counterLabel,second,single": "Sekund",
      "content,counterLabel,second,upToFour": "Sekundit",
      "content,counterLabel,second,fromFive": "Sekundit"
    },
    "lv": {
      "content,counterLabel,day,single": "Diena",
      "content,counterLabel,day,upToFour": "Dienas",
      "content,counterLabel,day,fromFive": "Dienas",
      "content,counterLabel,hour,single": "Stunda",
      "content,counterLabel,hour,upToFour": "Stundas",
      "content,counterLabel,hour,fromFive": "Stundas",
      "content,counterLabel,minute,single": "Minūte",
      "content,counterLabel,minute,upToFour": "Minūtes",
      "content,counterLabel,minute,fromFive": "Minūtes",
      "content,counterLabel,second,single": "Sekunde",
      "content,counterLabel,second,upToFour": "Sekundes",
      "content,counterLabel,second,fromFive": "Sekundes"
    },
    "pl": {
      "content,counterLabel,day,single": "Dzień",
      "content,counterLabel,day,upToFour": "Dni",
      "content,counterLabel,day,fromFive": "Dni",
      "content,counterLabel,hour,single": "Godzina",
      "content,counterLabel,hour,upToFour": "Godziny",
      "content,counterLabel,hour,fromFive": "Godzin",
      "content,counterLabel,minute,single": "Minuta",
      "content,counterLabel,minute,upToFour": "Minuty",
      "content,counterLabel,minute,fromFive": "Minut",
      "content,counterLabel,second,single": "Sekunda",
      "content,counterLabel,second,upToFour": "Sekundy",
      "content,counterLabel,second,fromFive": "Sekund"
    },
    "nl": {
      "content,counterLabel,day,single": "Dag",
      "content,counterLabel,day,upToFour": "Dagen",
      "content,counterLabel,day,fromFive": "Dagen",
      "content,counterLabel,hour,single": "Uur",
      "content,counterLabel,hour,upToFour": "Uren",
      "content,counterLabel,hour,fromFive": "Uren",
      "content,counterLabel,minute,single": "Minuut",
      "content,counterLabel,minute,upToFour": "Minuten",
      "content,counterLabel,minute,fromFive": "Minuten",
      "content,counterLabel,second,single": "Seconde",
      "content,counterLabel,second,upToFour": "Seconden",
      "content,counterLabel,second,fromFive": "Seconden"
    },
    "cz": {
      "content,counterLabel,day,single": "Den",
      "content,counterLabel,day,upToFour": "Dny",
      "content,counterLabel,day,fromFive": "Dní",
      "content,counterLabel,hour,single": "Hodina",
      "content,counterLabel,hour,upToFour": "Hodiny",
      "content,counterLabel,hour,fromFive": "Hodin",
      "content,counterLabel,minute,single": "Minuta",
      "content,counterLabel,minute,upToFour": "Minuty",
      "content,counterLabel,minute,fromFive": "Minut",
      "content,counterLabel,second,single": "Sekunda",
      "content,counterLabel,second,upToFour": "Sekundy",
      "content,counterLabel,second,fromFive": "Sekund"
    },
    "tr": {
      "content,counterLabel,day,single": "Gün",
      "content,counterLabel,day,upToFour": "Gün",
      "content,counterLabel,day,fromFive": "Gün",
      "content,counterLabel,hour,single": "Saat",
      "content,counterLabel,hour,upToFour": "Saat",
      "content,counterLabel,hour,fromFive": "Saat",
      "content,counterLabel,minute,single": "Dakika",
      "content,counterLabel,minute,upToFour": "Dakika",
      "content,counterLabel,minute,fromFive": "Dakika",
      "content,counterLabel,second,single": "Saniye",
      "content,counterLabel,second,upToFour": "Saniye",
      "content,counterLabel,second,fromFive": "Saniye"
    },
    "ro": {
      "content,counterLabel,day,single": "Zi",
      "content,counterLabel,day,upToFour": "Zile",
      "content,counterLabel,day,fromFive": "Zile",
      "content,counterLabel,hour,single": "Oră",
      "content,counterLabel,hour,upToFour": "Ore",
      "content,counterLabel,hour,fromFive": "Ore",
      "content,counterLabel,minute,single": "Minut",
      "content,counterLabel,minute,upToFour": "Minute",
      "content,counterLabel,minute,fromFive": "Minute",
      "content,counterLabel,second,single": "Secundă",
      "content,counterLabel,second,upToFour": "Secunde",
      "content,counterLabel,second,fromFive": "Secunde"
    },
    "vi": {
      "content,counterLabel,day,single": "Ngày",
      "content,counterLabel,day,upToFour": "Ngày",
      "content,counterLabel,day,fromFive": "Ngày",
      "content,counterLabel,hour,single": "Giờ",
      "content,counterLabel,hour,upToFour": "Giờ",
      "content,counterLabel,hour,fromFive": "Giờ",
      "content,counterLabel,minute,single": "Phút",
      "content,counterLabel,minute,upToFour": "Phút",
      "content,counterLabel,minute,fromFive": "Phút",
      "content,counterLabel,second,single": "Giây",
      "content,counterLabel,second,upToFour": "Giây",
      "content,counterLabel,second,fromFive": "Giây"
    },
    "zh": {
      "content,counterLabel,day,single": "天",
      "content,counterLabel,day,upToFour": "天",
      "content,counterLabel,day,fromFive": "天",
      "content,counterLabel,hour,single": "小時",
      "content,counterLabel,hour,upToFour": "小時",
      "content,counterLabel,hour,fromFive": "小時",
      "content,counterLabel,minute,single": "分鐘",
      "content,counterLabel,minute,upToFour": "分鐘",
      "content,counterLabel,minute,fromFive": "分鐘",
      "content,counterLabel,second,single": "秒",
      "content,counterLabel,second,upToFour": "秒",
      "content,counterLabel,second,fromFive": "秒"
    },
    "ms": {
      "content,counterLabel,day,single": "Hari",
      "content,counterLabel,day,upToFour": "Hari",
      "content,counterLabel,day,fromFive": "Hari",
      "content,counterLabel,hour,single": "Jam",
      "content,counterLabel,hour,upToFour": "Jam",
      "content,counterLabel,hour,fromFive": "Jam",
      "content,counterLabel,minute,single": "Minit",
      "content,counterLabel,minute,upToFour": "Minit",
      "content,counterLabel,minute,fromFive": "Minit",
      "content,counterLabel,second,single": "Saat",
      "content,counterLabel,second,upToFour": "Saat",
      "content,counterLabel,second,fromFive": "Saat"
    },
    "ar": {
      "content,counterLabel,day,single": "يوما",
      "content,counterLabel,day,upToFour": "يومان",
      "content,counterLabel,day,fromFive": "أيام",
      "content,counterLabel,hour,single": "ساعة",
      "content,counterLabel,hour,upToFour": "ساعتين",
      "content,counterLabel,hour,fromFive": "ساعات",
      "content,counterLabel,minute,single": "دقيقة",
      "content,counterLabel,minute,upToFour": "دقيقتين",
      "content,counterLabel,minute,fromFive": "دقائق",
      "content,counterLabel,second,single": "ثانية",
      "content,counterLabel,second,upToFour": "ثانيتين",
      "content,counterLabel,second,fromFive": "ثواني"
    },
    "th": {
      "content,counterLabel,day,single": "วัน",
      "content,counterLabel,day,upToFour": "วัน",
      "content,counterLabel,day,fromFive": "วัน",
      "content,counterLabel,hour,single": " ชั่วโมง",
      "content,counterLabel,hour,upToFour": " ชั่วโมง",
      "content,counterLabel,hour,fromFive": " ชั่วโมง",
      "content,counterLabel,minute,single": "นาที",
      "content,counterLabel,minute,upToFour": "นาที",
      "content,counterLabel,minute,fromFive": "นาที",
      "content,counterLabel,second,single": "วินาที",
      "content,counterLabel,second,upToFour": "วินาที",
      "content,counterLabel,second,fromFive": "วินาที"
    },
    "bs": {
      "content,counterLabel,day,single": "Dan",
      "content,counterLabel,day,upToFour": "Dani",
      "content,counterLabel,day,fromFive": "Dana",
      "content,counterLabel,hour,single": "Sat",
      "content,counterLabel,hour,upToFour": "Sati",
      "content,counterLabel,hour,fromFive": "Sati",
      "content,counterLabel,minute,single": "Minuta",
      "content,counterLabel,minute,upToFour": "Minute",
      "content,counterLabel,minute,fromFive": "Minuta",
      "content,counterLabel,second,single": "Sekundi",
      "content,counterLabel,second,upToFour": "Sekunde",
      "content,counterLabel,second,fromFive": "Sekundi"
    },
    "bg": {
      "content,counterLabel,day,single": "Дeн",
      "content,counterLabel,day,upToFour": "Дни",
      "content,counterLabel,day,fromFive": "Дни",
      "content,counterLabel,hour,single": "Час",
      "content,counterLabel,hour,upToFour": "Часа",
      "content,counterLabel,hour,fromFive": "Часа",
      "content,counterLabel,minute,single": "Минута",
      "content,counterLabel,minute,upToFour": "Минути",
      "content,counterLabel,minute,fromFive": "Минути",
      "content,counterLabel,second,single": "Секунда",
      "content,counterLabel,second,upToFour": "Секунди",
      "content,counterLabel,second,fromFive": "Секунди"
    },
    "lt": {
      "content,counterLabel,day,single": "Diena",
      "content,counterLabel,day,upToFour": "Dienos",
      "content,counterLabel,day,fromFive": "Dienos",
      "content,counterLabel,hour,single": "Valanda",
      "content,counterLabel,hour,upToFour": "Valandos",
      "content,counterLabel,hour,fromFive": "Valandos",
      "content,counterLabel,minute,single": "Minutė",
      "content,counterLabel,minute,upToFour": "Minutės",
      "content,counterLabel,minute,fromFive": "Minutės",
      "content,counterLabel,second,single": "Sekundė",
      "content,counterLabel,second,upToFour": "Sekundės",
      "content,counterLabel,second,fromFive": "Sekundės"
    },
    "cs": {
      "content,counterLabel,day,single": "Den",
      "content,counterLabel,day,upToFour": "Dny",
      "content,counterLabel,day,fromFive": "Dní",
      "content,counterLabel,hour,single": "Hodina",
      "content,counterLabel,hour,upToFour": "Hodiny",
      "content,counterLabel,hour,fromFive": "Hodin",
      "content,counterLabel,minute,single": "Minuta",
      "content,counterLabel,minute,upToFour": "Minuty",
      "content,counterLabel,minute,fromFive": "Minut",
      "content,counterLabel,second,single": "Sekunda",
      "content,counterLabel,second,upToFour": "Sekundy",
      "content,counterLabel,second,fromFive": "Sekund"
    },
    "el": {
      "content,counterLabel,day,single": "ημέρα",
      "content,counterLabel,day,upToFour": "ημέρες",
      "content,counterLabel,day,fromFive": "μέρες",
      "content,counterLabel,hour,single": "ώρα",
      "content,counterLabel,hour,upToFour": "ώρες",
      "content,counterLabel,hour,fromFive": "ώρες",
      "content,counterLabel,minute,single": "λεπτό",
      "content,counterLabel,minute,upToFour": "λεπτά",
      "content,counterLabel,minute,fromFive": "λεπτά",
      "content,counterLabel,second,single": "δευτερόλεπτο",
      "content,counterLabel,second,upToFour": "δευτερόλεπτα",
      "content,counterLabel,second,fromFive": "δευτερόλεπτα"
    },
    "da": {
      "content,counterLabel,day,single": "Dag",
      "content,counterLabel,day,upToFour": "Dage",
      "content,counterLabel,day,fromFive": "Dage",
      "content,counterLabel,hour,single": "Time",
      "content,counterLabel,hour,upToFour": "Timer",
      "content,counterLabel,hour,fromFive": "Timer",
      "content,counterLabel,minute,single": "Minut",
      "content,counterLabel,minute,upToFour": "Minutter",
      "content,counterLabel,minute,fromFive": "Minutter",
      "content,counterLabel,second,single": "Sekund",
      "content,counterLabel,second,upToFour": "Sekunder",
      "content,counterLabel,second,fromFive": "Sekunder"
    },
    "he": {
      "content,counterLabel,day,single": "יום",
      "content,counterLabel,day,upToFour": "ימים",
      "content,counterLabel,day,fromFive": "ימים",
      "content,counterLabel,hour,single": "שעה",
      "content,counterLabel,hour,upToFour": "שעות",
      "content,counterLabel,hour,fromFive": "שעות",
      "content,counterLabel,minute,single": "דקה",
      "content,counterLabel,minute,upToFour": "דקות",
      "content,counterLabel,minute,fromFive": "דקות",
      "content,counterLabel,second,single": "שנייה",
      "content,counterLabel,second,upToFour": "שניות",
      "content,counterLabel,second,fromFive": "שניות"
    },
    "fi": {
      "content,counterLabel,day,single": "Päivä",
      "content,counterLabel,day,upToFour": "Päivää",
      "content,counterLabel,day,fromFive": "Päivää",
      "content,counterLabel,hour,single": "Tunti",
      "content,counterLabel,hour,upToFour": "Tuntia",
      "content,counterLabel,hour,fromFive": "Tuntia",
      "content,counterLabel,minute,single": "Minuutti",
      "content,counterLabel,minute,upToFour": "Minuuttia",
      "content,counterLabel,minute,fromFive": "Minuuttia",
      "content,counterLabel,second,single": "Sekunti",
      "content,counterLabel,second,upToFour": "Sekuntia",
      "content,counterLabel,second,fromFive": "Sekuntia"
    },
    "hi": {
      "content,counterLabel,day,single": "दिन ",
      "content,counterLabel,day,upToFour": "दिन ",
      "content,counterLabel,day,fromFive": "दिन ",
      "content,counterLabel,hour,single": "घंटा ",
      "content,counterLabel,hour,upToFour": "घंटे ",
      "content,counterLabel,hour,fromFive": "घंटे ",
      "content,counterLabel,minute,single": "मिनट ",
      "content,counterLabel,minute,upToFour": "मिनट",
      "content,counterLabel,minute,fromFive": "मिनट ",
      "content,counterLabel,second,single": "सेकंड",
      "content,counterLabel,second,upToFour": "सेकंड",
      "content,counterLabel,second,fromFive": "सेकंड"
    },
    "hr": {
      "content,counterLabel,day,single": "Dan",
      "content,counterLabel,day,upToFour": "Dani",
      "content,counterLabel,day,fromFive": "Dani",
      "content,counterLabel,hour,single": "Sat",
      "content,counterLabel,hour,upToFour": "Sati",
      "content,counterLabel,hour,fromFive": "Sati",
      "content,counterLabel,minute,single": "Minuta",
      "content,counterLabel,minute,upToFour": "Minute",
      "content,counterLabel,minute,fromFive": "Minute",
      "content,counterLabel,second,single": "Sekunda",
      "content,counterLabel,second,upToFour": "Sekunde",
      "content,counterLabel,second,fromFive": "Sekunde"
    },
    "hu": {
      "content,counterLabel,day,single": "Nap",
      "content,counterLabel,day,upToFour": "Nap",
      "content,counterLabel,day,fromFive": "Nap",
      "content,counterLabel,hour,single": "Óra",
      "content,counterLabel,hour,upToFour": "Óra",
      "content,counterLabel,hour,fromFive": "Óra",
      "content,counterLabel,minute,single": "Perc",
      "content,counterLabel,minute,upToFour": "Perc",
      "content,counterLabel,minute,fromFive": "Perc",
      "content,counterLabel,second,single": "Másodperc",
      "content,counterLabel,second,upToFour": "Másodperc",
      "content,counterLabel,second,fromFive": "Másodperc"
    },
    "id": {
      "content,counterLabel,day,single": "Hari",
      "content,counterLabel,day,upToFour": "Hari",
      "content,counterLabel,day,fromFive": "Hari",
      "content,counterLabel,hour,single": "Jam",
      "content,counterLabel,hour,upToFour": "Jam",
      "content,counterLabel,hour,fromFive": "Jam",
      "content,counterLabel,minute,single": "Menit",
      "content,counterLabel,minute,upToFour": "Menit",
      "content,counterLabel,minute,fromFive": "Menit",
      "content,counterLabel,second,single": "Detik",
      "content,counterLabel,second,upToFour": "Detik",
      "content,counterLabel,second,fromFive": "Detik"
    },
    "ja": {
      "content,counterLabel,day,single": "日",
      "content,counterLabel,day,upToFour": "日",
      "content,counterLabel,day,fromFive": "日",
      "content,counterLabel,hour,single": "時間",
      "content,counterLabel,hour,upToFour": "時間",
      "content,counterLabel,hour,fromFive": "時間",
      "content,counterLabel,minute,single": "分",
      "content,counterLabel,minute,upToFour": "分",
      "content,counterLabel,minute,fromFive": "分",
      "content,counterLabel,second,single": "秒",
      "content,counterLabel,second,upToFour": "秒",
      "content,counterLabel,second,fromFive": "秒"
    },
    "ko": {
      "content,counterLabel,day,single": "일",
      "content,counterLabel,day,upToFour": "일",
      "content,counterLabel,day,fromFive": "일",
      "content,counterLabel,hour,single": "시",
      "content,counterLabel,hour,upToFour": "시",
      "content,counterLabel,hour,fromFive": "시",
      "content,counterLabel,minute,single": "분",
      "content,counterLabel,minute,upToFour": "분",
      "content,counterLabel,minute,fromFive": "분",
      "content,counterLabel,second,single": "초",
      "content,counterLabel,second,upToFour": "초",
      "content,counterLabel,second,fromFive": "초"
    },
    "no": {
      "content,counterLabel,day,single": "Dag",
      "content,counterLabel,day,upToFour": "Dager",
      "content,counterLabel,day,fromFive": "Dager",
      "content,counterLabel,hour,single": "Time",
      "content,counterLabel,hour,upToFour": "Timer",
      "content,counterLabel,hour,fromFive": "Timer",
      "content,counterLabel,minute,single": "Minutt",
      "content,counterLabel,minute,upToFour": "Minutter",
      "content,counterLabel,minute,fromFive": "Minutter",
      "content,counterLabel,second,single": "Sekund",
      "content,counterLabel,second,upToFour": "Sekunder",
      "content,counterLabel,second,fromFive": "Sekunder"
    },
    "sk": {
      "content,counterLabel,day,single": "Deň",
      "content,counterLabel,day,upToFour": "Dni",
      "content,counterLabel,day,fromFive": "Dní",
      "content,counterLabel,hour,single": "Hodina",
      "content,counterLabel,hour,upToFour": "Hodiny",
      "content,counterLabel,hour,fromFive": "Hodín",
      "content,counterLabel,minute,single": "Minúta",
      "content,counterLabel,minute,upToFour": "Minúty",
      "content,counterLabel,minute,fromFive": "Minút",
      "content,counterLabel,second,single": "Sekunda",
      "content,counterLabel,second,upToFour": "Sekundy",
      "content,counterLabel,second,fromFive": "Sekúnd"
    },
    "sl": {
      "content,counterLabel,day,single": "Dan",
      "content,counterLabel,day,upToFour": "Dni",
      "content,counterLabel,day,fromFive": "Dni",
      "content,counterLabel,hour,single": "Ura",
      "content,counterLabel,hour,upToFour": "Ure",
      "content,counterLabel,hour,fromFive": "Ur",
      "content,counterLabel,minute,single": "Minuta",
      "content,counterLabel,minute,upToFour": "Minute",
      "content,counterLabel,minute,fromFive": "Minut",
      "content,counterLabel,second,single": "Skunda",
      "content,counterLabel,second,upToFour": "Sekunde",
      "content,counterLabel,second,fromFive": "Sekund"
    },
    "sr": {
      "content,counterLabel,day,single": "Dan",
      "content,counterLabel,day,upToFour": "Dani",
      "content,counterLabel,day,fromFive": "Dani",
      "content,counterLabel,hour,single": "Sat",
      "content,counterLabel,hour,upToFour": "Sati",
      "content,counterLabel,hour,fromFive": "Sati",
      "content,counterLabel,minute,single": "Minut",
      "content,counterLabel,minute,upToFour": "Minuti",
      "content,counterLabel,minute,fromFive": "Minuti",
      "content,counterLabel,second,single": "Sekunda",
      "content,counterLabel,second,upToFour": "Sekunde",
      "content,counterLabel,second,fromFive": "Sekunde"
    },
  },
  "props": {
    "content": {
      "endDate": "",
      "timeZone": null,
      "mode": "UNTIL_THE_EXPIRATION_DATE",
      "lengthFromTheStart": "00.00.10.00",
      "isShowAgainAllowed": true,
      "showAgainMode": "NEXT_SESSION",
      "showAgainAmount": 1,
      "showAgainUnit": "DAYS",
      "textContrastEnabled": true,
      "format": "HH:MM:SS",
    },
    "control": {
      "icon": ""
    },
    "styles": [
      {
        "element": "counterContainer",
        "styleAttributes": {
          "background": "rgb(255, 255, 255, 0.2)",
          "borderTopStyle": "solid",
          "borderRightStyle": "solid",
          "borderBottomStyle": "solid",
          "borderLeftStyle": "solid",
          "borderTopWidth": "2px",
          "borderTopColor": "rgba(0, 0, 0, 0.1)",
          "borderBottomWidth": "2px",
          "borderBottomColor": "rgba(0, 0, 0, 0.1)",
          "borderLeftWidth": "2px",
          "borderLeftColor": "rgba(0, 0, 0, 0.1)",
          "borderRightWidth": "2px",
          "borderRightColor": "rgba(0, 0, 0, 0.1)",
          "borderTopLeftRadius": "6px",
          "borderTopRightRadius": "6px",
          "borderBottomLeftRadius": "6px",
          "borderBottomRightRadius": "6px",
          "boxShadow": "none"
        },
        "classes": ""
      },
      {
        "element": "separator",
        "styleAttributes": {
          "color": "rgb(68, 68, 68)"
        },
        "classes": ""
      }
    ],
    "adaptiveStyles": {
      "desktop": [
        {
          "element": "host",
          "styleAttributes": {
            "width": "220px",
            "minWidth": "220px",
            "height": "auto",
            "minHeight": null,
            "marginTop": "0px",
            "marginBottom": "0px",
            "marginLeft": "0px",
            "marginRight": "0px",
            "_marginEnabled": false,
          },
          "classes": ""
        },
        {
          "element": "counter",
          "styleAttributes": {
            "color": "rgb(0, 0, 0)",
            "textAlign": "center",
            "lineHeight": "120%",
            "fontWeight": "700",
            "fontSize": "20px",
            "textShadow": "none"
          },
          "classes": ""
        },
        {
          "element": "label",
          "styleAttributes": {
            "color": "rgb(68, 68, 68)",
            "textAlign": "center",
            "lineHeight": "120%",
            "fontWeight": "400",
            "fontSize": "12px",
            "textShadow": "none"
          },
          "classes": ""
        },
      ],
      "mobile": [
        {
          "element": "host",
          "styleAttributes": {
            "width": "220px",
            "minWidth": "220px",
            "height": "auto",
            "minHeight": null,
            "marginTop": "0px",
            "marginBottom": "0px",
            "marginLeft": "0px",
            "marginRight": "0px",
            "_marginEnabled": false,
          },
          "classes": ""
        },
        {
          "element": "counter",
          "styleAttributes": {
            "color": "rgb(0, 0, 0)",
            "textAlign": "center",
            "lineHeight": "120%",
            "fontWeight": "700",
            "fontSize": "20px",
            "textShadow": "none"
          },
          "classes": ""
        },
        {
          "element": "label",
          "styleAttributes": {
            "color": "rgb(68, 68, 68)",
            "textAlign": "center",
            "lineHeight": "120%",
            "fontWeight": "400",
            "fontSize": "12px",
            "textShadow": "none"
          },
          "classes": ""
        },
      ]
    }
  },
  "metaDescription": {
    "icon": "/SysCountdownTimerComponent/assets/img/component-icon.svg",
    "label": {
      "en": "Countdown timer",
      "ru": "Таймер обратного отсчета",
      "uk": "Таймер зворотного відліку",
      "es": "Contador regresivo",
      "fr": "Compte à rebours",
      "de": "Countdown-Timer",
      "it": "Conto alla rovescia",
      "pt": "Temporizador",
      "ro": "Cronometru de numărătoare inversă",
      "bg": "Таймер за обратно броене",
      "cs": "Čas odpočítávání",
      "el": "Χρονόμετρο αντίστροφης μέτρησης",
      "nl": "Afteltimer",
      "pl": "Czasomierz odliczania",
      "sv": "Nedräkning tidtagare",
      "tr": "Geri sayım saati",
      "ar": "العد التنازلي",
      "zh": "倒计时",
      "da": "Nedtællingstimer",
      "he": "טיימר ספירה לאחור",
      "fi": "Ajastin",
      "hi": "काउंटडाउन टाइमर",
      "hr": "Odbrojavanje vremena",
      "hu": "Visszaszámláló időzítő",
      "id": "Penghitung waktu mundur",
      "ja": "カウントダウンタイマー",
      "ko": "카운트다운 타이머",
      "no": "Nedtellingstidtaker",
      "sk": "Časovač odpočítavania",
      "sl": "Odštevalnik časa",
      "sr": "Tajmer za odbrojavanje"
    }
  },
  "syncEnabled": true,
  "stylesImitationEnabled": true,
}
