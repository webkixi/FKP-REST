/**
 * Module dependencies.
 */
var path = require('path')
var $extend = require('extend');
var statics = require('koa-static-cache');   //npm包在windows上有问题，需要到github上拿最新的文件
var config = require('../config')
var render = require('./render')
var libs = require('../libs/libs')
var publicConfig = require('../public/config')

// setup views mapping .html
// to the handlebars template engine

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
function *createTempPath(rjson){
    var route = libs.getObjType(rjson.name) === 'Number'
    ? rjson.dir.toString()
    : rjson.dir + '/' + rjson.name;

    route = route.replace(/[\/\\]+/,'')
    if(route==='')
        route = 'demoindex';

    return route;
}




function init(app,mapper){
    var _mapper = mapper;

    app
    .get('/',distribute)
    .get('/:title',distribute)
    .get('/:cat/:title',distribute)
    .get('/:cat/:title/:id',distribute)
    .get('/:id',distribute)

    function *distribute(){
        var routeJson = path.parse(this.path);

      	if (yield checkExt(routeJson.ext)&&_mapper){
        		//
            var route = yield createTempPath(routeJson);
        		var staticData = {
          			commonjs: _mapper.commonJs.common,
          			commoncss: _mapper.commonCss.common,
          			pagejs: '',
          			pagecss: '' };

            //演示页首页列表数据
            if (route === 'demoindex'){
                require("coffee-script/register")
                var listHtmlTempleteData = require('../public/_builder/gulp-task/html')(null,null,null,'REST',path.join('./public',publicConfig.dirs.src,'html'))  //请求生成环境demo数据的数据
                staticData = $extend(true,staticData,listHtmlTempleteData); }

        		if (route){
                if (route in _mapper.pageCss)   //pagecss
            				staticData.pagecss = _mapper.pageCss[route];
          			if (route in _mapper.pageJs)   //pagejs
                    staticData.pagejs = _mapper.pageJs[route]; }

        	 	yield htmlRender.call(this,true,route,staticData);
        }
    }

    function *htmlRender(stat,route,data){
      	if (stat)
      			this.body = yield render(route,data);
      	else
        		this.body = yield render('index');
    }
}


module.exports = init
