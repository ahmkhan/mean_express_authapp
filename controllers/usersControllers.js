/*
 Created by Ahmer Khan on 01-Mar-17.
 */

const passport      = require('passport');
const jwt           = require('jsonwebtoken');
const config     = require('../config/database');
const usersRepo     = require('../repository/usersRepo').Repository.usersRepo;


exports.Controllers                 = exports.Controllers || {};
exports.Controllers.Server          = exports.Controllers.Server || {};



exports.Controllers.Server.saveNewUser = function (req, res, next) {
    var newUserData = {
        FullName : req.body.FullName,
        UserEmail : req.body.UserEmail,
        UserName : req.body.UserName,
        UserPassword : req.body.UserPassword,
    };

    usersRepo.saveNewUser(newUserData, (err, userSaved) => {
        if (err) {
        res.json({status: false, message: 'Failed to save new User'});
        }
        else {
        res.json({status: true, message: 'Successfully Save New User'});
        }
    });
};


exports.Controllers.Server.authenticateUser = function (req, res, next) {
    const userName      = req.body.UserName;
    const userPassword  = req.body.UserPassword;

    usersRepo.getUserByUserName(userName, (err, foundUserName) => {
        if (err) {
        throw err;
        }

        if (!foundUserName) {
            return res.json({status: false, message: 'User Not Found'})
        }

        usersRepo.comparePassword(userPassword, foundUserName.UserPassword, (err, isMatch) => {
            if (err) {
                throw err;
            }

            if (isMatch) {
                const token = jwt.sign(foundUserName, config.secret, {
                    expiresIn : 600  //seconds
                });

                res.json({
                    status: true,
                    token: 'JWT ' + token,
                    userData: {
                        id: foundUserName._id,
                        FullName: foundUserName.FullName,
                        UserName: foundUserName.UserName,
                        UserEmail: foundUserName.UserEmail

                    }
                })
            }

            else {
                return res.json({status: false, message: 'Wrong Password!!!!'})
            }
        })
    })
};