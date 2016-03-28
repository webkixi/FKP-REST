var path = require('path');
var os = require('os');
var ifaces = os.networkInterfaces();

//微信公众号配置文件
var hema = {
    token: '_cqch',
    appid: 'xxxxxxxxxxx',
    appsecret: 'xxxxxxxxxxx',
    encodingAESKey: 'xxxxxxxxxxx'
}

var cqch = {
    token: '_cqch',
    appid: 'yyyyyyyyyyyyyyy',
    appsecret: 'yyyyyyyyyyyyyyy',
    encodingAESKey: 'yyyyyyyyyyyyyyy'
}

// var wxConfig = hema;

var static_dir = './public'
var version = '1.0.0'
var config = {
    // 静态资源映射文件
  	mapJson:   path.join(static_dir,'/dist/1.0.0/map.json'),
  	mapDevJson:   path.join(static_dir,'/dist/1.0.0/dev/map.json'),

    // 演示文件列表，ly demo/dev/pro启动http服务后，在浏览器端后缀demoindex
    demoindex: path.join(static_dir,'/dist/1.0.0/html/demoindex.html'),

    //本地上传路径
    upload: path.join(static_dir,'/dist/'),
    upload_root: path.join(static_dir,'/dist/uploader'),
    // 阿里云图片路径
    goods_img: 'http://jh-ljs-goods.oss-cn-shenzhen.aliyuncs.com/',     //商品
    account_img:'http://jh-ljs-account.oss-cn-shenzhen.aliyuncs.com/',  //用户

    //静态资源路径
    static: {
		dft:  path.join(static_dir,'/dist/1.0.0/'),
		html: path.join(static_dir,'/dist/1.0.0/html'),
		js:   path.join(static_dir,'/dist/1.0.0/js'),
		css:  path.join(static_dir,'/dist/1.0.0/css'),
		img:  path.join(static_dir,'/dist/1.0.0/images'),
        test: {
            dft:  path.join(static_dir,'/dist/1.0.0/dev'),
            html: path.join(static_dir,'/dist/1.0.0/dev/html'),
            js:   path.join(static_dir,'/dist/1.0.0/dev/js'),
            css:  path.join(static_dir,'/dist/1.0.0/dev/css'),
            img:  path.join(static_dir,'/dist/1.0.0/dev/images')
        }
  	},

    root: 'demoindex',    //dev 或者 pro默认首页

    apiip: "http://120.25.xxx.xxx",
    port: ":8080/v1/",

    //微信
    weixin: hema,
    weixintest: cqch,

    domain: 'agzgz.com',
    domaintest: 'test.agzgz.com',

    auth: {
        github:{
            clientID: 'd65a863ee074f62231c5',
            clientSecret: '9f4a6a2f93c7c23405378c70bb2ae1c618734985',
            callbackURL: 'http://localhost:3000/github/callback',
            userKey: 'githubuser',    //save this key to session
            headers: {'user-agent': 'love_gz'}
        }
    },

    mongo: {
        url: "mongodb://localhost/fkp",
        port: "27017",
        pageSize: 20
    },

    test: {
        weixin: cqch,
        domain: 'test.agzgz.com',
        apiip: '192.168.1.100',
        port: ':8088/v1/',
        auth: {
            github:{
                clientID: 'd65a863ee074f62231c5',
                clientSecret: '9f4a6a2f93c7c23405378c70bb2ae1c618734985',
                callbackURL: 'http://localhost:3000/github/callback',
                userKey: 'githubuser',    //save this key to session
                headers: {'user-agent': 'love_gz'}
            }
        },
        mongo: {
            url: "mongodb://localhost/fkp",
            port: '27017',
            pageSize: 20
        }
    }
}

module.exports = config
