/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-arrow-callback */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const User = require('../models/User');
const Game = require('../models/Game');
const Piece = require('../models/Piece');
const validateLoginInput = require('../validations/login');
const validateRegisterInput = require('../validations/register');
const validatePiece = require('../validations/piece_validation');

exports.fetchUser = function (req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      res.json(user);
    });
};

exports.fetchUserGames = function (req, res) {
  const userId = req.params.id;

  User.findById(userId, '-password')
    .populate({
      path: 'gameSubscriptions',
      select: '_id name description creatorId backgroundImage boards',
    }).exec(function (err, results) {
      if (err) return res.json(err);
      return res.json(StructurePayload(results.toJSON()));
    });
};

function StructurePayload(response) {
  const sortedGames = sortGames(response.gameSubscriptions, response._id);
  const payload = {
    games: {},
    pieces: {},
    user: {
      _id: response._id,
      displayName: response.displayName,
      email: response.email,
      profilePicture: response.profilePicture,
      createdAt: response.createdAt,
      createdGames: sortedGames[0],
      subscribedGames: sortedGames[1],
      color: response.color,
      pieces: response.pieces,
    },
  };

  response.gameSubscriptions.map((game) => {
    game.lastPlayed = game.boards[0];
    delete game.boards;
    payload.games[game._id] = game;
  });
  payload.user.pieces.map((piece) => payload.pieces[piece._id] = piece);
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
  //validate request body
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    //if its not valid respond with a 400 error
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  User.findOne({ email }) // find user object by email
    .then((user) => { // returns a result
      if (!user) { // if no user is found, it adds email error to errors object, then returns a response
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      // we use the bcrypt hashing algorithm (just standard settings) to see if the password matches the saved password
      // note passwords are stored as a password digest hash, never in plain text
      bcrypt.compare(password, user.password) // returns boolean
        .then((isMatch) => {
          // if the password that was sent matches the digested version from the db
          if (isMatch) {
            // create a payload of user data for the response
            const payload = {
              _id: user._id,
              displayName: user.displayName,
              profilePicture: user.profilePicture,
              createdAt: user.createdAt,
              color: user.color,
            }; // payload to be sent to redux store with jwt

            // the payload is encrypted
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: '14 days' }, // from zeit documentation should be same as ms('14 days')
              // after the JWT token is processed, add it to the response and ship it back to the frontend.
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token, // the token is made up of the JWT header, payload, and verify signature
                  payload,
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
                  _id: user._id,
                  displayName: user.displayName,
                  profilePicture: user.profilePicture,
                  subcribedGames: user.gameSubscriptions,
                  color: user.color,
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
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
};

// function structurePiecesPayload(pieces) {
//   const payload = {};
//   pieces.forEach((piece) => {
//     piece.toJSON();
//     payload[piece._id] = piece;
//   });
//   return payload;
// }

// // fetch all the pieces
// exports.fetchPieces = function (req, res) {
//   User.findOne({
//     _id: req.params.userId,
//   })
//     .then((user) => {
//       Piece.find({
//         uploaderId: req.params.userId,
//       })
//         .then((pieces) => {
//           res.json(structurePiecesPayload(pieces));
//         });
//     })
//     .catch(() => res.status(404).json({ error: 'User was not found' }));
// };

// // create a piece
// exports.createPiece = function (req, res) {
//   // const { errors, isValid } = validatePiece(req.body);

//   // if (!isValid) {
//   //   return res.status(400).json(errors);
//   // }

//   User.findOne({ _id: req.body.userId })
//     .then((user) => {
//       const newPiece = new Piece({
//         uploaderId: req.body.userId,
//         imageUrl: req.body.imageUrl,
//       });


//       newPiece.save()
//         .then(() => res.json(newPiece))
//         .catch(() => res.status(422).json(["The piece was not created."]));
//     })
//     .catch(() => res.status(404).json(['User was not found']));
// };

// // delete single piece
// exports.deletePiece = function (req, res) {
//   User.findOne({ _id: req.params.userId })
//     .then((user) => {
//       Piece.findOne({ uploaderId: req.params.userId })
//         .then((piece) => {
//           piece.remove();
//           return res.json('Piece was deleted.');
//         });
//     })
//     .catch(() => res.status(404).json(['User was not found']));
// };
