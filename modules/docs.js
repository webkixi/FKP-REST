require("coffee-script/register")
let fs = require('fs')
let co = require('co');
let path = require('path');
let markdown = require('./markdown')
let parseDirs = require('../public/_builder/gulp-task/html')
let publicConfig = require('../public/config');
let react2html = require('./parseReact')

// 分析目录结构并格式化目录树为JSON
// md, html
function _readdirs(url){
    return parseDirs(null, null, null, 'REST', url)()
}

function fileExsist(filename) {
  return function (done) {
    fs.stat(filename, function(err, sss){
      if (err){
        return done(false, false);
      }
      done(null, sss)
    });
  }
}

// 读取并解析 md 文件
function *loadMdFile(url, whichdir){
    let _directory = whichdir
    if (!url){
        url = path.join(__dirname, '../fkpdoc', '_home_start/index.md');
    }else {
        if (_directory){
            let _tmp = _directory.replace(/\//g, '_')+'_';

            if (url.indexOf('_')!==0){
                if (url.indexOf('/')===-1){
                    url = url.replace(_tmp,'').replace(/_/g,"/");
                }
            }
            if (url.indexOf('.md')===-1){
                url = url + '.md'
            }

            // url = (url.indexOf('fdocs/')>-1 && url.indexOf('fdocs/fkp')===-1)
            // ? url
            // : path.join(__dirname, '../'+_directory, url);
            url = path.join(__dirname, '../'+_directory, url);
        }
    }

    let exist = yield fileExsist(url);

    if (exist){
      let mdcnt = {mdcontent:{}};
      let tmp = {}
      let md_raw = fs.readFileSync( url, 'utf8' );


      if (!md_raw){
        return false
      }
      else
      if (!md_raw.length){
        return false;
      }
      else {
        tmp = {}
        if (Cache.has(url)){    // Cache为全局变量
          tmp = Cache.get(url);
        }
        else{
          tmp = yield markdown(md_raw, mdcnt);
          let excuteData = SAX.get('Excute')
          if (excuteData){
            for (var key in excuteData){
              let _val = yield require(excuteData[key]).default()
              tmp.mdcontent.cnt = _.replace(tmp.mdcontent.cnt, '~~'+key+'~~', _val);
            }
          }
          Cache.set(url, tmp)
        }
      }
      return tmp;
    }
    else {
      return false;
    }
}

function *_getDocsData(doc_dir, options){
    if (!doc_dir){
        return false;
    }
    let exist = yield fileExsist(doc_dir);
    if (!exist){
      return false;
    }

    let sitemap = {},
        start = {},
        docs = {},
        defaults = {
            docs: true,
            sitemap: false,
            start: false,
            menutree: false,
            append: {}
        };

    let opts = _.extend({}, defaults, options||{});

    function getSiteMap(url){
        try {
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
        } catch (e) {
            console.log('========== modules=staticdocs: getSiteMap error');
            console.log(e);
        }
    }

    // html docs
    if (opts.sitemap){
        sitemap = getSiteMap();
    }

    // start docs
    if (opts.start){
        try {
            let tmp;
            if (typeof opts.start === 'boolean'){
                tmp = yield loadMdFile();
            }

            if (typeof opts.start === 'string'){
                tmp = yield loadMdFile(opts.start);
            }

            if (tmp){
              start.home = tmp.mdcontent;
            }
            else {
              start.home = {cnt: '<h1>FKP-JS</h1><small>a full stack framwork</small>', title: 'FKP-JS', author: '天天修改'}
            }
        } catch (e) {
            console.log('========== modules=staticdocs: start error');
            console.log(e);
        }
    }

    // dir docs
    let _docs = _readdirs(doc_dir)
    docs = {docs: _docs.demoindex}

    let docsData = _.extend({}, opts.append, sitemap, docs, start);

    if (opts.menutree){
        let _props = {
            data: docs.docs
        }
        let reactHtml = yield react2html('react/modules/menutree/index', _props);
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

function *getDocsData(url, opts, sess){
    let id = url;
    let tmp;

    if (opts.pre){
      id = opts.pre + url;
    }
    if (Cache.has(id)){
      return Cache.get(id);
    }
    else {
      tmp = yield _getDocsData.call(sess, url, opts);
      Cache.set(id, tmp)
      return tmp;
    }
}

module.exports = {
    getDocsData: getDocsData,
    loadMdFile: loadMdFile
}
