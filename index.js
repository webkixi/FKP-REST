/*
 * author: ralf
 * ly nodejs mvc project
 */
var args = process.argv.splice(2); //取得命令行参数

require('babel-core/register');
require("babel-polyfill");

var koa = require('koa');
var session = require('koa-generic-session');
var render = require('./modules/render');
var LRU = require('lru-cache'),
	options = { max: 500
		  , length: function (n, key) { return n * 2 + key.length }
		  , dispose: function (key, n) { n.close() }
		  , maxAge: 1000 * 60 * 60 },
	cache = LRU(options)

//自定义部分模块
var statics = require('./modules/static')
var _mapper = require('./modules/mapper')(args[0])
var route = require('./modules/route')
var path = require('path')

global.React = require('react/addons')


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
	react: base+'/public/react/widgets'
}

//封装require方法
function include(file){
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

global.include = include





//初始化
var app = koa();

//静态资源 js css
app.use(statics(args[0]));

//session
app.keys = ['keys','gzgzmixcookie'];
app.use(session({
	key: 'agzgz'
}));

//定义缓存
app.use(function *(next){
	this.include = include
	this.cache = cache;
	yield next;
})

//定义测试环境
app.use(function *(next){
	if (args[0] === 'test') {
		this.session.argv = 'test'
	}
	yield next
});

//router
// app.use(router(app)); //开启路由
route.call(this,app,_mapper,render(args[0]))


app.on('error', function(err){
    console.log(err);
});

var port = 8070;
if(args[1])
	port = args[1]

app.listen(port);


// var exec = require('child_process').execSync;
// var spawn = require('child_process').spawn,
// // ls = spawn('ttt');
// exec('source ./ttt')

// var exec = require('child_process').execSync;
// // var cmd = 'nohup node --harmony ../index.js dev &'
// exec('source ttt');
