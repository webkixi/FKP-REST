config = require '../configs/config.coffee'
module.exports = (gulp, $, slime, env)->
    return () ->
        slime.build(config.pageCssDir,false,{type: 'less', env: env});
