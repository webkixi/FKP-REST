/** @jsx React.DOM */
var React = require('react/addons');
var Elephant = require('./items/elephant');

var tmpApp = React.createClass({
	componentDidMount: function () {
		console.log('fakeData');
	},

	render: function () {
		return (
			<ul className={"hlist elephant u-clearfix"}>
				<Elephant />
			</ul>
	) }
});

module.exports = tmpApp;
