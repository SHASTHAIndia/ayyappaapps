var express = require("express");
var router = express.Router();
const Survey = require("../model/survey");
const Question = require("../model/question");
const Result = require("../model/result");
var inArray = require("in-array");

router.get("/test_survey", (req, res) => {
    res.send("router tested.");
});

//method for creating new entry
router.post("/survey", (req, res, next) => {
    var rsltarr = {
        "status": false,
        "msg": ""
    };
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
            rsltarr = {
                "status": false,
                "msg": err.message
            };
            res.json(rsltarr);
        }
        else {
            rsltarr = {
                "status": true,
                "msg": "Survey saved success fullly!!"
            };
            res.json(rsltarr);

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

    Survey.
        find({})
        .populate('questions')  //questions -> field name
        //.populate('createdBy','userName') // createdBy -> Filed name in parent table; userName -> Fileds wants to be listed in the population
        .exec(function (err, question) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(question);
            }
            //console.log( question);
            // prints "The author is Ian Fleming"
        });



});

router.get("/active_only", (req, res, next) => {
    Survey.find({ surveyStatus: "A" }, function (err, query_data) {
        if (err) {
            res.json(err.message);
        }
        else {
            res.json(query_data);
        }
    });

});

// Get survey details along with the question list
// id => Survey ID
router.get("/get_one/:id", (req, res, next) => {

    Survey.
        findOne({ "_id": req.params.id })
        .populate('questions')  //questions -> field name
        //.populate('createdBy','userName') // createdBy -> Filed name in parent table; userName -> Fileds wants to be listed in the population
        .exec(function (err, question) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(question);
            }
            //console.log( question);
            // prints "The author is Ian Fleming"
        });


});

//for getting responses on a pirticular survey
// For admin panel
router.get("/responses/:survey_id", (req, res, next) => {

    Result.findOne({ "surveyId": req.params.survey_id }).
        populate('Survey').
        exec(function (err, question) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(question);
            }
            //console.log( question);
            // prints "The author is Ian Fleming"
        });


});


//Used to verify whether the user is already registered and if yes, returns the user data)
router.get("/survey_attended/:personId/:surveyId", (req, res, next) => {
    var result = {
        "status": true,
        "msg": "",
        "survey_attended": false

    };
    var survey_attended = false;
    var userData = [];
    //check email is exists
    Result.findOne({ personId: req.params.personId, surveyId: req.params.surveyId }, function (err, user) {
        if (err) {
            result = {
                "status": false,
                "msg": err,
                "survey_attended": false

            };
            res.json(result);
        }
        if (user) {
            survey_attended = true;
            result = {
                "status": true,
                "msg": "Success",
                "survey_attended": survey_attended

            };
            res.json(result);
        }



    });

    //res.send(result);

});


//SREERAG 15-10-2018
//method for updating question list
//will update question list with adding new questions to the existsing ones in the DB. If the parameters have duplicate question IDs, the API will skip them
//parameter format
/* 
{
    "questions":
    [
            "5bbf4f95141f8a24705203f3",
            "5bb74891bd85e50630ced8ad",
            "5bbf4f28141f8a24705203f2"
            
            ]
  } 
  */
router.put("/question_map/:survey_id", (req, res, next) => {

    var rsltarr = {
        "status": false,
        "msg": ""
    };

    var questionsArra = [];

    Survey.find({ _id: req.params.survey_id }, function (err, query_data) {
        if (err) {
            rsltarr = {
                "status": false,
                "msg": err.message
            };
            res.json(rsltarr);
        }
        else {
            if (query_data) {

                if (query_data[0]) {
                    query_data[0].questions.forEach(function (item_exists) {
                        questionsArra.push(item_exists);
                    });
                    req.body.questions.forEach(function (item) {

                        questionsArra.push(item);

                    });

                    // For avoiding duplicate values in your questions, use the $addToSet operator.
                    Survey.update({ _id: req.params.survey_id }, {
                        $addToSet: {
                            questions: questionsArra
                        }
                    },
                        function (err, result) {
                            if (err) {
                                rsltarr = {
                                    "status": false,
                                    "msg": err.message
                                };
                                res.json(rsltarr);
                            }
                            else {
                                rsltarr = {
                                    "status": true,
                                    "msg": "Success fully mapped"
                                };
                                res.json(rsltarr);
                            }
                        }
                    );


                }

            }
            else {
                rsltarr = {
                    "status": false,
                    "msg": "Invalid survey ID. No survey exist with the provided ID"
                };
                res.json(rsltarr);
            }

        }
    });


});



function contains(arr, element) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == element) {
            return true;
        }
    }
    return false;
}
//SREERAG 15-10-2018
//method for removing  questions from survey list
//parameter format - an array of quetion IDs to remove
/*
[
            "5bbf4f95141f8a24705203f3",
            "5bb74891bd85e50630ced8ad",
            "5bbf4f28141f8a24705203f2"
            
            ]
*/
router.put("/unmap_question/:survey_id", (req, res, next) => {

    var rsltarr = {
        "status": false,
        "msg": ""
    };



    var questionsArra = [];

    Survey.find({ _id: req.params.survey_id }, function (err, query_data) {
        if (err) {
            rsltarr = {
                "status": false,
                "msg": err.message
            };
            res.json(rsltarr);
        }
        else {
            if (query_data) {

                if (query_data[0]) {
                    query_data[0].questions.forEach(function (item_exists) {
                        /* var inArray = require('in-array');
                        console.log(inArray(['a', 'b', 'c'], 'a'));
                        //=> true */

                        if (!contains(req.body, item_exists))
                        //if(exists_chk)
                        {
                            questionsArra.push(item_exists);
                        }
                        /*  if(!inArray(req.body,item_exists))
                         {
                             res.send(item_exists+" not exists");  
                         } */

                    });

                    // For avoiding duplicate values in your questions, use the $addToSet operator.
                    Survey.update({ _id: req.params.survey_id }, {
                        $set: {
                            questions: questionsArra
                        }
                    },
                        function (err, result) {
                            if (err) {
                                rsltarr = {
                                    "status": false,
                                    "msg": err.message
                                };
                                res.json(rsltarr);
                            }
                            else {
                                rsltarr = {
                                    "status": true,
                                    "msg": "Success fully unmapped"
                                };
                                res.json(rsltarr);
                            }
                        }
                    );


                }

            }
            else {
                rsltarr = {
                    "status": false,
                    "msg": "Invalid survey ID. No survey exist with the provided ID"
                };
                res.json(rsltarr);
            }

        }
    });


});

module.exports = router;
