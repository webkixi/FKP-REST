$(function(){
	$(".r_wrap_list input,#mybasic input").focus(function(){
		if($(this).val()==this.defaultValue){
			$(this).next(".error_msg").html("");
			$(this).removeClass("bd_col");
		}
	});
	var mobilepartn = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	$(".r_wrap_list .user_phone").blur(function(){
		var value=$(this).val();
		if(value=="" || value.length != 11 || !mobilepartn.test(value)){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").html("请输入正确的手机号码格式");
		}
		else{		
			$(this).next(".error_msg").html("");
			$(this).removeClass("bd_col");
		}
	});
	$(".msgs").click (function() {
		sendMobileCode();
	});
	function sendMobileCode() {
	    if ($(".msgs").attr("disabled")) {
	        return;
	    }
	    var mobile = $("#loginPhone").val();
	    if ($(".user_phone").val()=="") {
	        $("#mobile_error").html("请输入手机号");
	        return;
	    }
	    if (!mobilepartn.test($(".user_phone").val())) {
	        $("#mobile_error").html("手机号码格式有误，请输入正确的手机号");
	        return;
	    }
	    // 检测手机号码是否存在
	    jQuery.ajax({
	        type: "get",
	        url: "send-sms-code.html?mobileNo=" + $("#loginPhone").val() + "&r=" + Math.random() +"&isForgetPassword=" + false,
	    	success: function(resp) {
	        if ("success" == resp) {
	            $("#mobile_error").html("");
	            mobileFlags = true;
	            sendmCode();
	        }else {
	        	$("#mobileCode_error").html(resp);
	        	}
	        }
	    });
	}
	function sendmCode() {
	var validCode=true
	    $(".msgs").attr("disabled", "disabled");
	    jQuery.ajax({
	        type: "get",
	        url: "send-sms-code.html?&mobileNo=" + $("#loginPhone").val() + "&r=" + Math.random(),
	        success: function(result) {
	        	if("success" == result){
					var time=60;
					var code=$(".msgs");
					if (validCode) {
						validCode=false;
						code.attr("disabled", "disabled");
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
	        		$("#mobileCode_error").html(result);
	        	}
	        }
	    });
	}	
/*
 * function sendmCode() { var validCode=true; jQuery.ajax({ type: "get", url:
 * "send-sms-code.html?&mobileNo=" + $("#loginPhone").val() + "&r=" +
 * Math.random(), success: function(result) { if("success" == result){ var
 * time=60; var code=$(".msgs"); if (validCode) { validCode=false;
 * code.attr("disabled", "disabled"); var t=setInterval(function () { time--;
 * code.html(time+"秒"); if (time==0) { clearInterval(t); code.html("重新获取");
 * validCode=true; code.removeAttr("disabled"); }
 * $("#mobileCode_error").html("验证码已发送，请查收短信。"); },1000) } }else{
 * $("#mobileCode_error").html(result); } } }); }
 */
	$(".r_wrap_list .phone_yzm").focus(function(){
		$(this).removeClass("bd_col");
		$(this).parent(".r_wrap_list .form-group").find(".error_msg").html("");
	});
	$(".r_wrap_list .phone_yzm").blur(function(){
		if($(this).val()==""){
			$(this).addClass("bd_col");
			$(this).parent(".r_wrap_list .form-group").find(".error_msg").html("请输入短信验证码");
		}
		else{
			$(this).removeClass("bd_col");
			$(this).parent(".r_wrap_list .form-group").find(".error_msg").html("");
			$(this).next(".error_msg").html("");
		}
	});
	/* 设置账号信息 */
	$(".r_wrap_list .user_name").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("4-20个字符,支持汉字、字母、数字组合");
		$(this).removeClass("bd_col");
	});
	$(".r_wrap_list .user_name").blur(function(){
		var rn=$(this).val();
		if(rn==""){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").css("color","#ff6600");
			$(this).next(".error_msg").html("请输入登录名");
		}
		else if(rn.length<4 || rn.length>20){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").css("color","#ff6600");
			$(this).next(".error_msg").html("用户名长度只能在4-20位字符之间");
		}
		else{
			$(this).removeClass("bd_col");
			$(this).next(".error_msg").html("");
		}
	});
	$(".r_wrap_list .user_pwd").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("6-20位字符，建议由字母，数字和符号两种以上组合");
		$(this).removeClass("bd_col");
	});	
	$(".r_wrap_list .user_pwd").blur(function(){
		if($(this).val()==""){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").css("color","#ff6600");
			$(this).next(".error_msg").html("密码不能为空");
		}
	});
	$(".r_wrap_list .user_pwd").keyup(function(){
		var t=$(this).val();
		var num=/^\d+$/;
		var zm=/^[A-Za-z]+$/;
		var fh=/^[!@#$,.';%^&*()_+|{}?><\-\]\\[\/]*$/;
		var zn=/^[\da-zA-Z]+$/;// 字母跟数字
		var zf=/^[a-zA-Z-`=\\\[\];',.\/~!@#$%^&*()_+|{}:"<>?]+$/;
		var nf=/^[-\d`=\\\[\];',.\/~!@#$%^&*()_+|{}:"<>?]+$/;
		var znf=/^[-\da-zA-Z`=\\\[\];',.\/~!@#$%^&*()_+|{}:"<>?]*$/;
		if((num.test(t) && t.length>=6 && t.length<12)||(zm.test(t)&& t.length>=6 && t.length<12)||(fh.test(t)&& t.length>=6 && t.length<12)){
			$('.pswInput b').css('background-position','0 0');
			$(this).next(".error_msg").css("color","#666");
			$(this).next(".error_msg").html("您输入的密码强度过弱!");
		}
		else if((num.test(t) && t.length>=12)||(zm.test(t) && t.length>=12) ||(fh.test(t) && t.length>=12)|| (zf.test(t) && t.length>=6 &&t.length<12)|| (nf.test(t) && t.length>=6 &&t.length<12) || (zn.test(t) && t.length>=6 &&t.length<12)){
			$(this).next(".error_msg").css("color","#666");
			$(this).next(".error_msg").html("您的密码已经很安全！");
		}
		else if((znf.test(t)&& t.length>=6)||(zf.test(t)&& t.length>=12)||(nf.test(t) && t.length>=12) ||(zn.test(t) && t.length>=12)){
			$(this).next(".error_msg").css("color","#666");
			$(this).next(".error_msg").html("无懈可击！");
		}
		else if(t.length<6){
			$(this).next(".error_msg").css("color","#ff6600");
			$(this).next(".error_msg").html("密码长度只能在6-20位字符之间");
		}
		$(this).removeClass("bd_col");
	});
	$(".r_wrap_list .user_pwds").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("请再输入密码");
		$(this).removeClass("bd_col");
	});	
	$(".r_wrap_list .user_pwds").blur(function(){
		if($(this).val()==""){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").css("color","#ff6600");
			$(this).next(".error_msg").html("密码不能为空");
		}
		else if($(this).val()!=$(".r_wrap_list .user_pwd").val()){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").css("color","#ff6600");
			$(this).next(".error_msg").html("密码输入不一致");
		}
		else{
			$(this).removeClass("bd_col");
			$(this).next(".error_msg").css("color","#666");
			$(this).next(".error_msg").html("");
		}
	});
	$(".r_wrap_list .user_tname").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("请输入联系人姓名");
		$(this).removeClass("bd_col");

	});
	$(".r_wrap_list .user_tname").blur(function(){
		if($(this).val()==""){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").html("请输入联系人姓名").css("color","#ff6600");
		}else{
			$(this).next(".error_msg").html("");
		}
	});
	$(".r_wrap_list .user_company").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("请输入公司全称");
		$(this).removeClass("bd_col");
	});
	$(".r_wrap_list .user_company").blur(function(){
		if($(this).val()==""){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").html("请输入公司全称").css("color","#ff6600");
		}else{
			$(this).next(".error_msg").html("");
		}
	});

	$(".r_wrap_list .user_email").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("请输入联系邮箱，如xxxxxx@xxx.com");
		$(this).removeClass("bd_col");

	});
	$(".r_wrap_list .user_email").blur(function(){
		if($(this).val()==""){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").html("请输入邮箱地址").css("color","#ff6600");
		}
		else{
			if(!checkEmail($(this).val())){
			$(this).addClass("bd_col");
				$(this).next(".error_msg").html("邮箱地址格式不正确");
			}
			else{
				$(this).next(".error_msg").html("");
			}
		}
	});
	function checkEmail(val){
		var RegExpt=[{'reg':/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/}];
		return RegExpt[0].reg.test(val);
	}
	$(".r_wrap_list .user_fax").blur(function(){
		var reg=/^(\d{3,4})?[-]?\d{7,8}$/;
		if($(this).val()==""){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").html("请输入传真号码").css("color","#ff6600");
		}
		else{
			if(!reg.test($(this).val())){
			$(this).addClass("bd_col");
				$(this).next(".error_msg").html("传真号码格式不正确").css("color","#ff6600");
			}
			else{
				$(this).next(".error_msg").html("");
			}
		}
	});	

	$(".r_wrap_list .user_fax").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("格式:区号-电话号码,电话号码;如 020-88888888");
		$(this).removeClass("bd_col");

	});
	$(".r_wrap_list .user_qq").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("请输入QQ数字号码");
		$(this).removeClass("bd_col");

	});
	$(".r_wrap_list .user_qq").blur(function(){
		var req=/^[1-9][0-9]{4,}$/;
		if($(this).val()==""){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").html("请输入QQ");
		}
		else{
			if(!req.test($(this).val())){
			$(this).addClass("bd_col");
				$(this).next(".error_msg").html("QQ格式不正确");
			}
			else{
				$(this).next(".error_msg").html("");
			}
		}
	});
	$(".r_wrap_list .user_landline").blur(function(){
		var reg=/^(\d{3,4})?[-]?\d{7,8}$/;
		if($(this).val()==""){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").html("请输入公司固话").css("color","#ff6600");
		}
		else{
			if(!reg.test($(this).val())){
			$(this).addClass("bd_col");
				$(this).next(".error_msg").html("公司固话格式不正确").css("color","#ff6600");
			}
			else{
				$(this).next(".error_msg").html("");
			}
		}
	});	
	$(".r_wrap_list .user_landline").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("格式:区号-电话号码;如 020-88888888");
		$(this).removeClass("bd_col");

	});	
});
