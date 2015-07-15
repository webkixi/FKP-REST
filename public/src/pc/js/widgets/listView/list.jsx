/** @jsx React.DOM */
var Fox = require('../itemView/fox');

var tmpApp = React.createClass({
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

	//已加载组件收到新的参数时调用
	componentWillReceiveProps:function(nextProps){
		if(nextProps.data && nextProps.data.length){
			this.setState({
				data: nextProps.data
			});
		}
	},

	loopRender: function(){
		var items = [];
		var sty = this.props.itemStyle ? this.props.itemStyle : false;
		var cls = this.props.itemClass ? this.props.itemClass : false;

		var that = this;

		if(this.state.data){
			this.state.data.map(function(item,i){
				if(that.props.itemView){
					var view = that.props.itemView;
					that.props.data = item;
					var it = React.createElement(view,that.props,that.props.children);
					items.push(it);
				}else{
					items.push(<Fox {...that.props} data={item} />);
				}
			});
		}

		return items;
	},

	componentDidMount: function () {
		if(this.props.listMethod){
			var mtd = this.props.listMethod;
			var that = this.getDOMNode();
			if(typeof mtd==='function'){
				var the = this;
				setTimeout(function(){
					mtd.call(that,the.props.store);
				},600);
			}
		}
	},

	render: function () {
		var fills = this.loopRender();
		var cls = "hlist elephant u-clearfix";
		var sty = {};
		if(this.props.listClass){
			cls = "hlist " + this.props.listClass + ' u-clearfix';
		}
		if(this.props.listStyle){
			cls = "hlist u-clearfix";
			sty = this.props.listStyle;
		}
		return (
			<ul className={cls} style={sty}>
				{fills}
			</ul>
		)
	}
});

module.exports = tmpApp;
