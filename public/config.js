var src_dir = './src'
var platform = '/pc'
src_dir = src_dir + platform

var global_dir = './src'+ platform +'/js/global';
var path = require('path');
var cfg = require('../config')
module.exports = {
    name: "FCKJS",
    babel: false,
    version: cfg.version,
    description: "FKP-REST FRONT-END PART",
    port:{
        demo: 9000,
        dev: 8070
    },
    dirs: {
        react: './react',
        src: src_dir,
        dist: "./dist",
        pages: src_dir + "/js/pages",
        modules: src_dir + "/js/modules",
        widgets: src_dir + "/js/widgets",
        global: src_dir + "/js/global",
        vendor: src_dir + "/js/vendor",
        stores: src_dir + "/js/stores",
        mixins: src_dir + "/js/mixins",
        libs: src_dir + "/js/libs",
        image: src_dir + "/images",
        css_common: src_dir + "css/modules/base",

        watch_src: 'src/pc',
        watch_react: 'react',
    },
    hash: false,


    /*
    // 以下配置，用于打包common.js，用于全局
    // fkp的js分为两个部分，公共部分，业务部分
    // 公共部分 common.js，如下列部分
    // 业务部分，对应的js目录为 /public/src/pc/js/pages/.... 对应的文件
    */

    // react15, jq1.11
    vendorList: [
        // [0]开发
        [
            path.join(__dirname, src_dir, '/js/vendor/jquery/dist/jquery.js'),
            path.join(__dirname, src_dir, '/js/vendor/react15/dist/react.js'),
            path.join(__dirname, src_dir, '/js/vendor/react15/dist/react-dom.js')
        ],

        // [1]生产
        [
            path.join(__dirname, src_dir, '/js/vendor/jquery/dist/jquery.js'),
            path.join(__dirname, src_dir, '/js/vendor/react15/dist/react.js'),
            path.join(__dirname, src_dir, '/js/vendor/react15/dist/react-dom.js')
        ]
    ],



    //react, zepto/jq2
    vendorList_adv: [
        // [0]开发
        [
            path.join(__dirname, src_dir, '/js/vendor/jquery2/dist/jquery.js'),
            // path.join(__dirname, src_dir, '/js/vendor/zepto/zepto.js'),

            // react 0.13
            // path.join(__dirname, src_dir, '/js/vendor/react/react-with-addons.js'),

            // react 15
            path.join(__dirname, src_dir, '/js/vendor/react15/src/react.js'),
            path.join(__dirname, src_dir, '/js/vendor/react15/src/react-dom.js'),

            // lodash 4.13.1
            path.join(__dirname, src_dir, '/js/vendor/lodash/src/lodash_full_413.js')
        ],
        
        // [1]生产
        [
            path.join(__dirname, src_dir, '/js/vendor/jquery2/dist/jquery.min.js'),
            // path.join(__dirname, src_dir, '/js/vendor/zepto/zepto.js'),

            // react 0.13
            // path.join(__dirname, src_dir, '/js/vendor/react/react-with-addons.js'),

            // react 15
            path.join(__dirname, src_dir, '/js/vendor/react15/dist/react.min.js'),
            path.join(__dirname, src_dir, '/js/vendor/react15/dist/react-dom.min.js'),

            // lodash 4.13.1
            path.join(__dirname, src_dir, '/js/vendor/lodash/dist/lodash_full_413.min.js')
        ]
    ],



    //angular
    vendorList_ng: [
        [
            path.join(__dirname, src_dir, '/js/vendor/jquery/dist/jquery.js'),
            path.join(__dirname, src_dir, '/js/vendor/angular/angular.js')
        ],
        [
            path.join(__dirname, src_dir, '/js/vendor/jquery/dist/jquery.js'),
            path.join(__dirname, src_dir, '/js/vendor/angular/angular.js')
        ]
    ],




    //backbone
    vendorList_bb: [
        [
            path.join(__dirname, src_dir, '/js/vendor/jquery2/dist/jquery.js'),
            path.join(__dirname, src_dir, '/js/vendor/lodash/src/lodash_full_413.js'),
            path.join(__dirname, src_dir, '/js/vendor/backbone/backbone.js')
        ],
        [
            path.join(__dirname, src_dir, '/js/vendor/jquery2/dist/jquery.js'),
            path.join(__dirname, src_dir, '/js/vendor/lodash/src/lodash_full_413.js'),
            path.join(__dirname, src_dir, '/js/vendor/backbone/backbone.js')
        ]
    ],



// ===================================================================


    //public/src/pc/global
    globalList: [
        path.join(__dirname, src_dir, '/js/vendor_custom/store.js'),   //SA
        path.join(__dirname, src_dir, '/js/global/config.js')
        // path.join(__dirname, src_dir, '/js/global/libs.js'),
        // path.join(__dirname, src_dir, '/js/global/core.js'),
        // path.join(__dirname, src_dir, '/js/global/toolkits.js')
    ],





    //ie
    ieRequireList: (function(){
        if(platform === '/pc'){
            return [
                path.join(__dirname, src_dir, '/js/vendor/console-polyfill/polyfill.js'),
                path.join(__dirname, src_dir, '/js/vendor/html5shiv/dist/html5shiv.js'),
                path.join(__dirname, src_dir, '/js/vendor/respond/dest/respond.src.js'),
                path.join(__dirname, src_dir, '/js/vendor/es5-shim/es5-shim.js'),
                path.join(__dirname, src_dir, '/js/vendor/es5-shim/es5-sham.js'),
                path.join(__dirname, src_dir, '/js/vendor/json2/json2.js')
            ]
        }else{
            return []
        }
    })()


};
