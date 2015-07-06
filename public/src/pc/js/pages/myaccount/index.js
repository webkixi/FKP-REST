$(function(){
	// $("#mybasic input").focus(function(){
	// 	if($(this).val()==this.defaultValue){
	// 		$(this).next(".error_msg").html("");
	// 		$(this).removeClass("bd_col");
	// 	}
	// });
	var mobilepartn = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	$("#mybasic .user_phone").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("请输入手机号码");
		$(this).removeClass("bd_col");
	});	
	$("#mybasic .user_phone").blur(function(){
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
	$("#mypwd .user_pwdn").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("6-20位字符，建议由字母，数字和符号两种以上组合");
		$(this).removeClass("bd_col");
	});	
	$("#mypwd .user_pwdn").blur(function(){
		if($(this).val()==""){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").css("color","#ff6600");
			$(this).next(".error_msg").html("密码不能为空");
		}
	});
	$("#mypwd .user_pwdn").keyup(function(){
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
	$("#mypwd .user_pwdnd").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("请再输入密码");
		$(this).removeClass("bd_col");
	});	
	$("#mypwd .user_pwdnd").blur(function(){
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
	$("#mybasic .user_tname").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("请输入联系人姓名");
		$(this).removeClass("bd_col");

	});
	$("#mybasic .user_tname").blur(function(){
		if($(this).val()==""){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").html("请输入联系人姓名").css("color","#ff6600");
		}else{
			$(this).next(".error_msg").html("");
		}
	});
	$("#mybasic .user_company").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("请输入公司全称");
		$(this).removeClass("bd_col");
	});
	$("#mybasic .user_company").blur(function(){
		if($(this).val()==""){
			$(this).addClass("bd_col");
			$(this).next(".error_msg").html("请输入公司全称").css("color","#ff6600");
		}else{
			$(this).next(".error_msg").html("");
		}
	});

	$("#mybasic .user_email").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("请输入联系邮箱，如xxxxxx@xxx.com");
		$(this).removeClass("bd_col");

	});
	$("#mybasic .user_email").blur(function(){
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
	$("#mybasic .user_fax").blur(function(){
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
	$("#mybasic .user_fax").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("格式:区号-电话号码,电话号码;");
		$(this).removeClass("bd_col");

	});
	$("#mybasic .user_qq").focus(function(){
		$(this).next(".error_msg").css("color","#666");
		$(this).next(".error_msg").html("请输入QQ数字号码");
		$(this).removeClass("bd_col");

	});
	$("#mybasic .user_qq").blur(function(){
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
	/*判断是否有图片*/
	base_url = document.location.href.substring(0, document.location.href.indexOf('index.html'), 0);
	$(".gallery a").lightBox();
	$(".gallery").each(function(i, item) {
		var imgObj = $(".gallery").eq(i).find("img");
		var str = "jpg,png,jpeg,gif"
		if(str.indexOf(imgObj.attr("src").slice(-3))<0){
			imgObj.parents(".gallery").css("visibility", "hidden");
		}
	});
	/*图片认证上传*/
	var iframe = false;
	var dataType = "json";
	var url = "/account-picture-upload.html";
	if (!$.support.leadingWhitespace) {
		iframe = true;
		dataType = "text";
	}
	$('#inputLiecnces').fileupload({
		dataType : dataType,
		iframe : iframe,
		autoUpload : true,
		sequentialUploads : true,
		maxChunkSize : 10000000,
		minFileSize : 1000,
		url : url,
		add : function(e, data) {
			data.submit();
		},
		done : function(e, data) {
			var gallery = $(this).parent().next(".gallery");
			gallery.css("visibility", "");
			$("#inputLiecncesPic").attr("src", data.result.path + data.result.fileName);
			$("#inputLiecncesName").val(data.result.fileName);
			$("#inputLiecncesHref").attr("href", data.result.path + data.result.fileName);
		}
	});
	$('#inputOrgCode').fileupload({
		dataType : dataType,
		iframe : iframe,
		autoUpload : true,
		sequentialUploads : true,
		maxChunkSize : 10000000,
		minFileSize : 1000,
		url : url,
		add : function(e, data) {
			data.submit();
		},
		done : function(e, data) {
			var gallery = $(this).parent().next(".gallery");
			gallery.css("visibility", "");
			$("#inputOrgCodePic").attr("src", data.result.path + data.result.fileName);
			$("#inputOrgCodeName").val(data.result.fileName);
			$("#inputOrgCodeHref").attr("href", data.result.path + data.result.fileName);
		}
	});
	$('#inputTax').fileupload({
		dataType : dataType,
		iframe : iframe,
		autoUpload : true,
		sequentialUploads : true,
		maxChunkSize : 10000000,
		minFileSize : 1000,
		url : url,
		add : function(e, data) {
			data.submit();
		},
		done : function(e, data) {
			var gallery = $(this).parent().next(".gallery");
			gallery.css("visibility", "");
			$("#inputTaxPic").attr("src", data.result.path + data.result.fileName);
			$("#inputTaxName").val(data.result.fileName);
			$("#inputTaxHref").attr("href", data.result.path + data.result.fileName);
		}
	});	
});
