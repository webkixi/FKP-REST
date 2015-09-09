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
makeHtmlListData = (pa, capt) ->
    list = {}
    mklist = (htmlPath, caption) ->
        htmlDirPath = if htmlPath then htmlPath else config.dirs.src + '/html'
        # htmlDirPath = config.dirs.src + '/html'
        htmlDir = fs.readdirSync( htmlDirPath );
        depthDir = htmlDirPath.replace('./src/pc/html/','')
        _caption = caption || 'root'
        htmlDir.map (filename)->
            firstPath = htmlDirPath + '/' + filename
            if (fs.statSync(firstPath).isFile() && filename.indexOf('_')!=0 && filename.indexOf('demo')==-1 )
                ext = path.extname(filename)
                depthFile = firstPath.replace('./src/pc/html/','').replace(ext, '.html')

                list[ _caption ] = list[ _caption ] || {}
                list[ _caption ].group = list[ _caption ].group || (if caption then depthDir else _caption)
                list[ _caption ].list = list[ _caption ].list || []

                if ( ext == '.hbs' || ext == '.html')
                    content = fs.readFileSync(firstPath,'utf8')
                    title = content.match(/<title>([\s\S]*?)<\/title>/ig)
                    _url = if caption then depthFile else ( (caption || '') + '/' + filename.replace(ext,'.html') )
                    if(title!=null && title[0])
                        title = title[0].replace(/\<(\/?)title\>/g,'')
                        fileprofile = {
                            url: _url,
                            group: caption || '',
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
                            des = _subString(desContent,200,true)
                            fileprofile.des = des
                            fileprofile.mdname = mdname

                        list[ _caption ].list.push(fileprofile)


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
                                    mdname: '',
                                    url: filename + '/' + _filename.replace(ext,'.html')
                                }
                                secondMd = secondPath.replace(ext,'.md')
                                if(fs.existsSync(secondMd))
                                    desContent = fs.readFileSync(secondMd,'utf8')
                                    mdname = gutil.replaceExtension(_filename,'_md.html')
                                    des = _subString(desContent,200,true)
                                    fileprofile.des = des
                                    fileprofile.mdname = mdname

                                list[filename].list.push(fileprofile)
                    else
                        if( _filename.indexOf('_')!=0 )
                            mklist(secondPath, _filename)
        return
    mklist(pa, capt)



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
