var libs = require('../../libs/libs')
var config = require('../../config');
var api = require('../../apis/javaapi')

var json = {
     "button":[
        {
            "name": "服务",
            "type": "view",
            "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1545988792d90a08&redirect_uri=http%3A%2F%2Fch.dabai360.com&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
        },

        {
           "name": "河马汽车",
           "type": "view",
           "url": "http://ch.dabai360.com/about.html"
        },
        {
           "name":"我",
           "sub_button":[
            {
               "type":"view",
               "name":"我的订单",
               "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1545988792d90a08&redirect_uri=http://ch.dabai360.com/uc.html#index&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
            },
            {
               "type":"view",
               "name":"我的车辆",
               "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1545988792d90a08&redirect_uri=http://ch.dabai360.com/uc.html#mycar&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
            },
        	{
               "type":"view",
               "name":"我的地址",
               "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1545988792d90a08&redirect_uri=http://ch.dabai360.com/uc.html#myaddress&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
            }]
        }
    ]
}


function *query(){
    var nowmenu = yield api.pullWxData.call(this,'querymenu',{});
    return nowmenu[0].body
}

function *create(){
    var now_m = yield query.call(this)
    now_m = JSON.parse(now_m)
    console.log('-------- create menu ----------');
    console.log(now_m);
    if(now_m.errcode>0){
        var nowmenu = yield api.pullWxData.call(this,'createmenu',json, 'post' );
        console.log(nowmenu[0].body);
    }
}

module.exports = create
