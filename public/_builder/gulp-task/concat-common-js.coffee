path = require 'path';
config = require '../configs/config.coffee';

# 组装数组，用来打包成common.js
# 常用库，如jquery, react等
commonFilsMap = [];
commonFilsMap = config.vendorList.concat(config.globalList) ;
commonFilsMap.push( config.jsDevPath + '_common.js' ) ;
commonJs = {'common': commonFilsMap };

module.exports = (gulp,$,slime)->
    return () ->
        slime.build(commonJs);
