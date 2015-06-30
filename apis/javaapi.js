// var request = require('request');
var request = require('koa-request');
var path = require('path');
var libs = require('../libs/libs');

var base = 'http://120.25.223.175:5051/jh-web-portal/';

var req = function(api,options){
    function rp(err, rep, body){   //deal with response result
        if(error)
            throw new Error("async search: no respons data");

        if (!error && response.statusCode == 200)
            return body;   // console.log(body) // Show the HTML for the Google homepage.
    }
    return function(rp)
        request(api,rp);
}

module.exports = {
    req：request,
    search: getSearch,
    info: getInfo,
    goods: getGood,
    article: getArticle
}

function *getSearch(param){
    if(libs.getObjType(param)!=='Object')
        return false;
    // var uri = JSON.stringify(url);
    var searchUrl = path.join(base,'search-json.html');
    // st=1&sc=%E7%BD%91'
    var apiData = yield req(searchUrl,{st:1,sc:'%E7%BD%91'});
}


function *getUser(url){

}

function *getInfo(url){
    if(url)
        url = 'http://120.25.223.175:5051/jh-web-portal/info/json/' + url;
}

function *getGood(url){

}

function *getArticle(url){

}
