var express = require("express");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");

// if on Heroku or other server get port using process.env.PORT OR Port 3000 for localhost
var PORT = process.env.PORT || 8080;
// get routes from exported 'router' in scraper_controller.js
var routes = require("./controllers/scraper_controller.js"); 

var app = express(); // instantiate Express object.

app.use(routes); // use the routes from scraper_controller.js

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// assign main layout to rendering engine using Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// setup server using PORT
app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });