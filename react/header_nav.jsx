/** @jsx React.DOM */
var React = require('react/addons');

var tmpApp = React.createClass({
	
	loopRender:function(){
		var items = [];
		var datas = this.props.data;
		datas.menuList.map(function(item,i){
			var active = "";
			if(i == 0) active= "active home";
			if(item.hasChildren){
			var children = [];
				item.children.map(function(childrenNav){
					children.push(
						<li><a href={"/"+childrenNav.menuUrl}>{childrenNav.menuName}</a></li>
						)
				})
				items.push(
					<li className={active}>
						<a href={"/"+item.menuUrl}>{item.menuName}</a>
						<ul className={"dropdown_menus"}>{children}</ul>
					</li>
				)
			}else{
				items.push(
					<li className={active}>
						<a href={"/"+item.menuUrl}>{item.menuName}</a>
					</li>
				)
			}
			
		})
		return items;
	},

	render: function () {
		var fills = this.loopRender();
		return (
			<ul className={"container clearfix"}>
				{fills}
			</ul>
		)
	}
});

module.exports = tmpApp;
