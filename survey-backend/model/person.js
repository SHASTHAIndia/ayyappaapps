const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
// Defining ENUMs for the gender field which will use for validation.
var genders = 'MALE FEMALE'.split(' ')
const personSchema = mongoose.Schema({
    userName: {
        type: "string",
        require:true
    },
    userEmail: {
        type: "string",
        unique:true,
        require:true,
        match: /\S+@\S+\.\S+/

    },
    userAddress: {
        type: "string",
        require:true
    },
    userAdhaar: {
        type: "string",
        require:true
    },
    userPhone: {
        type: "string",
        require:true
    },
    userDob: {
        type: "string",
        require:false
    },
    userGender: {
        type: "string",
        require:true,
        enum: genders
    },

});
personSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Person",personSchema);
