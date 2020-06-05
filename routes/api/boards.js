const express = require('express');
const router = express.Router();
const upload = require('../../config/aws_interface');
const boardController = require('../../controllers/boards_controller');

const passport = require('passport');

//fetch board
router.get('/:id', passport.authenticate('jwt', {session: false}), boardController.fetchBoard)

//board create route
router.post('', upload.uploadBoardImage.single('backgroundImage'), passport.authenticate('jwt', {session: false}), boardController.createBoard)

//board delete route
router.delete('/:id', passport.authenticate('jwt', {session: false}), boardController.deleteBoard)

//board update route
router.patch('/:id', passport.authenticate('jwt', {session: false}), boardController.updateBoard)

//board create token
router.post('/:boardId/tokens/', passport.authenticate('jwt', {session: false}), boardController.createToken)

//board edit token
router.patch('/:boardId/tokens/:tokenId', passport.authenticate('jwt', {session: false}), boardController.updateToken)

//board delete token
router.delete('/:boardId/tokens/:tokenId', passport.authenticate('jwt', {session: false}), boardController.deleteToken)


module.exports = router;
