var path = require('path');
var fs = require('fs');

//微信公众号配置文件
var agzgz = {
    token: '_agzgz',
    appid: 'wxec91673b97ce1463',
    appsecret: '2c2c9312a61cd9aa0eca16e2e8939cfb',
    encodingAESKey: ''
}

var static_dir = './public'
var version = '2.14.12'
var config = {
    version: version,
    // 默认首页
    root: 'dbdemo',    //dev 或者 pro默认首页

    editorUploader: false,    //true，允许editor编辑器上传图片
    //本地上传路径
    upload: path.join(static_dir,'/dist/'),
    upload_root: path.join(static_dir,'/dist/uploader'),

    // 用户头像目录
    avatar: path.join(static_dir,'/dist/'),
    avatar_root: path.join(static_dir,'/dist/avatar'),

    // 阿里云图片路径
    goods_img: 'http://jh-ljs-goods.oss-cn-shenzhen.aliyuncs.com/',     //商品
    account_img:'http://jh-ljs-account.oss-cn-shenzhen.aliyuncs.com/',  //用户

    // weixintest: cqch,
    // domaintest: 'test.agzgz.com',

    //微信
    weixin: agzgz,                      // 微信模块调用参数

    //api
    apiip: "http://120.25.xxx.xxx",    //  api src 参考  根目录/pages/common/apilist.js
    port: ":8080/v1/",                 //  api src port 参考 根目录/pages/common/apilist.js
    domain: 'agzgz.com',

    // 第三方登陆
    auth: {
        github:{  //第三方github登陆
            clientID: 'd65a863ee074f62231c5',
            clientSecret: '9f4a6a2f93c7c23405378c70bb2ae1c618734985',
            callbackURL: 'http://www.agzgz.com/github/callback',
            successUrl: '/dbdemo',
            userKey: 'githubuser',    //save this key to session
            headers: {"user-agent": "love_gz"}
        }
    },

    //静态资源路径
    static: {
		dft:  path.join(static_dir,'/dist/'+version+'/'),
		html: path.join(static_dir,'/dist/'+version+'/html'),
		js:   path.join(static_dir,'/dist/'+version+'/js'),
		css:  path.join(static_dir,'/dist/'+version+'/css'),
		img:  path.join(static_dir,'/dist/'+version+'/images'),
        dev: {
            dft:  path.join(static_dir,'/dist/'+version+'/dev'),
            html: path.join(static_dir,'/dist/'+version+'/dev/html'),
            js:   path.join(static_dir,'/dist/'+version+'/dev/js'),
            css:  path.join(static_dir,'/dist/'+version+'/dev/css'),
            img:  path.join(static_dir,'/dist/'+version+'/dev/images')
        }
  	},

    // 静态资源映射文件
    // 如果后端使用java/php的模板，将map文件交给后端映射路径
  	mapJson:   path.join(static_dir,'/dist/'+version+'/map.json'),
  	mapDevJson:   path.join(static_dir,'/dist/'+version+'/dev/map.json'),

}

function _config(target){
    var _cfg = config;

    if (target && typeof target!=='string'){
        target = false;
    }

    if (target && fs.existsSync('./configs/'+target+'.js')){
        _cfg = require('./configs/'+target+'.js');
        _cfg = _.extend(config, _cfg);
        // console.log(JSON.stringify(_cfg));
    }


    return _cfg;
}

module.exports = _config

// 数据库配置见db/config.js
