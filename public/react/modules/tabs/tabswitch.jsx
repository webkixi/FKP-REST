var libs = require('libs/libs');
var List = require('widgets/listView/list');
var Store = require('mixins/store');


//react tabswitch
var tabswitch = React.createClass({
    mixins: [Store('tabswitch')],

	getDefaultProps: function() {
		return {}
	},

	getInitialState: function() {
        this.addSheet();
		return {
        	datas: [],
            cntData: []
	    };
	},

    addSheet: function(){
        //添加css到头部
        tabcss = '.tabswitch{border:1px solid #efefef;\n margin-bottom:10px;}'
        libs.addSheet([tabcss,'tabswt']);
    },

	//插入真实 DOM之前
	componentWillMount:function(){
        var that = this;
        if(this.props.data){
            var data = this.props.data;
            SA.setter('tabswitch',{datas:data});
        }

        if(this.props.cntData){
            var cnt_data = this.props.cntData;
            this.setState({
                cntData: cnt_data
            })
        }
	},

    componentDidMount:function(){
        if(this.props.boxMethod){
			var mtd = this.props.boxMethod;
			if(typeof mtd==='function'){
				mtd.call(React.findDOMNode(this));
			}
		}
    },

    renderChildren: function () {
        return React.Children.map(this.props.children, function (child) {
            return child
        }.bind(this))
    },

	render:function(){
        var _props = _.merge(this.props, {data: this.state.datas})
		var _List = React.createElement(List, _props)
		return <div className={'tabswitch wid-12 u-clearfix'}>
				{_List}
                {this.renderChildren()}
          </div>
	}
});
                // <Cnt data={this.state.cntData} listClass={'fox'} itemStyle={{width:'auto'}} />

module.exports = tabswitch;
