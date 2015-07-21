/**
 * Module dependencies.
 */
//加密
var fs = require('fs');
var parse = require('co-busboy');

function *upLoaderService(path){
    if(!path){
       console.log('*****************');
       var err = new Error('请输入写入文件路径')
       return err;
    }

    if (!this.request.is('multipart/*')) return yield next

    var parts = parse(this, {
        // only allow upload `.jpg` files
        checkFile: function (fieldname, file, filename) {
            if (path.extname(filename) !== '.jpg'|| path.extname(filename) !== '.png') {
                var err = new Error('invalid jpg image')
                err.status = 400
                return err;
            }
        }
    })

    var part;
    // while (part = yield parts) {
    //     if (part.length) {
    //         // arrays are busboy fields
    //         console.log('key: ' + part[0])
    //         console.log('value: ' + part[1])
    //     } else {
    //         // otherwise, it's a stream
    //         part.pipe(fs.createWriteStream(path))
    //     }
    // }
    console.log('and we are done parsing the form!')
}


module.exports = upLoaderService;
