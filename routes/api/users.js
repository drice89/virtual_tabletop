const express = require('express'); 
const router = express.Router();
const userController = require("../../controllers/users_controller")



router.get('/test', (req, res) => res.json({msg: 'this is msg'}))
router.get('/:id', passport.authenticate('jwt', { session: false }), userController.fetchUserGames)

router.post('/register', userController.register)
router.post('/login', userController.login)



module.exports = router; 
