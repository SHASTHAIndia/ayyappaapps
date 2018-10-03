var express = require("express");
var router = express.Router();
const Person = require("../model/Person");

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

module.exports = router;
