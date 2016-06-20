// 微信jssdk 所需ticket
// 获取 normal token
// 通过接口获取微信的 ticket


var path = require('path')
var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
var sign = require('./_component/sign')
var getticket = require('./_component/getticket').getData
// var rct = require('../../modules/parseReact');

function *demoIndexData(url){
    libs.wlog('pages/weixin/signature')
    var mtd = this.method;
    var _this = this;
    var _WX = fkpConfig.weixin

    var body = yield libs.$parse(this)
    if(!body.url)
        return {error: 1, message: '请传入当前页面的url，不支持hash'}
    else {
        url = body.url
    }

    function *getSignature(tckt){
        var signature = yield sign(tckt, url)
        libs.clog('微信签名')
        signature.appId = _WX.appid
        // signature.jsApiList = []

        console.log( signature );
        // delete signature.jsapi_ticket
        // delete signature.url

        //微信地理位置
        if (_this.sess.wxposition){
            /*
            * 有些公众号设置了自动获取位置信息
            * 在进入公众号首页时会自动返回经纬度
            * 这个处理在 modules/wexin中中了相关设置
            * 并被放置在session中，变量名为 wxposition
            */
            signature.position = _this.sess.wxposition
        }
        _this.sess.wx.signature = signature


        return signature
    }

    // if (this.sess.wx && this.sess.wx.signature){
    //     var signature = this.sess.wx.signature;
    //     return signature
    // }
    // else{
        var ticket = yield getticket.call(this)
        if (ticket){
            return yield getSignature(ticket)
        }
        else {
            return {error: 1, message: '获取签名失败'}
        }
    // }
}

module.exports = {
    getData : demoIndexData
}
