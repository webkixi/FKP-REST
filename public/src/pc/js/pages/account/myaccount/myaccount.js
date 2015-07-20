require('../../_comm_plug/jquery_ui')
require('../../_comm_plug/jquery.fileupload')
// require('./index')
// require('./jquery.lightbox')
// require('./index2')

var libs = require('libs/libs');
var formValide = libs.formValide;
var api = require('../../_common/api')

/*
* 地区选择
*/
$('.province').change(function(){
    var city_id = $(this).val();

})




/*
* form 表单提交
* 3个表单
*/
var rePassForm = $('#accountSavePassword')[0];
var baseForm = $('#accountSaveBaseInfo')[0];

function getFormData(fff){
    return {
		'oldPassword' : { 'ipt' : fff['oldPassword']},
		'newPassword' : { 'ipt' : fff['newPassword']},
		'repassword'  : { 'ipt' : fff['repassword']}
    }
}

//修改密码
var chkOptions = {
    password: function(input_obj,reg){
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = true,

        level = (val.length>5) ? 0 + (val.length>7) + (/[a-z]/.test(val) && /[A-Z]/.test(val)) + (/\d/.test(val) && /\D/.test(val)) + (/\W/.test(val) && /\w/.test(val)) + (val.length > 12) : 0;  //level  0  1  2  3  4  password stronger
        if(!val) return false;
        if(val.length>20||/\s/.test(val)) level=0; //不包括空格
        if(level==0||!level){
			tmp = tmp;
        }
        return tmp;
    },
    repassword: function(input_obj,reg){
        var
        pobj = input_obj[0],   //password object
        pipt = pobj.ipt,
        pval = pipt.value,
        iobj = input_obj[1],    //repassword object
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = true;

        if(val!==pval)
            tmp = false;

        return tmp;
    }
}

function chkInputValue(){
	var inputs = getFormData(rePassForm);

	//valide login value
	var forResetPassWord = formValide(chkOptions)
	(inputs.oldPassword,'password')
	(inputs.newPassword,'password')
	([inputs.newPassword,inputs.repassword],'repassword')
	();

	//assemble query
	var query = {
		oldPassword: inputs.oldPassword.ipt.value,
		newPassword: inputs.newPassword.ipt.value,
		repassword: inputs.repassword.ipt.value
	}

	if(forResetPassWord){
        //ajax submit
		api.req('updateAccount',query,function(body){
			if(body.success){
                window.location = body.redirect;
			}
			if(body.errStat){
				alert(222);
			}
		})
        //normal submit
        // $(rePassForm).submit();
	}
}
$('#updatePassword').click(function(){
	chkInputValue();
})

$('#updateBaseInfo').click(function(){
    var query={};
    $(baseForm).find('input[type="text"]').map(function(i,item){
        console.log(item);
        var n = item.name;
        var v = item.value;
        query[n] = v;
    })

    api.req('updateAccountBase',query,function(body){
		if(body.success){
            window.location = body.redirect;
		}
		if(body.errStat){
			alert(222);
		}
	})
})
