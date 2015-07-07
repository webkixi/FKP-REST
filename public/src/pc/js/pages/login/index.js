$(function(){
	var mobilepartn = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	$(".login_input .user_phone").blur(function(){
		var value=$(this).val();
		if(value=="" || value.length != 11 || !mobilepartn.test(value)){
			$(this).addClass("bd_col");
		}
		else{		
			$(this).removeClass("bd_col");
		}
	});	
	$(".login_input .user_pwd").blur(function(){
		if($(this).val()==""){
			$(this).addClass("bd_col");
		}
	});
})