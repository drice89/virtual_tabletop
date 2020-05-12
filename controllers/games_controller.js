const Game = require('../models/Game'); 
const validateGameRegister = require('../validations/game_validation'); 

exports.createGame = function(req, res) { 
  const { errors, isValid } = validateGameRegister(req.body);

  console.log(errors)
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Game.find({
      creatorId: req.body.creatorId,
      name: req.body.name
    })
    .then((foundGame) => {
      if (foundGame.length > 0) {
        res.status(422).json(["This game is already exist"])
      }else{
        const newGame = new Game({
          creatorId: req.body.creatorId,
          name: req.body.name,
          description: req.body.description,
          backgroundImage: req.body.backgroundImage
        });

        newGame.save().then(game => res.json(game), err => res.json(errors))
      }
    })
      
  

  
}