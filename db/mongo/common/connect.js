const fs = require('fs')
var path = require('path')
const config = require('../../../config')
const mongoose = require("mongoose");

var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  user: 'fkpdoc',
  pass: 'git@#$agzgz.com'
}

/**
 * Connect to database
 */
mongoose.connect(config.mongo.url, options);
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
