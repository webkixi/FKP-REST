var request = require('request');
var path = require('path');
var libs = require('../libs/libs');
var qs = require('querystring');
var config = require('../config');

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
            // console.log(options);
            request.post(api, opts, rp);

        }
        else
            request(api,rp);
    }
}

// var src = "http://120.25.241.174:8080/v1/servicetype/";
//var src = "http://192.168.4.57:8080/v1/";
var src = "http://120.25.241.174:8080/v1/";

var apiPath = {
    base: src,
    dirs: {
        wx_token: 'https://api.weixin.qq.com/cgi-bin/token',
        wx_web_token: 'https://api.weixin.qq.com/sns/oauth2/access_token',

        service: src+'servicetype/query',
        parts: src+'parts/query',
        queryallbrand: src+'car/queryallbrand',
        queryseries: src+'car/queryseries',
        querycartype: src+'car/querycartype',

        region: src+'region/query',
        getmms: src+'user/getsmscode',
        orderins: src+'order/insert',
        mobilecode: src+'user/login',
        useraddcar: src+'usercar/insert'

        // search: src+'api/search.html',    //搜索
        // region: src+'api/region/region-list.html', //地区
        //
        // //用户中心
        // loginCheck: src+'api/account/loginCheck.html',  //用户检测
        // accountDetail: src+'api/account/detail.html',  //通过账号查找用户信息
        // get_account_info: src+'api/account/account-center.html',  //用户信息
        // regist: src+'api/account/account-save.html',  //注册
        // checkMC: src+'api/account/checkLoginPhoneAndCode.html',  //校验验证码
        // code: src+'api/account/send-sms-code.html',   //拿取手机验证码
        // //forget: src+'api/checkForgetPassword.html',  //忘记密码
        // user: src+'checkUserStatus.html',   //检测用户状态
        // updatePassword: src+'api/account/account-save-password.html',  //更新用户密码false 忘记密码true
        // updateBaseInfo: src+'api/account/account-save-baseInfo.html',  //更新用户基本信息
        // uploadPictureAuth: src+'api/account/account-picture-auth.html',  //更新用户认证图片
    },
    weixin: {
        userlist: 'https://api.weixin.qq.com/cgi-bin/user/get',
        userinfo_web: ''
    }
}


function *pullApiData(api, param, method){
    libs.elog('javaapi/'+ api);

    var url = apiPath.dirs[api];
    var query;

    if(!method)
        query = qs.stringify(param);

    if(method==='post'||method==='POST')
        query = param;

    console.log('(((((((((((((((((((((((((((query)))))))))))))))))))))))))))');
    console.log(query);

    if(libs.getObjType(param)!=='Object')
        return yield {};

    if(!method)
        return yield req(url+'?'+query);
    else
        return yield req(url, query);

}

function *getWxAccessToken(params){

    var the = this;
    var date = new Date();

    // ?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
    // {
    //     appid: config.weixin.appid,
    //     secret: config.weixin.appsecret,
    //     grant_type: 'client_credential'
    // }

    //normal access token
    function *getAT(){
        var tmp = yield pullApiData('wx_token',{
            grant_type: 'client_credential',
            appid: config.weixin.appid,
            secret: config.weixin.appsecret
        })
        var tk = JSON.parse(tmp[0].body);
        var now = date.getTime()/1000;
        var sess_wx = {
            token: tk.access_token,
            token_expire: now + tk.expires_in,
            token_renew: 7200
        }
        the.sess.wx = sess_wx;
    }

    //web access token
    function *getWAT(){
        var tmp = yield pullApiData('wx_web_token',{
            grant_type: params.code,
            appid: config.weixin.appid,
            secret: config.weixin.appsecret
        })
        console.log('wwwwwwwwwwwwwwww');
        console.log(tmp);
        var tk = JSON.parse(tmp[0].body);
        var now = date.getTime()/1000;
        var sess_wx = {
            token: tk.access_token,
            token_expire: now + tk.expires_in,
            token_renew: 7200
        }
        the.sess.wwx = sess_wx;
    }


    if(params.code){   //web access token
        if(!this.sess.wwx){
            yield getWAT();
        }else{
            var tmp = this.sess.wwx;
            var now = date.getTime()/1000;
            if(now-tmp.token_expire>6500){
                yield getWAT();
            }else{
                tmp.token_renew = now-tmp.token_expire;
            }
        }

    }else{   //normal access token

        if(!this.sess.wx){
            yield getAT();
        }else{
            var tmp = this.sess.wx;
            var now = date.getTime()/1000;
            if(now-tmp.token_expire>6500){
                yield getAT();
            }else{
                tmp.token_renew = now-tmp.token_expire;
            }
        }
    }
}

function *pullWxData(api, param, method){
    libs.elog('javaapi/'+ api);

    if(libs.getObjType(param)!=='Object')
        return yield {
            code: 1,
            message: 'param must be a json object'
        };

    yield getWxAccessToken.call(this, param);

    if(api === 'wx_web_token'){
        console.log('i waner to see params');
        console.log(api);
        // param.access_token = this.sess.wwx.token;
        return {token: this.sess.wwx.token};
    }else{
        param.access_token = this.sess.wx.token;
    }
    console.log('weixin token after '+Math.ceil(-this.sess.wx.token_renew)+' second will renew');
    // console.log(this.sess.wx.token);


    var url = apiPath.weixin[api];
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
    apiPath:apiPath,
    pullApiData: pullApiData,
    pullWxData: pullWxData
}
