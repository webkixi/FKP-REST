var libs = require('libs/libs')
var qs = require('querystring');
var src = "http://120.25.223.175:5051/jh-web-portal/";
var apiPath = {
    base: src,
    dirs: {
        search: src+'api/search.html',
        region: '/region',
        user: src+'checkUserStatus.html',
        mall_list: src+'api/mall/item/list/query.html',
        mall_attr: src+'api/mall/item/list/attributes.html',
        login: '/account/login',
        updateAccount: '/account/myaccount',
        updateAccountBase: '/account/myaccount_base'
    }
}

function req(api,param,cb){
    var url = apiPath.dirs[api];
    var query = qs.stringify(param);
    var paramStr = JSON.stringify(param);

    if(libs.getObjType(param)!=='Object')
        return false;

    /*
	request({method:'POST', url:url, body:paramStr, json:true}, function(err,response,body){
	// request({method:'POST', url:url, json:param}, function(err,response,body){
	// request({method:'POST', url:url+'?'+query, json:{relaxed:true}}, function(err,response,body){
	// request({method:'POST', url:url+'?'+query}, function(err,response,body){
		if(err)
		    throw err
        cb.call(null,body);
	});
    */
    console.log(param);
    $.post(url, param, function(body,status){
        if(status==='success')
            cb.call(null, body) ;
   }, "json");
}

module.exports = {
	apiPath: apiPath,
	req: req
}
