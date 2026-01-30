export default {
  "name": "SysVideoComponent",
  "componentType": "VIDEO",
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
                  "fill"
                ]
              }
            }
          },
          {
            "type": "CONTROL",
            "name": "BORDERS",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
          },
          {
            "type": "CONTROL",
            "name": "BOX_SHADOW",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
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
                  "fill"
                ]
              }
            }
          },
          {
            "type": "CONTROL",
            "name": "BORDERS",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
          },
          {
            "type": "CONTROL",
            "name": "BOX_SHADOW",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
            ],
          },
          {
            "type": "CONTROL",
            "name": "BORDER_RADIUS",
            "propPath": [
              "styles",
              "[element=host]",
              "styleAttributes"
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
        "name": "VIDEO_URL",
        "propPath": [
          "control",
          "youtubeUrl"
        ],
        "params": {
          "label": "DOCUMENT_YOUTUBE_URL",
          "placeholder": "https://www.youtube.com/watch..."
        }
      },
      {
        "type": "CONTROL",
        "name": "SWITCH",
        "propPath": [
          "content",
          "autoplay"
        ],
        "params": {
          "label": "DOCUMENT_AUTOPLAY",
          "boldLabel": true,
          "description": "DOCUMENT_AUTOPLAY_DESCRIPTION"
        }
      },
      {
        "type": "CONTROL",
        "name": "VIDEO_CUSTOM_COVER",
        "elementProp": "styleAttributes",
        "element": "overlay",
        "params": {
          "aspectRatioPropPath": [
            "content",
            "aspectRatio"
          ],
          "showPlayButtonPropPath": [
            "content",
            "showPlayButton"
          ]
        }
      }
    ]
  },
  "events": {
    "dispatch": [],
    "listen": []
  },
  "i18nPropertyPaneModel": {
    "content": [
      {
        "type": "CONTROL",
        "name": "VIDEO_URL",
        "propPath": [
          "control",
          "youtubeUrl"
        ],
        "params": {
          "label": "DOCUMENT_YOUTUBE_URL",
          "placeholder": "https://www.youtube.com/watch..."
        }
      }
    ]
  },
  "i18nPropPaths": [
    "control,youtubeUrl",
    "content,videoId",
    "content,aspectRatio"
  ],
  "i18n": {},
  "props": {
    "content": {
      "videoId": null,
      "autoplay": false,
      "aspectRatio": 1.7777777777777777,
      "videoPreviewImageUrl": null,
      "showPlayButton": true
    },
    "control": {},
    "styles": [
      {
        "element": "host",
        "styleAttributes": {
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
          "borderTopLeftRadius": "0px",
          "borderTopRightRadius": "0px",
          "borderBottomLeftRadius": "0px",
          "borderBottomRightRadius": "0px",
          "boxShadow": "none",
        },
        "classes": ""
      }
    ],
    "adaptiveStyles": {
      "desktop": [
        {
          "element": "host",
          "styleAttributes": {
            "width": "350px",
            "minWidth": "350px",
            "height": "197px",
            "minHeight": "197px",
            "marginTop": "0px",
            "marginBottom": "0px",
            "marginLeft": "0px",
            "marginRight": "0px",
            "_marginEnabled": false,
            "overflow": "hidden"
          },
          "classes": ""
        },
        {
          "element": "overlay",
          "styleAttributes": {
            "background": null
          },
          "classes": ""
        }
      ],
      "mobile": [
        {
          "element": "host",
          "styleAttributes": {
            "width": "350px",
            "minWidth": "350px",
            "height": "197px",
            "minHeight": "197px",
            "marginTop": "0px",
            "marginBottom": "0px",
            "marginLeft": "0px",
            "marginRight": "0px",
            "_marginEnabled": false,
            "overflow": "hidden"
          },
          "classes": ""
        },
        {
          "element": "overlay",
          "styleAttributes": {
            "background": null
          },
          "classes": ""
        }
      ]
    }
  },
  "metaDescription": {
    "icon": "/SysVideoComponent/assets/img/video-component-icon.svg",
    "label": {
      "en": "Video",
      "ru": "Видео",
      "uk": "Вiдео",
      "es": "Video",
      "de": "Video",
      "fr": "Vidéo",
      "it": "Video",
      "pt": "Vídeo",
      "ro": "Video",
      "bg": "Видео",
      "cs": "Rádio",
      "el": "Ραδιόφωνο",
      "nl": "Radio",
      "pl": "Radio",
      "sv": "Radio",
      "tr": "Video",
      "ar": "الفيديو",
      "zh": "视频",
      "da": "Video",
      "he": "וידאו",
      "fi": "Video",
      "hi": "वीडियो",
      "hr": "Video",
      "hu": "Videó",
      "id": "Video",
      "ja": "ビデオ",
      "ko": "비디오",
      "no": "Video",
      "sk": "Video",
      "sl": "Video",
      "sr": "Video zapis"
    }
  },
  "syncEnabled": true,
  "stylesImitationEnabled": true,
}
