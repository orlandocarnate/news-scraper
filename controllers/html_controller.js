// import Express & burger.js
// var express = require("express");

// get Article and Note models
var db = require("../models");

// create router object
// var router = express.Router();
module.exports = function (app) {
    // Main Root directory.
    app.get("/", function (req, res) {
        db.Article.find({}).sort({ posted: -1 })
            .then(Articles => {
                hbObj = {
                    data: Articles
                }
                // console.log(hbObj);
                res.render("index", hbObj)
            })
            .catch(err => res.json(err))
    })

    // Get saved articles from DB
    app.get("/saved-articles", function (req, res) {
        db.Article.find({
            saved: true
        }).sort({ "posted": -1 })
            .then(Articles => {
                hbObj = {
                    data: Articles
                }
                // console.log(hbObj);
                res.render("saved-articles", hbObj)
            })
            .catch(err => res.json(err))
    });

    // END export
}