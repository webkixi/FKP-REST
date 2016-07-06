
module.exports = function(reacturl, opt){
	var factory;
	var props = opt || {};
	if (typeof reacturl==='string'){
		var _rct = require(reacturl);
		if (_rct.pure){
			factory = React.createFactory(_rct.pure());
		}
		else {
			factory = React.createFactory(_rct);
		}
	}
	else
	if (typeof reacturl==='object'){
		factory = reacturl
	}
	var reactHtml = ReactDomServer.renderToString(factory(props));
	return [reactHtml];
}
