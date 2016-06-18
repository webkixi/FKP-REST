var libs = require('libs/libs');
var List = require('widgets/listView/list');
var Store = require('mixins/store');


//react tabswitch
var tabswitch = {
    // mixins: [Store('tabswitch')],

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
        //模块内CSS
		//添加css/modules到头部
		tabcss = '/css/t/tabs/tabs.css'
        libs.addSheet([tabcss,'tabswt']);
    },

	//插入真实 DOM之前
	componentWillMount:function(){
        var that = this;
        if(this.props.data){
            var data = this.props.data;
			this.setState({
				datas: data
			})
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
		var _props = _.merge({data: this.state.datas}, his.props )
		var _List = React.createElement(List, _props)
		return <div className={'tabswitch u-clearfix'} style={this.props.style}>
				{_List}
          </div>
	}
}


var libs = require('libs/libs')
function actRct( storeName ){
    var _storeName = storeName||'Tabswitch',
        _rct = libs.clone(tabswitch);

	if( _rct.mixins && _rct.mixins.length ){
		_rct.mixins.push( Store( _storeName ))
    }
	else{
		_rct.mixins = [ Store( _storeName ) ]
    }

    return React.createClass( _rct );
}

module.exports = actRct;
