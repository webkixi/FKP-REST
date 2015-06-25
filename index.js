/*
 * author: ralf
 * ly nodejs mvc project
 */

var koa = require('koa');
var session = require('koa-session');
// var statics = require('koa-static-cache');   //npm包在windows上有问题，需要到github上拿最新的文件


//自定义部分
var statics = require('./modules/static')
var _mapper = require('./modules/mapper')()
var route = require('./modules/route')


var app = koa();


//静态资源 js css
app.use(statics);


//session
app.keys = ['gzgzmixcookie'];
app.use(session(app));


//router
// app.use(router(app)); //开启路由
route(app,_mapper)


app.on('error', function(err){
    console.log(err);
});


app.listen(3000);
