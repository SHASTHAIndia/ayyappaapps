const mongoose = require("mongoose");
var Schema = mongoose.Schema;
//var status = 'A;I'.split(';')
var status = ['A','I'];
const surveySchema = new Schema({
    surveyName: {
        type: "string",
        require:[true,'Survay Name is required']
    },
    surveyMessage: {
        type: "string",
        require:[true,'Message is required']
    },
    surveyDeclaration: {
        type: "string",
        require:[true,'Declaration is required']
    },
    surveyStatus: {
        type: "string",
        enum:status,
        require:[true,'Status is required'],
        default:"A"
    },
    startDate: {
        type: "string",
        require:[true,'Start Date is required']
    },
    expiryDate: {
        type: "string",
        require:[true,'Expiry Date is required']
    },
    /* createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        //type: "number",
        require:false
    }, */
    createdOn: {
        type: "string",
        require:[true,'CreatedOn is required']
    },
    /* questions: {
        type: "array",
        
    }, */

    questions: [
        {type: Schema.Types.ObjectId, ref: 'Question'}
    ]


});

 module.exports = mongoose.model("Survey",surveySchema);
