var List = require('widgets/listView/list');
var Store = require('mixins/store');

// react ULS
// 列表容器
// 返回一个或多个 { ul > li } 结构


var uls = {

    getInitialState: function() {
        return {}
    },

    componentWillMount: function(){
        if(this.props.data){
            var pdata = this.props.data;
            if(!Array.isArray(pdata)){
                alert('Uls must be set array!')
                return false;
            }else{
                if(!Array.isArray(pdata[0])){
                    pdata = [ pdata ];
                }
            }
            this.setState({
                data: pdata
            })
        }
    },

    loopRender: function(){
        var items=[];
        if(this.state.data){
            var pdata = this.state.data;
            if(!Array.isArray(pdata)){
                alert('Uls must be set array!')
                return false;
            }else{
                if(!Array.isArray(pdata[0])){
                    pdata = [ pdata ];
                }
            }
            pdata.map(function(it,i){
                items.push(
                    <List key={'list'+i} {...this.props} data={it} cat={i} />
                )
            }.bind(this))
        }
        return items;
    },

    componentWillReceiveProps:function(nextProps){
        if(nextProps.data){
            var pdata = nextProps.data;
            if(!Array.isArray(pdata)){
                alert('Uls must be set array!')
                return false;
            }else{
                if(!Array.isArray(pdata[0])){
                    pdata = [ pdata ];
                }
            }
            this.setState({
                data: pdata
            })
        }
    },

    render: function () {
        var fill = this.loopRender();
        return(
            <div className={'tab-uls u-clearfix'} style={this.props.style}>
                {fill}
            </div>
        )
    }
}



// var mkuls = function( storeName ){
//     if( storeName )
//         uls.mixins = [ Store(storeName) ]
//
//     return React.createClass(uls);
// }

var libs = require('libs/libs')
function actRct( storeName ){
    var _storeName = storeName||'Uls',
        _rct = libs.clone(uls);

	if( _rct.mixins && _rct.mixins.length ){
		_rct.mixins.push( Store( _storeName ))
    }
	else{
		_rct.mixins = [ Store( _storeName ) ]
    }

    return React.createClass( _rct );
}

module.exports = actRct;
