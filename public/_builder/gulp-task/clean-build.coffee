gulp = require 'gulp'
gutil = require 'gulp-util'
config = require '../configs/config.coffee'

module.exports = (gulp,$)->
    return ()->
        gulp.src [config.jsBuildPath, config.cssBuildPath, config.imagesBuildPath, config.fontsBuildPath,config.tmpPath]
            .pipe $.rimraf()
