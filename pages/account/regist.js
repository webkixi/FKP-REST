var libs = require('../../libs/libs');
var api = require('../../apis/javaapi');
var validate = require('../../modules/validate');
var formValide = validate;

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});

var chkPhone = {
    RegPhone: function(phone, reg){   // username 长度大于8，小于20        
        tmp = reg.mobile.test(phone);    //email check
        return tmp;
    }
}
var chkCode = {
    RegPhone: function(phone, reg){   // username 长度大于8，小于20        
        tmp = reg.mobile.test(phone);    //email check
        return tmp;
    },
    RegCode: function(code, reg){   // username 长度大于8，小于20        
        tmp = reg.notempty.test(code);    //email check
        return tmp;
    }
}
var chkReg = {
    RegLoginname: function(loginName, reg){   // username 长度大于8，小于20        
        tmp = reg.mobile.test(loginName);    //email check
        return tmp;
    },
    RegPwd: function(password, reg){   // username 长度大于8，小于20        
        tmp = reg.notempty.test(password);    //email check
        return tmp;
    },
    RegName: function(name, reg){   // username 长度大于8，小于20        
        tmp = reg.notempty.test(name);    //email check
        return tmp;
    },
    RegFullname: function(firmFullName, reg){   // username 长度大于8，小于20        
        tmp = reg.notempty.test(firmFullName);    //email check
        return tmp;
    },
    RegLandline: function(landline, reg){   // username 长度大于8，小于20        
        tmp = reg.notempty.test(landline);    //email check
        return tmp;
    },
    RegFax: function(fax, reg){   // username 长度大于8，小于20        
        tmp = reg.notempty.test(fax);    //email check
        return tmp;
    },
    RegProv: function(province, reg){   // username 长度大于8，小于20        
        tmp = reg.notempty.test(province);    //email check
        return tmp;
    },
    RegAdd: function(address, reg){   // username 长度大于8，小于20        
        tmp = reg.notempty.test(address);    //email check
        return tmp;
    }
}
function *demoRegistData(oridata){
    libs.clog('pages/regist.js');

    var mtd = this.method;

    if(mtd==='GET'){
        var user;
        if(typeof this.sess.user!=='undefined'&&this.sess.user){
            user = this.sess.user;
            if(user.login){
                // junmp user center
                this.redirect('/account/regist')
            }
        }
        // deal with GET
        return oridata;
    }
    else if(mtd==='POST'){
        libs.clog('pages/regist.js========POST');
        var body = yield libs.$parse(this);
        var error = {
            errStat: 100,
            errMsgPhone: '手机号码校验错误',
            errMsgCode: '验证码校验错误'
        };
        var success = {
            success: true
        };
        if(error.errStat===100){
            //验证手机号码
            if(typeof(body.loginPhone)=='undefined'){
                error.errStat= 1;
                error.msg = "请输入手机号！";
                return error;
            }
            if(!body.loginPhone){
                error.errStat= 4;
                error.msg = "请输入正确的手机号码格式";
                return error;
            }
            var stat =  formValide(chkPhone)
            (body.loginPhone,'RegPhone')
            ();
            if(stat){
                apiData = yield api.pullApiData('code',body);
                var jsonData = JSON.parse(apiData[1]);
                if(jsonData.success){
                    if(this.sess.code){
                        error.errStat = 200;
                        console.log(error.errStat)
                        //return success;
                       
                    }else{
                        console.log('javaPhonecode')
                        var javaPhonecode = jsonData.data.phoneCode;
                        this.sess.code = javaPhonecode;
                        console.log(this.sess.code)
                        return success;
                    }
                }else{
                    console.log('jsonData.errMsg')
                    error.errStat = 5;
                    error.msg = jsonData.errMsg;
                    return error;
                }
            }else{
                return error;
            }
        }
        if(error.errStat===200){
            //验证手机号码与验证码
            if(typeof(body.loginPhone)=='undefined' || typeof(body.code)=='undefined'){
                if(typeof(body.loginPhone)=='undefined'){
                    error.errStat= 10;
                    error.msg = "请输入手机号！";
                    return error;
                }
                if(typeof(body.code)=='undefined'){
                    error.errStat = 11;
                    error.msg = '请输入验证码！';
                    return error;
                }
            }
            if(!body.loginPhone||!body.code){
                error.errStat= 12;
                error.msg = "手机或短信验证码不正确，请重新输入";
                return error;
            }
            var Vcode =  formValide(chkCode)
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
                            error.errStat = 300;
                            console.log(error.errStat)
                            return success;
                        }else{
                            error.errStat = 8;
                            error.msg = "短信验证码错误,请重新输入!";
                            return error;
                        }
                    }else{
                        console.log("code为空")
                        error.errStat = 7;
                        error.msg = jsonData.errMsg;
                        return error;
                    }
                }
                else{
                    error.errStat = 6;
                    error.msg = error.errMsgCode;
                    return error;
                }
            }else{
                return error;
            }
        }
        if(error.errStat===300){
            //验证注册时的基本信息
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
            if(typeof(body.loginName)=='undefined' || typeof(body.password)=='undefined' || typeof(body.name)=='undefined' || typeof(body.firmFullName)=='undefined' || typeof(body.landline)=='undefined' || typeof(body.fax)=='undefined' || typeof(body.province)=='undefined'  || typeof(body.address)=='undefined'){
                if(typeof(body.loginName)=='undefined'){
                    error.errStat= 13;
                    error.msg = "请输入用户名！";
                    return error;
                }
                if(typeof(body.password)=='undefined'){
                    error.errStat = 14;
                    error.msg = '请输入密码！';
                    return error;
                }
                if(typeof(body.name)=='undefined'){
                    error.errStat= 15;
                    error.msg = "请输入联系人姓名！";
                    return error;
                }
                if(typeof(body.firmFullName)=='undefined'){
                    error.errStat= 16;
                    error.msg = "请输入公司全称！";
                    return error;
                }
                if(typeof(body.landline)=='undefined'){
                    error.errStat= 17;
                    error.msg = "请输入公司固话！";
                    return error;
                }
                if(typeof(body.fax)=='undefined'){
                    error.errStat= 18;
                    error.msg = "请输入传真号码！";
                    return error;
                }
                if(typeof(body.province)=='undefined'){
                    error.errStat= 19;
                    error.msg = "请选择地区！";
                    return error;
                }
                if(typeof(body.address)=='undefined'){
                    error.errStat= 20;
                    error.msg = "请输入详细地址！";
                    return error;
                }
            }
            if(!body.loginPhone||!body.password||!body.name||!body.firmFullName||!body.landline||!body.fax||!body.province||!body.address){
                error.errStat= 21;
                error.msg = "注册信息不正确，请重新输入";
                return error;
            }
            console.log(chkReg)
            console.log("sssssssssssss")
            var Rcode =  formValide(chkReg)
            (body.loginName,'RegLoginname')
            (body.password,'RegPwd')
            (body.name,'RegName')
            (body.firmFullName,'RegFullname')
            (body.landline,'RegLandline')
            (body.province,'RegProv')
            (body.address,'RegAdd')
            ();
            console.log(Rcode)
            if(Rcode){
                apiDataReg = yield api.pullApiData('regist',body);
                var jsonDataReg = JSON.parse(apiDataReg[1]);
                console.log(jsonDataReg)
                if(jsonDataReg.success){
                    console.log("注册信息通过")
                    return success;
                }
                else{
                    console.log("注册失败!")
                    error.errStat = 22;
                    error.msg = jsonData.errMsg;
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
