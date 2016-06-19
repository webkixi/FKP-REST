/**
* list 通用组件
* 返回 div > (ul > li)*n
*/
var List = require('widgets/listView/list')
var itemMixins = require('mixins/item')
var Store = require('mixins/store');
var ITEM = require('widgets/itemView/f_li');

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
			this.setState({
				data: this.props.data
			})
		}
	},

	//已加载组件收到新的参数时调用
	componentWillReceiveProps:function(nextProps){},

	loopRender: function(){
		// return <List {...this.props} data={tData}/>

		var _props = _.merge({data: this.state.data}, this.props)
		return React.createElement(List, _props)
	},

	componentDidMount: function () {},

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
function actRct( storeName ){
    var _storeName = storeName||'LDL2',
        _rct = _.cloneDeep(tmpApp);

	if( _rct.mixins && _rct.mixins.length ){
		_rct.mixins.push( Store( _storeName ))
    }
	else{
		_rct.mixins = [ Store( _storeName ) ]
    }

    return React.createClass( _rct );
}

module.exports = actRct;
