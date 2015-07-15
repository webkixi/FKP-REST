;(function(){

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

	$("#searchHeader").submit(function(){
		if(!$(this).find(".search_text").val()){
			$(this).find(".search_text").addClass("bd_col")
			return false;
		}
	})

})();

