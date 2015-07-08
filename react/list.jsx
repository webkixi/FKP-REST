/** @jsx React.DOM */
var React = require('react/addons');

var tmpApp = React.createClass({
	componentDidMount: function () {
		console.log('fakeData');
	},

	render: function () {
		return (
			<div id="table-area">
				<div style={{backgroundColor:'red',width:'100px',height:'100px'}}>{'1234'}</div>
			</div>
	) }

});

module.exports = tmpApp;