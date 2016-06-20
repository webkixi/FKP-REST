//生成微信菜单


var libs = require('../../libs/libs')
var api = require('../../apis/javaapi')

function my_menu(appid, domain){

    return {
         "button":[
            {
                "name": "年卡购买",
                "type":"view",
                "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=http%3A%2F%2F"+domain+"%2Fcard&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
                // "sub_button":[
                // {
                //     "type":"view",
                //     "name":"预约服务",
                //     "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=http%3A%2F%2F"+domain+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
                // },
                // {
                //     "type":"view",
                //     "name":"年卡购买",
                //     "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=http%3A%2F%2F"+domain+"%2Fcard&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
                // }]
            },

            {
               "name": "河马车管家",
              "sub_button":[
               {
                  "type":"view",
                  "name":"关于我们",
                  "url":"http://"+domain+"/about.html#about"
               },
               {
                  "type":"view",
                  "name":"服务项目",
                  "url":"http://"+domain+"/about.html#about_service"
               },
               {
                  "type":"view",
                  "name":"服务区域",
                  "url":"http://"+domain+"/about.html#about_area"
               },
               {
                  "type":"view",
                  "name":"服务流程",
                  "url":"http://"+domain+"/about.html#about_com"
               }]
            },
            {
               "name":"我",
               "sub_button":[
                {
                  "type":"view",
                  "name":"我的年卡",
                  "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=http%3A%2F%2F"+domain+"%2Fcard%3Fhash%3DcardOrderList&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
                },
                {
                  "type":"view",
                  "name":"优惠买单",
                  "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=http%3A%2F%2F"+domain+"%2Fuc.html%3Fhash%3Ddiscount_order&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
                },
                {
                   "type":"view",
                   "name":"我的订单",
                   "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=http%3A%2F%2F"+domain+"%2Fuc.html&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
                },
                {
                   "type":"view",
                   "name":"我的车辆",
                   "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=http%3A%2F%2F"+domain+"%2Fuc.html%3Fhash%3Dmycar&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
                }
            //    ,{
            //        "type":"view",
            //        "name":"我的地址",
            //        "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=http%3A%2F%2F"+domain+"%2Fuc.html%3Fhash%3Dmyaddress&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
            //     }
                ]
            }
        ]
    }
}

function *query(){
    var nowmenu = yield api.pullWxData.call(this,'querymenu',{});
    return nowmenu[0].body;
}

function *create(){
    var domain = fkpConfig.domain;
    var _WX = fkpConfig.weixin
    var appid = _WX.appid

    var menu = yield my_menu(appid, domain)
    var nowmenu = yield api.pullWxData.call(this,'createmenu', menu, 'post' );
    console.log('[[[[[[[[[[[[[   create menu   ]]]]]]]]]]]]]');
    var rtn = nowmenu[0].body;
    console.log(rtn);
    return rtn
}

module.exports = {
    getData: create
}
