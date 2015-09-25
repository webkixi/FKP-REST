var
ViewBase = require("widgets/itemView/itemView"),
libs = require('libs/libs');

var
ListClass = React.createClass({
	getDefaultProps: function() {
		return {
			// datas: this.props.datas
		};
	},
	getInitialState: function() {
		return {
			datas: this.props.datas
		};
	},
	//插入真实 DOM之前
	componentWillMount:function(){
		// console.log(this);
			// this.setState({
			// 	datas: this.props.datas
			// });
	},
	//被重新渲染之后
	componentDidUpdate:function(){
		// this.setState({
		// 	datas: this.props.datas
		// })
	},
	componentWillUpdate:function(){

	},
	shouldComponentUpdate:function(){
		return true;
	},
	//已加载组件收到新的参数时调用
	componentWillReceiveProps:function(nextProps){
		// console.log(444444444444444444444);
		this.setState({
			datas: nextProps.datas
		});
	},
	loop:function(n){
		if(libs.getObjType(n)=='Function'){
			var
			items = [];
			// item_view = n();

			this.state.datas.map(function(item,i){
				items.push(n(item));
			});

			return items;

		}else{
			var items = [];
			for(var i=0; i<n; i++){
				items.push(<ViewBase className={'uuu'+i}><ViewBase className={'aaa'+i}>ni mei a</ViewBase></ViewBase>);
			}
			return items;
		}
	},
	render: function() {
		var
		fills = '',
		line_num = 1;
	    if(this.props.loop)
	  		fills = this.loop(this.props.loop);

	  	if(this.props.span){
	  		line_num = 12/this.props.span;
	  	}

	  	if(line_num>1){
	  		var
	  		tmp_fills = [],
	  		tmp_trunk = [];

	  		for(var i=0; i<fills.length; i++){
  				// fills[i].props.className = 'span'+this.props.span;
	  			if(i%line_num===0&&i!==0){
	  				tmp_fills.push(<li>{tmp_trunk}</li>);
	  				tmp_trunk = [];
	  				tmp_trunk.push(fills[i]);
	  			}else{
	  				tmp_trunk.push(fills[i]);
	  			}
	  		}
	  		if(tmp_trunk.length){
  				tmp_fills.push(<li className="span12">{tmp_trunk}</li>);
  				tmp_trunk = [];
	  		}
	  		fills = tmp_fills;
	  	}

	  	if(this.props.scroll){
	  		fills.push(<li id={"scrollbar"} className={"span12"} style={{lineHeight:"60px",textAlign:"center"}}>Loadding</li>);
	  	}


		return  <div {...this.props}>
					<ul>
						{fills ? fills:''}
					</ul>
				</div>
	}
});



module.exports = ListClass;
