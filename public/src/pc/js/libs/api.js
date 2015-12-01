var libs = require('libs/libs')
var qs = require('querystring');
var src = "/";
var demoSrc = "http://mock.agzgz.com/";

var apiPath = {
    base: src,
    dirs: {
        
    },
    weixin: {
        userlist: src+'wx/userlist',   //?access_token=_cqch&next_openid=
        userinfo: src+'wx/userinfo'
    }
}

function req( api, param, cb ){

    var url = apiPath.dirs[api];
    if(!url)
        url = api;

    if(libs.getObjType(param)==='Object'){
        var keys = Object.keys(param)
        if(keys.length>0){
            $.post( url, param, function( body, status ){
                if( status === 'success' ) cb( body ) ;
            }, "json")
        }
        else{
            $.post( url, {test: '123'}, function( body, status ){
                if( status === 'success' ) cb( body ) ;
            }, "json")
        }
    }
    else{
        if(libs.getObjType(param)==='Function'){
            cb = param;
        }
        $.post( url, {test: '123'}, function( body, status ){
            if( status === 'success' ) cb( body ) ;
        }, "json")
    }
}

function wx( api, param, cb ){
    var url = apiPath.weixin[api];
    if(!param)
        param = {test: "123"}
    if(url){
        $.post( url, param, function( body, status ){
            if( status === 'success' ) {
                cb( body );
            }
        }, "json")
    }
}

module.exports = {
	apiPath: apiPath,
	req: req,
    wx: wx
}
