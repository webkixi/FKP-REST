/**

itemView
放回 div 结构, 一般可以直接调用
*/
var ItemMixin = require('react/mixins/item')
var dealWithDataMethod = require('./_common/itemDealWithData')

var fox = React.createClass({
	mixins: [ItemMixin],
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
			"ref":			this.props.ref,
			"id":	 		k1,
			"style":		sty,
			"className": 	getClass(),
			"key": 			this.props.key
		}
		_props = _.assign(_props, data_attr)
		return React.createElement('div', _props, fill)


		//idf ： 每一个元素的index
		// return (
    //         <div data-idf={this.props.idf} data-id={k1}  data-cls={v2} className=
		// 						{ (function(){
		// 									if(v2&&v2==='second'){
		// 										return clsName+' active'
		// 									}else{
		// 										return clsName
		// 									}
		// 							})() } style={sty}>
		// 						{fill}
    //         </div>
		// 		)
	}

});

module.exports = fox;
