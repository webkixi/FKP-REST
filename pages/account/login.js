var libs = require('../../libs/libs');
var api = require('../../apis/javaapi');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});

function *demoLoginData(oridata){
    libs.clog('pages/login.js');
    var dataSet = {};
    var mtd = this.method;

    if(mtd==='GET'){
        var user;
        if(typeof this.sess.user!=='undefined'){
            user = this.sess.user;
            if(user.login){
                // junmp user center
            }
        }
        // deal with GET
    }

    else if(mtd==='POST'){
        libs.clog('pages/login.js========POST');
        // var userInfo = yield api.user({'loginPhone':'13268280401'})
        // console.log(userInfo);

        var body = yield libs.$parse(this);
        //apiData = yield api.xxx('loginCheck',body);
        if(body.loginPhone || body.password){
            var mobilepartn = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if(body.loginPhone=="" || body.loginPhone.length != 11 || !mobilepartn.test(body.loginPhone) || body.password=="" || body.password.length < 6){
                oridata.errmsg = "手机或密码格式错误";
            }else{
                //检测传进来的数据是不是合法的
                //......
                apiData = yield api.pullApiData('loginCheck',body);
                var jsonData = JSON.parse(apiData[1]);
                console.log(jsonData);
                if(jsonData.success){
                    //用户信息
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

                    // clone返回数据
                    var rtn = libs.$extend({},account);
                    //删除返回数据的敏感信息
                    delete rtn.loginPwd;
                    delete rtn.loginPwdSalt;
                    rtn.success = true;
                    return rtn;
                }
            }
        }else{
            oridata.errmsg = 'xxxxx';
        }
    }
    return oridata;
}

module.exports = {
    getData : demoLoginData
}
