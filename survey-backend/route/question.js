var express = require("express");
var router = express.Router();
const Question = require("../model/question");
const Survey = require("../model/survey");

router.get("/test_route", (req, res) => {
    res.send("router tested.");
});

//method for creating new entry
router.post("/question", (req, res, next) => {
    // res.json(req.body);
    // console.log();
    let newEntry = new Question({
        question: req.body.question,
        //questionCodeNo: req.body.questionCodeNo,
        questionType: req.body.questionType,
        usedStatus: false,
        questionStatus: req.body.questionStatus,
        answerOptions: req.body.answerOptions,
        questionMandatory: req.body.questionMandatory

    });
    newEntry.save((err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ msg: "Question saved success fullly!!" });
        }
    })
});

//method for updating entry
router.put("/question", (req, res, next) => {
    Question.findOneAndUpdate({ _id: req.body.id }, {
        $set: {
            question: req.body.question,
            //questionCodeNo: req.body.questionCodeNo,
            questionType: req.body.questionType,
            questionStatus: req.body.questionStatus,
            questionMandatory: req.body.questionMandatory,
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

    var resultArr = {
        "status": false,
        "msg": "No Operation"
    };
    //check question is used
    Survey.find({ "questions": { "$in": [req.params.id] } }, function (err, query_data) {
        if (err) {
            resultArr = {
                "status": false,
                "msg": err.message
            };
            res.json(resultArr);

        }
        else {

            if (query_data === undefined || query_data.length == 0) {
                Question.remove({ _id: req.params.id }, function (err, result) {
                    if (err) {
                        resultArr = {
                            "status": false,
                            "msg": err.message
                        };
                        res.json(resultArr);

                    }
                    else {
                        resultArr = {
                            "status": true,
                            "msg": "Successfully Deleted"
                        };
                        res.json(resultArr);
                    }
                });
            }
            else {
                resultArr = {
                    "status": false,
                    "msg": "You cannot delete this question, since it is used in one or more survey "
                };
                res.json(resultArr);
            }
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

    Question.findOne({ _id: req.params.id }, function (err, query_data) {
        if (err) {
            res.json(err.message);
        }
        else {
            res.json(query_data);
        }
    });

});


router.get("/active_only", (req, res, next) => {
    Question.find({ questionStatus: "A" }, function (err, query_data) {
        if (err) {
            res.json(err.message);
        }
        else {
            res.json(query_data);
        }
    });

});

module.exports = router;
