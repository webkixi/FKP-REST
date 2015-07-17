require('../../_comm_plug/jquery_ui')
require('../../_comm_plug/jquery.fileupload')
require('./index')
require('./jquery.lightbox')
require('./index2')

// var libs = require('libs/libs');
// var formValide = libs.formValide;
// var api = require('../../_common/api')
//
// var rePassForm = $('#accountSavePassword')[0]
// function getFormData(fff){
//     return {
// 		'oldPassword' : { 'ipt' : (fff['oldPassword'] } ,
// 		'newPassword'   : { 'ipt' : (fff['newPassword']} ,
// 		'repassword'     : { 'ipt' : (fff['repassword']}
//     }
// }
//
// var chkOptions = {
//     password: function(input_obj,reg){
//         var
//         iobj = input_obj,
//         ipt = iobj.ipt,
//         val = iobj.ipt.value,
//         tmp = true,
//
//         level = (val.length>5) ? 0 + (val.length>7) + (/[a-z]/.test(val) && /[A-Z]/.test(val)) + (/\d/.test(val) && /\D/.test(val)) + (/\W/.test(val) && /\w/.test(val)) + (val.length > 12) : 0;  //level  0  1  2  3  4  password stronger
//         if(val.length>20||/\s/.test(val)) level=0; //不包括空格
//         if(level==0||!level){
// 			tmp = tmp;
//         }
//         return tmp;
//     },
//     repassword: function(input_obj,reg){
//         var
//         pobj = input_obj[0],   //password object
//         pipt = pobj.ipt,
//         pval = pipt.value,
//         iobj = input_obj[1],    //repassword object
//         ipt = iobj.ipt,
//         val = iobj.ipt.value,
//         tmp = true;
//
//         if(val!==pval)
//             tmp = false;
//
//         return tmp;
//     }
// }
//
// function chkInputValue(){
// 	var inputs = getFormData(rePassForm);
//
// 	//valide login value
// 	var forLoginStat = formValide(chkOptions)
// 	(inputs.oldPassword,'password')
// 	(inputs.newPassword,'password')
// 	([inputs.newPassword,inputs.repassword],'repassword')
// 	();
//
// 	//assemble query
// 	var query = {
// 		loginPhone: inputs.loginPhone.ipt.value,
// 		password: inputs.password.ipt.value
// 	}
// 	// console.log(forLoginStat);
// 	// console.log(query);
// 	//post query to api and deal with response data
// 	// console.log(query);
// 	// console.log(forLoginStat);
// 	if(forLoginStat){
// 		api.req('login',query,function(body){
// 			if(body.success){
// 				alert(111)
// 			}
// 			if(body.error){
// 				alert(222);
// 			}
// 		})
// 	}
// }
// $('#updatePassword').click(function(){
// 	chkInputValue();
// })
