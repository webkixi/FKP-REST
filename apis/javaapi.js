var request = require('request');
var path = require('path');
var libs = require('../libs/libs');
var qs = require('querystring');

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

module.exports = {
    req: request,
    search: getSearch,
    infos: getInfo,
    goods: getGood,
    article: getArticle
}

var base = "http://120.25.223.175:5051/jh-web-portal/";

function *getSearch(param){
    libs.elog('javaapi/getSearch')
    var searchUrl = base+'search-json.html';
    if(libs.getObjType(param)!=='Object')
        return yield req(searchUrl);

    return yield req(searchUrl+'?'+qs.stringify(param));
}

function *getUser(param){

}

function *getInfo(param){

}

function *getGood(param){

}

function *getArticle(param){

}
