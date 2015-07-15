	// $(document).ready(function() {
	// 	$('#province').change(function() {
	// 		changeProvince();
	// 	});
	// 	$('#city').change(function() {
	// 		changeCity();
	// 	});
	// });
	// var ajaxAsync = true;
	// var ajaxTimeout = 3000;
	// var dataType = "json";
	// function changeProvince() {
	// 	if (!$('#province').val()) {
	// 		return;
	// 	}
	// 	$.ajax({
	// 		type : "GET",
	// 		url : "${rc.contextPath}/region-list.html?regionId=" + $('#province').val(),
	// 		timeout : ajaxTimeout,
	// 		dataType : dataType,
	// 		async : ajaxAsync,
	// 		success : function(response) {
	// 			$("#city").empty();
	// 			$("#district").empty();
	// 			$("#city").append("<option value=''>--选择城市--</option>");
	// 			$("#district").append("<option value=''>--选择区县--</option>");
	// 			$(response).each(function(index, item) {
	// 				$("#city").append('<option value="' + item.id + '">' + item.regionName + '</option>');
	// 			});
	// 			changeCity();
	// 			return;
	// 		},
	// 		error : function() {
	// 		}
	// 	});
	// }
	// function changeCity() {
	// 	if (!$('#city').val()) {
	// 		return;
	// 	}
	// 	$.ajax({
	// 		type : "GET",
	// 		url : "${rc.contextPath}/region-list.html?regionId=" + $('#city').val(),
	// 		timeout : ajaxTimeout,
	// 		dataType : dataType,
	// 		async : ajaxAsync,
	// 		success : function(response) {
	// 			$("#district").empty();
	// 			$("#district").append("<option value=''>--选择区县--</option>");
	// 			$(response).each(function(index, item) {
	// 				$("#district").append('<option value="' + item.id + '">' + item.regionName + '</option>');
	// 			});
	// 		},
	// 		error : function() {
	// 		}
	// 	});
	// }