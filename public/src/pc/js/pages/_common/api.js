var libs = require('libs/libs')
var qs = require('querystring');
var src = "/";
var demoSrc = "http://mock.agzgz.com/";
var apiPath = {
    base: src,
    dirs: {
        service: src+'service',   //小保养
        parts: src+'parts',   //小保养
        queryallbrand: src+'queryallbrand',   //汽车品牌
        queryseries: src+'queryseries',   //汽车车系
        querycartype: src+'querycartype',   //汽车型号
        useraddcar: src+'useraddcar',   //个人中心的添加车辆
        order_addr: src+'order_addr',   //个人中心的地址
        order_addaddr: src+'order_addaddr',   //个人中心的添加地址
        order_deladdr: src+'order_deladdr',   //个人中心的删除地址
        mycarlist: src+'mycarlist',   //个人中心的车辆
        mycar_del: src+'mycar_del',   //个人中心的删除车辆
        myorder_info: src+'myorder_info',   //订单详情
        order_list: src+'order_list',   //订单列表
        carchecking: src+'carchecking'   //订单列表
    }
}
function req( api, param, cb ){
    var url = apiPath.dirs[api];
    if(url){
        $.post( url, param, function( body, status ){
            if( status === 'success' ) cb( body ) ;
        }, "json")
    }
}

module.exports = {
	apiPath: apiPath,
	req: req
}
