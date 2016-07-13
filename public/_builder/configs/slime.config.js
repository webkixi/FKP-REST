var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    __ = require('lodash'),
    marked = require('marked'),
    through = require('through2'),
    gutil = require('gulp-util'),
    $extend = require('extend'),
    webpack = require('webpack'),
    configs = require('./config'),
    alias = require('./webpack.alias.js'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    $ = require('gulp-load-plugins')();

    process.env.NODE_ENV = process.env.NODE_ENV || "development";


function getObjType(object){
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

function clone(target){
    var t = getObjType(target);
    return t === 'Object' ? $extend(true, {}, target) : t === 'Array' ? $extend(true, [], target) : target;
}

function guid(prefix) {
    prefix = prefix || "web-";
    return (prefix + Math.random() + Math.random()).replace(/0\./g, "");
}

function chkType(type){
    var all = {
        style: ['css', 'scss', 'sass', 'less', 'stylus', 'styl'],
        templet: ['hbs', 'swig', 'htm', 'html', 'php', 'jsp'],
        script: ['js', 'jsx', 'coffee', 'cjsx', 'ts', 'tsx']
    }
    for(var item in all){
        var isType = item;
        var arys = all[item];
        if(__.indexOf(arys,type)>-1)
            return isType;
    }
    return false;
}

function clog(msg){
    console.log('-----------------------');
    console.log('-----------------------');
    console.log('-----------------------');
    console.log(msg);
}

/**
 * 获取目录结构
 */
var config = configs.dirs;

/*
 * author: ralf
 * 将目录打包成一个文件准备
*/
var package_name;

function initDir(aryDir, fatherDirName, isPack, depth){
    var entrys={},
        package_ary = [];
    // make directory json
    function readPageDir(subDir, isPack, depth) {
        package_ary = [];

        var dirs = (subDir && subDir.fs) || aryDir;
        // var dirsPath = (subDir && subDir.path) || config.pages;
        var dirsPath = (subDir && subDir.path) || fatherDirName;

        var sameName = false;
        dirs.forEach(function(item) {

            var _filename = (subDir && subDir.filename) || item;
            var name = (subDir && subDir.name) || item;

            // if(fs.statSync(dirsPath + '/' + _filename) && fs.statSync(dirsPath + '/' + _filename).isFile()){
            //     _filename = path.parse(_filename).name;
            // }

            //如果是目录
            // 忽略下划线目录，如_test, _xxx
            if ( depth && fs.statSync(dirsPath + '/' + item).isDirectory() && item.indexOf('_')!=0) {
                //获取目录里的脚本合并
                var data = {
                    name: item,
                    path: dirsPath + '/' + item,
                    fs: fs.readdirSync(dirsPath + '/' + item),
                    filename: (subDir && subDir.filename + "-" + item) || item
                };
                readPageDir(data, isPack, depth);
            }

            else
                if(fs.statSync(dirsPath + '/' + item).isFile()){
                    var ext = path.extname(dirsPath + '/' + item);
                    if(chkType(ext.replace('.',''))||ext==='.md'){
                        // 如果存在同名js
                        if (!sameName) {
                            if (name == item.replace(ext, '')) {
                                entrys[_filename] = [dirsPath + '/' + item];
                                sameName = true;
                            }
                            else {
                                entrys[_filename] = entrys[_filename] || [];
                                entrys[_filename].push(dirsPath + '/' + item);
                            }
                        }
                    }
                }
        });
    }

    readPageDir(null, isPack, opts.depth);

    if(isPack){
        for(var name in entrys){
            // package_ary.concat(clone(entrys[name]));
            if(entrys[name].length){
                entrys[name].map(function(item,i){
                   package_ary.push(item);
                });
            }
        }
        entrys = {};
        entrys[package_name] = package_ary;
    }
    return entrys
}


//make webpack plugins
var plugins = function(dirname, isPack, options){

    var venders,
        _watch = options && options.watch,
        ret_plugins = [
            // new webpack.optimize.OccurenceOrderPlugin(),
            // new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.IgnorePlugin(/vertx/), // https://github.com/webpack/webpack/issues/353
            new ExtractTextPlugin("../css/[name].css", {
                allChunks: isPack === true ? true : false
            }),
            // new webpack.DefinePlugin({
            //     'process.env': {
            //         NODE_ENV: '"development"'
            //     }
            // })
            //new webpack.HotModuleReplacementPlugin(),
        ],
        common_trunk_config = {
            name: '_common',
            filename: '_common.js',
            minChunks: 3,   //Infinity
            async: false
            //children: true
        }

    // 由gulp watch传过来的编译，直接返回
    if (_watch){
        ret_plugins.push( new webpack.optimize.DedupePlugin() )
        return ret_plugins;
    }


    if(options && options.type){
        if(options.type.toString().indexOf('ss')>-1 || options.type === 'stylus' || options.type === 'styl'){
            dirname = 'noCommon';
        }
    }

    if(getObjType(dirname)==='String' && dirname !== 'pages'){
        common_trunk_config.filename = "_normal.js";
    }

    if(dirname && getObjType(dirname)==='Object'){
        venders = dirname;
    }

    //commonstrunk plugin
    if(dirname !== 'noCommon'){
        if(venders && getObjType(venders)==='Object'){
            for(var _v in venders){
                ret_plugins.push(
                    new webpack.optimize.CommonsChunkPlugin(_v, _v+'.js', 2)
                    // new webpack.optimize.CommonsChunkPlugin(item+'.js',venders[item],'Infinity')
                )
            }
        }
        else{
            ret_plugins.push( new webpack.optimize.CommonsChunkPlugin(common_trunk_config) )
        }
    }

    ret_plugins.push( new webpack.optimize.DedupePlugin() )

    return ret_plugins;
}




// 开发环境下的babel配置
var babelrcObject = {
  "presets": ["react", "es2015", "stage-0"],

  "plugins": [
    "transform-runtime",
    // "add-module-exports",
    // "transform-decorators-legacy",
    // "transform-react-display-name"
  ],

  "env": {
    "development": {
      "plugins": [
        "typecheck",
        ["react-transform", {
            "transforms": [{
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"]
              }
            ]
        }]
      ]
    },
    "dev": {
      "plugins": [
        "typecheck",
        ["react-transform", {
            "transforms": [{
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"]
              }
            ]
        }]
      ]
    }
  }
}

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
var reactTransform = null;
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  var plugin = babelLoaderQuery.plugins[i];
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin;
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', {transforms: []}];
  babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []});
}

// make sure react-transform-hmr is enabled
// reactTransform[1].transforms.push({
//   transform: 'react-transform-hmr',
//   imports: ['react'],
//   locals: ['module']
// });

//make webpack loaders
var custom_modules = function(opts){

    var loaders =  [
        { test: /\.cjsx$/, loaders: ['react-hot', 'coffee', 'cjsx'] }
        ,{ test: /\.coffee$/, loader: 'coffee', exclude: [/common/, /node_modules/] }
        ,{ test: /\.hbs$/, loader: "handlebars-loader" }
        ,{ test: /[\/\\]js[\/\\](vendor|vendor_custom|global)[\/\\]/,   //http://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
          loader: "script-loader"   //不做任何处理
        }
        ,{ test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader") }
        // ,{ test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader',"raw!sass") }
        ,{ test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader',"raw!less") }
        ,{ test: /\.rt$/, loader: "react-templates-loader" }
        ,{ test: /\.md$/, loader: "html!markdown" }
        ,{ test: /\.json$/, loader: "json-loader" }
        ,{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" }
        ,{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" }
        ,{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" }
        ,{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" }
        ,{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
        ,{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest
        //,{ test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }

        // { // Only apply on tinymce/tinymce
        //     include: require.resolve('tinymce/tinymce'),    //检测到路径包含tinymce/tinymce
        //     // Export window.tinymce
        //     loader: 'exports?window.tinymce',             //输出全局变量tinymce
        // },
    ]

    if (configs.babel){

        require('babel-polyfill');
        var _babel = 'babel'
        if (opts.env === 'pro'){
            _babel = 'babel'
        }
        else {
            _babel = 'babel?' + JSON.stringify(babelLoaderQuery)
        }
        loaders.push(
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components|_builder|dist)/,
                loader: _babel
                // loader: "babel-loader!jsx-loader"
                // loaders: ['react-hot', 'jsx?harmony']
                // query: {
                //     presets: ['react', 'es2015', 'stage-0']
                // }
            }
        )
        loaders.push(
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components|_builder|dist)/,
              loader: "babel"
              // query:{ compact: 'auto' }
            }
        )
    }
    else {
        loaders.push(
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components|_builder|dist)/,
                loader: "jsx-loader"
            }
        )
        loaders.push(
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components|_builder|dist)/,
                loader: "ts-loader?compiler=ntypescript",
                // loader: "jsx!awesome-typescript-loader"
            }
        )
    }

    return {loaders};

}

//webpack externals
custom_externals = {
    "jquery": "jQuery",
    "react": "React",
    "$": "jQuery"
}

// module.exports = {
/*
* @isPack  {Boolean}   为true 将会对比 dirname和configs.dirs，如果匹配，会将该目录下所有文件打包为一个文件
* @isPack  {Json}  指定打包的文件
* @sample   concat-common-js.js / webpack.js
*/
module.exports = {
    create: function(dirname,isPack,options){
        var entry = {};

        //init options
        var opts = {
            reanme: undefined,
            type: undefined,
            prepend: [],
            append: [],
            depth: true
        };

        if (options && getObjType(options) === 'Object')
            opts = $extend(true,opts,options);

        //deal with
        var idf_plugins = plugins(dirname, isPack, options),
            idf_externals = custom_externals;

        //string
        //直接读取目录
        if(dirname && getObjType(dirname)==='String'){

            entry = this.readDir(dirname,isPack,options);

            if (entry._src)
                idf_plugins = plugins('noCommon');

            if (/[\/\\]js[\/\\](vendor|vendor_custom|global)[\/\\]/.test(dirname))
                idf_plugins = plugins('noCommon');

            if (entry.noCommon || options.noCommon) {
                idf_plugins = plugins('noCommon');
                delete entry.noCommon;
            }

            if (options.rename && options.rename==='common')
                idf_plugins = plugins('noCommon');
        }

        //json
        else
            if( dirname && getObjType(dirname)==='Object'){
                entry = $extend(true,{},dirname);
                idf_plugins = plugins('noCommon');

                if  (entry.noCommon || options.noCommon)
                    delete entry.noCommon;
                else
                    delete entry.noCommon;
            }

        //array
        else
            if( dirname && getObjType(dirname)==='Array'){
                idf_plugins = plugins('noCommon');
                dirname = opts.prepend.concat(dirname).concat(opts.append);
                entry = {'_ary': dirname};
                entry.key = '_ary';
                entry.value = dirname;
            }

        // console.log(entry);
        // function whichSourceMap(){
        //     if (options && options.env){
        //         var env = options.env;
        //         if (env === 'dev'){
        //             return 'cheap-module-eval-source-map'
        //         }
        //         else {
        //             return 'cheap-source-map'
        //         }
        //     }
        // }

        return {
            cache: true,
            debug: true,
            // devtool: "source-map",
            // devtool: "cheap-module-eval-source-map",
            // devtool: "cheap-source-map",
            recursive: true,
            entry: entry,
            output: {
                path: (function(){
                    if (options.env === 'pro'){
                        return path.join(__dirname,'../../', config.dist + '/' + configs.version + '/js/');
                    }
                    return path.join(__dirname,'../../', config.dist + '/' + configs.version + '/dev/js/');
                })(),
                // publicPath: '../../' + configs.version + '/dev/js/',
                publicPath: '/js/',
                filename: (function(){
                    if (options.env === 'pro'){
                        return '[name]__[hash].js'
                    }
                    return configs.hash ? '[name]__[hash].js' : '[name].js'
                })()
            },
            externals: idf_externals,
            plugins: idf_plugins,
            resolve: {
                root: path.resolve(__dirname),
                alias: alias,
                extensions: ['', '.js', '.jsx', '.ts', '.tsx','.cjsx', '.coffee', '.html', '.css', '.scss','.less','.hbs', '.rt','.md'],
                modulesDirectories: ["node_modules"],
            },
            module: custom_modules(options),
            ts: {
                compiler: 'ntypescript'
            },
            // resolveLoader: {
            //     alias: {
            //         'ts-loader': require('ts-loader')
            //     }
            // }
        }
    },

    build: function(dirname,isPack,options,cb){

        if(!isPack)
            isPack = false;

        if(getObjType(isPack)==='Object'){
            options = clone(isPack);
            isPack = false;
        }

        if(getObjType(isPack)==='Function'){
            cb = isPack;
            isPack = false;
        }

        if(!options)
            options = {};

        if(getObjType(options)==='Function'){
            cb = options;
            options = {};
        }

        if(getObjType(cb)!=='Function')
            cb = undefined;

        var entrys, tmpKey, tmpValue, entry={},
            type = (options && options.type) ? options.type : 'js',
            staticType = chkType(type),
            _webpackDevCompiler,
            _webpackDevConfig = staticType !== 'templet' ? this.create(dirname,isPack,options) : this.create(dirname,true,options);
            _webpackDevConfig.devtool = 'cheap-module-eval-source-map'
            if (options && options.env){
                var env = options.env;
                if (env === 'pro'){
                    // delete _webpackDevConfig.devtool
                    _webpackDevConfig.devtool = 'cheap-source-map'
                }
            }

            entry = _webpackDevConfig.entry;
            entrys = clone(entry);   //clone entry


        //数组或单文件，强制不进行合并，分别生成
        //如果需要合并，用json传进来
        // js css
        if(entrys._ary || entrys._src){
            isPack = false;

            if(options.rename &&
            getObjType(options.rename) === 'String' &&
            options.rename !== ''){

                isPack = true;
                entrys = {};
                entrys[options.rename] = entry._ary || entry._src;
                entrys.key = options.rename;
                entrys.value = entry._ary;
                if(staticType === 'script'){
                    _webpackDevConfig.entry = entrys
                }
            }
        }


        //html hbs php
        if( staticType === 'templet')
            isPack = true;

        if (entrys){
            if(entrys.key){
                tmpKey = clone(entrys.key);
                tmpValue = clone(entrys.value);
                delete entrys.key;
                delete entrys.value;

                delete entry.key;
                delete entry.value;
            }

              //parse sass scss less css stylus
              function doStyle(){
                  var _md5 = options.env === 'pro' ? true : false;

                  var _cssDistPath = configs.cssDevPath,
                      _imgDistPath = configs.imagesDevPath;
                  if (options.env==='pro'){
                      _cssDistPath = configs.cssBuildPath;
                      _imgDistPath = configs.imagesBuildPath;
                  }
                  var cssstyle = $.less||$.empty;
                  switch (type) {
                      case 'sass':
                          cssstyle = $.sass||$.empty;
                          break;
                      case 'scss':
                          cssstyle = $.sass||$.empty;
                          break;
                      case 'styl':
                          cssstyle = $.stylus||$.empty;
                          break;
                      case 'stylus':
                          cssstyle = $.stylus||$.empty;
                          break;
                      default:

                  }
                  for(var file in entrys){
                      if(entrys[file].length){
                          (function(item){
                              gulp.src(entrys[item])
                              //   .pipe($.newer(path.join(__dirname,'../../',configs.cssDevPath, item+'.css') ))
                              .pipe($.plumber())
                              //   .pipe ($.rimraf())
                              .pipe (cssstyle())
                              //   .pipe ($.if('*.sass', $.sass() ))
                              //   .pipe ($.if('*.scss', $.sass() ))
                              //   .pipe ($.if('*.less', $.less() ))
                              //   .pipe ($.if('*.styl', $.stylus() ))
                              //   .pipe ($.if('*.stylus', $.stylus() ))
                              .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
                              .pipe($.size())
                              // .pipe($.sass())
                              .pipe( (entry._src||entry._ary) ? $.rename({'extname': '.css'}) : $.concat(item + ".css"))
                              .pipe($.if(_md5, $.minifyCss() ))
                              .pipe($.if(_md5, $.size() ))
                              .pipe($.if(_md5, $.md5({size: 10, separator: '__'}) ))
                              .pipe(gulp.dest(_cssDistPath))

                              //雪碧图
                              //config 是 configs 的子集
                              //   gulp.src(entrys[item])
                              //   .pipe ($.newer(_imgDistPath))
                                // .pipe ($.plumber())
                            //   .pipe ($.map(file){
                              //
                            //   })
                              .pipe ($.cssSpritesmith({
                                  // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
                                //   imagepath: configs.imagesDevPath + 'slice/',
                                  imagepath: _imgDistPath + 'slice/demo/',
                                  // 映射CSS中背景路径，支持函数和数组，默认为 null
                                  imagepath_map: null,
                                  // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
                                  // 基于静态css文件的相对路径
                                  spritedest: '../images/sprite/demo/',
                                  // 替换后的背景路径，默认 ../images/
                                  // 基于静态css文件的相对路径
                                  spritepath: '../images/sprite/demo/',
                                  // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
                                  padding: 20,
                                  // 是否使用 image-set 作为2x图片实现，默认不使用
                                  useimageset: false,
                                  // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
                                  newsprite: false,
                                  // 给雪碧图追加时间戳，默认不追加
                                  spritestamp: false,
                                  // 在CSS文件末尾追加时间戳，默认不追加
                                  cssstamp: false
                              } ))
                              .pipe ($.debug({title: 'sprite:'} ))
                              .pipe ($.if('*.png', gulp.dest(_imgDistPath)))
                              .pipe ($.if('*.css', gulp.dest('./')))

                          })(file);
                      }
                  }
                  /* webpack的方式处理静态css */
                //   if(type && (type==='sass' || type==='scss')){
                //       //gulp deal with style
                //       //something on up
                //   }
                //   else{
                //       //if webpack sass-loader has fixed , then can use this module,
                //       //node: edit fllow some code;
                //       _webpackDevCompiler = webpack(_webpackDevConfig);
                //       _webpackDevCompiler.run(function(err, stats){
                //           if(err){
                //               throw new gutil.PluginError('[webpack]', err) ;
                //           }
                //           gutil.log('[webpack]', stats.toString({ colors: true } )) ;
                //           if(cb) cb();
                //       });
                //   }
              }

            //parse js jsx cjsx coffee ...
            function doScript(options){
                var nEntry = {},ie={},common={},nowp={};
                var tary;
                var tkey;
                if ( entrys._src||entrys._ary ){
                    tary = entrys._src||entrys._ary;
                    tary.map(function(item){
                        tkey = path.parse(item).name;
                        nEntry[tkey] = item;
                    });
                }
                else
                  nEntry = entrys;


                if(nEntry.hasOwnProperty('ie')){
                    nowp.ie = clone(nEntry.ie);
                    delete nEntry.ie;
                }
                if(nEntry.hasOwnProperty('common')){
                    nowp.common = clone(nEntry.common);
                    delete nEntry.common;
                }
                if(options.method === 'gulp')
                    nowp = nEntry;

                var _md5 = options.env === 'pro' ? true : false;
                if(options.method === 'gulp'|| nowp.ie || nowp.common){
                    var _dist = options.env === 'pro'
                                ? path.join(__dirname,'../../', config.dist + '/' + configs.version + '/js/')
                                : path.join(__dirname,'../../', config.dist + '/' + configs.version + '/dev/js/')
                    for(var file in nowp){
                        if(nowp[file].length){
                            (function(item){
                                gulp.src(nowp[item])
                                // .pipe($.newer(path.join(__dirname,'../../',configs.jsDevPath, item+'.js') ))
                                .pipe($.plumber())
                                // .pipe $.rimraf()
                                .pipe($.concat(item+'.js'))
                                .pipe($.if(_md5, $.uglify() ))
                                .pipe($.if(_md5, $.md5({size: 10, separator: '__'}) ))
                                .pipe(gulp.dest(_dist))
                                // .pipe($.map(function(file){
                                //
                                // }))
                            })(file)
                        }
                    }
                }
                else{
                    _webpackDevConfig.entry = nEntry;
                    if (_md5){
                        _webpackDevConfig.plugins.push(
                            new webpack.optimize.UglifyJsPlugin({compress:{warnings: false} })
                        )
                        console.log(_webpackDevConfig);
                    }
                    _webpackDevCompiler = webpack(_webpackDevConfig);
                    _webpackDevCompiler.run(function(err, stats){
                        if (err)
                            throw new gutil.PluginError('[webpack]', err) ;

                        gutil.log('[webpack]', stats.toString({ colors: true } )) ;

                        if (cb)
                          cb();
                    });
                }
            }

            //parse html hbs swig ...
            function doTemplet(){
                var list = {};
                var indexList = {};
                var tmpObj;
                var baseHtmlPath = path.join(config.src,'html/');

                tmpValue = entrys[tmpKey];

                //获取数据
                function getHtmlData(){

                    function fileProfile(file, enc, cb){
                        //json数据可以在这里导入
                        //md文件扫描
                        var data={}, api,
                        _fileParse = path.parse(file.path),
                        _filename = _fileParse.name,
                        _filePath = file.path.replace(path.resolve(baseHtmlPath),'').substring(1).replace(_fileParse.ext,'');
                        _fileTmp = path.parse(_filePath);
                        if(_fileTmp.dir === _fileTmp.name)
                            _filePath = _fileTmp.dir;
                        else
                            _filePath = _filePath.replace(/[\\|\/]/g,'-');

                        data.commoncss = 'common.css';
                        data.commonjs = 'common.js';
                        data.pagecss = _filePath+'.css';
                        data.pagejs = _filePath+'.js';

                        if (typeof options.data !=='undefined')
                            data = $extend(true,data,options.data);


                        if (typeof options.api !=='undefined')
                            api = clone(options.api);


                        if (_filename in data)
                            data = $extend(data,data[_filename]);


                        file.data = data;

                        if (api && (_filename in api)){
                          /*todo something*/
                        }

                        cb(null,file);
                    }
                    return through.obj(fileProfile);
                }

                function getMd(){
                    var hasMermaid = false;
                    return through.obj(function (file, enc, cb) {
                        if (file.isNull()) {
                            cb(null, file);
                            return;
                        }

                        if (file.isStream()) {
                            cb(new gutil.PluginError('gulp-markdown', 'Streaming not supported'));
                            return;
                        }

                        var mdtemp = fs.readFileSync(path.join(config.src,'html/_common/templet/md.hbs'),'utf-8');
                        // var renderer = new marked.Renderer();
                        // renderer.defaultCode = renderer.code
                        // renderer.code = function(code, language){
                        //     if(language==='flow'){
                        //         html = ''
                        //         if(!hasMermaid){
                        //             hasMermaid = true
                        //             html += ''
                        //             html + ' '+code+' '
                        //         }
                        //     }else{
                        //         this.defaultCode(code, language)
                        //     }
                        // }

                        marked.setOptions({
                          renderer: new marked.Renderer(),
                          gfm: true,
                          tables: true,
                          breaks: false,
                          pedantic: false,
                          sanitize: true,
                          smartLists: true,
                          smartypants: false
                        });
                        marked(file.contents.toString(), options, function (err, data) {
                            if (err) {
                                cb(new gutil.PluginError('gulp-markdown', err, {fileName: file.path}));
                                return;
                            }
                            mdtemp = mdtemp.replace('~~md~~',data);

                            var re = /<h2[^>]?.*>(.*)<\/h2>/ig;
                            var mdMenu='', mdMenuList = data.match(re);
                            if(mdMenuList&&mdMenuList.length){
                                mdMenuList.map(function(item){
                                    mdMenu += '<li>'+ re.exec(item)[1]+'</li>\n\r';
                                    re.lastIndex = 0;
                                })
                            }
                            data = mdtemp.replace('~~md-menu~~',mdMenu);

                            file.contents = new Buffer(data);
                            file.path = gutil.replaceExtension(file.path, '_md.html');
                            cb(null, file);
                        });
                    });
                }


                /*
                * parse hbs to html
                * make index list
                */
                function parseHbs(){
                  var parseTemplet = true;
                  var _htmlDistPath = configs.htmlDevPath
                  if ( options.env ) {
                      clog('parse hbs:' + options.env)
                      if ( ['pro', 'dev'].indexOf(options.env)>-1){
                    //   if ( options.env === 'pro'){
                          parseTemplet = false;
                          if (options.env === 'pro'){
                              _htmlDistPath = configs.htmlBuildPath;
                          }

                      }
                  }

                  gulp.src(tmpValue,{ base: baseHtmlPath })
                  .pipe (function(){
                      function testfun(file,enc,cb){
                          var ext_name = path.parse(file.path).ext.replace('.','');
                          if(chkType(ext_name)|| ext_name === 'md'){
                              this.push(file);
                              cb();
                          }
                          else
                              cb();
                      }
                      return through.obj(testfun)
                  }())
                  .pipe ($.newer(configs.htmlDevPath))
                  .pipe ($.plumber())
                  .pipe ($.if('*.md', getMd()))
                  .pipe ($.fileInclude({
                      prefix: '@@',
                      basepath: '@file',
                      test: '123456',
                      context: {
                          dev: !gutil.env.production
                      }
                  }))
                  .pipe ($.size())
                  .pipe ( getHtmlData())
                  .pipe ($.if(parseTemplet, $.compileHandlebars()))
                  //.pipe ($.if('demoindex.*', $.compileHandlebars()))
                  .pipe ($.rename(function(path){
                      if  (path.extname!=='.php' || path.extname!=='.jsp'){
                          if(path.extname === '.md')
                              path.extname = '.md.html';
                          else
                              path.extname = '.html'
                      }
                  }))
                  .pipe (gulp.dest(_htmlDistPath))
                }

                parseHbs();
            }

            switch(staticType){
              case 'script':
                  doScript(options);
                  break;
              case 'style':
                  doStyle();
                  break;
              case 'templet':
                  doTemplet();
                  break;
              default:
                  doScript(options);
            }
        }//end if entry
    },

    readDir: function(dirname,isPack,options){
        opts = {
            reanme: undefined,
            type: undefined,
            prepend: [],
            append: [],
            depth: true
        };

        if (options && getObjType(options) === 'Object')
            opts = $extend(true,opts,options);


        var entry = {};
        var pagesDir=undefined;
        var default_dir = dirname;
        var prepend=[],
            append=[],
            styleType = false,
            requireCssList = '',
            rename = opts.rename ? opts.rename : undefined,
            type = opts.type ? opts.type : undefined,
            staticType = chkType(type);

            //全局变量
            package_name='';

            //匹配configs.dirs
            //config.dirs为预定以的目录文件
            //config的定义在最顶层，这个命名有点悬
            for (var item in config){
                if(item === dirname){
                    pagesDir = fs.readdirSync(config[item]);
                    default_dir = config[item];
                    package_name = isPack === true ? dirname : '';
                }
            }

            if (!pagesDir){
              //直接匹配目录
              if (!fs.existsSync(dirname)) {
                  throw new Error("==============Error: you must identify a entry");
                  return false;
              }
              else{
                  if(fs.statSync(dirname).isDirectory()){
                      pagesDir = fs.readdirSync(dirname);
                      package_name = isPack === true ? path.basename(dirname) : '';
                  }
                  else
                    if(fs.statSync(dirname).isFile()){
                        var ultimates = [dirname];
                        ultimates = prepend.concat(ultimates).concat(append);
                        return {
                            '_src' : ultimates,
                            'key'  : '_src',
                            'value': ultimates
                        }
                  }
              }
          }

          if (pagesDir){
              //生成entry 全局
              // readPageDir(null, isPack, opts.depth);
              entry = initDir(pagesDir, default_dir, isPack, opts.depth);

              var ultimates = [],
                  ext = staticType==='script' ? 'js' : type;

              //sass使用gulp解析，其他使用webpack解析
              if  (type=='less' ||type==='stylus' ||type==='css' ||type==='styl')
                  styleType = true;

              if  (isPack){
                  //merge prepend or append
                  for (var item in entry){
                      package_name = item;
                      prepend = (opts.prepend && getObjType(opts.prepend)==='Array') ? opts.prepend : [],
                      append = (opts.append && getObjType(opts.append)==='Array') ? opts.append : [];
                      ultimates = prepend.concat(entry[item])
                      ultimates = ultimates.concat(append);
                  }

                  package_name = rename ? rename : package_name;

                  if  (staticType==='style'|| staticType==='script'){
                      for (var i=0; i<ultimates.length; i++){
                          ultimates[i] = ultimates[i].replace('//', '/')
                          //放弃webpack打包
                          staticType === 'style'
                          ? requireCssList += '@import "'+ultimates[i]+'";\n'
                          : requireCssList += 'require("'+ultimates[i]+'");\n';
                      }

                      var tmpFile = guid(),
                          tmpDir = config.dist + '/_tmp',
                          tmpFile = config.dist + '/_tmp/'+tmpFile+'.'+ext;

                          gulp.task('cleantmp', function(){
                              gulp.src(tmpDir+'/*.*', { read: false })
                              .pipe($.rimraf())
                          })

                      if (!fs.existsSync(tmpDir)) {
                          fs.mkdirSync(tmpDir);
                          fs.writeFileSync( tmpFile , requireCssList) ;
                      }
                      else{
                          gulp.start('cleantmp')
                          fs.writeFileSync( tmpFile , requireCssList) ;
                      }


                      entry = {};
                      entry[package_name] = [tmpFile];
                      entry['key'] = package_name;
                      entry['value'] = [tmpFile];
                  }
                  else{
                      entry = {};
                      entry[package_name] = ultimates;
                      entry['key'] = package_name;
                      entry['value'] = ultimates;
                  }
              }
              //isPack===false
              else{ }
        }

        return entry;
    }
}

// module.exports.resolveLoader = { alias: { 'ts-loader': require('ts-loader') } }
