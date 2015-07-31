var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');


function *demoIndexData(oridata){
    libs.clog('pages/mall/item_order.js');
    var dataSet = {};
    var mtd = this.method;
    var local = this.local;
    var apiData = [];
    if(mtd === 'GET'){
        if(!!this.params.id){
            if(typeof this.sess.user!=='undefined'&&this.sess.user){
                var session = this.sess;
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
                    //合同签订点
                    //仓库信息
                    var storageData = [];
                        storageData = yield api.pullApiData('goods_storages_list',{});
                        storageData = JSON.parse(storageData[1]);
                        //console.log(storageData);break;
                    for(var i=0;i<storageData.list.length;i++){
                        if(storageData.list[i].id===apiData.data.spGoods.storage){
                            //根据仓库ID找仓库地址
                        var provinceName = yield address(storageData.list[i].province);
                        var cityName = yield address(storageData.list[i].city);
                        var districtName = yield address(storageData.list[i].district);
                        apiData.data.spGoods.storageAddress = provinceName+cityName+districtName+storageData.list[i].address;
                        break;
                        }
                    }
                    // 买、卖家信息
                    var buyer = yield accountInfo(apiData.data.order.buyerAccountNo);
                    var seller = yield accountInfo(apiData.data.order.sellerAccountNo);

                    if(!!seller){
                        var sellerProvince = yield address(seller.firmContact.province);
                        var sellerCity = yield address(seller.firmContact.city);
                        var sellerdistrict = yield address(seller.firmContact.district);
                        apiData.data.sellerContactWay = seller.firmContact.landline;
                        apiData.data.sellerAddress = sellerProvince + sellerCity + sellerdistrict + seller.firmContact.address;
                    }
                    if(!!buyer){
                        var buyerProvince = yield address(buyer.firmContact.province);
                        var buyerCity = yield address(buyer.firmContact.city);
                        var buyerdistrict = yield address(buyer.firmContact.district);
                        apiData.data.buyerContactWay = buyer.firmContact.landline;
                        apiData.data.buyerAddress = buyerProvince + buyerCity + buyerdistrict + buyer.firmContact.address;
                    }
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
                    apiData.data.order.createTime = time.getFullYear() + "-" + twoNo(time.getMonth()+1) + "-" + twoNo(time.getDate()) +" "+ twoNo(time.getHours()) +":"+ twoNo(time.getMinutes()) +":"+twoNo(time.getSeconds());
                    dataSet = apiData.data;
                    //console.log(dataSet);
                    function twoNo(num){
                        return num<10?"0"+num:num;
                    }
                    function *address(id){
                        var region = [];
                            region = yield api.pullApiData('region',{'regionId':id});
                            region = JSON.parse(region[1]);
                            if(region.success)return region.data.parentRegion;
                            else return "";
                    }
                    function *accountInfo(no){
                    var account = [];
                        account = yield api.pullApiData('get_account_info',{'accountNo':no});
                        account = JSON.parse(account[1]);
                        if(account.success)return account.data;
                        else return "";
                        
                    }
                }
            }else{
                this.redirect('/account/login');
            }
        }
    }else if(mtd === 'POST'){
        if(typeof this.sess.user!=='undefined'&&this.sess.user){
            var body = yield libs.$parse(this);  
            body.accountNo=this.sess.user.accountNo
            if(body.step == 'submit'){
                apiData = yield api.pullApiData('mall_order_submit',body)
                apiData = JSON.parse(apiData[1]);
                console.log(body)
                console.log(apiData)
                console.log("提交了")
            }
        }else{
            return {errMsg:"请先登录！"};
        }
    }
    dataSet.navOrder="active";

    oridata = libs.$extend(true,oridata,dataSet);

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
