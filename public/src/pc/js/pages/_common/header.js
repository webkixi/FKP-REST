/*头部搜索*/
	$(".arrow-select-down").click(function(){
		$(this).siblings("ul").toggleClass("hidden");
	});
	$(".item-select li").click(function(){
		var val = $(this).attr("data");
		$("#search_hide").val(val);
		$(this).parents("ul").addClass("hidden").siblings("a").find("span").html($(this).html());
		
	});
	$(document).click(function() {
		$('.item-select ul').addClass("hidden");
	});
	$('.arrow-select-down').click(function(event) {
		event.stopPropagation();
	});