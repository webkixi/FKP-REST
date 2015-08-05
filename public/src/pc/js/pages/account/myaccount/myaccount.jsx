require('../../_comm_plug/jquery_ui')
// require('../../_comm_plug/jquery.fileupload')
// require('./index')
// require('./jquery.lightbox')
// require('./index2')

var libs = require('libs/libs');
var formValide = libs.formValide;
var api = require('../../_common/api')


    /*
* 地区选择
*/
function getRegion(id,_this,arr1){
    var arr = [];
    if(arr1)arr = arr1;
    var query = {id: id};
    api.req('region',query,function(body){
      if(body.success&&body.data.regionList.length){
        _this.empty()
        body.data.regionList.map(function(item){
          if(item.id == arr[0]||item.id == arr[1]||item.id == arr[2])_this.append('<option selected="selected" value='+item.id+'>'+item.regionName+'</option>');
          else _this.append('<option value='+item.id+'>'+item.regionName+'</option>');
        })
        if(_this.find("option[selected]").length<=0)_this.find("option").eq(0).attr("selected","selected");

        if(_this.attr("name")=="province"){
          getRegion(_this.find("option[selected]").val(),$("select[name='city']"),arr)
        }
        if(_this.attr("name")=="city"){
          getRegion(_this.find("option[selected]").val(),$("select[name='district']"),arr)
        }
      }
    })
}
// 需要异步获取默认地址时可以执行以下语句，数组参数为省，市，区 ID
//getRegion(0,$(select[name='province']),[19,233,2375]);
$(".select_address").change(function(){
  var _this = $(this);
  if(_this.attr("name")=="province"){
    getRegion(_this.val(),$("select[name='city']"))
  }
  if(_this.attr("name")=="city"){
    getRegion(_this.val(),$("select[name='district']"))
  }
})


/*
* form 表单提交
* 3个表单
*/
var rePassForm = $('#accountSavePassword')[0];
var authForm = $('#part2')[0];
var baseForm = $('#accountSaveBaseInfo')[0];

// function getFormData(fff){
//     return {
// 		'oldPassword' : { 'ipt' : fff['oldPassword']},
// 		'newPassword' : { 'ipt' : fff['newPassword']},
// 		'repassword'  : { 'ipt' : fff['repassword']}
//     }
// }
function getFormData(){
    return {
        'RegOldPwd' : { 'ipt' : rePassForm['oldPassword'],'Etip' : "6-20位字符，建议由字母，数字和符号两种以上组合",'Rtip' : "密码长度只能在6-20位字符之间",'tip' : ""},
        'RegPwd' : { 'ipt' : rePassForm['newPassword'],'Etip' : "6-20位字符，建议由字母，数字和符号两种以上组合",'Rtip' : "密码长度只能在6-20位字符之间",'tip' : ""},
        'RegrePwd' : { 'ipt' : rePassForm['repassword'],'Etip' : "6-20位字符，建议由字母，数字和符号两种以上组合",'Rtip' : "两次密码不一致,请重新输入",'tip' : ""},
        'loginPhone' : { 'ipt' : baseForm['loginPhone'],'Etip' : "请输入手机号码",'Rtip' : "请输入正确的手机号码格式",'tip' : "手机号码已经存在!" }, 
        'RegName' : { 'ipt' : baseForm['name'],'Etip' : "请输入联系人姓名",'Rtip' : "请输入正确格式的联系人姓名",'tip' : ""},
        'RegFullname' : { 'ipt' : baseForm['firmFullName'],'Etip' : "请输入公司全称",'Rtip' : "请输入正确格式的公司全称",'tip' : ""},
        'RegLandline' : { 'ipt' : baseForm['landline'],'Etip' : "格式:区号-电话号码;如 020-88888888",'Rtip' : "请输入正确格式的公司固话",'tip' : ""},
        'RegFax' : { 'ipt' : baseForm['fax'],'Etip' : "格式:区号-电话号码;如 020-88888888",'Rtip' : "请输入正确格式的传真号码",'tip' : "短信验证码错误!"},
        'RegProv' : { 'ipt' : baseForm['province'],'Etip' : "请选择地区",'Rtip' : "",'tip' : ""},
        'RegCity' : { 'ipt' : baseForm['city'],'Etip' : "请选择地区",'Rtip' : "",'tip' : ""},
        'RegCounty' : { 'ipt' : baseForm['district'],'Etip' : "请选择地区",'Rtip' : "",'tip' : ""},
        'RegEmail' : { 'ipt' : baseForm['email'],'Etip' : "请输入电子邮件",'Rtip' : "邮箱格式错误,请重新输入",'tip' : ""},
        'RegQq' : { 'ipt' : baseForm['qq'],'Etip' : "请输入qq",'Rtip' : "qq格式错误,请重新输入",'tip' : ""},
        'RegAdd' : { 'ipt' : baseForm['address'],'Etip' : "请输入详细地址",'Rtip' : "",'tip' : ""}
    }
}
//修改密码
var chkOptions = {
    RegOldPwd: function(input_obj,reg){   // 密码 非空
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
            $(ipt).parent(".form-group").find(".error_msg").html("");
        }
        if(level==1){
            $(ipt).parent(".form-group").find(".error_msg").html("");
        }
        if(level==2){
            $(ipt).parent(".form-group").find(".error_msg").html("");
        }

        if(level==3){
            $(ipt).parent(".form-group").find(".error_msg").html("");
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
            $(ipt).parent(".form-group").find(".error_msg").html("6-20位字符，建议由字母，数字和符号两种以上组合");
        }
        if(level==1){
            $(ipt).parent(".form-group").find(".error_msg").html("您输入的密码强度过弱!");
        }
        if(level==2){
            $(ipt).parent(".form-group").find(".error_msg").html("您的密码已经很安全!");
        }

        if(level==3){
            $(ipt).parent(".form-group").find(".error_msg").html("无懈可击！");
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
            $(ipt).parent(".form-group").find(".error_msg").html("请输入密码");
        }
        else{
            if(val!==pval){
                $(ipt).addClass("bd_col");
                $(ipt).parent(".form-group").find(".error_msg").html("两次密码不一致,请重新输入");
            }
        }
        return tmp;
    },
    RegPhone: function(input_obj,reg){   // mobile 11长度
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.mobile.test(val);    //mobile check
        if(!tmp){
            $(ipt).addClass("bd_col");
            $(ipt).parent(".form-group").find(".error_msg").html("请输入正确的手机号码格式");
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
            $(ipt).parent(".form-group").find(".error_msg").html("请输入联系人姓名");
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
            $(ipt).parent(".form-group").find(".error_msg").html("请输入公司全称");
        }
        return tmp;
    },
    RegLandline: function(input_obj,reg){   // 固话 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.guhua.test(val);    //code check
        if(!tmp){
            $(ipt).addClass("bd_col");
            $(ipt).parent(".form-group").find(".error_msg").html("格式:区号-电话号码;如 020-88888888");
        }
        return tmp;
    },
    RegFax: function(input_obj,reg){   // 传真 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.guhua.test(val);    //code check
        if(!tmp){
            $(ipt).addClass("bd_col");
            $(ipt).parent(".form-group").find(".error_msg").html("格式:区号-电话号码;如 020-88888888");
        }
        return tmp;
    },
    RegEmail: function(input_obj,reg){   // 传真 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.email.test(val);    //code check
        if(!tmp){
            $(ipt).addClass("bd_col");
            $(ipt).parent(".form-group").find(".error_msg").html("请输入电子邮件");
        }
        return tmp;
    },
    RegQq: function(input_obj,reg){   // 传真 非空
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.qq.test(val);    //code check
        if(!tmp){
            $(ipt).addClass("bd_col");
            $(ipt).parent(".form-group").find(".error_msg").html("请输入qq号码");
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
            $(ipt).parent(".form-group").find(".error_msg").html("请选择地区");
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
            $(ipt).parent(".form-group").find(".error_msg").html("请选择地区");
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
            $(ipt).parent(".form-group").find(".error_msg").html("请选择地区");
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
            $(ipt).parent(".form-group").find(".error_msg").html("请输入详细地址");
        }
        return tmp;
    }   
}
function Regfocus(){
    $(this).bind('focus',function(){
        $(this).removeClass("bd_col");
        $(this).parent(".form-group").find(".error_msg").html("");
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
                //ipt.value='';
            }
            // if(ele=='RegOldPwd'){
            //     Regfocus.call(ipt);
            //     $(ipt).bind('blur',function(){
            //        //send mobile message
            //         tmp = formValide(chkOptions)
            //        (inputs[ele],'RegOldPwd')
            //        ();
            //     });
            // }
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
            if(ele=='loginPhone'){
                Regfocus.call(ipt);
                $(ipt).bind('blur',function(){
                    //form loginPhone
                   tmp = formValide(chkOptions)
                   (inputs[ele],'RegPhone')
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

function chkInputValue(){
	var inputs = getFormData();

	//valide login value
	var forResetPassWord = formValide(chkOptions)
	(inputs.RegOldPwd,'RegOldPwd')
	(inputs.RegPwd,'RegPwd')
	([inputs.RegPwd,inputs.RegrePwd],'RegrePwd')
	();

	//assemble query
	var query = {
		oldPassword: inputs.RegOldPwd.ipt.value,
		newPassword: inputs.RegPwd.ipt.value,
		repassword: inputs.RegrePwd.ipt.value,
        isForgetPassword: false
	}

	if(forResetPassWord){
        //ajax submit
		api.req('updateAccount',query,function(body){
			if(body.success){
                window.location = body.redirect;
			}
			if(body.errStat){
				messager.alert({title:"提示",content:body.msg,type:"error"});
			}
		})
        //normal submit
        // $(rePassForm).submit();
	}else{
        messager.alert({title:"提示",content:'密码不可为空',type:"warning"});
    }
}

$('#updatePassword').click(function(){
	chkInputValue();
})
function chkBaseInfo(){
    var inputs = getFormData();
    var chkBaseinfoValue = formValide(chkOptions)
    (inputs.loginPhone,'RegPhone') 
    (inputs.RegName,'RegName')
    (inputs.RegFullname,'RegFullname')
    (inputs.RegLandline,'RegLandline')
    (inputs.RegFax,'RegFax')
    (inputs.RegProv,'RegProv')
    (inputs.RegCity,'RegCity')
    (inputs.RegCounty,'RegCounty')
    (inputs.RegAdd,'RegAdd')
    ();
    //assemble query
    var query = {
        loginPhone: inputs.loginPhone.ipt.value,        
        name: inputs.RegName.ipt.value,
        firmFullName: inputs.RegFullname.ipt.value,
        landline: inputs.RegLandline.ipt.value,
        fax: inputs.RegFax.ipt.value,
        province: inputs.RegProv.ipt.value,
        city: inputs.RegCity.ipt.value,
        district: inputs.RegCounty.ipt.value,
        address: inputs.RegAdd.ipt.value
    }
    if(chkBaseinfoValue){
        api.req('updateAccountBase',query,function(body){
            if(body.success){
                messager.alert({title:"提示",content:'更新成功',type:"success"});
            }
            if(body.errStat){
                console.log(body.errStat)
                messager.alert({title:"提示",content:'更新失败',type:"error"});
            }
        })
    }
}
$('#updateBaseInfo').click(function(){
    // var query={};
    // $(baseForm).find('input[type="text"]').map(function(i,item){
    //     var n = item.name;
    //     var v = item.value;
    //     query[n] = v;
    // })

    // query.province = baseForm['province'].value;
    // query.city = baseForm['city'].value;
    // query.county = baseForm['district'].value;
    chkBaseInfo();
});

$('#accountAuth').click(function(){
    var query={};
    $(authForm).find('input[type="hidden"]').map(function(i,item){
        var n = item.name;
        var v = item.value;
        query[n] = v;
    });

    console.log(query);

    api.req('updateAccountAuth',query,function(body){
		if(body.success){
            messager.alert({title:"提示",content:'更新成功',type:"success"});
		}
		if(body.errStat){
			messager.alert({title:"提示",content:'更新失败',type:"error"});
		}
	})

})

var Uploader = require('modules/upload/upload');
var render = React.render;

var set_yyzz = function(){
    //上传完成后的回掉 this是上传图片信息
    var filename = this.name;
    $('#inputLiecncesName').val(filename)
}
var set_zzjg = function(){
    var filename = this.name;
    $('#inputOrgCodeName').val(filename)
}
var set_swdj = function(){
    var filename = this.name;
    $('#inputTaxName').val(filename)
}

render(
    <Uploader btn={'yyzz'} type={2} cb={set_yyzz}/>,
   document.getElementById('up_yyzz')
)

render(
    <Uploader btn={'zzjg'} maxNumber={1} type={2} cb={set_zzjg}/>,
   document.getElementById('up_zzjg')
)

render(
    <Uploader btn={'swdj'} type={2} cb={set_swdj}/>,
   document.getElementById('up_swdj')
)

// render(
//     <Uploader btn={'ctlBtn'}>
//         <div id={"uploader"} className={"wu-example"}>
//            <div id={"thelist"} className={"uploader-list"}></div>
//            <div className={"btns"}>
//                <div id={"picker"}>{"选择文件"}</div>
//                <button id={"ctlBtn"} className={"btn btn-default"}>{"开始上传"}</button>
//            </div>
//        </div>
//    </Uploader>,
//    document.getElementById('upup')
// )
