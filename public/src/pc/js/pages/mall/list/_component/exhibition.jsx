/** @jsx React.DOM */
var Store = require('mixins/store');
var Elephant = require('widgets/itemView/elephant');

var Exhibition = React.createClass({
	mixins: [Store('Exhibition')],
	getDefaultProps: function() {
		return {

		};
	},

	getInitialState: function() {
		return {
        	data: []
	    };
	},

	//插入真实 DOM之前
	componentWillMount:function(){
		// if(this.props.data && this.props.data.pagination.recordList.length){
		if(this.props.data && this.props.data.length){
			this.setState({
				data: this.props.data
			});
		}
	},

	loopRender: function(){
		var items = [];
		var sty = this.props.itemStyle ? this.props.itemStyle : false;
		var cls = this.props.itemClass ? this.props.itemClass : false;

		this.state.data.map(function(item,i){
			items.push(<Elephant itemStyle={sty} itemClass={cls} data={item} />);
		});

		return items;
	},

	componentDidMount: function () {
		// console.log('fakeData');
		// this.fills = this.loopRender();
	},

	fills:[],

	render: function () {
		var fills = this.loopRender();
		return (
			<ul className={"hlist elephant u-clearfix"}>
				{fills}
			</ul>
		)
	}
});

module.exports = Exhibition;
