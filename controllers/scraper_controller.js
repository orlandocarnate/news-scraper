// import Express & burger.js
var express = require("express");
var cheerio = require("cheerio");
var axios = require("axios");

// create router object
var router = express.Router();

// import burger.js MODEL for database functions
// let burger = require("../models/burger.js");

// Main Root directory.
router.get("/", function (req, res) {
    // scrape all the data using Axios and Cheerio
    axios.get("https://arstechnica.com/").then(function (response) {
        // assign response data to $ using cheerio
        let $ = cheerio.load(response.data);

        let tempArray = []
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
                .replace(/^url|[\(\)]/g, '');

            // Save these results in an object that we'll push into the results array we defined earlier
            tempArray.push(article);
        });

        res.json(tempArray);


        // let newsHBObj = {
        //     articles: response
        // }
        // res.json(response.data);
        // res.render("index", newsHBObj);
    });
});

// router.get("/article/:id", function (request, response) {
//     // get single article
//     const id = request.params.id;
// });

// router.put("/api/update", function (request, response) {
//     console.log(request.body.id);
//     burger.update(request.body.id, (result) => {
//         response.json({ id: result.insertId });
//         console.log("Updated ID: ", result.insertId);
//     });
// });

// export router object for server.js
module.exports = router;