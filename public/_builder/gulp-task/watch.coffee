spawn = require('child_process').spawn
exec = require('child_process').exec
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
    if port && /[\d]+/.test(port)
        pt = port

    pxy = 'http://127.0.0.1:'+pt

    return () ->

        browserSync.init null, {
                proxy: pxy
                # server:
                #     baseDir: [ config.htmlDevPath, config.staticPath + '/dev']
                #     index: "demoindex.html"
                files: [
                    config.htmlDevPath + '/**/*.html',
                    config.staticPath+ '/dev/js/**',
                    config.staticPath+ '/dev/css/**'
                ]
                logFileChanges: false
                notify: false
                injectChanges: true
            }

        # 监控css文件
        gulp.watch [config.dirs.watch_src + '/css/?(global|modules|pages)/**/*.?(less|scss|css)',config.dirs.watch_src + '/images/slice/*.png'], ['pagecss:dev'], () ->
            console.log 'css watch'
            reload()

        # 监控js文件
        # gulp.watch config.dirs.src + '/js/**/**/*.?(coffee|js|jsx|cjsx)', [buildCommon]
        gulp.watch config.dirs.watch_src + '/js/?(modules|pages|widgets|mixins|libs)/**/*.?(coffee|js|jsx|cjsx)', [buildCommon]
        .on 'change', () ->
            console.log 'js watch'
            reload()

        # 监控react目录下的文件
        # gulp.watch config.dirs.react + '/**/**/*.?(coffee|js|jsx|cjsx)', [buildCommon]
        gulp.watch config.dirs.watch_react + '/?(modules|widgets|mixins)/**/*.?(coffee|js|jsx|cjsx)', [buildCommon]
        .on 'change', () ->
            console.log 'react watch'
            reload()

        # 监控第三方直传文件: css
        gulp.watch [config.dirs.watch_src + '/css/_copy2dist/**/*.?(less|scss|css)',config.dirs.src + '/images/slice/*.png'], ['copyThirdCssToDist:'+env], () ->
            console.log 'copy2css watch'

        # 监控第三方直传文件:js
        gulp.watch config.dirs.watch_src + '/js/_copy2dist/**/*.?(coffee|js|jsx|cjsx)', ['copyThirdJsToDist:'+env], () ->
            console.log 'copy2js watch'

        # watch图片文件
        if env == 'pro'
            gulp.watch config.dirs.watch_src + '/images/**/*.*', ['images:build'], () ->
                console.log 'images watch'
        else
            gulp.watch config.dirs.watch_src + '/images/**/*.*', ['images:dev'], () ->
                console.log 'images watch'

        # gulp.watch config.dirs.src + '/html/**/*.*', ['html']

        gulp.watch config.dirs.watch_src + '/html/**/*.*', (file) ->
            console.log file.path
            slime.build(file.path, {type: 'hbs', 'env': 'pro'});


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
