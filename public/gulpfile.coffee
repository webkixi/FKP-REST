fs = require('fs')
path = require('path')
gulp = require('gulp')
gutil = require('gulp-util')
configs = require './config'
slime = require('./_builder/configs/slime.config.js')

browserSync = require 'browser-sync'
reload = browserSync.reload

# Load plugins
$ = require('gulp-load-plugins')()

getTask = (task)->
    require('./_builder/gulp-task/'+task)(gulp, $, slime)

# 清理dist/目录
gulp.task 'clean:build', getTask('clean-build')

# 清理dist/dev目录
gulp.task 'clean:dev', getTask('clean-dev')

# 合并ie8需要的脚本依赖
gulp.task 'ie:dev', getTask('ie')

# common.css
gulp.task 'commoncss:dev', getTask('css-common')

# page.css  合并雪碧图
# gulp.task 'pagecss:dev', getTask('css-pages')
gulp.task 'pagecss:dev',['commoncss:dev','images:dev'], getTask('css-pages')

# 对图像资源复制至dist
gulp.task 'images:dev', getTask('images-dev')

gulp.task 'images:build', ['pagecss:dev'], getTask('images-build')

# 对字体图标资源复制至dist
gulp.task 'fonts:dev', getTask('fonts-dev')

gulp.task 'fonts:build', getTask('fonts-build')

# 对静态页面进行编译
gulp.task 'html', getTask('html')

# 生成API文档，有待改良
gulp.task 'doc', getTask('doc')

#本地资源静态DEMO服务器
gulp.task "server", ['buildCommon:dev','html','ie:dev','fonts:dev','pagecss:dev'] , getTask('server')

# 编译webpack未压缩的资源
gulp.task 'wp:dev', getTask('wp')

# 默认启动本地DEMO服务器
gulp.task 'default',['clean:dev'], ->
    gulp.start 'server'

# 构建任务，生成未压缩版
gulp.task 'buildCommon:dev',['wp:dev'], getTask('concat-common-js')

# 构建任务，生成压缩版与未压缩版
gulp.task 'build',['clean:dev','clean:build'], getTask('map')

gulp.task 'testserver',['build'], getTask('server-pro')
