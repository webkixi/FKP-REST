var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');


function *demoIndexData(oridata){
    libs.wlog('pages/h5/lazypage')
    var dataSet = {};
    var apiData = [];

        apiData = yield api.pullApiData('info_view',{
        	'infoId':48
        });


        apiData = JSON.parse(apiData[1]);
        console.log(apiData);
    
    dataSet.root = api.apiPath.base
    oridata = libs.$extend(true,oridata,dataSet);
    return oridata
}

module.exports = {
    getData : demoIndexData
}