var libs = require('../../libs/libs');
var api = require('../../apis/javaapi');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});

function *demoRegistData(oridata){

    libs.clog('pages/regist.js');
    var dataSet = {};
    var mtd = this.method;

    console.log(mtd)

    if(mtd==='GET'){
        console.log('=================')
        // var path = libs.$url.parse(this.path).pathname.replace('/','') // 处理query和hash

    }
    else if(mtd==='POST'){
        libs.clog('pages/regist.js========POST');
        // var userInfo = yield api.user({'loginPhone':'13268280401'})
        // console.log(userInfo); 
        // this.sess.step = 1;
        // this.sess.step = 2;
        // this.sess.step = 3;
        var body = yield libs.$parse(this);
        if(body.loginPhone){
            var mobilepartn = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if(body.loginPhone=="" || body.loginPhone.length != 11 || !mobilepartn.test(body.loginPhone)){
                oridata.errmsg = "手机号码格式错误";
            }
            else{
                apiData = yield api.pullApiData('code',body);
                var jsonData = JSON.parse(apiData[1]);
                if(this.sess.code){
                    console.log(this.sess.code)
                    if(jsonData.success){
                        oridata.Codesuccess = '2';
                        if(body.code){
                            apiDataCode = yield api.pullApiData('checkMC',body);
                            var jsonDataCode = JSON.parse(apiDataCode[1]);
                            if(body.code === this.sess.code){                        
                                this.sess.step = 1;
                                oridata.step = 1;
                            }else{
                                oridata.errmsg = "验证码错误";
                            }
                        }else{
                            oridata.errmsg = "请输入必填信息!";
                        }
                    }else{
                       oridata.errmsg = jsonData.errMsg;
                    }
                }else{
                    var javaPhonecode = jsonData.data.phoneCode;
                    this.sess.code = javaPhonecode;
                }
            }
        }else{
            oridata.errmsg = '请输入必填信息';
        }

        if(this.sess.step === 1){
            apiDataReg = yield api.pullApiData('regist',body);
            var jsonDataReg = JSON.parse(apiDataReg[1]);
            if(body.loginName || body.password || body.rePassword || body.name || body.firmFullName || body.landline || body.fax || body.user_asheng || body.address){
                if(body.loginName =="" || body.password =="" || body.rePassword =="" || body.name =="" || body.firmFullName =="" || body.landline == "" || body.fax =="" || body.user_asheng =="" || body.address ==""){
                    console.log("信息没有填写");
                    oridata.errmsg = jsonDataReg.errMsg;
                }else{
                    console.log("信息已经填写"); 
                    console.log(jsonDataReg)
                    if(jsonDataReg.success){
                        this.sess.step2 = 2;
                        oridata.step2 = this.sess.step2;
                    }
                    else{
                        //oridata.errmsg = jsonData.errMsg;
                        oridata.errmsg = "信息错误!";
                    }
                }
            }
            else{
                oridata.errmsg = jsonDataReg.errMsg;
            }
        }
    }
    return oridata;
}

module.exports = {
    getData : demoRegistData
}
