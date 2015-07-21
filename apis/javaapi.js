var request = require('request');
// request for koa
var req = function(api,options){
    function rp(err, rep, body){   //deal with response result
        if(error)
            throw new Error("async search: no respons data");

        if (!error && response.statusCode == 200)
            return body;
    }

    return function(rp){
        request(api,rp);
    }
}

var path = require('path');
var libs = require('../libs/libs');
var qs = require('querystring');
// var src = "http://120.25.223.175:5051/jh-web-portal/";
var src = "http://dev-portal.dzhce.net/";

var apiPath = {
    base: src,
    dirs: {
        search: src+'api/search.html',    //搜索
        region: src+'api/region/region-list.html', //地区

        //用户中心
        loginCheck: src+'api/account/loginCheck.html',  //用户检测
        regist: src+'api/account/account-save.html',  //注册
        checkMC: src+'api/account/checkLoginPhoneAndCode.html',  //
        code: src+'api/account/send-sms-code.html',   //拿取手机验证码
        forget: src+'api/checkForgetPassword.html',  //忘记密码
        user: src+'checkUserStatus.html',   //检测用户状态
        updatePassword: src+'api/account/account-save-password.html',
        updateBaseInfo: src+'api/account/account-save-baseInfo.html',
        goods_list:src+'api/goods/list.html',//商品列表

        //公共部分
        header_nav: src+'api/navbar.html',  //头部导航栏

        //首页
        index_goods: src+'api/index/goods/cat/list.html',  //首页商品列表
        index_cat: src+'api/index/info/cat/list.html',   //首页分类
        index_booth: src+'api/goods/booth.html',  //首页广告位

        //信息页
        info_cat: src+'api/info/cat-list.html',  //信息页分类
        info_view: src+'api/info/view.html',   //信息页详情

        //商城页
        mall_item_detail: src+'api/mall/item/detail.html',  //商城详情
        mall_order_create: src+'api/mall/trade/order/create.html',//摘牌下单
        mall_order_detail: src+'api/mall/trade/order/detail.html',//确定订单
        mall_order_submit: src+'api/mall/trade/order/submit.html',//提交订单
        mall_list: src+'api/mall/item/list/query.html',  //商城列表
        mall_attr: src+'api/mall/item/list/attributes.html'  //商城筛选
    }
}



//搜索
/*
 st=0,1,2
 sc=???
 */
function *getSearch(param){
    libs.elog('javaapi/getSearch')

    var url = apiPath.dirs.search;
    var query = qs.stringify(param);

    if(libs.getObjType(param)!=='Object')
        return yield req(url);

    return yield req(url+'?'+query);
}




//用户
function *getUser(param){
    libs.elog('javaapi/getUser')

    var url = apiPath.dirs.user;
    var query = qs.stringify(param);

    if(libs.getObjType(param)!=='Object')
        return yield {};

    return yield req(url+'?'+query);
}


//商城
/*
{
    params['pageCurrent'] = pageCurrent;
    params['orderField'] = orderField;
    params['orderDirection'] = orderDirection;
    params['pageSize'] = 24;
}
 */

function *getMallList(param){
    libs.elog('javaapi/getMallList')

    var url = apiPath.dirs.mall_list;
    var query = qs.stringify(param);

    if(libs.getObjType(param)!=='Object')
        return yield {};

    return yield req(url+'?'+query);
}

function *getMallAttr(param){
    libs.elog('javaapi/getMallList')

    var url = apiPath.dirs.mall_attr;
    var query = qs.stringify(param);

    if(libs.getObjType(param)!=='Object')
        return yield {};

    return yield req(url+'?'+query);
}


function *getInfo(param){

}

function *getGood(param){

}

function *getArticle(param){

}

function *pullApiData(api,param){
    libs.elog('javaapi/'+ api);

    var url = apiPath.dirs[api];
    var query = qs.stringify(param);

    console.log('(((((((((((((((((((((((((((query)))))))))))))))))))))))))))');
    console.log(query);

    if(libs.getObjType(param)!=='Object')
        return yield {};

    return yield req(url+'?'+query);
}

module.exports = {
    req: request,
    search: getSearch,
    mallList: getMallList,
    infos: getInfo,
    goods: getGood,
    article: getArticle,
    user: getUser,
    apiPath:apiPath,
    pullApiData: pullApiData
}
