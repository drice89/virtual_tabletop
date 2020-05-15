const Game = require('../models/Game'); 
const User = require('../models/User'); 
const Board = require('../models/Board'); 
const Piece = require('../models/Piece');
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
  const response = {game: null, boards: null }
  Game.findById(gameId, '-boards', function(gameErr, game) { 
      if(gameErr) {
        return res.json(gameErr);
      } else if (game === null) { 
        res.json({message: 'Could not locate game'})
      } else { 
        response.game = game
        Board.find({gameId: game._id},function (boardErr, boards) {
          if (boardErr) {
            return res.json(boardErr)
          } else if (boards === null) { 
            return res.json({message: 'Could not locate boards for this game'})
          } else {
            response.boards = boards
            return res.json(response);
          }
        })
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

exports.createGame = function (req, res) { 
  const { errors , isValid } = validateGameRegister(req.body); 

  if (!isValid) return res.status(400).json(errors); 
  Game.find({creatorId: req.body.creatorId.trim(), name: req.body.name.trim()}, function (gameErr, game) {
    console.log(gameErr)
   if (game.length > 0) {
    return res.status(400).json({error: 'Same user can\'t have two game with the same name'}); 
   } else if (gameErr) { 
    return res.status(400).json(gameErr);
   } else { 
     const newGame = new Game({
      creatorId: req.body.creatorId.trim(),
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      backgroundImage: req.body.backgroundImage.trim() 
    })
    newGame.players.push(newGame.creatorId)
    newGame.save(function(saveErr, game) { 
      if (saveErr) return res.status(400).json(saveErr); 
      User.findById(game.creatorId, function(userErr, user) { 
        console.log(user)
        if (userErr) return res.status(400).json(userErr); 
        user.gameSubscriptions.push(game._id); 
        user.save();
        return res.json({ game }); 
      })
    })
   }
  })
};  

//For testing only 
// exports.createGame = function (req, res) {
//   const { errors, isValid } = validateGameRegister(req.body);

//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   Game.find({
//     creatorId: req.body.creatorId.trim(),
//     name: req.body.name.trim()
//   })
//     .then((foundGame) => {
//       if (foundGame.length > 0) {
//         res.status(422).json(["This game is already exist"])
//       } else {
//         const newGame = new Game({
//           creatorId: req.body.creatorId.trim(),
//           name: req.body.name.trim(),
//           description: req.body.description.trim(),
//           backgroundImage: req.body.backgroundImage.trim()
//         });
//         // newGame.save().then(game => res.json(game), err => res.json(err))
//         newGame.save(function(err, game) {
//           User.findById(req.body.creatorId.trim(), function(userErr, user) {
//             if (!user) return res.json({msg: 'user not found'}); 
//             user.gameSubscriptions.push(game); 
//             newGame.players.push(user._id)
//             user.save()
//             return res.json(game); 
//           })
//         }) 
//       }
//     })
// }