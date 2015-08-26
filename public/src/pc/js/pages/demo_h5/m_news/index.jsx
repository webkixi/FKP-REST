$(function(){
	$(".news_contul").width(($(".news_contul li").length+1) * $(".news_contul li").width());
	var news_Bw=$(".slides_list").width();
	var news_Lw=$(".news_contul li").width();
	var newsIndex=$(".news_contul li.active").index()+1;
	var pagnationArr = newsIndex - news_Bw/news_Lw;
	$(".slides_list").find(".news_slides a").on("click",function(){
		var btn = $(this);
		var list_box = $(".slides_list").find(".tab");
		var item_ul = list_box;
		var item_li = list_box.find("li");
		var item_li_l = item_li.length;/*li的个数*/
		var item_li_w = item_li.width();/*li的宽度*/
		var item_li_al = 0;/*固定显示的li个数*/
		var item_ul_wi = item_li_l * item_li_w;/*ul的宽度*/
		var tabAnimat = 0;
		var total = item_li_l - 9;
		//if(item_ul_w<=list_box.width)return false;	
		if(btn.hasClass("news_Yl")){
			pagnationArr--;
		}else{
			pagnationArr++;
		}
		pagnationArr = pagnationArr<0?0:pagnationArr>(total-1)?(total):pagnationArr;
		tabAnimat = pagnationArr *  -item_li.width();
		item_ul.animate({marginLeft:tabAnimat});									
	});
	/*获取当前li在哪个位置*/
	var news_W = (newsIndex+1) * news_Lw;
	var news_ML = news_W - $(".slides_list").width();
	if(news_ML>0){
		$(".slides_list ul").css("marginLeft",-news_ML)
	}
})