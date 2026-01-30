export default {
  "name": "SysSocialComponent",
  "componentType": "SOCIAL",
  "version": "1.0.0",
  "events": {
    "dispatch": [],
    "listen": []
  },
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
            "name": "SOCIAL_ICON_SIZE",
            "propPath": ["control", "size", "desktop"]
          },
          {
            "type": "CONTROL",
            "name": "SOCIAL_TYPE_AND_ICON_SELECT",
            "propPath": ["control"]
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
            "name": "SOCIAL_ICON_SIZE",
            "propPath": ["control", "size", "mobile"]
          },
          {
            "type": "CONTROL",
            "name": "SOCIAL_TYPE_AND_ICON_SELECT",
            "propPath": ["control"]
          }
        ]
      }
    ],
    "general": [
      {
        "type": "CONTROL",
        "name": "ACTIONS",
        "propPath": [
          "handlers"
        ],
        "params": {
          "origin": true
        }
      }
    ]
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
  "props": {
    "control": {
      "options": [
        {
          "type": "FACEBOOK",
          "order": 0
        },
        {
          "type": "INSTAGRAM",
          "order": 1
        },
        {
          "type": "LINKEDIN",
          "order": 2
        },
        {
          "type": "TWITTER",
          "order": 3
        }
      ],
      "mode": "FOLLOW",
      "size": {
        desktop: 32,
        mobile: 32
      }
    },
    "adaptiveStyles": {
      "desktop": [
        {
          "element": "host",
          "styleAttributes": {}
        },
      ],
      "mobile": [
        {
          "element": "host",
          "styleAttributes": {}
        },
      ]
    },
  },
  "metaDescription": {
    "icon": "/SysSocialComponent/assets/img/social-component-icon.svg",
    "label": {
      "en": "Social",
      "ru": "Социальные сети",
      "uk": "Соціальні мережі",
      "es": "Social",
      "de": "Social",
      "fr": "Social",
      "it": "Social",
      "pt": "Social",
      "ro": "Social",
      "bg": "Social",
      "cs": "Social",
      "el": "Social",
      "nl": "Social",
      "pl": "Social",
      "sv": "Social",
      "tr": "Social",
      "ar": "Social",
      "zh": "社群媒体",
      "da": "Social",
      "he": "Social",
      "fi": "Social",
      "hi": "Social",
      "hr": "Social",
      "hu": "Social",
      "id": "Social",
      "ja": "Social",
      "ko": "Social",
      "no": "Social",
      "sk": "Social",
      "sl": "Social",
      "sr": "Social",
    }
  },
  "syncEnabled": true,
  "stylesImitationEnabled": true,
}
