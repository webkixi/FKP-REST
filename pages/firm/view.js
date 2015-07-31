var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');


function *demoIndexData(oridata){
    libs.wlog('pages/firm/view.js')
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

                jsonData.navFirm="active";
                oridata = libs.$extend(true,{},oridata,jsonData);
        }

        else
            this.redirect('/account/login')


    }
    else
        if(mtd==='POST'){

        }

    return oridata
}

module.exports = {
    getData : demoIndexData
}
