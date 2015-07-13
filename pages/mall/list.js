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
        apiData = yield api.mallList({
            'pageCurrent': 1,
            'orderField': '',
            'orderDirection':'',
            'pageSize':24,
            '_rt': new Date().getTime()
        });
    }

    else if(mtd==='POST'){
        libs.clog('pages/malllist.js========POST');
        // var userInfo = yield api.user({'loginPhone':'13268280401'})
        // console.log(userInfo);

        var body = yield libs.$parse(this);
    
        body._rt = new Date().getTime();
        apiData = yield api.mallList(body);
    }

    var jsonData = JSON.parse(apiData[1]);
    // libs.wlog(apiData[1]);

    //react
    var reactHtml = rct('list');
    jsonData.reacttest = reactHtml;


    oridata = libs.$extend(true,oridata,jsonData);

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
