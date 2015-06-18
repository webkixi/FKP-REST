var fs = require('fs');
var koa = require('koa');
var url = require('url');
var __ = require('lodash');
var path = require('path');
var parse = require('co-body');
var $extend = require('extend');
var request = require('request')
var router = require('koa-router');
var session = require('koa-session');
var views = require('co-views-helpers');
var exec = require('child_process').exec;
// var statics = require('koa-static');
var statics = require('koa-static-cache');   //npm包在windows上有问题，需要到github上拿最新的文件
var publicConfig = require('./public/config')
var markdown = require( "markdown-js" ).markdown;

//自定义部分
var libs = require('./libs/libs')

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

/*
* 检测扩展名
* {parm1} String
* return boolean
*/
function *checkExt(ext){
    var exts = ['.css','.js','.swf','.jpg','.jpeg','.png','.bmp'];
    var tmpExts = ['.html','.shtml']

    if(!ext)
        return true;

    if(__.indexOf(tmpExts,ext)>-1)
        return true;

    return false;
}

/*
* 生成模板路由
* {parm1} JSON
* return String
*/
function *createRoute(rjson){
    var route = libs.getObjType(rjson.name) === 'Number'
    ? rjson.dir.toString()
    : rjson.dir + '/' + rjson.name;

    route = route.replace(/[\/\\]+/,'')
    if(route==='')
        route = 'demoindex';

    return route;
}

function *index(){
    var routeJson = path.parse(this.path);
  	if(yield checkExt(routeJson.ext)&&_mapper){

    		var route = yield createRoute(routeJson);

    		var staticData = {
      			pathJson: routeJson,
      			commonjs: _mapper.commonJs.common,
      			commoncss: _mapper.commonCss.common,
      			pagejs: '',
      			pagecss: ''
    		};

        //演示页首页列表数据
        if(route === 'demoindex'){
            require("coffee-script/register")
            var listHtmlTempleteData = require('./public/_builder/gulp-task/html')(null,null,null,'REST',path.join('./public',publicConfig.dirs.src,'html'))  //请求生成环境demo数据的数据
            staticData = $extend(true,staticData,listHtmlTempleteData);
        }

    		if (route&&route!==''){
      			//pagecss
            if (route in _mapper.pageCss)
        				staticData.pagecss = _mapper.pageCss[route];
            //pagejs
      			if (route in _mapper.pageJs)
                staticData.pagejs = _mapper.pageJs[route];
    		}

    	 	yield htmlRender.call(this,true,route,staticData);
    }
    else{

    	 	yield htmlRender.call(this,false)
    }

}

function *htmlRender(stat,route,data){
  	if(stat){
    		if(!data.pathJson.ext || data.pathJson.ext === '.html')
      			this.body = yield render(route,data);
  	}
  	else
    		this.body = yield render('index');
}


app.on('error', function(err){
    console.log(err);
});

app.listen(3000);
