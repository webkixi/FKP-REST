// var request = require('request');
var request = require('koa-request');


module.exports = {
    api: {

    },
    req：request,
    get:{
        user:  getUser,
        info:  getInfo,
        infoList:  getInfo,
        goods: getGood,
        article: getArticle
    }
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
