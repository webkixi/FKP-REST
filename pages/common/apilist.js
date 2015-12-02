// var src = "http://120.25.241.174:8080/v1/servicetype/";
//var src = "http://192.168.4.57:8080/v1/";
var src = "http://120.25.241.174:8080/v1/";
var src2 = "http://120.25.241.174:8090/v2/";

var apiPath = {
    base: src,
    dirs: {
        wx_token: 'https://api.weixin.qq.com/cgi-bin/token',
        wx_web_token: 'https://api.weixin.qq.com/sns/oauth2/access_token',

        service: src+'servicetype/query',
        parts: src+'parts/query',
        queryallbrand: src+'car/queryallbrand',
        queryseries: src+'car/queryseries',
        querycartype: src+'car/querycartype',

        carchecking: src+'servicetype/query/carchecking',
        region: src+'region/query',
        getmms: src+'user/getsmscode',
        orderins: src+'order/insert',
        orderins_v2: src2+'order/insert',
        order_list: src+'order/query',
        myorder_info: src+'order/info',
        mobilecode: src+'user/login',
        useraddcar: src+'usercar/insert',
        order_addr: src+'addr/query',
        order_deladdr: src+'addr/delete',
        order_addaddr: src+'addr/insert',
        mycarlist: src+'usercar/query',
        mycar_del: src+'usercar/delete',
        washcar: src+'servicetype/query/washcar',

        login: src+'user/login',
        getshoplist: src2+'dealer/query'

        ,discountlist: src2+'order/query'
    },

    weixin: {
        //oauth2方式的api会议 '_web' 方式结尾
        userlist: 'https://api.weixin.qq.com/cgi-bin/user/get',
        querymenu: 'https://api.weixin.qq.com/cgi-bin/menu/get',        //?access_token=ACCESS_TOKEN
        createmenu: 'https://api.weixin.qq.com/cgi-bin/menu/create',    //?access_token=ACCESS_TOKEN

        userinfo_web: 'https://api.weixin.qq.com/sns/userinfo'  //?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
    }
}

module.exports = apiPath
