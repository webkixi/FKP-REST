var path = require('path')
var libs = require('../libs/libs')
var fs = require('fs')
var path = require('path')
var os = require('os')
var marked = require('marked')
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
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: true,
                smartLists: true,
                smartypants: false
            });
            var tmp = yield marked(md_raw, function (err, data) {
                if (err) {
                    cb(new gutil.PluginError('gulp-markdown', err, {fileName: file.path}));
                    return;
                }
                // mdtemp = mdtemp.replace('~~md~~',data);
                mdcnt.mdcontent.cnt = data

                var re = /<h2[^>]?.*>(.*)<\/h2>/ig;
                var mdMenu='', mdMenuList = data.match(re);
                if(mdMenuList&&mdMenuList.length){
                    mdMenuList.map(function(item){
                        mdMenu += '<li>'+ re.exec(item)[1]+'</li>\n\r';
                        re.lastIndex = 0;
                    })
                }
                // data = mdtemp.replace('~~md-menu~~',mdMenu);
                mdcnt.mdcontent.mdmenu = mdMenu

                return mdcnt

            });
            // console.log('======== mdcnt');
            // console.log(tmp);
            staticData = libs.$extend(true, oridata, tmp);
            return staticData
        }
    }
    else{
        var listHtmlTempleteData = require('../public/_builder/gulp-task/html')(null,null,null,'REST',path.join('./public',publicConfig.dirs.src,'html'))()  //请求生成环境demo数据的数据
        var tttt = require('../public/_builder/gulp-task/html')(null,null,null,'REST',path.join( './fkpdoc'))() //请求生成环境demo数据的数据
        // console.log(listHtmlTempleteData);
        // console.log(tttt.demoindex.aaa.list);
        var fkpdocs = {docs: tttt.demoindex}
        staticData = libs.$extend(true, oridata, listHtmlTempleteData, fkpdocs);
        return staticData
    }

}

module.exports = {
    getDemoData : demoIndexData
}
