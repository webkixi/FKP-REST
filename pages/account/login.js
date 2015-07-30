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
    username: function(phone, reg){   // username 长度大于8，小于20
        tmp = reg.mobile.test(phone);    //email check
        return tmp;
    },
    password: function(passwd, reg){
        var tmp = true;
        val = passwd;
        level = (val.length>5) ? 0 + (val.length>7) + (/[a-z]/.test(val) && /[A-Z]/.test(val)) + (/\d/.test(val) && /\D/.test(val)) + (/\W/.test(val) && /\w/.test(val)) + (val.length > 12) : 0;  //level  0  1  2  3  4  password stronger
        if(val.length>20||/\s/.test(val)) level=0; //不包括空格
        if(level==0||!level){
            // tmp = false;
            tmp = tmp;
        }
        return tmp;
    }
}
function *demoLoginData(oridata){
    libs.clog('pages/login.js');

    var mtd = this.method;

    if(mtd==='GET'){
        var user;
        if(typeof this.sess.user!=='undefined'&&this.sess.user){
            user = this.sess.user;
            if(user.login){
                // junmp user center
                this.redirect('/account/myaccount')
            }
        }
        // deal with GET
        return oridata;
    }

    else if(mtd==='POST'){

        libs.clog('pages/login.js========POST');

        var body = yield libs.$parse(this);
        var error = {
            errStat: 100,
            errMsg: '用户名密码校验错误'
        };
        var success = {
            success: true
        }

        if(body.logout){
            delete this.sess.user;
            success.redirect = '/';
            success.msg = "已成功退出登录";
            return success;
        }

        if(typeof(body.loginPhone)=='undefined' || typeof(body.password)=='undefined'){
            if(typeof(body.loginPhone)=='undefined'){
                error.errStat= 1;
                error.msg = "请输入注册手机号！";
                return error;
            }
            if(typeof(body.password)=='undefined'){
                if(error.errStat===1){
                    error.errStat = 3;
                    error.msg = '登陆信息完全不正确';
                }
                else{
                    error.errStat= 2;
                    error.msg = "输入密码不合法";
                }
                return error;
            }
        }
        if(!body.loginPhone||!body.password){
            error.errStat= 4;
            error.msg = "登陆信息不正确，请重新输入";
            return error;
        }

        if(error.errStat===100){
            //后台校验用户提交数据
            var stat =  formValide(chkOptions)
            (body.loginPhone,'username')
            (body.password, 'password')
            ()

            if(stat){
                apiData = yield api.pullApiData('loginCheck',body);
                var jsonData = JSON.parse(apiData[1]);
                if(jsonData.success){
                    // 用户信息
                    var account = jsonData.data.account;
                    account.auth = jsonData.data.AccountAuthStatusEnum;
                    account.authStatus = jsonData.data.authStatus;
                    account.login = true;
                    //企业信息
                    var firm = libs.$extend({},jsonData.data);
                    delete firm.account;
                    delete firm.AccountAuthStatusEnum;
                    //保存session
                    account.firm = firm;
                    this.sess.user = account;

                    //跳转到用户中心
                    // this.redirect('/account/myaccount');
                    // clone返回数据
                    var rtn = libs.$extend({},account);
                    //删除返回数据的敏感信息
                    delete rtn.loginPwd;
                    delete rtn.loginPwdSalt;
                    rtn.success = true;
                    rtn.redirect = '/account/myaccount'
                    return rtn;
                }
                else{
                    error.errStat = 5;
                    error.msg = jsonData.errMsg;
                    return error;
                }
            }else{
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
