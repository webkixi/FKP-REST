require('../../_common/laypage.dev')

// laypage({
//     cont: $('#page_1'), //容器。值支持id名、原生dom对象，jquery对象,
//     pages: ${listedPage.pageCount}, //总页数
//     curr: ${listedPage.currentPage},
//     skip: true, //是否开启跳页
//     skin: '#ff6600',
//     groups: 3, //连续显示分页数
//     jump: function(obj, first){ //触发分页后的回调
//         if(!first){ //一定要加此判断，否则初始时会无限刷新
//             $('#pageCurrent_1').val(obj.curr);
//             $('#queryGoodsBtn_1').trigger("click");
//         }
//     }
// });
// laypage({
//     cont: $('#page_2'), //容器。值支持id名、原生dom对象，jquery对象,
//     pages: ${unlistedPage.pageCount}, //总页数
//     curr: ${unlistedPage.currentPage},
//     skip: true, //是否开启跳页
//     skin: '#ff6600',
//     groups: 3, //连续显示分页数
//     jump: function(obj, first){ //触发分页后的回调
//         if(!first){ //一定要加此判断，否则初始时会无限刷新
//             $('#pageCurrent_2').val(obj.curr);
//             $('#queryGoodsBtn_2').trigger("click");
//         }
//     }        
// });
// laypage({
//     cont: $('#page_3'), //容器。值支持id名、原生dom对象，jquery对象,
//     pages: ${overduePage.pageCount}, //总页数
//     curr: ${overduePage.currentPage},
//     skip: true, //是否开启跳页
//     skin: '#ff6600',
//     groups: 3, //连续显示分页数
//     jump: function(obj, first){ //触发分页后的回调
//         if(!first){ //一定要加此判断，否则初始时会无限刷新
//             $('#pageCurrent_3').val(obj.curr);
//             $('#queryGoodsBtn_3').trigger("click");
//         }
//     }        
// });  


  
// $(function(){
// 	var ajaxAsync = true;
// 	var ajaxTimeout = 3000;
// 	var dataType = "json";
// 	var catId2InitVal = ['${catId2_1}', '${catId2_2}', '${catId2_3}'];
// 	var brandIdInitVal = ['${brandId_1}', '${brandId_2}', '${brandId_3}'];
// 	var catId2Init = [false, false, false];
// 	var brandIdInit = [false, false, false];
// 	$([1,2,3]).each(function(index, item){ 
// 	  	$('#catId_' + item).change(function() {
// 	  		changeGoodsCat(item);
// 		});
// 	  	$('#catId2_' + item).change(function() {
// 	  		changeGoodsCat2(item);
// 		});
// 		$('#catId_' + item).trigger("change");
		
// 		$('#queryGoodsBtn_' + item).click(function() {
// 			$('#curList').val(item);
// 		});
// 	});
// 		$('#addGoodsBtn').click(function() {
// 			open("${rc.contextPath}/goods/add.html");
// 	});
// 	function changeGoodsCat(i) {
// 	  	if(!$('#catId_' + i).val()){
// 	  		return;
// 	  	}
// 	  	$.ajax({
// 			type: "GET",
// 			url: "${rc.contextPath}/goods/cat2/list.html?catId=" + $('#catId_' + i).val(),
// 			timeout: ajaxTimeout,
// 			dataType: dataType,
// 			async: ajaxAsync,
// 			success: function(response) {
// 				$('#catId2_' + i).empty();
// 				$("#catId2_" + i).append("<option value=''>--请选择--</option>");
// 				$(response).each(function(index, item){ 
// 					$("#catId2_" + i).append('<option value="' + item.id + '">' + item.catName + '</option>');
// 				});
// 				if(catId2Init[i - 1] == false) {
// 					$("#catId2_" + i).val(catId2InitVal[i - 1]);
// 					catId2Init[i - 1] = true;
// 				}
// 				changeGoodsCat2(i);
// 				return;
// 			},
// 			error: function() {
// 			}
// 		});    	
// 	}
// 	function changeGoodsCat2(i) {
// 	  	if(!$('#catId2_' + i).val()){
// 	  		return;
// 	  	}
// 	  	$.ajax({
// 			type: "GET",
// 			url: "${rc.contextPath}/goods/brands/list.html?catId=" + $('#catId2_' + i).val(),
// 			timeout: ajaxTimeout,
// 			dataType: dataType,
// 			async: ajaxAsync,
// 			success: function(response) {
// 				$("#brandId_" + i).empty();
// 				$("#brandId_" + i).append("<option value=''>--请选择--</option>");
// 				$(response).each(function(index, item){ 
// 					$("#brandId_" + i).append("<option value='" + item.id + "'>" + item.brandName + "</option>");
// 				});
// 				if(brandIdInit[i - 1] == false) {
// 					$("#brandId_" + i).val(brandIdInitVal[i - 1]);
// 					brandIdInit[i - 1] = true;
// 				}
// 			},
// 			error: function() {
// 			}
// 		});    	
// 	}
// })
