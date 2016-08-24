var path = require('path')
var libs = require('../libs/libs')
var fs = require('fs')
var path = require('path')
var os = require('os')
var markdown = require('../modules/markdown')
require("coffee-script/register")
var publicConfig = require('../public/config')

function *demoIndexData(oridata){
    let staticData = oridata,
        //请求生成环境demo数据的数据
        listHtmlTempleteData = require('../public/_builder/gulp-task/html')(null,null,null,'REST',path.join('./public',publicConfig.dirs.src,'html'))(),
        //请求生成环境demo数据的数据
        tttt = require('../public/_builder/gulp-task/html')(null,null,null,'REST',path.join( './fkpdoc'))(),
        fkpdocs = {docs: tttt.demoindex},
        _htmlImages = [],
        htmlImages = fs.readdirSync( path.join(__dirname, '../public/src/pc/images/html') ),
        htmlFiles = listHtmlTempleteData.demoindex.root.list;

    // html目录下的项目对应的图片
    if (htmlImages.length){
        _htmlImages = [];
        htmlImages.map((item, i)=>{
            let imgName = path.parse(htmlImages[i]).name;
            _htmlImages.push(imgName)
        })
    }


    // 给html数据补齐图片
    htmlFiles.map( (item, i)=>{
        if (_htmlImages.length ){
            let fileName, imgName;
            fileName = path.parse(item.fileName).name;

            let index = _htmlImages.indexOf(fileName);
            item.img = index>-1 ? '/images/html/'+htmlImages[index] : ''
        }
        else {
            item.img = '';
        }
    })
    staticData = _.extend({}, oridata, listHtmlTempleteData, fkpdocs);



    let params = libs.uri(this.local.path)
    let mdcnt = {mdcontent:{}}
    if (params && params.md){
        let url = params.md;
            url = url.replace('fkpdoc_','').replace(/_/g,"/")
            url = url + ".md";
        let md_raw = fs.readFileSync(path.join(__dirname, '../fkpdoc', url), 'utf8')

        if (!md_raw){
            this.redirect('/demoindex');
        } else
        if (!md_raw.length){
            this.redirect('/demoindex');
        } else {

            let tmp = {}
            // Cache为全局变量
            if (Cache.has(url)){
                tmp = Cache.peek(url);
            }
            else{
                tmp = yield markdown(md_raw, mdcnt);
            }

            // let tmp = yield markdown(md_raw, mdcnt);
            staticData = _.extend(staticData, tmp);
            return staticData
        }
    }
    else{
        let homeContent = {},
            md_raw = fs.readFileSync(path.join(__dirname, '../fkpdoc/_home_start/index.md'), 'utf8'),
            tmp = yield markdown(md_raw, mdcnt);

        homeContent.home = tmp.mdcontent;
        staticData = _.extend(staticData, homeContent);
        return staticData;
    }

}

module.exports = {
    getDemoData : demoIndexData
}
