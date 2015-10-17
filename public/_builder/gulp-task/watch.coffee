browserSync = require 'browser-sync'
config = require '../configs/config.coffee'

module.exports = (gulp,$,slime,env)->
    buildCommon = 'buildCommon:dev'
    if env == 'ng'
        buildCommon = 'buildCommon:dev:ng'
    if env == 'bb'
        buildCommon = 'buildCommon:dev:bb'

    return (cb) ->
        browserSync(
            proxy: "http://127.0.0.1:8070"
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
        gulp.watch config.dirs.src + '/js/?(modules|widgets|mixins|libs)/**/*.?(coffee|js|jsx|cjsx)', [buildCommon]
        gulp.watch config.dirs.src + '/js/pages/**/*.?(coffee|js|jsx|cjsx)', (file) ->
            console.log file
            pt = file.path
            if(file.path.indexOf('_component')>-1)
                pt = file.path.substring(0,file.path.indexOf('_component'))
            slime.build(pt,true)
        #html
        # gulp.watch config.dirs.src + '/html/**/*.*', ['html:build']
        gulp.watch config.dirs.src + '/html/**/*.*', (file) ->
            console.log file.path
            slime.build(file.path, {type: 'hbs', 'env': env});
