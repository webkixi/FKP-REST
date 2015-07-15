var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');


function *demoIndexData(oridata){
    var dataSet = {};
    var mtd = this.method;
    var local = this.local;
    var apiData = [];
    var session = this.sess;
    var user = {
        'userId':'JH12211000000055'
    }
    if(!!this.params.id){
        if(mtd === 'GET'){
        var goodsId = this.params.id.substr(0,this.params.id.indexOf(".html"));
        apiData = yield api.pullApiData('mall_item_detail',{
        	'goodsId':goodsId
        })
        apiData = JSON.parse(apiData[1]);

        }else if(mtd === 'POST'){

        }

        if(apiData.success){
            //图片相册
            var pictureLibUrl =  apiData.data.spGoods.pictureLibUrl;
            var spGoodsPictureList = apiData.data.spGoodsPictureList;
            for(var i=0;i<spGoodsPictureList.length;i++){
                if(i===0)spGoodsPictureList[i].index = 1;
                if(!!spGoodsPictureList[i].original)spGoodsPictureList[i].pictureLibUrl = pictureLibUrl;
            }
            apiData.data.spGoodsPictureList = spGoodsPictureList;
            //采购量
            if(apiData.data.spGoods.increase != null && apiData.data.spGoods.increase > 0){
                apiData.data.spGoods.disab ="disabled =disabled";
            }else{
                apiData.data.spGoods.increase = 1;
            }
            //计价方式
            if(apiData.data.spGoods.valuation==0)apiData.data.spGoods.valuation0 = true;
            else apiData.data.spGoods.valuation1 = true;
            if(apiData.data.spGoods.storage==99)apiData.data.spGoods.storage99 = true;
                //升贴水
            if(apiData.data.spGoods.discount>0)apiData.data.spGoods.discount = "￥" +apiData.data.spGoods.discount.toFixed(2);
            if(apiData.data.spGoods.isNightPlate==0)apiData.data.spGoods.isNightPlate0 = true;
            if(apiData.data.spGoods.isNightPlate==1)apiData.data.spGoods.isNightPlate1 = true;
            //点价时间
            var time = new Date(apiData.data.spGoods.stopDate);
            var stopHour = apiData.data.spGoods.stopHour < 10 ? "0"+ apiData.data.spGoods.stopHour:apiData.data.spGoods.stopHour;
            var stopMinute = apiData.data.spGoods.stopMinute < 10 ? "0"+ apiData.data.spGoods.stopMinute:apiData.data.spGoods.stopMinute;
            apiData.data.spGoods.stopDate = time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate() +" "+ stopHour +":"+ stopMinute +":00";
            //摘牌下单
            if(apiData.data.listed) apiData.data.listed1 = true;
            if(user.userId === apiData.data.spGoods.accountNo) apiData.data.listed0 = true;

            dataSet = apiData.data;
        }

        console.log(session);
        console.log("111111111111111111111111111111111111111111111111111111");
        console.log(dataSet);

    }

    dataSet.root = api.apiPath.base;
    oridata = libs.$extend(true,oridata,dataSet);
    return oridata;
}

module.exports = {
    getData : demoIndexData
}
