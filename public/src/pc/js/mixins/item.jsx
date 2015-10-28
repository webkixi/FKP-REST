// widget/item默认绑定方法
// 1、前／后置icon
// 2、绑定默认方法 itemDefaultMethod
// 3、绑定外传方法 itemMethod

function itemMixin(){
    return {
        getInitialState: function() {
    		return {
            	params: '',
                icon: '',
                iconPre: ''
    	    };
    	},
        componentWillMount: function(){
    		if(this.props.itemIcon){
    			if(typeof this.props.itemIcon!=='string'){
                    this.setState({
                        icon: this.props.itemIcon
                    })
                }else{
                    this.setState({
                        icon: <i>{'>'}</i>
                    })
                }
    		}
        },
        componentDidMount: function() {
            var that = this.getDOMNode();  //React.findDOMNode(this) // var box = React.findDOMNode(this.refs.popbox);

            if(this.props.itemDefaultMethod){
    			var dMtd = this.props.itemDefaultMethod;
    			if(typeof dMtd==='function'){
    				dMtd.call(that);
    			}
    		}

    		if(this.props.itemMethod){
    			var mtd = this.props.itemMethod;
    			if(typeof mtd==='function'){
    				mtd.call(this.getDOMNode());
    			}
    		}

        }
    }
}

module.exports = itemMixin();
