fs = require 'fs'
path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
config = require '../configs/config.coffee'


module.exports = (gulp,$)->
    return ()->
        gulp.src config.dirs.src + '/js/_copy2dist/**/*.*'
            # .pipe $.newer(config.jsDevPath+'/t/')
            .pipe($.plumber())
            # .pipe $.rimraf()
            # .pipe $.uglify()
            .pipe $.size()
            # .pipe $.copyExt()
            .pipe gulp.dest(config.jsDevPath+'/t/')
