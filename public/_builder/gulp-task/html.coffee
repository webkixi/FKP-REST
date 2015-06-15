fs = require 'fs'
path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
config = require '../configs/config.coffee'

_subString = (str, len, hasDot) ->
    newLength = 0
    newStr = ""
    chineseRegex = /[^\x00-\xff]/g
    singleChar = ""
    strLength = str.replace(chineseRegex,"**").length;
    for i in [1..strLength]
        singleChar = str.charAt(i).toString()
        if singleChar.match(chineseRegex)
            newLength++
        else
            newLength += 2
        if newLength > len
            break
        newStr += singleChar
    newStr = newStr.replace(/(\r|\n|#|\-)/ig,'')
    if(hasDot && strLength > len)
        newStr += "...";
    return newStr;



# 首页列表数据
list = {}
htmlDirPath = config.dirs.src + '/html'
htmlDir = fs.readdirSync( htmlDirPath );
htmlDir.map (filename)->
    firstPath = htmlDirPath + '/' + filename
    if (fs.statSync(firstPath).isDirectory() && filename.indexOf('_')!=0 )
        list[filename] = list[filename] || {}
        list[filename].group = list[filename].group || filename
        list[filename].list = list[filename].list || []
        includeDir = fs.readdirSync(firstPath)
        includeDir.map (_filename)->
            secondPath = firstPath + '/' + _filename
            if ( !fs.statSync(secondPath).isDirectory() )
                ext = path.extname(_filename)
                if ( ext == '.hbs' || ext == '.html')
                    content = fs.readFileSync(secondPath,'utf8')
                    title = content.match(/<title>([\s\S]*?)<\/title>/ig)
                    if(title!=null && title[0])
                        title = title[0].replace(/\<(\/?)title\>/g,'')
                        fileprofile = {
                            group: filename,
                            title: title,
                            fileName: _filename.replace(ext,'.html'),
                            fullpath: secondPath,
                            des: '',
                            mdname: ''
                        } 
                        secondMd = secondPath.replace(ext,'.md')
                        if(fs.existsSync(secondMd))
                            desContent = fs.readFileSync(secondMd,'utf8')
                            mdname = gutil.replaceExtension(_filename,'_md.html')
                            des = _subString(desContent,20,true)
                            fileprofile.des = des
                            fileprofile.mdname = mdname

                        list[filename].list.push(fileprofile)



module.exports = (gulp,$,slime)->
    return () ->
        # 生成分页并生成列表页
        datas = {
            index: list
        }
        slime.build(config.dirs.src + '/html/',{type: 'hbs',data: datas});
        # slime.build(config.dirs.src + '/html/index.hbs',{type: 'hbs',data: datas});
