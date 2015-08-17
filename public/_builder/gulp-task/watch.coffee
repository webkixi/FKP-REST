browserSync = require 'browser-sync'
config = require '../configs/config.coffee'

module.exports = (gulp,$,slime,env)->
    return () ->
        browserSync(
            proxy: "http://127.0.0.1:3000"
            files: [ config.htmlDevPath + '/**/*.html', config.staticPath+ '/dev/**']
            logFileChanges: false
        )

        # if  !env == 'pro'
        #     # if encounter 'Error: watch ENOSPC': if in linux you must do this : https://github.com/gulpjs/gulp/issues/217
        #     # means edit max_user_watches number
        #     gulp.watch [config.dirs.src + '/css/**/*.?(less|scss|css)',config.dirs.src + '/images/slice/*.png'], ['pagecss:dev']
        #     #js
        #     gulp.watch config.dirs.src + '/js/?(modules|pages|widgets|mixins)/**/*.?(coffee|js|jsx|cjsx|hbs|scss|css)', ['buildCommon:dev']
        #     #html
        #     gulp.watch config.dirs.src + '/html/**/*.*', ['html']

        # if encounter 'Error: watch ENOSPC': if in linux you must do this : https://github.com/gulpjs/gulp/issues/217
        # means edit max_user_watches number
        gulp.watch [config.dirs.src + '/css/**/*.?(less|scss|css)',config.dirs.src + '/images/slice/*.png'], ['pagecss:dev']
        #js
        gulp.watch config.dirs.src + '/js/?(modules|pages|widgets|mixins)/**/*.?(coffee|js|jsx|cjsx|hbs|scss|css)', ['buildCommon:dev']
        #html
        gulp.watch config.dirs.src + '/html/**/*.*', ['html:build']
