//document的相关方法
var base = require('./base')


var currentStyle = function(element){
    return element.currentStyle || document.defaultView.getComputedStyle(element, null);
    // return element.currentStyle || window.getComputedStyle(element, null);
}

//获取元素的实际absolute位置
//上下左右
function getOffset(el){
    if (!el) el=window
    if(el===window){
        return DocmentView()
    }
    else{
        if (el===window||el===document)
            return;

        var parent,pbox,
        	box = el.getBoundingClientRect(),
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
        	while(currentStyle(node).position!=='relative'){
        			node = node.parentNode;
                    if(node.nodeName.toLowerCase()!=='body') break;
        			if(currentStyle(node).position==='relative'){
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

        top  = top - parseInt(currentStyle(el).paddingTop);
        // left = left - parseInt(currentStyle(el).paddingLeft);

        var diff_height = box.bottom-box.top,
            diff_width = box.right - box.left,
            bottom = top + diff_height,
            right = left + diff_width;

        return {
            top: top,
            left: left,
            width: diff_width,
            height: diff_height,
            bottom: bottom,
            right: right
        };
    }
}

function scrollView(ele){
    if (!ele) ele = window;
    if (ele===window){
        var top  = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            left = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
            height = document.documentElement.scrollHeight || document.body.scrollHeight || 0,
            width = document.documentElement.scrollWidth || document.body.scrollWidth || 0;
        return {
            top: top,
            left: left,
            width: width,
            height: height
        }
    }
    else{
        var _ele = typeof ele==='string'
            ? document.getElementById(ele)
            : ele.nodeType
                ? ele
                : false
        if (!_ele){
            console.log('scrollView 请指定id');
            return false
        }
        return {
            top: _ele.scrollTop,
            left: _ele.scrollleft,
            width: _ele.scrollWidth,
            height: _ele.scrollHeight
        }
    }
}
//获取当前窗口的宽高及scrollheight及scrollleft
//兼容写法
function DocmentView(){
        var doch = window.innerHeight||document.documentElement.offsetHeight||document.body.clientHieght,
            docw = window.innerWidth||document.documentElement.offsetWidth||document.body.clientWidth,
            docST = document.documentElement.scrollTop||document.body.scrollTop,
            docSL = document.documentElement.scrollLeft||document.body.scrollLeft;

        return {top:docST,left:docSL,width:docw,height:doch,scrollTop:docST,scrollLeft:docSL};
};

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
            if(base.type(opts)==='Object'){
                for(var attr in opts){
                    if(attr==='id'){
                        var tmp = document.getElementById(opts[attr])
                        if(tmp)
                            return false;
                    }
                    node.setAttribute(attr, opts[attr]);
                    // node[attr] = opts[attr]
                }
            }
        if(typeof container==='string'){

            if(container!=='body')
                box = document.getElementById(container)
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

//url处理,将URL参数转换为json对象
//?code=1&title='aaa'  =>   {'code':1,'title':aa}
function queryString(url){
  var _search = '';
  if (url){
    _search = urlparse(url).query;
  }
  else {
    _search = location.search;
  }
  var arr = _search.substring(1).split('&');
  var query = {};
  for(var i=0;i<arr.length;i++){
      var inner = arr[i].split('=');
      query[inner[0]] = inner[1];
  }
  return query;
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
    if (!className){
        return false;
    }
    if (className.indexOf(' ')>0){
        className = className.split(" ");
    }
    else {
        className = [className]
    }
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


//兼容addEventListener和attachEvent
function addEvent(elm, evType, fn, useCapture) {
    if (!elm || typeof elm==='string'){
        console.log('addEvent elm 参数错误');
        return false
    }
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
 * 动态插入style到head，并带有简单的兼容效果
 * 接入参数模式
 * 1、 addSheet(['csscode','ele_id'])
 * 2、 addSheet(element, ['csscode','ele_id'])
*/
function _inject() {
    var doc, tmpCssCode, tmpSrcCode, srcCode, cssCode, id;
    var type, _cb;

    doc = this;

    if (!doc.createElement){
        console.log('不能动态插入静态文件，请指定正确的文档');
        return false
    }

    if (arguments.length === 1) {
        tmpSrcCode = tmpCssCode = arguments[0]
    }
    else
    if (arguments.length === 2) {
        type = arguments[0];
        tmpSrcCode = tmpCssCode = arguments[1];
    }
    else
    if (arguments.length === 3){
        type = arguments[0];
        tmpSrcCode = tmpCssCode = arguments[1];
        _cb  = arguments[2]
    }
    else {
        return;  // alert("addSheet函数最多接受3个参数!");
    }

    var headElement = doc.getElementsByTagName("head")[0];

    if(Array.isArray(tmpSrcCode)){
        id = tmpSrcCode[1];
        srcCode = cssCode = tmpSrcCode[0];
    }

    if (!type || type==='css'){
        // css referer
        if(cssCode.indexOf('http')===0 || cssCode.indexOf('/')===0){
            if(document.getElementById(id)) return;
            var tmpLink = doc.createElement('link');
                tmpLink.setAttribute("rel", 'stylesheet');
                tmpLink.setAttribute("href", cssCode);
                tmpLink.setAttribute("id", id);
                headElement.appendChild(tmpLink);
            return;
        }

        // css source
        if (! +"\v1") {//增加自动转换透明度功能，用户只需输入W3C的透明样式，它会自动转换成IE的透明滤镜
            var t = cssCode.match(/opacity:(\d?\.\d+);/);
            if (t != null) {
                cssCode = cssCode.replace(t[0], "filter:alpha(opacity=" + parseFloat(t[1]) * 100 + ")")
            }
        }
        cssCode = cssCode + "\n"; //增加末尾的换行符，方便在firebug下的查看。
        var styleElements = headElement.getElementsByTagName("style");

        if(document.getElementById(id)) return;
        else {
          var tempStyleElement = doc.createElement('style'); //w3c
              tempStyleElement.setAttribute("rel", "stylesheet");
              tempStyleElement.setAttribute("type", "text/css");
              tempStyleElement.setAttribute("id", id);
              headElement.appendChild(tempStyleElement);

          var styleElement = tempStyleElement;
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
    }
    else
    if (type==='js'){
        function createScript(id, src){
            if(document.getElementById(id)){
                if (_cb && typeof _cb==='function'){
                    _cb()
                }
                console.log('id has exist -> libs/addSheet');
                return;
            }

            var scripter = document.createElement('script');
            scripter.onload = scripter.onreadystatechange = function(){
              if( ! this.readyState || this.readyState=='loaded' || this.readyState=='complete' ){
                SAX.setter(id, 'finish');
              }
            }

            scripter.setAttribute("type", 'text/javascript');
            scripter.setAttribute("id", id);
            if (src.indexOf('http')===0 || src.indexOf('/')===0){
                scripter.setAttribute("src", src);
                headElement.appendChild(scripter);
            }
            else{
                // var scriptElement = document.getElementById(id);
                scripter.appendChild(document.createTextNode(src))
                headElement.appendChild(scripter);
            }
            return true;
        }

        if(srcCode.indexOf('http')===0 || srcCode.indexOf('/')===0){
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
    if (!doc) doc = document;
    var that = this;

    function _initInject(type, src, cb){
        var args,
            _thirdPartJs = SAX.get('thirdPartJs')||{};

        if (!type || (typeof type==='object' && !type.concat)){
            type = 'css'
        }

        if (Array.isArray(type)){
            args = type;
            type = 'css';
            if (typeof src === 'function') cb = src;
        }

        if (Array.isArray(src)) args = src

        if (args){
            var did = args[1]||urlparse(args[0]).file
            if (args.length===1) args.push(did)

            if (type==='js'){
              if (_thirdPartJs[did] === 'finish'){
                if (that._config.reload){
                  var _child = document.getElementById(did);
                      _child.parentNode.removeChild(_child);
                  delete _thirdPartJs[did];
                }
                else {
                  if (typeof cb==='function') cb();
                  return true;
                }
              }

              // 注入js文件
              _thirdPartJs[did] = 'loadding';
              SAX.append('thirdPartJs', _thirdPartJs);

              if (typeof args[0]==='string' && ( args[0].indexOf('http')===0 || args[0].indexOf('/')===0)){
                  SAX.set(did, null, [function(){
                    var _tmp = {};
                    _tmp[did] = 'finish'
                    SAX.append('thirdPartJs', _tmp);
                    SAX.deleter(did)
                  }, (cb||function(){})])
              }
            }
            // load之后执行
            setTimeout(function(){
                if (type){
                    if (args){
                        _inject.call(doc, type, args, cb)
                    }
                    if (type === 'css'){
                        if (typeof cb==='function') cb()
                    }
                }
                else{
                    if (args){
                        _inject.call(doc, args)
                    }
                }
            },17)
        }
        else {
            return false;
        }

    }

    this._config = {
      reload: false   //重新注入文件
    }

    this.css = function(src, cb){
        _initInject('css', src, cb)
        return this
    }

    this.js = function(src, opts, cb){
      if (typeof opts==='function'){
        cb = opts;
      }

      if (opts && opts.reload){
        this._config.reload = opts.reload
      }

      _initInject('js', src, cb)
      return this
    }
}

// libs.inject()
// .js(['/js/t/epic/js/epiceditor.js', 'epic'], initEpicEditor)
// .css(['/css/t/simplemde.css', 'simplemdecss'])
function inject(doc){
    return new dealInject(doc)
}

function addSheet(){
    return _inject
}


var _IE = (function(){
    var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : false ;
}());


//获取clipboard数据
function getClipboardText(event) {
    event = event||window.event
    var clipboardData = (event.clipboardData || window.clipboardData);
    return clipboardData.getData("text");
}

function setClipboardText(event, value) {
    event = event||window.event
    if (event.clipboardData) {
        return event.clipboardData.setData("text/plain", value);
    }
    else
    if (window.clipboardData) {
        return window.clipboardData.setData("text", value);
    }
}

/**
 * 插入文本到光标出
 * @win {window} 页面的window对象，或者iframe.contentWindow对象
 * @html {String} 插入的文本
 */
function insertHtmlAtCaret(win,html) {
    var sel, range;
    var doc = win.document

    if (win.getSelection) {
        // IE9 and non-IE
        sel = win.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = doc.createElement("div");
            el.innerHTML = html;
            var frag = doc.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }
    else
    if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}

// 更换location.href，仅仅只是更换
function replaceState(tag){
    var url = urlparse(location.href);
    var params = url.params;
    if (params[tag]){
        var _src = url.relative.replace(tag+'='+url.params[tag], '').replace('?&', '?').replace('?#','#').replace('&&', '&').replace('&#', '#')
        history.replaceState(null,null, _src)
        setTimeout(function(){ history.replaceState(null,null, _src) }, 0)
    }
}

// 强制竖屏，手机
function portrait(fz, cb){
    if (!fz){
        fz = '100px';
    }
    window.addEventListener('orientationchange', function(event){
        var _w = $('html').width(),
            _h = $('html').height()

        if ( window.orientation == 180 || window.orientation==0 ) {
            $('html').removeClass('roater90').removeClass('roate90')
            $('html')[0].cssText = '';
        }
        if( window.orientation == 90 || window.orientation == -90 ) {

            $('html').removeClass('roater90').removeClass('roate90')
            if ( window.orientation == 90){
                $('html').addClass('roater90')
            }
            if (window.orientation == -90){
                $('html').addClass('roate90')
            }
            $('html').css({'width':_h, 'fontSize': fz})

            if (cb && typeof cb === 'function'){
                cb()
            }
        }
    });
}


module.exports = {
    DocmentView: DocmentView,
    scrollView: scrollView,
    getOffset: getOffset,
    node: node,
    queryString: queryString,
    getElementsByClassName: getElementsByClassName,
    urlparse: urlparse,
    addEvent: addEvent,
    rmvEvent: rmvEvent,
    addSheet: addSheet,
    inject: inject,
    ie: _IE,
    getClipboardText: getClipboardText,
    setClipboardText: setClipboardText,
    currentStyle: currentStyle,
    insertCaret: insertHtmlAtCaret,
    replaceState: replaceState,
    portrait: portrait
}
