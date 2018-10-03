var express = require("express");
var router = express.Router();
const Question = require("../model/Question");

router.get("/test_route", (req, res) => {
    res.send("router tested.");
});

//method for creating new entry
router.post("/question", (req, res, next) => {
    let newEntry = new Question({
        question: req.body.question,
        questionCodeNo: req.body.questionCodeNo,
        questionType: req.body.questionType,
        usedStatus: false,
        answerOptions: req.body.answerOptions
       
    });
    newEntry.save((err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ msg: "User saved success fullly!!" });
        }
    })
});

//method for updating entry
router.put("/question/:id", (req, res, next) => {
    Question.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            question: req.body.question,
            questionCodeNo: req.body.questionCodeNo,
            questionType: req.body.questionType,
            usedStatus: req.body.usedStatus,
            answerOptions: req.body.answerOptions
        }
    },
        function (err, result) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(result);
            }
        }
    );
});

//method for deleting entry
router.delete("/question/:id", (req, res, next) => {
    Question.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

//method for reading entry
router.get("/question", (req, res, next) => {
    Question.find(function (err, query_data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(query_data);
        }
    });
});

router.get("/get_one/:id", (req, res, next) => {
    var query = { _id: req.params.id };
    Question.find(query).toArray(function (err, query_data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(query_data);
        }
    });
});

module.exports = router;
