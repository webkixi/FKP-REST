// var
// ListView = require('widgets/listView/listView'),
// PageScrollStartEndMixin = require('mixins/PageScrollStartEndMixin'),
// libs = require('libs/libs');

//react
var tabswitch = React.createClass({
	getDefaultProps: function() {
		return {

		};
	},
	getInitialState: function() {
		return {
        	datas: []
	    };
	},
	//插入真实 DOM之前
	componentWillMount:function(){
		if(this.props.datas && this.props.datas.length>0){
			this.setState({
				datas: this.props.datas
			});
		}
	},
	renderTabs: function(){
		var tabitems = [];

		this.state.datas.map(function(item,i){
			tabitems.push(<li>{item}</li>);
		})

		return tabitems;
	},
	componentDidMount: function() {

	},
	render:function(){
		// {this.props.children}
		var items = this.renderTabs();
		return <div className={'tabswitch wid-12'}>
				<ul>
					{items}
				</ul>
				<div className={'tab-cnt'} />
          </div>
	}
});

module.exports = tabswitch;
