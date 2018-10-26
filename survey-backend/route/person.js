var express = require("express");
var router = express.Router();
const Person = require("../model/person");
const Result = require("../model/result");
var request = require('request');
//let fetch = require('node-fetch');

router.get("/test_route", (req, res) => {

    /* fetch('http://localhost:3000/person/user_verify/244515861487/5bb7402d6ef3300dbcda9dcb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}'
    }).then(response => {
        res.send(response);
        
    }).catch(err => {  res.send(err); }); */

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var baseUrl = req.protocol + '://' + req.get('host');

    //res.send(baseUrl);

    request(baseUrl + '/person/user_verify/244515861487/5bb7402d6ef3300dbcda9dcb', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Print the google web page.
            // JSON.parse(response.body)
            var resultApi = JSON.parse(response.body);
            //res.json(resultApi.user_details._id);
            res.json(resultApi);
        }
    })


    // res.send("router tested.");
});

//method for creating new entry
router.post("/user", (req, res, next) => {
    let newUser = new Person({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userAddress: req.body.userAddress,
        userAdhaar: req.body.userAdhaar,
        userPhone: req.body.userPhone,
        userDob: req.body.userDob,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        userGender: req.body.userGender,
    });
    newUser.save((err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ msg: "User saved success fullly!!" });
        }
    })
});

//method for updating entry
router.put("/user/:id", (req, res, next) => {
    Person.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userAddress: req.body.userAddress,
            userAdhaar: req.body.userAdhaar,
            userPhone: req.body.userPhone,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            userDob: req.body.userDob,
            userGender: req.body.userGender,
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
router.delete("/user/:id", (req, res, next) => {
    Person.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

//method for reading entry
router.get("/user", (req, res, next) => {
    Person.find(function (err, users) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(users);
        }
    });
});



//Used to verify whether the user is already registered and also check if the user is already attended the survey(If that user exists)
router.get("/user_verify/:adhaar/:survey_id", (req, res, next) => {
    var result = {
        "status": true,
        "msg": "",
        "user_exists": false,
        "survey_attended": false,
        "user_details": []
    };


    //check adhaar(User) is exists
    Person.findOne({ userAdhaar: req.params.adhaar }, function (err, user) {
        if (err) {
            result = {
                "status": false,
                "msg": err.message,
                "user_exists": false,
                "survey_attended": false,
                "user_details": []
            };
            res.json(result);
        }
        //res.send(user._id);
        if (user) { // user exists

            //checkin result table for finding, whether the user attended the surveyor not
            Result.find({ personId: user._id, surveyId: req.params.survey_id }, function (err, query_data) {
                if (err) {
                    result = {
                        "status": true,
                        "msg": err.message,
                        "user_exists": true,
                        "survey_attended": false,
                        "user_details": user
                    };
                    res.json(result);

                }
                else {
                    if (query_data === undefined || query_data.length == 0) {
                        result = {
                            "status": true,
                            "msg": "Success",
                            "user_exists": true,
                            "survey_attended": false,
                            "user_details": user
                        };
                        res.json(result);
                    }
                    else {
                        /* result = {
                            "msg":'data'+ query_data,
                           };
                 res.json(result); */
                        result = {
                            "status": true,
                            "msg": "Success",
                            "user_exists": true,
                            "survey_attended": true,
                            "user_details": user
                        };

                        res.json(result);
                    }

                }
            });
        }
        else { //user not exists
            result = {
                "status": true,
                "msg": "Success",
                "user_exists": false,
                "survey_attended": false,
                "user_details": []
            };
            res.json(result);
        }


    });



    //res.send(result);

});

//Used to verify whether the user is already registered and if yes, returns the user data)
router.get("/user_exists/:adhaar", (req, res, next) => {
    var result = {
        "status": true,
        "msg": "",
        "exists": false,
        "user_details": []
    };
    var user_exists = false;

    //check email is exists
    Person.findOne({ userAdhaar: req.params.adhaar }, function (err, user) {
        if (err) {
            result = {
                "status": false,
                "msg": err,
                "exists": false,
                "user_details": []
            };
            res.json(result);
        }
        //res.send(user._id);
        if (user) {
            user_exists = true;
            result = {
                "status": true,
                "msg": "Success",
                "exists": user_exists,
                "user_details": user
            };
            res.json(result);
        }


    });

    //res.send(result);

});



module.exports = router;
