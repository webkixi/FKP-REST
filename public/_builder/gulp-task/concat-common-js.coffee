fs = require 'fs'
path = require 'path';
config = require '../configs/config.coffee';

# 组装数组，用来打包成common.js
# commonFilsMap = config.globalList.concat(config.vendorList) ;

# 组装数组，用来打包成common.js
getFileMap = (env)->
	if env == 'ng'
		return config.globalList.concat(config.vendorList_ng)
	if env == 'bb'
		return config.globalList.concat(config.vendorList_bb)

	return config.globalList.concat(config.vendorList_adv)  # for advance browser
	# return config.globalList.concat(config.vendorList)    # for ie8...



module.exports = (gulp, $, slime, env)->
		return () ->
			slime.build(config.dirs.src + '/js/vendor_custom',true,{
					rename: 'common',
					prepend: getFileMap(env)
					append: [config.jsDevPath + '_common.js']
			})
