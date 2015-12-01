/**
 * Module dependencies.
 */
var libs = require('../libs/libs')
var config = require('../config');
var wechat = require('co-wechat')
var api = require('../apis/javaapi');


var menu = require('./wx/menu')

function *returnJson( data ){
    if(data)
        this.body = JSON.stringify(data);
    else
        this.body = '{"error": -1, "message":"route/返回data不合法"}'
}

function *weixin(){
    libs.clog('weixin')
    // yield menu.call(this)

    // console.log(this.local);
    // console.log(this.params);
    var route = this.params;

    if(route.title === 'userlist'){
        console.log('hh888888');
        var postdata = {
          "next_openid": ''
        }
        var qcjcdata = yield api.pullWxData.call(this, 'userlist', postdata)
        console.log(JSON.parse(qcjcdata[0].body));
        yield returnJson( qcjcdata )
    }
    else
    if( route.title === 'userinfo' ){
        console.log('hhhhhhhhhh   weixin  9999999999');
        var info = yield require('./wx/userinfo').getData.call(this)
        console.log(info);
        yield returnJson( info )
    }
    else{
        yield wechat(config.weixin).middleware(function *() {
            var message = this.weixin;
            console.log(message);
            console.log(message.Content.indexOf('保养')>-1);

            if(message.Content.indexOf('保养')>-1){
                this.body = '<a href="http://ch.dabai360.com">河马云汽</a>'
            }
            else
            if( message.Content.indexOf('give me the token')>-1){
                var qcjcdata = yield api.pullWxData.call(this, 'token', {})
                this.body = qcjcdata.token;
                // console.log(JSON.parse(qcjcdata[0].body));
            }
            else
            if( message.Content.indexOf('i will create menu')>-1){
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
              } else {
                // 回复高富帅(图文回复)
                this.body = [
                  {
                    title: '车叮咚，车管家',
                    description: '与你的车一次亲密邂逅',
                    picurl: 'http://120.25.147.54/images/by.jpg',
                    // url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1545988792d90a08&redirect_uri=http%3A%2F%2Fch.dabai360.com&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
                    url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+config.weixin.appid+'&redirect_uri=http%3A%2F%2Fch.dabai360.com&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
                  }
                ];
              }
        })
    }
}


module.exports = weixin
