var path = require('path')
var libs = require('../libs/libs')
var api = require('../apis/javaapi');
var rct = require('../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/mycar_del')
    var dataSet = {};
    var infoCat =[];
    var mtd = this.method;
    console.log('aaaaaaaaaaaaaa');
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
        var body = yield libs.$parse(this);
        console.log(body.usercarid);
        console.log("bbbbbbbbbbbbbbbb");
        var postdata = {
            "common": {
                "session": "222",
                "uid": 12
            },
            "content": [{
              "usercarid": body.usercarid
            }]

        }
        if(body){
            if(body.type){
                if(body.type==='delete')
                console.log(postdata);
                    postdata.content[0] = body.data;
            }
        }
        postdata.content[0].usercarid = parseInt(postdata.content[0].usercarid)
        var orderdata = yield api.pullApiData('mycar_del', postdata, 'post');
        console.log(orderdata[1]);

        // var qcjc = libs.$extend(true, {}, postdata);
        // qcjc.content[0].ServiceTypeNo = 'FW0003';
        //
        // var qcjcdata = yield api.pullApiData('service', qcjc, 'post')
        // var qd = qcjcdata[1].results[0];
        // // serviceData[1].results.push(qd);
        // console.log(serviceData[1]);
        //
        //
        // return serviceData[1];
        return orderdata[1];
    }



}

module.exports = {
    getData : demoIndexData
}
