const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const stateSchema = new Schema({
    stateId: {
        type: "Number"
        
    },
    name: {
        type: "string",
       
    },
    countryId: {
        type: "Number",
       
    }
    
});

 module.exports = mongoose.model("State",stateSchema,"state");
