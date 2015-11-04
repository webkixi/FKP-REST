var libs = require('../../libs/libs')
var config = require('../../config');
var api = require('../../apis/javaapi')

var json = {
     "button":[
        {
            "name": "服务",
            "type": "view",
            "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.weixin.appid+"&redirect_uri=http%3A%2F%2Fch.dabai360.com&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
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
