libs = require('./libs');

// Here is the simplest possible mixin to get a global scroll event
var SimplePageScrollMixin = {
    componentDidMount: function() {
        libs.addEvent(window,'scroll',this._onScroll,false);
    },
    componentWillUnmount: function() {
        libs.rmvEvent(window,'scroll', this._onScroll, false);
    }
};

module.exports = SimplePageScrollMixin;
