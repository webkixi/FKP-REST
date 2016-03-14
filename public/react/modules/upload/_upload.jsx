var libs = require('libs/libs')
var webUploader = require('./index')


// 优化retina, 在retina下这个值是2
var ratio = window.devicePixelRatio || 1,

    // 缩略图大小
    thumbnailWidth = 100 * ratio,
    thumbnailHeight = 100 * ratio;

function uploadAction(opts){

    var options = {

        // swf文件路径
        swf: '/images/Uploader.swf',

        // 文件接收服务端。
        server: '/upup',

        // 去重
        // duplicate: true,

        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    }

    if (libs.getObjType(opts)==='Object'){
        options = $.extend({}, options, opts)
    }

    return new webUploader.create(options)
}

function _up_error(){
    // 文件上传失败，现实上传出错。
    this.on( 'uploadError', function( file ) {
        alert('上传失败')
    });
}

function _up_success(cb){
    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    this.on( 'uploadSuccess', function( file, ret ) {
        $( '#'+file.id ).addClass('upload-state-done');
        if (ret.success){
            if (cb && typeof cb==='function')
                cb(file);
        }
    });
}

function _up_beforeFileQueued(){
    this.on('beforeFileQueued', function( file ){
        file.name = libs.guid()+'.'+file.ext;
    })
}

function _up_fileQueued(name){

    // 当有文件添加进来的时候
    this.on( 'fileQueued', function( file ) {

        //为button时，不需要展示缩略图
        // var $li = $(
        //         '<div id="' + file.id + '" class="file-item thumbnail">' +
        //             '<img>' +
        //             '<div class="info">' + file.name + '</div>' +
        //         '</div>'
        //         ),
        //     $img = $li.find('img');
        //
        // $list.append( $li );
        //
        // // 创建缩略图
        // uploader.makeThumb( file, function( error, src ) {
        //     if ( error ) {
        //         $img.replaceWith('<span>不能预览</span>');
        //         return;
        //     }
        //
        //     $img.attr( 'src', src );
        // }, thumbnailWidth, thumbnailHeight );
    });
}



function up_button(id, title, cb){
    var opts = {
        // 自动上传。
        auto: true
    }

    if (typeof title === 'function'){
        cb = title
        title = false;
    }

    try {
        var up = uploadAction(opts)
        // up.addButton({
        //     id: '#'+id,
        //     innerHTML: title||'选择文件'
        // })

        _up_error.call(up)
        _up_success.call(up)

        if (cb){
            cb.call(up)
        }
    }
    catch (e) {
        alert('up_button: '+e)
    }
}

function up_thump(name){

}

module.exports = {
    button: up_button,
    thump: up_thump
}
