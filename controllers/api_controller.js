// import Express & burger.js
var express = require("express");
var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");

// get Article and Note models
var db = require("../models");

// create router object
// var router = express.Router();


module.exports = function (app) {
    // Get all articles from DB
    app.get("/api/articles", function (req, res) {
        // Load MongoDB data. If empty run the scraper
        // From StackOverflow: When there are no matches find() returns [], while findOne() returns null. 
        db.Article.find({})
            .then(results => res.json(results))
            .catch(err => res.json(err))
    });

    // Scraper API.
    app.get("/api/scrape", function (req, res) {
        // empty Article collection
        db.Article.remove({}, function () {
            // scrape all the data using Axios and Cheerio
            axios.get("https://arstechnica.com/").then(function (response) {
                // assign response data to $ using cheerio
                let $ = cheerio.load(response.data);

                $("li.tease").each(function (index, element) {
                    // create Article object which will be saved into MongoDB
                    let article = {};
                    article.title = $(this)
                        .find("h2")
                        .text();
                    article.link = $(this)
                        .find("a")
                        .attr("href");
                    article.img = $(this)
                        .find(".listing")
                        .css("background-image")
                        .replace(/^url|[\(\'\'\)]/g, '');

                    // Save the result into MongoDB
                    db.Article.create(article)
                        .then(savedArticle => console.log(savedArticle))
                        .catch(err => console.log(err));
                });

                res.send("science news articles scraped");
            })
        });


    });

    // save article
    app.post("/api/save/", function (request, response) {
        // console.log(request.body);
        db.Article.findOneAndUpdate(
            { _id: request.body.id },
            { saved: true }
        ).then(results => response.json(results)
        ).catch(err => res.json(err))
    });

    // get single article
    app.get("/api/article/:id", function (request, response) {
        const id = request.params.id;
    });

    // Update Article
    app.put("/api/update", function (request, response) {
        console.log(request.body);
    });

    // Delete Article
    app.delete("/api/delete", function (request, response) {
        console.log(request.body);
    });

    // END export
}