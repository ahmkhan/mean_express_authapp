/*
 Created by Ahmer Khan on 01-Mar-17.
 */

const JwtStrategy       = require('passport-jwt').Strategy;
const ExtractJWT        = require('passport-jwt').ExtractJwt;
const usersRepo         = require('../repository/usersRepo').Repository.usersRepo;
const configDatabase    = require('../config/database');


module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJWT.fromAuthHeader();
    opts.secretOrKey = configDatabase.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
            usersRepo.getUserById(jwt_payload._doc._id, (err, user) => {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
        }))
};
