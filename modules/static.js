/**
 * Module dependencies.
 */
var statics = require('koa-static-cache');   //npm包在windows上有问题，需要到github上拿最新的文件
var config = require('../config')

// setup views mapping .html
// to the handlebars template engine

function setStatic(stat){
    if(stat && stat==='dev'){
        console.log('&&&&&&&&&&&&&&++++++++++++');
        return statics(config.static.test.dft,{
            buffer: true,
            gzip: true
        });
    }else{
        return statics(config.static.dft,{
            buffer: true,
            gzip: true
        });
    }
}

module.exports = setStatic
