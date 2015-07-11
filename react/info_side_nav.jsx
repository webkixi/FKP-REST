/** @jsx React.DOM */
var React = require('react/addons');

var tmpApp = React.createClass({
	
	loopRender:function(){
		var items = [];
		var datas = this.props.data.infoCat;
		var catId =  this.props.data.catId?this.props.data.catId:false;

		datas.children.map(function(item,i){
			var dds= [];
			item.children.map(function(dd){
				var id = dd.id;
				var catClass = catId===id? "active":"";
				dds.push(
						<dd>
							<a href={"/info/cat/"+id+".html"} className={catClass}>{dd.catName}</a>
						</dd>
					)
			})
			items.push(
					<li>
						<dl>
						<dt>
							<a href={"/info/cat/"+item.id+".html"}>{item.catName}</a>
						</dt>
						<dd>{dds}</dd>
						</dl>
					</li>
				)
		})

		return items;
	},

	render: function () {
		var fills = this.loopRender();
		return (
			<ul>
				{fills}
			</ul>
		)
	}
});

module.exports = tmpApp;
