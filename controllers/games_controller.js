const Game = require('../models/Game'); 
const validateGameRegister = require('../validations/game_validation'); 

exports.createGame = function(req, res) { 
  console.log('Hit the controller')
  const { errors, isValid } = validateGameRegister(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newGame = new Game({
    creatorId: req.body.creatorId, 
    name: req.body.name, 
    description: req.body.description, 
    backgroundImage: req.body.backgroundImage
  }); 

  newGame.save().then(game => res.json(game), err => res.json(['You can\'t have two games with the same name!'
]))
}

exports.fetchAll = function(req, res) { 
  console.log('Hit the controller for fetchall')

  Game.find({}, function(err, result) { 
    if (err) {
      res.status(404).json(err)
    } else { 
      res.json(result); 
    }
  })
}
