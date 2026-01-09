export function phone() {
  return (value) => {
    const invalidResult = {
      isValid: false,
      errorKey: 'PHONE_INVALID_NUMBER'
    };
    if (!value) {
      return invalidResult;
    }
    const normalizedValue = value.replace(/[+()\-_ ]/g, '');
    if (!normalizedValue.match(/^\d+$/)) {
      return invalidResult;
    }
    return {
      isValid: true,
    };
  };
}