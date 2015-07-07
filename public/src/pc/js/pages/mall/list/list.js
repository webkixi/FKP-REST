require('./laypage')
require('./item')

var pageCurrent = 1;
var orderField = "";
var orderDirection = "";

$(document).ready(function() {
	doQuery();
});

function setOrder(field, order) {
    orderField = field;
    orderDirection = order;
	pageCurrent = 1;
}
var catId = "${catId!''}";
function changeCat(id) {
	if(catId != id){
		pageCurrent = 1;
    	catId = id;
    	doQuery();
	}
}
function doQuery() {
	var params = {};
	//$("ul[class='nav nav-tabs']").find("li.active").each(function(index, item) { 
	//	params[$(item).attr("data-param")] = $(item).attr("data-val");
	//});
	params['catId'] = catId;

	//$(".tab-content").find("div.active").find(".cateTags dd").each(function(index, item) { 
	//	params[$(item).attr("data-param")] = $(item).attr("data-val");
	//});
	if(catId == "") {
    	$("#cat-all").find(".cateTags dd").each(function(index, item) { 
    		params[$(item).attr("data-param")] = $(item).attr("data-val");
    	});
	} else {
    	$("#cat-" + catId).find(".cateTags dd").each(function(index, item) { 
    		params[$(item).attr("data-param")] = $(item).attr("data-val");
    	});
	}
	params['pageCurrent'] = pageCurrent;
	params['orderField'] = orderField;
	params['orderDirection'] = orderDirection;
	params['pageSize'] = 24;

	var ajaxAsync = true;
	var ajaxTimeout = 3000;
	var dataType = "json";

	var defaultImg = "${rc.contextPath}/statics/front/images/blank.gif";
	
  	$.ajax({
		type: "POST",
		url: "${rc.contextPath}/mall/item/list/query.html?_rt=" + new Date().getTime(),
		timeout: ajaxTimeout,
		dataType: dataType,
		async: ajaxAsync,
		data : params,
		success: function(response) {
			$("#item-list").empty();
			$(response.recordList).each(function(index, item){ 
				var dom ='<li class="span2">';
				dom += '<dl>';
				if(item.picture && item.picture != "") {
					dom += '<dt><a target="_blank" href="${rc.contextPath}/mall/item/detail/' + item.id + '.html"><img src="${imagePath}' + item.picture + '"></a></dt>';
				} else {
					dom += '<dt><a target="_blank" href="${rc.contextPath}/mall/item/detail/' + item.id + '.html"><img class="error_img" src="' + defaultImg + '"></a></dt>';
				}
				dom += '<dd><span>' + item.catName2 + ' </span> ' + item.vender + '</dd>';
				dom += '<dd><span>' + item.catName2 + ' </span> ' + item.model + '</dd>';
				dom += '<dd><span>挂牌量： </span> ' + item.stock + item.unitName + '</dd>';
				dom += '<dd><span>起订量： </span> ' + item.minQuantity + item.unitName + '</dd>';
				dom += '<dd><span>供货商： </span> ' + item.accountName + '</dd>';
				dom += '</dl>';
				dom += '</li>';
                $("#item-list").append(dom);

			});
			
			laypage({
			    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象,
			    pages: response.pageCount, //总页数
			    curr: response.currentPage,
			    skip: true, //是否开启跳页
			    skin: '#ff6600',
			    groups: 3, //连续显示分页数
			    jump: function(obj, first){ //触发分页后的回调
			        if(!first){ //一定要加此判断，否则初始时会无限刷新
			        	pageCurrent = obj.curr;
			        	doQuery();
			        }
			    }        
			});				
			return;
		},
		error: function() {
		}
	});    	

}