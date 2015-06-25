/**
 * Module dependencies.
 */
var views = require('co-views-helpers');
var config = require('../config')

// setup views mapping .html
// to the handlebars template engine
// render = views('../public/dist/1.0.0/html/', {
render = views(config.static.html, {
  	map: { html: 'handlebars' }
});


module.exports = render
