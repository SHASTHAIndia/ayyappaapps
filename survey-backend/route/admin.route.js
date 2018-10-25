var express = require("express");
var router = express.Router();
const Admin = require("../model/admin.model");
var passport = require('passport');


router.get("/test_route", (req, res) => {
    res.send("router tested.");
});

//method for creating admin user / Also used for resting admin password to "admin"
// pass only key as GET parameter ; Key  : 780787
router.post("/admin/:key", (req, res, next) => {

    if (req.params.key == "780787") {
        //delete old admin user
        Admin.remove({}, function (err, result) {
            if (err) {
                res.json(err);
            }
            else {
                let adminObj = new Admin();
                adminObj.setPassword("admin");

                let newEntry = new Admin({
                    userName: 'admin',
                    hash: adminObj.hash,
                    salt: adminObj.salt

                });
                newEntry.save((err, user) => {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        res.json({ msg: "Admin saved success fullly!!" });
                    }
                })
            }
        });

    }
    else {
        res.json({ msg: "Invalid Key!!" });
    }

});

//method for changing password
router.put("/password", (req, res, next) => {

    var result = {
        "status": false,
        "msg": "No operation"
    };
    Admin.findOne({ userName: req.body.userName }, function (err, query_data) {
        if (err) {
            result = {
                "status": false,
                "msg": err.message
            };
            res.json(result);
        }
        else {
            //res.json(query_data);
            //if (!query_data) {
            if (query_data === undefined || query_data.length == 0) {
                result = {
                    "status": false,
                    "msg": "Invalid user name"
                };
                res.json(result);



            }
            else {
                // Return if password is wrong
                if (!query_data.validPassword(req.body.oldPassword)) {

                    result = {
                        "status": false,
                        "msg": 'Invalid current password'
                    };
                    res.json(result);

                }
                else {
                    query_data.setPassword(req.body.newPassword);
                    Admin.findOneAndUpdate({}, {
                        $set: {
                            hash: query_data.hash,
                            salt: query_data.salt

                        }
                    },
                        function (err, result) {
                            if (err) {
                                result = {
                                    "status": false,
                                    "msg": err.message
                                };
                                res.json(result);
                            }
                            else {
                                result = {
                                    "status": true,
                                    "msg": "Password Changed Successfully"
                                };
                                res.json(result);
                            }
                        }
                    );
                }
            }

        }
    });


});


//api for admin login
router.post("/login", (req, res, next) => {

    var result = {
        "status": false,
        "msg": "No operation"
    };

    if (!req.body.userName || !req.body.password) {
        /*  sendJSONresponse(res, 400, {
             "message": "All fields required"
         });
         return; */
        result = {
            "status": false,
            "msg": "All fields required"
        };
        res.json(result);
    }
    passport.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            result = {
                "status": false,
                "msg": err.message
            };
            res.json(result);
            /*  res.status(404).json(err);
             return; */
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            result = {
                "status": true,
                "msg": info,
                "token": token,
                "user": user
            };
            res.json(result);

        } else {
            result = {
                "status": false,
                "msg": "Invalid Password"

                // If user is not found

            };
            res.json(result);
        }
    })(req, res);



});



//method for reading entry
router.get("/admin", (req, res, next) => {
    Admin.find(function (err, query_data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(query_data);
        }
    });
});

//for listing all countries
router.get("/countries", (req, res, next) => {
    Question.find({}, function (err, query_data) {
        if (err) {
            res.send(err.message);
        }
        else {
            res.send(query_data);
        }
    });

});
// for listing all states under a country
router.get("/get_states", (req, res, next) => {
    Question.find({ countryId: req.body.country_id }, function (err, query_data) {
        if (err) {
            res.send(err.message);
        }
        else {
            res.send(query_data);
        }
    });

});

// for listing all cities under a state
router.get("/get_cities", (req, res, next) => {
    Question.find({ stateId: req.body.state_id }, function (err, query_data) {
        if (err) {
            res.send(err.message);
        }
        else {
            res.send(query_data);
        }
    });

});


module.exports = router;
