var libs = require('libs/libs')
var qs = require('querystring');
var src = "/";
var demoSrc = "http://mock.agzgz.com/";
var apiPath = {
    base: src,
    dirs: {
        service: src+'service',   //小保养
        parts: src+'parts',   //小保养
        queryallbrand: src+'queryallbrand'   //汽车品牌
        // region: '/region',
        // regist: '/account/regist',
        // check_code: '/common/check_code',//校验验证码
        // user: src+'checkUserStatus.html',
        // mall_attr: '/mall/api_list_attr',
        // mall_exhibition: '/mall/list',
        // goods_attr: '/common/goods_attr',
        // submitOrder: '/mall/item_order.html',//提交订单
        // login: '/account/login',
        // forget: '/account/forget',
        // account_goods_list: '/goods/list.html',//会员中心，商品列表
        // account_order_list: '/order/list.html',//会员中心，订单列表
        // updateAccount: '/account/myaccount',
        // updateAccountBase: '/account/myaccount_base',
        // updateAccountAuth: '/account/myaccount_auth',
        // firmDetailView: '/firm/view',
        // firmDetailSave: '/firm/edit',
        // goods_edit: '/goods/edit',
        // goods_add: '/goods/add'
        ,region: src+'region'
        ,getmms: src+'getmms'
        ,getservtime: src+'getservtime'
    },
    weixin: {
        userlist: src+'wx/userlist',   //?access_token=_cqch&next_openid=
        userinfo: src+'wx/userinfo'
    }
}

function req( api, param, cb ){
    var url = apiPath.dirs[api];
    if(url){
        if(libs.getObjType(param)==='Object'){
            var keys = Object.keys(param)
            if(keys.length>0){
                $.post( url, param, function( body, status ){
                    if( status === 'success' ) cb( body ) ;
                }, "json")
            }else{
                $.post( url, {test: '123'}, function( body, status ){
                    if( status === 'success' ) cb( body ) ;
                }, "json")
            }
        }else{
            if(libs.getObjType(param)==='Function'){
                cb = param;
            }
            $.post( url, {test: '123'}, function( body, status ){
                if( status === 'success' ) cb( body ) ;
            }, "json")
        }
    }
}

function wx( api, param, cb ){
    var url = apiPath.weixin[api];
    if(url){
        $.post( url, param, function( body, status ){
            if( status === 'success' ) cb( body ) ;
        }, "json")
    }
}

module.exports = {
	apiPath: apiPath,
	req: req,
    wx: wx
}
