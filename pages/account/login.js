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
        // var path = libs.$url.parse(this.path).pathname.replace('/','') // 处理query和hash

    }

    else if(mtd==='POST'){
        libs.clog('pages/loginCheck.js========POST');
        // var userInfo = yield api.user({'loginPhone':'13268280401'})
        // console.log(userInfo); 

        var body = yield libs.$parse(this); 
        //apiData = yield api.xxx('loginCheck',body);
        apiData = yield api.loginCheck(body);
        console.log(body);
    }

}

module.exports = {
    getData : demoLoginData
}
