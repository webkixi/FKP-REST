// var
// ListView = require('widgets/listView/listView'),
// PageScrollStartEndMixin = require('mixins/PageScrollStartEndMixin'),

var List = require('widgets/listView/list');



var Cnt = React.createClass({
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
                    <List {...this.props} data={it} />
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
            <div className={'tab-cnt'} style={{width:'100%',height:'auto'}}>
                {fill}
            </div>
        )
    }
});





//react
var tabswitch = React.createClass({
	getDefaultProps: function() {
		return { }
	},

	getInitialState: function() {
        var cstore = {
            element: {},
            setter: function(name,data,cb){
                if(!name) return;
                this.element[name]=this.element[name]||{action: undefined};
                this.element[name].data = data||this.element[name].data||'';
                this.element[name].action = this.element[name].action||cb;
                var act = this.element[name].action;
                var data = this.element[name].data;
                if(act){
                    act(data);
                }
            },
            getter: function(name){
                return this.element[name];
            }
        };
        window.cstore = cstore;

		return {
        	datas: [],
            cntData: []
	    };
	},

    store: function(){
        var that = this;
        return {
            setter: function(data){
                that.setState({
                    datas: data
                })
            },
            getter: function(){
                return that.state.datas
            },
            adder: function(options){
                that.setState(options);
            }
        }
    },

    act: function(data){
        this.setState({
            datas: data
        })
    },

	//插入真实 DOM之前
	componentWillMount:function(){
        var that = this;
        // cstore.setter('tab',this.props.datas,that.act);
        if(this.props.data){
            var data = this.props.data;
            this.store().setter(data);
        }

        if(this.props.cntData){
            var cnt_data = this.props.cntData;
            this.setState({
                cntData: cnt_data
            })
        }

        // if(this.props.children){
        //     this.setState({
        //         childs: this.props.children
        //     })
        // }
	},

	componentDidMount: function() { },

    componentDidMount:function(){
        if(this.props.boxMethod){
			var mtd = this.props.boxMethod;
			if(typeof mtd==='function'){
				mtd.call(this.getDOMNode(),this.store());
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
				<List {...this.props} data={this.state.datas} store={this.store()}/>
                <Cnt data={this.state.cntData} listClass={'fox'} itemStyle={{width:'auto'}} />
          </div>
	}
});

module.exports = tabswitch;
