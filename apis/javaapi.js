//var needle = require('needle');
var request = require('request');
var path = require('path');
var libs = require('../libs/libs');
var qs = require('querystring');
var config = require('../config');
var getapi = require('../pages/common/apilist')

var tmp_token_session = {}

/*  request的常规用法
request({method:'POST', url:url, body:paramStr, json:true}, function(err,response,body){
// request({method:'POST', url:url, json:param}, function(err,response,body){
// request({method:'POST', url:url+'?'+query, json:{relaxed:true}}, function(err,response,body){
// request({method:'POST', url:url+'?'+query}, function(err,response,body){
    if(err)
        throw err
    cb.call(null,body);
});
*/

// request for koa
var req = function(api,options){
    function rp(err, rep, body){   //deal with response result
        if(error)
            throw new Error("async search: no respons data");

        if (!error && response.statusCode == 200)
            return body;
    }



    return function(rp){
        var opts = {headers: {
           'Content-type': 'application/json; charset=utf-8'
        }}
        if(options && typeof options==='object'){
            if(options.fttype){
                delete options.fttype;
                opts.json = options
            }
            else{
                opts.json = options
            }
            console.log('((((((((((((((((  javaapi req  ))))))))))))))))');
            console.log(options);
            request.post(api, opts, rp);
            // request({method:'POST', url:api, json:options},rp)
            // console.log(needle);
            // request({method:'POST', url:api, json:options}, rp)

        }
        else
            request(api,rp);
    }
}
//
// // var src = "http://120.25.241.174:8080/v1/servicetype/";
// //var src = "http://192.168.4.57:8080/v1/";
// var src = "http://120.25.241.174:8080/v1/";
// var src2 = "http://120.25.241.174:8090/v2/";
//
// var apiPath = {
//     base: src,
//     dirs: {
//         wx_token: 'https://api.weixin.qq.com/cgi-bin/token',
//         wx_web_token: 'https://api.weixin.qq.com/sns/oauth2/access_token',
//
//         service: src+'servicetype/query',
//         parts: src+'parts/query',
//         queryallbrand: src+'car/queryallbrand',
//         queryseries: src+'car/queryseries',
//         querycartype: src+'car/querycartype',
//
//         carchecking: src+'servicetype/query/carchecking',
//         region: src+'region/query',
//         getmms: src+'user/getsmscode',
//         orderins: src+'order/insert',
//         orderins_v2: src2+'order/insert',
//         order_list: src+'order/query',
//         myorder_info: src+'order/info',
//         mobilecode: src+'user/login',
//         useraddcar: src+'usercar/insert',
//         order_addr: src+'addr/query',
//         order_deladdr: src+'addr/delete',
//         order_addaddr: src+'addr/insert',
//         mycarlist: src+'usercar/query',
//         mycar_del: src+'usercar/delete',
//         washcar: src+'servicetype/query/washcar',
//
//         login: src+'user/login',
//         getshoplist: src2+'dealer/query'
//
//         ,discountlist: src2+'order/query'
//     },
//
//     weixin: {
//         //oauth2方式的api会议 '_web' 方式结尾
//         userlist: 'https://api.weixin.qq.com/cgi-bin/user/get',
//         querymenu: 'https://api.weixin.qq.com/cgi-bin/menu/get',        //?access_token=ACCESS_TOKEN
//         createmenu: 'https://api.weixin.qq.com/cgi-bin/menu/create',    //?access_token=ACCESS_TOKEN
//
//         userinfo_web: 'https://api.weixin.qq.com/sns/userinfo'  //?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
//     }
// }


function *pullApiData(api, param, method){
    libs.elog('javaapi/'+ api);
    var apiPath = yield getapi.call(this)
    // console.log('============ javaapi apiPath');
    // console.log(apiPath);

    if (api.indexOf('redirect')===0){
        url = param._redirect;
        delete param._redirect
        if (param.ajaxtype){
            method = param.ajaxtype
            delete param.ajaxtype
        }
        var len = Object.keys(param)
        if (len.length===0)
            param = {test: '123'}

    }
    else {
        var url = apiPath.dirs[api];
        if( !url ){
            return false;
        }
    }

    var query;

    if(!method)
        query = qs.stringify(param);

    if(method==='post'||method==='POST')
        query = param;

    console.log('(((((((((((((((((((((((((((query)))))))))))))))))))))))))))');
    // console.log(query);

    if(libs.getObjType(param)!=='Object')
        return yield {message: 'pullApiData === 请指定正确的参数'};

    if(!method)
        return yield req(url+'?'+query);
    else
        return yield req(url, query);

}


// 获取微信的token，并session
// 微信token分为两种，一种是服务端的token, 一种是通过oauth2方式获取的token
function *getWxAccessToken(params, apii){
    // console.log(this.sess);

    var the = this;
    var date = new Date();

    var _WX = config.weixin
    if (this.sess.argv) {
        if (this.sess.argv === 'test') {
            console.log('========== test环境 menu');
            _WX = config.weixintest
        }
    }

    //normal access token
    function *getAT(){
        console.log('uuuuuuuuuu get normal access token uuuuuuu');
        var tmp = yield pullApiData('wx_token',{
            grant_type: 'client_credential',
            appid: _WX.appid,
            secret: _WX.appsecret
        })
        var tk = JSON.parse(tmp[0].body);
        console.log(tk);
        var now = date.getTime()/1000;
        var sess_wx = {
            token: tk.access_token,
            token_expire: now + tk.expires_in,
            token_renew: 7200
        }
        if(tk.access_token){
            the.sess.wx = sess_wx;
        }
    }

    //web access token
    function *getWAT(){
        console.log('uuuuuuuuuu get web access token uuuuuuu');
        var tmp = yield pullApiData('wx_web_token',{
            appid: _WX.appid,
            secret: _WX.appsecret,
            code: params.code,
            grant_type: 'authorization_code'
        })

        var tk = JSON.parse(tmp[0].body);
        console.log(tk);
        var now = date.getTime()/1000;
        var sess_wx = {
            openid: tk.openid,
            scope: tk.scope,
            refresh_token: tk.refresh_token,
            token: tk.access_token,
            token_expire: now + tk.expires_in,
            token_renew: 7200
        }
        if(tk.openid)
            the.sess.wwx = sess_wx;
    }

    var tmp;
    if(params.code){   //web access token
        yield getWAT();
        tmp = the.sess.wwx
    }else{   //normal access token
        if(apii.indexOf('_web')===-1){
            if(!the.sess.wx)
                yield getAT();   //暂时关闭

            tmp = the.sess.wx
        }else{
            if(!the.sess.wwx)
                yield getWAT();   //暂时关闭
            tmp = the.sess.wwx
        }

    }
    // console.log(tmp);
    if(tmp){
        var now = date.getTime()/1000;
        if(now-tmp.token_expire>6500){
            if( the.sess.wx)
                yield getAT()
            if( the.sess.wwx )
                yield getWAT();
        }else{
            tmp.token_renew = now-tmp.token_expire;
        }
    }
}

function *pullWxData(api, param, method){
    libs.elog('javaapi/'+ api);
    console.log('========== javaapi pullWxData');
    var apiPath = yield getapi.call(this)

    if(libs.getObjType(param)!=='Object')
        return yield {
            code: 1,
            message: 'param must be a json object'
        };

    yield getWxAccessToken.call(this, param, api);     

    if(api == 'wx_web_token'){
        return {token: true};
    }else{
        if(api.indexOf('_web')===-1){
            if(api==='token'){
                return { token: this.sess.wx.token };
            }
            console.log('append access token to weixin api');
            param.access_token = this.sess.wx.token;
        }
    }
    // console.log('weixin token after '+Math.ceil(-this.sess.wx.token_renew)+' second will renew');

    var url = apiPath.weixin[api];
    if (url.indexOf('ACCESS_TOKEN')>-1){
        url = url.replace(/ACCESS_TOKEN/, this.sess.wx.token)
        delete param.access_token
    }
    var query;

    if(!method)
        query = qs.stringify(param);

    if(method==='post'||method==='POST')
        query = param;

    console.log('(((((((((((((((((((((((((((weixin)))))))))))))))))))))))))))');
    // console.log(query);


    if(!method)
        return yield req(url+'?'+query);
    else
        return yield req(url, query);

}

module.exports = {
    apiPath: getapi(),
    pullApiData: pullApiData,
    pullWxData: pullWxData
}
