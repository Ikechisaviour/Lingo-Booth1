function cleanFullName(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, 160);
}

function fullNameValidation(value, { required = false } = {}) {
  const fullName = cleanFullName(value);
  if (!fullName) {
    return {
      fullName: '',
      valid: !required,
      code: required ? 'FULL_NAME_REQUIRED' : null,
    };
  }
  if (fullName.length < 2) {
    return {
      fullName,
      valid: false,
      code: 'FULL_NAME_INVALID',
    };
  }
  return { fullName, valid: true, code: null };
}

module.exports = {
  cleanFullName,
  fullNameValidation,
};
