fs = require 'fs'
path = require 'path';
config = require '../configs/config.coffee';

# 组装数组，用来打包成common.js
commonFilsMap = config.vendorList.concat(config.globalList) ;
module.exports = (gulp,$,slime)->
		return () ->
			slime.build(config.dirs.src + '/js/vendor_custom',true,{
					rename: 'common',
					prepend: commonFilsMap
					append: [config.jsDevPath + '_common.js']
			})
