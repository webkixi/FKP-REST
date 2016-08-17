// popstate的bug，在ios上popstate首次进入就被执行了
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



var libs = require('libs/libs'),
    _multiDom = false,
    allow_router_cb = false,   // router.cb允许在业务页面指定后退的特殊地址，权限较高
    qs = require('querystring'),
    _api = require('libs/api');

//
function bindFn(e){
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
            var _history = SAX.get('_HISTORY')
            var _history_data = SAX.get('_HISTORY_DATA')
            if (_history.length === 1){
                console.log('======== pophistory');
                if (wx){
                    wx.closeWindow()
                }
                else{
                    window.history.go(-2)
                }
            }
            else{
                var pop = SAX.pop('_HISTORY')
                pop = SAX.pop('_HISTORY')
                var history = pop[1]
                var pophistory = pop[0]
                if(history.hash){
                    var _data = SAX.pop('_HISTORY_DATA')
                    // router(history.hash, _data[0][(_data[0].length-1)])   //返回的data
                    router(history.hash, true)
                }else{
                    window.location.href = history.source
                }
            }
        }
    }
}

var rt = libs.Class.create();
rt.prototype = {

    init: function(name, back){
        SAX.set("_routerInstanc", this)
        SAX.set('_HISTORY', []);
        SAX.set('_HISTORY_DATA', []);
        this.multiDom = _multiDom;
        this.intent;
        this.isBack = false;
        this.distribute(name, back)
    },

    //router专用css
    //css在global/index.less中
    _injectionCss: function(){

    },

    distribute: function(name, back){
        SAX.set('_TRUE_URL', location.href)
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
            if (libs.getObjType(back) === 'Object') this.intent = back;
            else {
                return false;
            }
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
                if (!this.isBack){
                    if (hash !== name){
                        _uri = href+'#'+name;
                        historyStat({uri: _uri}, '1null', _uri)
                        tmp_url = libs.urlparse(location.href);
                        this.url = tmp_url;
                        url = tmp_url
                    }
                }
                SAX.append('_HISTORY', url);
            }
            else{
                if (!this.isBack){
                    _uri = name;
                    historyStat({uri: _uri}, '2null', '#'+name)
                    tmp_url = libs.urlparse(location.href);
                    this.url = tmp_url;
                    url = tmp_url
                }
                SAX.append('_HISTORY', url);
            }
            return true;
        }
    },

    _deal: function(){
        var name = this.name;
        var isBack = this.isBack;
        var intent = this.intent
        var temp = SAX.getter(name)
        var data = {};
        if (temp){
            var prev_page = SAX.getter('_CURENT_PAGE')
            this.prev_page = prev_page
            if (prev_page) {
                var prev_name = prev_page.data
                prev_page.run(intent, prev_name)
            }
            SAX.set('_CURENT_PAGE', name)
            router.cb = false;
            console.log('======='+name);
            if (intent) data = intent

            SAX.append('_HISTORY_DATA', data)

            if (this.multiDom) SAX.setter(name, data)
            else {
                SAX.setter(name, data)
            }

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

        if (_multiDom){
            if (this.prev_page){
                if (this.prev_page.data!=='none'){
                    prev_id = this.prev_page.data
                    if (prev_id.indexOf('/')>0){
                        prev_id = prev_id.replace('/', '_')
                    }
                    // prev_dom = $(document.querySelector('#'+prev_id)).parent()[0]
                    prev_dom = $('#'+prev_id).parent()[0]
                    if ((prev_dom.className.indexOf('router-container-block')>-1
                        || prev_dom.className.indexOf('router-container-reblock')>-1)
                        && this.isBack===true ){
                        prev_dom.className = 'container-box router-container router-container-rehidden'
                    }
                    else{
                        prev_dom.className = 'container-box router-container router-container-hidden'
                    }
                }
            }

            var nameDom = $(document.querySelector('#'+name)).parent()[0]
            if (nameDom.className.indexOf('router-container-hidden')>-1
                && this.isBack===true ){
                nameDom.className = 'container-box router-container router-container-reblock'
            }
            else {
                nameDom.className = 'container-box router-container router-container-block'
            }
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
    var instance = SAX.get('_routerInstanc');
    if (instance){
        instance.distribute(name, back)
    }
    else {
        new rt(name, back)
    }
}

// 弹出上一步的地址，但不执行
router.pre = function(){
    var _h = SAX.get('_HISTORY');
    return _h[(_h.length-2)];
}

// router 回退一步
router.goback = function(name, data){
    setTimeout(function(){
        _goback(name, data)
    }, 0)
}

function historyStatBehavior(){
    initialURL = location.href;
    allow_router_cb = true;
}


function historyStat(args, title, uri){
    console.log('========= pushState history');
    window.history.pushState(args, title, uri)
}

function _goback(name, data){
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
            // var history = SAX.getter('_HISTORY').data;
            var _history = SAX.get('_HISTORY')
            if (_history.length === 1){
                console.log('======== pophistory');
                if (wx){
                    wx.closeWindow()
                }
                else{
                    window.history.go(-2)
                }
            }
            else{
                var pop = SAX.pop('_HISTORY')
                pop = SAX.pop('_HISTORY')
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

}



/*
 * 清除掉url中的指定params，并重写url，并不跳转url
 * 如 ?tag=xxx，清除掉tag
 * clearState('tag')
 * @tag {String} url中的query的指定key值
*/
function clearState(tag){
    var url = libs.urlparse(location.href);
    var params = url.params;
    if (params[tag]){
        var _src = url.relative.replace(tag+'='+url.params[tag], '')
        .replace('?&', '')
        .replace('?#','#')
        .replace('&&', '&')
        .replace('&#', '#')
        .replace('?', '')

        history.replaceState(null,null, _src)
        setTimeout(function(){ history.replaceState(null,null, _src) }, 0)
    }
}
router.clearState = clearState;

/*
 * 重置url中的指定params，并重写url，并不跳转url
 * 如 ?tag=xxx，重置tag的值为yyy
 * reState('tag', 'yyy')
 * @tag {String} url中的query的指定key值
 * @value {String}  key对应的值
*/
function reState(tag, value){
    var url = libs.urlparse(location.href);
    var params = url.params;
    params[tag] = value;
    var rct = qs.stringify(params)
    rct = url.relative.replace(url.path, url.path+'?'+rct)
    history.replaceState(null,null, rct)
}
router.reState = reState;





var route = function(name, handle){
    if(typeof SAX!=='object'){
        console.log("don't set global SAX variable ");
        return;
    }

    if(libs.getObjType(name)==='Object'){
        var keys = Object.keys(name);
        keys.map(function(item, i){
            SAX.setter(item, name[item])
        })
    }

    if(typeof name === 'string'){
        if(typeof handle === 'function'){
            SAX.setter(name, handle)
        }
    }
}


/*
 * 为每一个key新增一个div, id为key值
 * @name {String} div的id，允许格式 'aaa', 'aaa/bbb', 'bbb/ccc'
 * @options {Object} 引用带page类的页面

 * SAMPLE: route.init({'xxx': require('xxx')})
*/
route.init = function(name, options, cb){
    if (!window.SAX){
        console.error("SAX不存在，router依赖SAX");
        return false;
    }
    _multiDom = true;  //全局变量

    var url = libs.urlparse(location.href);
    if (url.params.reurl){
        SAX._reurl = url.params.reurl;
        clearState('reurl');
    }

    var dft = {
        container: 'body'
    }

    var opts = _.extend(dft, options);

    $(opts.container).append('<div id="router-wrap" style="width:100%;position:relative;height:100%;"></div>');
    var _wrap = $('#router-wrap')[0];

    if(libs.getObjType(name)==='Object'){
        var keys = Object.keys(name);
        var tmp={};
        keys.map(function(item, i){
            //插入id到body
            var _id = item;
            if (item.indexOf('/')>0) _id = item.replace('/', '_')
            $(_wrap).append('<div class="container-box router-container"><div id="'+_id+'" style="height:100%;overflow:auto;"></div></div>')

            var page_instence = name[item](_id)
            page_instence.router = router;
            page_instence.api = _api;

            if (page_instence.goback || page_instence.trigger || page_instence.end){
                if (page_instence.goback
                    && libs.getObjType(page_instence.goback)==='Function'){
                    SAX.set(item, page_instence.goback, [page_instence])
                }
                if (page_instence.trigger
                    && libs.getObjType(page_instence.trigger)==='Function'){
                    SAX.set(item, page_instence.trigger, [page_instence])
                }

                if (page_instence.end
                    && libs.getObjType(page_instence.end)==='Function'){
                    page_instence.end.args = [page_instence]
                    tmp[item] = page_instence.end
                    SAX.set('_CURENT_PAGE', 'none', tmp)
                    // SAX.set(item, page_instence.end, [page_instence])
                }
            }
            else{
                SAX.set(item, name[item], [_id])
            }
        })
    }
}

route.start = function(key){
    if (!key || typeof key!=='string'){
        console.error('请指定默认首页');
        return false;
    }
    var url = libs.urlparse(location.href);
    if(url.params.hash){
        var hash = url.params.hash
        clearState('hash')
        router(hash)
    }else{
        if (url.hash) router(url.hash)
        else router(key)   //跳转到默认首页
    }
}

module.exports = {
    router: router,
    route: route
}

/*
* 每一条路由都必须匹配一个方法
* init route
*/
// route({
//     'abc': abc,
//     'bcd': bcd
// });
