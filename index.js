/*
 * author: ralf
 * ly nodejs mvc project
 */

var koa = require('koa');
var session = require('koa-generic-session');
var render = require('./modules/render');

var args = process.argv.splice(2);

//自定义部分
var statics = require('./modules/static')
var _mapper = require('./modules/mapper')(args[0])
var route = require('./modules/route')

var app = koa();



//静态资源 js css
app.use(statics(args[0]));

//session
app.keys = ['keys','gzgzmixcookie'];
app.use(session({
	key: 'cqch'
}));

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
