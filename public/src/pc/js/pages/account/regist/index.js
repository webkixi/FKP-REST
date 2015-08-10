var libs = require('libs/libs');
var formValide = libs.formValide;
var api = require('../../_common/api')

var form = $('#RegCheck')[0]
var loginPhone = form['loginPhone'];
function getFormData(){
    return {
		'loginPhone' : { 'ipt' : form['loginPhone'],'Etip' : "请输入手机号码",'Rtip' : "请输入正确的手机号码格式",'tip' : "手机号码已经存在!" },
		'Regcode' : { 'ipt' : form['code'],'Etip' : "请输入短信验证码",'Rtip' : "请输入正确的短信验证码",'tip' : "短信验证码错误!"},
		'RegLoginname' : { 'ipt' : form['loginName'],'Etip' : "用户名长度只能在4-20位字符之间",'Rtip' : "请输入正确格式的用户名",'tip' : ""},
		'RegPwd' : { 'ipt' : form['password'],'Etip' : "6-20位字符，建议由字母，数字和符号两种以上组合",'Rtip' : "请输入正确格式的密码",'tip' : ""},
		'RegrePwd' : { 'ipt' : form['rePassword'],'Etip' : "6-20位字符，建议由字母，数字和符号两种以上组合",'Rtip' : "两次密码不一致,请重新输入",'tip' : ""},
		'RegName' : { 'ipt' : form['name'],'Etip' : "请输入联系人姓名",'Rtip' : "请输入正确格式的联系人姓名",'tip' : ""},
		'RegFullname' : { 'ipt' : form['firmFullName'],'Etip' : "请输入公司全称",'Rtip' : "请输入正确格式的公司全称",'tip' : ""},
		'RegLandline' : { 'ipt' : form['landline'],'Etip' : "格式:区号-电话号码;如 020-88888888",'Rtip' : "请输入正确格式的公司固话",'tip' : ""},
		'RegFax' : { 'ipt' : form['fax'],'Etip' : "格式:区号-电话号码;如 020-88888888",'Rtip' : "请输入正确格式的传真号码",'tip' : "短信验证码错误!"},
		'RegProv' : { 'ipt' : form['province'],'Etip' : "请选择地区",'Rtip' : "",'tip' : ""},
		'RegCity' : { 'ipt' : form['city'],'Etip' : "请选择地区",'Rtip' : "",'tip' : ""},
		'RegCounty' : { 'ipt' : form['district'],'Etip' : "请选择地区",'Rtip' : "",'tip' : ""},
		'RegEmail' : { 'ipt' : form['eMail'],'Etip' : "请输入电子邮件",'Rtip' : "邮箱格式错误,请重新输入",'tip' : ""},
		'RegQq' : { 'ipt' : form['qq'],'Etip' : "请输入qq",'Rtip' : "qq格式错误,请重新输入",'tip' : ""},
		'RegAdd' : { 'ipt' : form['address'],'Etip' : "请输入详细地址",'Rtip' : "",'tip' : ""},
		'RegMustRead' : { 'ipt' : form['mustRead'],'Etip' : "您未勾选同意《注册协议》",'Rtip' : "",'tip' : ""}
    }
}
var chkOptions = {
    RegPhone: function(input_obj,reg){   // mobile 11长度
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.mobile.test(val);    //mobile check
        if(val==""){
            $(ipt).addClass("bd_col");
            $(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请输入手机号码");
        }
        else if(!tmp){
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
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("");
        }
        return tmp;
    },
    RegLoginname: function(input_obj,reg){   // 用户名 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.username.test(val);    //code check
        if(val.length<4 || !tmp){
            $(ipt).addClass("bd_col");
            $(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("用户名长度只能在4-20位字符之间");
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
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请再输入密码");
        }
        else{
        	if(val!==pval){
        		$(ipt).addClass("bd_col");
	            $(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("两次密码不一致,请重新输入");
	        }
        }
        return tmp;
    },
    RegName: function(input_obj,reg){   // 联系人 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.notempty.test(val);    //code check
        if(!tmp){
        	$(ipt).addClass("bd_col");
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请输入联系人姓名");
        }
        return tmp;
    },
    RegFullname: function(input_obj,reg){   // 公司全称 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.notempty.test(val);    //code check
        if(!tmp){
        	$(ipt).addClass("bd_col");
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请输入公司全称");
        }
        return tmp;
    },
    RegLandline: function(input_obj,reg){   // 固话 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.guhua.test(val);    //code check
        if(val==""){
            $(ipt).addClass("bd_col");
            $(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请输入公司固话");
        }
        else if(!tmp){
            $(ipt).addClass("bd_col");
            $(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("格式:区号-电话号码;如 020-88888888");
        }
        return tmp;
    },
    RegFax: function(input_obj,reg){   // 传真 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.guhua.test(val);    //code check
        if(val==""){
            $(ipt).addClass("bd_col");
            $(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请输入传真号码");
        }
        else if(!tmp){
            $(ipt).addClass("bd_col");
            $(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("格式:区号-电话号码;如 020-88888888");
        }
        return tmp;
    },
    RegEmail: function(input_obj,reg){   // 传真 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.email.test(val);    //code check
        if(val==""){
            //$(ipt).addClass("bd_col");
            $(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("");
        }
        else if(!tmp){
            $(ipt).addClass("bd_col");
            $(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请输入正确的邮箱格式");
        }
        return tmp;
    },
    RegQq: function(input_obj,reg){   // 传真 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.qq.test(val);    //code check
        if(val==""){
            //$(ipt).addClass("bd_col");
            $(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("");
        }
        else if(!tmp){
            $(ipt).addClass("bd_col");
            $(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请输入正确的qq格式");
        }
        return tmp;
    },
    RegProv: function(input_obj,reg){   // 地区 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.notempty.test(val);    //code check
        if(!tmp){
        	$(ipt).addClass("bd_col");
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请选择地区");
        }
        return tmp;
    },
    RegCity: function(input_obj,reg){   // 地区 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.notempty.test(val);    //code check
        if(!tmp){
        	$(ipt).addClass("bd_col");
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请选择地区");
        }
        return tmp;
    },
    RegCounty: function(input_obj,reg){   // 地区 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.notempty.test(val);    //code check
        if(!tmp){
        	$(ipt).addClass("bd_col");
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请选择地区");
        }
        return tmp;
    },
    RegAdd: function(input_obj,reg){   // 地址 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.notempty.test(val);    //code check
        if(!tmp){
        	$(ipt).addClass("bd_col");
        	$(ipt).parent(".r_wrap_list .form-group").find(".error_msg").html("请输入详细地址");
        }
        return tmp;
    },
    RegMustRead: function(input_obj,reg){   // 地址 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.notempty.test(val);    //code check
        if(!tmp||tmp==0){
        	//alert("请勾选!!");
            messager.alert({title:"提示",content:"您未勾选同意《注册协议》",type:"warning"});
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
                     $("#enterCode").val("");
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
            if(ele=='RegLoginname'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   (inputs[ele],'RegLoginname')
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
            if(ele=='RegName'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   (inputs[ele],'RegName')
                   ();
                });
            }
            if(ele=='RegFullname'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   (inputs[ele],'RegFullname')
                   ();
                });
            }
            if(ele=='RegLandline'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   (inputs[ele],'RegLandline')
                   ();
                });
            }
            if(ele=='RegFax'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   (inputs[ele],'RegFax')
                   ();
                });
            }
            if(ele=='RegEmail'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   (inputs[ele],'RegEmail')
                   ();
                });
            }
            if(ele=='RegQq'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   (inputs[ele],'RegQq')
                   ();
                });
            }
            if(ele=='RegProv'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   (inputs[ele],'RegProv')
                   ();
                });
            }
            if(ele=='RegCity'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   (inputs[ele],'RegCity')
                   ();
                });
            }
            if(ele=='RegCounty'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   (inputs[ele],'RegCounty')
                   ();
                });
            }            
            if(ele=='RegAdd'){
            	Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                   //send mobile message
                    tmp = formValide(chkOptions)
                   (inputs[ele],'RegAdd')
                   ();
                });
            }
            if(ele=='RegMustRead'){
            	Regfocus.call(ipt);
                $(ipt).bind('click',function(){
                   //send mobile message
                   $(ipt).val($(ipt).val()==0?1:0);
                   tmp = formValide(chkOptions)
                   (inputs[ele],'RegMustRead')
                   ();
                });
            }
        })(ipt)
    }
}
bindInputDefaultEvent();


    /*
* 地区选择
*/
function getRegion(id,_this,arr1){
    var arr = [];
    if(arr1)arr = arr1;
    var query = {id: id};
    api.req('region',query,function(body){
      if(body.success){
        console.log(name);
        _this.empty()
        if(body.data.regionList.length>0){
            body.data.regionList.map(function(item){
              if(item.id == arr[0]||item.id == arr[1]||item.id == arr[2])_this.append('<option selected="selected" value='+item.id+'>'+item.regionName+'</option>');
              else _this.append('<option value='+item.id+'>'+item.regionName+'</option>');
            })
        }else{
            _this.append('<option>城区</option>');
        }
        if(_this.find("option[selected]").length<=0)_this.find("option").eq(0).attr("selected","selected");

        if(_this.attr("name")=="province"){
          getRegion(_this.find("option[selected]").val(),$("select[name='city']"),arr)
        }
        if(_this.attr("name")=="city"){
          getRegion(_this.find("option[selected]").val(),$("select[name='district']"),arr)
        }
      }else{
        _this.empty().append('<option>城区</option>');
      }
    })
}
// 需要异步获取默认地址时可以执行以下语句，数组参数为省，市，区 ID
//getRegion(0,$("select[name='province']"),[19,233,2375]);
$(".select_address").change(function(){
  var _this = $(this);
  if(_this.attr("name")=="province"){
    getRegion(_this.val(),$("select[name='city']"))
  }
  if(_this.attr("name")=="city"){
    getRegion(_this.val(),$("select[name='district']"))
  }
})
// /*
// * 地区选择
// */
// function getRegion(id,cb){
//     var query = {id: id};
//     api.req('region',query,function(body){
// 		if(body.success){
//             cb(body);
// 		}
//     })
// }
// //三级联动
// $('.u_address').delegate('select','change',function(){
//     var index = $(this).index();
//     var id = $(this).val();
//     //省份
//     if(index===1){
//         $('#city').html('');
//         $('#city').append("<option value=''>--选择城市--</option>");
//         getRegion(id,function(body){
//             //设置传输数据
//             var citys = body.data.regionList;
//             citys.map(function(city,i){            	
//                 $('#city').append('<option value='+city.id+'>'+city.regionName+'</option>');
//             })
//         })
//     }
//     if(index===2){
//         $('#district').html('');
//         $('#district').append("<option value=''>--选择区县--</option>");
//         getRegion(id,function(body){
//             //设置传输数据
//             var countys = body.data.regionList;
//             countys.map(function(county,i){
//                 $('#district').append('<option value='+county.id+'>'+county.regionName+'</option>')
//             })
//         })
//     }
// })

var step=0;
function chkPhoneValue(){
        step=0;
	var inputs = getFormData();
	//valide login value
	var RegPhoneStat = formValide(chkOptions)
	(inputs.loginPhone,'RegPhone')
	();
	//assemble query 
	var query = {
		loginPhone: inputs.loginPhone.ipt.value,
		isForgetPassword: false,
        step: step
	}
	if(RegPhoneStat){
        //ajax 提交
		api.req('regist',query,function(body){
			if(body.success){
	            $("#mobile_error").html("");
	            mobileFlags = true;
	            var validCode=true
	            var time=60;
				var code=$(".msgs");
                step = body.step;
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
	        	$("#mobileCode_error").html(body.msg);
	        }
		})
        // $(form).submit();
	}
}
$('.msgs').click(function(){
    if($(this).hasClass("gray")) return false;
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
		isForgetPassword: false,
        step: step
	}
	if(RegCodeStat){
        //ajax 提交
		api.req('regist',query,function(body){
			//var jo = JSON.parse(body);
			if(body.success){
	          //dropAlert(jo.success);
                step = body.step;
	          	$(".r_wyzsj").addClass("hidden");
				$(".r_wyzsj").next().removeClass("hidden");
				$(".r_progress").addClass("r_p2");
	        }else{
                messager.alert({title:"提示",content:body.msg,type:"warning"});
	        	//alert(body.msg);
	        	//dropAlert(jo.errmsg);
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
	var mustRead = 0;
	var RegAccountStat = formValide(chkOptions)
	(inputs.loginPhone,'RegPhone')
	(inputs.Regcode,'Regcode')
	(inputs.RegLoginname,'RegLoginname')
	(inputs.RegPwd,'RegPwd')
	([inputs.RegPwd,inputs.RegrePwd],'RegrePwd')
	(inputs.RegName,'RegName')
	(inputs.RegFullname,'RegFullname')
	(inputs.RegLandline,'RegLandline')
	(inputs.RegFax,'RegFax')
	(inputs.RegProv,'RegProv')
	(inputs.RegCity,'RegCity')
	(inputs.RegCounty,'RegCounty')
	(inputs.RegAdd,'RegAdd')
	(inputs.RegMustRead,'RegMustRead')
	();
    console.log(RegAccountStat)
	//assemble query 
	var query = {
		loginPhone: inputs.loginPhone.ipt.value,
		code: inputs.Regcode.ipt.value,
		loginName: inputs.RegLoginname.ipt.value,
		password: inputs.RegPwd.ipt.value,
		rePassword: inputs.RegrePwd.ipt.value,
		name: inputs.RegName.ipt.value,
		firmFullName: inputs.RegFullname.ipt.value,
		landline: inputs.RegLandline.ipt.value,
		fax: inputs.RegFax.ipt.value,
		province: inputs.RegProv.ipt.value,
		city: inputs.RegCity.ipt.value,
		district: inputs.RegCounty.ipt.value,
		address: inputs.RegAdd.ipt.value,
		mustRead: inputs.RegMustRead.ipt.value,
        step: step
	}
    console.log(query)
	if(RegAccountStat){
        //ajax 提交
        console.log("bods")
		api.req('regist',query,function(body){
			//var jo = JSON.parse(body);
            console.log('body')
			if(body.success){
                step = body.step;
                console.log(step)
				var SregName = $("#loginName").val();
				$(".r_wmessage").addClass("hidden");
				$(".r_wmessage").next(".r_wsuccess").removeClass("hidden");
				$(".r_progress").removeClass("r_p2").addClass("r_p3");
				$(".Regname").html(SregName);
				$(".r_wrap_list.r_wmessage,.r_wrap_list.r_wyzsj").remove();
	        }else{
                messager.alert({title:"提示",content:body.msg,type:"warning"});
	        	//alert(body.msg);
	        	//dropAlert(jo.errmsg);
	        }
		})
        // $(form).submit();
	}
}
$('#account_ok').click(function(){
	checkAccount();
});


$('#capcode,#recode').click(function(){
    var random = libs.guid('capcode-');
    $('#capcode').attr('src','/captcha?'+random);
     $("#sendMobileCode").addClass("gray");
     $("#enterCode").val("");
});
$("#enterCode").keyup(function(){
    var _this = this;
    if(_this.value.length>=4){
        api.req('check_code',{code:_this.value},function(body){
            console.log(body)
            if(body.success){
                $(_this).removeClass("bd_col");
                $("#codeError").html("");
                if(!!$("#loginPhone").val()){
                    $("#sendMobileCode").removeClass("gray");
                }else{
                    $("#loginPhone").addClass("bd_col");
                    $("#mobile_error").html("请输入手机号码");
                }

            }else{
                $(_this).addClass("bd_col");
                $("#codeError").html(body.errMsg);
            }
        })
    }else{
                $(_this).removeClass("bd_col");
                $("#codeError").html("");
    }
    
})
