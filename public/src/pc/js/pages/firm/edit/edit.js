var libs = require('libs/libs');
var formValide = libs.formValide;
var api = require('../../_common/api')

//指定form
var introForm = $('#firmIntroduceForm')[0];

//取得表单元素
function getFormData(fff){
    return {
		'introduce' : { 'ipt' : fff['introduce']}
    }
}

//校验方法
var chkOptions = {
    //校验字符串长度不能小于20
    intro: function( iobj, reg ){
        var ipt = iobj.ipt,
            val = iobj.ipt.value,
            tmp = true;

            if( libs.strLen(val) < 20 )
                tmp = false;

            return tmp
    }
}

//校验并提交
function chkInputValue(){
	var inputs = getFormData(introForm);

	//valide introduce value
    var forIntro = formValide(chkOptions)
        (inputs.introduce, 'intro')
        ();

	//assemble query
	var query = {
		introduce: inputs.introduce.ipt.value.toString()
	}

	if(forIntro){
        //ajax submit
        api.req('firmDetailSave',query,function(body){
            if(body.success){
                console.log(body);
			}
			else
                messager.alert({title:"企业简介更新失败",content:resp,type:"warning"});
				//alert(222);

        })
	}
}

$('#save-firm-introduce').click(function(){
    chkInputValue();
})
