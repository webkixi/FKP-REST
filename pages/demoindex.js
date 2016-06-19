var path = require('path')
var libs = require('../libs/libs')
var fs = require('fs')
var path = require('path')
var os = require('os')
var markdown = require('../modules/markdown')
require("coffee-script/register")
var publicConfig = require('../public/config')

function *demoIndexData(oridata){
    var staticData = oridata
    var params = libs.uri(this.local.path)
    if (params && params.md){
        var mdcnt = {mdcontent:{}}
        var url = params.md
        url = url.replace('fkpdoc_','').replace(/_/g,"/")
        url = url + ".md"
        var md_raw = fs.readFileSync(path.join(__dirname, '../fkpdoc', url), 'utf8')
        if (!md_raw)
            this.redirect('/demoindex')
        else
        if (!md_raw.length)
            this.redirect('/demoindex')
        else{
            var tmp = yield markdown(md_raw, mdcnt)
            staticData = _.extend({}, oridata, tmp);
            return staticData
        }
    }
    else{
        var listHtmlTempleteData = require('../public/_builder/gulp-task/html')(null,null,null,'REST',path.join('./public',publicConfig.dirs.src,'html'))()  //请求生成环境demo数据的数据
        var tttt = require('../public/_builder/gulp-task/html')(null,null,null,'REST',path.join( './fkpdoc'))() //请求生成环境demo数据的数据
        // console.log(listHtmlTempleteData);
        // console.log(tttt.demoindex.aaa.list);
        var fkpdocs = {docs: tttt.demoindex}
        staticData = _.extend({}, oridata, listHtmlTempleteData, fkpdocs);
        return staticData
    }

}

module.exports = {
    getDemoData : demoIndexData
}
