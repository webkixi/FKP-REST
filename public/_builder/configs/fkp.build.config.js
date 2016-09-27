var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    _ = require('lodash'),
    marked = require('marked'),
    through = require('through2'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    configs = require('./config'),
    alias = require('./webpack.alias.js'),
    $ = require('gulp-load-plugins')();

var base = require('./common/base')

function chkType(type) {
    var all = {
      style: ['css', 'scss', 'sass', 'less', 'stylus', 'styl'],
      templet: ['hbs', 'swig', 'htm', 'html', 'php', 'jsp'],
      script: ['js', 'jsx', 'coffee', 'cjsx', 'ts', 'tsx']
    }

    for (var item in all) {
      var isType = item;
      var arys = all[item];
      if (_.indexOf(arys, type) > -1) return isType;
    }

    return false;
}


function initDir(aryDir, fatherDirName, isPack, depth) {
  var entrys = {},
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
          if (depth && fs.statSync(dirsPath + '/' + item).isDirectory() && item.indexOf('_') != 0) {
              //获取目录里的脚本合并
              var data = {
                  name: item,
                  path: dirsPath + '/' + item,
                  fs: fs.readdirSync(dirsPath + '/' + item),
                  filename: (subDir && subDir.filename + "-" + item) || item
              };
              readPageDir(data, isPack, depth);
          } else
          if (fs.statSync(dirsPath + '/' + item).isFile()) {
              var ext = path.extname(dirsPath + '/' + item);
              if (chkType(ext.replace('.', '')) || ext === '.md') {
                  // 如果存在同名js
                  if (!sameName) {
                      if (name == item.replace(ext, '')) {
                          entrys[_filename] = [dirsPath + '/' + item];
                          sameName = true;
                      } else {
                          entrys[_filename] = entrys[_filename] || [];
                          entrys[_filename].push(dirsPath + '/' + item);
                      }
                  }
              }
          }
      });
  }

  readPageDir(null, isPack, opts.depth);

  if (isPack) {
      for (var name in entrys) {
          // package_ary.concat(clone(entrys[name]));
          if (entrys[name].length) {
              entrys[name].map(function(item, i) {
                  package_ary.push(item);
              });
          }
      }
      entrys = {};
      entrys[package_name] = package_ary;
  }
  return entrys
}




var FkpBuild = base.class.create()
FkpBuild.prototype = {
init: function(){
  this.dirname = arguments[0]
  this.isPack = arguments[1]
  this.options = arguments[2]
  this.cb = arguments[3]
  this.package_name = ''
},

readDirs: function(dirname, isPack, options) {
  var tmp = {}, _this = this;
  if (typeof dirname === 'string')
    return this.readDir(dirname, isPack, options)

  else if (_.isArray(dirname)){
    dirname.map(function(item, i) {
      var _tmp = _this.readDir(item, isPack, options);
      tmp = _.assign(tmp, _tmp)
    })
  }

  return tmp;
},

readDir: function(dirname, isPack, options) {
    var dirs = configs.dirs
    var opts = {
      reanme: undefined,
      type: undefined,
      prepend: [],
      append: [],
      depth: true
    };

    if (options && _.isObject(options))
      opts = _.extend(opts, options)

    var entry = {},
        pagesDir,

        default_dir = dirname,
        preDefineDir = dirname,

        prepend = _.isArray(opts.prepend) ? opts.prepend : [],
        append = _.isArray(opts.append) ? opts.append : [],
        styleType = false,
        requireCssList = '',
        rename = opts.rename ? opts.rename : undefined,
        type = opts.type ? opts.type : undefined,
        staticType = chkType(type);

    //包名
    var package_name = '';

    //configs.dirs
    //预定义目录
    for (var item in dirs) {
        if (item === dirname) {
          pagesDir = fs.readdirSync(dirs[item]);
          preDefineDir = dirs[item];
          package_name = isPack === true ? dirname : '';
        }
    }

    if (!pagesDir) {
        if (!fs.existsSync(dirname)) {
          throw new Error("==============Error: you must identify a entry");
          return false;
        }
        //直接匹配
        else {
          if (fs.statSync(dirname).isDirectory()) {  //目录
            pagesDir = fs.readdirSync(dirname);
            package_name = isPack === true ? path.basename(dirname) : '';
          }

          else if ( fs.statSync(dirname).isFile() ){   // 文件
            var ultimates = [dirname];
                ultimates = prepend.concat(ultimates).concat(append);
            return {
              '_src': ultimates,
              'key': '_src',
              'value': ultimates
            }
          }
        }
    }

    if (pagesDir) {
        // 生成entry
        var entry = initDir(pagesDir, preDefineDir, isPack, opts.depth);

        var ultimates = [],
            ext = staticType === 'script' ? 'js' : type;

        //sass使用gulp解析，其他使用webpack解析
        if (type == 'less' || type === 'stylus' || type === 'css' || type === 'styl')
            styleType = true;

        if (isPack) {
            //merge prepend or append
            for (var item in entry) {
              package_name = item;
              ultimates = _.concat(prepend, entry[item], append)
            }

            if (rename) package_name = rename

            if (staticType === 'style') {
              for (var i = 0; i < ultimates.length; i++) {
                ultimates[i] = ultimates[i].replace('//', '/')
                //放弃webpack打包
                staticType === 'style' ? requireCssList += '@import "' + ultimates[i] + '";\n' : requireCssList += 'require("' + ultimates[i] + '");\n';
              }

              var tmpFile = _.uniqueId('build-'),
                  tmpDir = dirs.dist + '/_tmp',
                  tmpFile = dirs.dist + '/_tmp/' + tmpFile + '.' + ext;

              gulp.task('cleantmp', function() {
                  return gulp.src(tmpDir + '/*.*', { read: false })
                    .pipe($.rimraf())
              })

              if (!fs.existsSync(tmpDir)) {
                  fs.mkdirSync(tmpDir);
                  fs.writeFileSync(tmpFile, requireCssList);
              } else {
                  gulp.start('cleantmp')
                  fs.writeFileSync(tmpFile, requireCssList);
              }

              entry = {};
              entry[package_name] = [tmpFile];
              entry['key'] = package_name;
              entry['value'] = [tmpFile];
            } else {
              entry = {};
              entry[package_name] = ultimates;
              entry['key'] = package_name;
              entry['value'] = ultimates;
            }
            this.package_name = package_name;
        }
    }
    return entry;
  }


}

var Build = base.inherits( FkpBuild, {

})

function build(){
  return new Build(arguments)
}
