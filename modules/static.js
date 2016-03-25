/**
 * Module dependencies.
 */
var statics = require('koa-static-cache');   //npm包在windows上有问题，需要到github上拿最新的文件
var config = require('../config')

// setup views mapping .html
// to the handlebars template engine

function setStatic(stat, app){
    console.log('静态资源配置');
    console.log('==============='+__filename+' setStatic');
    console.log('-');
    console.log('-');
    console.log('-');

    app.use(statics(config.upload, {
        dynamic: true
    }))

    if(stat && stat==='dev'){
        app.use(statics(config.static.test.dft,{
            buffer: false,
            gzip: true
        }));
    }else{
        app.use( statics(config.static.dft,{
            buffer: true,
            gzip: true
        }));
    }
}

module.exports = setStatic
