var path = require('path');
var os = require('os');
var ifaces = os.networkInterfaces();

//微信公众号配置文件
var hema = {
    token: '_cqch',
    appid: 'wxbbaa9329fb93ab87',
    appsecret: '62546240267b5a81f8d51f3ae73e6a10',
    encodingAESKey: '4sRcy6NRoQsPCV7SuJSNrOd2UxPXeYC3CKVHxYMU0QH'
}

var cqch = {
    token: '_cqch',
    appid: 'wx1545988792d90a08',
    appsecret: '574d8b683303755fa49ff5971416eb7b',
    encodingAESKey: 'EiFRyp7yt4Ayw8EBIFojuDsn8S4JLYsDeBRtVkPRkW9'
}

var wxConfig = hema;

var static_dir = './public'
var version = '1.0.0'
var config = {
    domain: 'ch.dabai360.com',
    root: 'index',    //dev 或者 pro默认首页

    // 静态资源映射文件
  	mapJson:   path.join(static_dir,'/dist/1.0.0/map.json'),
  	mapDevJson:   path.join(static_dir,'/dist/1.0.0/dev/map.json'),

    // 演示文件列表，ly demo/dev/pro启动http服务后，在浏览器端后缀demoindex
    demoindex: path.join(static_dir,'/dist/1.0.0/html/demoindex.html'),

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

    //本地上传路径
    upload_root: path.join(static_dir,'/dist/upload'),

    //微信
    weixin: wxConfig
}

module.exports = config
