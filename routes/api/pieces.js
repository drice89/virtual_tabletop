const express = require('express');
const upload = require('../../config/aws_interface');
const piecesController = require('../../controllers/pieces_controller');

const router = express.Router();


router.get('/all', piecesController.fetchPieces);

router.post('/create',
  upload.uploadPieceImage.single('backgroundImage'),
  piecesController.createPiece);

router.patch('/edit',
  upload.uploadPieceImage.single('backgroundImage'),
  piecesController.editPiece);

router.delete('/delete', piecesController.deletePiece);

module.exports = router;
