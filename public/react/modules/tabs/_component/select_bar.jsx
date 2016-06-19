var libs = require('libs/libs');
var Store = require('mixins/store');
var ItemMixin = require('mixins/item')

var selectBar = {
	mixins: [ItemMixin],
	getInitialState: function() {
        this.addSheet();
		return {
			data: []
		}
	},
	componentWillMount: function(){
		if(this.props.data){
			this.setState({
				data: this.props.data
			})
		}
	},
	componentDidMount: function () {
		if(this.props.itemMethod){
			var mtd = this.props.itemMethod;
			if(typeof mtd==='function'){
				mtd.call(React.findDOMNode(this));
			}
		}
	},
    addSheet: function(){
        //添加css到头部
        selectcss = '\n.cateTags{ width:100%; padding:20px; height:100px; line-height:60px; }\n\
        .cateTags dl{}\
		.cateTags dt{ display: inline-block;font-family: "Microsoft YaHei","微软雅黑","Helvetica Neue",Helvetica,Arial,sans-serif; font-size: 16px; font-weight: bold; }\n\
		.cateTags dd {display: inline-block;margin-left: 10px}\
        ';
        libs.addSheet([selectcss,'tabselect']);
    },
	componentWillReceiveProps:function(nextProps){
        if(nextProps.data){
            this.setState({
                data: nextProps.data
            })
        }
    },
	renderContent: function(){
		if(this.state.data && this.state.data.length){
			var contents = [];
			var cnts = this.state.data;
			cnts.map(function(item,i){
				contents.push(
					<dd key={'select'+i}><a data-value={item.value} href={item.url||'javascript:;'}>{item.title}</a></dd>
				)
			})
			return contents;
		}
	},
    render: function () {
        var fill = this.renderContent();
        return(
            <div className={'cateTags'}>
            	<dl className={"cf"}>
                	<dt>{"您选择的是："}</dt>
                	{fill}
                </dl>
            </div>
        )
    }
}

// function mkSelectBar( storeName ){
// 	if( selectBar.mixins && selectBar.mixins.length )
// 		selectBar.mixins.push( Store( storeName||'SelectBar' ))
// 	else
// 		selectBar.mixins = [ Store( storeName||'SelectBar' ) ]
//
//     return React.createClass( selectBar );
// }
//
// module.exports = mkSelectBar;

var libs = require('libs/libs')
function actRct( storeName ){
    var _storeName = storeName||'SelectBar',
        _rct = _.cloneDeep(selectBar);

	if( _rct.mixins && _rct.mixins.length ){
		_rct.mixins.push( Store( _storeName ))
    }
	else{
		_rct.mixins = [ Store( _storeName ) ]
    }

    return React.createClass( _rct );
}

module.exports = actRct;
