var libs = require('libs/libs')
var webUploader = require('./index')

function uploadAction(btn){
    var state = 'pending';
    var $btn = $('#'+btn);
    var uploader = webUploader.create({
        // swf文件路径
        swf: '/images/Uploader.swf',
        // 文件接收服务端。
        server: '/upload',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#picker',
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false
    });

    uploader.on('beforeFileQueued', function( file ){
        file.name = libs.guid('dzhce-')+'.'+file.ext
    })

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        $('#thelist').append( '<div id="' + file.id + '" class="item">' +
            '<h4 class="info">' + file.name + '</h4>' +
            '<p class="state">等待上传...</p>' +
        '</div>' );
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress .progress-bar');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<div class="progress progress-striped active">' +
              '<div class="progress-bar" role="progressbar" style="width: 0%">' +
              '</div>' +
            '</div>').appendTo( $li ).find('.progress-bar');
        }

        $li.find('p.state').text('上传中');

        $percent.css( 'width', percentage * 100 + '%' );
    });

    uploader.on( 'uploadSuccess', function( file, ret ) {
        $( '#'+file.id ).find('p.state').text('已上传');
    });

    uploader.on( 'uploadError', function( file ) {
        $( '#'+file.id ).find('p.state').text('上传出错');
    });

    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').fadeOut();
        if(callback)
            callback.call(file);
    });

    uploader.on( 'all', function( type ) {
        if ( type === 'startUpload' ) {
            state = 'uploading';
        } else if ( type === 'stopUpload' ) {
            state = 'paused';
        } else if ( type === 'uploadFinished' ) {
            state = 'done';
        }

        if ( state === 'uploading' ) {
            $btn.text('暂停上传');
        } else {
            $btn.text('开始上传');
        }
    });

    $btn.on( 'click', function() {
        if ( state === 'uploading' ) {
            uploader.stop();
        } else {
            uploader.upload();
        }
    });
}




function uploadAction2(btn,callback){
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
        server: '/upload',

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

    $('#'+btn).mouseenter(function(){
        uploader.refresh();
    })

    uploader.on('beforeFileQueued', function( file ){
        file.name = libs.guid('dzhce-')+'.'+file.ext
    })

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                    '<img>' +
                    '<div class="info" style="overflow:hidden;font-size:10px;">' + file.name + '</div>' +
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

        var l = $( '#'+file.id ).offset().left;
        var t = $( '#'+file.id ).offset().top;
        $('#'+btn).css({'position':'absolute','left':l,'top':t,'opacity':0,'width':thumbnailWidth,'height':thumbnailHeight})
        $('#'+btn).children('div').css({'width':'100%','height':'100%'})
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
        console.log(ret);
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
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').remove();
        if(callback)
            callback.call(file);
    });
}

var Upl = React.createClass({
    getInitialState: function() {
        return {
            type: 1
        }
    },

    componentWillMount: function(){
        if(this.props.btn){
            this.setState({
                btn: this.props.btn
            })
        }
        if(this.props.type){
            this.setState({
                type: this.props.type
            })
        }

        if(this.props.cb)
            this.setState({
                cb: this.props.cb
            })

    },

    componentDidMount: function() {
        var callback;
        if(this.state.cb)
            callback = this.state.cb;
        else {
            callback = function(){};
        }

        if(this.state.btn){
            btn = this.state.btn||'';
        }

        if(this.state.type===1)
            uploadAction(btn,callback);
        else
            if(this.state.type===2)
                uploadAction2(btn,callback);
    },

    componentWillReceiveProps:function(nextProps){

    },

    render: function () {
        var btn = this.state.btn;
        return(
                <div style={{width:'120px'}}>
                    <div className={"uploader-list"} />
                    <div id={btn} >{"选择图片"}</div>
                </div>
        )
    }
});

module.exports = Upl;

// var ForUploader = require('modules/upload/upload');
// React.render(
// 	<ForUploader btn={'ctlBtn'}>
//         <div id={"uploader"} className={"wu-example"}>
//             <div id={"thelist"} className={"uploader-list"} />
//             <div className={"btns"}>
//                 <div id={"picker"}>{"选择文件"}</div>
//                 <button id={"ctlBtn"} className={"btn btn-default"}>{"开始上传"}</button>
//             </div>
//         </div>
//     </ForUploader>
// 	,document.getElementById('foruploader')
// )
