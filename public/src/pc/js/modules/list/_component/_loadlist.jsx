/** @jsx React.DOM
* list 通用组件
* 返回 div > (ul > li)*n
*/
var libs = require('libs/libs')
var List = require('widgets/listView/llist')
var Pt = require('widgets/itemView/pic_title');

var tmpApp = {
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
		if(this.props.data){
			var tmpPropsData = libs.clone(this.props.data);
			tmpPropsData.push({caption: '加载更多内容',attr: 'loadbar'})
			this.setState({
				data: tmpPropsData
			})
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
		var tData = libs.clone(this.state.data);
		tData.push({caption: '加载更多内容',attr: 'loadbar'});
		return <List {...this.props} data={tData} onscrollend={this.props.loadMethod} />
	},

	componentDidMount: function () {
		// var that = this.getDOMNode();
		// if (typeof this.props.loadMethod === 'function') {
		// 	this.props.loadMethod.call(that);
		// }
	},

	render: function () {
		var fills = this.loopRender();
		return (
			<div className={'load-list'}>
				{fills}
			</div>
		)
	}
};

// module.exports = tmpApp;

var libs = require('libs/libs')
var Store = require('mixins/store');
function actRct( storeName ){
    var _storeName = storeName||'LDL',
        _rct = libs.clone(tmpApp);

	if( _rct.mixins && _rct.mixins.length ){
		_rct.mixins.push( Store( _storeName ))
    }
	else{
		_rct.mixins = [ Store( _storeName ) ]
    }

    return React.createClass( _rct );
}

module.exports = actRct;
