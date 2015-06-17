var fs = require('fs');
var koa = require('koa');
var url = require('url');
var path = require('path');
var _ = require('underscore');
var parse = require('co-body');
var $extend = require('extend');
var router = require('koa-router');
var session = require('koa-session');
var views = require('co-views-helpers');
var exec = require('child_process').exec;
var statics = require('koa-static-cache');   //npm包在windows上有问题，需要到github上拿最新的文件
// var statics = require('koa-static');
var markdown = require( "markdown-js" ).markdown;

// var tpl = require('./tpl').tpl;
// var tmpl = require('./tpl').tmpl;
// var formv = require('./toolkit').formv;


//libs
function getObjType(object){
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

function clone(target){
    var t = getObjType(target);
    return t === 'Object' ? $extend(true, {}, target) : t === 'Array' ? $extend(true, [], target) : target;
}




//config数据
var _mapper={length:0}

var _map = {
	mapJson: './public/dist/1.0.0/map.json',
	mapStatic: {
		dft: './public/dist/1.0.0/',
		html: './public/dist/1.0.0/html',
		js: './public/dist/1.0.0/js',
		css: './public/dist/1.0.0/css',
		img: './public/dist/1.0.0/images'
	}
}


/*
* 从map.json拿取数据
*/
var getMapJson = function(){
	if(fs.existsSync(_map.mapJson))
		return mapJson = JSON.parse(fs.readFileSync(_map.mapJson,'utf-8'));
	else
		return false;
}

/*
* 设置全局变脸_mapper
*/
var setMapper = function(){
	var mapper = getMapJson();
	if(!mapper)
		return;
	_mapper = mapper;
	_mapper.commonJs = _mapper.commonDependencies.js;
	_mapper.commonCss = _mapper.commonDependencies.css;
	_mapper.pageJs = _mapper.dependencies.js;
	_mapper.pageCss = _mapper.dependencies.css;
	_mapper.length = Object.keys(mapper).length;
}

//初始化_mapper数据
setMapper();


var app = koa(),

//渲染
render = views('./public/dist/1.0.0/html/', {
	map: { html: 'handlebars' }
});


//静态资源 js css
app.use(statics(path.join(__dirname,'public/dist/1.0.0/')),{
	buffer: true,
	gzip: true
});


//开启路由
app.use(router(app));


//session
app.use(session(app));
app.keys = ['gzgzmixcookie'];


app
.get('/',index)
.get('/:title',index)
.get('/:cat/:title',index)
.get('/:cat/:title/:id',index)
.get('/:id',index)
// .post('/logininfo',getLoginStat)



function *index(){
	if(_mapper){

		var routeJson = path.parse(this.path);
		var route = getObjType(routeJson.name) === 'Number' 
		? routeJson.dir.toString() 
		: routeJson.dir + '/' + routeJson.name;
		
		if(route === '//' || route ==='/' || route==='')
			route = 'index';

		var data = {
			pathJson: routeJson,
			commonjs: _mapper.commonJs.common,
			commoncss: _mapper.commonCss.common,
			pagejs: '',
			pagecss: ''
		};

		route = route.indexOf('/') !== 0 ? route : route.substring(1);
		if (route&&route!==''){			
			if (route in _mapper.pageCss){
				data.pagecss = _mapper.pageCss[route];
			}
			if (route in _mapper.pageJs){
				data.pagejs = _mapper.pageJs[route];
			}
		}
	 	yield htmlRender.call(this,true,route,data);

	}else{

	 	yield htmlRender.call(this,false)

	}
}

function *htmlRender(stat,route,data){
	if(stat){
		console.log(route);
		// console.log(data);
		if(!data.pathJson.ext || data.pathJson.exe === '.html')
			this.body = yield render(route,data);
	}
	else
		this.body = yield render('index');
}


app.on('error', function(err){
  console.log(err);
});

app.listen(3000);
