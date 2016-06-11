fs = require 'fs'
path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
config = require '../configs/config.coffee'


module.exports = (gulp, $, slime, env)->
    return ()->
        if (env == 'pro')
            _dist = config.fontsBuildPath
        else
            _dist = config.fontsDevPath

        gulp.src config.dirs.src + '/fonts/**/*.*'
            # .pipe $.newer(config.fontsDevPath)
            # .pipe($.plumber())
            # .pipe $.rimraf()
            .pipe $.size()
            .pipe gulp.dest(_dist)
