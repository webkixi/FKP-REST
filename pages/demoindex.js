var path = require('path')
var libs = require('../libs/libs')
require("coffee-script/register")
var publicConfig = require('../public/config')

function *demoIndexData(oridata){
    var listHtmlTempleteData = require('../public/_builder/gulp-task/html')(null,null,null,'REST',path.join('./public',publicConfig.dirs.src,'html')),  //请求生成环境demo数据的数据
    staticData = libs.$extend(true,oridata,listHtmlTempleteData);

    return staticData
}

module.exports = {
    getDemoData : demoIndexData
}
