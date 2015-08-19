var List = require('widgets/listView/list');
var Store = require('mixins/store');

// react ULS
// 列表容器
// ul > li 结构的 ul
var ULS = React.createClass({
    mixins: [Store('Uls')],

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
            <div className={'tab-cnt'} style={{width:'100%',height:'auto'}} >
                {fill}
            </div>
        )
    }
});

module.exports = ULS;
