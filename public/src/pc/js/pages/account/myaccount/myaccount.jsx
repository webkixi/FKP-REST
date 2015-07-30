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
function getRegion(id,cb){
    var query = {id: id};
    api.req('region',query,function(body){
		if(body.success){
            cb(body);
		}
    })
}

$('.u_address').delegate('select','change',function(){
    var index = $(this).index();
    var id = $(this).val();
    //省份
    if(index===1){
        $('.city').html('');
        getRegion(id,function(body){
            //设置传输数据
            var citys = body.data.regionList;
            citys.map(function(city,i){
                $('.city').append('<option value='+city.id+'>'+city.regionName+'</option>')
            })
        })
    }
    if(index===2){
        $('.county').html('');
        getRegion(id,function(body){
            //设置传输数据
            var countys = body.data.regionList;
            countys.map(function(county,i){
                $('.county').append('<option value='+county.id+'>'+county.regionName+'</option>')
            })
        })
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
        var n = item.name;
        var v = item.value;
        query[n] = v;
    })

    query.province = baseForm['province'].value;
    query.city = baseForm['city'].value;
    query.county = baseForm['county'].value;

    api.req('updateAccountBase',query,function(body){
		if(body.success){
            alert(111)
		}
		if(body.errStat){
			alert(222);
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
            alert(111)
		}
		if(body.errStat){
			alert(222);
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
