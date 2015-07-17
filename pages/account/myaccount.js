
var libs = require('../../libs/libs');
var api = require('../../apis/javaapi');
var validate = require('../../modules/validate');
var formValide = validate;

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});

function *demoLoginData(oridata){
    libs.clog('pages/login.js');
    oridata.config = this.config;

    var mtd = this.method;
    var userData = {};

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
            code: 0
        };

        if(typeof(body.loginPhone)=='undefined' || typeof(body.password)=='undefined'){
            if(typeof(body.loginPhone)=='undefined'){
                error = {
                    code:  1,
                    msg: "请输入注册手机号！"
                }
            }
            if(typeof(body.password)=='undefined'){
                if(error.code===1){
                    error.code = 3;
                    error.msg = '登陆信息完全不正确';
                }
                else{
                    error = {
                        code: 2,
                        msg: "输入密码不合法"
                    }
                }
            }
        }

        if(error.code===0){

            //后台校验用户提交数据
            var stat =  formValide(chkOptions)
            (body.loginPhone,'username')
            (body.password, 'password')
            ()

            if(stat){
                apiData = yield api.pullApiData('loginCheck',body);
                var jsonData = JSON.parse(apiData[1]);
                if(jsonData.success){
                    var account = jsonData.data.account;
                    account.auth = jsonData.data.AccountAuthStatusEnum;
                    account.login = true;
                    this.sess.user = account;

                    // clone返回数据
                    var rtn = libs.$extend({},account);
                    //删除返回数据的敏感信息
                    delete rtn.loginPwd;
                    delete rtn.loginPwdSalt;
                    rtn.success = true;
                    return rtn;
                }
            }
        }
        else{
            error.error = true;
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