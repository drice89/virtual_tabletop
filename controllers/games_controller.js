const Game = require('../models/Game'); 
const User = require('../models/User'); 
const validateGameRegister = require('../validations/game_validation'); 

exports.fetchAll = function(req, res) { 
  // console.log('Hit the controller for fetch all')
  // Game.find({}).populate('players').exec((err, player) => console.log(player))
  Game.find({}, function(err, result) { 
    if (err) {
      res.status(404).json(err)
    } else { 
      res.json(result); 
    }
  })
}

exports.fetchGame = function(req, res) { 
  const gameId = req.params.id; 
  Game.findById(gameId, function(err, game) {
    if (!game) return res.json({msg: 'no game found'}); 
    res.json(game); 
  })
}

exports.createGame = function (req, res) {
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
      } else {
        const newGame = new Game({
          creatorId: req.body.creatorId,
          name: req.body.name,
          description: req.body.description,
          backgroundImage: req.body.backgroundImage
        });

        newGame.save().then(game => res.json(game), err => res.json(err))
      }
    })
}

exports.joinGame = function(req, res) { 
  const gameId = req.body.gameId; 
  const userId = req.body.userId; 

  Game.findById(gameId, function(gameErr, game) { 
    if (!game) return res.json({msg: 'no game'}); 
    
    User.findById(userId, function(userErr, user) {
      if (!user) return res.json(user);
     
        user.gameSubscriptions.push(game) // subscribes user to game push game ref into array 
        user.save(function(userSaveErr) { 
        if (userSaveErr) return res.json(userSaveErr);
      })

       game.players.push(user)
       game.save(function (gameSaveErr) {
        if (gameSaveErr) return res.json(gameSaveErr);

      })
    })

    return res.json({status: 'done'});
  })
}