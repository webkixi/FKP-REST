var libs = require('../libs/libs')
var api = require('../apis/javaapi');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});

function *demoIndexData(oridata){

    libs.clog('pages/search.js');

    var apiData=[];
    var dataSet = {};
    var mtd = this.method;
    var goodsData = {};
    var infoData = {};

    if(mtd==='GET'){
        // var path = libs.$url.parse(this.path).pathname.replace('/','') // 处理query和hash
        var type=1,text="",pageCurrent=1;
        if(!!this.local.query){ 

            var query = this.local.query.split("&");
            for (var i = 0; i < query.length; i++) {
                var param = query[i].split("=");
                if (param[0]=="st") {type = param[1]};
                if (param[0]=="sc") {text = decodeURI(param[1])};
                if (param[0]=="pageCurrent") {pageCurrent = decodeURI(param[1])};
            };

            if(type == 1){
                infoData = yield info();
            }else if(type == 2){
                goodsData = yield goods();
            }else{
                infoData = yield info();
                goodsData = yield goods();
            }

         }
    }

    else if(mtd==='POST'){
        libs.clog('pages/search.js========POST');
        // var userInfo = yield api.user({'loginPhone':'13268280401'})
        // console.log(userInfo); 

        var body = yield libs.$parse(this);   
        apiData = yield api.search(body);

        if(body.st == 1){
            infoData = yield info();
        }else if(body.st == 2){
            goodsData = yield goods();
        }else{
            infoData = yield info();
            goodsData = yield goods();
        }
    }

     function *goods(){
        var datas = []
        datas = yield api.search({
                'st': 2,
                'sc': text,
                'pageCurrent':pageCurrent
            });
        return JSON.parse(datas[1]);
     }
     function *info(){
        var datas = []
        datas = yield api.search({
                'st': 1,
                'sc': text,
                'pageCurrent':pageCurrent
            });
        return JSON.parse(datas[1]);
     }
    if(type.length){
        if(goodsData.success || infoData.success){
            dataSet.goods = goodsData.data;
            dataSet.infos = infoData.data;
            // if (jsonData.data.st==2){
            //     jsonData.data.goods = jsonData.data.sc;
            //     dataSet.goods = jsonData.data;
            // }else{ 
            //     for (var i = 0; i < jsonData.data.pageBean.recordList.length; i++) {
            //         var time = new Date(jsonData.data.pageBean.recordList[i].publishTime);

            //         jsonData.data.pageBean.recordList[i].publishTime = time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate();
            //     };
            //      dataSet.info = jsonData.data;
            // }
            if(type == 1){
                dataSet.totalCount =dataSet.infos.pageBean.totalCount;
                dataSet.totalCount_infos = dataSet.infos.pageBean.totalCount;
                dataSet.info = dataSet.infos.pageBean.recordList;
                dataSet.st1 = true;
                dataSet.sc =dataSet.infos.sc;
            }else if(type==2){
                dataSet.totalCount = dataSet.goods.pageBean.totalCount;
                dataSet.totalCount_goods = dataSet.goods.pageBean.totalCount;
                console.log(dataSet.goods)
               // dataSet.goods = dataSet.goods.pageBean.recordList;
                dataSet.st2 = true;

                dataSet.sc = dataSet.goods.sc;
            }else {
                dataSet.totalCount_goods = dataSet.goods.pageBean.totalCount;
                dataSet.totalCount_infos = dataSet.infos.pageBean.totalCount;
                dataSet.totalCount = dataSet.totalCount_goods + dataSet.totalCount_infos; 
                dataSet.info = dataSet.infos.pageBean.recordList;
                dataSet.goods = dataSet.goods.pageBean.recordList;
                dataSet.st1 = true;
                dataSet.st2 = true;                
                dataSet.st0 = true; 
                dataSet.sc =dataSet.infos.sc;      
            } 
        }else{
            dataSet.errCode = goodsData.errCode || infoData.errCode;
            dataSet.errMsg = goodsData.errMsg ||infoData.errMsg ;
        }
        //if(jsonData.data.pageBean.pageCount != 1)dataSet.pages = "show";
        dataSet.root = api.apiPath.base
        oridata = libs.$extend(true,oridata,dataSet);
    }
    return oridata;
}

module.exports = {
    getData : demoIndexData
}
