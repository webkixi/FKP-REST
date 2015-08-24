//这个JQ扩展插件用于商品的切换展示

$(function(){ 
	
	$(".pro_carousel").each(function(index,_this){
		_this=$(_this);
		var inner=_this.find(".pro_carousel_ul li");
		var indicators=_this.find(".pro_carousel_page li");
		var width,cycle,index;
			_this.DX=0,_this.MX=0,_this.UX=0,_this.DY=0,_this.MY=0,_this.UY=0,_this.TOP=0;
			_this.mark = true;
		//init() 初始化
		_this.init=function()
		{
			width=_this.width();
			_this.num=_this.find(".pro_carousel_ul li").length;
			//inner.width(width*_this.num+width).find(".pro_carousel_ul li").eq(0).clone().appendTo(inner);
			index=0;
			
			_this.z=10;
			_this.w = width;
			_this.slide();
		}
		_this.on('touchstart',function(e){
			clearInterval(cycle);
			if(!_this.mark)return;
			
			var ev =event || e;
			if(ev.targetTouches){
				var touch = ev.targetTouches[0]; 
				_this.DY = touch.pageY;
				_this.DX = touch.pageX;
			}else{
				_this.DY = ev.clientY;
				_this.DX = ev.clientX;
			}
			
			_this.mark = false;
			return false;
		});
		
		_this.on('touchmove',function(e){
			if(_this.mark)return;
			var ev =event || e;
			if(ev.targetTouches){
				var touch = ev.targetTouches[0]; 
				_this.MY = touch.pageY;
				_this.MX = touch.pageX;
			}else{
				_this.MY = ev.clientY;
				_this.MX = ev.clientX;
			}
			
			_this.TOP=_this.DY-_this.MY
			var xl = Math.abs(_this.DX-_this.MX)
			if(xl>20&&xl>Math.abs(_this.TOP)){
				inner.css("left",-width*index-(_this.DX-_this.MX))
			}else{
				$("body").scrollTop($("body").scrollTop()+_this.TOP)
			}
			
			return false;
		});
		_this.on('touchend',function(e){
			//if(_this.mark)return;
				if(Math.abs(_this.MX - _this.DX) < 5 && Math.abs(_this.MY - _this.DY) < 5){
					_this.mark = true;
					if(inner.find(".pro_carousel_ul li a").length==_this.find(".pro_carousel_ul li").length)window.location.assign(inner.find(".pro_carousel_ul li a").eq(index).attr("url"));
					
					return false;
				}else if(_this.MX==0&&_this.MY==0){
					_this.mark = true;
					if(inner.find(".pro_carousel_ul li a").length==_this.find(".pro_carousel_ul li").length)window.location.assign(inner.find(".pro_carousel_ul li a").eq(index).attr("url"));
					
					return false;
				}
		
			if(_this.DX-_this.MX>20){
				if(index<_this.num)
					btnFlag = true;
					pro_carousel();
			}
			if(_this.DX-_this.MX<-20){
				if(index>0)
					btnFlag = false;
					pro_carousel();
			}
			_this.mark = true;
			_this.slide();
			return false;
		});
		console.log(_this.DX,_this.MX)
		_this.slide=function()
		{
			btnFlag = true;
			cycle=setInterval(function(){
			pro_carousel();
			},3000)
		}
		function pro_carousel(){
			if(btnFlag){
				index = index++<(_this.num-1)?index:0;
				inner.animate({left:-width},"normal");
				inner.eq(index).stop(true,true).css("left",index*width);
			}else{
				index = index--<(_this.num-2)?_this.num-1:index;
				nner.animate({left:width},"normal");
				inner.eq(index).stop(true,true).css("left",-index*width);
			}
			console.log(index)
			inner.eq(index).animate({left:"0"},"normal");
			indicators.eq(index).addClass("active").siblings().removeClass("active");
		}
		_this.init();
	});
});