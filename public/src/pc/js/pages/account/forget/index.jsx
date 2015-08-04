var libs = require('libs/libs');
var formValide = libs.formValide;
var api = require('../../_common/api')

var form = $('#ForgetReg')[0]
var loginPhone = form['loginPhone'];
function getFormData(){
    return {
		'loginPhone' : { 'ipt' : form['loginPhone'],'Etip' : "请输入手机号码",'Rtip' : "请输入正确的手机号码格式",'tip' : "手机号码已经存在!" },
		'Regcode' : { 'ipt' : form['code'],'Etip' : "请输入短信验证码",'Rtip' : "请输入正确的短信验证码",'tip' : "短信验证码错误!"},
		'RegPwd' : { 'ipt' : form['newPassword'],'Etip' : "6-20位字符，建议由字母，数字和符号两种以上组合",'Rtip' : "请输入正确格式的密码",'tip' : ""},
		'RegrePwd' : { 'ipt' : form['repassword'],'Etip' : "6-20位字符，建议由字母，数字和符号两种以上组合",'Rtip' : "两次密码不一致,请重新输入",'tip' : ""}
    }
}
var chkOptions = {
    RegPhone: function(input_obj,reg){   // mobile 11长度
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.mobile.test(val);    //mobile check
        if(!tmp){
        	$(ipt).addClass("bd_col");
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请输入正确的手机号码格式");
        }
        return tmp;
    },
    Regcode: function(input_obj,reg){   // code 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.notempty.test(val);    //code check
        if(!tmp){
        	$(ipt).addClass("bd_col");
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请输入短信验证码");
        }
        return tmp;
    },
    RegPwd: function(input_obj,reg){   // 密码 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = true,
        level = (val.length>5) ? 0 + (val.length>=6) + (/[a-z]/.test(val) && /[A-Z]/.test(val)) + (/\d/.test(val) && /\D/.test(val)) + (/\W/.test(val) && /\w/.test(val)) + (val.length > 12) : 0;  //level  0  1  2  3  4  password stronger
        if(val.length>20||/\s/.test(val)) level=0; //不包括空格
        if(level==0||!level){
			//tmp = tmp;
			$(ipt).addClass("bd_col");
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("6-20位字符，建议由字母，数字和符号两种以上组合");
        }
        if(level==1){
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("您输入的密码强度过弱!");
        }
        if(level==2){
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("您的密码已经很安全!");
        }

        if(level==3){
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("无懈可击！");
        }
        // chk['password']={};
        // chk['password']['level']=level;
        return tmp;
    },
    RegrePwd: function(input_obj,reg){
        var
        pobj = input_obj[0],   //password object
        pipt = pobj.ipt,
        pval = pipt.value,
        iobj = input_obj[1],    //repassword object
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = true;
        if(!tmp){
        	$(ipt).addClass("bd_col");
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请输入密码");
        }
        else{
        	if(val!==pval){
        		$(ipt).addClass("bd_col");
	            $(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("两次密码不一致,请重新输入");
	        }
        }
        return tmp;
    }
}
function Regfocus(){
	$(this).bind('focus',function(){
    	$(this).removeClass("bd_col");
    	$(this).parent(".r_wrap_list .form-group").find(".error_msg").html("");
    });
}
/*
*  bind input element default event method
*  click, blur, keyup
*/
function bindInputDefaultEvent(){
    var 
    inpt,
    tmp,
    inputs = getFormData();
    //verify code refrash
    for(var ipt in inputs){
        var inpt = inputs[ipt]['ipt']; 
        (function(ele){
            var 
            ipt = inputs[ele]['ipt'],
            Etip = inputs[ele]['Etip'],
            Rtip = inputs[ele]['Rtip'],
            tip = inputs[ele]['tip'],
            api ;
            if(ipt){
                //console.log(ipt.value);
                ipt.value='';
            }
            if(ele=='loginPhone'){
                Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                    //form loginPhone
                   tmp = formValide(chkOptions)
                   (inputs[ele],'RegPhone')
                   ();
                });
            }
            if(ele=='Regcode'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   (inputs[ele],'Regcode')
                   ();
                });
            }
            if(ele=='RegPwd'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   (inputs[ele],'RegPwd')
                   ();
                });
            }
            if(ele=='RegrePwd'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   ([inputs['RegPwd'],inputs[ele]],'RegrePwd')
                   ();
                });
            }
        })(ipt)
    }
}
bindInputDefaultEvent();
function chkPhoneValue(){
	var inputs = getFormData();
	//valide login value
	var RegPhoneStat = formValide(chkOptions)
	(inputs.loginPhone,'RegPhone')
	();
	//assemble query 
	var query = {
		loginPhone: inputs.loginPhone.ipt.value,
		isForgetPassword: true,
		step: $("#step").val()
	}
	console.log(query)
	if(RegPhoneStat){
        //ajax 提交
		api.req('forget',query,function(body){
			if(body.success){
	            $("#mobile_error").html("");
	            mobileFlags = true;
	            var validCode=true
	            var time=60;
				var code=$("#sendMobileCode");
				if (validCode) {
					validCode=false;
					code.attr("disabled", "disabled");
					$("#step").val(body.step);
					var t=setInterval(function  () {
						time--;
						code.html(time+"秒");
						if (time==0) {
							clearInterval(t);
							code.html("重新获取");
							validCode=true;
							code.removeAttr("disabled");
						}
						$("#mobileCode_error").html("验证码已发送，请查收短信。");
						
					},1000)
				}
	        }else{
	        	$("#mobileCode_error").html(body.msg);
	        }
		})
        // $(form).submit();
	}
}
$('#sendMobileCode').click(function(){
	chkPhoneValue();
});
function chkCodeValue(){
	var inputs = getFormData();
	//code
	var RegCodeStat = formValide(chkOptions)
	(inputs.loginPhone,'RegPhone')
	(inputs.Regcode,'Regcode')
	();
	//assemble query 
	var query = {
		loginPhone: inputs.loginPhone.ipt.value,
		code: inputs.Regcode.ipt.value,
		isForgetPassword: true,
		step: $("#step").val()
	}
	console.log(query)
	if(RegCodeStat){
        //ajax 提交
		api.req('forget',query,function(body){
			//var jo = JSON.parse(body);
			if(body.success){
	          //dropAlert(jo.success);	          	
	          	$(".r_wyzsj").addClass("hidden");
				$(".r_wyzsj").next().removeClass("hidden");
				$(".r_progress").addClass("r_p2");
				$("#step").val(body.step);
	        }else{
	        	//alert(body.msg);
	        	messager.alert({title:"提示",content:"手机号码或短信验证码错误,请重新输入!",type:"warning"});
	        }
		})
        // $(form).submit();
	}
}
$('#login_ok').click(function(){
	chkCodeValue();
});
function checkAccount(){
	var inputs = getFormData();
	var RegAccountStat = formValide(chkOptions)
	(inputs.RegPwd,'RegPwd')
	([inputs.RegPwd,inputs.RegrePwd],'RegrePwd')
	();
	//assemble query 
	var query = {
		loginPhone: inputs.loginPhone.ipt.value,
		newPassword: inputs.RegPwd.ipt.value,
		repassword: inputs.RegrePwd.ipt.value,
		isForgetPassword: true,
		step: $("#step").val()
	}
console.log(query)
	if(RegAccountStat){
        //ajax 提交
		api.req('forget',query,function(body){
			//var jo = JSON.parse(body);
			if(body.success){
				console.log(body.step)
				messager.alert({title:"提示",content:"密码更新成功！",type:"success"});
	        }else{
	        	messager.alert({title:"提示",content:body.msg,type:"warning"});
	        	//dropAlert(jo.errmsg);
	        }
		})
        // $(form).submit();
	}
}
$('#updatePassword').click(function(){
	checkAccount();
});