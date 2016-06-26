// 暂时没有启用

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery')
        );
    } else {
        // Browser globals:
        factory(
            window.jQuery
        );
    }
}(function($){


    var _cache = {};

    function _grap(name, stat, value, otherobj){
        var dots = name.split('.')
        var len = dots.length;
        if (stat==='get'){
            len++
        }
        var i=0;

        function grab(dot){
            i++;
            if (!dot){
                return false
            }
            else{
                if (i<(len-1)){
                    return grab(dot[dots[i]])
                }
                else {
                    if (stat==='set')
                        dot[dots[i]] = value||''
                    if (stat==='remove')
                        delete dot[dots[i]]

                    return dot
                }
            }
        }
        if ((stat==='get'||stat==='remove')&&typeof value==='object'){
            return grab(value[dots[0]])
        }
        else{
            if (typeof otherobj==='object'){
                return grab(otherobj[dots[0]])
            }
            return grab(_cache[dots[0]])
        }
    }

    // cache
    // base.cache.get(name)
    // base.cache.get('aaa.bbb.ccc.ddd')，允许深层取值(JSON)
    // base.cache.set(name)
    // base.cache.set('aaa.bbb.ccc.ddd')，允许深层设值(JSON)
    var base = {
        dtd: $.deferred,
        /**
         * 生成唯一的ID
         * @method guid
         * @grammar Base.guid() => String
         * @grammar Base.guid( prefx ) => String
         */
        guid: (function() {
            var counter = 0;

            return function( prefix ) {
                var guid = (+new Date()).toString( 32 ),
                    i = 0;

                for ( ; i < 5; i++ ) {
                    guid += Math.floor( Math.random() * 65535 ).toString( 32 );
                }

                return (prefix || 'fkp_') + guid + (counter++).toString( 32 );
            };
        })(),
        rpl: function(tmp,data){
            if(!data) return false;
            tmp = tmp.replace(/\{\{(.*?)\}\}/gi, function($0,$1){
                if ($1.indexOf('.')>0){
                    return _grap($1,'get',data)
                }
                else{
                    if (data[$1]){
                        return data[$1]
                    }
                }
            })
            return tmp;
        },
        cache: {
            set: function(name, value){
                if (name.indexOf('.')>-1){
                    return _grap(name,'set', value)
                }
                else {
                    _cache[name] = value;
                }
            }
            , get: function(name){
                if (name.indexOf('.')>-1){
                    return _grap(name,'get')
                }
                else{
                    if (_cache[name])
                        return _cache[name]
                    else
                        return false;
                }
            }
            , remove: function(name){
                if (name.indexOf('.')>-1){
                    return _grap(name,'remove')
                }
                else {
                    if (_cache[name]){
                        delete _cache[name]
                        return true;
                    }
                    else
                    return false;
                }

            }
        },
        // mkFormNode: oprateDom.mkFormNode,
        mediator: (function() {
            var $ = window.$,
                slice = [].slice,
                separator = /\s+/,
                protos;

            // 根据条件过滤出事件handlers.
            function findHandlers( arr, name, callback, context ) {
                return $.grep( arr, function( handler ) {
                    return handler &&
                            (!name || handler.e === name) &&
                            (!callback || handler.cb === callback ||
                            handler.cb._cb === callback) &&
                            (!context || handler.ctx === context);
                });
            }

            function eachEvent( events, callback, iterator ) {
                // 不支持对象，只支持多个event用空格隔开
                $.each( (events || '').split( separator ), function( _, key ) {
                    iterator( key, callback );
                });
            }

            function triggerHanders( events, args ) {
                var stoped = false,
                    i = -1,
                    len = events.length,
                    handler;

                while ( ++i < len ) {
                    handler = events[ i ];

                    if ( handler.cb.apply( handler.ctx2, args ) === false ) {
                        stoped = true;
                        break;
                    }
                }

                return !stoped;
            }

            protos = {

                /**
                 * 绑定事件。
                 *
                 * `callback`方法在执行时，arguments将会来源于trigger的时候携带的参数。如
                 * ```javascript
                 * var obj = {};
                 *
                 * // 使得obj有事件行为
                 * Mediator.installTo( obj );
                 *
                 * obj.on( 'testa', function( arg1, arg2 ) {
                 *     console.log( arg1, arg2 ); // => 'arg1', 'arg2'
                 * });
                 *
                 * obj.trigger( 'testa', 'arg1', 'arg2' );
                 * ```
                 *
                 * 如果`callback`中，某一个方法`return false`了，则后续的其他`callback`都不会被执行到。
                 * 切会影响到`trigger`方法的返回值，为`false`。
                 *
                 * `on`还可以用来添加一个特殊事件`all`, 这样所有的事件触发都会响应到。同时此类`callback`中的arguments有一个不同处，
                 * 就是第一个参数为`type`，记录当前是什么事件在触发。此类`callback`的优先级比脚低，会再正常`callback`执行完后触发。
                 * ```javascript
                 * obj.on( 'all', function( type, arg1, arg2 ) {
                 *     console.log( type, arg1, arg2 ); // => 'testa', 'arg1', 'arg2'
                 * });
                 * ```
                 *
                 * @method on
                 * @grammar on( name, callback[, context] ) => self
                 * @param  {String}   name     事件名，支持多个事件用空格隔开
                 * @param  {Function} callback 事件处理器
                 * @param  {Object}   [context]  事件处理器的上下文。
                 * @return {self} 返回自身，方便链式
                 * @chainable
                 * @class Mediator
                 */
                on: function( name, callback, context ) {
                    var me = this,
                        set;

                    if ( !callback ) {
                        return this;
                    }

                    set = this._events || (this._events = []);

                    eachEvent( name, callback, function( name, callback ) {
                        var handler = { e: name };

                        handler.cb = callback;
                        handler.ctx = context;
                        handler.ctx2 = context || me;
                        handler.id = set.length;

                        set.push( handler );
                    });

                    return this;
                },

                /**
                 * 绑定事件，且当handler执行完后，自动解除绑定。
                 * @method once
                 * @grammar once( name, callback[, context] ) => self
                 * @param  {String}   name     事件名
                 * @param  {Function} callback 事件处理器
                 * @param  {Object}   [context]  事件处理器的上下文。
                 * @return {self} 返回自身，方便链式
                 * @chainable
                 */
                once: function( name, callback, context ) {
                    var me = this;

                    if ( !callback ) {
                        return me;
                    }

                    eachEvent( name, callback, function( name, callback ) {
                        var once = function() {
                                me.off( name, once );
                                return callback.apply( context || me, arguments );
                            };

                        once._cb = callback;
                        me.on( name, once, context );
                    });

                    return me;
                },

                /**
                 * 解除事件绑定
                 * @method off
                 * @grammar off( [name[, callback[, context] ] ] ) => self
                 * @param  {String}   [name]     事件名
                 * @param  {Function} [callback] 事件处理器
                 * @param  {Object}   [context]  事件处理器的上下文。
                 * @return {self} 返回自身，方便链式
                 * @chainable
                 */
                off: function( name, cb, ctx ) {
                    var events = this._events;

                    if ( !events ) {
                        return this;
                    }

                    if ( !name && !cb && !ctx ) {
                        this._events = [];
                        return this;
                    }

                    eachEvent( name, cb, function( name, cb ) {
                        $.each( findHandlers( events, name, cb, ctx ), function() {
                            delete events[ this.id ];
                        });
                    });

                    return this;
                },

                /**
                 * 触发事件
                 * @method trigger
                 * @grammar trigger( name[, args...] ) => self
                 * @param  {String}   type     事件名
                 * @param  {*} [...] 任意参数
                 * @return {Boolean} 如果handler中return false了，则返回false, 否则返回true
                 */
                trigger: function( type ) {
                    var args, events, allEvents;

                    if ( !this._events || !type ) {
                        return this;
                    }

                    args = slice.call( arguments, 1 );
                    events = findHandlers( this._events, type );
                    allEvents = findHandlers( this._events, 'all' );

                    return triggerHanders( events, args ) &&
                            triggerHanders( allEvents, arguments );
                }
            };

            /**
             * 中介者，它本身是个单例，但可以通过[installTo](#WebUploader:Mediator:installTo)方法，使任何对象具备事件行为。
             * 主要目的是负责模块与模块之间的合作，降低耦合度。
             *
             * @class Mediator
             */
            return $.extend({

                /**
                 * 可以通过这个接口，使任何对象具备事件功能。
                 * @method installTo
                 * @param  {Object} obj 需要具备事件行为的对象。
                 * @return {Object} 返回obj.
                 */
                installTo: function( obj ) {
                    return $.extend( obj, protos );
                }

            }, protos );
        })()
    }

    /**
     * 操作dom
     */
    function opDom(){

        /**
        * 延迟插入dom结构
        * @parent {String} 父级元素
        * @options {Json}  格式如下  for <select>:  {value: 'responserId', title: 'respName', prop:{'class':'xxx'....}}
        for <input type="text">: {value: 'responserId', title: 'respName'}
        */
        function lazyInsertDom(parent, options){
            try {
                var _lazy = {}
                var _lazy_fun = function(data){}

                // 插入option
                // 在数据结构中，如果字段类型为
                // options 结构
                // ================================
                // prop: {
                //       'class': 'form-control',
                //       'options': {
                //               first: '<option value="">全部</option>',
                //               field: {value: 'responserId', title: 'respName', prop:{'class':'xxx'}}
                //               //field: ['<option>111</option>','<option>222</option>']
                //           }
                // }
                if (options.options){
                    _lazy_fun = function(data){
                        var opts = options.options,
                        tmp_option = [];

                        if (opts.first){
                            tmp_option.push(opts.first)
                        }

                        if (opts.field){
                            var opt = opts.field;    //field: {value: 'responserId', title: 'respName', prop:{'class':'xxx'....}}
                            if (Array.isArray(opt)){
                                tmp_option = tmp_option.concat(opt)
                            }
                            else{
                                if (data && data.length){
                                    tmp_option = tmp_option.concat(mkFormNode('option')(opt, data))
                                }
                            }
                            return tmp_option
                        }
                        else{
                            throw options.name + "为select类型，必须指定prop.options.field，请检查数据结构"
                        }
                    }
                }

                var lazy = base.cache.get('LAZY')
                if (!lazy){
                    _lazy[options.name] = _lazy_fun
                    base.cache.set('LAZY', _lazy)
                }
                else {
                    lazy[options.name] = _lazy_fun
                    base.cache.set('LAZY', lazy)
                }
            } catch (e) {
                alert('lazyInsertDom: '+e)
            }
        }

        /**
        * 动态生成 form node 元素
        * @type {string}  生成什么类型的form node(input) 元素 如: text, checkbox radiobox select
        * @options (JSON) 由 Area.init分析数据结构后，传导过来
        options的结构类型  options = {name: k, value: v.value, title: v.title, api: 'xxx', type:v.type||'text', prop:{class:xxx.....}}
        将会生成 <input id=xxx name=xxx type=xxx>或者 <select ......
        * @data {JSON} 有些元素需要ajax数据来生成，比如option "<select ...  <option..."，
        option必须有数据才能产出结构

        * 结构 options = 数据结构中的prop,如下，更多请参考数据结构的说明
        普通  prop:{             <select> 的 <option> 的 prop:{
        .....                                     options: { prop: { .... }}
        }                                         }
        */
        function mkFormNode(type, opts, data){ //options = prop对于select元素的options = prop.options.prop
            try {
                var options = $.extend({}, opts)
                var input = 'text';
                var select_options;

                var input_types =
                [
                    'text','checkbox','radio','button',
                    'file','hidden','password','number',
                    'reset','submit','tel'
                ]

                // {value: 'responserId', title: 'respName', prop:{'class':'xxx'....}}
                // <option xxxx>xxxx</option>
                if (type==='option'){
                    return function(options, data){
                        // if (!options.id){
                        //     options.id = options.name;
                        // }
                        if (data){
                            var tmp_option = []
                            var ip = document.createElement('option')
                            data.map(function(item){
                                var tmp_ip;
                                if (typeof options==='string'){
                                    if (options.indexOf('{{')>-1){
                                        tmp_ip = base.rpl(options, item)
                                        tmp_ip = $(tmp_ip)[0]
                                        tmp_option.push(tmp_ip)
                                    }
                                }
                                else {
                                    tmp_ip = ip.cloneNode(true)
                                    tmp_ip.text = item[options.title]
                                    tmp_ip.setAttribute('value', item[options.value])
                                    $.each(options.prop,function(k, v){
                                        tmp_ip.setAttribute(k,v)
                                    })
                                    tmp_option.push(tmp_ip)
                                }
                            })
                            return tmp_option;
                        }
                    }
                }

                if (input_types.indexOf(type)>-1){
                    input='input'
                    options.type=type
                }
                else {
                    input = type
                }

                var ip = document.createElement(input)

                //不能让用户自定义id
                //id用于自动匹配
                //id由数据结构中的key值决定
                // if (!options.id)
                //     options.id = options.name;

                if (!options.class){
                    if (type==='text'){
                        options.class = 'form-control j-customer'
                    }
                    if (type==='select'){
                        options.class = 'form-control'
                    }
                }

                delete options.group

                //删除各个元素不要的属性
                if (type==='select'){
                    delete options.type  // select 不需要type
                    delete options.placeholder
                }


                // SELECT 的数据结构
                // ==================================
                // 参考数据结构中的注释部分

                if (type==='select'){
                    if (!options.options){
                        throw (options.name + '是select标签，请设置option')
                    }
                    else{
                        var _api;
                        select_options = $.extend({},options);
                        if (options.api){
                            lazyInsertDom(ip, select_options)
                        }
                        delete options.options;
                        delete options.api;
                        delete options.group;
                    }
                }

                //设置元素属性
                $.each(options,function(k, v){
                    ip.setAttribute(k,v)
                })

                return ip;
            }
            catch (e) {
                alert('mkFormNode: '+e)
            }
        }

        return {
            lazyInsertDom: lazyInsertDom,
            mkFormNode: mkFormNode
        }
    }

    /**
     * 分域方法集
     * 依赖 base.cache
     * init: 初始化，根据结构cache不同域的结构(json)，
           通过 base.cache.get('Area') 或者 base.cache.get('Area.search')取值

       search: 初始化后，根据 base.cache.get('Area.search')值动态创建查询表单，并插入指定id
           Area.init(struct).search(id)插入机构
     */
    function Area(){
        var _area = {}

        function register(obj){
            //注册新方法
            var whiteList =
            [
                {re: /form/, fun: _form}
            ];

            $.each(obj, function(k, v){
                whiteList.map(function(item){
                    if (item.re.test(k)){
                        _area[k] = item.fun(k, v)
                    }
                    else {
                        _area[k] = new noon(k, v)
                    }
                })
            })

            function noon(name, data){
                this.name = name;
                this.data = data
            }
        }

        // 根据数据结构生成3个部分
        // 1、挂载各个_form的实例到自身，form_info，form_search等，通过ly.area.xxx访问
        // 2、挂载各个域的数据结构到 base.cache上: Area
        // 3、挂载apilist到base.cache上： Apis
        function init(struct, apilist){
            var _zone = {};

            try {
                if (!struct){
                    throw '请传入数据结构用于初始化'
                }

                if (!struct.recordList){
                    throw '初始化数据必须包含recordList字段'
                }

                struct.recordList.map(function(item, i){
                    if (typeof item === 'object'){
                        $.each(item, function(k, v){
                            if (typeof v === 'object'){
                                var tmp;

                                if (v.use){ //['table', 'search', 'search1']
                                    v.use.map(function(unit, p){
                                        tmp = {name: k, value: v.value||'', title: v.title||'', type:v.type||'text'}

                                        if (v[unit]){
                                            //v[unit] === {String} 则表示为api字符串，用于异步调用数据
                                            //该字段在所有区域展示效果一样
                                            //取v[xxx]下的属性配置
                                            if (typeof v[unit]==='string'){
                                                tmp.api = v[unit];
                                                if (!tmp.prop){
                                                    tmp.prop = {api: v[unit]}
                                                    // tmp.prop.api = v[unit]
                                                }
                                                else {
                                                    tmp.prop.api = v[unit]
                                                }
                                            }
                                            else
                                            if
                                            //v[unit] === {Json} 在unit区域特有属性
                                            //该字段在不同区域时的配置
                                            (typeof v[unit]==='object' && !Array.isArray(v[unit])){
                                                var _obj = v[unit]

                                                if (_obj.value){
                                                    tmp.value = _obj.value;
                                                }
                                                if (_obj.templet){
                                                    tmp.templet = _obj.templet;
                                                }
                                                if (_obj.title){
                                                    tmp.title = _obj.title;
                                                }
                                                if (_obj.type){
                                                    tmp.type = _obj.type;
                                                }
                                                if (_obj.group){
                                                    tmp.group = _obj.group
                                                }

                                                // if (tmp.prop){
                                                //     alert(JSON.stringify(tmp))
                                                // }
                                                if (_obj.prop){
                                                    var tmp_prop = $.extend({},_obj.prop,tmp)
                                                    tmp.prop = tmp_prop
                                                }else {
                                                    var tmp_prop = $.extend({}, tmp)
                                                    tmp.prop = tmp_prop;
                                                }
                                                if (_obj[unit]){
                                                    tmp.api = _obj[unit];
                                                    tmp.prop.api = _obj[unit];
                                                }
                                                if (_obj.events){
                                                    tmp.events = _obj.events
                                                }
                                            }
                                        }
                                        else{

                                            if (v.group){
                                                tmp.group = v.group
                                            }
                                            if (v.templet){
                                                tmp.templet = v.templet;
                                            }

                                            // if (tmp.prop){
                                            //     delete tmp.prop
                                            // }
                                            if (v.prop){
                                                var tmp_prop = $.extend({},v.prop,tmp)
                                                tmp.prop = tmp_prop
                                            }else {
                                                var tmp_prop = $.extend({}, tmp)
                                                tmp.prop = tmp_prop;
                                            }
                                            if (v.events){
                                                tmp.events = v.events
                                            }
                                        }

                                        //抽离字段，并存储在base.cache.get('Area')中
                                        // tmp.prop.id = base.guid()
                                        tmp.prop['data-fkpid'] = base.guid()
                                        if (!_zone[unit]){
                                            _zone[unit] = [tmp]
                                        }
                                        else {
                                            _zone[unit].push(tmp)
                                        }
                                    })
                                }
                                else{
                                    throw k+' 数据结构必须指定use'
                                }
                            }
                        })
                    }
                })
                //_zone是{}不是数组
                base.cache.set('Area', _zone)

                //给Area注册新方法
                //比如search, search1, search2 分别对应不同的Area
                //有时候一个页面有多个增删改查
                register(_zone)

                //存储apilist
                if (apilist){
                    if (typeof apilist==='object' && !Array.isArray(apilist))
                    base.cache.set('Apis', JSON.stringify(apilist))
                }

                return this;

            } catch (e) {
                alert('init: '+e)
            }
        }

        function _form(name, elements){
            var oprateDom = opDom()


            function _sch(){
                this.srch;
                this.refresh_srch;
                this.name = name
                try {
                    var is_init = base.cache.get('Area')
                    if (!is_init){
                        throw '请先使用init初始化'
                    }else {
                        this.data = this.srch = elements||[];
                    }
                } catch (e) {
                    alert('_form: '+e)
                }
            }

            //
            _sch.prototype = {

                append: function(){
                    return this;
                },

                clear: function(){
                    // alert('555')
                },

                refresh: function(data){
                    // alert(data)
                    // this.data = this.srch = data
                    // data.map(function(item){
                    //     var ele = $('[data-fkpid='+item.prop['data-fkpid']+']')
                    //     ele.val(item.value)
                    // })
                    var input_types =
                    [
                        'button'
                    ]
                    var refresh_srch = []
                    var info_data = this.srch
                    info_data.map(function(item){
                        if (data[item.name]||data[item.name]===''){
                            item.value = data[item.name]
                            refresh_srch.push(item)
                        }
                        if (item.type==='button'){
                            refresh_srch.push(item)
                        }
                        //考虑到可能会有多个域操作同一个id的dom
                        //所以还是使用render的方法
                        // var ele = $('[data-fkpid='+item.prop['data-fkpid']+']')
                        // ele.val(item.value)
                    })
                    this.data = this.refresh_srch = refresh_srch;
                    this.refresh_stat = true;
                    this.render()

                },


                //生成search的dom
                render: function(id){
                    var me = this;

                    try {
                        if (me.id){
                            id = me.id;
                        }
                        else{
                            if (!id)
                                throw 'render必须指定插入的容器id'
                        }

                        //初始化html结构信息
                        this.id = id;
                        var $id = $('#'+id)
                        this.$id = $id;
                        var $parent = $id.parent();    //父级元素
                        this.$parent = $parent;

                        var node_arr = [];
                        var node_str = '';
                        var srch = this.refresh_srch||this.srch;

                        var _lazyfun = [] //如果下面的item有api属性，需要异步取数据并生成结构，将生成结构的方法暂存在这里
                        var _lazyEvents = []  //如果item有events属性，先暂存起来，插入dom后执行
                        var _wrap;

                        // 分析每一个item
                        srch.map(function(item,i){
                            //item = {name: 'xxx', group: {}, value:'', title:'',search:'', api, prop:{'data-fkpid':'yyy',class: 'xxx'......}}
                            var _node;
                            item.prop.value=item.value;

                            _node = oprateDom.mkFormNode(item.type, item.prop)
                            var label = item.title
                            ? '<label class="col-sm-2 control-label">'+item.title+'</label>\n'
                            : '';

                            // input 模板
                            _wrap = '\n\
                            '+label+'\
                            <div class="col-sm-2 m-search f-pr palcehere">\n\
                            '+_node.outerHTML+'\n\
                            </div>\n';



                            //推入数组
                            if (item.group){

                                if (typeof item.group === 'object' && !Array.isArray(item.group)){
                                    node_arr['_group_']=true;

                                    var gid = item.group.id;


                                    //由group函数返回
                                    if (item.group.single){
                                        _wrap = '<div class="form-group">\n\
                                        '+_wrap+'\n\
                                        </div>';
                                    }

                                    if (item.type==='button'||item.type==='reset'||item.type==='submit'){
                                        _wrap = '&nbsp;&nbsp;&nbsp;&nbsp;'+_node.outerHTML
                                    }

                                    if (!node_arr[gid]){
                                        if (item.type==='button'||item.type==='reset'||item.type==='submit'){
                                            if (!item.title==='none'){
                                                _wrap = '<label class="col-sm-2 control-label"></label>'+_wrap
                                            }
                                        }
                                        node_arr[gid] = {content: _wrap, group: item.group}
                                    }

                                    else{
                                        node_arr[gid].content += '\n'+_wrap
                                        node_arr[gid].group = $.extend(node_arr[gid].group, item.group)
                                        // node_arr[gid].push({content: _wrap, group: item.group})
                                    }
                                }
                            }
                            else{
                                node_arr.push(_wrap)
                            }

                            //处理异步
                            if (item.api){

                                // 取出回调方法
                                // 回调方法于 mkFormNode 方法中自动缓存到 base.cache.get('LAZY')中
                                var __ = base.cache.get('LAZY.'+item.name)

                                //缓存 api 及回调方法
                                //需要异步的字段先缓存起来
                                _lazyfun.push({name: item.name, id: item.prop.id, fkpid: item.prop['data-fkpid'], api: item.api, fun: __})
                            }

                            if (item.events){
                                _lazyEvents.push({name: item.name, id: item.prop.id, fkpid: item.prop['data-fkpid'], events: item.events})
                            }
                        })

                        //打组的元素
                        //并将打组元素插入到 $id 的parent里面
                        if (node_arr.hasOwnProperty('_group_')){
                            delete node_arr['_group_'];

                            var _tops;
                            var _bottoms;
                            var groups = Object.keys(node_arr).slice(node_arr.length);
                            groups = groups.sort()

                            var $parent = $id.parent();
                            if (me.refresh_stat){
                                $parent.html($id[0].outerHTML)
                            }
                            $parent.html('')
                            $parent.append($id)
                            groups.map(function(item){
                                // node_arr[item].content
                                // node_arr[item].group.id /group.prop
                                var gid = $id.clone();
                                gid.attr('id', '')
                                if (node_arr[item].group.prop){
                                    var _prop = node_arr[item].group.prop;
                                    $.each(_prop, function(key, val){
                                        gid.attr(key, val);
                                    })
                                }

                                // 指定了特定的插入id
                                // 有ly.group方法的第三个参数确定
                                if (node_arr[item].group.position){
                                    var idf = node_arr[item].group.position;
                                    if ($('#'+idf).length)
                                        $('#'+idf).html(node_arr[item].content)
                                }
                                else {
                                    gid.html(node_arr[item].content)
                                }

                                delete node_arr[item]


                                $parent.prepend(gid)
                                // node_arr.unshift(gid[0].outerHTML);
                            })
                            if (me.refresh_stat){
                                me.refresh_stat = false;
                                me.refresh_srch = false;
                            }
                        }

                        node_str = node_arr.join('\n');
                        $id.html(node_str)


                        //开始批次执行缓存的异步
                        //并执行回调
                        if (_lazyfun.length){
                            $.each(_lazyfun, function(iii, item){
                                var kkk = libs().req(item.api)
                                .then(item.fun)
                                .done(function(data){
                                    $('[data-fkpid='+item['fkpid']+']').append(data)
                                })
                            })
                        }

                        //同步 search域中每个字段的值到cache中
                        // var zone_search = ly.cache.get('Area.form_search')
                        var zone_search = srch;
                        zone_search.map(function(item){
                            $('[data-fkpid='+item.prop['data-fkpid']+']').change(function(e){
                                zone_search[item.name] = this.value   //挂到数组上，把数据 [].xxx = 'yyy' 用在Apis中的postdata上
                                item.value = this.value   //利用JSON对象为引用的特性
                                item.prop.value = this.value;
                            })
                        })

                        if (_lazyEvents.length){
                            $.each(_lazyEvents, function(iii, evt){
                                if (typeof evt.events!=='function'){
                                    throw '请检查数据结构中'+evt.name+'的events配置，必须为function'
                                }
                                else{
                                    evt.events()
                                }
                            })
                        }

                        //插入dom完成
                        me.trigger('rendered')

                        me.on('refresh', me.refresh)


                        return me;

                    } catch (e) {
                        alert('render: '+e)
                    }
                }
            }

            //注册on off trigger方法
            base.mediator.installTo(_sch.prototype)

            return new _sch()
        }

        /**
         * 生成 search 域
         * @id，存在的 node节点id
         */
        // search: function(){
        //     return Area._search()
        // },
        function tables(){}
        function add(){}
        function del(){}

        _area = {
            init: init
        }
        return _area;
    }


    // api列表，该列表用于异步访问数据
    // 只能被实例调用
    // this 指向 avalon define 实例
    function Apis(name, touri){
        var _apis = {}
        try {
            if (typeof name==='object' && !Array.isArray(name)){
                _apis = $.extend(_apis, name)
                base.cache.set('Apis', JSON.stringify(_apis))
            }else{
                _apis = JSON.parse(base.cache.get('Apis'))
                if (_apis && _apis[name]){
                    if (_apis[name].postdata){
                        var pd = _apis[name].postdata;
                        $.each(pd, function(k, v){
                            if (typeof v==='string'){
                                if (v.indexOf('- ')===0){
                                    v = v.replace('- ', '')
                                    _apis[name]['postdata'][k] = v;
                                }
                                else
                                if (v.indexOf('.')>-1){
                                    var _key = v.split('.')
                                    _apis[name]['postdata'][k] = base.cache.get('Area.'+v)||''
                                }
                            }
                        })
                    }
                }
            }

            // 将 json 转换为 query
            function toUri(url){
                if (_apis[url]){
                    var tmp_str='',
                        tmp_url = _apis[url].url,
                        tmp_data = _apis[url].postdata;

                    var len = Object.keys(tmp_data).length,
                        i = 0;
                    $.each(tmp_data, function(key, val){
                        if (i>=len)
                            tmp_str += key+'='+val
                        else
                            tmp_str += key+'='+val+'&'
                        i++;
                    })
                    tmp_url = tmp_url + '?' + tmp_str
                    // alert(tmp_url)
                    return tmp_url
                }
            }

            if (touri){
                if (_apis[name]){
                    return toUri(name)
                }
                else{
                    return false;
                }
            }
            else{
                if (_apis[name]){
                    return _apis[name]
                }
                else{
                    return false;
                }
            }
        } catch (e) {
            alert('Apis: '+e)
        }
    }


    //bootstrap table处理
    function _cTable(id, data){   //脱离av环境
        // var _this = this;
        try {
            $table = $('#'+id);
            if (!$table.length){
                throw '指定的元素不存在'
            }

            if (!$.fn.bootstrapTable){
                throw 'table 依赖 bootstrapTable插件'
            }

            var options = {
                recordList:[],
                url: '',
                columns: [],
                sidePagination: 'server',
                pagination: true,
                pageSize: 10,
                pageList: [5, 10, 20],
                onClickRow: function (data, $element) {},
                responseHandler: function (res) {
                    var data = {"totalCount": 0, "recordList": []}
                    if (res.code) {
                        return data;
                    }
                    if (res.hasOwnProperty('allPageTotal')){
                        if (res.pageBean && res.pageBean.recordList) {
                            var pageBean = res.pageBean
                            data.recordList = pageBean.recordList
                            data.totalCount = pageBean.totalCount
                        }
                    }else{
                        data.recordList = res.recordList
                        data.totalCount = res.totalCount
                    }

                    options.columns.map(function(item, i){
                        if (item.field.indexOf('_')===0){
                            data.recordList.map(function(it, j){
                                if (item.fun){
                                    var _it = item.fun(it)
                                    it[item.field] = _it;
                                }
                            })
                        }
                    })

                    return data;
                }
            }

            if (Array.isArray(data)){
                options.columns = data
            }
            else{
                options = $.extend({}, options, data)
            }

            this.setOptions = function(opts){
                options = $.extend({}, options, opts);
                return this;
            }
            this.sidePagination = function(spn){
                options.sidePagination = spn
                return this;
            }
            this.pagination = function(pn){
                options.pagination = pn
                return this;
            }
            this.pageSize = function(pz){
                options.pageSize = pz
                return this;
            }
            this.pageList = function(pl){
                options.pageSize = pl
                return this;
            }
            this.onClickRow = function(ocr){
                options.onClickRow = ocr
                return this;
            }
            this.responseHandler = function(rh){
                options.responseHandler = rh
                return this;
            }
            this.create = function(){
                $table.bootstrapTable(options)
                return this;
            }
        } catch (e) {
            alert('_cTable: '+e)
        }
    }


    // 曝露出来的libs方法
    // ctx 为 avalon define的实例
    function libs(ctx){
        if (!ctx){
            ctx = window
        }

        // 方法集
        // 该方法只能被实例调用
        function _libs(){
            var _this = this;
            var tmp = {
                iface: function(name, touri){
                    return Apis.call(_this, name, touri)
                },

                req: function(api, method){
                    try {
                        var _data
                        var dtd = $.Deferred(); //在函数内部，新建一个Deferred对象

                        var mtd = 'post'
                        var request = $.post;
                        if (method==='get'||method==='GET') {
                            mtd = method
                            request = $.get
                        }

                        function ccb(data){
                            if(data.code||data.code == 0){
                                util.showTip(data.message);
                                dtd.reject()
                            }
                            else{
                                dtd.resolve(data); // 改变Deferred对象的执行状态
                            }
                        }


                        var iface = tmp.iface(api)
                        if (iface){
                            request(iface.url, iface.postdata)
                            .done(ccb)
                            .error(function(xhr,status,statusText){
                                util.removeLoading();
                                util.showTip('错误状态码：'+xhr.status+"<br>时间："+xhr.getResponseHeader('Date'))
                                dtd.reject()
                            })
                        }
                        else {
                            throw '接口不存在'
                        }
                        return dtd.promise(); // 返回promise对象
                    } catch (e) {
                        alert('req: '+e)
                    }
                },

                modal: function(name){
                    var _modal = $('#'+name)
                    if (!$_modal.length)
                    return false;

                    return {
                        add: function(){},
                        modify: function(){},
                        show: function(data){
                            var $body = $(_modal).find('.modal-body');

                        }
                    }
                },

                // table: {
                //     refreshTable: tmp.refreshTable,
                //     createTabe: tmp.createTabe
                // },

                /**
                * id {string} dom id
                * api {string} Apis item name
                */
                refreshTable: function(id, api){
                    var _url = '';
                    if (api)
                    var _url = tmp.iface(api,true)

                    $('#'+id).bootstrapTable('refresh', {url: _url})
                },

                /**
                * id {string} dom id
                * data {array|json}  初始化数据，数组：初始化表头数据，json会合并_cTable 的 options
                * libs(ctx).createTabe('xxx', [])
                * libs(ctx).createTabe('xxx', {})
                */
                createTabe: function(id, data){
                    return new _cTable(id, data)
                }
            }

            return tmp;
        }

        return _libs(ctx)
    }

    function tabs(name, opts){

        function _tabs(name, opts){
            var navs;
            var boxs;
            var me = this;

            var _len = opts.length;
            var _container = $('<div class="panel panel-default f-mt10"></div>')
            var _wrap = $('<div class="panel-body clearfix"></div>')
            var _nav =  $('<ul class="nav nav-tabs"></ul>')
            var _li =   $('<li role="presentation"></li>')[0]
            var _cnt =  $('<div class="col-sm-12 f-p0 f-mt20"></div>')[0]

            var _lis = []
            var _cnts = []

            me.on('_click', function(ele, i){
                $(ele).click(function(e){
                    $(_nav).find('li').removeClass('active')
                    $(this).addClass('active')
                    _cnts.map(function(cnt, j){
                        if (!$(_cnts[j]).hasClass('f-dn')){
                            $(_cnts[j]).addClass('f-dn')
                        }
                        $(_cnts[i]).removeClass('f-dn')
                    })
                    this.index = i;
                    me.trigger('switch', this)
                })
            })

            opts.map(function(item, i){
                var tmp_li = $(_li).clone()

                tmp_li.html('<a>'+item+'</a>')
                _lis.push(tmp_li[0])

                var tmp_cnt = $(_cnt).clone()
                tmp_cnt.addClass('f-dn')
                // tmp_cnt.html(i)
                _cnts.push(tmp_cnt[0])

                if (i===0){
                    tmp_li.addClass("active")
                    tmp_cnt.removeClass('f-dn')
                }
                me.trigger('_click', tmp_li[0], i)
            })
            _nav.append(_lis)
            _wrap.append(_nav)
            _wrap.append(_cnts)
            _container.append(_wrap)

            this._cnts = _cnts;
            this._lis = _lis;

            me.trigger('switch', _lis)

            $('#'+name).append(_wrap)

            return this

        }

        _tabs.prototype = {
            append: function(idf, content){
                $(this._cnts[idf]).append(content);
                return this;
            },
            clear: function(idf){
                $(this._cnts[idf]).html('');
                return this;
            },
            html: function(idf, content){
                $(this._cnts[idf]).html(content);
                return this;
            }
        }

        base.mediator.installTo(_tabs.prototype)

        return new _tabs(name, opts);
    }


    // 用于字段打组的预设值
    // 值越大，越靠前
    // 使用方式 g[0]， g[1], .... g[9]
    // @id {Number/String/boolean} 指定分组
    //      group(1) return g[1]
    //      group('b', 1) / group('bottom',1) return a[1]
    //      group('m/middle',1) return x[1]
    //      group('t/top', 1) return g[1]
    //      group(true)     return x[5]+特殊属性  独立一行
    // @pos {Number}  指定group的位置
    // @idf {String}  指定要插入某个元素中
    function group(id, pos, idf){

        var class1 = { class: 'form-group m-search f-pr' };

        var g = ['',
            {id: 'z1', prop: class1},
            {id: 'z2', prop: class1},
            {id: 'z3', prop: class1},
            {id: 'z4', prop: class1},
            {id: 'z5', prop: class1},
            {id: 'z6', prop: class1},
            {id: 'z7', prop: class1},
            {id: 'z8', prop: class1},
            {id: 'z9', prop: class1}  //g[9]
        ]

        var x = ['',
            {id: 'x1', prop: class1},
            {id: 'x2', prop: class1},
            {id: 'x3', prop: class1},
            {id: 'x4', prop: class1},
            {id: 'x5', prop: class1},
            {id: 'x6', prop: class1},
            {id: 'x7', prop: class1},
            {id: 'x8', prop: class1},
            {id: 'x9', prop: class1}  //a[9]
        ]

        var a = ['',
            {id: 'a1', prop: class1},
            {id: 'a2', prop: class1},
            {id: 'a3', prop: class1},
            {id: 'a4', prop: class1},
            {id: 'a5', prop: class1},
            {id: 'a6', prop: class1},
            {id: 'a7', prop: class1},
            {id: 'a8', prop: class1},
            {id: 'a9', prop: class1}  //a[9]
        ]

        var rtn = g[id];

        if (typeof id==='boolean'||id==='single'){
            rtn = {
                id: 'x5',
                prop: class1,
                single: true
            }
        }
        if (id==='middle'||id==='m'){
            rtn = x[5]
            if (pos){
                rtn = x[pos]
            }
        }

        if (id==='bottom'||id==='b'){
            rtn = a[1]
            if (pos){
                rtn = a[pos]
            }
        }

        if (id==='top'||id==='t'){
            rtn = g[9]
            if (pos){
                rtn = g[pos]
            }
        }

        if (idf){
            rtn.position = idf;
        }
        return rtn;
    }

    var _ly =  {
        init: function(struct, apis){
            var area = Area().init(struct, apis);
            _ly.area = area
            return area
        },
        req: libs().req,
        apis: Apis,
        cache: base.cache,
        table: {
            createTabe: libs().createTabe,
            refreshTable: libs().refreshTable
        },
        tabs: tabs,
        group: group
    }
    return _ly
}))
// end ly
