//store
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
            var that = this.getDOMNode();
    		if(this.props.itemMethod){
    			var mtd = this.props.itemMethod;
    			if(typeof mtd==='function'){
    				mtd.call(this.getDOMNode());
    			}
    		}

    		if(this.props.itemDefaultMethod){
    			var dMtd = this.props.itemDefaultMethod;
    			if(typeof dMtd==='function'){
    				dMtd.call(that);
    			}
    		}
        }
    }
}

module.exports = itemMixin();
