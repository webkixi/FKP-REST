var libs = require('./libs')

var multiDom = false;

var rt = libs.Class.create();
    rt.prototype = {

        init: function(name, back){
            SA.set("_routerInstanc", this)
            SA.set('_HISTORY', []);
            this.multiDom = multiDom;
            this.intent;
            this.isBack = false;
            this.distribute(name, back)
        },

        _injectionCss: function(){
            libs.addSheet(['#pageloading{width:1rem;\n\
                position:absolute;\n\
                top:0;left:0;right:0;bottom:0;margin:auto;\n\
                .router-container{display:none;}\
            }','loadingcss' ])
            libs.node.append('body','img',{id: 'pageloading',src: '/images/loading1.gif'})
        },

        distribute: function(name, back){
            SA.set('_TRUE_URL', location.href)
            this.name = name;
            this.back = back;
            this.url = libs.urlparse(location.href);

            var _back = this._parseBack()
            if (_back){
                var rtstat = this._parseRoute()
                if (rtstat){
                    this._injectionCss();
                    this._multiDom();
                    this._deal();
                }
            }
        },

        _parseBack: function(){
            var back = this.back;
            if (!back) back = false;
            if (libs.getObjType(back)==='Boolean'){
                this.isBack = back;
                if (typeof router.cb === 'function'){
                    if (back){
                        router.cb(this.name)
                        // router.cb.call(this, this.name)
                        return false;
                    }
                }
            }
            else {
                if (libs.getObjType(back) === 'Object'){
                    this.intent = back;
                }
                else
                    return false;
            }
            return true;
        },

        _goBack: function(){

        },

        _parseRoute: function(){
            var name = this.name
            var url = this.url;

            if (name.indexOf('/')===0 ||
                name.indexOf('http://')===0 ||
                name.indexOf('https://')===0)
            {
                console.log('-------router jump ------');
                if (name.indexOf('#')>-1){
                    var next = name.substring(0,name.indexOf('#'))
                    if (url.path==next){
                        var hash = name.substring(name.indexOf('#')+1)

                        // router(hash);
                        this.name = hash

                        return true;
                    }
                }
                window.location.href = name
                return false;
            }
            else{
                var _uri;
                if (url.params.hash){
                    var hash = url.params.hash;
                    var href=window.location;
                    // var tmp = ''
                    // var len = Object.keys(url.params)
                    // if(len.length===1){
                    //     href = url.source.replace('?'+tmp,'').replace('?&','?')
                    // }else{
                    //     href = url.source.replace(tmp,'').replace('?&','?')
                    // }
                    // SA.set('_HISTORY', url);
                    SA.append('_HISTORY', url);
                    if (!this.isBack){
                        if (hash !== name){
                            _uri = href+'#'+name;
                            historyStat({uri: _uri}, null, _uri)
                        }
                    }
                }
                else{
                    // SA.set('_HISTORY', url);
                    SA.append('_HISTORY', url);
                    if (!this.isBack){
                        _uri = name;
                        historyStat({uri: _uri}, null, '#'+name)
                    }
                }
                return true;
            }
        },

        _deal: function(){
            var name = this.name;
            var isBack = this.isBack;
            var intent = this.intent
            var temp = SA.getter(name)
            var data = {};
            if (temp){
                router.cb = false;
                console.log('======='+name);
                if (intent)
                    data = intent

                if (this.multiDom)
                    SA.setter(name, data)
                else
                    SA.setter(name, data)

                SA.set('_CURENT_PAGE', name)
            }
        },

        _multiDom: function(){
            //多id dom 容器结构
            name = this.name
            if (multiDom){
                var silbDom = document.querySelectorAll('.router-container')
                silbDom = libs.arg2arr(silbDom)
                silbDom.map(function(unit, i){
                    unit.style.display = 'none';
                })
                var nameDom = document.querySelector('#'+name)
                nameDom.style.display = 'block'
                router.clear()
                // $('#pageloading').remove()
                // $('#'+name).css({'display':'block'})
            }
        }
    }

function router(name, back){
    var instance = SA.get('_routerInstanc');
    if (instance){
        instance.distribute(name, back)
    }
    else {
        new rt(name, back)
    }

    // // if(typeof name!=='string') return;
    // SA.set('_TRUE_URL', location.href)
    // var url = libs.urlparse(location.href);
    //
    // if (back){
    //     if (typeof router.cb === 'function'){
    //         router.cb.call(this, name)
    //         return;
    //     }
    // }
    // if (name.indexOf('/')===0 || name.indexOf('http')===0){
    //     console.log('-------router jump ------');
    //     if (name.indexOf('#')>-1){
    //         var next = name.substring(0,name.indexOf('#'))
    //         if (url.path==next){
    //             var hash = name.substring(name.indexOf('#')+1)
    //             router(hash);
    //         }
    //         else
    //             window.location.href = name
    //     }
    //     else
    //         window.location.href = name
    // }
    // else{
    //     libs.addSheet(['#pageloading{width:1rem;\n\
    //         position:absolute;\n\
    //         top:0;left:0;right:0;bottom:0;margin:auto;\n\
    //         .router-container{display:none;}\
    //     }','loadingcss' ])
    //     libs.node.append('body','img',{id: 'pageloading',src: '/images/loading1.gif'})
    //
    //     var _uri;
    //     if (url.params.hash){
    //         // var tmp = 'hash='+url.params.hash;
    //         var tmp = ''
    //         var href=window.location;
    //         // var len = Object.keys(url.params)
    //         // if(len.length===1){
    //         //     href = url.source.replace('?'+tmp,'').replace('?&','?')
    //         // }else{
    //         //     href = url.source.replace(tmp,'').replace('?&','?')
    //         // }
    //         url = libs.urlparse( href );
    //
    //         SA.setter('_HISTORY', url);
    //         if (!back){
    //             _uri = href+'#'+name;
    //             historyStat({uri: _uri}, null, _uri)
    //         }
    //     }
    //     else{
    //         SA.setter('_HISTORY', url);
    //         if (!back){
    //             _uri = name;
    //             historyStat({uri: _uri}, null, '#'+name)
    //         }
    //     }
    //
    //
    //     var temp = SA.getter(name)
    //     if (temp){
    //         router.cb = false;
    //         console.log('======='+name);
    //         var data = {}
    //         if (libs.getObjType(back) === 'Object')
    //             data = back
    //
    //         if (multiDom){
    //             var silbDom = document.querySelectorAll('.router-container')
    //             silbDom = libs.arg2arr(silbDom)
    //             silbDom.map(function(unit, i){
    //                 unit.style.display = 'none';
    //             })
    //             var nameDom = document.querySelector('#'+name)
    //             nameDom.style.display = 'block'
    //             $('#pageloading').remove()
    //             // $('#'+name).css({'display':'block'})
    //         }
    //         SA.setter(name, data)
    //     }
    // }
}

router.goback = function(data){
    // var history = SA.getter('_HISTORY').data;
    var history = SA.pop('_HISTORY')[1]
    if(history.hash){
        router(history.hash, data)
    }else{
        window.location.href = history.source
    }
}

router.clear = function(){
    setTimeout(function(){
        $('#pageloading').remove()
    },500)
    // var load = document.getElementById('loading')
    // libs.node.remove(load)
}

//html5
if(window.history.pushState){
    libs.addEvent(window, 'popstate', function(e){
        var val = e.state;
        if(val && val.uri ){
            router(val.uri, true);
        }else{
            router(val, true)
        }
    })
}

function historyStat(args, title, uri){
    console.log('========= history');
    console.log(args);
    console.log(title);
    console.log(uri);
    window.history.pushState(args, title, uri)
}

var route = function(name, handle){
    if(typeof SA!=='object'){
        console.log("don't set global SA variable ");
        return;
    }

    if(libs.getObjType(name)==='Object'){
        var keys = Object.keys(name);
        keys.map(function(item, i){
            route[item] = name[item];
            SA.setter(item, name[item])
        })
    }

    if(typeof name === 'string'){
        if(typeof handle === 'function')
            SA.setter(name, handle)
    }
}

route.init = function(name, handle){
    multiDom = true;
    if(typeof SA!=='object'){
        console.log("don't set global SA variable ");
        return;
    }

    if(libs.getObjType(name)==='Object'){
        var keys = Object.keys(name);
        var tmp;
        keys.map(function(item, i){
            route[item] = name[item];
            var page_instence = name[item](item)

            if (page_instence.goback || page_instence.trigger){
                if (page_instence.goback && libs.getObjType(page_instence.goback)==='Function')
                    SA.set(item, page_instence.goback, [page_instence])

                if (page_instence.trigger && libs.getObjType(page_instence.goback)==='Function')
                    SA.set(item, page_instence.trigger, [page_instence])
            }
            else
                SA.set(item, name[item])
        })
    }

    if(typeof name === 'string'){
        if(typeof handle === 'function'){
            SA.setter(name, handle)
            var tmp = SA.getter(name)
            tmp.run(item)
        }
    }
}

module.exports = {
    router: router,
    route: route
}

/*
* 每一条路由都必须匹配一个方法
* init route
* 'abc'  name: {string}
* abc   value: {function}
*/
// route({
//     'abc': abc,
//     'bcd': bcd
// });
