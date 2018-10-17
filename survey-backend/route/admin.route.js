var express = require("express");
var router = express.Router();
const Admin = require("../model/admin.model");

router.get("/test_route", (req, res) => {
    res.send("router tested.");
});

//method for creating new entry
router.post("/admin", (req, res, next) => {
    let newEntry = new Admin({
        userName: req.body.userName,
        password: req.body.password,

    });
    newEntry.save((err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ msg: "Admin saved success fullly!!" });
        }
    })
});

//method for changing password
router.put("/password", (req, res, next) => {

    var result = {
        "status": false,
        "msg": "No operation"
    };
    Admin.find({ password: req.body.oldPassword }, function (err, query_data) {
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
                    "msg": "Invalid current password"
                };
                res.json(result);



            }
            else {
               
                Admin.findOneAndUpdate({}, {
                    $set: {
                        password: req.body.newPassword,

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
    });


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
