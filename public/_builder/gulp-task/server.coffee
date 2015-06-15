fs = require 'fs'
path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
config = require '../configs/config.coffee'
browserSync = require 'browser-sync'
reload = browserSync.reload

module.exports = (gulp,$)->
    return ()->
        browserSync(
            port: 9000
            ui:
                port: 9001
            server:
                baseDir: [ config.htmlDevPath, config.staticPath + '/dev']
            files: [ config.htmlDevPath + '/**/*.html', config.staticPath+ '/dev/**']
            logFileChanges: false
        )

        #css and sprite
        # if encounter 'Error: watch ENOSPC': if in linux you must do this : https://github.com/gulpjs/gulp/issues/217
        # means edit max_user_watches number
        gulp.watch [config.dirs.src + '/css/**/*.?(less|scss)',config.dirs.src + '/images/slice/*.png'], ['pagecss:dev']
        #js
        gulp.watch config.dirs.src + '/js/?(modules|pages|widgets)/**/*.?(coffee|js|jsx|cjsx|hbs|scss|css)', ['buildCommon:dev']
        #html
        # gulp.watch config.dirs.src + '/html/**/*.html', ['html','html:list']
        # gulp.watch config.dirs.src + '/html/index.hbs', ['html:list']
        gulp.watch config.dirs.src + '/html/**/*.*', ['html']
        # gulp.watch config.dirs.src + '/html/**/*.html', ['html']
        # gulp.watch config.dirs.src + '/html/**/*.md', ['html']
        # gulp.watch config.dirs.src + '/html/index.hbs', ['html']
