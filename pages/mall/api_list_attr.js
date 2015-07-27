var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
var rct = require('../../modules/parseReact');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});


function *demoIndexData(oridata){

    libs.clog('pages/malllist.js');

    var apiData={};
    var mtd = this.method;
    var local = this.local;
    var attrHtml;

    if (mtd==='GET'){
        // 属性列表

    }

    else
    if (mtd==='POST'){
        libs.clog('pages/malllist_attr.js========POST');
        // var userInfo = yield api.user({'loginPhone':'13268280401'})
        // console.log(userInfo);

        apiData = yield api.pullApiData('mall_attr',{});
    }
    //页面商城数据
    var jsonData = JSON.parse(apiData[1]);

    return jsonData;
}

module.exports = {
    getData : demoIndexData
}
