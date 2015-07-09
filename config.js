var path = require('path');

var static_dir = './public'
var version = '1.0.0'
var config = {
  	mapJson:   path.join(static_dir,'/dist/1.0.0/map.json'),
  	mapDevJson:   path.join(static_dir,'/dist/1.0.0/dev/map.json'),
    demoindex: path.join(static_dir,'/dist/1.0.0/html/demoindex.html'),
    imagePath: 'http://jh-ljs-goods.oss-cn-shenzhen.aliyuncs.com/',
  	static: {
    		dft:  path.join(static_dir,'/dist/1.0.0/'),
    		html: path.join(static_dir,'/dist/1.0.0/html'),
    		js:   path.join(static_dir,'/dist/1.0.0/js'),
    		css:  path.join(static_dir,'/dist/1.0.0/css'),
    		img:  path.join(static_dir,'/dist/1.0.0/images'),
        test: {
            dft:  path.join(static_dir,'/dist/1.0.0/dev'),
            html: path.join(static_dir,'/dist/1.0.0/dev/html'),
            js:   path.join(static_dir,'/dist/1.0.0/dev/js'),
            css:  path.join(static_dir,'/dist/1.0.0/dev/css'),
            img:  path.join(static_dir,'/dist/1.0.0/dev/images')
        }
  	}
}

module.exports = config
