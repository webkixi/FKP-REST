var libs = require('libs/libs')
var webUploader = require('./index')

var uploader_type;

function uploadAction2(btn,callback,maxNumber){
    // var $list = $('#fileList'),
    var $list = $('#'+btn).siblings(),
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,

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

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#'+btn,

        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    // 上传样式类型
    function noon(){}
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


    $('#'+btn).mouseenter(function(){
        uploader.refresh();
    })

    uploader.on('beforeFileQueued', function( file ){
        file.name = libs.guid()+'.'+file.ext;
    })

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        //为button时，不需要展示缩略图
        uploader_style[uploader_type].call(this, file)
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
            callback(file);
        }
    });

    // 文件上传失败，现实上传出错。
    uploader.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');

        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }

        $error.text('上传失败');

        alert('上传失败')
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').remove();
        file.name = file.name.split("&&&")[1];
    });
}

var Upl = React.createClass({
    getInitialState: function() {
        return {
            type: 2,
            btn: libs.guid()
        }
    },

    componentWillMount: function(){

        if(this.props.type){
            this.setState({
                type: this.props.type
            })
        }
        if(this.props.maxNumber){
            this.setState({
                maxNumber: this.props.maxNumber
            })
        }

    },

    componentDidMount: function() {

        var callback,maxNumber;
        if(this.props.cb){
            callback = this.props.cb;
        }

        maxNumber = this.state.maxNumber||0;

        uploadAction2(this.state.btn,callback,maxNumber);

    },

    componentWillReceiveProps:function(nextProps){

    },

    render: function () {
        return(
            <div>
                <div className={"uploader-list"} />
                <div id={this.state.btn}>上传文件</div>
            </div>
        )
    }
});


function render_uploader(name, cb){
    try {

        var exist_id = document.getElementById(name)
        if (exist_id){
            React.render(
                <Upl cb={cb}/>,
                document.getElementById(name)
            )
        }
        else {
            throw "插入的容器不存在"
        }
    } catch (e) {
        alert('upload1: '+e)
    }
}

function button(name, cb){
    uploader_type = 'button';
    render_uploader(name, cb)

}

function thumb(name, cb){
    uploader_type = 'thumb';
    render_uploader(name, cb)

}

module.exports = {
    button: button,
    thumb: thumb
};
