var libs = require('libs/libs');
var Store = require('mixins/store');
var ItemMixin = require('mixins/item')
var mobilescroll = require('../../mobilescroll/mobilescroll')

// console.log(mobilescroll);
var datemobileForm = {
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
		var placeholder='请输入';
		var body;
		var append;
		var cls='body mobilescroll';
		var star=''
		if(this.state.data){
			var theData = this.state.data;
			if(theData.placeholder)
				placeholder = theData.placeholder

			if(theData.append){
				append = theData.append;
			}

			if(theData.class){
				cls = cls + ' ' +theData.class;
			}

			if(theData.star){
				star = theData.star
			}

			if(theData.label)
				label = <label>{theData.star}{theData.label}</label>

			body = theData.body||'没有传入数据'
		}

		if(!React.isValidElement(append)){
			append = undefined;
		}

        return(
			<div>
				{label}
					<input name={this.props.name} className={cls} placeholder={placeholder} type="text"></input>
				{append}
			</div>
        )
    }
}

var libs = require('libs/libs')
function actRct( storeName ){
    var _storeName = storeName||'Datemobileform',
        _rct = libs.clone(datemobileForm);

	// if( _rct.mixins && _rct.mixins.length ){
	// 	_rct.mixins.push( Store( _storeName ))
    // }
	// else{
	// 	_rct.mixins = [ Store( _storeName ) ]
    // }

    return React.createClass( _rct );
}

module.exports = actRct;
