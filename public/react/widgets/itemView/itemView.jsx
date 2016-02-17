ViewClass = React.createClass({
	getInitialState:function(){
		return {
			pre_render_view:function(){  },
			render_view:function(){  },
			aft_render_view:function(){  }
		}
	},
	//插入真实 DOM之前
	componentWillMount:function(){
		this.state.pre_render_view();
	},
	//插入真实 DOM之后
	componentDidMount:function(){
		{this.state.aft_render_view()}
		// this.getDOMNode().onclick = function() {}
	},
	//被重新渲染之前
	componentWillUpdate:function(){

	},
	//被重新渲染之后
	componentDidUpdate:function(){

	},
	//移出真实 DOM之前
	componentWillUnmount:function(){

	},
	//已加载组件收到新的参数时调用
	componentWillReceiveProps:function(){

	},
	//组件判断是否重新渲染时调用
	shouldComponentUpdate:function(){
		return true;
	},

	handleClick:function(){
		alert('aaaaaaaaaaaaa');
	},
	render:function(){
		return <div onClick={this.handleClick}  {...this.props}>
					{this.props.children}
				</div>
	}
});

// var
// view = function(){
// 	this.id=null;
// 	this.opts={};
// 	this.child='';
// }

// view.prototype={
// 	render:function(id){
//   		id = !id ? this.id : id;
// 		var
// 	    opts  = this.opts,
// 	    child = this.child;

// 		React.render(
//       		React.createElement(ViewClass,opts,child)
// 			,id
// 		);
//   	},
//   	factory:function(){
//   		return React.createFactory(ViewClass);
//   	},
//   	element:function(opts,child){
//   		opts  = this.opts  ? this.opts  : opts ? opts : {};
//   		child = this.child ? this.child : child ? child : '';
//   		return React.createElement(ViewClass,opts,child);
//   	},
// 	//
// 	reRun:function(){
// 		this.run();
// 	},
// 	//
// 	setContent:function(opts,child){
// 		this.opts  = opts;
// 		this.child = child;
// 		return this;
// 	}
// };

// var
// instanceView = function(){
// 	return new view();
// }

// module.exports = instanceView;
module.exports = ViewClass;
