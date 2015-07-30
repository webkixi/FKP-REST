var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');


function *demoIndexData(oridata){
    libs.wlog('pages/firm/edit.js')
    var mtd = this.method;
    var local = this.local;
    var apiData = [];

    var error = {
        errStat: 100,
        errMsg: '重置密码错误'
    };

    var success = {
        success: true
    }


    if(mtd==='GET'){
    libs.clog('pages/edit.js========GET===========pull firm detail introduce');

        if(this.sess.user && this.sess.user.login){
            var jsonData,
                apiData = {},
                body = {};
                body.accountNo = this.sess.user.accountNo;

                //取回企业说明数据
                apiData  = yield api.pullApiData('firmDetailView',body);
                jsonData = JSON.parse(apiData[1]).data;


                oridata = libs.$extend(true,{},oridata,jsonData);
                console.log(oridata);
        }

        else
            this.redirect('/account/login')


    }

    else

        if(mtd==='POST'){
        libs.clog('pages/edit.js========POST===========save firm detail introduce');

            if(this.sess.user && this.sess.user.login){
                var jsonData,
                    apiData = {},
                    body = {};

                    body = yield libs.$parse(this);
                    body.accountNo = this.sess.user.accountNo;
                    console.log(body);

                    // 保存企业说明数据
                    apiData  = yield api.pullApiData('firmDetailSave',body);
                    jsonData = JSON.parse(apiData[1]);

                    console.log(jsonData);


                    if(jsonData.success)
                        return jsonData;

                    else{
                        error = {
                            success: false,
                            errStat: 2,
                            errMsg: '参数不正确'
                        };

                        return error;
                    }

            }

            //没有登陆，返回错误信息
            else{
                error = {
                    success: false,
                    errStat: 1,
                    errMsg: '请登陆后进行操作'
                };

                return error;
            }

        }

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
