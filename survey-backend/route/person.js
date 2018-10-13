var express = require("express");
var router = express.Router();
const Person = require("../model/person");
const Result = require("../model/result");

router.get("/test_route", (req, res) => {
    res.send("router tested.");
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
        "exists": false,
        "survey_attended": false,
        "user_details": []
    };
    
    //check adhaar(User) is exists
    Person.findOne({ userAdhaar: req.params.adhaar }, function (err, user) {
        if (err) {
            result = {
                "status": false,
                "msg": err.message,
                "exists": false,
                "survey_attended": false,
                "user_details": []
            };
            res.json(result);
        }
        //res.send(user._id);
        if (user) { // user exists
           
            //checkin result table for finding, whether the user attended the surveyor not
            Result.find({ personId: user._id,surveyId: req.params.survey_id }, function (err, query_data) {
                if (err) {
                    result = {
                        "status": false,
                        "msg": err.message,
                        "exists": false,
                        "survey_attended": false,
                        "user_details": []
                    };
                    res.json(result);
                   
                }
                else {
                    if(query_data)
                    {
                        result = {
                            "status": true,
                            "msg": "Success",
                            "exists": true,
                            "survey_attended": true,
                            "user_details": user
                        }; 
                        res.json(result);
                    }
                    else 
                    {
                        result = {
                            "status": true,
                            "msg": "Success",
                            "exists": true,
                            "survey_attended": false,
                            "user_details": user
                        }; 
                        res.json(result);
                    }
                    
                }
            });
        }
        else{ //user not exists
            result = {
                "status": true,
                "msg": "Success",
                "exists": false,
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
