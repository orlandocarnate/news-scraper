// import Express & burger.js
// var express = require("express");

// get Article and Note models
var db = require("../models");

// create router object
// var router = express.Router();
module.exports = function (app) {
    // Main Root directory.
    const dummyData = [
        {
            'title': 'Test1',
            'link': 'http://link1.com',
        },
        {
            'title': 'Test2',
            'link': 'http://link2.com'
        },
        {
            'title': 'Test3',
            'link': 'http://link3.com'
        },
    ]
    app.get("/", function (req, res) {
        db.Article.find({})
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
        })
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