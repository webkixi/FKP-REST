
function guid(prefix) {
    prefix = prefix || "fkpjs-";
    return (prefix + Math.random() + Math.random()).replace(/0\./g, "");
}




/**
 * 创建一个类，自动执行init的方法
 * var rt = Class.create();
 * rt.prototype = { //
 *     init: function(name, back){
 *         .....
 *     },
 * }
*/
var Class = {
    create: function() {
        return function() {
            if (this.init){
                this.init.apply(this, arguments);
            }
        }
    }
}

//类数组对象转换成数组
function arg2arr(s){
    try{
        return Array.prototype.slice.call(s);
    }
    catch(e){
        var arr = [];
        for(var i = 0,len = s.length; i < len; i++){
             //arr.push(s[i]);
            arr[i] = s[i];  //据说这样比push快
        }
        return arr;
    }
}

//计算字符变量的长度，包含处理中文
function strLen(str){
    return str.replace(/[^\x00-\xff]/g,"aaa").length;
}

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

        if(singleChar.match(chineseRegex) != null)
            newLength += 2;
        else
            newLength++;

        if(newLength > len)
            break;

        newStr += singleChar;
    }

    if(hasDot && strLength > len)
        newStr += "...";

    return newStr;
}


//json数据转换成query查询
//如 {x:1,y:2}    转化后 ?x=1&y=2
var json2url = function(obj){
    var url = '',
        keys = Object.keys(obj);

    if (!obj || typeof obj !== 'object') {
        return false;
    }

    keys.map (function(item,i){
        if(i===(keys.length-1)){
            url += item + '=' + obj[item];
        }
        else {
            url += item + '=' + obj[item] + '&';
        }
    })
    return url;
}

/**
 * 判断obj是什么类型的变量 Numeric / Object / Function / String ...
 */
function getObjType(object){
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
};

function preventDefault(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

module.exports = {
    guid: guid,
    class: Class,
    arg2arr: arg2arr,
    strLen: strLen,
    json2url: json2url,
    getObjType: getObjType,
    type: getObjType,
    preventDefault: preventDefault
}
