/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path')
var router = require('koa-router');
var render = require('./render')
var libs = require('../libs/libs')
var __ = require('lodash')



/**
 * 过滤渲染文件
 * {param1} {json}   this.params
 * {param2} {json}   json of parse this.path
 * return   {boleean}
**/
function *filterRendeFile(pms, rjson){
    var rtn = false;
    var ext = rjson.ext;
    var cat = pms.cat;

    var exts = ['.css','.js','.swf','.jpg','.jpeg','.png','.bmp','.ico'];
    var tempExts = ['.html','.shtml'];
    var noPassCat = ['css','js','img','imgs','image','images'];

    if(!ext)
        rtn = true;

    if(__.indexOf(tempExts, ext) > -1)
        rtn = true;

    if(__.indexOf(noPassCat, cat) > -1)
        rtn = false;

    return rtn;
}


/**
 * 生成路由标签
 * {param1} {json}   this.params
 * {param2} {json}   json of parse this.path
 * return   {string} route tag, like 'index' , 'h5/lazypage'
**/
function *createTempPath2(pms,rjson){
    var params = pms;
    var route = false;

    var cat = params.cat, title = params.title, id = params.id;
    var gtpy = libs.getObjType;

    if(id){
        route = title
        ? cat+'/'+title
        : cat;
    }

    else if(title){
        title = title.replace(rjson.ext,'');
        route = gtpy(title)==='Number'
        ? cat
        : cat+'/'+title;
    }

    else if(cat){
        cat = cat.replace(rjson.ext,'');
        route = gtpy(cat)==='Number'
        ? 'index'
        : cat;
    }

    else{
        route = 'index'
    }

    return route;
}


/**
 * 路由分配
 * {param1} koa implement
 * {param2} map of static file
 * return rende pages
**/
function init(app,mapper){
    app.use(router(app));
    var _mapper = mapper;

    app
    .get('/',forBetter)
    .get('/:cat',forBetter)
    .get('/:cat/:title',forBetter)
    .get('/:cat/:title/:id',forBetter)

    function *forBetter(){
       yield distribute.call(this,mapper)
    }
}

/**
 * 路由配置
 * {param1} koa implement
 * {param2} map of static file
 * return rende pages
**/
function *distribute(_mapper){
    libs.clog('route.js/distribute');
    var routeJson = path.parse(this.path);

    if(_mapper){
        var isRender = yield filterRendeFile(this.params,routeJson);
        var params = this.params;
        var pageData = {
            //静态资源
            commonjs: _mapper.commonJs.common,   //公共css
            commoncss: _mapper.commonCss.common, //公共js
            pagejs: '',
            pagecss: '',
            pagedata: {}
        };

        route = isRender
        ? yield createTempPath2(this.params,routeJson)
        : false

        if ( isRender ){

            //静态资源初始化
            if (route){
                if (route in _mapper.pageCss)   //pagecss
                    pageData.pagecss = _mapper.pageCss[route];
                if (route in _mapper.pageJs)   //pagejs
                    pageData.pagejs = _mapper.pageJs[route];
            }

            if (route){
                if (route == 'demoindex')
                    pageData = yield require('../pages/demoindex').getDemoData(pageData);  //演示页
                else{
                    if (fs.existsSync(path.join(__dirname,'../pages/'+route+'.js') ))
                        pageData = yield require('../pages/'+route).getData(pageData);

                    else{
                        libs.elog('pages/'+route+' 配置文件不存在');
                        yield htmlRender.call(this,false);
                        return false;
                    }
                }
                yield htmlRender.call(this,true,route,pageData);
            }

            else{ /* todo something */ }

        }
    }
}

/**
 * 路由渲染
 * {param1} koa implement
 * {param2} map of static file
 * return rende pages
**/
function *htmlRender(stat,route,data){
    libs.clog('route.js/htmlRender');
    if (stat)
        this.body = yield render(route,data);
    else
        this.body = 'no file';
        // this.body = yield render('404');
}


module.exports = init
