var libs = require('./libs')

var router = function(name){
    if(typeof name!=='string') return;
    var url = libs.urlparse(location.href);
    SA.setter('_HISTORY', url);
    var tmp = SA.getter(name)
    if(tmp){
        window.location.hash = name;
        SA.setter(name,{})
    }
}

router.goback = function(){
    var history = SA.getter('_HISTORY').data;
    if(history.hash){
        router(history.hash)
    }else{
        window.location.href = history.source
    }
}

var route = function(name, handle){
    if(typeof SA!=='object'){
        console.log("don't set global SA variable ");
        return;
    }

    if(libs.getObjType(name)==='Object'){
        var keys = Object.keys(name);
        keys.map(function(item, i){
            SA.setter(item, name[item])
        })
    }

    if(typeof name === 'string'){
        if(typeof handle === 'function')
            SA.setter(name, handle)
    }
}

module.exports = {
    router: router,
    route: route
}

/*
* 每一条路由都必须匹配一个方法
* init route
* 'abc'  name: {string}
* abc   value: {function}
*/
// route({
//     'abc': abc,
//     'bcd': bcd
// });
