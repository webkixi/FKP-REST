var marked = require('marked')
var render = require('./common/mdrender')

function *mkmd(md_raw, templet){
    var mdcnt = templet
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

    return yield marked(md_raw, function (err, data) {
        if (err) {
            console.log(err, 'markdown.js');
            // cb(new gutil.PluginError('gulp-markdown', err, {fileName: file.path}));
            return;
        }
        mdcnt.mdcontent.cnt = data

        title = md_raw.match(/#([\s\S]*?)\n/)
        if (title) {
            title = title[1].replace(/ \{(.*)\}/g, '')  // 清除自定义属性，如{"id":"xxx"}
            mdcnt.mdcontent.title = title
        }

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
        mdcnt.mdcontent.mdmenu = mdMenu

        return mdcnt

    });
}
module.exports = mkmd
