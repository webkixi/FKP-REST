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
var src = "http://120.25.223.175:5051/jh-web-portal/";

var apiPath = {
    base: src,
    dirs: {
        search: src+'api/search.html',
        loginCheck: src+'api/loginCheck.html',
        user: src+'checkUserStatus.html',
        header_nav: src+'api/navbar.html',
        index_goods: src+'api/index/goods/cat/list.html',
        index_cat: src+'api/index/info/cat/list.html',
        index_booth: src+'api/goods/booth.html',
        info_cat: src+'api/info/cat-list.html',
        info_view: src+'api/info/view.html',
        mall_list: src+'api/mall/item/list/query.html',
        mall_attr: src+'api/mall/item/list/attributes.html'
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
