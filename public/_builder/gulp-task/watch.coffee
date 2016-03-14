browserSync = require('browser-sync').create()
reload  = browserSync.reload
config = require '../configs/config.coffee'

module.exports = (gulp,$,slime,env,port)->
    buildCommon = 'buildCommon:dev'
    if env == 'ng'
        buildCommon = 'buildCommon:dev:ng'
    if env == 'bb'
        buildCommon = 'buildCommon:dev:bb'

    pt = 8070
    if port
        pt = port
    pxy = 'http://127.0.0.1:'+pt

    return () ->

        # 监控css文件
        gulp.watch [config.dirs.src + '/css/?(global|modules|pages)/**/*.?(less|scss|css)',config.dirs.src + '/images/slice/*.png'], ['pagecss:dev']
        # .on 'change', reload

        # 监控js文件
        gulp.watch config.dirs.src + '/js/?(modules|pages|widgets|mixins|libs)/**/*.?(coffee|js|jsx|cjsx)', [buildCommon]
        .on 'change', reload

        # 监控react目录下的文件
        gulp.watch config.dirs.react + '/?(modules|widgets|mixins)/**/*.?(coffee|js|jsx|cjsx)', [buildCommon]
        .on 'change', reload

        # 监控第三方直传文件: css
        gulp.watch [config.dirs.src + '/css/_copy2dist/**/*.?(less|scss|css)',config.dirs.src + '/images/slice/*.png'], ['copyThirdCssToDist:dev']

        # 监控第三方直传文件:js
        gulp.watch config.dirs.src + '/js/_copy2dist/**/*.?(coffee|js|jsx|cjsx)', ['copyThirdJsToDist:dev']

        gulp.watch config.dirs.src + '/html/**/*.*', (file) ->
            console.log file.path
            slime.build(file.path, {type: 'hbs', 'env': 'pro'});

        browserSync.init null, {
                proxy: pxy
                # server:
                #     baseDir: [ config.htmlDevPath, config.staticPath + '/dev']
                #     index: "demoindex.html"
                files: [
                    config.htmlDevPath + '/**/*.html',
                    config.staticPath+ '/dev/js/**',
                    config.staticPath+ '/dev/css/**']
                logFileChanges: false
            }


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

        # gulp.watch config.dirs.src + '/js/pages/**/*.?(coffee|js|jsx|cjsx)', (file) ->
        #     console.log file
        #     pt = file.path
        #     if(file.path.indexOf('_component')>-1)
        #         pt = file.path.substring(0,file.path.indexOf('_component'))
        #     slime.build(pt,true)

        #html
        # gulp.watch config.dirs.src + '/html/**/*.*', ['html:build']
