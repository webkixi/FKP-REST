var libs = require('libs/libs')
var Uploader = require('modules/upload/_upload')
var inject = libs.inject


//插入上传的button按钮样式
inject.css(
    ['/css/t/upload/button.css', 'upload_button']
    , render_upload_button
)


function render_upload_button(){
    Uploader.button('upload', function(){
        console.log(this);
        var me = this;
        //上传成功会调用这里
        // alert('上传成功')

        $('#name').change(function(){
            console.log(this.files[0]);
            var fileobj = this.files[0]
            me.addFile(fileobj)
            // me.upload()
        })
        $('#bbcc').click(function(){
            $('#name').click()
        })
    })

    // Uploader.thumb('thumb', function(){
    //     //上传成功会调用这里
    //     alert('上传成功')
    // })
}
