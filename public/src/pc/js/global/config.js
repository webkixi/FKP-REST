
;(function(global){
  'use strict';
  global.console = global.console || {};
  var con = global.console;
  var prop, method;
  var empty = {};
  var dummy = function() {};
  var properties = 'memory'.split(',');
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
  while (method = methods.pop()) if (!con[method]) con[method] = dummy;


    var config = {
        goods_img: 'http://jh-ljs-goods.oss-cn-shenzhen.aliyuncs.com/',
        account_img:'http://jh-ljs-account.oss-cn-shenzhen.aliyuncs.com/'
    };
    global.CFG = config;

})(typeof window === 'undefined' ? this : window);


// // Console-polyfill. MIT license.
// // https://github.com/paulmillr/console-polyfill
// // Make it safe to do console.log() always.
// (function(global) {
//   'use strict';
//   global.console = global.console || {};
//   var con = global.console;
//   var prop, method;
//   var empty = {};
//   var dummy = function() {};
//   var properties = 'memory'.split(',');
//   var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
//      'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
//      'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
//   while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
//   while (method = methods.pop()) if (!con[method]) con[method] = dummy;
// })(typeof window === 'undefined' ? this : window);
// // Using `this` for web workers while maintaining compatibility with browser
// // targeted script loaders such as Browserify or Webpack where the only way to
// // get to the global object is via `window`.