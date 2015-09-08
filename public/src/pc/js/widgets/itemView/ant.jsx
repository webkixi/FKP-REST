/** @jsx React.DOM */
var libs = require('libs/libs');
var ItemMixin = require('mixins/item')

var fox = React.createClass({
	mixins: [ItemMixin],
	componentDidMount: function () {},

	render: function () {
		var clsName = "item wid-3";
		var itemStyle = '';
		var sty = {};
		var wid = '';
		var data = this.props.data;
		var items = [];

		if(this.props.itemClass){
			clsName = "item "+this.props.itemClass;
		}
		if(this.props.itemStyle){
			clsName = 'item';
			sty = this.props.itemStyle;
		}

		var icon = this.state.icon;
		var iconPre = this.state.iconPre;

		if(data){
			if(!Array.isArray(data)){
				var k1 = data.id||'',
					v1 = data.url||'javascript:;',

					k2 = data.title||data.catName||data.model||data.quality||data.vender||data||'',
					v2 = data.attr||'',

					v3 = data.value||'';

					if(data.img)
						k2 = <img src={data.img} alt={k2}/>
			}
			else{
				var seprete = '、';
				if (typeof this.props.inline === 'string')
					seprete = this.props.inline;

				data.map(function(item,i){
					var k1 = item.id||'',
						v1 = item.url||'javascript:;',

						k2 = item.title||item.catName||item.model||item.quality||item.vender||item||'',
						v2 = item.attr||'',

						v3 = item.value||'';

						if(data.img)
							k2 = <img src={data.img} alt={k2}/>

						items.push( <div className={"hheader"}><a href={v1} key={'a'+i} target={'_blank'}>{k2}</a></div> );
						if(i < (data.length-1))
							items.push(seprete);
				})
			}
		}

		var fill = this.props.inline&&Array.isArray(data) ? items : <div className={"hheader"}><a href={v1} target={'_blank'}>{k2}</a></div>;

		//idf ： 每一个元素的index
		return (
            <li data-idf={this.props.idf} data-id={k1}  data-cls={v2} className=
				{
					(function(){
							if(v2&&v2==='second'){
								return clsName+' active'
							}else{
								return clsName
							}
					})()
				} style={sty} >
				{fill}
				{icon}
            </li>
	) }

});

module.exports = fox;
