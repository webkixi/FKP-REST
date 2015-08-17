config = require '../configs/config.coffee';
module.exports = (gulp,$,slime)->
    return () ->
        slime.build(config.ieRequireList,{rename:'ie'})   # ie会启用gulp打包方式,类似 options.method='gulp'
