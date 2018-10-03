const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Defining ENUMs for the gender field which will use for validation.
var status = ['A','I'];
//var used_status = ['Y','N'];
var type = ['TXT','TXTA','OPT','SLT','CHK'];
const resultSchema = mongoose.Schema({
    personId: {
        type: Schema.Types.ObjectId,
        require:[true,'Person ID is required']
    },
    surveyId: {
        type: Schema.Types.ObjectId,
        require:[true,'surveyID is required'],
       
    },
    surveyCompletedTS: {
        type: "string",
        //require:[true,'completed time is required'],
        default:Date.now,
       
    },
   resultSet: {
        type: "array",
        require:false
    }
    
});

module.exports = mongoose.model("Result",resultSchema);
