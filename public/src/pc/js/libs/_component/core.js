function $extend(Child, Parent) {
	var F = function(){};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.uper = Parent.prototype;
	Child.extend = $extend;
	return Child
}

var core = function(){}

core.prototype = {
    req: require('libs/api'),
	libs: require('libs/libs')
}

core.extend = $extend;

module.exports = core;
