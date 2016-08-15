/*
 * FKPJS - Full Stack Fragment
 * author: 天天修改
 */

// 环境依赖
require('babel-core/register');
require("babel-polyfill");
global._ = require('lodash');
require('./modules/requirePath')(require('path').resolve(__dirname));
process.env.env = 'default';

var port = 8070;
var args = process.argv.splice(2); //取得命令行参数
if( args[0] && (args[0] === 'test' ||
	args[0].indexOf('env_')>-1 ) ) {
		process.env.whereIs = 'pro'
		process.env.env = args[0]
}
else if( args[1] && (args[1] === 'test' ||
	args[1].indexOf('env_')>-1) ) {
		process.env.whereIs = args[0]
		process.env.env = args[1]
}
global.fkpConfig = require('./config')(process.env.env);   // 全局config



var app = require('koa')();
var cors = require('kcors');   //cros 跨域支持
var session = require('koa-generic-session');
global.React = require('react');
global.ReactDomServer = require('react-dom/server');
require('./modules/cache')  // lru 缓存模块




//自定义部分模块
var statics = require('./modules/static'),
	route = require('./modules/route'),
	socketio = require('./modules/wsocket'),   //websocket
	render = require('./modules/render'),
	_mapper = require('./modules/mapper')(args[0]);



//初始化
app.use(cors());

//静态资源 js css
statics(args[0], app)

//session
app.keys = ['keys','gzgzmixcookie'];
app.use(session( { key: 'agzgz' } ));


// websocket 初始化
var server = socketio.init(app)
//router
route.call(this,app,_mapper,render(args[0]))
//websocket 挂载on
socketio.run();


//打印出错信息
app.on('error', function(err){
    console.log(err);
});

if(args[1]){
	if (/[\d]+/.test(args[1])){
		port = args[1]
	}
}

server.listen(port);
// app.listen(port);
