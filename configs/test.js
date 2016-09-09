//微信公众号配置文件
var agzgz = {
    token: '_agzgz',
    appid: 'wxec91673b97ce1463',
    appsecret: '2c2c9312a61cd9aa0eca16e2e8939cfb',
    encodingAESKey: ''
}

var config = {
    // 默认首页
    root: 'demoindex',    //dev 或者 pro默认首页

    //微信
    weixin: agzgz,                      // 微信模块调用参数

    // 第三方登陆
    auth: {
        //本地环境使用github登陆，使用 ./ly dev test
        github:{
            clientID: 'b1ba9181f8928e4cbfa2',
            clientSecret: 'cb598749e899bc20514a4b9f583974fd13457550',
            callbackURL: 'http://localhost:3000/github/callback',
            successUrl: '/dbdemo',
            userKey: 'githubuser',    //save this key to session
            headers: {"user-agent": "bendi"}
        }
    }

}

module.exports = config
