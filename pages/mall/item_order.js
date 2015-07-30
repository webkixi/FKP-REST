var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');


function *demoIndexData(oridata){
    libs.clog('pages/mall/item_order.js');
    var dataSet = {};
    var mtd = this.method;
    var local = this.local;
    var apiData = [];
    var session = this.sess;
    if(mtd === 'GET'){
        if(!!this.params.id){
            var orderId = this.params.id.substr(0,this.params.id.indexOf(".html"));
            apiData = yield api.pullApiData('mall_order_detail',{
            	'accountNo':session.user.accountNo,
            	'orderId':orderId
            })
            apiData = JSON.parse(apiData[1]);

            if(apiData.success){
                if(apiData.data.spGoods.valuation === 0 ) apiData.data.spGoods.valuation0 = true;
                if(!!apiData.data.order.quantity) apiData.data.order.quantityNull = true;
                if(!!apiData.data.order.unitPrice) apiData.data.order.unitPriceNull = true;
                //大写金额
                if(!!apiData.data.money) apiData.data.order.moneyNull = true;
                if(apiData.data.spGoods.storage==99) apiData.data.spGoods.storage99 = true;
                if(apiData.data.spGoods.deliveryWay==0) apiData.data.spGoods.deliveryWay0 = true;
                //盘点价
                if(apiData.data.spGoods.isNightPlate==1) apiData.data.spGoods.isNightPlate1 = true;
                //质量标准
                if(!!apiData.data.spGoods.quality) apiData.data.spGoods.quality0 = true;
                //包装
                if(!!apiData.data.spGoods.manner) apiData.data.spGoods.manner0 = true;
                if(apiData.data.order.premium>0) apiData.data.order.premium1 = true;
                if(apiData.data.order.premium!=0) apiData.data.order.premium0 = true;
                apiData.data.order.premium = apiData.data.order.premium.toFixed(2);
                //提交
                if(apiData.data.order.status==1) apiData.data.order.status1 = true;
                //签订时间
                var time = new Date(apiData.data.order.createTime);
                apiData.data.order.createTime = time.getFullYear() + "-" + twoNo(time.getMonth()) + "-" + twoNo(time.getDate()) +" "+ twoNo(time.getHours()) +":"+ twoNo(time.getMinutes()) +":"+twoNo(time.getSeconds());
                dataSet = apiData.data;

                function twoNo(num){
                    return num<10?"0"+num:num;
                }
            }
        }
    }else if(mtd === 'POST'){
        var body = yield libs.$parse(this);  
        if(body.step == 'submit'){
            apiData = yield api.pullApiData('mall_order_submit',{
                'accountNo':session.user.accountNo,
                'orderId':orderId,
            })
            console.log(session.user.accountNo)
            console.log("提交了")
        }
        
    }
    dataSet.navOrder="active";

    oridata = libs.$extend(true,oridata,dataSet);

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
