/*
  Created by Ahmer Khan on 01-Mar-17.
 */

const mongoose = require('mongoose');
const config = require('../config/database');

const userSchema = mongoose.Schema({
    FullName : {type: String},
    UserEmail : {type: String, required: true},
    UserName : {type: String, required: true},
    UserPassword : {type: String, required: true}
});

//const UsersModel = module.exports = mongoose.model('users', userSchema);

//OR
const UsersModel = mongoose.model('usersModel', userSchema);

exports.getUsersModel = function () {
    return UsersModel;
};