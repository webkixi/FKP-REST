/** @jsx React.DOM */
var libs = require('libs/libs');

var fox = React.createClass({
	componentDidMount: function () {
		if(this.props.itemMethod){
			var mtd = this.props.itemMethod;
			if(typeof mtd==='function'){
				mtd.call(this.getDOMNode());
			}
		}
	},

	render: function () {
		var clsName = "item wid-3";
		var itemStyle = '';
		var sty = {};
		var wid = '';
		var data = this.props.data;

		if(data){
			k1 = data.id||'';
			v1 = data.url||'javascript:;';

			k2 = data.title||data.catName||data.model||data.quality||data.vender||data||'';
			v2 = data.attr;
		}
		if(this.props.itemClass){
			clsName = "item "+this.props.itemClass;
		}
		if(this.props.itemStyle){
			clsName = 'item';
			sty = this.props.itemStyle;
		}

		if( this.props.cat > -1){
			var catParam = '';
			var cat = this.props.cat;
			if ( cat === 0 )
				catParam = 'catId2';
			if( cat === 1 )
				catParam = 'model'
			if( cat === 2 )
				catParam = 'quality'
			if( cat === 3 )
				catParam = 'vender'
		}

		//idf ： 每一个元素的index
		return (
            <li data-idf={this.props.idf} data-id={k1}  data-param={catParam} data-cls={v2} className=
				{
					(
						function(){
							if(v2&&v2==='second'){
								return clsName+' active'
							}else{
								return clsName
							}
						}
					)()
				} style={sty} >
				<div className={"hheader"} >
					<a href={v1}>{k2}</a>
				</div>
            </li>
	) }

});

module.exports = fox;
