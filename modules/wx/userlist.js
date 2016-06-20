// 微信jssdk 所需ticket
// 获取 normal token
// 通过接口获取微信的 ticket


var path = require('path')
var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
// var sign = require('./_component/sign')
// var rct = require('../../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/weixin/signature')
    var mtd = this.method;
    var _this_sess = this.sess;

    if( mtd==='GET' ){
        console.log(this.local);
        return oridata;
    }

    if( mtd === 'POST' ){
        var postdata = {
          "next_openid": ''
        }

        var uldata = yield api.pullWxData.call(this, 'userlist', postdata)
        var rtndata = uldata[0].body
        return rtndata
    }
}

module.exports = {
    getData : demoIndexData
}
