// var getXHR = function () {
//     return new (window.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP") // jshint ignore:line
// }

var base = require('./_component/base')
var doc = require('./_component/doc')
var timer = require('./_component/time')
var forapp = require('./_component/forapp')

var base_tips = require('./_component/tips')


/**
* form表单校验
* form_valide be dependent SAX, SAX is a global function
  SAX like localstorage, but more. SAX.set like .setItem, .get like .getItem
  you must special @name, @name is one of SAX's param
  use SAX.get(@name), then you get the data of @name
  use SAX.set(@name, [JSON/String/Array]) will set value of @name in browse memery

* @name  {String}  special SAX name for stroe

* SAMPLE
* form_valide(name)
             @id {String}     dom element's id
             @type {String}     regular's type
             @callback  {Function}     custom function to regular your self
             (id, type, [callback])   -->   it's a function
             -----------------------------------
             ('user', 'username', [cb])    -->   it's a function
             ('telephone', 'mobile', [cb])
             ('comment', 'notempty', [cb])
             ('code', 'verify', [cb])

   @stat {Boolean}   //@stat is resault of regular.test(value)
   @block {Object}

   cb = function(stat, block){
        //this is form-element of you special id
   }

   valide('Form_bind')
         ('mobile', 'noop', function(res, old){ ... })   //res是noop的检测结果, old为默认正则的检测类型
         ('validatecode', 'verify')
         ("agreement", 'noop')
*/


function form_valide(id ,reg, cb, name) {

    var ckstat=true;
    var resault;
    var query = {
        ckstat: true
    };
    var _query = {}
    var element = {}
    var args = {}
    var old;
    var _noop = function(){};
    var block = {
        email    : /^[\.a-zA-Z0-9_=-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        username : /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
        verify   : /^[a-z\d]{4}$/i,
        verify_d : /^[\d]{4}$/i,
        verify_m : /^[\d]{6}$/,
        pwd      : /^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/,//密码
        guhua    : /^(\d{3,4})?[-]?\d{7,8}$/,//电话号码的格式
        mobile   : /^(13[0-9]{9}|15[012356789][0-9]{8}|17[012356789][0-9]{8}|18[01256789][0-9]{8}|147[0-9]{8})$/, //手机
        url      : /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-.\/?%&=]*)?$/, //url
        ip4      : /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/, //ip地址
        notempty : /^\S+$/, //非空
        qq       : /^[1-9]*[1-9][0-9]*$/, //QQ号码
        idcard   : /^[1-9]([0-9]{14}|[0-9]{17})$/, //身份证
        birthday : /^(\d{4})[\.-](\d{1,2})[\.-](\d{1,2})$/,
        money    : /^[\d]{1,8}(\.\d{1,2})?$/,
        all      : /[\s\S]/,
        tips     : function(){},
        noop     : /[\s\S]/
        // noop     : function(){return true}
    };

    // SAX.set(name, query)

    var errs = {
        "100": ['必须指定检测类型', block],
        "110": '指定id的dom对象不存在',
        "120": {msg: ''},
        "130": {msg: ''},
        "140": {msg: ''},
        "username": "用户名不正确",
        "mobile": "手机号码不正确",
        email: "邮箱地址不正确",
        verify: "验证码不正确",
        verify_m: "验证码不正确",
        pwd: "密码请匹配8位",
        url: "url地址不正确",
        ip4: "ip地址不正确",
        qq: "qq地址不正确",
    }

    old = _.cloneDeep(block);

    function _valide(id ,reg, cb, name) {
        //
        var tips = block.tips,
            formobj,
            value;

        //arguments为空
        if (!id){
            if (!arguments.length){
                return ckstat;
                // return element;
                // return query;
            }
        }

        if (typeof id === 'function'){
            var _fun = id;
            var _keys = Object.keys(args)
            var _errs = {}
            var _ckstat = true;
            _keys.map(function(item){
                var _stat = _valide.apply(null, args[item])()
                if (!_stat){
                    _ckstat = false;
                    _errs[item] = element[item]
                }
            })
            if (_ckstat){
                query.ckstat = true;
            }
            return _fun(query, _errs)
            // return ckstat
        }

        //reg
        if (!reg || !block[reg]){
            return errs['100']
        }

        //id
        if (typeof id === 'string' && $('#'+id).length){
            formobj = $('#'+id)
            value = formobj.val()
        }
        else {
            return errs['110'];
        }

        query[id] = value;
        _query[id] = false;
        element[id] = formobj;  //把表单对象塞到sa中
        args[id] = arguments

        //匹配
        function check(val){
            var resault;
            resault = val === ''
            ? false
            : typeof block[reg] === 'function'
                ? block[reg](val)
                : block[reg].test(val)
            return resault
        }
        ckstat = check(value);

        if (!ckstat){
            query.ckstat = false;
            _query[id] = false
        }
        else{
            _query[id] = true;
        }

        //返回值
        var _cb_stat;

        if (formobj){
            _old = _.cloneDeep(block);
            _old.tips = base_tips;
            _old.event = 'blur';
            formobj.off('blur')
            formobj.on('blur', function(){
                var res_cb;
                var res = check(this.value)
                if (cb && typeof cb === 'function'){
                    res_cb = cb.call(this, res, _old, errs)
                }
                if (res || res_cb){
                    query[this.id] = this.value
                    _query[this.id] = true
                    var _v = true;
                    _.forEach(_query, function(k, v){
                        if (!v){
                            _v = false;
                        }
                    })
                    if (!_v){
                        ckstat = false
                        query.ckstat = false;
                    }
                    else {
                        ckstat = true
                        query.ckstat = true;
                    }
                }
                else {
                    // SAX.set(name, false)
                    _query[this.id] = false
                    query.ckstat = false;
                    if (!cb){
                        if (!res && errs[reg])
                            tips(errs[reg])
                    }
                }
            })
        }

        if (cb && typeof cb === 'function'){
            _cb_stat = cb.call(formobj[0], ckstat, old, errs)
            if (_cb_stat){
                ckstat = true;
                if (_cb_stat === 'end'){
                    return query
                }
            }
            else {
                ckstat = false
                query.ckstat = false
            }
        }

        if (reg === 'noop'){
            return _valide
        }

        if (cb==='end'){
            // SAX.set(name, query)
            return query
        }

        if (_cb_stat || ckstat){
            return _valide;
        }
        else {
            // SAX.set(name, null)
            return _valide;
        }

    }

    return _valide
}


module.exports = {
    guid:           base.guid,           //生成随机名字
    Class:          base.class,          //创建类，并执行this.init方法
    strLen:         base.strLen,         //获取字符串长度，包含中文
    json2url:       base.json2url,       //json转成url的query部分
    grabString:     base.grabString,     //截取字符串长度，包含中文
    arg2arr:        base.arg2arr,        //类数组对象转成数组
    getObjType:     base.getObjType,     //获取对象类型
    type:           base.getObjType,     //获取对象类型
    os:             base.os,             //获取手机操作系统类型，如android或者ios

    getOffset:      doc.getOffset,      //取得元素的绝对位置
    offset:         doc.getOffset,      //取得元素的绝对位置
    DocmentView:    doc.DocmentView,    //取得当前浏览区域的宽、高
    view:           doc.DocmentView,    //取得当前浏览区域的宽、高
    scrollView:     doc.scrollView,    //取得当前浏览区域的宽、高
    node:           doc.node,           //兼容性原生 DOM操作，目前只有删除DOM
    addEvent:       doc.addEvent,       //兼容性绑定方法
    rmvEvent:       doc.rmvEvent,       //兼容性删除方法
    getElementsByClassName: doc.getElementsByClassName,
    replaceState:   doc.replaceState,   // 替换location.href并不切换页面

    inject:         doc.inject,          // 注入css和js
    addSheet:       doc.addSheet,        // 动态注入 CSS---兼容旧版语法方法
    urlparse:       doc.urlparse,        // url地址解析
    _IE:            doc.ie,              // 输出IE版本
    queryString:    doc.queryString,
    currentStyle:   doc.currentStyle,    //获取dom属性，兼容写法
    insertCaret:    doc.insertCaret,     //一般用在编辑器中的iframe插入数据
    portrait:       doc.portrait,         // 强制竖屏

    isSupportFixed: forapp.isSupportFixed,
    changeTitle:    forapp.changeTitle,     //ios特有bug解决方法，改变title

    countDown:      timer.countDown,    //倒计时
    timeAgo:        timer.timeAgo,      //时间过去了多久
    getTs:          forapp.getTs,        // "2010-03-15 10:30:00"转时间戳

    msgtips:        base_tips,

    formValide:     form_valide        //校验基础方法

}
