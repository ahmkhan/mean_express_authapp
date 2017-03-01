/*
 Created by Ahmer Khan on 01-Mar-17.
 */

const bcrypt        = require('bcryptjs');
const usersModel    = require('../schema/userSchema').getUsersModel();


exports.Repository                  = exports.Repository || {};
exports.Repository.usersRepo        = exports.Repository.usersRepo || {};




exports.Repository.usersRepo.saveNewUser = function (newUserObj, callback) {
    var newUserObjData = new usersModel(newUserObj);

    bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(newUserObjData.UserPassword, salt, (err, hash) => {
        if (err) {
        console.log('err', err);
    }
    else {
        newUserObjData.UserPassword = hash;
        newUserObjData.save(callback);
    }
    })
    });

};

exports.Repository.usersRepo.getUserById = function (id, callback) {
    usersModel.findById(id, callback);
};

exports.Repository.usersRepo.getUserByUserName = function (userName, callback) {
    const query = {UserName: userName};
    usersModel.findOne(query, callback);
};

exports.Repository.usersRepo.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) {
            throw err;
        }

        else {
            callback(null, isMatch);
        }
    });
};