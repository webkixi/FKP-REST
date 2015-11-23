;(function(){

    function getObjType(object){
        return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
    }

    function extend() {
    	var options, name, src, copy, copyIsArray, clone,
    		target = arguments[0] || {},
    		i = 1,
    		length = arguments.length,
    		deep = false;
    	//如果第一个值为bool值，那么就将第二个参数作为目标参数，同时目标参数从2开始计数
    	if ( typeof target === "boolean" ) {
    		deep = target;
    		target = arguments[1] || {};
    		// skip the boolean and the target
    		i = 2;
    	}
    	// 当目标参数不是object 或者不是函数的时候，设置成object类型的
    	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
    		target = {};
    	}
    	//如果extend只有一个函数的时候，那么将跳出后面的操作
    	if ( length === i ) {
    		target = this;
    		--i;
    	}
    	for ( ; i < length; i++ ) {
    		// 仅处理不是 null/undefined values
    		if ( (options = arguments[ i ]) != null ) {
    			// 扩展options对象
    			for ( name in options ) {
    				src = target[ name ];
    				copy = options[ name ];
    				// 如果目标对象和要拷贝的对象是恒相等的话，那就执行下一个循环。
    				if ( target === copy ) {
    					continue;
    				}
    				// 如果我们拷贝的对象是一个对象或者数组的话
    				if ( deep && copy && ( getObjType(copy)==='Object' || (copyIsArray = Array.isArray(copy)) ) ) {
    					if ( copyIsArray ) {
    						copyIsArray = false;
    						clone = src && Array.isArray(src) ? src : [];
    					} else {
    						clone = src && getObjType(copy)==='Object' ? src : {};
    					}
    					//不删除目标对象，将目标对象和原对象重新拷贝一份出来。
    					target[ name ] = extend( deep, clone, copy );
    				// 如果options[name]的不为空，那么将拷贝到目标对象上去。
    				} else if ( copy !== undefined ) {
    					target[ name ] = copy;
    				}
    			}
    		}
    	}
    	// 返回修改的目标对象
    	return target;
    };

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
                        if(getObjType(fun.args) === 'Array'){
                            fun.args.push( data )
                            fun.apply(null, fun.args)
                        }else
                            fun( data );

                    })
                }
            }else{
                if( this.sact.length ){
                    var acts = this.sact;
                    acts.map(function( fun ){
                        if(getObjType(fun.args) === 'Array'){
                            fun.apply(null, fun.args)
                        }else
                            fun();

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

    window._stock = {}

    //like flux
    var storeAct = {
        append: function(name, dataOrAct, fun){
            if(!name||name=='') return false;

            var save = _stock;

            if(!save[name]){
                return false
            }else{
                if( getObjType(dataOrAct) === 'Object' ){
                    var target = extend(true, save[name].sdata, dataOrAct)
                    save[name].setter( target );
                }
            }
        },

        setter: function(name, dataOrAct, fun){
            if(!name||name=='') return false;

            var save = _stock;

            if(!save[name]){
                var thisStore = new store();
                save[name] = thisStore;
            }

            if( dataOrAct && dataOrAct!=="" ){
                if ( getObjType(dataOrAct) === 'Function' ){
                    if(getObjType(fun) === 'Array' ){
                        dataOrAct.args = fun;
                    }
                    save[name].acter(dataOrAct);
                }
                else{
                    if( getObjType(dataOrAct) === 'Object' )
                        save[name].dataer(dataOrAct);
                    if( getObjType(dataOrAct) === 'Array' ) {
                        var isFuns = true;
                        dataOrAct.map(function(item, i){
                            if( getObjType(item) !== 'Function' )
                                isFuns = false;
                        })
                        if( isFuns ){
                            if(getObjType(fun) === 'Array' ){
                                dataOrAct.map(function(item, i){
                                    if(getObjType(fun[i])==='Array')
                                        item.args = fun[i];
                                    else {
                                        item.args = [fun[i]]
                                    }
                                })
                            }
                            save[name].sact = dataOrAct;
                        }
                    }
                    // save[name].dataer(libs.clone(dataOrAct));
                }
            }

            if ( getObjType(fun)==='Function' )
                save[name].acter(fun);

            if( getObjType(fun) === 'Array' ) {
                var isFuns = true;
                fun.map(function(item, i){
                    if( getObjType(item) !== 'Function' )
                        isFuns = false;
                })
                if( isFuns ){
                    save[name].sact = dataOrAct;
                }
            }
        },

        getter: function(name){
            if(!name||name=='')
                return;

            var save = _stock;
            if(save[name]){
                return {
                    run: save[name].dataer,
                    data: save[name].getter( 'data' ),
                    action: save[name].getter( 'action' )
                }
            }else{
                return false;
            }
        },

        deleter: function( name ){
            if(!name||name=='')
                return;

            var save = _stock;
            if(save[name]){
                delete save[name];
            }
        },

        lister: function(){
            return Object.keys( _stock );
        }
    }

    window.SA = storeAct;
})();
