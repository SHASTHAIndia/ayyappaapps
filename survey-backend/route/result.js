var express = require("express");
var router = express.Router();
const Result = require("../model/result");
const Person = require("../model/person");
var request = require('request');

router.get("/test_route", (req, res) => {
    res.send("router tested.");
});

//method for creating new entry
router.post("/result", (req, res, next) => {
    let newEntry = new Result({
        personId: req.body.personId,
        userName: req.body.userName,
        userAdhaar: req.body.userAdhaar,
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


//api for saaving survey result
//pass newUser = "YES", if this is a new user. Unless pass "NO"
router.post("/save/:surveyId/:adhaarNo", (req, res, next) => {

    var baseUrl = req.protocol + '://' + req.get('host');

    var dateToday = new Date().toLocaleDateString();

    var rsltarr = {
        "status": false,
        "msg": ""
    };

    request(baseUrl + '/person/user_verify/' + req.params.adhaarNo + '/' + req.params.surveyId, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Print the google web page.
            // JSON.parse(response.body)
            var resultApi = JSON.parse(response.body);

            if (resultApi.user_exists) { // User exists

                Person.find({ "userAdhaar": req.params.adhaarNo }, function (err, query_data) {
                    if (err) {
                        resultArr = {
                            "status": false,
                            "msg": err.message
                        };
                        res.json(resultArr);
            
                    }
                    else {
            
                        //res.json(query_data._id); 

                        Person.update({ userAdhaar: req.params.adhaarNo }, {
                            $set: {
                                userName: req.body.userName,
                                userGender: req.body.userGender,
        
                            }
                        },
                            function (err, responseArr) {
                                if (err) {
                                    rsltarr = {
                                        "status": false,
                                        "msg": err.message
                                    };
                                    res.json(rsltarr);
                                }
                                else { // user updated 
                                   
                                    let newEntry = new Result({
                                        personId: query_data._id,
                                        userName: req.body.userName,
                                        userAdhaar: req.body.userAdhaar,
                                        surveyId: req.params.surveyId,
                                        surveyCompletedTS: dateToday,
                                        resultSet: req.body.resultSet
            
                                    });
                                    newEntry.save((err, user) => {
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
                                    });
                                    
                                }
                            }
                        );
                    }
                });

               
            }
            else // new user
            {
                let newEntry = new Person({
                    userName: req.body.userName,
                    userAdhaar: req.body.userAdhaar,
                    userGender: req.body.userGender,

                });
                newEntry.save((err, user) => {
                    if (err) {
                        rsltarr = {
                            "status": false,
                            "msg": err.message
                        };
                        res.json(rsltarr);
                    }
                    else {


                        let newEntry = new Result({
                            personId: user._id,
                            userName: req.body.userName,
                            userAdhaar: req.body.userAdhaar,
                            surveyId: req.params.surveyId,
                            surveyCompletedTS: dateToday,
                            resultSet: req.body.resultSet

                        });
                        newEntry.save((err, user) => {
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
                        });

                        // res.json({ msg: "Survey saved success fullly!!" });
                    }
                })

            }
        }
        else {
            rsltarr = {
                "status": false,
                "msg": error.message
            };
            res.json(rsltarr);
        }
    })



});

//method for updating entry
router.put("/result/:id", (req, res, next) => {
    Result.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            personId: req.body.personId,
            userName: req.body.userName,
            userAdhaar: req.body.userAdhaar,
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
    Result.find({ _id: req.params.id }, function (err, query_data) {
        if (err) {
            res.json(err.message);
        }
        else {
            res.json(query_data);
        }
    });

});

//get result of a pirticular survey of a pirticular person
router.get("/get_survey/:personId/:serveyId", (req, res, next) => {


    Result.findOne({ "personId": req.params.personId, "surveyId": req.params.serveyId })
        .populate('personId')  //personId -> field name
        .populate('surveyId')
        .exec(function (err, question) {
            if (err) {
                res.json(err.message);
            }
            res.json(question);
            //console.log( question);
            // prints "The author is Ian Fleming"
        });



});

//get result of a pirticular survey of a pirticular person by adhaar number
router.get("/get_survey_result_by_adhaar/:adhaarNo/:serveyId", (req, res, next) => {


    Result.findOne({ "userAdhaar": req.params.adhaarNo, "surveyId": req.params.serveyId })
        .populate('personId')  //personId -> field name
        .populate('surveyId')
        .exec(function (err, question) {
            if (err) {
                res.json(err.message);
            }
            res.json(question);
            //console.log( question);
            // prints "The author is Ian Fleming"
        });



});

module.exports = router;
