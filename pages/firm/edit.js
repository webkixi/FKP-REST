var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');


function *demoIndexData(oridata){
    libs.wlog('pages/h5/lazypage')
    var dataSet = {};
    
    dataSet.root = api.apiPath.base;
    dataSet.navFirm = "active";
    oridata = libs.$extend(true,oridata,dataSet);
    return oridata
}

module.exports = {
    getData : demoIndexData
}