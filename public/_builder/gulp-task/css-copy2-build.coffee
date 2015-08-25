fs = require 'fs'
path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
config = require '../configs/config.coffee'


# module.exports = (gulp,$)->
#     return ()->
#         gulp.src config.jsDevPath + '/t/**/*.*'
#             .pipe $.size()
#             .pipe $.copyExt()
#             .pipe gulp.dest(config.jsBuildPath+'/t/')

module.exports = (gulp,$)->
    return ()->
        gulp.src [config.dirs.src + '/css/copy2dist/**/*.*', config.dirs.src + '/css/modules/**/*.*']
            .pipe $.newer(config.cssBuildPath)
            .pipe($.plumber())
            # .pipe $.rimraf()
            .pipe ($.if('*.sass', $.sass() ))
            .pipe ($.if('*.scss', $.sass() ))
            .pipe ($.if('*.less', $.less() ))
            .pipe ($.if('*.styl', $.stylus() ))
            .pipe ($.if('*.stylus', $.stylus() ))
            .pipe $.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')
            .pipe $.size()
            .pipe $.rename({'extname': '.css'})
            # .pipe $.copyExt()
            .pipe gulp.dest(config.cssBuildPath+'/t/')
