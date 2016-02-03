const fs = require('fs')
var path = require('path')
const config = require('../../../config')
const mongoose = require("mongoose");

/**
 * Connect to database
 */
mongoose.connect(config.mongo.url);
mongoose.connection.on("error", function(err) {
  console.log(err);
});

/**
 * Load the models
 */
const modelsPath = path.join(__dirname + '/../models')
fs.readdirSync(modelsPath).forEach(function(file) {
  if (~file.indexOf("js")) {
    require(modelsPath + "/" + file);
  }
});
