$(function(){
	$(".more").click(function(){
		if ($(this).prev("ul").hasClass("active")) {
			$(this).prev("ul").removeClass("active");				
		}else{
			$(this).prev("ul").addClass("active");
		}
	})		
})