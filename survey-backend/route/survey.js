var express = require("express");
var router = express.Router();
const Survey = require("../model/Survey");
const Question = require("../model/Question");

router.get("/test_survey", (req, res) => {
    res.send("router tested.");
});

//method for creating new entry
router.post("/survey", (req, res, next) => {
    let newSurvey = new Survey({
        surveyName: req.body.surveyName,
        surveyMessage: req.body.surveyMessage,
        surveyDeclaration: req.body.surveyDeclaration,
        surveyStatus: req.body.surveyStatus,
        startDate: req.body.startDate,
        expiryDate: req.body.expiryDate,
        createdBy: req.body.createdBy,
        createdOn: req.body.createdOn,
        questions: req.body.questions

    });
    newSurvey.save((err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ msg: "Survey saved success fullly!!" });
        }
    })
});

//method for updating entry
router.put("/survey/:id", (req, res, next) => {
    Survey.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            surveyName: req.body.surveyName,
            surveyMessage: req.body.surveyMessage,
            surveyDeclaration: req.body.surveyDeclaration,
            surveyStatus: req.body.surveyStatus,
            startDate: req.body.startDate,
            expiryDate: req.body.expiryDate,
            createdBy: req.body.createdBy,
            createdOn: req.body.createdOn,
            questions: req.body.questions
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
router.delete("/survey/:id", (req, res, next) => {
    Survey.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

//method for reading entry
router.get("/survey", (req, res, next) => {
    Survey.find(function (err, surveys) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(surveys);
        }
    });

});

router.get("/active_only", (req, res, next) => {
    Survey.find({ surveyStatus: "A" }, function (err, query_data) {
        if (err) {
            res.send(err.message);
        }
        else {
            res.send(query_data);
        }
    });

});

// Get survey details along with the question list
// id => Survey ID
router.get("/get_one/:id", (req, res, next) => {

    Survey.
        findOne({ "_id": req.params.id }).
        populate('Question').
        exec(function (err, question) {
            if (err) return handleError(err);
            res.send(question);
            //console.log( question);
            // prints "The author is Ian Fleming"
        });

   /*  var matches = Survey.find({ "_id": req.params.id }, { "questions.questionId": 1 }, function (err, query_data) {
        res.send(matches);
    }); */
    // console.log(matches);
    // res.send(matches);
    /* Survey.find().forEeach(
        function(newSurvey)
        {
            newSurvey.question = Questions.find({"_id":{$in:newSurvey.questions.questionId}}).toArray();
            
        }
    ); */



});

module.exports = router;
