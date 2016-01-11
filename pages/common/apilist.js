// var src = "http://120.25.241.174:8080/v1/servicetype/";
//var src = "http://192.168.4.57:8080/v1/";

function getApiPath() {

    var ipsrc = "http://120.25.241.174"
    if (this.sess && this.sess.argv) {
        if (this.sess.argv === 'test') {
            console.log('========== test环境 apilist');
            ipsrc = "http://120.25.210.214";
        }
    }
    // ipsrc = "http://192.168.0.152";
    // ipsrc = "http://120.25.210.214";
    var src = ipsrc + ":8088/v1/";
    var src2 = ipsrc + ":8088/v1/";
    var src3 = ipsrc + ":8088/v1/";
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
