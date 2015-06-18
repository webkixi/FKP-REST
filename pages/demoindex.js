var path = require('path')
var $extend = require('extend')
require("coffee-script/register")
var publicConfig = require('../public/config')

var listHtmlTempleteData = require('./public/_builder/gulp-task/html')(null,null,null,'REST',path.join('./public',publicConfig.dirs.src,'html')),  //请求生成环境demo数据的数据
staticData = $extend(true,staticData,listHtmlTempleteData);
