let marked = require('marked')
let render = require('./common/mdrender')

// 自定义变量白名单
let accessVar = fkpConfig.markdownVariable;

function strLen(str){
    return str.replace(/[^\x00-\xff]/g,"aaa").length;
}

function *mkmd(md_raw, templet){
    console.log('markdown解析');
    console.log('========= markdown/'+__filename+' ');
    var mdcnt = templet
    var cvariable = {}   //markdown 自定义变量
    marked.setOptions({
        renderer: render,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });

    if (md_raw.indexOf('@@@')>-1) {
        // var rev = /[@]{3,}[ ]*\n?([^@]*)[@]{3,}[ ]*\n?/ig;
        var rev = /[@]{3,}[ ]*\n?([^@]*)[@]{3,}[ ]*\n?/i;
        var rev2 = /(.*)(?=:[ ]*)[\s]*(.*)(?=\n)/ig;
        var rev3 = /^[a-zA-Z0-9,_ \u4e00-\u9fa5\/\\\:\.]+$/;
        var rev4 = /^[\u4e00-\u9fa5]+$/;
        var rev5 = /^http\:/;

        var tmp = md_raw.match(rev);
        tmp = tmp.join('\n')
        var tmp2 = tmp.match(rev2)
        var tmp3 = tmp2.map(function(item,i){
            var tmp = item.split(':')
            var k = tmp[0]
            var v = _.trim(tmp[1])
            if (!rev4.test(k)){
                if (accessVar.indexOf(k)>-1){
                    if (rev3.test(v)){
                        // 自定义css和js
                        if (k==='css'||k==='js'){
                          // if (v in fkpConfig.mapper)
                          if (k==='css' && _.has(fkpConfig.mapper.pageCss, v)){
                            cvariable[k] = '/css/'+fkpConfig.mapper.pageCss[v]
                          }
                          if (k==='js' && _.has(fkpConfig.mapper.pageJs, v)){
                            cvariable[k] = '/js/'+fkpConfig.mapper.pageJs[v]
                          }
                          if (v.indexOf('www.agzgz.com')===0){
                              cvariable[k] = 'http://'+v
                          }
                          if (v.indexOf('/js/t')===0 || v.indexOf('/css/t')===0){
                            cvariable[k] = v
                          }
                        }
                        else {
                            cvariable[k] = v
                        }
                    }
                }
            }
            else {
                // 支持中文
                if ( _.findIndex(accessVar, k)>-1 ){
                    let _obj = _.find(accessVar, k);
                    if (_.isObject(_obj)){
                        if (rev3.test(v)){
                            cvariable[_obj[k]] = v
                        }
                    }
                }
            }

        })
        md_raw = md_raw.replace(rev,'');
    }

    return yield marked(md_raw, function (err, data) {
        if (err) {
            console.log(err, 'markdown.js');
            // cb(new gutil.PluginError('gulp-markdown', err, {fileName: file.path}));
            return;
        }

        //标题
        var _title = md_raw.match(/#([\s\S]*?)\n/);
        if (_title) {
            mdcnt.mdcontent.title = _title[1].replace(/ \{(.*)\}/g, '');  // 清除自定义属性，如{"id":"xxx"}
        }

        var _desc = md_raw.replace(_title, '');
        if (strLen(_desc) < 30){
            mdcnt.mdcontent.desc = false
        }
        else {
            mdcnt.mdcontent.desc = true;
        }

        //图片部分
        // var re_img = /<img.*src\s*=\s*[\"|\']?\s*([^>\"\'\s]*)/i
        var re_img = /!\[.*\]\((.*)\)/i
        var img_first = md_raw.match(re_img);
        if (img_first){
            mdcnt.mdcontent.img = img_first[1]
        }

        //菜单部分
        // var re = /<h2[^>]?.*>(.*)<\/h2>/ig;
        var re = /<h2 [^>]*>(.*?)<\/h2>/ig;
        var re2 = /id="(.*?)">/i;
        var mdMenu='', mdMenuList = data.match(re);
        if(mdMenuList&&mdMenuList.length){
            mdMenuList.map(function(item){
                // console.log('66666666666');
                // console.log(item);
                var kkk = item.match(re2);
                var href = kkk[1]
                if (href!='-')
                    mdMenu += '<li><a href="#'+href+'">'+ re.exec(item)[1]+'</a></li>\n\r';
                else
                    mdMenu += '<li>'+ re.exec(item)[1]+'</li>\n\r';

                re.lastIndex = 0;
            })
        }
        mdcnt.mdcontent.mdmenu = '<ul class="mdmenu">'+mdMenu+'<ul>'

        //内容部分
        mdcnt.mdcontent.cnt = data

        var tmp_len = Object.keys(cvariable)
        if (tmp_len) {
            mdcnt.mdcontent = _.assign(mdcnt.mdcontent, cvariable)
            mdcnt.params = cvariable;
        }
        return mdcnt

    });
}
module.exports = mkmd
