fs = require 'fs'
path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
config = require '../configs/config.coffee'


module.exports = (gulp, $, slime, env)->
    return ()->
        if (env == 'pro')
            _dist = config.imagesBuildPath
        else
            _dist = config.imagesDevPath

        gulp.src config.dirs.src + '/images/**/*.*'
            # .pipe $.newer(config.imagesDevPath)
            .pipe($.plumber())
            # .pipe $.rimraf()
            .pipe $.size()
            .pipe gulp.dest(_dist)
