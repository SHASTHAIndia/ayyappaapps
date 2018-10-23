const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const resultSchema = new Schema({
    personId: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        //type: "number",
        require: [true, 'Person is required']
    },
    userName: {
        type: "string",
        require: [true, 'Name is required']
    },
    userAdhaar: {
        type: "number",
        require: [true, 'Name is required']
    },
    surveyId: {
        type: Schema.Types.ObjectId,
        ref: 'Survey',
        //type: "number",
        require: [true, 'Survey is required']
    },
    surveyCompletedTS: {
        type: Date,
        //require:[true,'completed time is required'],
        default: Date.now,

    },
    resultSet: {
        type : "array",

        require : false
    }

});

module.exports = mongoose.model("Result", resultSchema);
