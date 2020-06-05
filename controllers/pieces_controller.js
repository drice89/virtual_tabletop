/* eslint-disable no-underscore-dangle */
/* eslint-disable no-else-return */
/* eslint-disable prefer-arrow-callback */
const User = require('../models/User');
const Piece = require('../models/Piece');
const validatePiece = require('../validations/piece_validation');

function structurePiecesPayload(pieces) {
  const payload = {};
  pieces.forEach((piece) => {
    piece.toJSON();
    payload[piece._id] = piece;
  });
  return payload;
}

exports.fetchPieces = function (req, res) {
  Piece.find({userId: req.body.userId})
    .then(
      (pieces) => res.json(pieces),
      (err) => res.json(err),
    );
};

exports.createPiece = function (req, res) {
  const { userId, imageUrl } = req.body;
  const { errors, isValid } = validatePiece(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.find({ _id: userId }, function (userError, user) {
    if ((!user) || userError) {
      return res.status(400).json({ message: 'could not find user' });
    }
    Piece.create({ uploaderId: userId, imageUrl })
      .then(
        (piece) => res.json(piece),
        (pieceError) => res.status(400).json(pieceError),
      );
  });
};

exports.editPiece = function (req, res) {
  const { pieceId, imageUrl } = req.body;

  if (imageUrl.trim() === '') {
    return res.status(400).json({ message: 'image url can\'t be blank' });
  }

  Piece.findByIdAndUpdate(pieceId, { imageUrl },
    { new: true },
    function (err, piece) {
      if (!piece || err) {
        return res.status(400).json({ message: 'something went wrong' });
      }
      return res.json(piece);
    });
};

exports.deletePiece = function (req, res) {
  const { pieceId } = req.body;

  Piece.findByIdAndRemove(pieceId)
    .then(
      (piece) => {
        if (!piece) {
          return res.status(400).json({ message: 'could not locate piece' });
        }
        return res.json({ message: 'Piece deleted' });
      },
      (error) => res.status(400).json(error),
    );
};
