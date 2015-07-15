var libs = require('libs/libs')
var qs = require('querystring');
var src = "http://120.25.223.175:5051/jh-web-portal/";
var apiPath = {
    base: src,
    dirs: {
        search: src+'api/search.html',
        user: src+'checkUserStatus.html',
        mall_list: src+'api/mall/item/list/query.html',
        mall_attr: src+'api/mall/item/list/attributes.html'
    }
}

function req(api,param,cb){
    var url = apiPath.dirs[api];
    var query = qs.stringify(param);

    if(libs.getObjType(param)!=='Object')
        return false;
	request({method:'POST', url:url+'?'+query, json:{relaxed:true}}, function(err,response,body){
		if(err)
		    throw err
        cb.call(null,body);
	});
}

module.exports = {
	apiPath: apiPath,
	req: req
}
