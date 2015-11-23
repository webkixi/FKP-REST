var libs = require('libs/libs');
var Store = require('mixins/store');
var ItemMixin = require('mixins/item')

var textForm = {
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
		var cls='body';
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
			<div className={'form text'}>
				{label}
					<input name={this.props.name} className={cls} type="text" placeholder={placeholder}></input>
				{append}
			</div>
        )
    }
}

var libs = require('libs/libs')
function actRct( storeName ){
    var _storeName = storeName||'Textform',
        _rct = libs.clone(textForm);

	// if( _rct.mixins && _rct.mixins.length ){
	// 	_rct.mixins.push( Store( _storeName ))
    // }
	// else{
	// 	_rct.mixins = [ Store( _storeName ) ]
    // }

    return React.createClass( _rct );
}

module.exports = actRct;
