var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");

var app = express();

//const route=require("./route/routes");
const route_person=require("./route/person");
const route_survey=require("./route/survey");
const route_question=require("./route/question");
const route_result=require("./route/result");
//connectto mongo db
var connection = mongoose.connect("mongodb://localhost:27017/survey");

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected at port 27017");
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});

const PORT = 3000;

app.use(cors()); //allow server to request and response from different ports in the same machine. Usedto interact with angular project which runs in another port

app.use(bodyparser.json()); //helps to parse json data in the request body

//app.use("/api",route); // any call to api will diverted to routes.js
app.use("/person",route_person);
app.use("/survey",route_survey);
app.use("/question",route_question);
app.use("/result",route_result);

app.get("/", (req, res) => {
    res.send("Node Server has been started from the port - " + PORT);
});
app.listen(PORT, () => {
    console.log("Server has been started from the port - " + PORT)
});
