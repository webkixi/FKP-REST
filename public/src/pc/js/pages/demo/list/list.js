(function($){
	$.fn.extend({
		carousel:function(obj){
			var _obj = {
				dotBtn : true,
				zrBtn : true,
				autoControl : true,
				switchFlag : true,
				switchFlag2 : true,
				spend : 3000
			}
			_obj = $.extend({},_obj,obj);
			var picTimer;
			var _this = $(this);
			var tabAnimat=0;
			var carouselUl = _this.find(".pro_carousel_page ul");
			var carouselLi = _this.find(".pro_carousel_ul li");
			var carouselPage = _this.find(".pro_carousel_page li");
			var picLen = carouselLi.length;
			var picWit = carouselLi.width();

			var index =0;
			var html;
			var btnFlag = true;
			switchFlag = true;
			if(_obj.dotBtn){
				_this.find(".pro_carousel_page li").parents("ul").show();
				for(i=0;i<picLen-1;i++){
					html = $("<li><span></span></li>");
					carouselUl.append(html);
				};
				_this.find(".pro_carousel_page li").click(function(){
					index = $(this).index()-1;
					pro_carousel(_this);
				});
			}else{
				_this.find(".pro_carousel_page li").parents("ul").hide();
			}

			if(_obj.zrBtn){
				_this.find(".pro_carousel_btn a").show();
				_this.find(".pro_carousel_btn a").click(function(){
					if($(this).hasClass("right")){
						btnFlag = true;
						pro_carousel(_this);	
					}else{
						btnFlag = false;
						pro_carousel(_this);	
					}
				});
			}else{
				_this.find(".pro_carousel_btn a").hide();
			}

			if(_obj.autoControl){
				$(_this).hover(function(){
					clearInterval(picTimer);
				},function(){
					btnFlag = true;
					picTimer = setInterval(function(){
						pro_carousel(_this);
					},_obj.spend);
				}).trigger("mouseleave");
			}
			function pro_carousel(li){
				if(_obj.switchFlag){
					if(btnFlag){
						index = index++<(picLen-1)?index:0;		
					}		
					else{
						index = index--<picLen-2?(picLen-1):index;
					}
				}
				else{
					if(btnFlag){
						index = index++>=picLen?(picLen-1):index>0?index:0;
					}		
					else{
						index = index-->=picLen?(picLen-1):index>0?index:0;	
					}	
				}
				tabAnimat = index * picWit;
				li.find(".pro_carousel_page li").eq(index).addClass("active").siblings().removeClass("active");

				if(_obj.switchFlag2){
					li.find(".pro_carousel_ul").animate({left:picWit});
					li.find(".pro_carousel_ul li").eq(index).stop(true,false).css("left");
				}else{
					li.find(".pro_carousel_ul li").eq(index).parents(".pro_carousel").find(".pro_carousel_ul").animate({marginLeft:-tabAnimat});
				}				
			}				
		}
	})
})(jQuery);
