const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateGameRegister(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';

  if (!Validator.isLength(data.name)) {
    errors.name = 'Game must be a minimum of 3 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Game must have a name';
  }


  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}