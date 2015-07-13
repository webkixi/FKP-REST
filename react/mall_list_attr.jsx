/** @jsx React.DOM */
var React = require('react/addons');

var tmpApp = React.createClass({

	loopNav: function(){
		var navs = this.props.navData;
		navs.unshift({id: 'all', catName: '全部'});
		var items = [];

		navs.map(function(bean,i){
			items.push(
				<li data-param={"catId"} data-val={bean.id} class="active">
					<a href="#cat-{bean.id}" data-toggle="tab" onclick="changeCat({bean.id})">{bean.catName}</a>
				</li>
			)
		})

		return items;
	},

	loopAttr: function(){
		var attrs = this.props.attrData;
		// console.log(attrs);
		return 'aaaaaaaaaaa';
	},

	render: function () {
		var navs = this.loopNav();
		var attrs = this.loopAttr();

		return (
			<ul id={"myTab"} className={"nav nav-tabs"}>
				{navs}
			</ul>

		)
	}
});

module.exports = tmpApp;
