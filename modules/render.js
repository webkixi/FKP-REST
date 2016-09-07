/**
 * Module dependencies.
 */
var path = require('path');
var views = require('co-views');


function setRender(stat){
    console.log('模板渲染')
    console.log('================='+__filename+' setRender');
    console.log('-');
    console.log('-');
    console.log('-');
    // var _html = path.join(__dirname, '../', fkpConfig.static.dev.html);
    // var __html = path.join(__dirname, '../', fkpConfig.static.html);
    var _html = fkpConfig.static.dev.html;
    var __html = fkpConfig.static.html;

    var _map = { html: 'handlebars' };
    var __map = { html: 'swig' };

    if(stat && stat==='dev'){
      return views(_html, {
        	map: _map
      });
    }

    else if(stat && stat==='pro'){
      return views(__html, {
        	map: _map
      });
    }

    else {
      if (['ngdev', 'avdev'].indexOf(stat)>-1){
        return views(_html, {
          	map: __map
        });
      }

      else if (['ngpro', 'avpro'].indexOf(stat)>-1){
        return views(__html, {
          	map: __map
        });
      }

      else {
        return views(__html, {
          	map: _map
        });
      }
    }

    // if(stat && stat==='dev'){
    //     return views(_html, {
    //       	map: _map
    //     });
    // }
    // else{
    //     if (stat && ['ngdev', 'ngpro', 'avdev', 'avpro'].indexOf(stat)>-1){
    //         return views(__html, {
    //           	map: { html: 'swig' }
    //         });
    //     }
    //     else{
    //         return views(__html, {
    //           map: { html: 'handlebars' }
    //         });
    //     }
    // }
}


module.exports = setRender
