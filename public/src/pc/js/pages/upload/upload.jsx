var libs = require('libs/libs')

//支持uploader.button
//支持uploader.thumb
//支持uploader.custom
var Uploader = require('modules/upload/index')

// 支持inject.css
// 支持inject.js
var inject = libs.inject()



//注入上传的button按钮样式
inject.css(
    ['/css/t/upload/button.css', 'upload_button']
    , render_upload_button
)


function render_upload_button(){
    Uploader.custom(
        function(){
            var me = this;
            $('#bbcc').click(function(){
                me.trigger('upfile')
            })
        },
        //上传成功后的回调
        function(){
            libs.msgtips('不错啊')
        }
    )

    Uploader.button('upload', function(){
        libs.msgtips('上传成功')
    })

    Uploader.thumb('thumb', '带缩略图', function(){
        libs.msgtips('上传成功')
    })
}
