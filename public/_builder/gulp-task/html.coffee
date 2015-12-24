fs = require 'fs'
path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
config = require '../configs/config.coffee'
os = require('os');
ifaces = os.networkInterfaces();
port = 0

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


ipGlobal = false
_getAddress = () ->
    address = {}
    realIp = ''
    Object.keys(ifaces).forEach (ifname) ->
        alias = 0
        ifaces[ifname].forEach (iface) ->
            if ('IPv4' != iface.family || iface.internal != false)
                # skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;

            if (alias >= 1)
                # this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
                address[ifname] = iface.address
            else
                if(iface.address.indexOf('192.168')>-1 ||
                	iface.address.indexOf('172.16')>-1 ||
                	iface.address.indexOf('10.0')>-1)
                    if(!ipGlobal)
                        # this interface has only one ipv4 adress
                        console.log(ifname, iface.address);
                        address[ifname] = iface.address
                else
                    console.log(ifname, iface.address);
                    address = []
                    ipGlobal = true
                    address[ifname] = iface.address

    console.log ipGlobal

    # console.log address
    return address[Object.keys(address)[0]]
    # return address



# 首页列表数据
list = {}
makeHtmlListData = (pa, capt) ->
    list = {}
    tmp = {};
    tip = _getAddress()
    # if ipGlobal
        # port = 0
        # tip = 'www.agzgz.com'
    ipport = if port then ':'+port else ''
    mklist = (htmlPath, caption) ->
        htmlDirPath = if htmlPath then htmlPath else config.dirs.src + '/html'

        # htmlDirPath = config.dirs.src + '/html'
        htmlDir = fs.readdirSync( htmlDirPath );
        depthDir = htmlDirPath.replace('./src/pc/html/','').replace('public/src/pc/html/','')
        _caption = caption || 'root'

        list[ _caption ] = list[ _caption ] || {}
        list[ _caption ].group = list[ _caption ].group || (if caption then depthDir else _caption)
        list[ _caption ].list = list[ _caption ].list || []

        dirJson = path.parse(htmlDirPath)
        if dirJson.base != 'html'
            if dirJson.dir != './src/pc/html'
                if dirJson.dir != 'public/src/pc/html'
                    list[ _caption ].subtree = true

        htmlDir.map (filename)->
            firstPath = htmlDirPath + '/' + filename
            if (fs.statSync(firstPath).isFile() && filename.indexOf('_')!=0 && filename!='demoindex' )
                ext = path.extname(filename)
                depthFile = firstPath.replace('./src/pc/html/','').replace(ext, '.html')


                if filename == caption && ext == ''
                    content = fs.readFileSync(firstPath,'utf8')
                    list[ _caption ].readme = content

                if ( ext == '.hbs' || ext == '.html')
                    content = fs.readFileSync(firstPath,'utf8')
                    title = content.match(/<title>([\s\S]*?)<\/title>/ig)
                    _url = if caption then depthFile else ( (caption || '') + '/' + filename.replace(ext,'.html') )
                    _url = _url.replace('public/src/pc/html/','')
                    _ipurl = 'http://'+ tip + ipport + '/' + _url
                    _ipurl = _ipurl.replace(/\/\//g,'/').replace(':/','://')
                    if(title!=null && title[0])
                        title = title[0].replace(/\<(\/?)title\>/g,'')
                        fileprofile = {
                            url: _url,
                            ipurl: _ipurl,
                            group: caption || '',
                            title: title,
                            fileName: filename.replace(ext,'.html'),
                            fullpath: firstPath,
                            des: '',
                            mdname: ''
                        }
                        firstMd = firstPath.replace(ext,'.md')
                        filenameMd = filename.replace(ext, '.md')
                        if(fs.existsSync(firstMd))
                            tmp[filenameMd] = true;
                            desContent = fs.readFileSync(firstMd,'utf8')
                            mdname = gutil.replaceExtension(filename,'_md.html')
                            des = _subString(desContent,200,true)
                            fileprofile.des = des
                            fileprofile.mdname = mdname

                        list[ _caption ].list.push(fileprofile)

                if ext == '.md'
                    if !tmp[filename]
                        content = fs.readFileSync(firstPath,'utf8')
                        tmp = _subString(content, 100, true)
                        title = content.match(/#([\s\S]*?)\n/)[1]
                        _filenameMd = filename.replace(ext, '_md.html')
                        _url = if caption then depthFile.replace('.html','_md.html') else ( (caption || '') + '/' + _filenameMd )
                        _url = _url.replace('public/src/pc/html/','')
                        _ipurl = 'http://'+ tip + ipport + '/' + _url
                        _ipurl = _ipurl.replace(/\/\//g,'/').replace(':/','://')
                        if title
                            fileprofile = {
                                url: _url,
                                ipurl: _ipurl,
                                group: caption || '',
                                title: title,
                                fileName: filename.replace(ext,'_md.html'),
                                fullpath: firstPath,
                                des: '',
                                mdname: ''
                            }
                            list[ _caption ].list.push(fileprofile)

                return

            if (fs.statSync(firstPath).isDirectory() && filename.indexOf('_')!=0 )
                mklist(firstPath, filename)

        return
    mklist(pa, capt)



module.exports = (gulp, $, slime, env, path)->
        return () ->
            if env == 'REST'  # 请求来自root/index.js
                port = config.port.dev
                if path
                    makeHtmlListData(path)
                    datas = { demoindex: list } # index html模板名称    list: 模板数据
                    return datas
                else
                    return
            else
                if env == 'dev'
                    port = config.port.demo
                makeHtmlListData()
                datas = { demoindex: list }

            # 生成分页并生成列表页
            slime.build(config.dirs.src + '/html/',{type: 'hbs',data: datas, 'env': env});
