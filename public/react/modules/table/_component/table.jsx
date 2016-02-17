/*
* Auth: lgh
* 数据表格
*/
var Store = require('mixins/store');
var libs = require('libs/libs');
var render = React.render;



var Trr = React.createClass({
    getInitialState: function(){
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

    renderTd: function(){
        var items = [];
        this.state.data.map(function(td,i){
            items.push(<td>{td}</td>)
        })
        return items
    },

    renderChildren: function () {
        var fill = this.renderTd();
        return React.Children.map(fill, function (child) {
            return child
        }.bind(this))
    },

    render: function () {
        return(
            <tr>
                {this.renderChildren()}
            </tr>
        )
    }
})

//react Tab
var table = {
    getInitialState: function() {
        return {};
    },

    //插入真实 DOM之前
    componentWillMount: function(){
        if(this.props.data){
            this.setState({
                data: this.props.data
            })
        }

        if(this.props.hddata){
            this.setState({
                hddata: this.props.hddata
            })
        }
        if(this.props.itemWidth){
            this.setState({
                itemWidth: this.props.itemWidth
            })
        }
    },

    renderTable: function (son) {
        var fill = son;
        return React.Children.map(fill, function (child) {
            return child
        }.bind(this))
    },

    loopRender: function(){

        var items=[];
        var th = [];
        var tbd = []
        if(this.state.hddata){
            var tiemWidth = [];
            if(this.state.itemWidth) tiemWidth=this.state.itemWidth;
                this.state.hddata.map(function(item,i){
                    th.push(
                            <th width={tiemWidth[i]>0?tiemWidth[i]:""}>{item}</th>
                        )
            })
        }
        if(this.state.data){
            this.state.data.map(function(item){
                tbd.push(
                    <Trr data={item}/>
                )
            })
        }

        return(
            <table className={'table table-hover table-org'} style={{width:'100%',height:'auto'}} >
                <thead>
                    <tr>
                        {this.renderTable(th)}
                    </tr>
                </thead>
                <tbody>
                    {this.renderTable(tbd)}
                </tbody>
            </table>
        )
    },
    //已加载组件收到新的参数时调用
    componentWillReceiveProps:function(nextProps){
        if(nextProps.data){
            this.setState({
                data: nextProps.data
            })
        }
    },

    render: function () {
        return(
            <div>
                {this.loopRender()}
            </div>
        )
    }
}


function actRct( storeName ){
    var _storeName = storeName||'Table',
        _rct = require('libs/libs').clone(table);

	if( _rct.mixins && _rct.mixins.length ){
		_rct.mixins.push( Store( _storeName ))
    }
	else{
		_rct.mixins = [ Store( _storeName ) ]
    }

    return React.createClass( _rct );
}

module.exports = actRct;
