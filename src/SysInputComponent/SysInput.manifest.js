import {cloneControlsToAllEnvs} from '@claspo/renderer/sdk/ManifestUtils';

export default {
  "name": "SysInputComponent",
  "componentType": "INPUT",
  "version": "1.0.0",
  "mappingTypes": ["TEXT", "INTEGER", "FLOAT"],
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
            "showPlaceholderControl": true,
            "isLineSpaceAvailable": true,
            "isTextTransformAvailable": true,
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
        "displayCondition": "const controlName = sdk.component.getProps().control.name; return !['email', 'phone', 'first_name', 'last_name'].includes(controlName);",
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
          "required": true,
          "options": [
            {
              "label": "not selected",
              "value": null
            },
            {
              "label": "email",
              "value": "EMAIL"
            },
            {
              "label": "name",
              "value": "SYS_NAME"
            }
          ],
          "validationErrors": {
            "EMAIL": [
              {
                "key": "EMAIL_IS_INVALID",
                "value": "Email is invalid"
              },
              {
                "key": "MAX_LENGTH_50",
                "value": "Maximum length is 50"
              }
            ],
            "SYS_NAME": [
              {
                "key": "NAME_CONTAINS_NUMBERS",
                "value": "Name contains numbers"
              },
              {
                "key": "NAME_CONTAINS_FORBIDDEN_CHARACTERS",
                "value": "Name contains forbidden characters"
              },
              {
                "key": "MAX_LENGTH_40",
                "value": "Maximum length is 40"
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
    "content,suggestionLabel",
    "content,placeholder"
  ],
  "i18n": {
    "en": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Up to 3 words comprising up to 3 characters",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Up to 3 words comprising more than 3 characters",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Invalid characters used: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "3 digits maximum",
      "control,validation,validationErrors,MAX_LENGTH_40": "Maximum length is 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Maximum length is 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Add alphabetical characters",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "Email is invalid",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Emails with this domain are not acceptable. Please use a business email address",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "No more than 4 numbers are allowed",
      "control,validation,validationErrors,REQUIRED": "Required field",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Maximum length is 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Allowed one dot at the end of words not longer than 3 characters. Like: Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "Did you mean"
    },
    "ru": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "До 3 слов до 3 символов каждое",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "До 3 слов более 3 символов каждое",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Недопустимые символы: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "До 3 цифр",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Name consisting only of numbers and special characters is not allowed",
      "control,validation,validationErrors,MAX_LENGTH_40": "Максимальная длина 40 символов",
      "control,validation,validationErrors,MAX_LENGTH_50": "Максимальная длина 50 символов",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "Неверно заполнен Email",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Email с таким доменом не может быть использован. Пожалуйста, используйте корпоративный email",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>До 40 алфавитных символов.</p><p>Также допускаются:</p><ul><li>апострофы «'»</li><li>дефисы «-»</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Допускается не более 4 цифры",
      "control,validation,validationErrors,REQUIRED": "Обязательное поле",
      "control,validation,validationErrors,INTEGER_FORMAT": "Значение должно быть целым числом",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Минимальное значение -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Максимальное значение 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Значение должно быть числом с разделителем точкой",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Максимальная длина 1000 символов",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Разрешена одна точка в конце слов, не превышающих 3 символа. Например: Jr.",
      "content,label": "Заголовок",
      "content,suggestionLabel": "Вы имели в виду"
    },
    "uk": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "До 3-х слів до 3-х символів кожне",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "До 3-х слів більш ніж 3 символи кожне",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Заборонені символи: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "До 3 цифр",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Додайте алфавітні символи",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "Неправильно заповнено Email",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Email-адреса з таким доменом не може бути використана. Будь ласка, використовуйте корпоративну email-адресу",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>До 40 алфавітних символів.</p><p>Також дозволяються:</p><ul><li>апострофи «'»</li><li>дефіси «-»</li></ul>",
      "control,validation,validationErrors,MAX_LENGTH_40": "Максимальна довжина 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Максимальна довжина 50",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Допускається не більше 4 цифри",
      "control,validation,validationErrors,REQUIRED": "Обов'язкове поле",
      "control,validation,validationErrors,INTEGER_FORMAT": "Значення має бути цілим числом",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Мінімальне значення -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Максимальне значення 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Значення має бути цілим числом с роздільником крапкою",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Максимальна довжина 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Дозволено ставити одну крапку в кінці слів, що містять не більше 3 символів. Наприклад: Jr.",
      "content,label": "Заголовок",
      "content,suggestionLabel": "Ви мали на увазi"
    },
    "es": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Hasta 3 palabras que comprenden hasta 3 caracteres",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Hasta 3 palabras de más de 3 caracteres",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Caracteres no válidos utilizados: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "3 dígitos máximo",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Añadir caracteres alfabéticos",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "Este email no es válido",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "No se aceptan correos electrónicos con este dominio. Utilice una dirección de correo electrónico comercial",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Máximo 40 caracteres alfabéticos.</p><p>Están premitidos:</p><ul><li>apóstrofes (')</li><li>guiones (-)</li></ul>",
      "control,validation,validationErrors,MAX_LENGTH_40": "Longitud máxima es de 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Logitud máxima es de 50",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "No están permitidos más de 4 números",
      "control,validation,validationErrors,REQUIRED": "Campo obligatorio",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Longitud máxima es de 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Se permite un punto al final de las palabras que no tengan más de 3 caracteres. Por ejemplo: Jr.",
      "content,label": "Título",
      "content,suggestionLabel": "Quiso decir"
    },
    "de": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Bis zu 3 Wörter mit bis zu 3 Zeichen",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Bis zu 3 Wörter mit mehr als 3 Zeichen",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Ungültige Zeichen verwendet: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Maximal 3 Ziffern",
      "control,validation,validationErrors,MAX_LENGTH_40": "Maximale Länge beträgt 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Maximale Länge beträgt 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Alphabetische Zeichen hinzufügen",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "E-Mail-Adresse ist ungültig",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "E-Mails mit dieser Domain werden nicht akzeptiert. Bitte verwenden Sie eine geschäftliche E-Mail-Adresse",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "Maximal 40 alphabetische Zeichen ohne Leerzeichen, auch Apostrophe und Bindestriche sind erlaubt.",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Es sind nicht mehr als 4 Nummern erlaubt",
      "control,validation,validationErrors,REQUIRED": "Pflichtfeld",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Maximale Länge beträgt 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Ein Punkt am Ende von Wörtern mit maximal 3 Zeichen ist zulässig. Beispiel: Jr.",
      "content,label": "Titel",
      "content,suggestionLabel": "Meinten Sie"
    },
    "fr": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Jusqu'à 3 mots comprenant jusqu'à 3 caractères",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Jusqu'à 3 mots comprenant plus de 3 caractères",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Caractères non valides utilisés: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "3 chiffres maximum",
      "control,validation,validationErrors,MAX_LENGTH_40": "La longueur maximale est de 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "La longueur maximale est de 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Ajouter des caractères alphabétiques",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "Le courriel est invalide",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Les e-mails avec ce nom de domaine ne sont pas acceptables. Veuillez utiliser une adresse e-mail professionnelle",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "Max 40 caractères alphabétiques sans espaces. Également autorisés : apostrophes, tirets.",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Pas plus de 4 numéros sont autorisés",
      "control,validation,validationErrors,REQUIRED": "Champs requis",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "La longueur maximale est de 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Un seul point est autorisé à la fin des mots ne comportant pas plus de 3 caractères. Exemple : Jr.",
      "content,label": "Titre",
      "content,suggestionLabel": "Vouliez-vous dire"
    },
    "it": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Fino a 3 parole composte da un massimo di 3 caratteri",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Fino a 3 parole composte da più di 3 caratteri",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Caratteri non validi utilizzati: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "3 cifre massimo",
      "control,validation,validationErrors,MAX_LENGTH_40": "La lunghezza massima è 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "La lunghezza massima è 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Aggiunga caratteri alfabetici",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "L'email non è valida",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Le email con questo dominio non sono accettate. Utilizzare un indirizzo email aziendale",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "Massimo 40 caratteri alfabetici senza spazi. Consentiti anche apostrofi e trattini",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Non sono ammessi più di 4 numeri",
      "control,validation,validationErrors,REQUIRED": "Campo obbligatorio",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "La lunghezza massima è 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "È consentito un punto alla fine delle parole che non superano i 3 caratteri. Ad esempio: Jr.",
      "content,label": "Titolo",
      "content,suggestionLabel": "Intendevi"
    },
    "pt": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Até 3 palavras com até 3 caracteres",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Até 3 palavras com mais de 3 caracteres",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Caracteres inválidos usados: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Máximo de 3 dígitos",
      "control,validation,validationErrors,MAX_LENGTH_40": "Comprimento máximo de 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Comprimento máximo de 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Adicionar caracteres alfabéticos",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "Email inválido",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Os emails com este domínio não são aceites. Utilize um endereço de email profissional",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "Máximo de 40 caracteres alfabéticos sem espaços. Também permitido: apóstrofes, hífens",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Não são permitidos mais de 4 espaços",
      "control,validation,validationErrors,REQUIRED": "Campo obrigatório",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Comprimento máximo de 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Permitido um ponto no final de palavras com no máximo 3 caracteres. Por exemplo: Jr.",
      "content,label": "Título",
      "content,suggestionLabel": "Quiz dizer"
    },
    "ro": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Până la 3 cuvinte care să conțină cel mult 3 caractere",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Până la 3 cuvinte care să conțină mai mult de 3 caractere",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Caractere nevalide folosite: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Cel mult 3 cifre",
      "control,validation,validationErrors,MAX_LENGTH_40": "Lungimea maximă este de 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Lungimea maximă este de 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Adăugați caractere alfabetice",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "Emailul nu este valid",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "E-mailurile cu acest domeniu nu sunt acceptabile. Vă rugăm să folosiți o adresă de e-mail de afaceri",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "Cel mult 40 de caractere alfabetice fără spații. Sunt permise și apostrofuri, cratime.",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Nu sunt permise mai mult de 4 cifre",
      "control,validation,validationErrors,REQUIRED": "Câmp obligatoriu",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Lungimea maximă este de 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Se permite un singur punct la sfârșitul cuvintelor care nu au mai mult de 3 caractere. De exemplu: Jr.",
      "content,label": "Titlu",
      "content,suggestionLabel": "Ai vrut să spui"
    },
    "bg": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "До 3 думи, съдържащи до 3 символа",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "До 3 думи, състоящи се от повече от 3 символа",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Използвани са невалидни: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "3 цифри максимум",
      "control,validation,validationErrors,MAX_LENGTH_40": "Максималната дължина е 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Максималната дължина е 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Добави азбучни символи",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "Имейлът е невалиден",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Имейли с този домейн са неприемливи. Моля, използвайте бизнес имейл адрес.",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "Максимум 40 азбучни знака без интервали. Допустими са още: апострофи, тирета.",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Не са допустими повече от 4 цифри",
      "control,validation,validationErrors,REQUIRED": "Изисквано поле",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Максималната дължина е 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Допуска се една точка в края на думи, които не са по-дълги от 3 символа. Например: Jr.",
      "content,label": "Заглавие",
      "content,suggestionLabel": "Имахте предвид"
    },
    "cs": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Až 3 slova obsahující až 3 znaky",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Až 3 slova obsahující více než 3 znaky",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Použité neplatné znaky: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Maximum 3 číslice",
      "control,validation,validationErrors,MAX_LENGTH_40": "Maximální délka je 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Maximální délka je 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Přidejte znaky abecedy",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "E-mail je neplatný",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "E-maily s touto doménou nejsou přípustné. Použijte prosím firemní e-mailovou adresu",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "Nanejvýš 40 znaků abecedy bez mezer. Také jsou povoleny: apostrofy, pomlčky.",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Nejsou povolena více než 4 čísla",
      "control,validation,validationErrors,REQUIRED": "Vyžadované pole",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Maximální délka je 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Povolena jedna tečka na konci slov, která nejsou delší než 3 znaky. Například: Jr.",
      "content,label": "Titul",
      "content,suggestionLabel": "Mysleli jste"
    },
    "el": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Μέχρι 3 λέξεις που περιέχουν μέχρι 3 χαρακτήρες",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Μέχρι 3 λέξεις που περιέχουν περισσότερους από 3 χαρακτήρες",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Χρησιμοποιήθηκαν άκυροι χαρακτήρες: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "3 ψηφία μάξιμουμ",
      "control,validation,validationErrors,MAX_LENGTH_40": "Το μέγιστο μήκος είναι 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Το μέγιστο μήκος είναι 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Πρόσθεσε αλφαβητικούς χαρακτήρες",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "Η ηλεκτρονική διεύθυνση είναι α΄κυρη",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Τα email με αυτόν τον τομέα δεν είναι αποδεκτά. Παρακαλούμε χρησιμοποιήστε μια επαγγελματική διεύθυνση ηλεκτρονικού ταχυδρομείου",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "Μάξιμουμ 40 αλφαβητικοί χαρακτήρες χωρίς κενά. Επίσης επιτρέπονται: απόστροφοι, παύλες",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Δεν επιτρέπονται πάνω από 4 αριθμοί",
      "control,validation,validationErrors,REQUIRED": "Απαιτητό πεδίο",
      "control,validation,validationErrors,INTEGER_FORMAT": "Η τιμή πρέπει να είναι ακέραιος αριθμός",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Η ελάχιστη τιμή είναι -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Η μέγιστη τιμή είναι 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Η τιμή πρέπει να είναι αριθμός με τελεία ως διαχωριστικό",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Το μέγιστο μήκος είναι 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Επιτρέπεται μία τελεία στο τέλος λέξεων που δεν υπερβαίνουν τους 3 χαρακτήρες. Παράδειγμα: Jr.",
      "content,label": "Τίτλος",
      "content,suggestionLabel": "Εννοούσες"
    },
    "nl": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Maximaal 3 woorden bestaande uit maximaal 3 tekens",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Maximaal 3 woorden bestaande uit meer dan 3 tekens",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Ongeldige tekens gebruikt: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Maximaal 3 cijfers",
      "control,validation,validationErrors,MAX_LENGTH_40": "Maximale lengte is 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Maximale lengte is 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Voeg alfabetische tekens toe",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "E-mail is ongeldig",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "E-mails met dit domein worden niet geaccepteerd. Gebruik een zakelijk e-mailadres",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "Max. 40 alfabetische tekens zonder spaties. Ook toegestaan: apostrofs, koppeltekens.",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Niet meer dan 4 cijfers toegestaan",
      "control,validation,validationErrors,REQUIRED": "Verplicht veld",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Maximale lengte is 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Eén punt toegestaan aan het einde van woorden die niet langer zijn dan 3 tekens. Bijvoorbeeld: Jr.",
      "content,label": "Titel",
      "content,suggestionLabel": "Bedoelde u"
    },
    "pl": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Do 3 słów złożonych z nie więcej niż 3 znaków",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Do 3 słów złożonych z ponad 3 znaków",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Użyto nieprawidłowych znaków: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Maksymalnie 3 cyfry",
      "control,validation,validationErrors,MAX_LENGTH_40": "Maksymalna długość to 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Maksymalna długość to 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Wszystkie znaki alfabetu",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "E-mail jest nieprawidłowy",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Adresy e-mail z tej domeny nie są akceptowane. Użyj firmowego adresu e-mail",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "Maks. 40 znaków alfabetu be spacji. Dozwolone także: apostrofy, łączniki.",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Dozwolone są maksymalnie 4 cyfry",
      "control,validation,validationErrors,REQUIRED": "Wymagane pole",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Maksymalna długość to 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Dopuszczalna jest jedna kropka na końcu wyrazów nie dłuższych niż 3 znaki. Na przykład: Jr.",
      "content,label": "Tytuł",
      "content,suggestionLabel": "Czy miałeś(-aś) na myśli"
    },
    "sv": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Upp till 3 ord med upp till 3 tecken",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Upp till 3 ord med mer än 3 tecken",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Ogiltiga tecken används: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Max 3 siffror",
      "control,validation,validationErrors,MAX_LENGTH_40": "Maximal längd är 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Maximal längd är 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Lägg till alfabetiska tecken",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "Ogiltig e-post",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "E-postadresser från denna domän är inte godkända. Var vänlig använd en företagsadress",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "Max 40 alfabetiska tecken utan mellanslag.Också tillåtet: apostrofer, bindestreck.",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Max 4 siffror är tillåtna",
      "control,validation,validationErrors,REQUIRED": "Obligatoriskt fält",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Maximal längd är 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "En punkt tillåts i slutet av ord som inte är längre än 3 tecken. Exempel: Jr.",
      "content,label": "Tytuł",
      "content,suggestionLabel": "Menade du"
    },
    "tr": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "3 karaktere kadar en fazla 3 kelime",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "3'ten fazla karakter içeren en fazla 3 kelime",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Geçersiz karakterler kullanıldı: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Maksimum 3 hane",
      "control,validation,validationErrors,MAX_LENGTH_40": "Maksimum uzunluk 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Maksimum uzunluk 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Alfabetik karakterler ekle",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "E-posta geçersiz",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Bu alan adına sahip e-postalar kabul edilmez. Lütfen bir iş e-posta adresi kullanın",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "Boşluksuz en fazla 40 alfabetik karakter. Ayrıca şunlara izin verilir: kesme işaretleri, tireler.",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "4'ten fazla sayıya izin verilmez",
      "control,validation,validationErrors,REQUIRED": "Gerekli alan",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Maksimum uzunluk 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "3 karakterden uzun olmayan kelimelerin sonunda bir nokta kullanılmasına izin verilir. Örnek: Jr.",
      "content,label": "Başlık",
      "content,suggestionLabel": "Mi demek istediniz"
    },
    "ar": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "ما يصل إلى 3 كلمات تتكون من 3 أحرف",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "ما يصل إلى 3 كلمات تتكون من أكثر من 3 أحرف",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "الأحرف غير الصالحة المستخدَمة {{characters}}",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "3 أرقام كحد أقصى",
      "control,validation,validationErrors,MAX_LENGTH_40": "الحد الأقصى للطول هو 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "الحد الأقصى للطول هو 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "أضف أحرفًا أبجدية",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "البريد الإلكتروني غير صالح",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "رسائل البريد الإلكتروني من هذا المجال غير مقبولة. الرجاء استخدام عنوان بريد إلكتروني خاص بالعمل",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "40 حرفًا أبجديًا كحد أقصى، يُسمح أيضًا: المسافات والفواصل والفواصل العليا والشرطات.",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "لا يسمح بأكثر من 4 أرقام",
      "control,validation,validationErrors,REQUIRED": "الحقل المطلوب",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "الحد الأقصى للطول هو 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "يسمح بوضع نقطة واحدة في نهاية الكلمات التي لا تزيد عن 3 أحرف. مثل: Jr.",
      "content,label": "عنوان",
      "content,suggestionLabel": "هل تقصد"
    },
    "zh": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "最多 3 个单词，每个单词最多 3 个字符",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "最多 3 个超过 3 个字符的单词",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "使用了无效的字符: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "最多 3 位数",
      "control,validation,validationErrors,MAX_LENGTH_40": "最大长度为 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "最大长度为 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "添加字母字符",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "电子邮箱无效",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "不接受含有此域名的电子邮箱，请使用企业电子邮箱地址",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "No more than 4 numbers are allowed",
      "control,validation,validationErrors,REQUIRED": "必填字段",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "最大长度为 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "允许在不超过3个字符的单词末尾使用一个句点。例如：Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "您是想说 吗"
    },
    "da": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Op til 3 ord med op til 3 tegn",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Op til 3 ord med mere end 3 tegn",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Ugyldige tegn brugt: \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Højest 3 cifre",
      "control,validation,validationErrors,MAX_LENGTH_40": "Maksimum længde er 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Maksimum længde er 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Tilføj alfabetiske tegn",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "E-mail er ugyldig",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "E-mails med dette domæne er ikke acceptable. Brug venligst en virksomheds-e-mailadresse",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Maks. 40 alfabetiske tegn.</p><p>Også tilladt:</p><ul><li>apostrof (')</li><li>bindestreger (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Der er ikke tilladt mere end 4 pladser",
      "control,validation,validationErrors,REQUIRED": "Påkrævet felt",
      "control,validation,validationErrors,INTEGER_FORMAT": "Værdien skal være heltal",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimumsværdien er -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maksimal værdi er 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Værdien skal være tal med punktafgrænser",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Maksimum længde er 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Tilladt én prik i slutningen af ord, der ikke er længere end 3 tegn. F.eks.: Jr.",
      "content,label": "Titel",
      "content,suggestionLabel": "Mente du"
    },
    "he": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "עד 3 מילים הכוללות עד 3 תווים",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "עד 3 מילים הכוללות יותר מ-3 תווים",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "שימוש בתווים לא חוקיים \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "מקסימום 3 ספרות",
      "control,validation,validationErrors,MAX_LENGTH_40": "אורך מקסימלי הוא 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "אורך מקסימלי הוא 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "הוסיפו תווים אלפבתיים",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "אימייל לא תקין",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "אימיילים עם דומיין זה אינם קבילים. אנא השתמשו בכתובת דוא\"ל עסקית",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "אסור יותר מ-4 רווחים",
      "control,validation,validationErrors,REQUIRED": "שדה נדרש",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "אורך מקסימלי הוא 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "מותר להשתמש בנקודה אחת בסוף מילים שאורכן אינו עולה על 3 תווים. לדוגמה: Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "האם התכוונתם ל"
    },
    "fi": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Enintään kolme sanaa, joissa on korkeintaan kolme merkkiä",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Enintään kolme sanaa, joissa on yli kolme merkkiä",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Virheellisiä merkkejä käytettiin \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Korkeintaan kolme lukua",
      "control,validation,validationErrors,MAX_LENGTH_40": "Maksimipituus on 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Maksimipituus on 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Lisää aakkosellisia merkkejä",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "Sähköposti on virheellinen",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Tämän verkkotunnuksen sähköposteja ei hyväksytä. Käytä yritys- tai työsähköpostia",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Enintään 4 numeroa sallitaan",
      "control,validation,validationErrors,REQUIRED": "Vaadittu kenttä",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Maksimipituus on 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Sanojen lopussa, jotka ovat enintään 3 merkkiä pitkiä, sallitaan yksi piste. Esimerkiksi: Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "Tarkoititko tätä:"
    },
    "hi": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "अधिकतम 3 अक्षर वाले 3 शब्द",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "3 से अधिक अक्षरों वाले 3 शब्द तक",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "अमान्य वर्णों का उपयोग किया गया \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "अधिकतम 3 संख्या",
      "control,validation,validationErrors,MAX_LENGTH_40": "अधिकतम लंबाई 40 है",
      "control,validation,validationErrors,MAX_LENGTH_50": "अधिकतम लंबाई 50 है",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "वर्णमाला के वर्ण जोड़ें",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "ईमेल अमान्य है",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "इस डोमेन वाले ईमेल स्वीकार्य नहीं हैं. कृपया बिज़नेस ईमेल एड्रेस इस्तेमाल करें",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "अधिकतम 4 नंबर की अनुमति है",
      "control,validation,validationErrors,REQUIRED": "आवश्यक फील्ड",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "अधिकतम लंबाई 1000 है",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "3 कैरेक्टर से ज़्यादा लंबे शब्दों के आखिर में एक डॉट लगाने की इजाज़त है। जैसे: Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "क्या आपका मतलब"
    },
    "hr": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Najviše 3 riječi koje sadrže do 3 znaka",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Najviše 3 riječi koje sadrže više od 3 znaka",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Korišteni su nevažeći znakovi \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Najviše 3 znamenke",
      "control,validation,validationErrors,MAX_LENGTH_40": "Maksimalna duljina je 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Maksimalna duljina je 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Dodajte abecedne znakove",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "E-mail nije ispravan",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "E-mail adrese s ovom domenom nisu prihvatljive. Molimo koristite poslovnu e-mail adresu",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Dopuštena su najviše 4 broja",
      "control,validation,validationErrors,REQUIRED": "Obavezno polje",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Maksimalna duljina je 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Dozvoljena je jedna točka na kraju riječi ne duljih od 3 znaka. Kao: Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "Jeste li mislili"
    },
    "hu": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Legfeljebb 3 szó, amely legfeljebb 3 karakterből áll",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Legfeljebb 3 szó, amely több mint 3 karakterből áll",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Érvénytelen karakterek használata \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Legfeljebb három számjegy",
      "control,validation,validationErrors,MAX_LENGTH_40": "A maximális hossz 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "A maximális hossz 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Betűk hozzáadása",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "Az e-mail érvénytelen",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Az ezzel a domainnel küldött e-mailek nem fogadhatók el. Kérjük, használjon üzleti e-mail címet",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Legfeljebb 4 szám megengedett",
      "control,validation,validationErrors,REQUIRED": "Kötelező mező",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "A maximális hossz 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "3 karakternél nem hosszabb szavak végén egy pont megengedett. Például: Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "Úgy értetted, hogy"
    },
    "id": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Hingga 3 kata yang terdiri dari hingga 3 karakter",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Hingga 3 kata yang terdiri lebih dari 3 karakter",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Karakter tidak valid yang digunakan \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Maksimal 3 digit",
      "control,validation,validationErrors,MAX_LENGTH_40": "Panjang maksimum adalah 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Panjang maksimum adalah 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Tambahkan karakter alfabet",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "Email tidak valid",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Email dengan domain ini tidak dapat diterima. Silakan gunakan alamat email bisnis",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Tidak lebih dari 4 angka yang diizinkan",
      "control,validation,validationErrors,REQUIRED": "Bidang yang wajib diisi",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Panjang maksimum adalah 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Diperbolehkan menggunakan satu titik di akhir kata yang tidak lebih dari 3 karakter. Contoh: Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "Apakah yang Anda maksud adalah"
    },
    "ja": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "最大3文字の単語を最大3つまで",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "3文字を超える単語を最大3つまで",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "無効な文字が使用されています \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "最大3桁",
      "control,validation,validationErrors,MAX_LENGTH_40": "最長40文字です",
      "control,validation,validationErrors,MAX_LENGTH_50": "最長50文字です",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "アルファベット文字を追加",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "メールアドレスが無効です",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "このドメインのメールは受け付けられません。ビジネス用のメールアドレスをお使いください。",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "数字は4つまでしか使用できません",
      "control,validation,validationErrors,REQUIRED": "必須フィールド",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "最長1000文字です",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "3文字以下の単語の末尾に1つのドットのみ許可。例：Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "ということですか"
    },
    "ko": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "최대 3자로 구성된 단어 최대 3개까지",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "3자 이상으로 구성된 단어 최대 3개까지",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "\"{{characters}}\"(이)가 사용된 잘못된 문자",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "최대 3자리",
      "control,validation,validationErrors,MAX_LENGTH_40": "최대 길이 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "최대 길이 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "알파벳 문자 추가",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "유효하지 않은 이메일",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "이 도메인이 사용된 이메일은 허용되지 않습니다. 업무용 이메일 주소를 사용하십시오.",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "숫자는 4개 이상 사용할 수 없습니다",
      "control,validation,validationErrors,REQUIRED": "필수 칸",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "최대 길이 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "3자 이하 단어의 끝에 한 개의 점만 허용됩니다. 예: Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "(을)를 의미하신 건가요"
    },
    "no": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Opptil tre ord bestående av opptil tre tegn",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Opptil tre ord med mer enn tre tegn",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Ugyldige tegn brukt \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Maks. tre sifre",
      "control,validation,validationErrors,MAX_LENGTH_40": "Maksimal lengde er 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Maksimal lengde er 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Legg til alfabetiske tegn",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "E-posten er ugyldig",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "E-post med dette domenet er ikke akseptabelt. Bruk en bedrifts-e-postadresse",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Ikke mer enn fire tall er tillatt",
      "control,validation,validationErrors,REQUIRED": "Obligatorisk felt",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Maksimal lengde er 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Tillatt én prikk på slutten av ord som ikke er lengre enn 3 tegn. For eksempel: Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "Mente du"
    },
    "sk": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Maximálne 3 slová obsahujúce až 3 znaky",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Maximálne 3 slová obsahujúce viac ako 3 znaky",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Použité neplatné znaky \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Maximálne 3 číslice",
      "control,validation,validationErrors,MAX_LENGTH_40": "Maximálna dĺžka je 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Maximálna dĺžka je 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Pridajte abecedné znaky",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "E-mail je neplatný",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "E-maily s touto doménou nie sú prijateľné. Použite firemnú e-mailovú adresu",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Nie sú povolené viac ako 4 číslice",
      "control,validation,validationErrors,REQUIRED": "Povinné pole",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Maximálna dĺžka je 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Povolená jedna bodka na konci slov, ktoré nie sú dlhšie ako 3 znaky. Napríklad: Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "Mali ste na mysli slovo"
    },
    "sl": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Do 3 besede, ki vsebujejo do 3 znake",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Do 3 besede, ki vsebujejo več kot 3 znake",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Uporabljeni neveljavni znaki \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "Največ 3 števke",
      "control,validation,validationErrors,MAX_LENGTH_40": "Največja dolžina je 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Največja dolžina je 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Dodajte abecedne znake",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "E-poštni naslov je neveljaven",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "E-poštna sporočila s to domeno niso sprejemljiva. Uporabite poslovni e-poštni naslov.",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Dovoljene so največ 4 številke",
      "control,validation,validationErrors,REQUIRED": "Obvezno polje",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Največja dolžina je 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Dovoljena je ena pika na koncu besed, ki niso daljše od 3 znakov. Na primer: Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "Ste mislili"
    },
    "sr": {
      "control,validation,validationErrors,MORE_THAN_THREE_SHORT_WORDS": "Do 3 reči koje sadrže do 3 znaka",
      "control,validation,validationErrors,MORE_THAN_THREE_LONG_WORDS": "Do 3 reči koje sadrže više od 3 znaka",
      "control,validation,validationErrors,CONTAINS_FORBIDDEN_CHARACTERS": "Korišćeni su nevažeći znakovi \"{{characters}}\"",
      "control,validation,validationErrors,NAME_CONTAINS_MORE_THAN_3_DIGITS": "3 cifre maksimalno",
      "control,validation,validationErrors,MAX_LENGTH_40": "Maksimalna dužina je 40",
      "control,validation,validationErrors,MAX_LENGTH_50": "Maksimalna dužina je 50",
      "control,validation,validationErrors,NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED": "Dodajte abecedne znakove",
      "control,validation,validationErrors,EMAIL_IS_INVALID": "E-pošta je nevažeća",
      "control,validation,validationErrors,EMAIL_DOMAIN_INVALID": "Adrese e-pošte sa ovim domenom nisu prihvatljive. Koristite poslovnu adresu e-pošte",
      "control,validation,validationErrors,NAME_CONTAINS_FORBIDDEN_CHARACTERS": "<p>Max 40 alphabetic characters.</p><p>Also allowed:</p><ul><li>apostrophes (')</li><li>hyphens (-)</li></ul>",
      "control,validation,validationErrors,NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED": "Nije dozvoljeno više od 4 broja",
      "control,validation,validationErrors,REQUIRED": "Obavezno polje",
      "control,validation,validationErrors,INTEGER_FORMAT": "Value must be integer",
      "control,validation,validationErrors,MIN_VALUE_MINUS_2147483648": "Minimum value is -2147483648",
      "control,validation,validationErrors,MAX_VALUE_2147483648": "Maximum value is 2147483648",
      "control,validation,validationErrors,FLOAT_FORMAT": "Value must be number with dot delimiter",
      "control,validation,validationErrors,MAX_LENGTH_1000": "Maksimalna dužina je 1000",
      "control,validation,validationErrors,LONG_NAME_WITH_DOT": "Дозвољена је једна тачка на крају речи не дуже од 3 карактера. Као: Jr.",
      "content,label": "Title",
      "content,suggestionLabel": "Da li ste mislili"
    },
  },
  "props": {
    "content": {
      "placeholder": "Text input",
      "label": "Title",
      "suggestionLabel": "Did you mean",
      "textContrastEnabled": true,
      "placeholderTextContrastEnabled": true
    },
    "control": {
      "name": "text_input",
      "integrationName": "text_input",
      "defaultValue": "",
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
    "icon": "/SysInputComponent/assets/img/text-input-component-icon.svg",
    "label": {
      "en": "Text input",
      "ru": "Текстовое поле",
      "uk": "Текстове поле",
      "es": "Entrada de texto",
      "fr": "Saisie de texte",
      "de": "Text-Input",
      "it": "Input testo",
      "pt": "Introdução de texto",
      "ro": "Text input",
      "bg": "Text input",
      "cs": "Text input",
      "el": "Text input",
      "nl": "Text input",
      "pl": "Text input",
      "sv": "Text input",
      "tr": "Text input",
      "ar": "Text input",
      "zh": "文本输入",
      "da": "Tekst input",
      "he": "הזנת טקסט",
      "fi": "Tekstinsyöttö",
      "hi": "टेक्स्ट इनपुट",
      "hr": "Unos teksta",
      "hu": "Szövegbevitel",
      "id": "Masukan teks",
      "ja": "テキスト入力",
      "ko": "텍스트 입력",
      "no": "Tekstinntasting",
      "sk": "Zadávanie textu",
      "sl": "Vnos besedila",
      "sr": "Unos teksta"
    }
  },
  "syncEnabled": true,
  "stylesImitationEnabled": true,
  "showIntegrationFieldMappingPropertyPaneOnInsert": true,
}
