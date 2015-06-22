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
makeHtmlListData = (htmlPath) ->
    list = {}
    htmlDirPath = if htmlPath then htmlPath else config.dirs.src + '/html'
    # htmlDirPath = config.dirs.src + '/html'
    htmlDir = fs.readdirSync( htmlDirPath );
    htmlDir.map (filename)->
        firstPath = htmlDirPath + '/' + filename
        if (fs.statSync(firstPath).isFile() && filename.indexOf('_')!=0 && filename.indexOf('demo')==-1 )
            list['root'] = list['root'] || {}
            list['root'].group = list['root'].group || 'root'
            list['root'].list = list['root'].list || []
            ext = path.extname(filename)
            if ( ext == '.hbs' || ext == '.html')
                content = fs.readFileSync(firstPath,'utf8')
                title = content.match(/<title>([\s\S]*?)<\/title>/ig)
                if(title!=null && title[0])
                    title = title[0].replace(/\<(\/?)title\>/g,'')
                    fileprofile = {
                        group: '',
                        title: title,
                        fileName: filename.replace(ext,'.html'),
                        fullpath: firstPath,
                        des: '',
                        mdname: ''
                    }
                    firstMd = firstPath.replace(ext,'.md')
                    if(fs.existsSync(firstMd))
                        desContent = fs.readFileSync(firstMd,'utf8')
                        mdname = gutil.replaceExtension(filename,'_md.html')
                        des = _subString(desContent,40,true)
                        fileprofile.des = des
                        fileprofile.mdname = mdname

                    list['root'].list.push(fileprofile)


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
                                des = _subString(desContent,40,true)
                                fileprofile.des = des
                                fileprofile.mdname = mdname

                            list[filename].list.push(fileprofile)



module.exports = (gulp, $, slime, env, path)->
    if env == 'REST'  # 请求来自root/index.js
        if path
            makeHtmlListData(path)
            datas = { demoindex: list } # index html模板名称    list: 模板数据
            return datas
        else
            return
    else
        makeHtmlListData()
        datas = { demoindex: list }
        return () ->
            # 生成分页并生成列表页
            slime.build(config.dirs.src + '/html/',{type: 'hbs',data: datas, 'env': env});
