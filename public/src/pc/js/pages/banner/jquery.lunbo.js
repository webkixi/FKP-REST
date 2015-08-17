// JavaScript Document
(function($){
	$.fn.lunbo = function(options) {
	   var defaults={
		 swidth:0,
		 Swidth:998,
		 index:0, 
		 Size:3,
		 picTimer:0,
		 plIndex:0,
		 btn:'.nav-control a',
		 cont:'.lunbo ul',
		 btnL:'prev',
		 btnR:'next',
		 pagenationFlag:true,
		 pagenationControl:'.nav-control .pagenationPanel span',
		 autoControl:false,
		 panel:'.swiper-wrapper',
		 speed:5000
	  };
	  var opts = $.extend(defaults, options);
	  var picTimer;
	  var btnFlag=true;
	  var prev;
	  $(opts.pagenationControl).click(function(){
		prev=$(opts.pagenationControl+'.pagenationActive').index();
		if(prev<$(this).index()){
			btnFlag=true;
			swidth=-opts.Swidth;
			noleft=-swidth;
			opts.index=$(this).index()-1;
			banner(swidth,noleft);
		}else{
			btnFlag=false;
			swidth=opts.Swidth;
			noleft=-swidth;
			opts.index=$(this).index()+1;
			banner(swidth,noleft);
		}
      });
	  $(opts.btn).click(function(){
		 if($(this).hasClass(opts.btnR)){
			swidth=-opts.Swidth;
			noleft=-swidth;
			btnFlag=true;
			banner(swidth,noleft);
			
		}
		else{
			swidth=opts.Swidth;
			noleft=-swidth;
			btnFlag=false;
			banner(swidth,noleft);
		}
	  });
	  if(opts.autoControl){
	  $(opts.panel).hover(function() {
		clearInterval(picTimer);
		},function() {
			btnFlag=true;
			picTimer = setInterval(function() {
				swidth=-opts.Swidth;
				noleft=-swidth;
				banner(swidth,noleft);
				console.log(swidth,noleft);
			},opts.speed); 
		}).trigger("mouseleave");
	  }
	  function banner(swidth,noleft){	
		if(btnFlag)
		opts.index=opts.index++<opts.Size-1?opts.index:0;
		else
		opts.index=opts.index--<0?opts.Size-2:opts.index;		
		$(opts.cont).animate({left:swidth},"normal");
		$(opts.cont).eq(opts.index).stop(true,false).css("left",noleft);
		$(opts.cont).eq(opts.index).animate({left:"0"},"normal");
		$(opts.pagenationControl).eq(opts.index).addClass('pagenationActive').siblings().removeClass('pagenationActive');
      }
	  return this;
	};
})(jQuery);