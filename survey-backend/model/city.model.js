const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const citySchema = new Schema({
    cityId: {
        type: "Number"
        
    },
    name: {
        type: "string",
       
    },
    stateId: {
        type: "Number",
       
    }
    
});

 module.exports = mongoose.model("City",citySchema,"city");
