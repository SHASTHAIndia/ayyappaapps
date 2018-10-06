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
    Admin.findOneAndUpdate({ }, {
        $set: {
            password: req.body.password,
           
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

module.exports = router;
