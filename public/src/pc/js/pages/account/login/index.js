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
