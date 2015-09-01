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
				var body;
				var footer;

				var bodys = []
				var footers = []

				var bodyDom;
				var footerDom;

				var k1 = data.id||'',
					v1 = data.url||'javascript:;',

					k2 = data.title||data.catName||data.model||data.quality||data.vender||data||'',
					v2 = data.attr||'',

					v3 = data.value||'';

					if(data.img)
						k2 = <img src={data.img} alt={k2}/>

				if(data.body){
					body = data.body;
					if(!Array.isArray(body))
						body = [ body ]

					body.map(function(item,i){
						if(typeof item==='string'){
							bodys.push(<p>item</p>)
						}
						if(libs.getObjType(item)==='Object'){
							bodys.push(<p><em>{item.k+":"}</em><span>{item.v}</span></p>)
						}
					})
				}

				if(data.footer){
					footer = data.footer;
					if(!Array.isArray(footer))
						footer = [ footer ]

					footer.map(function(item,i){
						if(typeof item==='string'){
							footers.push(<p>item</p>)
						}
						if(libs.getObjType(item)==='Object'){
							footers.push(<p><em>{item.k+":"}</em><span>{item.v}</span></p>)
						}
					})
				}

				if(bodys.length){
					bodyDom = <div className={'hbody'}>{bodys}</div>
				}

				if(footers.length){
					footerDom = <div className={'hfoot'}>{footers}</div>
				}

			}
			else{
				var seprete = '、';
				if (typeof this.props.inline === 'string')
					seprete = this.props.inline;

				data.map(function(item,i){
					var body;
					var footer;

					var bodys = []
					var footers = []

					var bodyDom;
					var footerDom;

					var k1 = item.id||'',
						v1 = item.url||'javascript:;',

						k2 = item.title||item.catName||item.model||item.quality||item.vender||item||'',
						v2 = item.attr||'',

						v3 = item.value||'';

						if(data.img)
							k2 = <img src={data.img} alt={k2}/>


					if(data.body){
						body = data.body;
						if(!Array.isArray(body))
							body = [ body ]

						body.map(function(item,i){
							if(typeof item==='string'){
								bodys.push(<p>item</p>)
							}
							if(libs.getObjType(item)==='Object'){
								bodys.push(<p><em>{item.k+":"}</em><span>{item.v}</span></p>)
							}
						})
					}

					if(data.footer){
						footer = data.footer;
						if(!Array.isArray(footer))
							footer = [ footer ]

						footer.map(function(item,i){
							if(typeof item==='string'){
								footers.push(<p>item</p>)
							}
							if(libs.getObjType(item)==='Object'){
								footers.push(<p><em>{item.k+":"}</em><span>{item.v}</span></p>)
							}
						})
					}

					if(bodys.length){
						bodyDom = <div className={'hbody'}>{bodys}</div>
					}

					if(footers.length){
						footerDom = <div className={'hfoot'}>{footers}</div>
					}

					items.push(  <div className={'inner'}><div className={"hheader"}><a href={v1} key={'a'+i} target={'_blank'}>{k2}</a></div>{bodyDom||''}{footerDom||''}</div> );
					if(i < (data.length-1))
						items.push(seprete);
				})
			}
		}

		var fill = this.props.inline&&Array.isArray(data)
		? items
		: ( <div className={"inner"}><div className={"hheader"}><a href={v1} target={'_blank'}>{k2}</a></div>{bodyDom||''}{footerDom||''}</div> )

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
            </li>
	) }

});

module.exports = fox;
