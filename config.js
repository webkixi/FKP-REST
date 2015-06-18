var path = require('path');

var static_dir = './public'
var version = '1.0.0'
var config = {
  	mapJson:   path.join(static_dir,'/dist/1.0.0/map.json'),
    demoindex: path.join(static_dir,'/dist/1.0.0/html/demoindex.html'),
  	static: {
    		dft:  path.join(static_dir,'/dist/1.0.0/'),
    		html: path.join(static_dir,'/dist/1.0.0/html'),
    		js:   path.join(static_dir,'/dist/1.0.0/js'),
    		css:  path.join(static_dir,'/dist/1.0.0/css'),
    		img:  path.join(static_dir,'/dist/1.0.0/images')
  	}
}

module.exports = config
