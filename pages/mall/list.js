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
        });

        // 页面选择面板数据
        var attrData = JSON.parse(attrData[1]);

        var nav_data = attrData.data.spCatList;
        var list_data = attrData.data.attributes;

        var sortAry = function(a,b){
			aaa = a.substring(0,2);
			bbb = b.substring(0,2);
			return aaa-bbb;
		}
        var keys_listData = Object.keys(list_data).sort(sortAry);

        //重新生成对象
		var tmp = {};
        keys_listData.map(function(item,i){
			var id = item.substring(0,2);
			var str = item.substring(3);
			if(i%4===0)
				tmp[id] = {}
			tmp[id][str] = list_data[item];
		});

        //新对象数组，用于取出新对象的数据
        var cnt_tabs = {};
		for(unit in tmp){
			var items = []
			for(u in tmp[unit]){
				items.push(tmp[unit][u]);
			}
			cnt_tabs[unit] = items;
		}
		var keys_cntTabs = Object.keys(cnt_tabs);

        //react template
        // attrHtml = rct('mall_list_attr',{
        //     navData: nav_data,
        //     attrData: cnt_tabs
        // })


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


    // react
    //商城商品列表模板render
    var reactHtml = rct('list',{
        itemStyle: {width:'240px'},
        data: jsonData.pagination.recordList  //数组
    });

    jsonData.reactMallGoodsList = reactHtml;
    if(attrHtml)
        jsonData.reactMallGoodsAttrs = attrHtml;

    oridata = libs.$extend(true,oridata,jsonData);

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
