const DEFAULT_MAX_LENGTH = 5000;

export function maxLength(maxLength = DEFAULT_MAX_LENGTH) {
  return (value) => {
    const isValid = value.trim().length <= maxLength;
    return {
      isValid,
      errorKey: isValid ? null : `MAX_LENGTH_${maxLength}`,
    };
  }
}