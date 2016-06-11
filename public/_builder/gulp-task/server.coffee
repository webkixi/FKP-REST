fs = require 'fs'
path = require 'path'
gutil = require 'gulp-util'
runSequence = require('run-sequence');
config = require '../configs/config.coffee'
browserSync = require 'browser-sync'
reload = browserSync.reload

# var exec = require('child_process').execSync;
# var cmd = 'nohup node --harmony ../index.js dev &'
# exec(cmd);

module.exports = (gulp,$,slime,env)->
    mapJson =
        version: config.version
        name: "webstore"
        createdAt: (new Date()).toString()
        commonDependencies: {
            css: {}
            js: {}
        } ,
        dependencies: {
            css: {}
            js: {}
        }

    _md5 = false;
    _src = {
        js: [config.staticPath + '/dev/js/**/*.js','!'+config.jsDevPath+'/_common.js'],
        css: [config.staticPath + '/dev/css/**/*.css'],
        mapj: config.staticPath + '/dev/map.json'
    }

    gulp.task 'map:jsdev',()->
        gulp.src _src.js
            .pipe $.size()
            .pipe $.map (file)->
                _fileparse = path.parse(file.path)
                _filename = _fileparse.base
                filename = _fileparse.name.replace(/-/g,'/')
                if (filename.indexOf('__'))
                    filename = filename.split('__')[0]

                if filename.indexOf("common")>-1 || filename.indexOf("ie")>-1
                    mapJson['commonDependencies']['js'][filename] = _filename;
                else
                    mapJson['dependencies']['js'][filename] = _filename;
                # return;


    gulp.task 'map:cssdev',['map:jsdev'],()->
        gulp.src _src.css
            .pipe $.size()
            .pipe $.map (file)->
                _fileparse = path.parse(file.path)
                _filename = _fileparse.base
                filename = _fileparse.name.replace(/-/g,'/')
                filename = _fileparse.name.replace(/-/g,'/')
                if (filename.indexOf('__'))
                    filename = filename.split('__')[0]
                if(filename == "common" || filename == "ie")
                    mapJson['commonDependencies']['css'][filename] = _filename;
                else
                    mapJson['dependencies']['css'][filename] = _filename;

                fs.writeFileSync( _src.mapj,  JSON.stringify(mapJson)) ;
                return;

    gulp.task 'rebuild:html',['html:build']

    gulp.task 'rebuild:dev',['html:dev']

    gulp.task 'start:build',


    # demo 环境
    doSync = ( stat, cb )->
        buildCommon = 'buildCommon:dev'
        if stat == 'ng'
            buildCommon = 'buildCommon:dev:ng'
        if stat == 'bb'
            buildCommon = 'buildCommon:dev:bb'

        gulp.task 'sync',()->
            browserSync(
                port: config.port.demo
                ui:
                    port: config.port.demo+1
                server:
                    baseDir: [ config.htmlDevPath, config.staticPath + '/dev']
                    index: "demoindex.html"
                files: [ config.htmlDevPath + '/**/*.html', config.staticPath+ '/dev/**']
                logFileChanges: false
            )

            #css and sprite
            # if encounter 'Error: watch ENOSPC': if in linux you must do this : https://github.com/gulpjs/gulp/issues/217
            # means edit max_user_watches number
            gulp.watch [config.dirs.src + '/css/**/*.?(less|scss|css)',config.dirs.src + '/images/slice/*.png'], ['pagecss:dev']
            #js
            gulp.watch config.dirs.src + '/js/?(modules|pages|widgets|mixins|libs)/**/*.?(coffee|js|jsx|cjsx)', [buildCommon]
            gulp.watch config.dirs.react + '/?(modules|widgets|mixins)/**/*.?(coffee|js|jsx|cjsx)', [buildCommon]
            # gulp.watch config.dirs.src + '/js/pages/**/*.?(coffee|js|jsx|cjsx)', (file) ->
            #     console.log file
            #     pt = file.path
            #     if(file.path.indexOf('_component')>-1)
            #         pt = file.path.substring(0,file.path.indexOf('_component'))
            #     slime.build(pt,true)

            #html
            # gulp.watch config.dirs.src + '/html/**/*.*', ['html']
            gulp.watch config.dirs.src + '/html/**/*.*', (file) ->
                slime.build(file.path, {type: 'hbs', 'env': env});

        gulp.start 'sync'

    return (cb)->
        if (env == 'pro')
            _md5 = true
            _src = {
                js: [config.staticPath + '/js/**/*.js','!'+config.staticPath+'/js/_common.js'],
                css : [config.staticPath + '/css/**/*.css'],
                mapj: config.staticPath + '/map.json'
            }

        gulp.start 'map:cssdev'

        # if env.indexOf('pro') > -1
        if ['pro', 'dev'].indexOf(env)>-1
            if env == 'dev'
                gulp.start 'rebuild:dev'
            else
                gulp.start 'rebuild:html'
        else
            if env.indexOf('ng') > -1
                gulp.start 'rebuild:html'
            else
                doSync( env, cb )

            # gulp.start 'sync'
