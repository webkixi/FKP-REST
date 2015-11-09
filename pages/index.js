var path = require('path')
var libs = require('../libs/libs')
var api = require('../apis/javaapi');
var rct = require('../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/index')
    var dataSet = {};
    var infoCat =[];
    var mtd = this.method;
    var catId = [48,62,76,84],boothNo=['index01','index02','index03','index04']

    if(mtd==='GET'){

        //请求信息数据
        // for (var i = 0; i < catId.length; i++) {
        // var catData = [];
        // var boothData = [];
        //     catData = yield api.pullApiData('index_cat',{
        //         'catId': catId[i],
        //         'listNum': 20
        //     });
        //
        //     boothData = yield api.pullApiData('index_booth',{
        //         'boothNo': boothNo[i]
        //     });
        //
        //
        //     catData = JSON.parse(catData[1]);
        //     boothData = JSON.parse(boothData[1]);
        //     if(catData.success){
        //             //成功获取数据
        //         var catHtml = rct('index_info_list',{
        //             data: catData.data,  //数组
        //             booth:boothData.data.booth
        //         });
        //         infoCat.push(catHtml);
        //     }
        //
        // };

        // oridata = libs.$extend(true,oridata,dataSet);
        var test = {
            abc: '124',
            bcd: '234'
        }
        oridata.test = test;
        return oridata
    }
    if ( mtd === 'POST' ){
        return oridata
    }
}

module.exports = {
    getData : demoIndexData
}
