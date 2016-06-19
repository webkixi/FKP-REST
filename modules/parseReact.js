
module.exports = function(reacturl, opt){
	var factory;
	var props = opt || {};
	if (typeof reacturl==='string'){
		var _rct = include(reacturl);
		if (_rct.server){
			factory = React.createFactory(_rct.server());
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
