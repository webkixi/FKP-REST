
module.exports = function(reacturl, opt){
	var factory;
	var props = opt || {};
	if (typeof reacturl==='string'){
		factory = React.createFactory(include(reacturl));
	}
	else
	if (typeof reacturl==='object'){
		factory = reacturl
	}
	var reactHtml = React.renderToString(factory(props));
	return [reactHtml];
}
