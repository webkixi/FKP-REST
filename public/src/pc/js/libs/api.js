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

        ,washcar: src+'washcar'

        ,login: src+'login'   //获取登陆用户信息
        ,carchecking: src+'carchecking'   //订单列表

        ,getshoplist: src+'getshoplist'
        ,discountlist: src+'discountlist'

        ,myorder_info: src+'myorder_info'  //订单详情
        ,order_list: src+'order_list'  //订单列表
    },
    weixin: {
        userlist: src+'wx/userlist',   //?access_token=_cqch&next_openid=
        userinfo: src+'wx/userinfo'
    }
}

function rtnPostData(url, data, cb){
    if( typeof data === 'function'){
        cb = data;
        data = undefined;
    }

    if( !cb ) return false;

    var _dft = {
        type: "post",
        contentType: "application/json",
        url: url,
        dataType: "json",
        success: function (data) {
            cb( data )
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    }

    if( libs.getObjType( data )==='Object'){
        _dft.data = JSON.stringify(data);
    }

    var opts = _dft

    $.ajax( opts );
}

function req( api, param, cb ){

    var url = apiPath.dirs[api];
    if(url){
        rtnPostData(url, param, cb )
        // if(libs.getObjType(param)==='Object'){
        //     var keys = Object.keys(param)
        //     if(keys.length>0){
        //         rtnPostData(url, param, cb )
        //     }else{
        //         rtnPostData(url, cb )
        //     }
        // }else{
        //     if(libs.getObjType(param)==='Function'){
        //         cb = param;
        //         rtnPostData(url, cb )
        //     }
        //     else{
        //         rtnPostData(url, cb )
        //     }
        // }
    }else{
      console.log("api没有定义");
    }
}

function wx( api, param, cb ){
    var url = apiPath.weixin[api];
    if(url){
        rtnPostData(url, param, cb )
    }
}

module.exports = {
	apiPath: apiPath,
	req: req,
    wx: wx
}
