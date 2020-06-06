const express = require('express');
const router = express.Router();
const gameController = require('../../controllers/games_controller');
const passport = require('passport'); 

//route '/api/games'

//index
router.get('', gameController.fetchAll);
//index for user
router.get('/:id', gameController.fetchGame);
//create
// router.post('/create', passport.authenticate('jwt', {session: false}), gameController.createGame)
router.post('/create', gameController.createGame);
//patch
router.post('/join', passport.authenticate('jwt', { session: false }), gameController.joinGame);
//delete 
router.delete('/:id', gameController.deleteGame);

router.patch('/edit', gameController.editGame);


module.exports = router;
module.exports = router;
