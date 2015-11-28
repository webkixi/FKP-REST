var path = require('path')
var libs = require('../libs/libs')
var api = require('../apis/javaapi');
var rct = require('../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/getshoplist')
    var mtd = this.method;
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
    return oridata;
    }

    if(mtd === 'POST'){

        var body = yield libs.$parse(this);
        var postdata = {
            "comn": {
                "type": "2"
            },
            "locat": {
                	"lat": (body && body.lat)||"0",
                	"lng": (body && body.lng)||"0",
                	"region": (body && body.region)||"0"
                }
            }
        var queryseriesData = yield api.pullApiData('getshoplist', postdata, 'post');

        return queryseriesData[1];
    }



}

module.exports = {
    getData : demoIndexData
}
