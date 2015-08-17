var
ListView = require('widgets/listView/listView'),
PageScrollStartEndMixin = require('mixins/PageScrollStartEndMixin'),
libs = require('libs/libs');

//react
var
LoadList = React.createClass({
	mixins: [PageScrollStartEndMixin],
	getDefaultProps: function() {
		// var cstore = {
        //     element: {},
        //     setter: function(name,data,cb){
        //         if(!name) return;
        //         this.element[name]=this.element[name]||{action: undefined};
        //         this.element[name].data = data||this.element[name].data||'';
        //         this.element[name].action = this.element[name].action||cb;
        //         var act = this.element[name].action;
        //         var data = this.element[name].data;
        //         if(act){
        //             act(data);
        //         }
        //     },
        //     getter: function(name){
        //         return this.element[name];
        //     }
        // }
        // window.cstore = cstore;

		return {};
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
