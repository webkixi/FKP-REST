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
				mtd.call(this.getDOMNode());
			}
		}
    },

    renderChildren: function () {
        return React.Children.map(this.props.children, function (child) {
            return child
        }.bind(this))
    },

	render:function(){
		return <div className={'tabswitch u-clearfix'} style={this.props.style}>
				<List {...this.props} data={this.state.datas}/>
                {this.renderChildren()}
          </div>
	}
}


function mkTabSwitch( storeName ){
    if(storeName)
        tabswitch.mixins = [Store(storeName)];

    return React.createClass(tabswitch);
}

// function mkTabSwitch( storeName ){
// 	if( tabswitch.mixins && tabswitch.mixins.length )
// 		tabswitch.mixins.push( Store( storeName||'tabswitch' ))
// 	else
// 		tabswitch.mixins = [ Store( storeName||'tabswitch' ) ]
//
//     return React.createClass( tabswitch );
// }


module.exports = mkTabSwitch;
