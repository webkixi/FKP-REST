/** @jsx React.DOM */
var React = require('react/addons');

var tmpApp = React.createClass({
	
	loopRender:function(){
		var items = [];

		return items;
	},

	render: function () {
		var fills = this.loopRender();
		return (
			<ul className={"info-mlist"}>
				{fills}
			</ul>
		)
	}
});

module.exports = tmpApp;
