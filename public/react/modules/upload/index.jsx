var libs = require('libs/libs')
var webUploader = require('./_src/index')


function uploadAction2(btn, title, callback, type){
    if (typeof title === 'function'){
        callback = title;
        title = false
    }

    this.uploader_type = type
    var me = this

    if (typeof btn === 'string'){
        // var $list = $('#fileList'),
        var $list = $('#'+btn).siblings()
    }
        // 优化retina, 在retina下这个值是2
    var ratio = window.devicePixelRatio || 1,

        // 缩略图大小
        thumbnailWidth = 100 * ratio,
        thumbnailHeight = 100 * ratio,

        // Web Uploader实例
        uploader;


    // 初始化Web Uploader
    uploader = webUploader.create({

        // 自动上传。
        auto: true,

        // swf文件路径
        swf: '/images/Uploader.swf',

        // 文件接收服务端。
        server: '/upup',

        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });


    // 上传样式类型
    function noon(){};

    var uploader_style = {
        thumb: function(file){
            var $li = $(
                    '<div id="' + file.id + '" class="file-item thumbnail">' +
                        '<img>' +
                        '<div class="info">' + file.name + '</div>' +
                    '</div>'
                    ),
                $img = $li.find('img');

            $list.append( $li );

            // 创建缩略图
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }

                $img.attr( 'src', src );
            }, thumbnailWidth, thumbnailHeight );
        },

        button: noon
    }


    uploader.on('beforeFileQueued', function( file ){
        // file.name = libs.guid()+'.'+file.ext;
    })

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        uploader_style[me.uploader_type].call(uploader, file)
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<p class="progress"><span></span></p>')
                    .appendTo( $li )
                    .find('span');
        }

        $percent.css( 'width', percentage * 100 + '%' );
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on( 'uploadSuccess', function( file, ret ) {
        $( '#'+file.id ).addClass('upload-state-done');
        if(callback && ret.success){
            callback(file, ret);
        }
    });

    // 文件上传失败，现实上传出错。
    uploader.on( 'uploadError', function( file, reason ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');

        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }

        $error.text('上传失败');

        console.log(file);
        console.log(reason);

        alert('上传失败')
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').remove();
        file.name = file.name.split("&&&")[1];
    });


    if (typeof btn === 'string'){
        $('#'+btn).mouseenter(function(){
            uploader.refresh();
        })

        uploader.addButton({
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            id:  '#'+btn,
            innerHTML: title||'选择文件'
        })
    }
    else
    if (typeof btn === 'function'){
        //自定义上传样式
        //1、先插入一个 file 控件
        var _file = $('<input style="position:absolute;clip:rect(1px 1px 1px 1px);left:0;top:0 " type="file"></input>')
        $('body').append(_file)

        //h5页面可用
        _file.change(function(){
            // var fileobj = this.files[0]
            uploader.addFile(this.files)
        })

        uploader.on('upfile', function(cb){
            if (cb && typeof cb === 'function'){
                callback = cb
            }
            _file.click();
        })

        btn.call(uploader)
    }
}


function render_uploader(name, title, cb, type){
    if (typeof title === 'function'){
        cb = title;
        title = false;
    }
    try {
        var exist_id = document.getElementById(name)
        if (exist_id){

            var _id = libs.guid('uploader')
            if (type==='thumb'){
                $(exist_id).append(' <div class="uploader-list"></div><div id="'+_id+'">上传文件</div> ')
            }
            else{
                $(exist_id).append(' <div id="'+_id+'">上传文件</div> ')
            }

            new uploadAction2(_id, title, cb, type);
        }
        else {
            throw "插入的容器不存在"
        }
    }
    catch (e) {
        alert('upload1: '+e)
    }
}

function button(name, title, cb){
    render_uploader(name, title, cb, 'button')

}

function thumb(name, title, cb){
    render_uploader(name, title, cb, 'thumb')
}

function custom(name, cb){
    new uploadAction2(name, false, cb, 'button')
}

module.exports = {
    button: button,
    thumb: thumb,
    custom: custom
};
