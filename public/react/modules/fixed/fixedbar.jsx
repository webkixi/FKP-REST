var fixedMixin = require('mixins/fixedMixin');

//react
var FixedBar = React.createClass({

	mixins: [fixedMixin],

	getDefaultProps: function() {
			return {

			};
	},

	getInitialState: function() {
			return {
	        	datas: [],
						content: ''
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

	componentDidMount: function() {
			// this.cnt = this.state.cnt;
	},

	render:function(){
			return <div className={'fixedbar'}>
							{this.props.children}
	        </div>
	}

});

module.exports = FixedBar;
