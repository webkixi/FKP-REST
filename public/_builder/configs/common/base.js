var _ = lodash
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

//计算字符变量的长度，包含处理中文
/**
 * [strLen 计算字符变量的长度，包含处理中文]
 * @param  {String}  str    [串]
 * @return {String}         [mix字串的长度]
 */

function strLen(str){
    return str.replace(/[^\x00-\xff]/g,"aaa").length;
}


/**
 * [grabString 截取字符串 包含中文处理]
 * @param  {String}  str    [串]
 * @param  {Number}  len    [截取长度]
 * @param  {Boolean} hasDot [是否需要省略号]
 * @return {String}         [返回字串]
 */
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
    _.extend( {}, child, Super, staticProtos || {} );

    /* jshint camelcase: false */

    // 让子类的__super__属性指向父类。
    child.__super__ = Super.prototype;

    // 构建原型，添加原型方法或属性。
    // 暂时用Object.create实现。
    child.prototype = _.cloneDeep( Super.prototype );
    protos && _.extend( {}, child.prototype, protos );

    return child;
}

module.exports = {
  class: Class,
  inherits: inherits
}
