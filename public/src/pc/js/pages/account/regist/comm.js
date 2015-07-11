var Enum = 
[
	{name:"loginPhone",guize:"/^(13|15)[0-9]{9}$/",tipA:"请输入正确的手机号码格式",tipB:"请输入手机号"},
	{name:"code",guize:"/^\\S+$/",tipA:"验证码不能为空",tipB:"请输入验证码"},
	{name:"loginName",guize:"/^-?[1-9]\\d*$/",tipA:"用户名长度只能在4-20位字符之间",tipB:"4-20个字符,支持汉字、字母、数字组合"},
	{name:"password",guize:"/^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/",tipA:"密码不能为空",tipB:"6-20位字符，建议由字母，数字和符号两种以上组合"},
	{name:"name",guize:"/^\\S+$/",tipA:"联系人不能为空",tipB:"请输入联系人姓名"},
	{name:"firmFullName",guize:"/^\\S+$/",tipA:"公司全称不能为空",tipB:"公司全称不能为空"},
	{name:"landline",guize:"/^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$/",tipA:"公司固话不能为空",tipB:"格式:区号-电话号码,电话号码;如 020-88888888"},
	{name:"fax",guize:"/^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$/",tip:"传真号码不能为空",tipA:"格式:区号-电话号码,电话号码;如 020-88888888"},
	{name:"eMail",guize:"/^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$/", tipA:"邮箱不能为空",tipB:"请输入邮箱地址"},
	{name:"qq",guize:"/^[1-9]*[1-9][0-9]*$/",tipA:"qq不能为空",tipB:"请输入QQ"}
]

$(function(){
	$(".form-control").focus(function(){
		var name = $(this).attr("name");
		for(var i=0;i<Enum.length;i++){
			var $this=$(this).val();
			if(Enum[i].name==name){
				if($this==""){
					$(this).parent(".form-group").find(".error_msg").html(Enum[i].tipB);
				}
			}
		}
	});
	$(".form-control").blur(function(){
		var name = $(this).attr("name");
		var $this = $(this).val();
		for(var i=0;i<Enum.length;i++){
			if(Enum[i].name==name){
				if($this=="" || !Enum[i].guize.test($this)){
					$(this).parent(".form-group").find(".error_msg").html(Enum[i].tipA);
				}
			}
		}
	});
	function zz(text,zz){
		return 
	}
})