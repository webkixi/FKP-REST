/**
 * Module dependencies.
 */
//加密
var fs = require('fs');
var lib = require('../libs/libs')
var parse = require('co-busboy');
var path = require('path');
var _ = require('lodash');

var filterPicture = ['.jpg','.jpeg','.png','.gif']

function *upLoaderService(path2save){
    if(!path2save){
       var err = new Error('请输入写入文件路径')
       return err;
    }

    if (!this.request.is('multipart/*')) return yield next

    var parts = parse(this, {
        // only allow upload `.jpg` files
        checkFile: function (fieldname, file, filename) {
            if(_.indexOf(filterPicture,path.extname(filename))===-1){
                var err = new Error('invalid jpg image')
                err.status = 400
                return err;
            }
        }
    })
    var part;
    var filename;
    while (part = yield parts) {
        if (part.length) {
            // arrays are busboy fields
            console.log('key: ' + part[0])
            console.log('value: ' + part[1])
            if(part[0]==='name'){
                filename = part[1];
            }
        } else {
            if(filename){
                var ext = path.extname(filename);
                filename = lib.guid()+ext
                filename = path.join(path2save,filename);
            }else{
                return false;
            }
            // otherwise, it's a stream
            part.pipe(fs.createWriteStream(filename))
        }
    }
    console.log('and we are done parsing the form!')
    return true;
}


module.exports = upLoaderService;
