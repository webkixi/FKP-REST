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

    if(mtd==='GET'){
        // 属性列表
        attrData = yield api.pullApiData('mall_attr',{});

        //商品列表，默认全部商品
        apiData = yield api.mallList({
            'pageCurrent': 1,
            'orderField': '',
            'orderDirection':'',
            'pageSize':24,
            '_rt': new Date().getTime()
        })
    }

    else if(mtd==='POST'){
        libs.clog('pages/malllist.js========POST');
        // var userInfo = yield api.user({'loginPhone':'13268280401'})
        // console.log(userInfo);

        var body = yield libs.$parse(this);
    
        body._rt = new Date().getTime();
        apiData = yield api.mallList(body);
    }

    //页面商城数据
    var jsonData = JSON.parse(apiData[1]);

    // 页面选择面板数据
    var attrData = JSON.parse(attrData[1]);

    //react template
    //商城选择面板模板render
    // var reactHtml = rct('list',{
    //     itemStyle: {width:'240px'},
    //     data: jsonData.pagination.recordList  //数组
    // });

    //商城商品列表模板render
    var reactHtml = rct('list',{
        itemStyle: {width:'240px'},
        data: jsonData.pagination.recordList  //数组
    });

    jsonData.reactMallGoodsList = reactHtml;

    oridata = libs.$extend(true,oridata,jsonData);

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
