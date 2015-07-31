var libs = require('libs/libs')
var qs = require('querystring');
var src = "http://120.25.223.175:5051/jh-web-portal/";
var apiPath = {
    base: src,
    dirs: {
        search: src+'api/search.html',
        region: '/region',
        user: src+'checkUserStatus.html',
        mall_attr: '/mall/api_list_attr',
        mall_exhibition: '/mall/list',
        goods_attr: '/common/goods_attr',
        submitOrder: '/mall/item_order.html',//提交订单
        login: '/account/login',
        account_goods_list: '/goods/list.html',//会员中心，商品列表
        account_order_list: '/order/list.html',//会员中心，订单列表
        updateAccount: '/account/myaccount',
        updateAccountBase: '/account/myaccount_base',
        updateAccountAuth: '/account/myaccount_auth',
        firmDetailView: '/firm/view',
        firmDetailSave: '/firm/edit',
        goods_edit: '/goods/edit',
        goods_add: '/goods/add'
    }
}

function req( api, param, cb ){

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
    $.post( url, param, function( body, status ){
        if( status === 'success' )
            cb( body ) ;
    },
    "json" )

    // $.ajax({
    //     url: url,
    //     type: 'POST',
    //     data: param,
    //     dataType: 'JSON',
    //     cache: false,
    //     processData: false,
    //     contentType: false
    // }).done(function(ret){
    //     if(status==='success')
    //         cb.call(null, body) ;
    //
    //     if(ret['isSuccess']){
    //         var result = '';
    //         result += 'name=' + ret['name'] + '<br>';
    //         result += 'gender=' + ret['gender'] + '<br>';
    //         result += '<img src="' + ret['photo']  + '" width="100">';
    //         $('#result').html(result);
    //     }else{
    //         alert('提交失敗');
    //     }
    // });
}

module.exports = {
	apiPath: apiPath,
	req: req
}
