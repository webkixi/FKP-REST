/** @jsx React.DOM */

//面包屑

var React = require('react/addons');

var tmpApp = React.createClass({
	getInitialState:function(){
		return {
			crumbs: this.props.data||{},
			base: this.props.base||''
		}
	},

	loopNav: function(){
		var crumbs = this.state.crumbs;
		var crumbAry = [];

		function makeCrumb(cmbs){
			for(var crumb in cmbs){
				if(crumb==='catName')
					crumbAry.push({catName: cmbs[crumb],id: cmbs.id});
				else{
					if(crumb==='parent')
						makeCrumb(cmbs.parent)
				}
			}
		}
		makeCrumb(crumbs);
		var tmps=[];
		if(crumbAry.length){
			crumbAry.map(function(item,i){
				if(i===0){
					tmps.push( <a href={this.props.base+'/'+item.id+'.html'}>{item.catName}</a> )
				}else{
					tmps.push(
						<span><a href={this.props.base+'/'+item.id+'.html'}>{item.catName}</a> {' >> '}</span>
					)
				}
			})
		}
		tmps.push(<span><a href={"/"}>首页</a>{' >> '}</span>);
		var spmt = tmps.reverse();
		return spmt;
	},

	render: function () {
		var navs = this.loopNav();
		return (
			<div class={"current_path container"}>
				{navs}
			</div>
		)
	}
});

module.exports = tmpApp;
