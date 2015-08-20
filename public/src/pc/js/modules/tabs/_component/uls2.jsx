var List = require('widgets/listView/list');
var Store = require('mixins/store');

//react cnt
var Cnt = React.createClass({
    mixins: [Store('Jd')],

    getInitialState: function() {
        return {}
    },
    componentWillMount: function(){
        if(this.props.data){
            this.setState({
                data: this.props.data
            })
        }
    },
    loopRender: function(){
        var items=[];
        var that = this;
        if(this.state.data){
            this.state.data.map(function(it,i){
                items.push(
                    <List key={'list'+i} {...that.props} data={it} cat={i} />
                )
            }.bind(this))
        }
        return items;
    },
    componentWillReceiveProps:function(nextProps){
        if(nextProps.data){
            this.setState({
                data: nextProps.data
            })
        }
    },
    render: function () {
        var fill = this.loopRender();
        return(
            <div className={'tab-cnt'} style={{height:'auto'}}>
                {fill}
            </div>
        )
    }
});
module.exports = Cnt;
