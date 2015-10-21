var libs = require('libs/libs');
var Store = require('mixins/store');
var ItemMixin = require('mixins/item')

var radioForm = {
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
		var append;
		if(this.state.data){
			var theData = this.state.data;
			if(theData.label)
				label = <label>{theData.label}</label>

			if(theData.append){
				append = theData.append;
			}

			body = theData.body||'没有传入数据'
		}
		if(!React.isValidElement(append)){
			append = undefined;
		}
        return(
			<div className={'form radio'} data-value={''}>
  			<input name={this.props.name} value={this.props.value} className={'radio_input'} type="radio" ></input>
				{label}
				{append}
			</div>
        )
    }
}

var libs = require('libs/libs')
function actRct( storeName ){
    var _storeName = storeName||'radioForm',
        _rct = libs.clone(radioForm);

	// if( _rct.mixins && _rct.mixins.length ){
	// 	_rct.mixins.push( Store( _storeName ))
    // }
	// else{
	// 	_rct.mixins = [ Store( _storeName ) ]
    // }

    return React.createClass( _rct );
}

module.exports = actRct;
