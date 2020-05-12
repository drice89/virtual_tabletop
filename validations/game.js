const Validator = require('validator');
const validText = require('./valid-text');
const Game = require('../models/Game'); 

module.exports = function validateGameRegister(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';
  const creatorId = data.creatorId; 

  if (!Validator.isLength(data.name)) {
    errors.name = 'Game must be a minimum of 3 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Game must have a name';
  }
  
  Game.find({creatorId})   //find all the games with that creatorId, pull out names, run callback that will 
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}