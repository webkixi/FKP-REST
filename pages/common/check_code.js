var path = require('path')
var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');

function *demoIndexData(oridata){
    libs.wlog('pages/common/check_code');
    var dataSet = {};
    var mtd = this.method;
    if(mtd==='GET'){

    }else if(mtd==='POST'){
    	var param = yield libs.$parse.form(this); 
    	if(param.code.toUpperCase() == this.sess.captcha.toUpperCase()){
    		dataSet.success = true;
    	}else{
    		dataSet.error = true;
    		dataSet.errMsg = "验证码错误";
    	}
    	return dataSet;
    }
    oridata = libs.$extend(true,oridata,dataSet);
    return oridata
}

module.exports = {
    getData : demoIndexData
}
