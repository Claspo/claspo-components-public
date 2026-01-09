import emailProvidersList from './emailProvidersList';

export default class InputValidators {

  static validationErrorKeys = {
    NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED: 'NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED',
    NAME_CONTAINS_MORE_THAN_3_DIGITS: 'NAME_CONTAINS_MORE_THAN_3_DIGITS',
    MORE_THAN_THREE_LONG_WORDS: "MORE_THAN_THREE_LONG_WORDS",
    MORE_THAN_THREE_SHORT_WORDS: 'MORE_THAN_THREE_SHORT_WORDS',
    CONTAINS_FORBIDDEN_CHARACTERS: 'CONTAINS_FORBIDDEN_CHARACTERS',
    EMAIL_IS_INVALID: 'EMAIL_IS_INVALID',
    NAME_CONTAINS_FORBIDDEN_CHARACTERS: 'NAME_CONTAINS_FORBIDDEN_CHARACTERS',
    MAX_LENGTH_50: 'MAX_LENGTH_50',
    MAX_LENGTH_40: 'MAX_LENGTH_40',
    NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED: 'NO_MORE_THAN_4_NUMBERS_ARE_ALLOWED',
    INTEGER_FORMAT: 'INTEGER_FORMAT',
    MIN_VALUE_MINUS_2147483648: 'MIN_VALUE_MINUS_2147483648',
    MAX_VALUE_2147483648: 'MAX_VALUE_2147483648',
    FLOAT_FORMAT: 'FLOAT_FORMAT',
    MAX_LENGTH_1000: 'MAX_LENGTH_1000',
    LONG_NAME_WITH_DOT: 'LONG_NAME_WITH_DOT',
  };

  static validationMap = {
    EMAIL: InputValidators.emailValidationCb,
    SYS_NAME: InputValidators.nameValidationCb,
    SYS_LAST_NAME: InputValidators.lastNameValidationCb,
    ES_TEXT: InputValidators.esTextValidationCb,
    ES_INTEGER: InputValidators.esIntegerValidationCb,
    ES_FLOAT: InputValidators.esFloatValidationCb,
  };

  static emailValidationCb(value = '', props) {
    try {
      if (!/^[_A-Za-z0-9-\p{L}]+(\.[_A-Za-z0-9-\p{L}]+)*(\+.*)?@([A-Za-z0-9-\p{L}]+(\.[A-Za-z0-9\p{L}]+)+)+$/u.test(value)) {
        return {
          isValid: false,
          errorKey: InputValidators.validationErrorKeys.EMAIL_IS_INVALID
        }
      }
    } catch (e) {
      if (!/^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*(\+.*)?@([A-Za-z0-9-]+(\.[A-Za-z0-9]+)+)+$/.test(value)) {
        return {
          isValid: false,
          errorKey: InputValidators.validationErrorKeys.EMAIL_IS_INVALID
        }
      }
    }

    if (value.length > 50) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.MAX_LENGTH_50
      }
    }

    if (
      !props.control.validation ||
      !props.control.validation.restrictFreeDomains
    ) {
      return {
        isValid: true,
      };
    }

    const domainPartOfEmail = value.toLowerCase().split('@')[1];

    if (emailProvidersList.includes(domainPartOfEmail)) {
      return {
        isValid: false,
        errorKey: 'EMAIL_DOMAIN_INVALID'
      };
    }

    return {
      isValid: true,
    };
  }

  static nameValidationCb(value = '') {
    const trimmedValue = value.trim();
    const parts = (trimmedValue || '').split(' ');

    if (parts.filter(item => item.length > 3).length > 3) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.MORE_THAN_THREE_LONG_WORDS,
      };
    }

    if (parts.filter(item => item.length <= 3).length > 3) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.MORE_THAN_THREE_SHORT_WORDS,
      };
    }

    return InputValidators.lastNameValidator(trimmedValue) || {
      value: trimmedValue,
      isValid: true,
    }
  }

  static lastNameValidator(value) {
    const trimmedValue = value.trim();
    const symbols = ' .\'’ʼ`´ʹʻʽʾʿˈˊˮʹ΄՚᾽᾿‘‛′‵Ꞌꞌ＇-';

    if (trimmedValue.length > 40) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.MAX_LENGTH_40,
      };
    }

    const sanitizeExceptDoubleQuotesMatchArray = InputValidators.sanitizeExceptDoubleQuotes(trimmedValue);
    if (sanitizeExceptDoubleQuotesMatchArray && sanitizeExceptDoubleQuotesMatchArray.length) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.CONTAINS_FORBIDDEN_CHARACTERS,
        forbiddenChar: sanitizeExceptDoubleQuotesMatchArray[0][0],
      };
    }

    const forbiddenCharacter = InputValidators.forbiddenCharactersValidator(trimmedValue, `[^\\d\\.\\s\\p{Alphabetic}${symbols}]`);

    if (forbiddenCharacter) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.CONTAINS_FORBIDDEN_CHARACTERS,
        forbiddenChar: forbiddenCharacter,
      }
    }

    if (InputValidators.nameContainsDotValidator(trimmedValue)) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.LONG_NAME_WITH_DOT,
      }
    }

    if (InputValidators.nameContainsMoreThanThreeDigitsValidator(trimmedValue)) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.NAME_CONTAINS_MORE_THAN_3_DIGITS
      }
    }

    if (InputValidators.nameConsistingOfAlphabeticCharactersValidator(trimmedValue)) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.NAME_CONSISTING_ONLY_OF_NUMBERS_AND_SPECIAL_CHARACTERS_IS_NOT_ALLOWED
      }
    }

    const symbolPositionMatchArray = InputValidators.symbolPositionValidator(trimmedValue);

    if (symbolPositionMatchArray && symbolPositionMatchArray.length) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.CONTAINS_FORBIDDEN_CHARACTERS,
        forbiddenChar: symbolPositionMatchArray[0][0],
      }
    }

    return null;
  }

  static lastNameValidationCb(value = '') {
    return InputValidators.lastNameValidator(value) || {
      value: value.trim().replace(/\s+/g, ' '),
      isValid: true,
    }
  }

  static esTextValidationCb(value = '') {
    const trimmedValue = value.trim();

    return {
      isValid: trimmedValue.length <= 1000,
      errorKey: InputValidators.validationErrorKeys.MAX_LENGTH_1000,
    };
  }

  static esIntegerValidationCb(value = '') {
    if (!value) {
      return {
        isValid: true,
      };
    }

    if (!/^(\-)?(\d)+$/.test(value)) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.INTEGER_FORMAT,
      };
    }

    if (value < -2147483647) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.MIN_VALUE_MINUS_2147483648,
      };
    }

    return {
      isValid: value <= 2147483647,
      errorKey: InputValidators.validationErrorKeys.MAX_VALUE_2147483648,
    };
  }

  static esFloatValidationCb(value = '') {
    if (!value) {
      return  {
        isValid: true,
      };
    }

    const floatPattern = /^(\-)?(\d)+(\.(\d)+)?$/;
    const commaPattern = /,/;

    const isContainingComma = commaPattern.test(value);
    const isFloat = floatPattern.test(value);

    if (isContainingComma || !isFloat) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.FLOAT_FORMAT,
      };
    }

    if (value < -9007199254740991) {
      return {
        isValid: false,
        errorKey: InputValidators.validationErrorKeys.MIN_VALUE_MINUS_2147483648,
      };
    }

    return {
      isValid: value <= 9007199254740991,
      errorKey: InputValidators.validationErrorKeys.MAX_VALUE_2147483648,
    };
  }

  static sanitizeExceptDoubleQuotes(value) {
    const sanitizePattern = /[%^*|~{};<>]/;
    const regex = new RegExp(sanitizePattern, 'g');
    if (regex.test(value)) {
      return value.match(regex);
    }
    return null;
  }

  static forbiddenCharactersValidator(value, regExpString) {
    try {
      const match = value.match(new RegExp(regExpString, 'gu'));
      return match ? match[0] : '';
    } catch (e) {
      const match = value.match(new RegExp(regExpString.replace('\\p{Alphabetic}', ''), 'gu'));
      return match ? match[0] : '';
    }
  }

  static nameContainsDotValidator(value) {
    return value.match(/(\p{Alphabetic}{4,}\.)/gmu);
  }

  static nameContainsMoreThanThreeDigitsValidator(value) {
    return value.replace(/\D+/g, '').length > 3
  }

  static nameConsistingOfAlphabeticCharactersValidator(value) {
    try {
      return !new RegExp('[\\p{Alphabetic}]', 'gu').test(value);
    } catch (e) {
      return /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g.test(value);
    }
  }

  static symbolPositionValidator(value) {
    const symbols = ' .\'’ʼ`´ʹʻʽʾʿˈˊˮʹ΄՚᾽᾿‘‛′‵Ꞌꞌ＇-';
    const regex = new RegExp(`[${symbols}][${symbols}]|(^[${symbols}])|([${symbols.replace('.', '')}]$)`, 'g');

    if (regex.test(value)) {
      return value.match(regex)
        .filter(item => item !== '. ')
        .map(item => item.trim());

    }
    return null;
  }
}
