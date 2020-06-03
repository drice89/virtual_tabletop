/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-else-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-arrow-callback */
const Game = require('../models/Game');
const User = require('../models/User');
const Board = require('../models/Board');
const validateGameRegister = require('../validations/game_validation');

exports.fetchAll = function (req, res) {
  // console.log('Hit the controller for fetch all')
  // Game.find({}).populate('players').exec((err, player) => console.log(player))
  Game.find({}, function (err, result) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.json(result);
    }
  });
};

function structureBoardsPayload(boards) {
  const payload = {};

  boards.forEach((board) => {
    board.toJSON();
    payload[board._id] = board;
  });
  return payload;
}

exports.fetchGame = function (req, res) {
  const gameId = req.params.id;
  const payload = { game: null, boards: null };
  Game.findById(gameId, '-boards', function (gameErr, game) {
    if (gameErr) {
      return res.json(gameErr);
    } else if (game === null) {
      return res.json({ error: 'Could not locate game' });
    } else {
      payload.game = game;
      Board.find({ gameId: game._id }, function (boardErr, boards) {
        if (boardErr) {
          return res.json(boardErr);
        } else if (boards === null) {
          return res.json({ error: 'Could not locate boards for this game' });
        } else {
          payload.game.boards = boards.map((board) => board._id);
          payload.boards = structureBoardsPayload(boards);
          return res.json(payload);
        }
      });
    }
  });
};

exports.joinGame = function (req, res) {
  const { gameId, userId } = req.body;

  Game.findById(gameId, function (gameErr, game) {
    if (!game) return res.json({ error: 'could not locate game' });

    User.findById(userId, function (userErr, user) {
      if (!user) return res.json(user);

      user.gameSubscriptions.push(game); // subscribes user to game push game ref into array
      user.save(function (userSaveErr) {
        if (userSaveErr) return res.json(userSaveErr);
      });

      game.players.push(user);
      game.save(function (gameSaveErr) {
        if (gameSaveErr) return res.json(gameSaveErr);
      });
    });
    return res.json(game);
  });
};

exports.createGame = function (req, res) {
  const { errors, isValid } = validateGameRegister(req.body);
  const { creatorId, name, description, backgroundImage } = req.body;
  if (!isValid) return res.status(400).json(errors);

  Game.find({
    creatorId: creatorId.trim(),
    name: name.trim(),
  }, function (gameErr, game) {
    if (game.length > 0) {
      return res.status(400).json({ name: 'Same user can\'t have two games with the same name' });
    } else if (gameErr) {
      return res.status(400).json(errors.name);
    } else {
      const newGame = new Game({
        creatorId: creatorId.trim(),
        name: name.trim(),
        description: description.trim(),
        backgroundImage: backgroundImage.trim(),
      });
      newGame.players.push(newGame.creatorId);
      newGame.save(function (saveErr, game) {
        if (saveErr) return res.status(400).json(saveErr);
        User.findById(game.creatorId, function (userErr, user) {
          if (userErr) return res.status(400).json(userErr);
          user.gameSubscriptions.push(game._id);
          user.save();
          const boards = {};
          return res.json({ game, boards });
        });
      });
    }
  });
};

exports.deleteGame = function (req, res) {
  const { id } = req.params;
  Game.findByIdAndDelete(id)
    .then((game) => res.json(game))
    .catch(() => res.status(400).json({ error: 'something went wrong' }));
};

exports.editGame = function (req, res) {
  const { _id, name, description, backgroundImage } = req.body;
  if (name.trim() === '') return res.status(400).json({ name: 'name can\'t be blank' });
  Game.findOneAndUpdate({ _id }, { name, description, backgroundImage }, { new: true, lean: true })
    .then((game) => res.json({ game }))
    .catch(() => res.status(400).json({ name: 'can\'t have two games with the same name' }));
};