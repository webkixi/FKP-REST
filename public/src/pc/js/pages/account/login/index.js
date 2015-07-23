// var mobilepartn = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
// $(".login_input .user_phone").blur(function(){
// 	var value=$(this).val();
// 	if(value=="" || value.length != 11 || !mobilepartn.test(value)){
// 		$(this).addClass("bd_col");
// 	}
// 	else{
// 		$(this).removeClass("bd_col");
// 	}
// });
// $(".login_input input").focus(function(){
// 	$(this).removeClass("bd_col");
// });
// $(".login_input .user_pwd").blur(function(){
// 	if($(this).val()==""){
// 		$(this).addClass("bd_col");
// 	}
// });
//
// function loginCheck(e) {
//     $.post( "./login",{
//         loginPhone: $('#loginPhone').val(),
//         password : $('#password').val()
//       },
//       function(i){
//         var jo = JSON.parse(i);
//         console.log(jo);
//         if(jo.success){
//           //dropAlert(jo.success);
//           alert(jo.success);
//           //window.location.href="/account/regist.html"
//         }else{
//           alert(jo.errmsg);
//         }
//       }
//     )
//   }



var libs = require('libs/libs');
var formValide = libs.formValide;
var api = require('../../_common/api')
var webUploader = require('modules/upload/index')

var form = $('#loginCheck')[0]
var loginPhone = form['login-form'];
var password   = form['password'];
var verifyCode = form['verify-code'];

function getFormData(){
    return {
		'loginPhone' : { 'ipt' : form['loginPhone'] } ,
		'password'   : { 'ipt' : form['password']} ,
		'verify'     : { 'ipt' : form['verify-code']}
    }
}

var chkOptions = {
    username: function(input_obj,reg){   // username 长度大于8，小于20
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.mobile.test(val);    //email check

        return tmp;
    },
    password: function(input_obj,reg){
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = true,

        level = (val.length>5) ? 0 + (val.length>7) + (/[a-z]/.test(val) && /[A-Z]/.test(val)) + (/\d/.test(val) && /\D/.test(val)) + (/\W/.test(val) && /\w/.test(val)) + (val.length > 12) : 0;  //level  0  1  2  3  4  password stronger
        if(val.length>20||/\s/.test(val)) level=0; //不包括空格
        if(level==0||!level){
            // tmp = false;
			tmp = tmp;
        }
        // chk['password']={};
        // chk['password']['level']=level;
        return tmp;
    }
}

function chkInputValue(){
	var inputs = getFormData();

	//valide login value
	var forLoginStat = formValide(chkOptions)
	(inputs.loginPhone,'username')
	(inputs.password,'password')
	();

	//assemble query
	var query = {
		loginPhone: inputs.loginPhone.ipt.value,
		password: inputs.password.ipt.value
	}

	if(forLoginStat){
        //ajax 提交
		api.req('login',query,function(body){
			if(body.success){
                window.location = body.redirect;
			}
			if(body.errStat){
				alert(222);
			}
		})
        // $(form).submit();
	}
}
$('#login').click(function(){
	chkInputValue();
})


var state = 'pending';
var $btn = $('#ctlBtn');
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
