const mongoose = require("mongoose");
// Defining ENUMs for the gender field which will use for validation.
var status = ['A','I'];
var mandatory_values = ['YES','NO'];
var Schema = mongoose.Schema;
//var used_status = ['Y','N'];
var type = ['TXT','TXTA','OPT','SLT','CHK'];
const questionSchema = new Schema({
    question: {
        type: "string",
        require:[true,'question is required']
    },
    questionMandatory: {
        type: "string",
        enum:mandatory_values,
        require:[true,'Mandatory is required'],
        default : "NO"
    },
    questionStatus: {
        type: "string",
        enum:status,
        require:[true,'Status is required'],
        default:"A"
    },
    /* questionCodeNo: {
        type: "number",
        require:[true,'question code number is required'],
        unique: true
    }, */
    questionType: {
        type: "string",
        require:[true,'question type is required'],
        default:"TXT",
        enum: type
    },
    usedStatus: {
        type: "boolean",
        require:[true,'used status is required'],
        default : false
       // enum: used_status
    },
    answerOptions: {
        type: "array",
        require:false
    }
    
});

module.exports = mongoose.model("Question",questionSchema);
