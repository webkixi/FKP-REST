//微信 web端根据web-access-token 获取用户信息
// oauth2 原理实现


var path = require('path')
var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
// var rct = require('../../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/weixin/userinfo')
    var mtd = this.method;
    var _this_sess = this.sess;


    var postdata = {}
    var _this = this;

    function *dealWith(){
        if(_this_sess.wwx){
            postdata={
                access_token: _this_sess.wwx.token,
                openid: _this_sess.wwx.openid,
                lang: 'zh_CN'
            }
            // console.log(postdata);
            var web_userinfo = yield api.pullWxData.call(_this, 'userinfo_web', postdata)
            web_userinfo = web_userinfo[0].body
            libs.clog('============  从微信拉取用户信息')
            console.log(web_userinfo);
            return web_userinfo;
        }
        else{
            return {error: 1, message: '从微信号拿去数据出错'}
        }
    }
    //
    var body = yield libs.$parse(this);
    if( body && body.code ){
        postdata = body;
        var web_token = yield api.pullWxData.call(this, 'wx_web_token', postdata)
        console.log('=============  有code的session =============');
        console.log(this.sess);
        return yield dealWith()
    }else{
        console.log('============  没有code的session  ===========');
        console.log(this.sess);
        return yield dealWith();
    }


}

module.exports = {
    getData : demoIndexData
}
