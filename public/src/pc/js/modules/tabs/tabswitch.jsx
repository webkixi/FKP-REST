
var List = require('widgets/listView/list');
var Store = require('mixins/store');

var attrClick = function(){
    $(this).click(function(){
        $(this).toggleClass('active');
        $(this).siblings().removeClass('active');
    })
}

//react cnt
var Cnt = React.createClass({
    mixins: [Store],
    getInitialState: function() {
        SA.setter('Cnt',{});
        SA.setter('Cnt',this.act)
    },

    act: function(data){
        this.setState(data);
    },

    componentWillMount: function(){
        if(this.props.data){
            this.setState({
                datas: this.props.data
            })
        }
    },

    loopRender: function(){
        var items=[];
        if(this.state.datas){
            this.state.datas.map(function(it,i){
                items.push(
                    <List {...this.props} data={it}  itemMethod={attrClick}/>
                )
            }.bind(this))
        }
        return items;
    },

    componentWillReceiveProps:function(nextProps){
        if(nextProps.data){
            this.setState({
                datas: nextProps.data
            })
        }
    },

    render: function () {
        var fill = this.loopRender();
        return(
            <div className={'tab-cnt'} style={{width:'100%',height:'auto'}} >
                {fill}
            </div>
        )
    }
});



//react tabswitch
var tabswitch = React.createClass({
    mixins: [Store],
	getDefaultProps: function() {
		return { }
	},

	getInitialState: function() {
        SA.setter('tabswitch',{}, this.act);
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

    act: function(data){
        this.setState(data);
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

	componentDidMount: function() { },

    componentDidMount:function(){
        if(this.props.boxMethod){
			var mtd = this.props.boxMethod;
			if(typeof mtd==='function'){
				mtd.call(this.getDOMNode());
			}
		}
    },

    renderChilds: function(){
        var childs = this.props.children;
        var items = [];
        var newData = {};
        if(this.state.cntData && this.state.cntData.length){
            newData = this.state.cntData;
            React.Children.map(childs,function(child,i){
                var cd = React.createElement(child.type,{key:'new'+i,data: newData });
                items.push(cd);
            })
        }
        return items.length ? items : false ;
    },

	render:function(){
		return <div className={'tabswitch wid-12 u-clearfix'}>
				<List {...this.props} data={this.state.datas}/>
                <Cnt data={this.state.cntData} listClass={'fox'} itemStyle={{width:'auto'}} />
          </div>
	}
});

module.exports = tabswitch;
