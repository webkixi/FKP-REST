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
      var top = box.top/zoom + (window.pageYOffset || docElem && docElem.scrollTop/zoom || body.scrollTop/zoom) - clientTop,
      left = box.left/zoom + (window.pageXOffset|| docElem && docElem.scrollLeft/zoom || body.scrollLeft/zoom) - clientLeft;

      var diff_height = box.bottom-box.top,
      diff_width = box.right - box.left,
      bottom = top + diff_height,
      right = left + diff_width;

      return {
          top: top,
          bottom: bottom,
          left: left,
          right: right,
          width: diff_width,
          height: diff_height
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


function extend(Child, Parent) {
	var F = function(){};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.uber = Parent.prototype;
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
function arg2arr(args){ return Array.prototype.slice.call(args); }

module.exports = {
  getOffset: getOffset,
  DocmentView: DocmentView,
  addEvent: addEvent,
  rmvEvent: rmvEvent,
  extend: extend,
  getObjType: getObjType,
  arg2arr: arg2arr
}
