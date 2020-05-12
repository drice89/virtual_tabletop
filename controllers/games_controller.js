const Game = require('../models/Game'); 
const validateGameRegister = require('../validations/game'); 


exports.createGame = function(req, res) { 
  const { errors, isValid } = validateGameRegister(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  
}