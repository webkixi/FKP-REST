var path = require('path')
var libs = require('../libs/libs')
var api = require('../apis/javaapi');
var rct = require('../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/carchecking')
    var dataSet = {};
    var infoCat =[];
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
        var postdata = {
            "common": {
                "session": "1111",
                "uid": 0
            },
            "content": [{
                "carid": body.carid,
                "servicetypeno": 'FW0003'
            }]
        }
        if(!this.sess.user){
          console.log("----------用户不存在-----------");
          return {error: '101', message: "用户不存在"}
        }

        if(body && body.carid){
          postdata.common.uid = parseInt(this.sess.user.uid)
          postdata.content[0].carid  = parseInt(body.carid)

          var orderdata = yield api.pullApiData('carchecking', postdata, 'post');
          console.log(orderdata[1]);
          return orderdata[1];

        }else{
          return {error: '102', message: "body没有存在"}
        }
    }



}

module.exports = {
    getData : demoIndexData
}
