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
            port: 9100
            ui:
                port: 9101
            server:
                baseDir: [config.htmlDevPath, config.staticPath]
            files: [config.htmlDevPath + '/*.html',config.staticPath+ '/**']
            logFileChanges: false
        )
