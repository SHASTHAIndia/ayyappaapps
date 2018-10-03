const mongoose = require("mongoose");
// Defining ENUMs for the gender field which will use for validation.
var genders = 'MALE FEMALE'.split(' ')
const personSchema = mongoose.Schema({
    userName: {
        type: "string",
        require:true
    },
    userEmail: {
        type: "string",
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

module.exports = mongoose.model("Person",personSchema);
