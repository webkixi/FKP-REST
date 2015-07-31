;(function(){
    function getObjType(object){
        return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
    }

    var store = function( data, act ){
        this.sdata = null;
        this.sact = [];

        if( data )
            this.sdata = data;

        if( act )
            this.sact = act;

        this.dataer = function( data ){
            if( data ){
                this.sdata = data;
                if( this.sact.length ){
                    var acts = this.sact;
                    acts.map(function( fun ){
                        fun( data );
                    })
                }
            }
        }

        this.acter = function( act ){
            if ( act )
                this.sact.push( act );
        }

        this.setter = function( data, act ){
            if( data )
                this.sdata = data;

            if( act )
                this.sact = act;
        };

        this.getter = function( type ){
            if( type === 'action' )
                return this.sact;

            if( type === 'data')
                return this.sdata;
        };
    }

    var stock = {}

    //like flux
    var storeAct = {

        setter: function(name, dataOrAct, fun){

            if(!name||name=='') return;

            var save = stock;

            if(!save[name]){
                var thisStore = new store();
                save[name] = thisStore;
            }

            if( dataOrAct && dataOrAct!=="" ){
                if ( getObjType(dataOrAct) === 'Function' )
                    save[name].acter(dataOrAct);
                else
                    save[name].dataer(dataOrAct);
                    // save[name].dataer(libs.clone(dataOrAct));
            }

            if ( getObjType(fun)==='Function' )
                save[name].acter(fun);

        },

        getter: function(name){
            if(!name||name=='')
                return;

            var save = stock;
            if(save[name]){
                return {
                    dataer: save[name].dataer,
                    actioner: save[name].acter,
                    data: save[name].getter( 'data' ),
                    action: save[name].getter( 'action' )
                }
            }
        },

        lister: function(){
            return Object.keys( stock );
        }
    }

    window.SA = storeAct;
})();
