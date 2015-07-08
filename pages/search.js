var libs = require('../libs/libs')
var api = require('../apis/javaapi');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});

function *demoIndexData(oridata){

    libs.clog('pages/search.js');

    var apiData={};
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
    for (var i = 0; i < jsonData.pageBean.recordList.length; i++) {
        var time = new Date(jsonData.pageBean.recordList[i].publishTime);

        jsonData.pageBean.recordList[i].publishTime = time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate();
    };
    if (jsonData.st==2) jsonData.goods = jsonData.sc;
    oridata = libs.$extend(true,oridata,jsonData);

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
