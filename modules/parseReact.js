var React = require('react/addons');
require('jsx-require-extension/options/harmony');   //另一套方案 node-jsx
// require('node-jsx').install({harmony: true})


var base = '../react/';

module.exports = function(url, opt){
	props = opt || {};
	var ReactApp = React.createFactory(require(base+url));
	var reactHtml = React.renderToString(ReactApp(props));
	return reactHtml;
}