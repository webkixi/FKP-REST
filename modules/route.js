/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path')
var api = require('../apis/javaapi');
var header_nav = require('../pages/common/header_nav');
var router = require('koa-router')();
var libs = require('../libs/libs')
var __ = libs.$lodash;
var render;
var sessi = require('./session');
var region = require('./region');
var config = require('../config');
// require('jsx-require-extension/options/harmony');   //另一套方案 node-jsx



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
function init(app,mapper,rend){
    render = rend;
    app.use(router.routes());

    var _mapper = mapper||{};

    function *forBetter(){
        this.sess = sessi();
        this.config = config;
        if(this.method === 'POST'&&this.params.cat==='region'){
            // xxx
            var data = yidld region.getRegion.call(this);
            console.log(data);
        }else
            yield distribute.call(this,mapper)
    }

    router
    .get('/',forBetter)
    .get('/:cat',forBetter)
    .get('/:cat/:title',forBetter)
    .get('/:cat/:title/:id',forBetter)

    .post('/:cat',forBetter)
    .post('/:cat/:title',forBetter)
}

/**
 * 路由配置
 * {param1} koa implement
 * {param2} map of static file
 * return rende pages
**/
function *distribute(_mapper){

    libs.clog('route.js/distribute');

    //绑定url地址解析
    this.local = this.req._parsedUrl;

    var routeJson = path.parse(this.path);

    if(_mapper){
        var isRender = yield filterRendeFile(this.params,routeJson);
        var params = this.params;
        var pageData = {
            //静态资源
            commonjs: _mapper.commonJs.common||'common.js',   //公共css
            commoncss: _mapper.commonCss.common||'common.css', //公共js
            pagejs: '',
            pagecss: '',
            pagedata: {}
        };

        route = isRender
        ? yield createTempPath2.call(this,this.params,routeJson)
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
                    pageData = yield require('../pages/demoindex').getDemoData.call(this,pageData);  //演示页

                else{
                    if (fs.existsSync(path.join(__dirname,'../pages/'+route+'.js') )){
                        pageData = yield require('../pages/'+route).getData.call(this,pageData);
                    }
                    else{
                        libs.elog('pages/'+route+' 配置文件不存在');
                        yield htmlRender.call(this,true,route,pageData);
                        return false;
                    }
                }

                if(typeof pageData.errState!=='undefined') yield htmlRender.call(this,false,route);
                else{
                    if(this.method==='GET')
                        yield htmlRender.call(this,true,route,pageData);

                    else if(this.method==='POST')
                        yield returnJson.call(this,true,route,pageData);

                }
            }

            else{
                this.redirect('/404')
            }

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
    libs.clog('route.js/htmlRender'+route);

    if(typeof data.errStat === 'undefined'){
        var header = yield header_nav();
        data.header_nav = header.navData
    }

    if (stat)
        this.body = yield render(route,data);
    else{
        this.redirect('/404')
        // this.body = yield render('404');
    }
}



function *returnJson(stat,route,data){
    libs.clog('route.js/htmlRender'+route);

    if(typeof data.errStat === 'undefined'){
        var header = yield header_nav();
        data.header_nav = header.navData
    }
    if (stat){
        this.body = JSON.stringify(data);
    }
    else
        this.body = '{"stat": 0}';
}


module.exports = init
