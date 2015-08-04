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
				messager.alert({title:"提示",content:'更新失败',type:"error"});
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

$('#updateBaseInfo').click(function(){
    var query={};
    $(baseForm).find('input[type="text"]').map(function(i,item){
        var n = item.name;
        var v = item.value;
        query[n] = v;
    })

    query.province = baseForm['province'].value;
    query.city = baseForm['city'].value;
    query.county = baseForm['district'].value;

    api.req('updateAccountBase',query,function(body){
		if(body.success){
            messager.alert({title:"提示",content:'更新成功',type:"success"});
		}
		if(body.errStat){
			messager.alert({title:"提示",content:'更新失败',type:"error"});
		}
	})
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
    <Uploader btn={'zzjg'} type={2} cb={set_zzjg}/>,
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
