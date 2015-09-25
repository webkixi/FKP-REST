/** @jsx React.DOM
* list 通用组件
* 返回 div > (ul > li)*n
*/
var libs = require('libs/libs')
// var Fox = require('../itemView/pic_title');
var Fox = require('../itemView/ant');

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

	_dealWithItemView: function(opts){
		var that = this;
		if(that.props.itemView){
			var view = that.props.itemView;
			var props = libs.clone(that.props);
			props.idf = opts.i;
			props.key = 'view'+opts.i;
			props.data = opts.item;
			return React.createElement(view, props, that.props.children);
		}else{
			return <Fox idf={opts.i} key={'fox'+opts.i} {...that.props} data={opts.item} />;
		}
	},

	_dealWithData: function(data){
		var that = this;
		var cls = "hlist elephant u-clearfix";
		var sty = {};
		if(this.props.listClass){
			cls = "hlist " + this.props.listClass + ' u-clearfix';
		}
		if(this.props.listStyle){
			cls = "hlist u-clearfix";
			sty = this.props.listStyle;
		}

		var itemCollection = [];
		function organizeData(record){
			var items = [];
			record.map(function(item,i){
				if (Array.isArray(item)){

					//inline 将数组元素放置在一个li中
					if(that.props.inline){
						var it = that._dealWithItemView({i: i, item: item})
						items.push(it);
					}
					else
						itemCollection.push(organizeData(item));
				}
				else {
					var it = that._dealWithItemView({i: i, item: item})
					items.push(it);
				}
			});
			if(items.length){
				var group = libs.guid('group-')
				return <ul data-group={group} key={libs.guid('ul-')} className={cls} style={sty}>
					{items}
				</ul>
			}else {
				return;
			}
		}
		itemCollection.push(organizeData(data));

		return itemCollection;
	},

	loopRender: function(){
		var items = [];
		var sty = this.props.itemStyle ? this.props.itemStyle : false;
		var cls = this.props.itemClass ? this.props.itemClass : false;

		if(this.state.data){
			// React.Children.map(this.state.data, function (item,i) {
			var data = this.state.data
			items = this._dealWithData(data);
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
		return (
			<div className={'list-wrap'}>
				{fills}
				{this.props.children}
			</div>
		)
	}
});

module.exports = tmpApp;
