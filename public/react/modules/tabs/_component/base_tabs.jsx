/**
* list 通用组件
* 返回 div > (ul > li)*n
*/
var ItemMixin = require('mixins/item')
var BaseList = require('../../list/base_list')

var tmpApp = {
	getInitialState: function() {
		return {
        	data: []
	    };
	},

	//插入真实 DOM之前
	componentWillMount:function(){
		if(this.props.data){
			this.setState({
				data: this.props.data,
                opts: this.props.opts
			})
		}
	},

    componentDidMount: function() {

    },

    preRender: function(){
        var tabsContainer = [],
            data = this.state.data,
            opts = this.state.opts;

        if (opts.mulitple){
            if (data.length){
                data.map(function(item, i){
                    tabsContainer.push(<div key={'tabs-box-key-'+i} className={'tabs-box tabs-box-'+i}></div>)
                })
            }
        }
        else {
            tabsContainer.push(<div key={'tabs-box-key-'} className={'tabs-box'}></div>)
        }
        return tabsContainer;
    },

	render: function () {
        var boxes = this.preRender();
        var List = BaseList.pure();
        var opts = this.state.opts;
        var _cls = 'tabsGroupX'
        if (opts.cls){
            _cls = _cls + ' ' + opts.cls;
        }

        var boxes_cls = 'tabsBoxes'
        if (opts.mulitple){
            boxes_cls = boxes_cls + ' mulitple'
        }
        return (
            <div className={_cls}>
                <List listMethod={opts.listMethod} itemMethod={opts.itemMethod} itemDefaultMethod={opts.itemDefaultMethod} data={this.state.data} listClass='tabsMenus' itemClass="tabs-menu" />
                <div className={boxes_cls}>
                    {boxes}
                </div>
            </div>
        )
	}
};

// 通过方法返回的结构，带sax的react结构 带itemMixins, storeMixins，scrollEnd的mixins
function actRct( storeName ){
    return require('react/util/index')(storeName, tmpApp)
}

// 带sax的react结构 带itemMixins, storeMixins
actRct.server = actRct.pure = actRct.store = actRct;

module.exports = actRct;
