const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const adminSchema = new Schema({
    userName: {
        type: "string",
        require:[true,'User Name is required']
    },
    password: {
        type: "string",
        require:[true,'password is required']
    }
    
});

 module.exports = mongoose.model("Admin",adminSchema,"admin");
