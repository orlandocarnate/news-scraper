# News Scraper
Create a News Scraper App that stores scraped articles into a MongoDB database using Mongoose. You can add a note.

![News Scraper Screenshot](/public/assets/images/news-scraper-960-min.jpg)

## Technology Used
* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/) A NoSQL Database that uses JSON-like data with schemata.
* [Mongoose](https://www.npmjs.com/package/mongoose) A MongoDB object modeling tool designed to work in an asynchronous environment.
* [Express package](https://www.npmjs.com/package/express) Fast, unopinionated, minimalist web framework.
* [Express Handlebars](https://www.npmjs.com/package/express-handlebars) Node module as the view engine for Express
* [Axios](https://www.npmjs.com/package/axios) Promise based HTTP client for the browser and node.js
* [Cheerio](https://www.npmjs.com/package/cheerio) Parses markup and provides an API for traversing/manipulating the resulting data structure.
* [body-parser](https://www.npmjs.com/package/body-parser) Parse incoming request bodies in a middleware before your handlers, available under the `req.body` property.

## Overview
1. In the Nav Bar there will a Home, Saved Articles, and Scrape New Articles.
2. When Home Page is loaded, the articles list will either be empty or shows the last scraped Articles from Articles Collection in the MongoDB database.
3. To scrape articles, press the 'Scrape New Articles' button.
![News Scraper Screenshot](/public/assets/images/1-start.gif)
4. At the end of each article there is a single button showing 'Save Article' or 'Saved' if it has been saved already. Clicking on 'Save Article' will save selected article into the Saved Articles collection in MongoDB.
![News Scraper Screenshot](/public/assets/images/2-save-article.gif)
5. Click on the Saved Articles link in the Nav Bar will list all the saved articles.
6. At the end of each saved article there 2 icon buttons: Add Note and Unsave Article.
    * Add Note and Unsave Article will have Article IDs associated with each of them as a `data-id` value

7. Clicking on Add Note will open a Modal to add a note.
![News Scraper Screenshot](/public/assets/images/3-add-note.gif)
    * Each note will be joined to the article.
    * A new note will be added to a list of notes.
    * Each note will have a delete button.

8. Unsaving an article will delete all the notes associated with it.
![News Scraper Screenshot](/public/assets/images/4-remove-saved.gif)
9. To clear all the scraped articles, click on `Clear Scraped Articles`
![News Scraper Screenshot](/public/assets/images/5-clear-articles.gif)
    * A Confirmation Modal will show the number of articles scraped.


## MongoDB CRUD Functions
##  Create/Scraping
When scraping for new articles, the algorithm skips saving the article if there already exists an article with the same title.

### Deleting and Dropping
* delete an entry with `db.[COLLECTION_NAME].remove()`
* Empty a collection with `db.[COLLECTION_NAME].remove({}, callback)`
* Drop a collection with `db.[COLLECTION_NAME].drop()`
* Drop a Database with `db.dropDatabase()`

## TODOs
* '/' should pull data from MongoDB. If Empty it will scrape new articles
* '/api/scrape' route will clear the MongoDB collection and pull new articles.

## Programmer's Notes
* Use .filter() to filter atabase.
    * `const fiteredCatalog = catalog.filter( item => !item.saved)` returns items.saved=false 
* ES6 Fat Arrow Function does not work with `$(document).on("click", ".item", ()=> {...})`
* Problems with articles not loading after `location.reload()`.
* [Anatomy of an HTTP Transaction in Node.js](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
```
const http = require('http');

const server = http.createServer((request, response) => {
  // magic happens here!
});
```
    * We are NOT using `http` but **`Express`** to handle our http transactions and routing.
* [Express](https://www.npmjs.com/package/express) refresher:
    * Robust routing
    * Focus on high performance
    * Super-high test coverage
    * HTTP helpers (redirection, caching, etc)
    * View system supporting 14+ template engines
    * Content negotiation
    * Executable for generating applications quickly