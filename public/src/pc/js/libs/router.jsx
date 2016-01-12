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
            router.cb = undefined;

            var _back = this._parseBack()
            // if (_back){
                var rtstat = this._parseRoute()
                if (rtstat){
                    this._injectionCss();
                    this._multiDom();
                    this._deal();
                }
            // }
        },

        _parseBack: function(){
            var back = this.back;
            if (!back) back = false;
            if (libs.getObjType(back)==='Boolean'){
                this.isBack = back;
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

        _parseRoute: function(){
            var name = this.name
            var url = this.url;

            if (router.cb && (typeof router.cb === 'function')){
                if (this.back === true){
                    // alert('2222222')
                    router.cb.call(this, this.name)
                    // router.cb.call(this, this.name)
                    return false;
                }
            }

            if ( name && (name.indexOf('/')===0 ||
                name.indexOf('http://')===0 ||
                name.indexOf('https://')===0) )
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
                    if (!this.isBack){
                        if (hash !== name){
                            _uri = href+'#'+name;
                            historyStat({uri: _uri}, '1null', _uri)
                            tmp_url = libs.urlparse(location.href);
                            this.url = tmp_url;
                            url = tmp_url
                        }
                    }
                    SA.append('_HISTORY', url);
                }
                else{
                    // SA.set('_HISTORY', url);
                    if (!this.isBack){
                        _uri = name;
                        historyStat({uri: _uri}, '2null', '#'+name)
                        tmp_url = libs.urlparse(location.href);
                        this.url = tmp_url;
                        url = tmp_url
                    }
                    SA.append('_HISTORY', url);
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
                var prev_page = SA.getter('_CURENT_PAGE')
                if (prev_page) {
                    var prev_name = prev_page.data
                    prev_page.run(intent, prev_name)
                }
                SA.set('_CURENT_PAGE', name)
                router.cb = false;
                console.log('======='+name);
                if (intent)
                    data = intent

                if (this.multiDom)
                    SA.setter(name, data)
                else
                    SA.setter(name, data)

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
window.router = router

router.goback = function(name, data){
    var url = libs.urlparse(location.href);
    if (url.params.goback) {
        if (url.params.goback.indexOf('_')>-1) {
            var tmp = url.params.goback.split('_')
            var uri = tmp[0]
            var hash = tmp[1]
            var _url = '/'+uri+'#'+hash
            router(_url)
        }
        else {
            router(url.params.goback)
        }
    }
    else{
        if (!name) {
            name = false
        }
        else
        if (libs.getObjType(name)==='Object'){
            data = name;
        }

        if (typeof name === 'string') {
            router(name)
        }
        else{
            // var history = SA.getter('_HISTORY').data;
            var _history = SA.get('_HISTORY')
            if (_history.length === 1){
                console.log('======== pophistory');
                window.history.go(-2)
            }
            else{
                var pop = SA.pop('_HISTORY')
                pop = SA.pop('_HISTORY')
                var history = pop[1]
                var pophistory = pop[0]
                if(history.hash){
                    router(history.hash, data)
                }else{
                    window.location.href = history.source
                }

                // if (!pophistory.length){
                //     console.log('======== pophistory');
                //     window.history.go(-2)
                // }
                // else{
                //     if(history.hash){
                //         router(history.hash, data)
                //     }else{
                //         window.location.href = history.source
                //     }
                // }
            }
         }

    }
}

router.clear = function(){
    setTimeout(function(){
        $('#pageloading').remove()
        // var load = document.getElementById('pageloading')
        // libs.node.remove(load)
    },500)
}

//html5
if(window.history.pushState){
    //解决方案  http://stackoverflow.com/questions/6421769/popstate-on-pages-load-in-chrome
    //android 和 iphone上页面刷新就会直接执行popstate，这是一个浏览器的bug
    //有两个解决方案，setTimeout是简单的一种
    //另外一种比较麻烦
    setTimeout(function(){
        libs.addEvent(window, 'popstate', function(e){
            if (router.cb && (typeof router.cb === 'function')) {
                router.cb()
            }
            else{
                var val = e.state;
                if(val && val.uri ){
                    router(val.uri, true);
                }
                else{
                    window.history.go(-1)
                    // router(val, true)
                }
            }
        })
    },1500)
}

function historyStat(args, title, uri){
    console.log('========= pushState history');
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

            if (page_instence.goback || page_instence.trigger || page_instence.end){
                if (page_instence.goback && libs.getObjType(page_instence.goback)==='Function'){
                    SA.set(item, page_instence.goback, [page_instence])
                }
                if (page_instence.trigger && libs.getObjType(page_instence.trigger)==='Function')
                    SA.set(item, page_instence.trigger, [page_instence])

                if (page_instence.end && libs.getObjType(page_instence.end)==='Function'){
                    page_instence.end.args = [page_instence]
                    var tmp = {}
                    tmp[item] = page_instence.end
                    SA.set('_CURENT_PAGE', 'none', tmp)
                    // SA.set(item, page_instence.end, [page_instence])
                }
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
