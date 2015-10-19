var path = require('path')
var libs = require('../libs/libs')
var api = require('../apis/javaapi');
var rct = require('../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/queryallbrand')
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
    return oridata;
    }

    if(mtd === 'POST'){
        // var postdata = {
        //   "common": {
        //     "uid": 3,
        //     "session": "session0001"
        //   },
        //   "content": [
        //     {
        //       "CarBrand": "本田",
        //       "CarSeries": "东风本田CR-V",
        //       "CarType": "2012 款   VTi 2.4L 自动",
        //       "ServiceTypeName": "小保养",
        //       "ServiceTypeNo": "FW0001"
        //     }
        //   ]
        // }

        var postdata = {
          "common": {
            "session": "session001",
            "uid": 1
          },
          "content": [
            {

            }
          ]
        }
        // var body = yield libs.$parse(this);
        // if(body){
        //     if(body.type){
        //         if(body.type==='dby')
        //             postdata.content[0].ServiceTypeNo = 'FW0002';
        //     }
        // }

        var qcjc = libs.$extend(true, {}, postdata);

        var qcjcdata = yield api.pullApiData('queryallbrand', qcjc, 'post')
        console.log(qcjcdata[1]);


        return qcjcdata[1];
    }



}

module.exports = {
    getData : demoIndexData
}
