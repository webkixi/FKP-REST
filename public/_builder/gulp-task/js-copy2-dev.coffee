fs = require 'fs'
path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
config = require '../configs/config.coffee'


module.exports = (gulp,$)->
    return ()->
        gulp.src config.dirs.src + '/js/copy2dist/**/*.*'
            .pipe $.newer(config.jsDevPath)
            .pipe $.size()
            .pipe $.copyExt()
            .pipe gulp.dest(config.jsDevPath+'/t/')
