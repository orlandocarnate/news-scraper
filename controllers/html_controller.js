// import Express & burger.js
// var express = require("express");

// get Article and Note models
// var db = require("../models");

// create router object
// var router = express.Router();
module.exports = function (app) {
    // Main Root directory.
    const dummyData = [
        {
            'title': 'Test1',
            'link': 'http://link1.com'
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
        let articlesHBObj = {
            articles: dummyData
        }
        console.log(articlesHBObj);
        res.render("index", articlesHBObj);
    })

    // Get all articles from DB
    app.get("/saved-articles", function (req, res) {
        // Load MongoDB data. If empty run the scraper
        // From StackOverflow: When there are no matches find() returns [], while findOne() returns null. 
        res.render("saved-articles", articlesHBObj);
    });

    // END export
}