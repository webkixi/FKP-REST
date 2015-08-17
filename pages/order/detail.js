var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
var rct = require('../../modules/parseReact');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});


function *demoIndexData(oridata){
    //libs.clog('pages/order/detil.js');
    var dataSet = {};
    var mtd = this.method;
    var local = this.local;
    var apiData = [];
    var userId = "";
    if(typeof this.sess.user!=='undefined'&&this.sess.user){
        if(!!this.params.id){
            if(mtd==='GET'){
                libs.clog('pages/order/detail.js');
                var orderId = this.params.id.substr(0,this.params.id.indexOf(".html"));
                apiData = yield api.pullApiData('detail',{
                    'accountNo':this.sess.user.accountNo,
        //          'orderId':orderId
                    'orderId':orderId
                })
                var jsonData = JSON.parse(apiData[1]);
                console.log(jsonData)
                console.log(jsonData.data.contract.contractVersion)
                if (jsonData.success) {
                    dataSet=jsonData.data;
                    if(dataSet.spGoods.valuation==0) dataSet.spGoods.valuation0=true;
                    if(dataSet.order.premium != null){
                        dataSet.order.premium = dataSet.order.premium.toFixed(2);
                        if(dataSet.order.premium !=0){
                            dataSet.order.premiumN0 =true;
                        }
                        else if(dataSet.order.premium >0){
                            dataSet.order.premiumD0 =true;
                        }
                    }
                    if(dataSet.order.quantity != null) dataSet.order.quantity = dataSet.order.quantity.toFixed(4);
                    if(dataSet.order.status==3 || dataSet.order.status==13){
                        dataSet.order.statusS=true;
                    }
                    //点价时间
                    var time = new Date(dataSet.contract.signTime);
                    var stopHour = dataSet.spGoods.stopHour < 10 ? "0"+ dataSet.spGoods.stopHour:dataSet.spGoods.stopHour;
                    var stopMinute = dataSet.spGoods.stopMinute < 10 ? "0"+ dataSet.spGoods.stopMinute:dataSet.spGoods.stopMinute;
                    dataSet.contract.signTime = time.getFullYear() + "年" + (time.getMonth()+1) + "月" + time.getDate() +"日";
                    //
                    if(dataSet.contract.deliveryWay==0) dataSet.contract.deliveryWay0=true;
                    if(dataSet.contract.deliveryWay==1) dataSet.contract.deliveryWay1=true;
                    //
                    arrApidata = yield api.pullApiData('attr',{
                        'accountNo':this.sess.user.accountNo
                    });
                    var jsonArrdata = JSON.parse(arrApidata[1]);                    
                    if(jsonArrdata.success){
                        for(i=0;i<jsonArrdata.data.partyTypeList.length;i++){
                            if(dataSet.contract.freightParty == jsonArrdata.data.partyTypeList[i].value) dataSet.partyTypeLists=jsonArrdata.data.partyTypeList[i].desc;
                        }
                    }
                    if(dataSet.contract.contractVersion=='20150628'){
                        dataSet.contract.contractVold=true;
                    }else if(dataSet.contract.contractVersion=='20150701'){
                        dataSet.contract.contractVnew=true;
                    }
                }
                
        	}else if(mtd==='POST'){
            }
        }else{
            dataSet.errState = true;
        }
    }else{
        this.redirect('/account/login');
    }

    dataSet.root = api.apiPath.base;
    oridata = libs.$extend(true,oridata,dataSet);
    return oridata;
}

module.exports = {
    getData : demoIndexData
}
