var libs = require('libs/libs');
var Store = require('mixins/store');
var ItemMixin = require('mixins/item')

var popwin = {
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
		libs.addSheet([
			'/css/t/pop/pop.css',
			'popwin'
		])
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

	handleClick: function(){
		// var self = this.getDOMNode();  //React.findDOMNode(this)
		this.setState({
			data: {display:'none'}
		})
	},

    render: function () {
		var display = 'none';
		var body='';
		var bodyDom='';
		var cls='pop';
		if(this.state.data){
			var theData = this.state.data;
			if(theData.body)
				body = theData.body;
			else {
				body = <div className={'loading'}><img style={{width:'1rem'}} src='/images/loading1.gif'/></div>
			}
			if(theData.display){
				display = theData.display;
				if(display==='block')
					cls+=' active'
				if(display==='none')
					cls = 'pop'
			}
		}
        return(
			<div className={cls} ref='popbox'>
				<div className="pop_content">{body}</div>
				<div className="pop_bg" onClick={this.handleClick}></div>
		    </div>
        )
    }
}


var libs = require('libs/libs')
function actRct( storeName ){
    var _storeName = storeName||'Pop',
        _rct = libs.clone(popwin);

	if( _rct.mixins && _rct.mixins.length ){
		_rct.mixins.push( Store( _storeName ))
    }
	else{
		_rct.mixins = [ Store( _storeName ) ]
    }

    return React.createClass( _rct );
}

module.exports = actRct;
