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
    // Scraper API.
    app.get("/api/scrape", function (req, res) {
        // empty Article collection
        // db.Article.remove({}, function () {
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
                article.excerpt = $(this)
                    .find(".excerpt")
                    .text();
                article.link = $(this)
                    .find("a")
                    .attr("href");
                article.posted = $(this)
                    .find(".date")
                    .attr("datetime");
                article.img = $(this)
                    .find(".listing")
                    .css("background-image")
                    .replace(/^url|[\(\'\'\)]/g, '');

                // If Title does not already exist save the artice
                db.Article.find({ "title": article.title }, (err, result) => {
                    if (!result.length) {
                        db.Article.create(article)
                            .then(savedArticle => console.log(savedArticle))
                            .catch(err => console.log(err));
                    }
                })
            });

            res.send("science news articles scraped");
        })
        // });


    });

    // Remove everything in Article collection
    app.post("/api/clear", function (request, response) {
        db.Article.remove({}, function (results) { response.json(results)})
    })

    // save article
    app.put("/api/save/", function (request, response) {
        // console.log(request.body);
        db.Article.findOneAndUpdate(
            { _id: request.body.id },
            { saved: true }
        ).then(results => response.json(results)
        ).catch(err => res.json(err))
    });
    // UNsave article
    app.put("/api/unsave/", function (request, response) {
        // console.log(request.body);
        db.Article.findOneAndUpdate(
            { _id: request.body.id },
            { saved: false }
        ).then(results => response.json(results)
        ).catch(err => res.json(err))
    });

    // get single article's notes
    app.post("/api/notes", function (request, response) {
        const id = request.body.id;
        // find the article along with the associated notes
        db.Article.findOne({ _id: id })
            .populate("note")
            .then(singleArticle => {
                // console.log("singleArticle", singleArticle.note);
                response.json(singleArticle);
            }
            )
            .catch(err => res.json(err))
    });
    // list all article's notes
    app.post("/api/listnotes", function (request, response) {
        console.log("listNotes", request.body);
        const noteArray = request.body.note;
        // find the article along with the associated notes
        db.Note.find({ _id: { $in: noteArray } })
            .then(notes => {
                // console.log("notes", notes);

                // return array of note objects
                response.json(notes)
            }
            )
            .catch(err => res.json(err))
    });

    // Add Article Notes
    app.put("/api/addnote", function (request, response) {
        console.log(request.body);
        // create Note and link with article id
        db.Note.create(request.body)
            .then(addNote => {
                console.log("addNote: ", addNote);
                request.body["note"] = addNote._id;
                console.log("request.body: ", request.body);
                return (
                    db.Article.findOneAndUpdate(
                        // { _id: request.body.id.replace(/^url|[\(\'\'\)]/g, '') },
                        { _id: request.body.id },
                        { $push: { note: addNote._id } },
                        { new: true }
                    )
                )
            })
            .then(singleArticle => response.json(singleArticle))
            .catch(err => response.json(err));

    })

    // Delete Note
    app.delete("/api/remove-note", function (request, response) {
        console.log("DELETE NOTE: ", request.body.id );
        db.Note.remove({ 
            _id: request.body.id 
        },
        function(error, removed) {
            if (error) {
                console.log("Delete Note Error: ", error);
                response.json(error);
            } else {
                response.json(removed);
            }
        })
    });

    // END export
}