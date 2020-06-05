/* eslint-disable no-underscore-dangle */
/* eslint-disable no-else-return */
/* eslint-disable prefer-arrow-callback */
const User = require('../models/User');
// const Piece = require('../models/User');
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
  Piece.find({ userId: req.body.userId })
    .then(
      (pieces) => res.json(pieces),
      (err) => res.json(err),
    );
};

exports.createPiece = function (req, res) {
  const { creatorId } = req.body;
  const { errors, isValid } = validatePiece(req.file);
  if (!isValid) {
    return res.status(400).json(errors.imageUrl);
  }
  const piece = { uploaderId: creatorId, imageUrl: req.file.location };

  User.findOne({ _id: creatorId }, function (userError, user) {
    if ((!user) || userError) {
      return res.status(400).json({ error: 'could not find user' });
    }
    user.pieces.push(piece);
    user.save().then((updated) => res.json(updated.pieces[updated.pieces.length - 1]));
  });
};

exports.editPiece = function (req, res) {
  const { pieceId, imageUrl } = req.body;

  if (imageUrl.trim() === '') {
    return res.status(400).json({ error: 'image url can\'t be blank' });
  }

  Piece.findByIdAndUpdate(pieceId, { imageUrl },
    { new: true },
    function (err, piece) {
      if (!piece || err) {
        return res.status(400).json({ error: 'something went wrong' });
      }
      return res.json(piece);
    });
};

exports.deletePiece = function (req, res) {
  const { creatorId, pieceId } = req.body;
  console.log(req)
  User.findById(creatorId, function (err, user) { 
    if (err || !user) return res.status(400).json({ error: 'Could not locate user' });

    user.pieces.id(pieceId).remove();
    user.save().then(() => res.json(pieceId));
  });
};
