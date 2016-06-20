var fs = require('fs')
var request = require('request')
var path = require('path')
var libs = require('libs/libs')

function *savefile(file, path2save){
    libs.clog('savefile to local '+__filename)
    try {
        if(!path2save){
           path2save = fkpConfig.avatar_root
        }

        if (!fs.existsSync(path2save)) {
            fs.mkdirSync(path2save);
            fs.chmodSync(path2save, '0777')
        }

        if (file && file.indexOf('http')===0){
            var _file = path.parse(file)
            // { root: '',
            //   dir: 'http://www.163.com/abc',
            //   base: '123.jpg',
            //   ext: '.jpg',
            //   name: '123' }
            var _to = path2save + '/' + _file.base

            // sample https://github.com/koajs/koa/issues/102
            // yield pipe(part, fs.createWriteStream("wherever"))
            // return { location: "wherever", filename: part.filename }

            yield request.get(file).pipe( fs.createWriteStream(_to) );
            return { filename: _to }
        }

    } catch (e) {
        console.log('module/savefile' + e);
    }
}

module.exports = savefile
