//store
function setMixin( name ){
    return {
        getInitialState: function() {
            return {}
      	},

        _act: function(data){
            this.setState(data);
        },

        componentWillMount: function(){
            if( name )
                SAX.setter( name, null, this._act )
        },

        componentDidMount: function() { }
    }
}

module.exports = setMixin;
