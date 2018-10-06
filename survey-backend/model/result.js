const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const resultSchema = mongoose.Schema({
    personId: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        //type: "number",
        require: [true, 'Person is required']
    },
    surveyId: {
        type: Schema.Types.ObjectId,
        ref: 'Survey',
        //type: "number",
        require: [true, 'Survey is required']
    },
    surveyCompletedTS: {
        type: "string",
        //require:[true,'completed time is required'],
        default: Date.now,

    },
    resultSet: [{
        type: Schema.Types.ObjectId,
        ref: 'Result',
        require: false
    }]

});

module.exports = mongoose.model("Result", resultSchema);
