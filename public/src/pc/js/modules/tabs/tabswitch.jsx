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
	// renderTabs: function(){
	// 	var tabitems = [];
	//
	// 	this.props.datas.map(function(item,i){
	// 		tabitems.push(<li></li>)
	// 	})
	// },
	componentDidMount: function() {

	},
	render:function(){
		return <div className={'tabswitch wid-12'}>
				{this.props.children}
          </div>
	}
});

module.exports = LoadList;
