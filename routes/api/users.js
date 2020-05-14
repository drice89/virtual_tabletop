const express = require('express'); 
const router = express.Router();
const userController = require("../../controllers/users_controller");
const passport = require("passport");



router.get('/test', (req, res) => res.json({msg: 'this is msg'}))
router.get('/:id', passport.authenticate('jwt', { session: false }), userController.fetchUserGames)

router.post('/register', userController.register);
router.post('/login', userController.login);



//fetch all pieces for this user
router.get('/:userId/pieces', userController.fetchPieces);

//create a piece
router.post('/:userId/pieces', userController.createPiece);

//delete a piece
router.delete('/:userId/pieces/:pieceId', userController.deletePiece);



module.exports = router;

