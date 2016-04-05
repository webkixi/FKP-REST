const fs = require('fs')
var path = require('path')
const config = require('../../../config')
const mongoose = require("mongoose");

var mg = config.mongo
if (process.env.env === 'test'){
    mg = config.test.mongo
}

/**
 * Connect to database
 */
mongoose.connect(mg.url, mg.options);
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
