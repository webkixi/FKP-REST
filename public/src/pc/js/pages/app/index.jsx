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
    'login':require('./_component/uc/login'),               //登陆注册
    'uc/index':require('./_component/uc/index'),            //用户中心
    'uc/edit':require('./_component/uc/ucedit'),            //信息编辑
    'uc/faq':require('./_component/uc/faq'),                //常见问题
    'uc/address':require('./_component/uc/address'),        //地址
    'uc/addresslist':require('./_component/uc/addresslist'),//地址列表
    'uc/coupons':require('./_component/uc/coupons'),        //卡券列表
    'uc/coupondetail':require('./_component/uc/coupondetail'),//卡券详情
    'uc/order':require('./_component/uc/order'),            //订单
    'uc/message':require('./_component/uc/message'),        //消息中心
    'uc/messagedetail':require('./_component/uc/messagedetail'),//消息详情
    'uc/siteIntroduce':require('./_component/uc/siteIntroduce'),//网点介绍
    'uc/invitecode':require('./_component/uc/invitecode'),      //邀请码
    'uc/autolocation':require('./_component/uc/autolocation'),      //自动定位小区
    'uc/location':require('./_component/uc/location'),      //手动定位小区

});

if(url.params.hash){
    var hash = url.params.hash
    router(hash)
}else{
    if (url.hash){
        router(url.hash)
    }
    else
        router('login')   //指定默认首页
}
