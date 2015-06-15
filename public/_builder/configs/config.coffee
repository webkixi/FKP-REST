_ = require 'underscore'
configs = require '../../config'

devDirs =
    ieRequireList: configs.ieRequireList

    # 静态目录
    staticPath : configs.dirs.dist + '/' + configs.version

    # 线上
    jsBuildPath : configs.dirs.dist + '/' + configs.version + '/js/'
    cssBuildPath : configs.dirs.dist + '/' + configs.version + '/css/'
    imagesBuildPath : configs.dirs.dist + '/' + configs.version + '/images/'
    fontsBuildPath : configs.dirs.dist + '/' + configs.version + '/fonts/'

    # 开发
    htmlDevPath : configs.dirs.dist + '/' + configs.version + '/dev/html'
    jsDevPath : configs.dirs.dist + '/' + configs.version + '/dev/js/'
    cssDevPath : configs.dirs.dist + '/' + configs.version + '/dev/css/'
    imagesDevPath : configs.dirs.dist + '/' + configs.version + '/dev/images/'
    fontsDevPath : configs.dirs.dist + '/' + configs.version + '/dev/fonts/'

    # 临时文件夹
    tmpPath :  configs.dirs.dist + '/_tmp/'

    # 合并common.css
    modulesCssDir : configs.dirs.src + '/css/modules/'
    baseCssDir : configs.dirs.src + '/css/modules/base/'
    uiCssDir : configs.dirs.src + '/css/modules/ui/'
    utilCssDir : configs.dirs.src + '/css/modules/utils/'
    pageCssDir : configs.dirs.src + '/css/pages/'

module.exports = _.extend configs,devDirs
