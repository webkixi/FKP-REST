var fs = require('fs');
var koa = require('koa');
var url = require('url');
var path = require('path');
var _ = require('underscore');
var parse = require('co-body');
var router = require('koa-router');
var session = require('koa-session');
var views = require('co-views-helpers');
var exec = require('child_process').exec;
var statics = require('koa-static-cache');
// var statics = require('koa-static');
var markdown = require( "markdown-js" ).markdown;

// var tpl = require('./tpl').tpl;
// var tmpl = require('./tpl').tmpl;
// var formv = require('./toolkit').formv;


//虚拟数据
var posts = [
 {id:1,title:'hello',content:'this just test'}
,{id:2,title:'good',content:'i can\'t say any more'}
,{id:3,title:'ni mei',content:'just your sister'}
];


var app = koa(),

render = views('./public/dist/1.0.0/html', {
	map: { html: 'handlebars' }
});

//静态目录
// app.use(statics(path.join(__dirname,'./public/dist/1.0.0/dev/'),{
// 	// buffer: true,
// 	// gzip: true
// }));

app.use(statics(path.join(__dirname,'public/dist/1.0.0/dev/')),{

});




//开启路由
app.use(router(app));

//session
app.use(session(app));
app.keys = ['gzgzmixcookie'];

app
.get('/',index)
// .get('/:title',index)
// .get('/:id',index)
// .post('/logininfo',getLoginStat)

function *index(){

	// tmp = yield render('index');
 	// tmp = tmp.split(/[=]{5,}/)[0];
 	// this.body = tmp;

 	this.body = yield render('index',{'good':'123456789'});
}


app.on('error', function(err){
  console.log(err);
});

app.listen(3000);
