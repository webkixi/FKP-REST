var List = require('widgets/listView/list');
var Store = require('mixins/store');

// react ULS
// 列表容器
// 返回一个或多个 { ul > li } 结构


var uls = {
    initdata: false,
    getInitialState: function() {
        return {
            nodata: '没有数据'
        }
    },

    componentWillMount: function(){
        if(this.props.data){
            var pdata = this.props.data;
            if(!Array.isArray(pdata)){
                alert('Uls must be set array!')
                return false;
            }else{
                if (!pdata.length){
                    this.initdata = true;
                }
                else
                if(!Array.isArray(pdata[0])){
                    pdata = [ pdata ];
                    this.initdata = false;
                }
            }
            this.setState({
                data: pdata
            })
        }

        if (this.props.nodata){
            this.setState({
                nodata: this.props.nodata
            })
        }
    },

    loopRender: function(){
        var items=[];
        if(this.state.data){
            this.initdata = false;
            var pdata = this.state.data;
            if(!Array.isArray(pdata)){
                alert('Uls must be set array!')
                return false;
            }else{
                if (!pdata.length) {
                    this.initdata = true;
                }
                else
                if(!Array.isArray(pdata[0])){
                    this.initdata = false;
                    pdata = [ pdata ];
                }
            }
            if (!this.initdata) {
                pdata.map(function(it,i){
                    var _props = _.merge({data: it, cat: i}, this.props )
            		var _List = React.createElement(List, _props)
                    items.push(
                        _List
                    )
                }.bind(this))
            }
        }
        // console.log(items);
        return items;
    },

    componentWillReceiveProps:function(nextProps){
        if(nextProps.data){
            var pdata = nextProps.data;
            if(!Array.isArray(pdata)){
                alert('Uls must be set array!')
                return false;
            }else{
                if (!pdata.length) {
                    this.initdata = true;
                }
                else
                if(!Array.isArray(pdata[0])){
                    this.initdata = false;
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
        var fillcontent = fill.length
        ? fill
        : <div className={'u-tips'}>
            <i style={{display: 'block'}} className="ifont icon-infofill"></i>
            {this.state.nodata}
        </div>

        return(
            <div className={'tab-uls u-clearfix'} style={this.props.style}>
                {fillcontent}
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

function actRct( storeName ){
    var _storeName = storeName||'Uls',
        _rct = _.cloneDeep(uls);

	if( _rct.mixins && _rct.mixins.length ){
		_rct.mixins.push( Store( _storeName ))
    }
	else{
		_rct.mixins = [ Store( _storeName ) ]
    }

    return React.createClass( _rct );
}

module.exports = actRct;
