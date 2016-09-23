fs = require('fs')
path = require('path')
gulp = require('gulp')
gutil = require('gulp-util')
minimist = require('minimist')
configs = require './config'
slime = require('./_builder/configs/slime.config.js')

browserSync = require 'browser-sync'
reload = browserSync.reload
env = 'dev'

args = process.argv.splice(2);
options = minimist(args)

# Load plugins
$ = require('gulp-load-plugins')()

# 初始化生成临时目录
tmpDir = './dist/_tmp'
if !fs.existsSync('./dist')
   fs.mkdirSync('./dist')
   if  !fs.existsSync(tmpDir)
       fs.mkdirSync(tmpDir);

getTask = (task,env,port)->
    if !env
        env = 'dev'

    process.env.NODE_ENV = env
    require('./_builder/gulp-task/'+task)(gulp, $, slime, env, port)

# 清理dist/目录
gulp.task 'clean:build', getTask('clean-build')

# 清理dist/dev目录
gulp.task 'clean:dev', getTask('clean-dev')

# 合并ie8需要的脚本依赖
gulp.task 'ie:dev', getTask('ie')
gulp.task 'ie:pro', getTask('ie', 'pro')

# common.css
gulp.task 'commoncss:dev', getTask('css-common')
gulp.task 'commoncss:pro', getTask('css-common', 'pro')

# page.css  合并雪碧图
# gulp.task 'pagecss:dev', getTask('css-pages')
gulp.task 'pagecss:dev',['commoncss:dev','images:dev','copyThirdCssToDist:dev'], getTask('css-pages')
gulp.task 'pagecss:pro',['commoncss:pro','images:pro','copyThirdCssToDist:pro'], getTask('css-pages', 'pro')

# 对图像资源复制至dist
gulp.task 'images:dev', getTask('images-dev')
gulp.task 'images:pro', getTask('images-dev', 'pro')
gulp.task 'images:build', ['pagecss:dev'], getTask('images-build')

# 对字体图标资源复制至dist
gulp.task 'fonts:dev', getTask('fonts-dev')
gulp.task 'fonts:pro', getTask('fonts-dev', 'pro')
gulp.task 'fonts:build', getTask('fonts-build')

# 对静态页面进行编译
gulp.task 'html', getTask('html')  #webpack解析
gulp.task 'html:dev', getTask('html','dev') #交由服务器端解析
gulp.task 'html:build', getTask('html','pro') #交由服务器端解析

# 拷贝如编辑器这样的无法分解的前端js
gulp.task 'copyThirdJsToDist:dev', ['copyThirdCssToDist:dev'], getTask('js-copy2-dev')
gulp.task 'copyThirdJsToDist:pro', ['copyThirdCssToDist:pro'], getTask('js-copy2-build')

# 拷贝如组件（JS + CSS）类似的CSS
gulp.task 'copyThirdCssToDist:dev', getTask('css-copy2-dev')
gulp.task 'copyThirdCssToDist:pro', getTask('css-copy2-build')

# 生成API文档，有待改良
gulp.task 'doc', getTask('doc')

#本地资源静态DEMO服务器/代理动态(koajs)服务器
gulp.task "server", ['buildCommon:dev','html','ie:dev','fonts:dev','pagecss:dev','copyThirdJsToDist:dev'] , getTask('server')  # for demo
gulp.task "dev", ['buildCommon:dev','ie:dev','fonts:dev','pagecss:dev','copyThirdJsToDist:dev'] , getTask('server','dev')  # for dev
gulp.task "pro", ['buildCommon:pro','ie:pro','fonts:pro','pagecss:pro','copyThirdJsToDist:pro'] , getTask('server','pro')  # for dev
# gulp.task "ngdev", ['buildCommon:dev:ng','ie:dev','fonts:dev','pagecss:dev','copyThirdJsToDist:dev'] , getTask('server','ngpro')  # for angular dev and pro
# gulp.task "ng", ['buildCommon:dev:ng','ie:dev','fonts:dev','pagecss:dev','copyThirdJsToDist:dev'] , getTask('server','ng')  # for demo and angular
# gulp.task "bbdev", ['buildCommon:dev:bb','html','ie:dev','fonts:dev','pagecss:dev','copyThirdJsToDist:dev'] , getTask('server','bbpro')  # for backbone dev and pro
# gulp.task "bb", ['buildCommon:dev:bb','html','ie:dev','fonts:dev','pagecss:dev','copyThirdJsToDist:dev'] , getTask('server','bb')  # for demo and backbone


# global
gulp.task 'g:dev', getTask('g')
gulp.task 'g:pro', getTask('g', 'pro')


# js/pages编译并生成_common.js
# gulp.task 'wp:dev', ['g:dev'], getTask('wp')
# gulp.task 'wp:pro', ['g:pro'], getTask('wp', 'pro')
gulp.task 'wp:dev', getTask('wp')
gulp.task 'wp:pro', getTask('wp', 'pro')


# 默认启动本地DEMO服务器
gulp.task 'default',['clean:dev'], ->
    gulp.start 'server'

# 构建任务，生成未压缩版
gulp.task 'buildCommon:dev',['wp:dev'], getTask('concat-common-js')
gulp.task 'buildCommon:pro',['wp:pro'], getTask('concat-common-js', 'pro')
gulp.task 'buildCommon:dev:ng',['wp:dev'], getTask('concat-common-js','ng')
gulp.task 'buildCommon:dev:bb',['wp:dev'], getTask('concat-common-js','bb')

# 构建任务，压缩
gulp.task 'buildCommon:pro:ng',['wp:pro'], getTask('concat-common-js','ng')
gulp.task 'buildCommon:pro:bb',['wp:pro'], getTask('concat-common-js','bb')

# 构建任务，生成压缩版与未压缩版
# gulp.task 'build',['clean:dev','clean:build'], getTask('map','pro')
gulp.task 'build',['clean:dev','clean:build'], () ->
    gulp.start 'pro'


gulp.task 'watch:dev', getTask('watch')
gulp.task 'watch:dev:port', getTask('watch', undefined, options.port)
gulp.task 'watch:pro', getTask('watch','pro')
gulp.task 'watch:bb', getTask('watch','bb')
gulp.task 'watch:ng', getTask('watch','ng')

gulp.task 'watch', ()->
    if options.port
        gulp.start 'watch:dev:port'
    else
        gulp.start 'watch:dev'
