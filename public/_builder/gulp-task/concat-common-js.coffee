fs = require 'fs'
path = require 'path';
config = require '../configs/config.coffee';

# 组装数组，用来打包成common.js
# 常用库，如jquery, react等
commonFilsMap = [];
vendorCustomList = fs.readdirSync(config.dirs.src + '/js/vendor_custom/')
vcl = [];
vendorCustomList.map (file) ->
	vcl.push config.dirs.src + '/js/vendor_custom/' + file

commonFilsMap = config.vendorList.concat(config.globalList) ;
commonFilsMap = commonFilsMap.concat(vcl)
commonFilsMap.push( config.jsDevPath + '_common.js' ) ;
commonJs = {'common': commonFilsMap };

module.exports = (gulp,$,slime)->
    return () ->
    	slime.build(commonJs)


    	# why erro
  #       slime.build(config.dirs.src + '/js/vendor_custom/',true,{
  #       	rename: 'common',
  #       	prepend: commonJs.common,
  #       	append: [config.jsDevPath + '_common.js']
		# });
