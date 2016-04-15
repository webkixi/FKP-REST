var lodash = require('lodash');

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

var clone =function(target){
    return lodash.clone(target);
    // var t = getObjType(target);
    // return t === 'Object' ? $extend(true, {}, target) : t === 'Array' ? $extend(true, [], target) : target;
}

function guid(prefix) {
    prefix = prefix || "web-";
    return (prefix + Math.random() + Math.random()).replace(/0\./g, "");
}

module.exports = {
    getObjType:     getObjType,     //获取对象类型
    type:           getObjType,
    arg2arr:        arg2arr,        //类数组对象转成数组
    lodash:         lodash,         //引入lodash
    guid:           guid,           //生成随机名字
    clone:          clone          //clone一个对象
}
