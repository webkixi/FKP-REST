var libs = require('libs/libs');
var router = require('libs/router').router;
var route = require('libs/router').route;
var url = libs.urlparse(location.href);
SA.set('USER', {login: false})
var api = require('libs/api');

if (url.params.login){
    SA.set('USER', {login: url.params.login})
    api.req('/userInfo', {login: url.params.login, method: 'get'}, function(data){
        SA.append('USER', {info: data})
    })
}


//添加自己的路由
route.init({
    'uc/order':require('./_component/uc/order'),            //订单
});

if(url.params.hash){
    var hash = url.params.hash
    router(hash)
}else{
    if (url.hash){
        router(url.hash)
    }
    else
        router('uc/order')   //指定默认首页
}
