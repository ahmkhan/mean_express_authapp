/**
 * Created by Ahmer Khan on 01-Mar-17.
 */

const express                   = require('express');
const router                    = express.Router();
const passport                  = require('passport');
const serverControllers         = require('../controllers/usersControllers').Controllers.Server;

//Register User
router.post('/register', serverControllers.saveNewUser);

//Authenticate User
router.post('/authenticate', serverControllers.authenticateUser);

//User Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

//OR
//router.get('/profile', (req, res, next) => {
//    res.send('User Profile');
//});


module.exports = router;