const Validator = require('validator');
const ValidText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.displayName = ValidText(data.displayName) ? data.displayName : '';
  data.email = ValidText(data.email) ? data.email : '';
  data.password = ValidText(data.password) ? data.password : '';
  data.password2 = ValidText(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.displayName, { min: 3, max: 30 })) {
    errors.displayName = 'must be between 3 and 30 characters';
  }

  if (Validator.isEmpty(data.displayName)) {
    errors.displayName = 'display name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}