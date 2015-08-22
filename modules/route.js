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
var region = require('./region');
var config = require('../config');
// require('jsx-require-extension/options/harmony');   //另一套方案 node-jsx

var wechat = require('co-wechat')
var wx_config = {
  token: 'agzgz',
  appid: 'wxc9edcce4f4d915e6',
  encodingAESKey: 'a4JE5P7ImZWnU6UpLVgr6uldgrthwiwkweo8LTapZmC'
};



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
        // this.sess = sessi();
        this.sess = this.session;
        this.config = config;
        var param = this.params;
        console.log(param);
        if(param.cat === 'region'){
            yield getRegion.call(this);
        }
        else if(param.cat === 'upload'){
            yield uploader.call(this);
        }else if(param.cat === 'captcha'){
            yield captcha.call(this);
        }else if(param.cat === 'weixin'){
            yield wechat.call(this,app);
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

//获取地址
function *getRegion(){
    libs.clog('获取地址列表联动信息');
    var body={};
    if(this.method==='GET'){
        body = this.query;
    }
    if(this.method==='POST'){
        body = yield libs.$parse(this)
    }
    if(typeof body.id!=='undefined'&&body.id){
        var zones = yield region.getRegion(body.id);
        var data = JSON.parse(zones[1]);
        yield returnJson.call(this,true,'region',data);
    }
}

//上传数据
function *uploader(){
    libs.clog('上传数据');
    var fileUpLoader = require('./uploader');
    yield fileUpLoader.ali.call(this,this.config.upload_root);
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

function *wechat(app){
    libs.clog('微信')
    app.use(wechat('agzgz').middleware(function *() {
        var message = this.weixin;
          if (message.FromUserName === 'diaosi') {
            // 回复屌丝(普通回复)
            this.body = 'hehe';
          } else if (message.FromUserName === 'text') {
            //你也可以这样回复text类型的信息
            this.body = {
              content: 'text object',
              type: 'text'
            };
          } else if (message.FromUserName === 'hehe') {
            // 回复一段音乐
            this.body = {
              type: "music",
              content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3"
              }
            };
          } else if (message.FromUserName === 'kf') {
            // 转发到客服接口
            this.body = {
              type: "customerService",
              kfAccount: "test1@test"
            };
          } else {
            // 回复高富帅(图文回复)
            this.body = [
              {
                title: '你来我家接我吧',
                description: '这是女神与高富帅之间的对话',
                picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                url: 'http://nodeapi.cloudfoundry.com/'
              }
            ];
          }
    }))
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

                if(typeof pageData.errState!=='undefined' && pageData.errState) yield htmlRender.call(this,false,route);
                else{

                    // if(typeof pageData.errStat == 'undefined'){
                    //     var header = yield header_nav.call(this);
                    //     pageData.header_nav = header.navData;
                    //     pageData.user = header.user;
                    // }

                    if(this.method==='GET'){
                        if(typeof pageData.errStat == 'undefined'){
                            var header = yield header_nav.call(this);
                            pageData.header_nav = header.navData;
                            pageData.user = header.user;
                        }
                        yield htmlRender.call(this,true,route,pageData);
                    }

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
    libs.clog('route.js/htmlRender/'+route);
    if (stat)
        this.body = yield render(route,data);
    else{
        this.redirect('/404')
    }
}



function *returnJson(stat,route,data){
    libs.clog('route.js/htmlRender/'+route);
    if (stat){
        this.body = JSON.stringify(data);
    }
    else
        this.body = '{"stat": 0}';
}


module.exports = init
