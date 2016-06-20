/**
 * Module dependencies.
 */
var views = require('co-views-helpers');

function setRender(stat){
    console.log('模板渲染')
    console.log('================='+__filename+' setRender');
    console.log('-');
    console.log('-');
    console.log('-');
    if(stat && stat==='dev'){
        return views(fkpConfig.static.dev.html, {
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
            return views(fkpConfig.static.html, {
              	map: { html: 'swig' }
            });
        }
        else
            return views(fkpConfig.static.html, {
              	map: { html: 'handlebars' }
            });
    }
}


module.exports = setRender
