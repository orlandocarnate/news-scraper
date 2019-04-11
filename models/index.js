// NEED THIS FILE FOR 'db = require('../models') TO WORK!!!
// Exporting an object containing all of our models

module.exports = {
    Article: require("./Article"),
    Note: require("./Note")
  };
  