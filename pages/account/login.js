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

    console.log(mtd)

    if(mtd==='GET'){
        console.log('=================')
        // var path = libs.$url.parse(this.path).pathname.replace('/','') // 处理query和hash

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
                    //数据在java这边是不是存在的
                    //.....
                    // console.log(jsonData.data);
                    oridata.success = '登录成功!';
                    console.log(oridata.static);
                    //返回数据
                    //.....
                }else{
                    oridata.errmsg = jsonData.errMsg;
                };
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
