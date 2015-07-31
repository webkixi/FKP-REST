var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
var rct = require('../../modules/parseReact');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});


function *demoIndexData(oridata){
    libs.clog('pages/goods/edit.js');

    var apiData={};
    var dataset={};
    var mtd = this.method;
    var local = this.local;
    var userId = "";
    if(typeof this.sess.user!=='undefined'&&this.sess.user){
        if(!!this.params.id){
            if(mtd==='GET'){
                var goodsId = this.params.id.substr(0,this.params.id.indexOf(".html"));
                apiData = yield api.pullApiData('goods_detail',{
                    'accountNo':this.sess.user.accountNo,
                    'goodsId':goodsId
                })
                apiData = JSON.parse(apiData[1]);
                if(apiData.success){
                     dataset = apiData.data;
                    //图片相册
                    // var pictureLibUrl =  apiData.data.spGoods.pictureLibUrl;
                    // var spGoodsPictureList = apiData.data.spGoodsPictureList;
                    // for(var i=0;i<spGoodsPictureList.length;i++){
                    //     if(i===0)spGoodsPictureList[i].index = 1;
                    //     if(!!spGoodsPictureList[i].original)spGoodsPictureList[i].pictureLibUrl = pictureLibUrl;
                    // }
                    // apiData.data.spGoodsPictureList = spGoodsPictureList;
                    //挂牌量
                    //if(dataset.spGoods.stock != null) dataset.spGoods.stock = dataset.spGoods.stock.toFixed(4);
                    //采购量
                    // if(apiData.data.spGoods.increase != null && apiData.data.spGoods.increase > 0){
                    //     apiData.data.spGoods.disab ="disabled =disabled";
                    // }else{
                    //     apiData.data.spGoods.increase = 1;
                    // }
                    //计价方式
                    // if(apiData.data.spGoods.valuation==0)apiData.data.spGoods.valuation0 = true;
                    // else apiData.data.spGoods.valuation1 = true;
                    // if(apiData.data.spGoods.storage==99)apiData.data.spGoods.storage99 = true;
                        //升贴水
                    // if(apiData.data.spGoods.discount>0)apiData.data.spGoods.discount = "￥" +apiData.data.spGoods.discount.toFixed(2);
                    // if(apiData.data.spGoods.isNightPlate==0)apiData.data.spGoods.isNightPlate0 = true;
                    // if(apiData.data.spGoods.isNightPlate==1)apiData.data.spGoods.isNightPlate1 = true;
                   //摘牌下单
                    // if(apiData.data.listed) apiData.data.listed1 = true;
                    // if(userId === apiData.data.spGoods.accountNo) apiData.data.listed0 = true;
                    // dataSet = apiData.data;

                    //商品类别 一级
                    var catData = {};
                    var renderCatList = [];
                    catData = yield api.pullApiData('goods_cat_list',{});
                    catData = JSON.parse(catData[1]);
                    if(catData.success){
                        catData.list.map(function(item){
                            if(dataset.spGoods.catId === item.id)
                                renderCatList.push('<option value='+item.id+' selected >'+item.catName+'</option>')
                            else
                                renderCatList.push('<option value='+item.id+'>'+item.catName+'</option>')
                        })
                        dataset.catList = renderCatList.join('\n');
                    }
                    //查询商品常量属性
                    var attData = {};
                    var renderAttrList = [];
                    var renderAttrList2 = [];
                    var renderAttrList3 = [];
                    var renderAttrList4 = [];
                    var renderAttrList5 = [];
                    var renderAttrList6 = [];
                    var renderAttrList7 = [];
                    attData =yield api.pullApiData('attr',{});
                    attData = JSON.parse(attData[1]);
                    if(attData.success){
                        //挂牌量
                        attData.data.unitTypeList.map(function(item){
                            if(dataset.spGoods.unit === item.value)
                                renderAttrList.push('<option value='+item.value+' selected >'+item.desc+'</option>')
                            else
                                renderAttrList.push('<option value='+item.value+'>'+item.desc+'</option>')
                        })
                        dataset.attrList = renderAttrList.join('\n');
                        //点价方式
                        attData.data.valuationTypeList.map(function(item){
                            if(dataset.spGoods.valuation === item.value)
                                renderAttrList2.push('<option value='+item.value+' selected >'+item.desc+'</option>')
                            else
                                renderAttrList2.push('<option value='+item.value+'>'+item.desc+'</option>')
                        })
                        dataset.valuationTList = renderAttrList2.join('\n');
                        //点价合约
                        attData.data.exchangeList.map(function(item){
                            if(dataset.spGoods.contractPeriod === item.value)
                                renderAttrList3.push('<option value='+item.value+' selected >'+item.desc+'</option>')
                            else
                                renderAttrList3.push('<option value='+item.value+'>'+item.desc+'</option>')
                        })
                        dataset.exchangeList = renderAttrList3.join('\n');
                        //点价合约
                        attData.data.partyTypeList.map(function(item){
                            if(dataset.spGoods.partyPrice === item.value)
                                renderAttrList4.push('<option value='+item.value+' selected >'+item.desc+'</option>')
                            else
                                renderAttrList4.push('<option value='+item.value+'>'+item.desc+'</option>')
                        })
                        dataset.partyTypeList = renderAttrList4.join('\n');
                        //交货方式：
                        attData.data.deliveryWayList.map(function(item){
                            if(dataset.spGoods.deliveryWay === item.value)
                                renderAttrList5.push('<option value='+item.value+' selected >'+item.desc+'</option>')
                            else
                                renderAttrList5.push('<option value='+item.value+'>'+item.desc+'</option>')
                        })
                        dataset.deliveryWayList = renderAttrList5.join('\n');
                        //付款方式：
                        attData.data.paymentTypeList.map(function(item){
                            if(dataset.spGoods.paymentWay === item.value)
                                renderAttrList6.push('<option value='+item.value+' selected >'+item.desc+'</option>')
                            else
                                renderAttrList6.push('<option value='+item.value+'>'+item.desc+'</option>')
                        })
                        dataset.paymentTypeList = renderAttrList6.join('\n');
                        //挂牌状态：
                        attData.data.listStatusList.map(function(item){
                            if(dataset.spGoods.isShelves === item.value)
                                renderAttrList7.push('<option value='+item.value+' selected >'+item.desc+'</option>')
                            else
                                renderAttrList7.push('<option value='+item.value+'>'+item.desc+'</option>')
                        })
                        dataset.listStatusList = renderAttrList7.join('\n');
                    }
                    //点价时间
                    var time = new Date(apiData.data.spGoods.stopDate);
                    // var stopHour = apiData.data.spGoods.stopHour < 10 ? "0"+ apiData.data.spGoods.stopHour:apiData.data.spGoods.stopHour;
                    // var stopMinute = apiData.data.spGoods.stopMinute < 10 ? "0"+ apiData.data.spGoods.stopMinute:apiData.data.spGoods.stopMinute;
                    //apiData.data.spGoods.stopDate = time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate() +" "+ stopHour +":"+ stopMinute +":00";
                    dataset.spGoods.stopDate = time.getFullYear() + "-" + (time.getMonth()+1) + "-" + time.getDate();
                    //仓库列表  0==显示自己的
                    var strongsData = {};
                    strongsData =yield api.pullApiData('goods_mystorages_list',{'accountNo':this.sess.user.accountNo});
                    strongsData = JSON.parse(strongsData[1]);
                    if(strongsData.success){
                        for(var i = 0; i<strongsData.list.length;i++){
                            if(!!strongsData.list[i].shortName) strongsData.list[i].fullName = strongsData.list[i].fullName +"("+strongsData.list[i].shortName+")";
                            if(dataset.spGoods.storage == strongsData.list[i].id)strongsData.list[i].select = "selected";
                        }
                        dataset.storageList = strongsData.list;
                    }
                    //所有
                    var strongsData1 = {};
                    strongsData1 =yield api.pullApiData('goods_storages_list',{});
                    strongsData1 = JSON.parse(strongsData1[1]);
                    if(strongsData1.success){
                        for(var i = 0; i<strongsData1.list.length;i++){
                            if(!!strongsData1.list[i].shortName) strongsData1.list[i].fullName = strongsData1.list[i].fullName +"("+strongsData1.list[i].shortName+")";
                            if(dataset.spGoods.storage == strongsData1.list[i].id)strongsData1.list[i].select = "selected";
                        }
                        dataset.storageList1 = strongsData1.list;
                    }
                    //获取时间 >15   <15
                    var dateT = new Date();
                    var month = [];
                    var dateY = dateT.getFullYear()%100;
                    var nowMonth = dateT.getMonth()+1;
                    var nowYear = dateY;                 
                    for(var i=0;i<12;i++){
                       //dataset.hyTime = dateM+i
                        var InowMonth = nowMonth+i;
                        if(dateT.getDate()>15){
                            InowMonth++;                    
                        }                      
                        if(InowMonth>12){
                            nowYear = dateY+1;
                            InowMonth = InowMonth-12;
                        }  
                        InowMonth = InowMonth<10?"0"+InowMonth:InowMonth.toString();
                        var timeData = {'name':nowYear+InowMonth};
                        if(dataset.spGoods.contractPeriod==(nowYear+InowMonth))timeData.contractPeriod=true;
                        month[i] =timeData;
                        dataset.timeHY=month;
                    }
                    //单价
                    if(dataset.spGoods.price != null) dataset.spGoods.price = dataset.spGoods.price.toFixed(2);
                    dataset.navGoods="active";
                }    
            }else if(mtd==='POST'){
            }
        }else{
            if (mtd === "POST") { 
                var apiData = [];
                body = yield libs.$parse(this);
                console.log(body)
                body.accountNo = this.sess.user.firm.firmInfo.accountNo;
                apiData = yield api.pullApiData('goods_update',body);
                console.log(apiData[1])
                var rtn = JSON.parse(apiData[1]);
                console.log(rtn)
                return rtn;
            }
        }
    }else{
      this.redirect('/account/login');
    }
    dataset.root = api.apiPath.base;
    oridata = libs.$extend(true,oridata,dataset);

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
