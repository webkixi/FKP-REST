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
        queryseries: src+'queryseries',   //汽车品牌
        querycartype: src+'querycartype'   //汽车品牌


        ,region: src+'region'   //获取地区信息
        ,getmms: src+'getmms'   //获取短信验证码
        ,getservtime: src+'getservtime' //获取服务器时间

        ,order: src+'order' //提交订单
        ,payment: src+'payment' //支付

        ,mobilecode: src+'mobilecode'   //注册

        ,useraddcar: src+'useraddcar'   //添加车辆
        ,mycarlist: src+'mycarlist'     //我的车列表
        ,mycar_del: src+'mycar_del'     //删除车辆

        ,order_addr: src+'order_addr'
        ,order_addaddr: src+'order_addaddr'
        ,order_deladdr: src+'order_deladdr'

        ,login: src+'login'   //获取登陆用户信息
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
    }else{
      console.log("api没有定义");
    }
}

function wx( api, param, cb ){
    var url = apiPath.weixin[api];
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
