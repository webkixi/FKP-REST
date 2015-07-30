var path = require('path')
var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');

function *demoIndexData(oridata){
    libs.wlog('pages/common/goods_attr');
    var dataSet = {};
    var mtd = this.method;
    if(mtd==='GET'){

    }else if(mtd==='POST'){
    	var param = yield libs.$parse.form(this); 
    	var uri = ""
    	//type值为，category类别，product品名，brand品牌，storage仓库 ，参数2为查询条件
    	if(param.type==="category")uri="goods_cat_list";
    	else if(param.type==="product")uri="goods_cat2_list";
    	else if(param.type==="brand")uri="goods_brand_list";
    	else if(param.type==="storage")uri="goods_storages_list";
    	delete param.type;
        var catData = [];
        catData = yield api.pullApiData(uri,param);
        catData = JSON.parse(catData[1]);
    	return catData;
    }
    oridata = libs.$extend(true,oridata,dataSet);
    return oridata
}

module.exports = {
    getData : demoIndexData
}
