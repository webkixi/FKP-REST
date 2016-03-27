/**

itemView
放回 li 结构, 用于modules/list 调用，作为ul/li部分
*/
var _ = require('lodash/core')
var ItemMixin = require('../../mixins/item')
var dealWithDataMethod = require('./_common/itemDealWithData')

var fox = React.createClass({
	mixins: [ItemMixin],
	componentDidMount: function () {},

	dealWithData: dealWithDataMethod,

	render: function () {
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
			if (v2&&v2==='second'){
				return clsName+' active'
			}
			else{
				return clsName
			}
		}

		var _props = {
			"data-idf": 	this.props.idf,
			"data-id": 		k1,
			"data-cls": 	v2,
			"style":			sty,
			"className": 	getClass()
		}
		_props = _.assign(_props, data_attr)
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
