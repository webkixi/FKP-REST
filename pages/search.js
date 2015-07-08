var libs = require('../libs/libs')
var api = require('../apis/javaapi');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});

function *demoIndexData(oridata){

    libs.clog('pages/search.js');

    var apiData={};
    var dataSet = {};
    var mtd = this.method;

    if(mtd==='GET'){
        // var path = libs.$url.parse(this.path).pathname.replace('/','') // 处理query和hash
        var query = this.local.query.split("&");
        var type="",text="";
        for (var i = 0; i < query.length; i++) {
            var param = query[i].split("=");
            if (param[0]=="st") {type = param[1]};
            if (param[0]=="sc") {text = decodeURI(param[1])};
        };
        apiData = yield api.search({
            'st': type,
            'sc': text
        });
    }

    else if(mtd==='POST'){
        libs.clog('pages/search.js========POST');
        // var userInfo = yield api.user({'loginPhone':'13268280401'})
        // console.log(userInfo); 

        var body = yield libs.$parse(this);   
        apiData = yield api.search(body);
    }

    var jsonData = JSON.parse(apiData[1]);
    libs.clog(jsonData);
    libs.clog(jsonData.data.pageBean.recordList);
    if(jsonData.success){
        if (jsonData.data.st==2){
            jsonData.data.goods = jsonData.data.sc;
            dataSet = jsonData.data;
        }else{ 
            for (var i = 0; i < jsonData.data.pageBean.recordList.length; i++) {
                var time = new Date(jsonData.data.pageBean.recordList[i].publishTime);

                jsonData.data.pageBean.recordList[i].publishTime = time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate();
            };
        }
        dataSet = jsonData.data;
    }else{
        dataSet.errCode = jsonData.errCode;
        dataSet.errMsg = jsonData.errMsg;
    }
    dataSet.root = api.apiPath.base
    oridata = libs.$extend(true,oridata,dataSet);

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
