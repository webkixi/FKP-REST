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
	$(".forget_msgs").click (function() {
		ForsendMobileCode();
	});
	function ForsendMobileCode() {
	    if ($(".forget_msgs").attr("disabled")) {
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
	    $.post("./forget",{loginPhone: $('#loginPhone').val(),isForgetPassword: true},function(i){
	    	console.log("come on")
			var jo = JSON.parse(i);
			console.log(jo)
	        if(jo.Codesuccess){
	          console.log("dddddddddddddddddddddddddddd")
	          //dropAlert(jo.success);
	          $("#mobile_error").html("");
	            mobileFlags = true;
	            var validCode=true
	            var time=60;
				var code=$(".forget_msgs");
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
	        	$("#mobileCode_error").html(jo.errmsg);
	        }
		});
	}
	$("#login_ok").click(function(){
		checkLogin();
	});
	function checkLogin(){
		var mobile = $("#loginPhone").val();
	    if ($(".user_phone").val()=="") {
	        $("#mobile_error").html("请输入手机号");
	        $(".user_phone").addClass("bd_col");
	        return;
	    }
	    if (!mobilepartn.test($(".user_phone").val())) {
	        $("#mobile_error").html("手机号码格式有误，请输入正确的手机号");
	        $(".user_phone").addClass("bd_col");
	        return;
	    }
		$.post("./forget",{loginPhone: $('#loginPhone').val(),code: $('#code').val(),isForgetPassword: true},function(i){
			var jo = JSON.parse(i);
			console.log(i)
	        if(jo.step===1){
				$(".r_wyzsj").addClass("hidden");
				$(".r_wyzsj").next().removeClass("hidden");
				$(".r_progress").addClass("r_p2");
	        }else{
	        	//dropAlert(jo.errmsg);
	        	alert(jo.errmsg);
	        	//messager.alert({title:"提示",content:resp,type:"warning"});
	        }
		})
	}
	$("#updatePassword").click (function() {
		updatePassword();
	});
	function updatePassword() {
		$.post("./forget",{loginPhone:$('#loginPhone').val(),newPassword:$('#newPassword').val(),repassword:$('#repassword').val()},
			function(i){
				console.log(i)
				var jo = JSON.parse(i);
				if(jo.step2===2){
					$(".account_msg").html("密码更新成功！");
					$("#myregerro").addClass("in show");
					$("#myregerro .close").click(function() {
						$("#myregerro").removeClass("in show");
						document.location.href = "/login.html";
					})
				}else{
					//dropAlert(resp);
					alert(resp);
				}
			})
		// $.ajax({
		// 	type : "GET",
		// 	url : "/account-forget-password.html?loginPhone=" + $('#loginPhone').val() + "&newPassword=" + $('#newPassword').val()
		// 			+ "&repassword=" + $('#repassword').val(),
		// 	timeout : 10000,
		// 	dataType : "text",
		// 	async : true,
		// 	success : function(resp) {
		// 		if (resp == "success") {
		// 			$(".account_msg").html("密码更新成功！");
		// 			$("#myregerro").addClass("in show");
		// 			$("#myregerro .close").click(function() {
		// 				$("#myregerro").removeClass("in show");
		// 				document.location.href = "/login.html";
		// 			})
		// 		} else {
		// 			dropAlert(resp);
		// 		}
		// 	},
		// 	error : function(e) {
		// 		alert(e.msg);
		// 	}
		// });
	}	
});
