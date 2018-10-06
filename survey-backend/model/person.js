const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
// Defining ENUMs for the gender field which will use for validation.
var genders = 'MALE FEMALE'.split(' ')
const personSchema = new Schema({
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
    country: {
        type: "Number",
        require:false
    },
    state: {
        type: "Number",
        require:false
    },
    city: {
        type: "Number",
        require:false
    },
    pincode: {
        type: "Number",
        require:false
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
