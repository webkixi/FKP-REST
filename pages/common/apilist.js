// var src = "http://120.25.241.174:8080/v1/servicetype/";
//var src = "http://192.168.4.57:8080/v1/";
var config = require('../../config')

function getApiPath() {

    var ipsrc = config.apiip;
    var port = config.port;
    if (process.env.env === 'test') {
        console.log('========== test环境 apilist');
        ipsrc = config.test.apiip;
        port = config.test.port;
    }
    var src = ipsrc + port;
    return {
        base: src,
        dirs: {
            wx_token: 'https://api.weixin.qq.com/cgi-bin/token',
            wx_web_token: 'https://api.weixin.qq.com/sns/oauth2/access_token',

            service: src+'servicetype/query'
        },

        weixin: {
            //oauth2方式的api会议 '_web' 方式结尾
            userlist: 'https://api.weixin.qq.com/cgi-bin/user/get',
            querymenu: 'https://api.weixin.qq.com/cgi-bin/menu/get',        //?access_token=ACCESS_TOKEN
            createmenu: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN',    //?access_token=ACCESS_TOKEN
            getticket: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',            //?access_token=ACCESS_TOKEN&type=jsapi

            userinfo_web: 'https://api.weixin.qq.com/sns/userinfo'  //?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
        }
    }
}


module.exports = getApiPath
