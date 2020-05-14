const express = require('express'); 
const router = express.Router();
const usersController = require("../../controllers/users_controller");
const passport = require("passport");


//route from '/api/users'
router.get('/:id', passport.authenticate('jwt', { session: false }), usersController.fetchUserGames)

router.post('/register', usersController.register);
router.post('/login', usersController.login);



//fetch all pieces for this user
router.get('/:userId/pieces', usersController.fetchPieces);

//create a piece
router.post('/:userId/pieces', usersController.createPiece);

//delete a piece
router.delete('/:userId/pieces/:pieceId', usersController.deletePiece);



module.exports = router;

