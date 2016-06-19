// var popped = ('state' in window.history && window.history.state !== null),
// initialURL = location.href;

(function() {
    //解决方案  http://stackoverflow.com/questions/6421769/popstate-on-pages-load-in-chrome
    //android 和 iphone上页面刷新就会直接执行popstate，这是一个浏览器的bug
    var blockPopstateEvent = document.readyState!="complete";
    window.addEventListener("load", function() {
        // The timeout ensures that popstate-events will be unblocked right
        // after the load event occured, but not in the same event-loop cycle.
        setTimeout(function(){ blockPopstateEvent = false; }, 0);
    }, false);

    window.addEventListener("popstate", function(evt) {
        if (blockPopstateEvent && document.readyState=="complete") {
            evt.preventDefault();
            evt.stopImmediatePropagation();
        }
        else{
            bindFn()
        }
    }, false);
}());


var libs = require('./libs_client')
var multiDom = false;
var allow_router_cb = false;
// alert(initialURL)

var rt = libs.Class.create();
    rt.prototype = {

        init: function(name, back){
            SA.set("_routerInstanc", this)
            SA.set('_HISTORY', []);
            SA.set('_HISTORY_DATA', []);
            this.multiDom = multiDom;
            this.intent;
            this.isBack = false;
            this.distribute(name, back)
        },

        //router专用css
        //css在global/index.less中
        _injectionCss: function(){
            // libs.node.append('body','div',{id: 'pageloading'})
        },

        distribute: function(name, back){
            SA.set('_TRUE_URL', location.href)
            this.name = name;
            this.back = back;
            this.url = libs.urlparse(location.href);
            router.cb = undefined;
            this.isBack = false;
            allow_router_cb = false;

            var _back = this._parseBack()
            var rtstat = this._parseRoute()
            if (rtstat){
                this._injectionCss();
                this._deal();
                this._multiDom();
            }
        },

        _parseBack: function(){
            this.intent = false;
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
                    router.cb.call(this, this.name)
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
                this.prev_page = prev_page
                if (prev_page) {
                    var prev_name = prev_page.data
                    prev_page.run(intent, prev_name)
                }
                SA.set('_CURENT_PAGE', name)
                router.cb = false;
                console.log('======='+name);
                if (intent)
                    data = intent

                SA.append('_HISTORY_DATA', data)

                if (this.multiDom)
                    SA.setter(name, data)
                else
                    SA.setter(name, data)

                historyStatBehavior()
            }
        },

        //多id dom 容器结构
        _multiDom: function(){
            var prev_id,
                prev_dom,
                name = this.name;

            if (name.indexOf('/')>0){
                name = name.replace('/', '_')
            }

            if (multiDom){
                if (this.prev_page){
                    if (this.prev_page.data!=='none'){
                        prev_id = this.prev_page.data
                        if (prev_id.indexOf('/')>0){
                            prev_id = prev_id.replace('/', '_')
                        }
                        prev_dom = $(document.querySelector('#'+prev_id)).parent()[0]
                        if ((prev_dom.className.indexOf('router-container-block')>-1 ||
                             prev_dom.className.indexOf('router-container-reblock')>-1) &&
                            this.isBack===true
                        ){
                            prev_dom.className = 'container-box router-container router-container-rehidden'
                        }
                        else
                            prev_dom.className = 'container-box router-container router-container-hidden'
                    }
                }

                var nameDom = $(document.querySelector('#'+name)).parent()[0]
                if (nameDom.className.indexOf('router-container-hidden')>-1 &&
                    this.isBack===true
                ){
                    nameDom.className = 'container-box router-container router-container-reblock'
                }
                else {
                    nameDom.className = 'container-box router-container router-container-block'
                }

                // var silbDom = document.querySelectorAll('.router-container')
                // silbDom = libs.arg2arr(silbDom)
                // silbDom.map(function(unit, i){
                //   unit.style.display = 'none'
                // })
                //
                // var nameDom = document.querySelector('#'+name)
                // nameDom.style.display = 'block'

                router.clear()
            }
        }
    }

function router(name, back){
    var _url = libs.urlparse(location.href);
    if (_url.params.hash){
        var _src = _url.source.replace('hash='+_url.params.hash, '').replace('?&', '?')
        history.replaceState(null,null, _src)
    }
    var instance = SA.get('_routerInstanc');
    if (instance){
        instance.distribute(name, back)
    }
    else {
        new rt(name, back)
    }
}
// window.router = router

router.pre = function(){
    var _h = SA.get('_HISTORY');
    return _h[(_h.length-2)];
}

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
                if (wx)
                    wx.closeWindow()
                else
                    window.history.go(-2)
            }
            else{
                var pop = SA.pop('_HISTORY')
                pop = SA.pop('_HISTORY')
                var history = pop[1]
                var pophistory = pop[0]
                if(history.hash){
                    // window.history.go(-2)
                    router(history.hash, data)
                }else{
                    window.location.href = history.source
                }
            }
         }

    }
}

router.clear = function(){
    var _history = SA.get('_HISTORY')
    setTimeout(function(){
        $('#pageloading').remove()
        // var load = document.getElementById('pageloading')
        // libs.node.remove(load)
    },300)
}

//
function bindFn(e){
    // var initialPop = !popped && location.href == initialURL
    // popped = true
    // if ( initialPop ) return

    if (allow_router_cb){
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
        else
        if (router.cb && (typeof router.cb === 'function')) {
            router.cb()
        }
        else{
            var _history = SA.get('_HISTORY')
            var _history_data = SA.get('_HISTORY_DATA')
            if (_history.length === 1){
                console.log('======== pophistory');
                if (wx)
                    wx.closeWindow()
                else{
                    window.history.go(-2)
                }
            }
            else{
                var pop = SA.pop('_HISTORY')
                pop = SA.pop('_HISTORY')
                var history = pop[1]
                var pophistory = pop[0]
                if(history.hash){
                    var _data = SA.pop('_HISTORY_DATA')
                    // router(history.hash, _data[0][(_data[0].length-1)])   //返回的data
                    router(history.hash, true)
                }else{
                    window.location.href = history.source
                }
            }
        }
    }
}

function historyStatBehavior(){
    initialURL = location.href;
    allow_router_cb = true;
    // bindPushState()
}

// function unbindPushState(){
//     libs.rmvEvent(window, 'popstate', bindFn)
// }
//
// function bindPushState(){
//     //html5
//     if(window.history.pushState){
//         //解决方案  http://stackoverflow.com/questions/6421769/popstate-on-pages-load-in-chrome
//         //android 和 iphone上页面刷新就会直接执行popstate，这是一个浏览器的bug
//         // libs.addEvent(window, 'popstate', bindFn)
//     }
// }

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
    // $('body').append('<div id="router-wrap" style="width:100%;position:relative;height:100%;overflow:hidden;"></div>')
    $('body').append('<div id="router-wrap" style="width:100%;position:relative;height:100%;"></div>')
    var _wrap = $('#router-wrap')[0]

    if(libs.getObjType(name)==='Object'){
        var keys = Object.keys(name);
        var tmp;
        keys.map(function(item, i){
            // route[item] = name[item];
            //插入id到body
            var _id = item;
            if (item.indexOf('/')>0){
                _id = item.replace('/', '_')
            }
            // $(_wrap).append('<div class="container-box router-container"><div id="'+_id+'" style="height:100%;"></div></div>')
            $(_wrap).append('<div class="container-box router-container"><div id="'+_id+'" style="height:100%;overflow:auto;"></div></div>')
            // libs.node.append('body', 'div', {"class": "container-box router-container", id: _id})

            var page_instence = name[item](_id)

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
                SA.set(item, name[item], [_id])
        })
    }

    if(typeof name === 'string'){
        if(typeof handle === 'function'){
            SA.setter(name, handle)
            var tmp = SA.getter(name)
            tmp.run(item)    //?
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
