const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const resultSchema = mongoose.Schema({
    personId: {
        //type: Schema.Types.ObjectId,
        type: "number",
        require:[true,'Person ID is required']
    },
    surveyId: {
       //type: Schema.Types.ObjectId,
       type: "number",
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
