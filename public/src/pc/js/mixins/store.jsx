//store
var libs = require('libs/libs');

//like flux
var storeAct = {

    save:{},

    setter: function(name, dataOrAct, fun){
        if(!name||name=='') return;

        var save = this.save;

        if(!save[name])
            save[name] = {}

        if(dataOrAct && dataOrAct!==""){
            if(libs.getObjType(dataOrAct) === 'Function')
                save[name].act = dataOrAct;
            else
                save[name].data = libs.clone(dataOrAct);

            if(libs.getObjType(fun)==='Function'){
                save[name].act = fun;
            }

            if(save[name].act){
                var act = save[name].act;
                act(save[name].data);
            }
        }
    },

    getter: function(name){
        if(!name||name=='')
            return;

        var save = this.save;
        return save[name];
    }
}

window.SA = storeAct;



var Store = {
    getInitialState: function() {
        return {}
  	},
    store: function(){
        var that = this;
        return {
            setter: function(data){
                that.setState({
                    datas: data
                })
            },
            getter: function(){
                return that.state.datas
            },
            def: function(options){
                that.setState(options);
            }
        }
    },

    componentWillMount: function(){ },

    componentDidMount: function() { }
};

module.exports = Store;
