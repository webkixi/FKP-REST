fs = require 'fs'
path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
config = require '../configs/config.coffee'


module.exports = (gulp,$)->
    return ()->
        gulp.src config.imagesDevPath + '/**/*.*'
            .pipe $.size()
            .pipe $.copyExt()
            .pipe gulp.dest(config.imagesBuildPath)
