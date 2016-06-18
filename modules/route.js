/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path')
var api = require('../apis/javaapi');
var router = require('koa-router')();
var libs = require('../libs/libs')
var render;
var region = require('./region');
var mms = require('./mms')
var config = require('../config');
var url = require('url')
// require('jsx-require-extension/options/harmony');   //另一套方案 node-jsx

/**
 * mongodb connect (mongoose)
 */
// require('./modules/mongo/index')
// var user = require('mongoose').model('User')


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

    if(_.indexOf(tempExts, ext) > -1)
        rtn = true;

    if(_.indexOf(noPassCat, cat) > -1)
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

    var cat = params.cat||'', title = params.title||'', id = params.id||'';
    var gtpy = libs.getObjType;

    if(id){
        gtpy(id)==='Number'
        ? route = title
            ? cat+'/'+title
            : cat
        : route = cat+'/'+title +'/' + id
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
        ? config.root||'index'
        : cat;
    }

    else{
        route = config.root||'index'
    }
    route = route.replace(rjson.ext,'')
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
        this.sess = this.session;
        this.config = config;
        this.htmlRender = htmlRender;
        this.returnJson = returnJson;
        //绑定url地址解析
        // this.local = this.req._parsedUrl;
        this.local = url.parse(this.url,true);
        var param = this.params;
        // console.log(param);

        if (param.cat && param.cat.indexOf('$') === 0) {
            yield dbcontrol.call(this,param)
        }
        else
            if(param.cat === 'region'){
                yield getRegion.call(this);
            }
        else
            if(param.cat === 'getmms')
                yield getMms.call(this);
        else
            if(param.cat === 'getservtime')
                yield getServTime.call(this);
        else
            if(param.cat === 'upup')
                yield uploader.call(this);
        else
            if(param.cat === 'captcha')
                yield captcha.call(this);
        else
            if(param.cat === 'weixin'){
                console.log('weixin =========');
                yield weixin.call(this,app);
            }
        else
            if(param.cat === 'github'){
                console.log('github =========');
                yield github.call(this,app);
            }
        else
            yield distribute.call(this,mapper)
    }

    router
    .redirect('/mall/item/list.html', '/mall/list.html')
    .redirect('/firm/detail/view.html', '/firm/view.html')


    .get('/',forBetter)
    .get('/:cat',forBetter)
    .get('/:cat/:title',forBetter)
    .get('/:cat/:title/:id',forBetter)

    .post('/:cat',forBetter)
    .post('/:cat/:title',forBetter)

}

function *dbcontrol(param){
    var db = require('../db/mongo/index')
    return yield db.init.call(this, param)
    // db.router.call(this)
    // var resaults = require('./mongo/index').call(this)


}

//获取地址
function *getRegion(){
    libs.clog('获取地址列表联动信息');
    var zones = yield region.getRegion.call(this);
    yield returnJson.call(this,true,'region',zones);
}

//获取短信接口
function *getMms(){
    libs.clog('获取短信接口');
    var msg = yield mms.getMms.call(this);
    yield returnJson.call(this,true,'getmms',msg);
}

//获取服务器时间
function *getServTime(){
    libs.clog('获取服务器时间');
    var dd = new Date();
    var tt = dd.getTime();
    yield returnJson.call(this,true,'getmms',{timer: tt});
}

//上传数据
function *uploader(){
    libs.clog('上传数据');
    var fileUpLoader = require('./uploader');
    yield fileUpLoader.local.call(this,this.config.upload_root);
    // var saveFileStat = yield fileUpLoader.ali.call(this,this.config.upload_root);
    // console.log('==========================');
    // console.log('==========================');
    // console.log(saveFileStat);
    // if(saveFileStat.success){
    //     var success = { success: true, data: saveFileStat}
    //     this.body = JSON.stringify(success)
    // }
    // else{
    //     var error = { success: false}
    //     this.body = JSON.stringify(error)
    // }
}

function *weixin(app){
    libs.clog('微信')
    yield require('./weixin').call(this);
    // app.use(yield require('./weixin'));
}

function *github(app){
    libs.clog('github登陆')
    yield require('./github').call(this);
    // app.use(yield require('./weixin'));
}

//上传数据
function *captcha(){
    libs.clog('获取验证码');
    this.body = yield require('./captcha').call(this,{len:4,fontsize:42,offset:50,quality:50});
    console.log('captcha code is:' + this.sess.captcha)
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
            commonjs: _mapper.commonJs.common||'common.js',   //公共css
            commoncss: _mapper.commonCss.common||'common.css', //公共js
            pagejs: '',
            pagecss: '',
            pagedata: {}
        };

        var route = isRender
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
                var passData = false;
                if (route == 'demoindex'){
                    pageData = yield require('../pages/demoindex').getDemoData.call(this,pageData);  //演示页
                }
                else{
                    if (fs.existsSync(path.join(__dirname,'../pages/'+route+'.js') )){
                        pageData = yield require('../pages/'+route).getData.call(this,pageData);
                    }
                    else{
                        libs.elog('pages/'+route+' 配置文件不存在');
                        passData = true;
                    }
                }
                yield dealWithPageData.call(this, pageData, route, passData)

                function *dealWithPageData(data, route, passStat){
                    if(data && data.errState && typeof data.errState!=='undefined' )
                        yield htmlRender.call(this,false,route);
                    else{
                        if(this.method==='GET'){
                            yield htmlRender.call(this,true,route,data);
                        }
                        else if(this.method==='POST'){
                            if( passStat ){
                                if( api.apiPath.dirs[route] || api.apiPath.weixin[route] || route === 'redirect' )
                                    data = yield require('../pages/common/nopage').getData.call(this, data, route);
                            }
                            yield returnJson.call(this,true,route,data);
                        }

                    }
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
    libs.clog('route.js/htmlRender '+route);
    try {
        if (stat){
            this.body = yield render(route,data);
        }
        else{
            this.redirect('/404')
        }
    } catch (e) {
        this.redirect('/404')
    }
}



function *returnJson(stat,route,data){
    libs.clog('route.js/htmlRender/'+route);
    if (stat){
        if(data)
            this.body = JSON.stringify(data);
        else {
            this.body = '{"error": -1, "message":"route/返回data不合法"}'
        }
    }
    else
        this.body = '{"error": -1, "message": "route/stat状态为false"}';
}


module.exports = init
