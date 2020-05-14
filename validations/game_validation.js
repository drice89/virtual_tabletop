const Validator = require('validator');
const validText = require('./valid-text');
const mongoose = require('mongoose')
const Game = require('../models/Game')
const ObjectId = require('mongoose').Types.ObjectId; 

module.exports = function validateGameRegister(data) {
  console.log(data)
  let errors = {};
  data.name = validText(data.name) ? data.name : '';
  const creatorId = data.creatorId; 

  if (!Validator.isLength(data.name)) {
    errors.name = 'Game must be a minimum of 3 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Game must have a name';
  }
 

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
  
};