var libs = require('../../libs/libs');
var api = require('../../apis/javaapi');
var validate = require('../../modules/validate');
var region = require('../../modules/region')
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
    RegLoginname: function(loginName, reg){   // RegLoginname 长度大于8，小于20        
        tmp = reg.username.test(loginName);    //email check
        return tmp;
    },
    RegName: function(name, reg){   // RegName 长度大于8，小于20        
        tmp = reg.notempty.test(name);    //email check
        return tmp;
    },
    RegPwd: function(input_obj, reg){   // RegPwd 长度大于8，小于20        
        var
        val = input_obj,
        tmp = true,
        level = (val.length>5) ? 0 + (val.length>7) + (/[a-z]/.test(val) && /[A-Z]/.test(val)) + (/\d/.test(val) && /\D/.test(val)) + (/\W/.test(val) && /\w/.test(val)) + (val.length > 12) : 0;  //level  0  1  2  3  4  password stronger
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
    },        
    RegFullname: function(firmFullName, reg){   // RegFullname 长度大于8，小于20        
        tmp = reg.notempty.test(firmFullName);    
        return tmp;
    },
    RegLandline: function(landline, reg){   // RegLandline 长度大于8，小于20        
        tmp = reg.guhua.test(landline);    //email check
        return tmp;
    },
    RegFax: function(fax, reg){   // RegFax 长度大于8，小于20        
        tmp = reg.guhua.test(fax);    //email check
        return tmp;
    },
    RegProv: function(province, reg){   // RegProv 长度大于8，小于20        
        tmp = reg.notempty.test(province);    //email check
        return tmp;
    },
    RegCity: function(city, reg){   // RegCity 长度大于8，小于20        
        tmp = reg.notempty.test(city);    //email check
        return tmp;
    },
    RegCounty: function(district, reg){   // RegCounty 长度大于8，小于20        
        tmp = reg.notempty.test(district);    //email check
        return tmp;
    },
    RegAdd: function(address, reg){   // RegAdd 长度大于8，小于20        
        tmp = reg.notempty.test(address);    //email check
        return tmp;
    },
    RegMustRead: function(mustRead, reg){   // RegMustRead 长度大于8，小于20        
        tmp = reg.notempty.test(mustRead);    //email check
        return tmp;
    }
}
function *demoRegistData(oridata){
    libs.clog('pages/regist.js');

    var mtd = this.method;

    if(mtd==='GET'){
        var provinces = [];
        var province = yield region.getRegion();
        var areaData =  JSON.parse(province[1]);
        areaData.data.regionList.map(function(item,i){        
            provinces.push("<option value='"+item.id+"'>"+item.regionName+"</option>");
        });
        var tmp_p = provinces.join('\n');
        var user;
        if(typeof this.sess.user!=='undefined'&&this.sess.user){
            user = this.sess.user;
            if(user.login){
                // junmp user center
                this.redirect('/account/regist')
            }
        }
        // deal with GET
        oridata.province=tmp_p;
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
            step:body.step,
            success: true
        };
        console.log(body.step + "```````````````````````````````````````````````")
        if(body.step == 0){
            console.log(body)
            if(typeof(body.loginPhone)=='undefined'){
                error.errStat= 1;
                error.msg = "请输入手机号！";
                return error;
            }
            if(!body.loginPhone){
                error.errStat= 4;
                error.msg = "请输入正确的手机号码格式";
                return error;
            }else{
                var stat =  formValide(chkPhone)
                (body.loginPhone,'RegPhone')
                ();            
                if(stat){
                    apiData = yield api.pullApiData('code',body);
                    var jsonData = JSON.parse(apiData[1]);
                    if(jsonData.success){
                        var javaPhonecode = jsonData.data.phoneCode;
                        console.log(javaPhonecode)
                        success.step = 2;
                       // this.sess.step = 2;
                        return success;
                    }else{
                        error.errStat = 5;
                        error.msg = jsonData.errMsg;
                        return error;
                    }
                }else{
                    return error;
                }
            }
        }
        if(body.step == 2){
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
            console.log(jsonDataCode)
                if(jsonDataCode.success){
                    // 验证验证码
                    //return success;
                    
                    success.step = 3;
                    return success;
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
        if(body.step == 3){
            //验证注册时的基本信息
            if(typeof(body.loginName)=='undefined' || typeof(body.name)=='undefined' || typeof(body.password)=='undefined' || typeof(body.rePassword)=='undefined' || typeof(body.firmFullName)=='undefined' || typeof(body.landline)=='undefined' || typeof(body.fax)=='undefined' || typeof(body.province)=='undefined' || typeof(body.city)=='undefined' || typeof(body.district)=='undefined' || typeof(body.address)=='undefined' || typeof(body.mustRead)=='undefined'){
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
                if(typeof(body.rePassword)=='undefined'){
                    error.errStat = 15;
                    error.msg = '两次密码不一止,请重新输入密码！';
                    return error;
                }
                if(typeof(body.name)=='undefined'){
                    error.errStat= 16;
                    error.msg = "请输入联系人姓名！";
                    return error;
                }
                if(typeof(body.firmFullName)=='undefined'){
                    error.errStat= 17;
                    error.msg = "请输入公司全称！";
                    return error;
                }
                if(typeof(body.landline)=='undefined'){
                    error.errStat= 18;
                    error.msg = "请输入公司固话！";
                    return error;
                }
                if(typeof(body.fax)=='undefined'){
                    error.errStat= 19;
                    error.msg = "请输入传真号码！";
                    return error;
                }
                if(typeof(body.province)=='undefined'){
                    error.errStat= 20;
                    error.msg = "请选择地区1！";
                    return error;
                }
                if(typeof(body.city)=='undefined'){
                    error.errStat= 21;
                    error.msg = "请选择地区2！";
                    return error;
                }
                if(typeof(body.district)=='undefined'){
                    error.errStat= 22;
                    error.msg = "请选择地区3！";
                    return error;
                }
                if(typeof(body.address)=='undefined'){
                    error.errStat= 23;
                    error.msg = "请输入详细地址！";
                    return error;
                }
                if(typeof(body.mustRead)=='undefined'){
                    error.errStat= 24;
                    error.msg = "请勾选！ss";
                    return error;
                }
            }
            if(!body.loginPhone||!body.name||!body.password||!body.rePassword||!body.firmFullName||!body.landline||!body.fax||!body.province||!body.city||!body.district||!body.address||!body.mustRead){
                error.errStat= 25;
                error.msg = "注册信息不正确，请重新输入";
                return error;
            }
            var Rcode = formValide(chkReg)
            (body.loginName,'RegLoginname')
            (body.name,'RegName')
            (body.password,'RegPwd')
            ([body.password,body.rePassword],'RegrePwd')
            (body.firmFullName,'RegFullname')
            (body.landline,'RegLandline')
            (body.fax,'RegFax')
            (body.province,'RegProv')
            (body.city,'RegCity')
            (body.district,'RegCounty')
            (body.address,'RegAdd')
            (body.mustRead,'RegMustRead')
            ();
            if(Rcode){
                apiDataReg = yield api.pullApiData('regist',body);
                var jsonDataReg = JSON.parse(apiDataReg[1]);
                if(jsonDataReg.success){
                    this.sess.step = 4;
                    return success;
                }
                else{
                    error.errStat = 26;
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
