/**
 * Module dependencies.
 */
//加密
var fs = require('fs');
var lib = require('../libs/libs')
var parse = require('co-busboy');
var path = require('path');
var _ = require('lodash');
var assert = require('assert');
var errors = require('libs/errors')


var filterPicture = ['.jpg','.jpeg','.png','.gif']

//上传到本地，支持ie8，支持多图上传
function *upLoaderService(path2save){
    lib.clog('upload local '+__filename)

    if(!path2save){
       var err = new Error('请输入写入文件路径')
       throw err;
    }

    if (!fs.existsSync(path2save)) {
        fs.mkdirSync(path2save);
        fs.chmodSync(path2save, '0777')
    }

    if (!this.request.is('multipart/*')) return yield next

    var part;
    var filename;
    var o_filename;

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

    while (part = yield parts) {
        if (part.length) {
            // arrays are busboy fields
            // console.log('key: ' + part[0])
            // console.log('value: ' + part[1])
            if(part[0]==='name'){
                filename = part[1];
            }
        }
        else{
            console.log(part);
            if (part.filename){
                filename = part.filename
            }

            if (filename){
                var ext = path.extname(filename);
                filename = lib.guid()+ext
                o_filename = filename;
                filename = path.join(path2save,filename);
            }

            if(filename){
                var stream = fs.createWriteStream(filename)
                part.pipe(stream)
                console.log('uploading %s -> %s', part.filename, stream.path);
            }
        }
    }

    return {
        "state": "SUCCESS",
        "url": '/uploader/'+o_filename,
        "title": o_filename,
        "original": o_filename,
        "success": true,
        "message": o_filename
    }

    // this.body = {
    //     "state": "SUCCESS",
    //     "url": path2save+"/"+filename,
    //     "title": filename,
    //     "original": filename,
    //     "success": true,
    //     "message": o_filename
    // }

}




// var oss = require('ali-oss');
//
// var store = oss({
//     accessKeyId: "e9lpoiqUPkmNrupH",
//     accessKeySecret: "II8SFBfkQXzWheLyB3GQulzgYYzd7d",
//     region : 'oss-cn-shenzhen',
//     bucket : 'jh-ljs-account'
// })

var ALY = require('aliyun-sdk');
var oss = new ALY.OSS({
  "accessKeyId": "e9lpoiqUPkmNrupH",
  "secretAccessKey": "II8SFBfkQXzWheLyB3GQulzgYYzd7d",
  // 根据你的 oss 实例所在地区选择填入
  // 杭州：http://oss-cn-hangzhou.aliyuncs.com
  // 北京：http://oss-cn-beijing.aliyuncs.com
  // 青岛：http://oss-cn-qingdao.aliyuncs.com
  // 深圳：http://oss-cn-shenzhen.aliyuncs.com
  // 香港：http://oss-cn-hongkong.aliyuncs.com
  // 注意：如果你是在 ECS 上连接 OSS，可以使用内网地址，速度快，没有带宽限制。
  // 杭州：http://oss-cn-hangzhou-internal.aliyuncs.com
  // 北京：http://oss-cn-beijing-internal.aliyuncs.com
  // 青岛：http://oss-cn-qingdao-internal.aliyuncs.com
  // 深圳：http://oss-cn-shenzhen-internal.aliyuncs.com
  // 香港：http://oss-cn-hongkong-internal.aliyuncs.com
  endpoint: 'http://oss-cn-shenzhen.aliyuncs.com/',
  // 这是 oss sdk 目前支持最新的 api 版本, 不需要修改
  apiVersion: '2013-10-15'
});



var buffer = null;
var ctype = 'text/plain';
var csize = 0;
function *aliService(path2save){

    if (!this.request.is('multipart/*')) return yield next

    var oss = require('ali-oss')

    var store = oss({
        accessKeyId: 'e9lpoiqUPkmNrupH',
        accessKeySecret: 'II8SFBfkQXzWheLyB3GQulzgYYzd7d',
        bucket: 'jh-ljs-account',
        region: 'oss-cn-shenzhen'
    });

    var stat = false;
    var object;
    var part;
    var filename;
    var buffers = [];
    var nread = 0;
    var bucket = 'jh-ljs-account';

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

    while (part = yield parts) {
        if (part.length) {
            // arrays are busboy fields
            console.log('key: ' + part[0])
            console.log('value: ' + part[1])
            if(part[0]==='name'){
                filename = part[1];
                var names = filename.split("&&&");
                if (names[0] === 'goods'){
                    bucket = 'jh-ljs-goods';
                    filename = names[1];
                }
            }
            if(part[0]==='type'){
                ctype = part[1];
            }
            if(part[0]==='size'){
                csize = part[1];
            }
        }
        else{
            var object = yield store.put(filename, part, {
            headers: {
                  'Content-Length': csize,
                  'Content-Type': ctype
                }
            });
        }
    }
    if(object)
        this.body = {
            "state": "SUCCESS",
            "url": "upload/demo.jpg",
            "title": "demo.jpg",
            "original": "demo.jpg",
            success: true,
            message: filename
        }
    else {
        this.body = {"state": "failed", success: false}
    }

    // if (!this.request.is('multipart/*')) return yield next
    //
    // var stat = false;
    // var part;
    // var filename;
    // var buffers = [];
    // var nread = 0;
    // var bucket = 'jh-ljs-account';
    //
    // var parts = parse(this, {
    //     // only allow upload `.jpg` files
    //     checkFile: function (fieldname, file, filename) {
    //         if(_.indexOf(filterPicture,path.extname(filename))===-1){
    //             var err = new Error('invalid jpg image')
    //             err.status = 400
    //             return err;
    //         }
    //     }
    // })
    //
    // while (part = yield parts) {
    //     if (part.length) {
    //         // arrays are busboy fields
    //         console.log('key: ' + part[0])
    //         console.log('value: ' + part[1])
    //         if(part[0]==='name'){
    //             filename = part[1];
    //             var names = filename.split("&&&");
    //             if (names[0] === 'goods'){
    //                 bucket = 'jh-ljs-goods';
    //                 filename = names[1];
    //             }
    //         }
    //         if(part[0]==='type'){
    //             ctype = part[1];
    //         }
    //     }
    //     else {
    //         // if(filename){
    //         //     var ext = path.extname(filename);
    //         //     filename = lib.guid()+ext
    //         //     // filename = path.join(path2save,filename);
    //         // }
    //         //
    //         // else{
    //         //     return false;
    //         // }
    //
    //         part.on('data', function (chunk) {
    //             buffers.push(chunk);
    //             nread += chunk.length;
    //         });
    //
    //         part.on('end', function () {
    //             stat = true;
    //
    //             switch(buffers.length) {
    //                 case 0:
    //                     buffer = new Buffer(0);
    //                     break;
    //                 case 1:
    //                     buffer = buffers[0];
    //                     break;
    //                 default:
    //                     buffer = new Buffer(nread);
    //                     for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
    //                         var chunk = buffers[i];
    //                         chunk.copy(buffer, pos);
    //                         pos += chunk.length;
    //                     }
    //                 break;
    //             }
    //             objup(buffer,filename,bucket);
    //             // mup(buffer,filename,bucket);
    //             console.log('push picture to aliyun')
    //         });
    //     }
    // }
    // // yield buffer
    // if(stat)
    //     this.body = {success: true};
    // else
    //     this.body = {success: false};


}

function *objup(buffer,fileKey,bucket){
    // return yield function*(){
    //     return {xxx:12365}
    // }

    function* test(){
        oss.putObject({
            Bucket: bucket,
            Key: fileKey,                 // 注意, Key 的值不能以 / 开头, 否则会返回错误.
            Body: buffer,
            AccessControlAllowOrigin: '',
            ContentType: ctype,
            // CacheControl: 'no-cache',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
            // ContentDisposition: '',           // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1
            // ContentEncoding: 'utf-8',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
            // ServerSideEncryption: 'AES256',
            // Expires: ''                       // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.21
        },
        function (err, data) {

            if (err) {
                console.log('error:', err);
                return;
            }

            console.log('success:', data);
            return data

        });
    }
    return yield test

    // return yield
}

//ali 图片上传
function mup(buffer,fileKey,bucket){

    // File
    // var fileName = 'test.mp3';
    // var filePath = './' + fileName;
    // var fileKey = fileName;
    // var buffer = fs.readFileSync(filePath);
    // Upload options

    // Upload
    var startTime = new Date();
    var partNum = 0;
    var partSize = 1024 * 1024 * 5; // Minimum 5MB per chunk (except the last part)
    var numPartsLeft = Math.ceil(buffer.length / partSize);
    var maxUploadTries = 3;

    var multipartMap = {
        Parts: []
    };

    function completeMultipartUpload(oss, doneParams) {
        oss.completeMultipartUpload(doneParams, function (err, data) {
            if (err) {
                console.log("An error occurred while completing the multipart upload");
                console.log(err);
            }

            else {
                var delta = (new Date() - startTime) / 1000;
                console.log('Completed upload in', delta, 'seconds');
                console.log('Final upload data:', data);
            }
        });
    }

    function uploadPart(oss, multipart, partParams, tryNum) {
        var tryNum = tryNum || 1;
        oss.uploadPart(partParams, function (multiErr, mData) {
            if (multiErr) {
                console.log('multiErr, upload part error:', multiErr);
                if (tryNum < maxUploadTries) {
                    console.log('Retrying upload of part: #', partParams.PartNumber)
                    uploadPart(oss, multipart, partParams, tryNum + 1);
                }
                else {
                    console.log('Failed uploading part: #', partParams.PartNumber)
                }
                return;
            }

            multipartMap.Parts[this.request.params.PartNumber - 1] = {
                ETag: mData.ETag,
                PartNumber: Number(this.request.params.PartNumber)
            };

            console.log("Completed part", this.request.params.PartNumber);
            console.log('mData', mData);

            if (--numPartsLeft > 0) return; // complete only when all parts uploaded

            var doneParams = {
                Bucket: bucket,
                Key: fileKey,
                CompleteMultipartUpload: multipartMap,
                UploadId: multipart.UploadId
            };

            console.log("Completing upload...");
            completeMultipartUpload(oss, doneParams);
        });
    }

    // Multipart
    console.log("Creating multipart upload for:", fileKey);
    oss.createMultipartUpload({
      ACL: 'public-read',
      Bucket: bucket,
      Key: fileKey,
      ContentType: 'audio/mpeg',
      ContentDisposition: ''
      //CacheControl: '',
      //ContentEncoding: '',
      //Expires: '',
      //ServerSideEncryption: ''
    }, function (mpErr, multipart) {
      if (mpErr) {
        console.log('Error!', mpErr);
        return;
      }
      console.log("Got upload ID", multipart.UploadId);

      // Grab each partSize chunk and upload it as a part
        for (var rangeStart = 0; rangeStart < buffer.length; rangeStart += partSize) {
            partNum++;
            var end = Math.min(rangeStart + partSize, buffer.length),
              partParams = {
                Body: buffer.slice(rangeStart, end),
                Bucket: bucket,
                Key: fileKey,
                PartNumber: String(partNum),
                UploadId: multipart.UploadId
              };

            // Send a single part
            console.log('Uploading part: #', partParams.PartNumber, ', Range start:', rangeStart);
            uploadPart(oss, multipart, partParams);
        }
    });
}

module.exports = {
    local: upLoaderService,
    ali: aliService
};
