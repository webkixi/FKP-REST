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
    if(stat && stat==='dev'){
        console.log('++++++++++++&&&&&&&&&&&&&&  render.js');
        return views(config.static.test.html, {
          	map: { html: 'handlebars' }
        });
    }else{
        console.log('++++++++++++&&&&&&&&&&&&&&  render.js');
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
