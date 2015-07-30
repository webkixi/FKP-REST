var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
var rct = require('../../modules/parseReact');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});


function *demoIndexData(oridata){
    libs.clog('pages/goods/add.js');

    var apiData={};
    var dataset={};
    var mtd = this.method;
    var local = this.local;
    var userId = "";
    if(typeof this.sess.user!=='undefined'&&this.sess.user){
        if(!!this.params.id){
            if(mtd==='GET'){
            }else if(mtd==='POST'){      
            }
        }else{
            if(mtd === "POST"){ 
            }else if(mtd==='GET'){
              //商品类别 一级
              var catData = {};
              var renderCatList = [];
              catData = yield api.pullApiData('goods_cat_list',{});
              catData = JSON.parse(catData[1]);
              if(catData.success){
                 dataset = catData.list;
                  catData.list.map(function(item){
                   renderCatList.push('<option value='+item.id+' >'+item.catName+'</option>')
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
                      renderAttrList.push('<option value='+item.value+'>'+item.desc+'</option>')  
                  })
                  dataset.attrList = renderAttrList.join('\n');
                  //点价方式
                  attData.data.valuationTypeList.map(function(item){
                      renderAttrList2.push('<option value='+item.value+'>'+item.desc+'</option>')
                 })
                  dataset.valuationTList = renderAttrList2.join('\n');
                  //点价合约
                  attData.data.exchangeList.map(function(item){
                       renderAttrList3.push('<option value='+item.value+'>'+item.desc+'</option>') 
                  })
                  dataset.exchangeList = renderAttrList3.join('\n');
                  //点价合约
                  attData.data.partyTypeList.map(function(item){
                      renderAttrList4.push('<option value='+item.value+'>'+item.desc+'</option>')
                  })
                  dataset.partyTypeList = renderAttrList4.join('\n');
                  //交货方式：
                  attData.data.deliveryWayList.map(function(item){
                       renderAttrList5.push('<option value='+item.value+'>'+item.desc+'</option>')
                  })
                  dataset.deliveryWayList = renderAttrList5.join('\n');
                  //付款方式：
                  attData.data.paymentTypeList.map(function(item){
                      renderAttrList6.push('<option value='+item.value+'>'+item.desc+'</option>')
                  })
                  dataset.paymentTypeList = renderAttrList6.join('\n');
                  //挂牌状态：
                  attData.data.listStatusList.map(function(item){
                      renderAttrList7.push('<option value='+item.value+'>'+item.desc+'</option>')
                  })
                  dataset.listStatusList = renderAttrList7.join('\n');
              }
                  //点价时间
                  // var time = new Date(apiData.data.spGoods.stopDate);
                  // dataset.spGoods.stopDate = time.getFullYear() + "-" + (time.getMonth()+1) + "-" + time.getDate();
                  // //仓库列表  0==显示自己的
                  // var strongsData = {};
                  // strongsData =yield api.pullApiData('goods_mystorages_list',{'accountNo':this.sess.user.accountNo});
                  // strongsData = JSON.parse(strongsData[1]);
                  // if(strongsData.success){
                  //     for(var i = 0; i<strongsData.list.length;i++){
                  //         if(!!strongsData.list[i].shortName) strongsData.list[i].fullName = strongsData.list[i].fullName +"("+strongsData.list[i].shortName+")";
                  //         //if(dataset.spGoods.storage == strongsData.list[i].id)strongsData.list[i].select = "select";
                  //     }
                  //     dataset.storageList = strongsData.list;
                  // }
                  // //所有
                  // var strongsData1 = {};
                  // strongsData1 =yield api.pullApiData('goods_storages_list',{});
                  // strongsData1 = JSON.parse(strongsData1[1]);
                  // if(strongsData1.success){
                  //     for(var i = 0; i<strongsData1.list.length;i++){
                  //         if(!!strongsData1.list[i].shortName) strongsData1.list[i].fullName = strongsData1.list[i].fullName +"("+strongsData1.list[i].shortName+")";
                  //        // if(dataset.spGoods.storage == strongsData1.list[i].id)strongsData1.list[i].select = "select";
                  //     }
                  //     dataset.storageList1 = strongsData1.list;
                  // }
                  // //获取时间 >15   <15
                  // var dateT = new Date();
                  // var month = [];
                  // var dateY = dateT.getFullYear()%100;
                  // var nowMonth = dateT.getMonth()+1;
                  // var nowYear = dateY;                 
                  // for(var i=0;i<12;i++){
                  //    //dataset.hyTime = dateM+i
                  //     var InowMonth = nowMonth+i;
                  //     if(dateT.getDate()>15){
                  //         InowMonth++;                    
                  //     }                      
                  //     if(InowMonth>12){
                  //         nowYear = dateY+1;
                  //         InowMonth = InowMonth-12;
                  //     }  
                  //     InowMonth = InowMonth<10?"0"+InowMonth:InowMonth.toString();
                  //     var timeData = {'name':nowYear+InowMonth};
                  //     if(dataset.spGoods.contractPeriod==(nowYear+InowMonth))timeData.contractPeriod=true;
                  //     month[i] =timeData;
                  //     dataset.timeHY=month;
                  // }
                  // //单价
                  // if(dataset.spGoods.price != null) dataset.spGoods.price = dataset.spGoods.price.toFixed(2);
                  dataset.navGoods="active";                                                   
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