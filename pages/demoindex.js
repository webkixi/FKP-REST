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

    let that = this;

    // 读取并解析 md 文件
    async function _loadFile(url){
        if (!url){
            url = path.join(__dirname, '../fkpdoc', '_home_start/index.md');
        }

        let mdcnt = {mdcontent:{}};
        let tmp = {}
        let md_raw = fs.readFileSync( url, 'utf8' );

        if (!md_raw){
            that.redirect('/demoindex');
        }
        else
        if (!md_raw.length){
            that.redirect('/demoindex');
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

    // 分析目录结构并格式化目录树为JSON
    // md, html
    function _readdirs(url){
        return parseDirs(null, null, null, 'REST', url)()
    }

    async function _getDocsData(doc_dir, options){
        if (!doc_dir){
            return false;
        }
        let sitemap = {},
            start = {},
            docs = {},
            defaults = {
                docs: true,
                sitemap: false,
                start: false,
                menutree: false
            };

        let opts = _.extend({}, defaults, options||{});

        function getSiteMap(url){
            let _sitemap = _readdirs(path.join('./public', publicConfig.dirs.src, 'html'));

            let _htmlImages = [];
            let htmlImages = fs.readdirSync( path.join(__dirname, '../public/src/pc/images/html') );

            if (htmlImages.length){
                _htmlImages = [];
                htmlImages.map((item, i)=>{
                    let imgName = path.parse(htmlImages[i]).name;
                    _htmlImages.push(imgName)
                })
            }

            let htmlFiles = _sitemap.demoindex.root.list;
            htmlFiles.map( (item, i)=>{
                let fileName = path.parse(item.fileName).name;
                let index = _htmlImages.indexOf(fileName);
                htmlFiles[i].img = index>-1 ? '/images/html/'+htmlImages[index] : ''
            })

            return _sitemap;
        }

        // html docs
        if (opts.sitemap){
            sitemap = getSiteMap();
        }

        // start docs
        if (opts.start){
            let tmp = await _loadFile();
            start.home = tmp.mdcontent;
        }

        // dir docs
        let _docs = _readdirs(doc_dir)
        // console.log('============ docs');
        // console.log('============ docs');
        // console.log('============ docs');
        // console.log('============ docs');
        // console.log(_docs.demoindex.Demo.list);
        docs = {docs: _docs.demoindex}

        let docsData = _.extend({}, oridata, sitemap, docs, start);

        if (opts.menutree){
            let _props = {
                data: docs.docs
            }
            let reactHtml = await react2html('react/modules/menutree/index', _props);
            docsData.menutree = reactHtml[0];
        }

        if (!opts.docs){
            delete docsData.docs
        }

        if (!opts.sitemap){
            delete docsData.demoindex
        }

        if (!opts.start){
            delete docsData.home
        }

        return docsData;
    }

    function getDocsData(url, opts){
        if (Cache.has(url)){
            return Cache.peek(url);
        }
        return _getDocsData(url, opts)
    }

    return control.run({
        get: async ()=>{
            let tmp={};
            let params = libs.uri(this.local.path);

            // let docDir = path.join(__dirname, '../fkpdoc');
            let docDir = 'fkpdoc';
            let staticData = await getDocsData(docDir, {
                docs: false,
                sitemap: true,
                start: true,
                menutree: true
            })

            if (params && params.md){
                let url = params.md;
                url = url.replace('fkpdoc_','').replace(/_/g,"/")
                url = url + ".md";
                url = path.join(__dirname, '../fkpdoc', url);
                // loadfile
                tmp = await _loadFile(url);
                staticData = _.extend(staticData, tmp);
            }

            return staticData;
        },

        post: async () => {
            let _body = await libs.$parse(this);
            let body = await co(_body)

            // let docDir = path.join(__dirname, '../fkpdoc');
            let docDir = 'fkpdoc';
            let staticData = await getDocsData(docDir);
            if (body.mt){
                return staticData;
            }
            else {
                return {pdata: '我是post数据'}
            }
        }
    })

}

export { demoIndexData as getDemoData }
