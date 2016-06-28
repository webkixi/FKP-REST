/**
* list 通用组件
* 返回 div > (ul > li)*n
*/
var List = require('widgets/listView/list')
var scrollMixins = require('mixins/scrollLoadAndLazy');

var tmpApp = {
	mixins:[ scrollMixins],
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
			var tmpPropsData = this.props.data;
			this.setState({
				data: tmpPropsData
			})
		}
		if (this.props.scroll==='self'){
			this.scrollContainer = 'load-list'
		}
	},

	//已加载组件收到新的参数时调用
	componentWillReceiveProps:function(nextProps){},

	loopRender: function(){
		var tData = this.state.data;
		tData.push({loadbar: 'loadbar'});
		// //tData.push(<div ref="loadbar" className="loadtype" style={{"display":"none"}}><div className="loader">Loading...</div></div>);
		// return <List {...this.props} data={tData}/>
		var _props = _.merge({data: tData}, this.props)
		return React.createElement(List, _props)
	},

	componentDidMount: function () {},

	render: function () {
		var fills = this.loopRender(),
			_sty = {}
		if (this.props.scroll==='self'){
			_sty = {height: '100%', overflow: 'auto'}
		}
		return (
			<div ref="load-list" className='load-list' style={_sty}>
				{fills}
			</div>
		)
	}
};

// 通过方法返回的结构，带sax的react结构 带itemMixins, storeMixins，scrollEnd的mixins
function actRct( storeName ){
    return require('react/util/index')(storeName, tmpApp)
}

// 纯react结构，带itemMixins
actRct.pure = function(){
	return List;
}

// 带sax的react结构 带itemMixins, storeMixins
actRct.store = function( storeName ){
	var nloopRender =  function(){
		var tData = this.state.data;
		var _props = _.merge({data: tData}, this.props)
		return React.createElement(List, _props)
	}
	delete tmpApp.mixins;
	tmpApp.loopRender = nloopRender;
	return require('react/util/index')(storeName, tmpApp)
}

module.exports = actRct;
