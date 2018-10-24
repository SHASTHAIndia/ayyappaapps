var express = require("express");

var mongoose = require("mongoose");

var bodyparser = require("body-parser");
var cors = require("cors");
var morgan = require('morgan');
var passport = require('passport');
//var config = require('./config/database');

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');

// [SH] Bring in the Passport config after model is defined
require('./config/passport');


var app = express();



//const route=require("./route/routes");
const route_person = require("./route/person");
const route_survey = require("./route/survey");
const route_question = require("./route/question");
const route_result = require("./route/result");
const route_admin = require("./route/admin.route");
//connectto mongo db
var connection = mongoose.connect("mongodb://localhost:27017/survey", { useNewUrlParser: true });
//var connection = mongoose.connect(config.database);;

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected at port 27017");
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});

const PORT = 3000;
app.use(cookieParser());
app.use(cors()); //allow server to request and response from different ports in the same machine. Usedto interact with angular project which runs in another port


app.use(passport.initialize());
app.use(bodyparser.json()); //helps to parse json data in the request body

//app.use("/api",route); // any call to api will diverted to routes.js

app.use("/person", route_person);
app.use("/survey", route_survey);
app.use("/question", route_question);
app.use("/result", route_result);
app.use("/admin", route_admin);

// ------ For JWT ---------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });
// ------ For JWT ---------------------------------

app.get("/", (req, res) => {
    res.send("Node Server has been started from the port - " + PORT);
});
app.listen(PORT, () => {
    console.log("Server has been started from the port - " + PORT)
});
