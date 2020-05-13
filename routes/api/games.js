const express = require('express');
const router = express.Router();
const gameController = require('../../controllers/games_controller');
const passport = require('passport'); 

router.get('/test', (req, res) => res.json({ msg: 'this is msg' }))
router.get('', gameController.fetchAll)
router.get('/:id', gameController.fetchGame)

router.post('/create', passport.authenticate('jwt', {session: false}), gameController.createGame)
router.post('/join', passport.authenticate('jwt', { session: false }), gameController.joinGame)


module.exports = router; 