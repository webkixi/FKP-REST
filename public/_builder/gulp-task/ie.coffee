config = require '../configs/config.coffee';
module.exports = (gulp, $, slime, env)->
    return () ->
        slime.build(config.ieRequireList,{rename:'ie', env:env})   # ie会启用gulp打包方式,类似 options.method='gulp'
