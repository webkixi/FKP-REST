//simplelist

var libs = require('libs/libs');

// Here is the simplest possible mixin to get a global scroll event
var SimplePageScrollMixin = {

    componentDidMount: function() {
        if (this.scrollContainer){
            // var _ref = this.refs[this.scrollContainer];
            var _ref = React.findDOMNode(this.refs[this.scrollContainer]);
                this._scrollContainer = _ref;
            libs.addEvent(_ref,'scroll',this._onScroll,false);
        }
        else {
            this._scrollContainer = window;
            libs.addEvent(window,'scroll',this._onScroll,false);
        }

        // if (!this.scrollContainer)
        //     this.scrollContainer = window;
        //
        // if (this.scrollContainer!==window){
        //     // var _ref = this.refs[this.scrollContainer];
        //     var _ref = React.findDOMNode(this.refs[this.scrollContainer]);
        //         this._scrollContainer = _ref;
        //     libs.addEvent(_ref,'scroll',this._onScroll,false);
        // }
        // else
        //     libs.addEvent(window,'scroll',this._onScroll,false);
    },

    componentWillUnmount: function() {
        if (this.scrollContainer && this.scrollContainer!==window){
            var _ref = this.refs[this.scrollContainer]
            libs.rmvEvent(_ref,'scroll', this._onScroll, false);
        }
        else
            libs.rmvEvent(window,'scroll', this._onScroll, false);
    }
};

module.exports = SimplePageScrollMixin;
