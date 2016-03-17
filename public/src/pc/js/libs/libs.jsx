// var getXHR = function () {
//     return new (window.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP") // jshint ignore:line
// }

var base = require('./_component/base')
var doc = require('./_component/doc')
var forapp = require('./_component/forapp')
var lodash = require('lodash')


/**
* form表单校验
* @opts  json对象，对象元素允许函数，用于替换默认block校验正则
* return self（function） 循环检测
*   self(val,reg,msg,name)
*   @val  需要被校验的值，如 var aaa = $('input').val();中的aaa
*   @reg  block的对象key值
*   @msg  弹出提示信息，如为空，提示默认信息
*   @name 弹出信息的名称
* SAMPLE
* var fcker = fck(chkopts)
              (user,'username',null,'昵称')
              (telephone,'mobile','')
              (comment,'notempty',null,'评论')
              (code,'verify','验证码不正确')
              ();
*/
var form_valide = function(opts) {
    var tips = function(msg){
        alert(msg);
    }

    var ckstat=true;
    var tmp;
    var old;
    var popmsg=true;   //允许弹出消息
    var block = {
        email    : /^[\.a-zA-Z0-9_=-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        username : /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
        verify   : /^[a-z\d]{4}$/i,
        verify_m : /^[\d]{6}$/,
        pwd      : /^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/,//密码
        guhua    : /^(\d{3,4})?[-]?\d{7,8}$/,//电话号码的格式
        mobile   : /^(13[0-9]{9}|15[012356789][0-9]{8}|18[01256789][0-9]{8}|147[0-9]{8})$/, //手机
        url      : /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-.\/?%&=]*)?$/, //url
        ip4      : /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/, //ip地址
        notempty : /^\S+$/, //非空
        qq       : /^[1-9]*[1-9][0-9]*$/, //QQ号码
        idcard   : /^[1-9]([0-9]{14}|[0-9]{17})$/, //身份证
        birthday : /^(\d{4})[\.-](\d{1,2})[\.-](\d{1,2})$/,
        money    : /^[\d]{1,8}(\.\d{1,2})?$/,
        all      : /[\s\S]/,
        tips     : tips,
        popmsg : true
    };
    if (opts && base.type(opts)=='Object'){
        old = $.extend({},block);
        block = $.extend(block,opts);
    }
    return function self(val,reg,msg,name) {
        var tips = block.tips;
        popmsg=block.popmsg;
        if (!val){
            if(arguments.length==0){
                return ckstat;
            }
            else{
                if(popmsg){
                    if(msg) tips(msg,'alert');
                    else if(name) tips(name+'不能为空','alert');
                    else tips(reg+'不能为空','alert');
                }
                ckstat = false;
                return function(){
                    if(arguments.length==0) return ckstat;
                    else{
                        return arguments.callee;
                    }
                };
            }
        }
        reg = reg || 'username';
        if (typeof block[reg] === 'function'){
            popmsg = false;
            var fun = block[reg];
            tmp = val=='' ? false : fun.call(this,val,old);
            if(!tmp) ckstat = false;
        }else{
            tmp = val=='' ? false : block[reg].test(val);
        }
        if(!tmp) {
            ckstat = false;
            if(popmsg){
                if(!msg){
                    if(name) tips(name+'数据不正确','alert');
                    else     tips(reg+'数据不正确','alert');
                }
                else
                    tips(msg,'alert');
            }
            return function(){
                if(arguments.length==0) return ckstat;
                else{
                    return arguments.callee;
                }
            };
        }else{
            ckstat = true;
        }
        return self;
    };
}


//间隔多久可以点击
// param1 {element}  dom element not jq element
// param2 {number}   countdown second
// param3 {function} when countdown is 0 then run callback
// example
/*
*  countDown(ele, 60, function(){})
*/
function countDown(ele, countdown, cb){
    if(!ele.nodeType)
        return false;

    var that = ele;

    // countdown 60 seconds
    var count = 61;
    $(that).addClass('block')

    if( typeof countdown === 'function'){
        cb = countdown;
    }

    if( typeof countdown === 'number'){
        count = countdown
    }

    var ttt = setInterval(function(){
        that.innerHTML = --count+'秒';

        if(count === 0){
            $(that).removeClass('block')
            clearInterval(ttt);
            that.innerHTML = '重新发送'
            cb()
        }

        if(count < 1){
            clearInterval(ttt);
        }
    }, 1000);
}



module.exports = {
    guid:           base.guid,           //生成随机名字
    Class:          base.class,
    strLen:         base.strLen,         //获取字符串长度，包含中文
    json2url:       base.json2url,       //json转成url的query部分
    grabString:     base.grabString,     //截取字符串长度，包含中文
    arg2arr:        base.arg2arr,        //类数组对象转成数组
    getObjType:     base.getObjType,     //获取对象类型
    type:           base.getObjType,     //获取对象类型

    getOffset:      doc.getOffset,      //取得元素的绝对位置
    offset:         doc.getOffset,      //取得元素的绝对位置
    DocmentView:    doc.DocmentView,    //取得当前浏览区域的宽、高
    view:           doc.DocmentView,    //取得当前浏览区域的宽、高
    node:           doc.node,           //兼容性原生 DOM操作，目前只有删除DOM
    addEvent:       doc.addEvent,       //兼容性绑定方法
    rmvEvent:       doc.rmvEvent,       //兼容性删除方法
    getElementsByClassName: doc.getElementsByClassName,

    urlparse:       doc.urlparse,       //url地址解析
    inject:         doc.inject,          // 注入css和js
    addSheet:       doc.addSheet,       //动态注入 CSS
    _IE:            doc.ie,            //输出IE版本
    queryString:    doc.queryString,
    currentStyle:   doc.currentStyle,   //获取dom属性，兼容写法
    insertCaret:    doc.insertCaret,

    isSupportFixed: forapp.isSupportFixed,
    changeTitle:    forapp.changeTitle,     //ios特有bug解决方法，改变title


    msgtips:        require('./_component/tips'),
    api:            require('./api'),            //封装jquery的ajax的post
    lodash:         lodash,         //引入lodash
    clone:          lodash.clone,          //clone一个对象

    formValide:     form_valide,    //校验基础方法
    countDown:      countDown,      //倒计时

    extend:         $.extend         //json转成url的query部分

}
