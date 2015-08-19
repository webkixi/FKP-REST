/** @jsx React.DOM */
var Fox = require('../itemView/ant2');

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
		var pdata = this.props.data;
		// if(this.props.data && this.props.data.pagination.recordList.length){
		if( pdata ){
			if(!Array.isArray( pdata )){
				pdata = [ pdata ]
			}
			this.setState({
				data: pdata
			});
		}
	},

	//已加载组件收到新的参数时调用
	componentWillReceiveProps:function(nextProps){
		var pdata = nextProps.data;
		if(!Array.isArray( pdata )){
			pdata = [ pdata ]
		}
		if( nextProps.data ){
			this.setState({
				data: pdata
			});
		}
	},

	loopRender: function(){
		var items = [];
		var sty = this.props.itemStyle ? this.props.itemStyle : false;
		var cls = this.props.itemClass ? this.props.itemClass : false;

		var that = this;

		if(this.state.data){
			// React.Children.map(this.state.data, function (item,i) {
			var data = this.state.data
			// if(!Array.isArray(data)){
			// 	data = [ data ];
			// }
			data.map(function(item,i){
				if(that.props.itemView){
					var view = that.props.itemView;
					var props = {
						idf: i,
						key: 'view'+i,
						data: item,
						itemClass: that.props.itemClass,
						itemStyle: that.props.itemStyle,
						itemMethod: that.props.itemMethod
					}
					var it = React.createElement(view, props, that.props.children);
					items.push(it);
				}else{
					items.push(<Fox idf={i} key={'fox'+i} {...that.props} data={item} />);
				}
			}.bind(this));

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
		var cls = "vlist elephant u-clearfix";
		var sty = {};
		if(this.props.listClass){
			cls = "vlist " + this.props.listClass + ' u-clearfix';
		}
		if(this.props.listStyle){
			cls = "vlist u-clearfix";
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
