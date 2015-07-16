var libs = require('../../libs/libs');
var api = require('../../apis/javaapi');
var validate = require('../../modules/validate');
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

        // deal with GET

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
