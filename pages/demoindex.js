require("coffee-script/register")
let libs = require('../libs/libs')
let fs = require('fs')
let path = require('path')
let os = require('os');
let co = require('co');
let parseDirs = require('../public/_builder/gulp-task/html')
let markdown = require('../modules/markdown')
let publicConfig = require('../public/config');
import react2html from 'modules/parseReact'

function *demoIndexData(oridata, control){
    // 读取md文件
    async function _loadFile(url){
        let mdcnt = {mdcontent:{}};
        let tmp = {}
        let md_raw = fs.readFileSync(path.join(__dirname, '../fkpdoc', url), 'utf8');

        if (!md_raw){
            this.redirect('/demoindex');
        }
        else
        if (!md_raw.length){
            this.redirect('/demoindex');
        }
        else {
            tmp = {}
            if (Cache.has(url)){    // Cache为全局变量
                tmp = Cache.peek(url);
            }
            else{
                tmp = await markdown(md_raw, mdcnt);
            }
        }
        return co(tmp);
    }

    // 读取目录，并格式化目录结构
    // md, html
    function _readdirs(url){
        return parseDirs(null, null, null, 'REST', url)()
    }

    let _htmlImages = [],
        staticData = oridata,

        //请求生成环境demo数据的数据
        listHtmlTempleteData = _readdirs(path.join('./public', publicConfig.dirs.src, 'html')),
        //请求生成环境demo数据的数据
        tttt = _readdirs('./fkpdoc'),

        fkpdocs = {docs: tttt.demoindex},
        htmlImages = fs.readdirSync( path.join(__dirname, '../public/src/pc/images/html') );


    // html目录下的项目对应的图片
    if (htmlImages.length){
        _htmlImages = [];
        htmlImages.map((item, i)=>{
            let imgName = path.parse(htmlImages[i]).name;
            _htmlImages.push(imgName)
        })
    }

    // 给html数据补齐图片
    let htmlFiles = listHtmlTempleteData.demoindex.root.list;
    htmlFiles.map( (item, i)=>{
        let fileName = path.parse(item.fileName).name;
        let index = _htmlImages.indexOf(fileName);
        item.img = index>-1 ? '/images/html/'+htmlImages[index] : ''
    })

    staticData = _.extend({}, oridata, listHtmlTempleteData, fkpdocs);


    return control.run({
        get: async ()=>{
            let tmp={};
            let params = libs.uri(this.local.path);

            if (params && params.md){
                let url = params.md;
                    url = url.replace('fkpdoc_','').replace(/_/g,"/")
                    url = url + ".md";
                    // loadfile
                    tmp = await _loadFile.call(this, url);
                    staticData = _.extend(staticData, tmp);
            }
            else{
                tmp = await _loadFile.call(this, '_home_start/index.md');
                staticData = _.extend(staticData, {home: tmp.mdcontent});
            }

            let _props = {
                data: staticData.docs
            }

            try {
                let reactHtml = await react2html('react/modules/menutree/index', _props);
                staticData.menutree = reactHtml[0]
            }
            catch (e) {
                console.log(e);
            }
            finally {
                return staticData;
            }
        },


        post: async () => {
            let _body = await libs.$parse(this);
            let body = await co(_body)
            if (body.mt){
                // staticData = _.extend(staticData.docs, staticData.demoindex);
                return staticData;
            }
            else {
                return {pdata: '我是post数据'}
            }
        }
    })

}

export { demoIndexData as getDemoData }
