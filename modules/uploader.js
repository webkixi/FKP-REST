/**
 * Module dependencies.
 */
//加密
var fs = require('fs');
var lib = require('../libs/libs')
var parse = require('co-busboy');
var path = require('path');
var _ = require('lodash');


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
  apiVersion: '2015-7-23'
});



var filterPicture = ['.jpg','.jpeg','.png','.gif']

//上传到本地，支持ie8，支持多图上传
function *upLoaderService(path2save){
    if(!path2save){
       var err = new Error('请输入写入文件路径')
       return err;
    }

    if (!this.request.is('multipart/*')) return yield next

    var parts = parse(this, {
        // only allow upload `.jpg` files
        checkFile: function (fieldname, file, filename) {
            console.log('+++++++++++++++++++++');
            console.log(file);
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

function *aliService(path2save){

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
    var buffers = [];
    var nread = 0;

    while (part = yield parts) {
        if (part.length) {
            // arrays are busboy fields
            console.log('key: ' + part[0])
            console.log('value: ' + part[1])
            if(part[0]==='name'){
                filename = part[1];
            }
        }
        else {
            if(filename){
                var ext = path.extname(filename);
                filename = lib.guid()+ext
                // filename = path.join(path2save,filename);
            }

            else{
                return false;
            }

            part.on('data', function (chunk) {
                buffers.push(chunk);
                nread += chunk.length;
            });

            part.on('end', function () {
                var buffer = null;
                switch(buffers.length) {
                    case 0:
                        buffer = new Buffer(0);
                        break;
                    case 1:
                        buffer = buffers[0];
                        break;
                    default:
                        buffer = new Buffer(nread);
                        for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
                            var chunk = buffers[i];
                            chunk.copy(buffer, pos);
                            pos += chunk.length;
                        }
                    break;
                }
                mup(buffer,filename);
                console.log('push picture to aliyun')
            });
        }
    }


    function mup(buffer,fileKey){
        console.log(oss);
        // File
        // var fileName = 'test.mp3';
        // var filePath = './' + fileName;
        // var fileKey = fileName;
        // var buffer = fs.readFileSync(filePath);
        // Upload options

        var bucket = 'jh-ljs-account';

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
}


module.exports = {
    local: upLoaderService,
    ali: aliService
};
