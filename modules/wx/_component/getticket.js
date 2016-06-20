// 微信jssdk 所需ticket
// 获取 normal token
// 通过接口获取微信的 ticket


var path = require('path')
var libs = require('../../../libs/libs')
var api = require('../../../apis/javaapi');
var sign = require('./sign')
// var rct = require('../../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/weixin/signature')
    var mtd = this.method;

    var postdata = {
        type: 'jsapi'
    };

    if (this.sess.wx && this.sess.wx.jsapi_ticket){
        var ticket = this.sess.wx.jsapi_ticket
        return ticket;
    }
    else{
        var tk = yield api.pullWxData.call( this, 'getticket', postdata )
        tk = JSON.parse(tk[0].body)
        if (tk.errcode == 0 ){
            var ticket = tk.ticket;
            this.sess.wx.jsapi_ticket = tk.ticket;
            return ticket
        }
        else
            return false;
    }
}

module.exports = {
    getData : demoIndexData
}
