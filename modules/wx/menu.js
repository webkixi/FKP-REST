var libs = require('../../libs/libs')
var config = require('../../config');
var api = require('../../apis/javaapi')

var json = {
     "button":[
      {
        "name": "服务",
        "type": "view",
        "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.weixin.appid+"&redirect_uri=http%3A%2F%2Fch.dabai360.com&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
        // "sub_button":
        //     [
        //         {
        //            "type":"click",
        //            "name":"即时新闻",
        //            "key":"jsxw"
        //         },
        //         {
        //            "type":"click",
        //            "name":"财经早餐",
        //            "key":"cjzc"
        //         },
        //         {
        //            "type":"click",
        //            "name":"焦点话题",
        //            "key":"jdht"
        //         },
        //         {
        //            "type":"view",
        //            "name":"财经日历",
        //            "url":"http://stock1.sina.cn/dpool/stockv2/universal_calendar.php?vt=4"
        //         }
        //     ]
        },

	   {
           "name": "河马汽车",
           "type": "view",
           "url": "http://ch.dabai360.com/about.html"
        //    "sub_button":[
        //     {
        //        "type":"click",
        //        "name":"今日看盘",
        //        "key":"jrkp"
        //     },
        //     {
        //        "type":"view",
        //        "name":"行情刷新",
        //        "url":"http://XX/index.php/market/index"
        //     },
		// 	{
        //        "type":"click",
        //        "name":"交易策略",
        //        "key":"jycl"
        //     },
		// 	{
        //        "type":"click",
        //        "name":"投资天地",
        //        "key":"tztd"
        //     },
		// 	{
        //        "type":"click",
        //        "name":"投资文库",
        //        "key":"tzwk"
        //     }]
       },

	   {
           "name":"我",
           "sub_button":[
            {
               "type":"view",
               "name":"我的订单",
               "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.weixin.appid+"&redirect_uri=http://ch.dabai360.com/uc.html#index&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
            },
            {
               "type":"view",
               "name":"我的车辆",
               "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.weixin.appid+"&redirect_uri=http://ch.dabai360.com/uc.html#mycar&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
            },
			{
               "type":"view",
               "name":"我的地址",
               "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.weixin.appid+"&redirect_uri=http://ch.dabai360.com/uc.html#myaddress&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
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
    console.log('-------- create menu ----------');
    console.log(now_m);
    console.log(typeof now_m.errcode);
    if(now_m.errcode>0){
        var nowmenu = yield api.pullWxData.call(this,'createmenu',{ body:json }, 'post' );
        console.log(nowmenu[0].body);
    }
}

module.exports = create
