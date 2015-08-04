
var libs = require('../../libs/libs');
var api = require('../../apis/javaapi');
var __ = libs.$lodash;
var validate = require('../../modules/validate');
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

    if(mtd==='GET'){
        var user,userData;
        if(typeof this.sess.user !== 'undefined'){
            user = this.sess.user;
            if(user.login){
                userData = this.sess.user;
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

        if(error.errStat===100){
            //后台校验用户提交数据
            body.accountNo = this.sess.user.accountNo;
            body.loginPhone = this.sess.user.loginPhone;
            body.district = body.district;

            //忽略校验
            var ignore = ['email','qq','province','city','district'];

            //校验数据不能为空
            for(var item in body){
                if(__.indexOf(ignore, item) > -1)
                    continue;

                if(!body[item]){
                    console.log(item)
                    error.errStat = 1;
                    error.errMsg = item+'不能为空';
                    return error;
                }
            }


            apiData = yield api.pullApiData('updateBaseInfo',body);
            var jsonData = JSON.parse(apiData[1]);
            if(jsonData.success){
                this.sess.user.firm.firmContact = jsonData.data.firmContact;
                this.sess.user.firm.firmInfo = jsonData.data.firmInfo;
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
}

module.exports = {
    getData : demoLoginData
}
