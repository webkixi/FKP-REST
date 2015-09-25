config = require '../configs/config.coffee'
module.exports = (gulp,$,slime)->
    return () ->
        slime.build(config.pageCssDir,false,{type: 'sass'});
