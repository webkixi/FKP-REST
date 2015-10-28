var libs = require('libs/libs')
var qs = require('querystring');
var src = "/";
var demoSrc = "http://mock.agzgz.com/";
var apiPath = {
    base: src,
    dirs: {
        service: src+'service',   //小保养
        parts: src+'parts',   //小保养
        queryallbrand: src+'queryallbrand',   //汽车品牌
        queryseries: src+'queryseries',   //汽车车系
        querycartype: src+'querycartype',   //汽车型号
        useraddcar: src+'useraddcar',   //汽车型号
        order_addr: src+'order_addr',   //汽车型号
        order_addaddr: src+'order_addaddr',   //汽车型号
        order_deladdr: src+'order_deladdr',   //汽车型号
        mycarlist: src+'mycarlist',   //汽车型号
        mycar_del: src+'mycar_del',   //汽车型号
        myorder_info: src+'myorder_info',   //订单列表
        order_list: src+'order_list'   //订单列表
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
    }
}
function req( api, param, cb ){
    var url = apiPath.dirs[api];
    if(url){
        $.post( url, param, function( body, status ){
            if( status === 'success' ) cb( body ) ;
        }, "json")
    }
}

module.exports = {
	apiPath: apiPath,
	req: req
}
