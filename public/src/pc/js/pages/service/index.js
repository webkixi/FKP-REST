$(".s_m_list_1>.item>li").click(function(){
  $(this).toggleClass("active");
  $(this).children(".hbody").find(".dot i").toggleClass("icon-xla");
})
$(".s_m_list_1 .item>li>ul>li").click(function(e){
  e.stopPropagation();
  if($(this).hasClass("s_m_l_s")){
    $(".pop").addClass("active");
  }
  if($(".pop").hasClass("active")){
    $(this).parents(".item>li").addClass("active");
  }
})
$(".pop .item>li").click(function(){
  $(this).addClass("active");
  $(this).parents(".pop").removeClass("active");
})
$(".s_m_lc_input input[type='checkbox']").click(function(){
  $(this).toggleClass("active");
})
