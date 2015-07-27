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

    uploader.on( 'uploadSuccess', function( file ) {
        $( '#'+file.id ).find('p.state').text('已上传');
    });

    uploader.on( 'uploadError', function( file ) {
        $( '#'+file.id ).find('p.state').text('上传出错');
    });

    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').fadeOut();
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

var Upl = React.createClass({
    getInitialState: function() {
        return {}
    },

    componentWillMount: function(){
        if(this.props.btn){
            this.setState({
                btn: this.props.btn
            })
        }

    },

    componentDidMount: function() {
        if(this.state.btn){
            btn = this.state.btn||'';
        }
        uploadAction(btn);
    },

    componentWillReceiveProps:function(nextProps){

    },

    render: function () {
        return(
            <div >
                {this.props.children}
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
