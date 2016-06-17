/*
 * author: ralf
 * ly nodejs mvc project
 */

require('babel-core/register');
require("babel-polyfill");

var args = process.argv.splice(2); //取得命令行参数

var koa = require('koa'),
	path = require('path'),
	session = require('koa-generic-session');

//自定义部分模块
require('./modules/cache')  // lru 缓存模块
var statics = require('./modules/static'),
	_mapper = require('./modules/mapper')(args[0]),
	route = require('./modules/route'),
	socketio = require('./modules/wsocket'),   //websocket
	render = require('./modules/render');

// global.React = require('react/addons')
global.React = require('react')
global.ReactDomServer = require('react-dom/server')
global._ = require('lodash')


//配置环境路径
var base = path.resolve(__dirname);
var _path = {
    apis: base,
    db: base,
    fkpdoc: base,
    libs: base,
    modules: base,
    public: base,
    pages: base,
	react: base+'/public/react/widgets',
	root: base
}

//封装require方法
//简化require的调用，别名化
global.include = function(file){
    if (!file)
        throw new Error('没有指定文件名');

    if (typeof file !== 'string')
        throw new Error('file参数必须为String类型');

    if (file.indexOf('/')>-1){
        var tmp = file.split('/')
        var key = tmp[0];
        if (_path[key]){
			var merge_path;
			if (key==='react'){
				file = file.replace('react/','')
				merge_path = path.resolve(_path[key], file)
			}
			else {
				if (file.indexOf('root')>-1){
				    file = tmp[1]
				}
				merge_path = path.resolve(_path[key], file)
			}
            return require(merge_path)
        }
        else {
            throw new Error('没有该文件或者路径错误');
        }
    }else {
        return require(file)
    }
}


//初始化
var app = koa();

//静态资源 js css
statics(args[0], app)

//session
app.keys = ['keys','gzgzmixcookie'];
app.use(session({
	key: 'agzgz'
}));

//定义include
app.use(function *(next){
	this.include = include
	yield next;
})

//定义测试环境
app.use(function *(next){
	if (args[0] === 'dev' || args[0] === 'pro'){
		if (args[1] === 'test') {
			console.log('=========== 进入测试环境');
			process.env.env = 'test'
			// this.session.argv = 'test'
		}
	}
	if (args[0] === 'test') {
		console.log('=========== 进入测试环境');
		process.env.env = 'test'
		// this.session.argv = 'test'
	}
	yield next
});

// websocket 初始化
var server = socketio.init(app)

//router
// app.use(router(app)); //开启路由
route.call(this,app,_mapper,render(args[0]))

//websocket 挂载on
socketio.run();


//打印出错信息
app.on('error', function(err){
    console.log(err);
});

var port = 8070;
if(args[1]){
	if (/[\d]+/.test(args[1])){
		port = args[1]
	}
}

// app.listen(port);
server.listen(port);


// var exec = require('child_process').execSync;
// var spawn = require('child_process').spawn,
// // ls = spawn('ttt');
// exec('source ./ttt')

// var exec = require('child_process').execSync;
// // var cmd = 'nohup node --harmony ../index.js dev &'
// exec('source ttt');
