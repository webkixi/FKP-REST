fs = require 'fs'
path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
config = require '../configs/config.coffee'

module.exports = (gulp,$)->
    return ()->
        gulp.src [config.dirs.src + '/css/_copy2dist/**/*.*', config.dirs.src + '/css/modules/**/*.*']
            # .pipe $.newer(config.cssDevPath+'/t/')
            .pipe($.plumber())
            # .pipe $.rimraf()
            .pipe ($.if('*.sass', (if $.sass then $.sass() else $.empty()) ))
            .pipe ($.if('*.scss', (if $.sass then $.sass() else $.empty()) ))
            .pipe ($.if('*.less', (if $.less then $.less() else $.empty()) ))
            .pipe ($.if('*.styl', (if $.stylus then $.stylus() else $.empty()) ))
            .pipe ($.if('*.stylus', (if $.stylus then $.stylus() else $.empty()) ))
            .pipe $.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')
            .pipe $.minifyCss()
            .pipe $.size()
            .pipe $.rename({'extname': '.css'})
            # .pipe $.copyExt()
            .pipe gulp.dest(config.cssDevPath+'/t/')
