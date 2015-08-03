var libs = require('../../libs/libs');
var api = require('../../apis/javaapi');
var validate = require('../../modules/validate');
var formValide = validate;

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});

var chkReg = {
    RegPhone: function(phone, reg){   // username 长度大于8，小于20        
        tmp = reg.mobile.test(phone);    //email check
        return tmp;
    },
    RegCode: function(code, reg){   // username 长度大于8，小于20        
        tmp = reg.notempty.test(code);    //email check
        return tmp;
    },
    RegPwd: function(input_obj, reg){   // RegPwd 长度大于8，小于20        
        var
        val = input_obj,
        tmp = true,
        level = (val.length>5) ? 0 + (val.length>=6) + (/[a-z]/.test(val) && /[A-Z]/.test(val)) + (/\d/.test(val) && /\D/.test(val)) + (/\W/.test(val) && /\w/.test(val)) + (val.length > 12) : 0;  //level  0  1  2  3  4  password stronger
        if(!val) return false;
        if(val.length>20||/\s/.test(val)) level=0; //不包括空格
        if(level==0||!level){
            tmp = tmp;
        }
        return tmp;
    },
    RegrePwd: function(input_obj, reg){   // RegrePwd 长度大于8，小于20
        var
        pval = input_obj[0],   //password object
        val = input_obj[1],    //repassword object
        tmp = true;
        if(val!==pval)
            tmp = false;
        return tmp;
    }
}
function *demoRegistData(oridata){
    libs.clog('pages/forget.js');
    var mtd = this.method;
    if(mtd==='GET'){
        console.log('=================')
        return oridata;
    }
    else if(mtd==='POST'){

        libs.clog('pages/forget.js========POST');
        var body = yield libs.$parse(this);
        var error = {
            errMsgPhone: '手机号码校验错误',
            errMsgCode: '验证码校验错误'
        };
        var success = {
            success: true
        };
        if(typeof this.sess.step=='undefined'){
            if(typeof(body.loginPhone)=='undefined'){
                error.msg = "请输入手机号！";
                return error;
            }
            if(!body.loginPhone){
                error.msg = "请输入正确的手机号码格式";
                return error;
            }else{
                this.sess.step = 1;
                //return success;
            }
        }

        if(this.sess.step===1){
            var stat =  formValide(chkReg)
            (body.loginPhone,'RegPhone')
            ();            
            if(stat){
                apiData = yield api.pullApiData('code',body);
                var jsonData = JSON.parse(apiData[1]);
                if(jsonData.success){
                    if(this.sess.code){
                        //return success;                       
                    }else{
                        var javaPhonecode = jsonData.data.phoneCode;
                        this.sess.code = javaPhonecode;
                        console.log(this.sess.code)
                        this.sess.step = 2;
                        return success;
                    }
                }else{
                    error.msg = jsonData.errMsg;
                    return error;
                }
            }else{
                return error;
            }
        }
        if(this.sess.step===2){
            //验证手机号码与验证码
            if(typeof(body.loginPhone)=='undefined' || typeof(body.code)=='undefined'){
                if(typeof(body.loginPhone)=='undefined'){
                    error.msg = "请输入手机号！";
                    return error;
                }
                if(typeof(body.code)=='undefined'){
                    error.msg = '请输入验证码！';
                    return error;
                }
            }
            if(!body.loginPhone||!body.code){
                error.msg = "手机或短信验证码不正确，请重新输入";
                return error;
            }
            var Vcode =  formValide(chkReg)
            (body.loginPhone,'RegPhone')
            (body.code,'RegCode')
            ();
            if(Vcode){
                apiDataCode = yield api.pullApiData('checkMC',body);
                var jsonDataCode = JSON.parse(apiDataCode[1]);
                if(jsonDataCode.success){
                    // 验证验证码
                    //return success;
                    if(body.code){
                        if(body.code === this.sess.code){
                            this.sess.step = 3;
                            return success;
                        }else{
                            error.msg = "短信验证码错误,请重新输入!";
                            return error;
                        }
                    }else{
                        error.msg = jsonData.errMsg;
                        return error;
                    }
                }
                else{
                    error.msg = error.errMsgCode;
                    return error;
                }
            }else{
                return error;
            }            
        }
        if(this.sess.step===3){
            //验证注册时的基本信息
            if(typeof(body.newPassword)=='undefined' || typeof(body.repassword)=='undefined'){
                if(typeof(body.newPassword)=='undefined'){
                    error.msg = '请输入密码！';
                    return error;
                }
                if(typeof(body.repassword)=='undefined'){
                    error.msg = '两次密码不一止,请重新输入密码！';
                    return error;
                }
            }
            if(!body.loginPhone||!body.code||!body.newPassword||!body.repassword){
                error.msg = "信息不正确，请重新输入";
                return error;
            }
            var Rcode = formValide(chkReg)
            (body.loginPhone,'RegPhone')
            (body.code,'RegCode')
            (body.newPassword,'RegPwd')
            ([body.newPassword,body.repassword],'RegrePwd')
            ();
            if(Rcode){
                apiDataReg = yield api.pullApiData('updatePassword',body);
                var jsonDataReg = JSON.parse(apiDataReg[1]);
                if(jsonDataReg.success){
                    this.sess.step = 4;
                    return success;
                }
                else{
                    error.msg = jsonDataReg.errMsg;
                    return error;
                }
            }else{
                return error;
            }           
        }
    }
}


module.exports = {
    getData : demoRegistData
}
