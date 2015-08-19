//store
function itemMixin(){
    return {
        getInitialState: function() {
    		return {
            	params: ''
    	    };
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

            // var datas = this.props.data;
            // var params = []
            // if(datas){
            //     for(var i in datas){
            //         if(i.indexOf('data-')>-1){
            //             params.push( { key:i, value: datas[key] } )
            //         }
            //     }
            //     if(params.length){
            //         var paramsStr = params.join(' ');
            //         this.setState({
            //             params: paramsStr
            //         })
            //     }
            // }
        }
    }
}

module.exports = itemMixin();
