/**
 * Module dependencies.
 */
var fs = require('fs')
var path = require('path')
var libs = require('../libs/libs')
var wechat = require('co-wechat')
var api = require('../apis/javaapi');


var menu = require('./wx/menu')

function *returnJson( data ){
    var body;
    if( data ){
        body = data;
        if( typeof data === 'object' )
            body = JSON.stringify(data)

        this.body = body;
    }
    else
        this.body = '{"error": -1, "message":"route/返回data不合法"}'
}

function *weixin(){
    libs.clog('weixin')

    var _WX = fkpConfig.weixin;
    var _WX_domain = fkpConfig.domain

    var route = this.params;

    if( route.title && route.title!== '' ){
        var page = route.title
        if( fs.existsSync( path.join(__dirname,'./wx/' + page + '.js' ) ) ){
            var pageData = yield require( './wx/' + page ).getData.call( this );
            yield returnJson.call( this, pageData )
        }
    }

    else{
        // return wechat(_WX).middleware(function *() {
        yield wechat(_WX).middleware(function *() {
            var message = this.weixin;
            console.log(message);
            if (message.Event==='LOCATION'){
                // { ToUserName: 'gh_da67feb86651',
                //   FromUserName: 'oHSkUwi5PtrrX4FBg71kVQ5S9TZM',
                //   CreateTime: '1449315519',
                //   MsgType: 'event',
                //   Event: 'LOCATION',
                //   Latitude: '23.185862',   //纬度
                //   Longitude: '113.319016',  //经度
                //   Precision: '150.000000'   //精度
                // }
                this.sess.wxposition = {
                    Latitude: message.Latitude,
                    Longitude: message.Longitude,
                    Precision: message.Precision
                }
            }
            else
            if( message.Event === 'subscribe' ){
                // this.body = '感谢您关注河马车管家'
                this.body = '欢迎关注河马车管家！我们为您提供最专业的维修保养、补漆救援、违章代办等一系列管家式会员服务，全面解决您用车的所有不便~更有丰富的在线优惠活动等着您哦~'
            }
            else
            if( message.Content && message.Content.indexOf('保养')>-1){
                this.body = '<a href="http://ch.dabai360.com">河马云汽</a>'
            }
            else
            if( message.Content && message.Content.indexOf('give me the token')>-1){
                var qcjcdata = yield api.pullWxData.call(this, 'token', {})
                this.body = qcjcdata.token;
                // console.log(JSON.parse(qcjcdata[0].body));
            }
            else
            if (message.Content && message.Content.indexOf('give me the demo')>-1){
                // 回复高富帅(图文回复)
                this.body = [
                  {
                    title: '河马车管家',
                    description: '与你的车一次亲密邂逅',
                    picurl: 'http://120.25.147.54/images/by.jpg',
                    // url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1545988792d90a08&redirect_uri=http%3A%2F%2Fch.dabai360.com&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
                    url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+_WX.appid+'&redirect_uri=http%3A%2F%2F'+_WX_domain+'%2Fuc%3Fhash%3Ddiscount_order&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
                  }
                ];
            }
            else
            if( message.Content && message.Content.indexOf('i will create menu')>-1){
                var qcjcdata = yield menu.call(this);
                this.body = '创建菜单';
                // console.log(JSON.parse(qcjcdata[0].body));
            }
             else if (message.FromUserName === 'diaosi') {
                // 回复屌丝(普通回复)
                this.body = 'hehe';
              } else if (message.FromUserName === 'text') {
                //你也可以这样回复text类型的信息
                this.body = {
                  content: 'text object',
                  type: 'text'
                };
              } else if (message.FromUserName === 'hehe') {
                // 回复一段音乐
                this.body = {
                  type: "music",
                  content: {
                    title: "来段音乐吧",
                    description: "一无所有",
                    musicUrl: "http://mp3.com/xx.mp3",
                    hqMusicUrl: "http://mp3.com/xx.mp3"
                  }
                };
              } else if (message.FromUserName === 'kf') {
                // 转发到客服接口
                this.body = {
                  type: "customerService",
                  kfAccount: "test1@test"
                };
              }
              else{
                  this.body = {
                    type: "customerService"
                  };
              }
        })
    }
}


module.exports = weixin
