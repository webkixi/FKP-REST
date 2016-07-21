var serialize = require('serialize-javascript')
/**
itemView
放回 li 结构, 用于modules/list 调用，作为ul/li部分
*/
var ItemMixin = require('react/mixins/item')
var dealWithDataMethod = require('./_common/itemDealWithData')

var fox = React.createClass({
	mixins: [ItemMixin],
	// 组件判断是否重新渲染时调用
    // 虚拟dom比对完毕生成最终的dom后之前
	shouldComponentUpdate:function(nextProps){
		var data = serialize(this.props.data);
		var _data = serialize(nextProps.data);
		if (data !== _data){
			return true;
		}
		else {
			return false;
		}
	},

	componentDidMount: function () {},

	dealWithData: dealWithDataMethod,

	render: function () {
		var me = this;
		var resault = this.dealWithData();
		var k1 = resault.k1,
		v1 = resault.v1,
		k2 = resault.k2,
		v2 = resault.v2,
		clsName = resault.clsName,
		sty = resault.sty,
		fill = resault.fill;

		var data_attr = {}
		_.mapKeys(this.props.data, function(value, key) {
		  if (key.indexOf('data-')>-1) {
				data_attr[key] = value;
			}
		});

		function getClass(){
			// if (v2&&v2==='second'){
			// 	return clsName+' active'
			// }
			// else{
			// 	return clsName
			// }
			if (me.props.data.className)
				return me.props.data.className;
			else
				return clsName
		}

		var _props = {
			"ref":			this.props.data.ref,
			"id":	 		k1,
			"style":		sty,
			"className": 	getClass(),
			"key": 			_.uniqueId('fox_')
		}
		_props = _.assign(_props, data_attr)
		if (this.props.data.loadbar){
			var _type = this.props.data.loadbar;
			if (_type==='loadbar'){
				_props.className = 'lazyloadbar'
				fill = <div ref="loadbar" className="loadtype" style={{"display":"none"}}><div className="loader">Loading...</div></div>
			}
		}
		return React.createElement('li', _props, fill)

		//idf ： 每一个元素的index
		// return (
    //     <li data-idf={this.props.idf} data-id={k1}  data-cls={v2} className=
		// 				{ (function(){
		// 							if(v2&&v2==='second'){
		// 								return clsName+' active'
		// 							}else{
		// 								return clsName
		// 							}
		// 					})() } style={sty}>
		// 		{fill}
    //     </li>
		// 	)
}

});

module.exports = fox;
