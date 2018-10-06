const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const countrySchema = new Schema({
    countryId: {
        type: "Number"
        
    },
    sortname: {
        type: "string",
       
    },
    name: {
        type: "string",
       
    }
    
});

 module.exports = mongoose.model("Country",countrySchema,"country");
