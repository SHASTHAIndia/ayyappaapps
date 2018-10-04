var express = require("express");
var router = express.Router();
const Result = require("../model/Result");

router.get("/test_route", (req, res) => {
    res.send("router tested.");
});

//method for creating new entry
router.post("/result", (req, res, next) => {
    let newEntry = new Result({
        personId: req.body.personId,
        surveyId: req.body.surveyId,
        surveyCompletedTS: Date.now,
        resultSet: req.body.resultSet

    });
    newEntry.save((err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ msg: "Survey saved success fullly!!" });
        }
    })
});

//method for updating entry
router.put("/result/:id", (req, res, next) => {
    Result.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            personId: req.body.personId,
            surveyId: req.body.surveyId,
            surveyCompletedTS: Date.now,
            resultSet: req.body.resultSet
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
router.delete("/result/:id", (req, res, next) => {
    Result.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

//method for reading entry
router.get("/result", (req, res, next) => {
    Result.find(function (err, query_data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(query_data);
        }
    });
});

router.get("/get_one/:id", (req, res, next) => {
    Result.find({ _id: req.params.id}, function (err, query_data) {
        if (err) {
            res.send(err.message);
        }
        else {
            res.send(query_data);
        }
    });
    
});

//get result of a pirticular survey of a pirticular person
router.get("/get_survey/:personId/:serveyId", (req, res, next) => {
    
    Result.find({ personId: req.params.personId,surveyId:req.params.serveyId}, function (err, query_data) {
        if (err) {
            res.send(err.message);
        }
        else {
            res.send(query_data);
        }
    });

   
});

module.exports = router;
