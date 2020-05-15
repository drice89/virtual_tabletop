const express = require('express');
const router = express.Router();



const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const boardController = require('../../controllers/boards_controller');

const passport = require('passport');

//board create route
router.post('', upload.single('backgroundImage'), passport.authenticate('jwt', {session: false}), boardController.createBoard)

//board delete route
router.delete('/:id', passport.authenticate('jwt', {session: false}), boardController.deleteBoard)

//board update route
router.patch('/:id', passport.authenticate('jwt', {session: false}), boardController.updateBoard)

//board create token
router.post('/:boardId/token/', passport.authenticate('jwt', {session: false}), boardController.createToken)

//board edit token
router.patch('/:boardId/token/:tokenId', passport.authenticate('jwt', {session: false}), boardController.editToken)

//board delete token
router.delete('/:boardId/token/:tokenId', passport.authenticate('jwt', {session: false}), boardController.deleteToken)


 
module.exports = router;    
    