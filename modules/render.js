/**
 * Module dependencies.
 */
var views = require('co-views-helpers');
var config = require('../config')

// setup views mapping .html
// to the handlebars template engine
// render = views('../public/dist/1.0.0/html/', {
// render = views(config.static.html, {
//   	map: { html: 'handlebars' }
// });

function setRender(stat){
    console.log('模板渲染')
    console.log('================='+__filename+' setRender');
    console.log('-');
    console.log('-');
    console.log('-');
    if(stat && stat==='dev'){
        return views(config.static.test.html, {
          	map: { html: 'handlebars' }
        });
    }
    else{
        if (stat
            &&
           (stat === 'ngdev'
            || stat === 'ngpro'
            || stat === 'avdev'
            || stat === 'avpro')
        ){
            return views(config.static.html, {
              	map: { html: 'swig' }
            });
        }
        else
            return views(config.static.html, {
              	map: { html: 'handlebars' }
            });
    }
}


module.exports = setRender
