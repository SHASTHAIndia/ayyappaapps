const mongoose = require("mongoose");
//var status = 'A;I'.split(';')
var status = ['A','I'];
const surveySchema = mongoose.Schema({
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
        require:[true,'Status is required']
    },
    startDate: {
        type: "string",
        require:[true,'Start Date is required']
    },
    expiryDate: {
        type: "string",
        require:[true,'Expiry Date is required']
    },
    createdBy: {
        type: "number",
        require:[true,'Created By is required']
    },
    createdOn: {
        type: "string",
        require:[true,'CreatedOn is required']
    },
    questions: {
        type: "array",
        
    },


});

 module.exports = mongoose.model("Survey",surveySchema);
