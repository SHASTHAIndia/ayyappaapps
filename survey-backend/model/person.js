const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
// Defining ENUMs for the gender field which will use for validation.
var genders = 'MALE FEMALE OTHER'.split(' ')
const personSchema = new Schema({
    userName: {
        type: "string",
        require:true
    },
    userEmail: {
        type: "string",
        unique:true,
        require:false,
        match: /\S+@\S+\.\S+/

    },
    userAddress: {
        type: "string",
        require:false
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
        require:true,
        unique:true
    },
    userPhone: {
        type: "string",
        require:false
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
