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
		var placeholder;
		var body;
		var append;
		var bodyDom;
		var cls;
		if(this.state.data){
			var theData = this.state.data;
			if(theData.label)
				label = <label>{theData.label}</label>

			if(theData.placeholder)
				placeholder = theData.placeholder

			if(theData.append){
				append = theData.append;
			}

			if(theData.class){
				cls = theData.class;
			}

			//下拉或者弹窗
			body = theData.body||'没有传入数据'
			var pop = document.getElementById('pop-box');
			if(!pop)
				bodyDom = <div className={'dot'}> {body} </div>
		}
        return(
			<div className={'form select'} data-value={''}>
				{label}
				<div className={'body'}>
					<input className={cls} name={this.props.name} type='hidden' value=''></input>
					<span>{placeholder||'请选择'}</span>
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
