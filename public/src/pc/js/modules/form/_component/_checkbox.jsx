var libs = require('libs/libs');
var Store = require('mixins/store');
var ItemMixin = require('mixins/item')

var checkboxForm = {
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
		var cls='chk_1';
		if(this.state.data){
			var theData = this.state.data;
			if(theData.label)
				label = <label>{theData.label}</label>

			if(theData.append){
				append = theData.append;
			}

			if(theData.class){
				cls = cls + ' ' + theData.class;
			}

			body = theData.body||'没有传入数据'
		}
		if(!React.isValidElement(append)){
			append = undefined;
		}

        return(
			<div className={'form checkbox'} data-value={''}>
  			<input name={this.props.name} value="0" className={cls} type="checkbox" ></input>
        	<span ref="chkspan" className="chk_span" ></span>
				{label}
				{append}
			</div>
        )
    }
}

var libs = require('libs/libs')
function actRct( storeName ){
    var _storeName = storeName||'checkboxForm',
        _rct = libs.clone(checkboxForm);

	// if( _rct.mixins && _rct.mixins.length ){
	// 	_rct.mixins.push( Store( _storeName ))
    // }
	// else{
	// 	_rct.mixins = [ Store( _storeName ) ]
    // }

    return React.createClass( _rct );
}

module.exports = actRct;
