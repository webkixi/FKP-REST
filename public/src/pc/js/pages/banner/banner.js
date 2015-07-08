require('./jquery.lunbo')
$(function(){
  banner_bg('.banner .ban_ul li');
  function banner_bg(a){
	  $(a).each(function(index, element) {
		  $(this).css({'background-image':$(this).data('image'),'background-position':'center top'});
	  });
  }
});

$(window).load(function (){
numli();
function numli(){
  var str;
  var numli=$('.ban_ul li').length-1;
  for(i=0;i<numli;i++){
    str=$("<a class='pagenation'><i></i></a>");
    $(".pagenationPanel").append(str);
  }
}
var LunboOptions={btn:'.layer-control a.btn',Swidth:$('.banner').width(),cont:'.ban_ul li',Size:4,btnR:'.layer-control .btn_next',pagenationControl:'.layer-control .pagenationPanel a',autoControl:true,panel:'.banner',speed:5000};
ynauto();
function ynauto(){
  var lencont=$('.ban_ul li').length;
  LunboOptions['Size']=lencont;
  if(lencont<2){
    LunboOptions['autoControl']=false;
  }
  else{
    LunboOptions['autoControl']=true;
  }
}
jQuery.fn.lunbo(LunboOptions);
})