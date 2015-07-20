
var libs = require('../../libs/libs');
var api = require('../../apis/javaapi');
var validate = require('../../modules/validate');
var region = require('../../modules/region')
var formValide = validate;

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});

var chkOptions = {
    password: function(input_obj,reg){
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
    repassword: function(input_obj,reg){
        var
        pval = input_obj[0],   //password object
        val = input_obj[1],    //repassword object
        tmp = true;

        if(val!==pval)
            tmp = false;

        return tmp;
    }
}

function *demoLoginData(oridata){
    libs.clog('pages/login.js');
    oridata.config = this.config;

    var mtd = this.method;
    var userData = {};

    if(mtd==='GET'){
        var province = yield region.getRegion();
        provData =  JSON.parse(province[1]);
        // console.log(provData.data.regionList[0]);
        var provinces = []
        provData.data.regionList.map(function(item,i){
            provinces.push({id: item.id, regionName: item.regionName})
        });

        var user,userData;
        if(typeof this.sess.user !== 'undefined'){
            user = this.sess.user;
            if(user.login){
                userData = this.sess.user;
                userData.provinces = provinces;
                var auth = userData.auth;
                auth.status =  userData.authStatus==auth.AUTH_FAIL.value || userData.authStatus==auth.AUTH_INIT.value;
                auth.status_init =  userData.authStatus==auth.AUTH_INIT.value;
                auth.status_fail =  userData.authStatus==auth.AUTH_FAIL.value;
                auth.status_success =  userData.authStatus==auth.AUTH_SUCCESS.value;
                oridata.account = userData;
                oridata.firm = userData.firm;
                oridata.auth = auth;
            }
            else{
                // jump to login
            }
        }
        return oridata;
    }

    else if(mtd==='POST'){
        libs.clog('pages/login.js========POST');

        var body = yield libs.$parse(this);
        var error = {
            errStat: 100,
            errMsg: '重置密码错误'
        };
        var success = {
            success: true
        }

        if(typeof(body.oldPassword)=='undefined' || typeof(body.newPassword)=='undefined'|| typeof(body.repassword)=='undefined'){
            if(typeof(body.oldPassword)=='undefined'){
                error.errStat= 1;
                error.msg = "原密码不能为空";
                return error;
            }
            if(typeof(body.newPassword)=='undefined'){
                error.errStat= 2;
                error.msg = "新密码不能为空";
                return error;
            }
            if(typeof(body.repassword)=='undefined'){
                error.errStat= 3;
                error.msg = "与新密码不匹配";
                return error;
            }
        }
        if(!body.oldPassword||!body.newPassword||!body.repassword){
            error.errStat= 4;
            error.msg = "密码不合法，请重新输入";
            return error;
        }

        if(error.errStat===100){

            //后台校验用户提交数据
            var stat = formValide(chkOptions)
        	(body.oldPassword,'password')
        	(body.newPassword,'password')
        	([body.newPassword,body.repassword],'repassword')
        	();

            if(stat){
                body.accountNo = this.sess.user.accountNo;
                apiData = yield api.pullApiData('updatePassword',body);
                var jsonData = JSON.parse(apiData[1]);
                if(jsonData.success){
                    this.sess.user = null;
                    success.redirect = "/account/login.html";
                    return success;
                }
                else{
                    error.errStat = 5;
                    error.msg = jsonData.errMsg;
                    return error;
                }
            }
            else{
                return error;
            }
        }
        else{
            return error;
        }
    }
}

module.exports = {
    getData : demoLoginData
}

// AUTH_INIT("未认证", 0),
// AUTH_SUCCESS("已认证", 1),
// AUTH_ING("认证审核中", 2),
// AUTH_FAIL("认证未通过", 3);

// user
// stat
//