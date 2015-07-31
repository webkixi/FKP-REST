var libs = require('../../libs/libs');
var api = require('../../apis/javaapi');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});

function *demoRegistData(oridata){

    libs.clog('pages/forget.js');
    var dataSet = {};
    var mtd = this.method;

    console.log(mtd)

    if(mtd==='GET'){
        console.log('=================')
        // var path = libs.$url.parse(this.path).pathname.replace('/','') // 处理query和hash

    }
    else if(mtd==='POST'){
        libs.clog('pages/forget.js========POST');        

        // var userInfo = yield api.user({'loginPhone':'13268280401'})
        // console.log(userInfo); 
        var body = yield libs.$parse(this);

        if(typeof this.sess.step=='undefined'){
            if(typeof body.loginPhone =='undefined'){
                oridata.errmsg="手机号码错误"
            }else{
                var mobilepartn = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if(body.loginPhone=="" || body.loginPhone.length != 11 || !mobilepartn.test(body.loginPhone)){
                    oridata.errmsg = "手机号码格式错误";
                }else{
                    this.sess.step=1;
                    //return xxx;
                }
            }
        }
        if(this.sess.step===1){
            apiData = yield api.pullApiData('code',body);
            var jsonData = JSON.parse(apiData[1]);
            if(jsonData.success){
                if(typeof this.sess.code == 'undefined'){
                    var javaPhonecode = jsonData.data.phoneCode;
                    this.sess.code = javaPhonecode;
                    this.sess.step=2;
                    oridata.step=this.sess.step;
                    console.log(this.sess.code)
                }
            }else{
                oridata.errmsg = jsonData.errMsg;
            }
        }
        if(this.sess.step===2){
            apiDataCode = yield api.pullApiData('checkMC',body);
            var jsonDataCode = JSON.parse(apiDataCode[1]);
            if( jsonDataCode.success){
                if(typeof body.code=='undefined'||!body.code){
                    oridata.errmsg=jsonData.errMsg;
                }else{
                    if( body.code ===  this.sess.code){ 
                        this.sess.step = 3;
                        oridata.step = this.sess.step;
                    }else{
                        oridata.errmsg = "验证码错误";
                    }
                }
            }else{
                oridata.errmsg =jsonData.errMsg;
            }
        }
        if(this.sess.step===3){
            if(body.newPassword || body.repassword){
                if(body.newPassword =="" || body.repassword ==""){
                    oridata.errmsg = jsonData.errMsg;
                }else{
                    apiDataFor = yield api.pullApiData('updatePassword',body);
                    var jsonDataFor = JSON.parse(apiDataFor[1]);
                    if(jsonDataFor.success){
                        this.sess.step = 4;
                        oridata.step = this.sess.step;
                    }
                    else{
                        oridata.errmsg = jsonDataFor.errMsg;
                        //oridata.errmsg = "信息错误!";
                    }
                }
            }
        }
    }
    return oridata;
}

module.exports = {
    getData : demoRegistData
}
