var api = require('./api');
var lodash = require('lodash');
var extend = require('extend');

var getOffset = function(el){
    if(!el)el=window;
    if(el===window){
      var
      top  = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
  		left = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
      height = document.documentElement.scrollHeight || document.body.scrollHeight || 0,
      width = document.documentElement.scrollWidth || document.body.scrollWidth || 0;

      return {
          top: top,
          left: left,
          width: height,
          height: width
      };
    }else{
      var parent,pbox;
			var box = el.getBoundingClientRect(),
      doc = el.ownerDocument,
      body = doc.body,
      docElem = doc.documentElement,

      // for ie
      clientTop = docElem.clientTop || body.clientTop || 0,
      clientLeft = docElem.clientLeft || body.clientLeft || 0,

      // In Internet Explorer 7 getBoundingClientRect property is treated as physical,
      // while others are logical. Make all logical, like in IE8.

      zoom = 1;

      if (body.getBoundingClientRect) {
          var bound = body.getBoundingClientRect();
          zoom = (bound.right - bound.left)/body.clientWidth;
      }
      if (zoom > 1){
          clientTop = 0;
          clientLeft = 0;
      }

			var node = el.parentNode;
            if(node.nodeName.toLowerCase()!=='body'){
    			while(CurrentStyle(node).position!=='relative'){
    					node = node.parentNode;
                        if(node.nodeName.toLowerCase()!=='body') break;
    					if(CurrentStyle(node).position==='relative'){
    							parent = node;
    							pbox = parent.getBoundingClientRect();
    							var ptop = pbox.top/zoom + (window.pageYOffset || docElem && docElem.scrollTop/zoom || body.scrollTop/zoom) - clientTop,
                                    pleft = pbox.left/zoom + (window.pageXOffset|| docElem && docElem.scrollLeft/zoom || body.scrollLeft/zoom) - clientLeft;
    							break;
    					}
    			}
            }

      var top = box.top/zoom + (window.pageYOffset || docElem && docElem.scrollTop/zoom || body.scrollTop/zoom) - clientTop,
      left = box.left/zoom + (window.pageXOffset|| docElem && docElem.scrollLeft/zoom || body.scrollLeft/zoom) - clientLeft;



			top  = parent ? top-ptop : top;
			left = parent ? left-pleft : left;

			top  = top - parseInt(CurrentStyle(el).paddingTop);
			// left = left - parseInt(CurrentStyle(el).paddingLeft);

      var diff_height = box.bottom-box.top,
      diff_width = box.right - box.left,
      bottom = top + diff_height,
      right = left + diff_width;

      return {
          top: top+'px',
          bottom: bottom+'px',
          left: left+'px',
          right: right+'px',
          width: diff_width+'px',
          height: diff_height+'px'
      };
    }
}


function DocmentView(){
    var doch = window.innerHeight||document.documentElement.offsetHeight||document.body.clientHieght;
    var docw = window.innerWidth||document.documentElement.offsetWidth||document.body.clientWidth;
    var docST = document.documentElement.scrollTop||document.body.scrollTop;
    var docSL = document.documentElement.scrollLeft||document.body.scrollLeft;
    return {width:docw,height:doch,scrollTop:docST,scrollLeft:docSL};
};


//兼容addEventListener和attachEvent
function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.attachEvent) {
        var r = elm.attachEvent('on' + evType, fn); //IE5+
        return r;
    } else {
        elm['on' + evType] = fn; //DOM 0
    }
}

//兼容removeEventListener和detachEvent
function rmvEvent(elm, evType, fn, useCapture) {
    if (elm.removeEventListener) {
        elm.removeEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.detachEvent) {
        var r = elm.detachEvent('on' + evType, fn); //IE5+
        return r;
    } else {
        elm['on' + evType] = null; //DOM 0
    }
}

/*
判断obj是什么类型的变量
Numeric
Object
Function
String
..
*/
function getObjType(object){
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
};

//类数组对象转换成数组
function arg2arr(s){
     try{
         return Array.prototype.slice.call(s);
     } catch(e){
         var arr = [];
         for(var i = 0,len = s.length; i < len; i++){
             //arr.push(s[i]);
           arr[i] = s[i];  //据说这样比push快
         }
        return arr;
     }
 }

/*
 * 动态插入style到head，并带有简单的兼容效果
 * 接入参数模式
 * 1、 addSheet(['csscode','ele_id'])
 * 2、 addSheet(element, ['csscode','ele_id'])
*/
function _inject() {
    var doc, tmpCssCode, tmpSrcCode, srcCode, cssCode, id;
    var type;

    doc = this;

    if (!doc.createElement){
        console.log('不能动态插入静态文件，请指定正确的文档');
        return false
    }

    if (arguments.length == 1) {
        tmpSrcCode = tmpCssCode = arguments[0]
    } else if (arguments.length == 2) {
        type = arguments[0];
        tmpSrcCode = tmpCssCode = arguments[1];
    } else {
        return;   // alert("addSheet函数最多接受两个参数!");
    }

    var headElement = doc.getElementsByTagName("head")[0];

    if(getObjType(tmpSrcCode)==='Array'){
        id = tmpSrcCode[1];
        srcCode = cssCode = tmpSrcCode[0];
    }

    if (!type || type==='css'){
        if(cssCode.indexOf('http')===0 || cssCode.indexOf('/')===0){
            if(document.getElementById(id))
            return;
            var tmpLink = doc.createElement('link');
            tmpLink.setAttribute("rel", 'stylesheet');
            tmpLink.setAttribute("href", cssCode);
            tmpLink.setAttribute("id", id);
            headElement.appendChild(tmpLink);
            return;
        }
        if (! +"\v1") {//增加自动转换透明度功能，用户只需输入W3C的透明样式，它会自动转换成IE的透明滤镜
            var t = cssCode.match(/opacity:(\d?\.\d+);/);
            if (t != null) {
                cssCode = cssCode.replace(t[0], "filter:alpha(opacity=" + parseFloat(t[1]) * 100 + ")")
            }
        }
        cssCode = cssCode + "\n"; //增加末尾的换行符，方便在firebug下的查看。
        var styleElements = headElement.getElementsByTagName("style");


        // if (styleElements.length == 0) {//如果不存在style元素则创建
        //     if (doc.createStyleSheet) {    //ie
        //         doc.createStyleSheet();
        //     } else {
        //         var tempStyleElement = doc.createElement('style'); //w3c
        //         tempStyleElement.setAttribute("type", "text/css");
        //         headElement.appendChild(tempStyleElement);
        //     }
        // }
        // var styleElement = styleElements[0];

        if(document.getElementById(id))
            return 'id has exist';

        var tempStyleElement = doc.createElement('style'); //w3c
        tempStyleElement.setAttribute("rel", "stylesheet");
        tempStyleElement.setAttribute("type", "text/css");
        tempStyleElement.setAttribute("id", id);
        headElement.appendChild(tempStyleElement);
        var styleElement = document.getElementById(id);

        var media = styleElement.getAttribute("media");
        if (media != null && !/screen/.test(media.toLowerCase())) {
            styleElement.setAttribute("media", "screen");
        }
        if (styleElement.styleSheet) {    //ie
            styleElement.styleSheet.cssText += cssCode;
        } else if (doc.getBoxObjectFor) {
            styleElement.innerHTML += cssCode; //火狐支持直接innerHTML添加样式表字串
        } else {
            styleElement.appendChild(doc.createTextNode(cssCode))
        }
    }
    else
    if (type==='js'){
        function createScript(id, src){
            if(document.getElementById(id))
                return 'id has exist -> libs/addSheet';

            var tmpLink = doc.createElement('script');
            tmpLink.setAttribute("type", 'text/javascript');
            tmpLink.setAttribute("id", id);
            if (src.indexOf('http')===0 || src.indexOf('/')===0){
                tmpLink.setAttribute("src", src);
                headElement.appendChild(tmpLink);
                return true;
            }
            else{
                // var scriptElement = document.getElementById(id);
                tmpLink.appendChild(doc.createTextNode(src))
                headElement.appendChild(tmpLink);
            }
        }

        if(cssCode.indexOf('http')===0 || cssCode.indexOf('/')===0){
            return createScript(id, srcCode)
        }
        else{
            srcCode = srcCode + "\n"; //增加末尾的换行符，方便在firebug下的查看。
            return createScript(id, srcCode)

        }
    }

}


// 动态注入js或者css
// window.onload后促发，不影响首屏显示
function dealInject(doc){
    if (!doc)
        doc = document

    function _initInject(type, src, cb){
        var args;
        if (!type || getObjType(type)==='Object'){
            type = 'css'
        }

        if (Array.isArray(type)){
            args = type
            type = 'css';
            if (typeof src === 'function'){
                cb = src
            }
        }

        if (Array.isArray(src)) {
            args = src
        }

        if (args){
            var did;
            //注入页面的id如果存在，且长度小于20
            if (typeof args[1]==='string' && args[1].length<20){
                var injectCode = true;
                did = args[1];
                if (cb && typeof cb==='function'){
                    if (typeof args[0]==='string' && (args[0].indexOf('http')===0 || args[0].indexOf('/')===0)){
                        injectCode = false;
                        SA.setter(did,cb);
                    }
                }
                setTimeout(function(){
                    if (type){
                        if (args){
                            _inject.call(doc, type, args)
                        }
                    }
                    else{
                        if (args){
                            _inject.call(doc, args)
                        }
                    }
                    if (injectCode && typeof cb==='function'){
                        cb()
                    }
                },17)
            }
        }
        else {
            return false;
        }

    }

    this.css = function(src, cb){
        _initInject('css', src, cb)
        return this
    }
    this.js = function(src, cb){
        _initInject('js', src, cb)
        return this
    }
}

function inject(doc){
    return new dealInject(doc)
}

function addSheet(){
    return _inject
}

var node = {
    remove: function(el){
        if(el && el.nodeType)
            if(el.removeNode)
                el.removeNode(true);
            else
                el.remove();
    },
    /*
    * 新建DOM元素
    * {container} {string} 容器  除了body, 其他容器需要指定id
    * {type} {string} 新建元素类型
    * {opts} {object} 元素参数
    */
    append: function(container, type, opts){
        var box;

        if(!container) {
            console.log('must container');
            return;
        }
        if(!type) {
            console.log('must type');
            return;
        }
        var node = document.createElement(type);
        if(opts)
            if(getObjType(opts)==='Object'){
                for(var attr in opts){
                    if(attr==='id'){
                        var tmp = document.getElementById(opts[attr])
                        if(tmp)
                            return false;
                    }
                    node[attr] = opts[attr]
                }
            }
        if(typeof container==='string'){

            if(container!=='body')
                box = document.getElementById('container')
            else
                box = document.getElementsByTagName('body')[0]
        }else
            if(container.nodeType){
                box = container
            }

        if(box)
            box.appendChild(node)
    }
}

var clone =function(target){
    return lodash.clone(target);
    // var t = getObjType(target);
    // return t === 'Object' ? $extend(true, {}, target) : t === 'Array' ? $extend(true, [], target) : target;
}

var CurrentStyle = function(element){
    // if(element.nodeName==='BODY'||element.nodeName==='HTML')
    //     return false;
    return element.currentStyle || document.defaultView.getComputedStyle(element, null);
    // return element.currentStyle || window.getComputedStyle(element, null);
}

function guid(prefix) {
    prefix = prefix || "web-";
    return (prefix + Math.random() + Math.random()).replace(/0\./g, "");
}

var tips = function(msg){
    alert(msg);
}

//创建一个类，自动执行init的方法
// var rt = Class.create();
// rt.prototype = { //
//     init: function(name, back){
//         .....
//     },
// }

var Class = {
    create: function() {
        return function() {
            if (this.init){
                this.init.apply(this, arguments);
            }
        }}
    }

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
    if(opts&&getObjType(opts)=='Object'){
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
        if(getObjType(block[reg])=='Function'){
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

//计算字符变量的长度，包含处理中文
function strLen(str){ return str.replace(/[^\x00-\xff]/g,"aaa").length;}


/* 2007-11-28 XuJian */
//截取字符串 包含中文处理
//(串,长度,增加...)
function grabString(str, len, hasDot) {
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex,"**").length;
    for(var i = 0;i < strLength;i++) {
        singleChar = str.charAt(i).toString();
        if(singleChar.match(chineseRegex) != null) newLength += 2;
        else newLength++;

        if(newLength > len) break;
        newStr += singleChar;
    }
    if(hasDot && strLength > len) newStr += "...";
    return newStr;
}

//json数据转换成query查询
//如 {x:1,y:2}    转化后 ?x=1&y=2
var json2url = function(obj){

    if(!obj) return;
    if(getObjType(obj)!=='Object') return;

    var url = '';
    var keys = Object.keys(obj);
    keys.map(function(item,i){
        if(i===(keys.length-1))
            url += item + '=' + obj[item];
        else {
            url += item + '=' + obj[item] + '&';
        }
    })
    return url;
}


function hasClass(element, className) {
    var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');
    return element.className.match(reg);
}

function addClass(element, className) {
    if (!this.hasClass(element, className)) {
        element.className += " "+className;
    }
}
function removeClass(element, className) {
    if (hasClass(element, className)) {
        var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');
        element.className = element.className.replace(reg,' ');
    }
}

/*
 * 根据元素clsssName得到元素集合
 * @param fatherId 父元素的ID，默认为document
 * @tagName 子元素的标签名
 * @className 用空格分开的className字符串
 */
 // demo getElementsByClassName(document,"div","aaa ccc")
function getElementsByClassName(fatherId,tagName,className){
	node = fatherId&&document.getElementById(fatherId) || document;
	tagName = tagName || "*";
	className = className.split(" ");
	var classNameLength = className.length;
	for(var i = 0,j=classNameLength;i< j;i++){
		//创建匹配类名的正则
		className[i]= new RegExp("(^|\\s)" + className[i].replace(/\-/g, "\\-") + "(\\s|$)");
	}
	var elements = node.getElementsByTagName(tagName);
	var result = [];
	for(var i=0, j=elements.length, k=0;i< j; i++){//缓存length属性
		var element = elements[i];
		while(className[k++].test(element.className)){//优化循环
			if(k === classNameLength){
				result[result.length] = element;
				break;
			}
		}
		k = 0;
	}
	return result;
}

//浏览器是否支持fixed
function isSupportFixed() {
    var userAgent = window.navigator.userAgent,
        ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
        ios5below = ios && ios[2] && (parseInt(ios[2].replace(/_/g, '.'), 10) < 5),
        operaMini = /Opera Mini/i.test(userAgent),
        body = document.body,
        div, isFixed;

    div = document.createElement('div');
    div.style.cssText = 'display:none;position:fixed;z-index:100;';
    body.appendChild(div);
    isFixed = window.getComputedStyle(div).position != 'fixed';
    body.removeChild(div);
    div = null;

    return !!(isFixed || ios5below || operaMini);
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

    if( getObjType(countdown)==='Function'){
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


/**
/* 2015-1-13 yc
/* url解析
/* @url   http://abc.com:8080/dir/index.html?id=255&m=hello#top
//SAMPLE
// var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
// alert(myURL.file); // = 'index.html'
// myURL.hash; // = 'top'
// myURL.host; // = 'abc.com'
// myURL.query; // = '?id=255&m=hello'
// myURL.params; // = Object = { id: 255, m: hello }
// myURL.path; // = '/dir/index.html'
// myURL.segments; // = Array = ['dir', 'index.html']
// myURL.port; // = '8080'
// myURL.protocol; // = 'http'
// myURL.source; // = 'http://abc.com:8080/dir/index.html?id=255&m=hello#top'
*/
var urlparse = function (url) {
    if(!url){
        console.log('非法参数，请重新检查！');
        return;
    }
    var anchor = document.createElement('a');
    anchor.href = url;
    return {
        source: url,
        protocol: anchor.protocol.replace(':',''),
        host: anchor.hostname,
        port: anchor.port,
        query: anchor.search,
        params: (function(){
            var ret = {},
            seg = anchor.search.replace(/^\?/,'').split('&'),
            len = seg.length, i = 0, str;
            for (; i < len; i++) {
                if (!seg[i])  continue;
                str = seg[i].split('=');
                ret[str[0]] = str[1];
            }
            return ret;
        })(),
        file: (anchor.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: anchor.hash.replace('#',''),
        path: anchor.pathname.replace(/^([^\/])/,'/$1'),
        relative: (anchor.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: anchor.pathname.replace(/^\//,'').split('/')
    }
}

//主要解决ios下无法修改title的问题
function changeTitle(title){
    var $body = $('body')
    document.title = title
    // hack在微信等webview中无法修改document.title的情况
    // var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
    //   setTimeout(function() {
    //     $iframe.off('load').remove()
    //   }, 0)
    // }).appendTo($body)

    // 防止出现404
    var $iframe = $('<iframe src="../images/blank.gif" style="display:none;"></iframe>').on('load', function() {
      setTimeout(function() {
        $iframe.off('load').remove()
      }, 0)
    }).appendTo($body)
}


var _IE = (function(){
    var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : false ;
}());

//url处理,将URL参数转换为json对象
//?code=1&title='aaa'  =>   {'code':1,'title':aa}
function queryString(){
    var arr = location.search.substring(1).split('&');
    var query = {};
    for(var i=0;i<arr.length;i++){
        var inner = arr[i].split('=');
        query[inner[0]] = inner[1];
    }
    return query;
}

module.exports = {

    getOffset:      getOffset,      //取得元素的绝对位置

    DocmentView:    DocmentView,    //取得当前浏览区域的宽、高

    addEvent:       addEvent,       //兼容性绑定方法

    rmvEvent:       rmvEvent,       //兼容性删除方法

    // extend:         extend,         //继承方法，未完成

    getObjType:     getObjType,     //获取对象类型

    arg2arr:        arg2arr,        //类数组对象转成数组

    addSheet:       addSheet,       //动态注入 CSS

    lodash:         lodash,         //引入lodash

    node:           node,           //兼容性原生 DOM操作，目前只有删除DOM

    guid:           guid,           //生成随机名字

    clone:          clone,          //clone一个对象

    formValide:     form_valide,    //校验基础方法

    urlparse:       urlparse,       //url地址解析

    strLen:         strLen,         //获取字符串长度，包含中文

    grabString:     grabString,     //截取字符串长度，包含中文

    json2url:       json2url,       //json转成url的query部分

    extend:         extend,         //json转成url的query部分

    _IE:            _IE,            //输出IE版本

    countDown:      countDown,      //倒计时

    api:            api,            //封装jquery的ajax的post

    getElementsByClassName: getElementsByClassName,

    isSupportFixed: isSupportFixed,

    Class:          Class,

    changeTitle:    changeTitle,     //ios特有bug解决方法，改变title

    queryString:    queryString,
    inject:         inject          // 注入css和js
}
