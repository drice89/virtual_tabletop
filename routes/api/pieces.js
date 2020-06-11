const express = require('express');
const upload = require('../../config/aws_interface');
const piecesController = require('../../controllers/pieces_controller');

const router = express.Router();


router.get('/all', piecesController.fetchPieces);

//uploading to single bucket because of AWS policy issues 
router.post('/create',
  upload.uploadBoardImage.single('imageFile'),
  piecesController.createPiece);

router.patch('/edit',
  upload.uploadBoardImage.single('imageFile'),
  piecesController.editPiece);

router.delete('/delete', piecesController.deletePiece);

module.exports = router;
