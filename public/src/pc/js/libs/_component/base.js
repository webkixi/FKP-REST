var lodash = window._


// guid
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

/**
 * @description  操作系统检查结果。
 *
 * * `android`  如果在android浏览器环境下，此值为对应的android版本号，否则为`undefined`。
 * * `ios` 如果在ios浏览器环境下，此值为对应的ios版本号，否则为`undefined`。
 * @property {Object} [os]
 */
var os = (function( ua ) {
    var ret = {},

        // osx = !!ua.match( /\(Macintosh\; Intel / ),
        android = ua.match( /(?:Android);?[\s\/]+([\d.]+)?/ ),
        ios = ua.match( /(?:iPad|iPod|iPhone).*OS\s([\d_]+)/ );

    // osx && (ret.osx = true);
    android && (ret.android = parseFloat( android[ 1 ] ));
    ios && (ret.ios = parseFloat( ios[ 1 ].replace( /_/g, '.' ) ));

    return ret;
})( navigator.userAgent )


/**
 * 实现类与类之间的继承。
 * @method inherits
 * @grammar Base.inherits( super ) => child
 * @grammar Base.inherits( super, protos ) => child
 * @grammar Base.inherits( super, protos, statics ) => child
 * @param  {Class} super 父类
 * @param  {Object | Function} [protos] 子类或者对象。如果对象中包含constructor，子类将是用此属性值。
 * @param  {Function} [protos.constructor] 子类构造器，不指定的话将创建个临时的直接执行父类构造器的方法。
 * @param  {Object} [statics] 静态属性或方法。
 * @return {Class} 返回子类。
 * @example
 * function Person() {
 *     console.log( 'Super' );
 * }
 * Person.prototype.hello = function() {
 *     console.log( 'hello' );
 * };
 *
 * var Manager = Base.inherits( Person, {
 *     world: function() {
 *         console.log( 'World' );
 *     }
 * });
 *
 * // 因为没有指定构造器，父类的构造器将会执行。
 * var instance = new Manager();    // => Super
 *
 * // 继承子父类的方法
 * instance.hello();    // => hello
 * instance.world();    // => World
 *
 * // 子类的__super__属性指向父类
 * console.log( Manager.__super__ === Person );    // => true
 */
function inherits( Super, protos, staticProtos ) {
    var child;

    if ( typeof protos === 'function' ) {
        child = protos;
        protos = null;
    } else if ( protos && protos.hasOwnProperty('constructor') ) {
        child = protos.constructor;
    } else {
        child = function() {
            return Super.apply( this, arguments );
        };
    }

    // 复制静态方法
    $.extend( true, child, Super, staticProtos || {} );

    /* jshint camelcase: false */

    // 让子类的__super__属性指向父类。
    child.__super__ = Super.prototype;

    // 构建原型，添加原型方法或属性。
    // 暂时用Object.create实现。
    child.prototype = createObject( Super.prototype );
    protos && $.extend( true, child.prototype, protos );

    return child;
}

module.exports = {
    guid: guid,
    class: Class,
    arg2arr: arg2arr,
    strLen: strLen,
    json2url: json2url,
    getObjType: getObjType,
    type: getObjType,
    preventDefault: preventDefault,
    lodash: lodash,
    os: os,
    inherits: inherits
}
