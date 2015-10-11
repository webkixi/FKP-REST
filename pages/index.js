var path = require('path')
var libs = require('../libs/libs')
var api = require('../apis/javaapi');
var rct = require('../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/h5/lazypage')
    var dataSet = {};
    var infoCat =[];
    var mtd = this.method;
    var catId = [48,62,76,84],boothNo=['index01','index02','index03','index04']
    if(mtd==='GET'){

        //请求信息数据
        for (var i = 0; i < catId.length; i++) {
        var catData = [];
        var boothData = [];
            catData = yield api.pullApiData('index_cat',{
                'catId': catId[i],
                'listNum': 20
            });

            boothData = yield api.pullApiData('index_booth',{
                'boothNo': boothNo[i]
            });


            catData = JSON.parse(catData[1]);
            boothData = JSON.parse(boothData[1]);
            if(catData.success){
                    //成功获取数据
                var catHtml = rct('index_info_list',{
                    data: catData.data,  //数组
                    booth:boothData.data.booth
                });
                infoCat.push(catHtml);
            }

        };
        dataSet.infoCat1 = infoCat[0];
        dataSet.infoCat2 = infoCat[1];
        dataSet.infoCat3 = infoCat[2];
        dataSet.infoCat4 = infoCat[3];

        //请求商品数据
        var goodsData = [];
        goodsData = yield api.pullApiData('index_goods',{
                'listNum': 6
            });
        goodsData = JSON.parse(goodsData[1]);
        if(goodsData.success){
                //成功获取数据
            var goodsHtml = rct('index_goods_list',{
                data: goodsData.data.spCatGoodsList  //数组
            });
            dataSet.goodsList = goodsHtml;
        }
    }

    dataSet.root = api.apiPath.base;
    oridata = libs.$extend(true,oridata,dataSet);
    return oridata
}

module.exports = {
    getData : demoIndexData
}
