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
          "sub_button":[
           {
              "type":"view",
              "name":"关于车叮咚",
              "url":"http://ch.dabai360.com/about.html#about"
           },
           {
              "type":"view",
              "name":"服务项目",
              "url":"http://ch.dabai360.com/about.html#about_service"
           },
           {
              "type":"view",
              "name":"服务区域",
              "url":"http://ch.dabai360.com/about.html#about_area"
           },
           {
              "type":"view",
              "name":"服务流程",
              "url":"http://ch.dabai360.com/about.html#about_com"
           }]
        },
        {
           "name":"我",
           "sub_button":[
            {
               "type":"view",
               "name":"我的订单",
               "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1545988792d90a08&redirect_uri=http%3A%2F%2Fch.dabai360.com%2Fuc.html&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
            },
            {
               "type":"view",
               "name":"我的车辆",
               "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1545988792d90a08&redirect_uri=http%3A%2F%2Fch.dabai360.com%2Fuc.html%23mycar&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
            },
        	  {
               "type":"view",
               "name":"我的地址",
               "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1545988792d90a08&redirect_uri=http%3A%2F%2Fch.dabai360.com%2Fuc.html%23myaddress&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
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
