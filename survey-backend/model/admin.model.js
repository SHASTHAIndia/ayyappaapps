const mongoose = require("mongoose");
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

const adminSchema = new Schema({
    userName: {
        type: "string",
        require: [true, 'User Name is required'],
        unique: true
    },
    hash: {
        type: "string"
       
    },
    salt: {
        type: "string"
    }

});
adminSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

adminSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

adminSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        userName: this.userName,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model("Admin", adminSchema, "admin");
