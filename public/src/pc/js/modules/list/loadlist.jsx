var
ListView = require('widgets/listView/listView'),
PageScrollStartEndMixin = require('mixins/PageScrollStartEndMixin'),
libs = require('libs/libs');

//react
var
LoadList = React.createClass({
	mixins: [PageScrollStartEndMixin],
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

		this.loadingbar = <div id={'scrollbar'} className={'span12'} style={{color:"#000",lineHeight:"60px",textAlign:"center"}}> Loadding </div>;
		if(this.props.loadingbar)
			this.loadingbar = this.props.loadingbar;
	},
	componentDidMount: function() {

	},
	render:function(){
		return <div className={'loadlist span12'}>
            <ListView {...this.props} datas={this.state.datas}></ListView>
				{this.props.children}
				{this.loadingbar}
          </div>
	}
});

module.exports = LoadList;
