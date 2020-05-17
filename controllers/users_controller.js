/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const User = require('../models/User');
const Piece = require('../models/Piece');
const validateLoginInput = require('../validations/login');
const validateRegisterInput = require('../validations/register');

const validatePiece = require('../validations/piece_validation');

exports.fetchUserGames = function (req, res) {
  const userId = req.params.id;

  User.findById(userId, '-password')
    .populate({
      path: 'gameSubscriptions',
      select: '_id name description creatorId backgroundImage',
    }).exec(function (err, results) {
      if (err) return res.json(err);
      return res.json(StructurePayload(results.toJSON()));
    });
};

function StructurePayload(response) {
  const sortedGames = sortGames(response.gameSubscriptions, response._id);
  const payload = {
    games: {},
    user: {
      id: response._id,
      displayName: response.displayName,
      email: response.email,
      profilePicture: response.profilePicture,
      createdAt: response.createdAt,
      createdGames: sortedGames[0],
      subscribedGames: sortedGames[1],
    },
  };

  response.gameSubscriptions.map((game) => { payload.games[game._id] = game; });
  return payload;
}

function sortGames(games, creatorId) {
  const sorted = [[], []];

  games.forEach((game) => {
    if (Object.is(game.creatorId.toHexString(), creatorId.toHexString())) {
      sorted[0].push(game._id);
    } else {
      sorted[1].push(game._id);
    }
  });
  return sorted;
}

exports.login = function (req, res) {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  User.findOne({ email }) // find user object by email
    .then((user) => { // returns a result
      if (!user) { // if no user adds email: erro to errors object
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password) // returns boolean
        .then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user.id,
              displayName: user.displayName,
              profilePicture: user.profilePicture,
              createdAt: user.createdAt,
            }; // payload to be sent to redux store with jwt

            jwt.sign(
              payload,
              keys.secretOrKey,
              // there was something on the font end calling .exp
              { expiresIn: '14 days' }, // from zeit documentation should be same as ms('14 days')
              (err, token) => { // token is generated by combinding payload and header
                res.json({
                  success: true,
                  token: 'Bearer ' + token,
                });
              },
            );
          } else {
            errors.password = 'Incorrect password';
            return res.status(400).json(errors);
          }
        });
    });
};

exports.register = function (req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        // Throw a 400 error if the email address already exists
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        // Otherwise create a new user
        const newUser = new User({
          displayName: req.body.displayName,
          email: req.body.email,
          password: req.body.password,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then((user) => {
                const payload = {
                  id: user.id,
                  displayName: user.displayName,
                  profilePicture: user.profilePicture,
                  subcribedGames: user.gameSubscriptions,
                }; // payload to be sent to redux store with jwt
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  // there was something on the font end calling .exp
                  { expiresIn: '14 days' },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token,
                    });
                  },
                );
              });
          });
        });
      }
    });
};


// fetch all the pieces
exports.fetchPieces = function (req, res) {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      Piece.find({ uploaderId: req.params.userId })
        .then((pieces) => res.json(pieces));
    })
    .catch(() => res.status(404).json(['User was not found']));
};

// create a piece
exports.createPiece = function (req, res) {
  const { errors, isValid } = validatePiece(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ _id: req.params.userId })
    .then((user) => {
      const newPiece = new Piece({
        uploaderId: req.params.userId,
        imageUrl: req.body.imageUrl,
      });

      newPiece.save()
        .then(() => res.status(200).json(['The piece was created']))
        .catch(() => res.status(422).json(['The piece was not created.']));
    })
    .catch(() => res.status(404).json(['User was not found']));
};

// delete single piece
exports.deletePiece = function (req, res) {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      Piece.findOne({ uploaderId: req.params.userId })
        .then((piece) => {
          piece.remove();
          return res.json('Piece was deleted.');
        });
    })
    .catch(() => res.status(404).json(['User was not found']));
};
