/**  */
var Store = require('mixins/store');
var Elephant = require('widgets/itemView/elephant');

var exhibition = {
	// mixins: [Store('Exhibition')],
	getDefaultProps: function() {
		return {

		};
	},

	getInitialState: function() {
		return {
        	data: []
	    };
	},

	//插入真实 DOM之前
	componentWillMount:function(){
		// if(this.props.data && this.props.data.pagination.recordList.length){
		if(this.props.data && this.props.data.length){
			this.setState({
				data: this.props.data
			});
		}
	},

	loopRender: function(){
		var items = [];
		var sty = this.props.itemStyle ? this.props.itemStyle : false;
		var cls = this.props.itemClass ? this.props.itemClass : false;

		this.state.data.map(function(item,i){
			items.push(<Elephant key={'elephant'+i} itemStyle={sty} itemClass={cls} data={item} />);
		});

		return items;
	},

	componentDidMount: function () {
		// console.log('fakeData');
		// this.fills = this.loopRender();
	},

	fills:[],

	render: function () {
		var fills = this.loopRender();
		return (
			<div>
				<ul className={"hlist elephant u-clearfix"}>
					{fills}
				</ul>
				{this.props.children}
			</div>
		)
	}
}

// var mkExhibition = function( storeName ){
//     if( storeName )
//         exhibition.mixins = [ Store(storeName) ]
//
//     return React.createClass(exhibition);
// }
//
// module.exports = mkExhibition;


var libs = require('libs/libs')
function actRct( storeName ){
    var _storeName = storeName||'Exhibition',
        _rct = libs.clone(exhibition);

	if( _rct.mixins && _rct.mixins.length ){
		_rct.mixins.push( Store( _storeName ))
    }
	else{
		_rct.mixins = [ Store( _storeName ) ]
    }

    return React.createClass( _rct );
}

module.exports = actRct;
