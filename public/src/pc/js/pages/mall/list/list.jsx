// require('./laypage')
// require('./item')
//
// var pageCurrent = 1;
// var orderField = "";
// var orderDirection = "";
//
// $(document).ready(function() {
// 	doQuery();
// });
//
// function setOrder(field, order) {
//     orderField = field;
//     orderDirection = order;
// 	pageCurrent = 1;
// }
// var catId = "${catId!''}";
// function changeCat(id) {
// 	if(catId != id){
// 		pageCurrent = 1;
//     	catId = id;
//     	doQuery();
// 	}
// }
//
// function doQuery() {
// 	var params = {};
// 	//$("ul[class='nav nav-tabs']").find("li.active").each(function(index, item) {
// 	//	params[$(item).attr("data-param")] = $(item).attr("data-val");
// 	//});
// 	params['catId'] = catId;
//
// 	//$(".tab-content").find("div.active").find(".cateTags dd").each(function(index, item) {
// 	//	params[$(item).attr("data-param")] = $(item).attr("data-val");
// 	//});
// 	if(catId == "") {
//     	$("#cat-all").find(".cateTags dd").each(function(index, item) {
//     		params[$(item).attr("data-param")] = $(item).attr("data-val");
//     	});
// 	} else {
//     	$("#cat-" + catId).find(".cateTags dd").each(function(index, item) {
//     		params[$(item).attr("data-param")] = $(item).attr("data-val");
//     	});
// 	}
// 	params['pageCurrent'] = pageCurrent;
// 	params['orderField'] = orderField;
// 	params['orderDirection'] = orderDirection;
// 	params['pageSize'] = 24;
//
// 	var ajaxAsync = true;
// 	var ajaxTimeout = 3000;
// 	var dataType = "json";
//
// 	var defaultImg = "${rc.contextPath}/statics/front/images/blank.gif";
//
//   	$.ajax({
// 		type: "POST",
// 		url: "${rc.contextPath}/mall/item/list/query.html?_rt=" + new Date().getTime(),
// 		timeout: ajaxTimeout,
// 		dataType: dataType,
// 		async: ajaxAsync,
// 		data : params,
// 		success: function(response) {
// 			$("#item-list").empty();
// 			$(response.recordList).each(function(index, item){
// 				var dom ='<li class="span2">';
// 				dom += '<dl>';
// 				if(item.picture && item.picture != "") {
// 					dom += '<dt><a target="_blank" href="${rc.contextPath}/mall/item/detail/' + item.id + '.html"><img src="${imagePath}' + item.picture + '"></a></dt>';
// 				} else {
// 					dom += '<dt><a target="_blank" href="${rc.contextPath}/mall/item/detail/' + item.id + '.html"><img class="error_img" src="' + defaultImg + '"></a></dt>';
// 				}
// 				dom += '<dd><span>' + item.catName2 + ' </span> ' + item.vender + '</dd>';
// 				dom += '<dd><span>' + item.catName2 + ' </span> ' + item.model + '</dd>';
// 				dom += '<dd><span>挂牌量： </span> ' + item.stock + item.unitName + '</dd>';
// 				dom += '<dd><span>起订量： </span> ' + item.minQuantity + item.unitName + '</dd>';
// 				dom += '<dd><span>供货商： </span> ' + item.accountName + '</dd>';
// 				dom += '</dl>';
// 				dom += '</li>';
//                 $("#item-list").append(dom);
//
// 			});
//
// 			laypage({
// 			    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象,
// 			    pages: response.pageCount, //总页数
// 			    curr: response.currentPage,
// 			    skip: true, //是否开启跳页
// 			    skin: '#ff6600',
// 			    groups: 3, //连续显示分页数
// 			    jump: function(obj, first){ //触发分页后的回调
// 			        if(!first){ //一定要加此判断，否则初始时会无限刷新
// 			        	pageCurrent = obj.curr;
// 			        	doQuery();
// 			        }
// 			    }
// 			});
// 			return;
// 		},
// 		error: function() {
// 		}
// 	});
//
// }



libs = require('libs/libs');
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





// react
var Tabswitch = require('modules/tabs/tabswitch');
var rend = React.render;

//回掉函数
function rd(body){
	if(body.success){
		var nav_data = body.data.spCatList;
		var list_data = body.data.attributes;
		nav_data.unshift({id: 'all', catName: '全部'});

		var tmp = {};

		//按数字排序
		var sortAry = function(a,b){
			aaa = a.substring(0,2);
			bbb = b.substring(0,2);
			return aaa-bbb;
		}
		var kkk = Object.keys(list_data).sort(sortAry);

		//重新生成对象
		kkk.map(function(item,i){
			var id = item.substring(0,2);
			var str = item.substring(3);
			if(i%4===0)
				tmp[id] = {}
			tmp[id][str] = list_data[item];
		})

		//新对象数组，用于取出新对象的数据
		var cnt_tabs = {};
		for(unit in tmp){
			var items = []
			var i = 0;
			for(u in tmp[unit]){
				var ele = tmp[unit][u];
				if(libs.getObjType(ele[0])==='Object'){
					ele.unshift({id: 'unlimit',catName: '不限'});
					ele.unshift({id: 'pinming',catName: '品名'})
				}else{
					ele.unshift('不限');
					if(i===1){
						ele.unshift('规格');
					}
					if(i===2)
						ele.unshift('质量标准')
					if(i===3)
						ele.unshift('厂家')
				}
				items.push(ele);
				i++;
			}
			cnt_tabs[unit] = items;
		}
		var keys = Object.keys(cnt_tabs);


		var ddd = cnt_tabs[keys[0]];
		//每一个tab响应事件
		var itemClick = function(store){
		    $(this).click(function(){
				var id = this.getAttribute('data-val');
				var ddd = cnt_tabs[id];
		        $(this).css({backgroundColor:'red'});
				store.adder({cntData: ddd});

				// var aaa = React.createElement(Cnt,{data: ddd});
				// console.log(aaa);
				// cstore.setter('tab',ddd);
				// store.setter(ddd);
		    })
		}

		rend(
			<Tabswitch data={nav_data} cntData={ddd} listClass={'fox'} itemStyle={{width:'auto'}} itemMethod={itemClick} />
			,document.getElementById('tab-test')
		)

	}
}

//request数据并回掉渲染
req('mall_attr',{},rd);
