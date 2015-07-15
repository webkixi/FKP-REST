/** @jsx React.DOM */
var libs = require('libs/libs');

var fox = React.createClass({
	componentDidMount: function () {
		if(this.props.itemMethod){
			var mtd = this.props.itemMethod;
			if(typeof mtd==='function'){
				mtd.call(this.getDOMNode(),this.props.store);
			}
		}
	},

	render: function () {
		var clsName = "item wid-3";
		itemStyle = '';
		var sty = {};
		var wid = '';
		var data = this.props.data;

		if(data){
			k1 = data.id||'';
			v1 = data.url||'javascript:;';

			k2 = data.catName||data.model||data.quality||data.vender||data||'';
		}
		if(this.props.itemClass){
			clsName = "item "+this.props.itemClass;
		}
		if(this.props.itemStyle){
			clsName = 'item';
			sty = this.props.itemStyle;
		}

		var guid = libs.guid('fox-');
		var that = this;
		return (
            <li data-val={k1}  className={clsName} style={sty} >
				<div className={"hheader"} >
					<a href={v1}>{k2}</a>
				</div>
            </li>
	) }

});

module.exports = fox;
