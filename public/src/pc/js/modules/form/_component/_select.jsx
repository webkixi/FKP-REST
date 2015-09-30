var libs = require('libs/libs');
var Store = require('mixins/store');
var ItemMixin = require('mixins/item')

var selectForm = {
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

	},

    addSheet: function(){
        //添加css到头部
    },

	componentWillReceiveProps:function(nextProps){
        if(nextProps.data){
            this.setState({
                data: nextProps.data
            })
        }
    },

	renderContent: function(){
	},

    render: function () {
		var label;
		var body;
		var bodyDom='';
		if(this.state.data){
			var theData = this.state.data;
			label = theData.label||'演示';
			body = theData.body||'没有传入数据'
			var pop = document.getElementById('pop-box');
			if(!pop)
				bodyDom = <div className={'dot'}> {body} </div>
		}
        return(
			<div className={'form select'} data-value={''}>
				<label>{label}</label>
				<div className={'body'}>
					<span>{'请选择'}</span>
					<i className={'ifont icon-xla'}></i>
				</div>
				{bodyDom}
			</div>
        )
    }
}


var libs = require('libs/libs')
function actRct( storeName ){
    var _storeName = storeName||'selectForm',
        _rct = libs.clone(selectForm);

	// if( _rct.mixins && _rct.mixins.length ){
	// 	_rct.mixins.push( Store( _storeName ))
    // }
	// else{
	// 	_rct.mixins = [ Store( _storeName ) ]
    // }

    return React.createClass( _rct );
}

module.exports = actRct;
