var path = require('path')
var libs = require('../libs/libs')
var api = require('../apis/javaapi');
var rct = require('../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/order')
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

        var postdata = {
            "common": {
                "session": "xx",
                "smscode":"489349"
            },
            "content": [{}],
            "fttype": "order"
        }
        var body = yield libs.$parse(this);
        if(body){
            if(body.type){
                if(body.type==='insert')
                    if(body.data.code){
                        var code = body.data.code;
                        delete body.data.code;
                        postdata.common.smscode = code;
                    }

                    if(body.data.uid){
                        var uid = parseInt(body.data.uid);
                        delete body.data.uid;
                        postdata.common.uid = uid;
                    }

                    postdata.content[0] = body.data;

            }
            if(postdata.content[0].car.usercarid)
                postdata.content[0].car.usercarid = parseInt(postdata.content[0].car.usercarid)
            postdata.content[0].addr.id = parseInt(postdata.content[0].addr.id)
            postdata.content[0].car.carid = parseInt(postdata.content[0].car.carid)
            // postdata.content[0].totalprice = parseInt(postdata.content[0].totalprice)

            console.log('all----------');
            console.log(postdata);
            console.log('userinfo----------');
            console.log(postdata.content[0].user);
            console.log('订单----------');
            console.log(postdata.content[0].orderdetail);
            console.log('car----------');
            console.log(postdata.content[0].car);
            console.log('addr----------');
            console.log(postdata.content[0].addr);

            var orderdata = yield api.pullApiData('orderins', postdata, 'post');
            console.log(orderdata[1]);
            return orderdata[1]
        }
        else{
            return {error: '100', message: "body为空"}
        }


    }



}

module.exports = {
    getData : demoIndexData
}
