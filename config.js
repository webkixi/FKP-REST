var path = require('path');
var fs = require('fs');

var static_dir = './public'
var version = '2.15.14'
var config = {
    version: version,

    /*
     * 默认首页
     * dev开发 / pro生产模式时，默认打开的页面
     * 具体指定页面位置为 /public/src/pc/html 下
     */
    root: 'demoindex',

    /*
     * nodejs 服务端端口
     */
    port: 8070,


    /*
     * 本地上传路径
     */
    upload: path.join(static_dir,'/dist/'),
    upload_root: path.join(static_dir,'/dist/uploader'),



    /*
     * 允许editor编辑器上传图片
     * fkp-js的副编辑器采用百度ueditor
     */
    editorUploader: false,

    // 用户头像目录
    avatar: path.join(static_dir,'/dist/'),
    avatar_root: path.join(static_dir,'/dist/avatar'),

    // 阿里云图片路径
    goods_img: 'http://jh-ljs-goods.oss-cn-shenzhen.aliyuncs.com/',     //商品
    account_img:'http://jh-ljs-account.oss-cn-shenzhen.aliyuncs.com/',  //用户


    /*
     * 微信端配置文件
     */
    weixin: {
        token: '_agzgz',
        appid: 'wxec91673b97ce1463',
        appsecret: '2c2c9312a61cd9aa0eca16e2e8939cfb',
        encodingAESKey: ''
    },

    /*
     * api
     * 为了简化api的写法，统一管理 api 接口，返回json数组列表
     * 前端/node 端通用同一套api列表
     */
    apis:{
      apiip: "http://120.25.xxx.xxx",    //  api src 参考  根目录/pages/common/apilist.js
      port: ":8080/v1/",                 //  api src port 参考 根目录/pages/common/apilist.js
      domain: 'agzgz.com',
    },

    /*
     * static
     * 静态资源路径
     * node 端渲染时，模板引擎匹配的静态资源路径
     */
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

    /*
     * 第三方登陆
     * 配置自己的第三方登陆
     */
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

    /*
     * 静态资源映射文件
     * 如果后端使用java/php的模板，将map文件交给后端映射路径
     * 将打包的js/css文件自动存储为JSON，node端render的时候
     * 会将静态文件匹配给同名html文件
     */
  	mapJson:   path.join(static_dir,'/dist/'+version+'/map.json'),
  	mapDevJson:   path.join(static_dir,'/dist/'+version+'/dev/map.json'),


    //
    /*
     * markdown解析白名单
     * markdown扩展语法中的自定义变量，一般用于数据库存储
     * 匹配 `@@@` 内的内容
     * 白名单内容做为 json 传递到后端
     */
    markdownVariable: [
        'tags',
        'cats',
        'css',
        'js',
        'author',
        {'分类': 'cats'},   //支持中文 key
        {'作者': 'author'}
    ]
}

function _config(target){
    var _cfg = config;

    if (typeof target!=='string'){
        target = false;
    }

    if (target && fs.existsSync('./configs/'+target+'.js')){
        _cfg = require('./configs/'+target+'.js');
        _cfg = _.extend(config, _cfg);
    }


    return _cfg;
}

module.exports = _config

// 数据库配置见db/config.js
