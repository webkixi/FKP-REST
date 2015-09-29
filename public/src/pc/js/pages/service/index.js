var libs = require('libs/libs')
var router = require('libs/router').router
var route = require('libs/router').route

// route({
//     'bcd': bcd
// });



require.ensure([], function() {
    var url = libs.urlparse(location.href)
    if(!url.hash){
        index()
    }else{
        var hash = url.hash
        router(hash)
    }
})

function index(){
    require('./_component/_index')('container-box',function(){
        bindIndex();
    });
}

function bindIndex(){


    //展开服务项目
    $(".s_m_list_1>.item>li").click(function(){
      $(this).toggleClass("active");
      $(this).children(".hbody").find(".dot i").toggleClass("icon-xla");
    })

}

/*展开服务项目*/
// $(".s_m_list_1>.item>li").click(function(){
//   $(this).toggleClass("active");
//   $(this).children(".hbody").find(".dot i").toggleClass("icon-xla");
// })
/*展开服务项目中的配件*/
// $(".s_m_u_l_u>li").click(function(e){
//   e.stopPropagation();
//   if($(this).hasClass("s_m_l_s_B")){
//     $(".pop").addClass("active");
//   }
//   if($(".pop").hasClass("active")){
//     $(this).parents(".item>li").addClass("active");
//   }
// })
/*选择哪种配件*/
// $(".pop .item>li").click(function(){
//   $(this).addClass("active");
//   $(this).parents(".pop").removeClass("active");
// });
/*是否已有配件*/
// $(".s_m_lc_input input[type='checkbox']").click(function(){
//   if($(this).attr("checked")=="checked"){
//       $(this).parents(".s_m_u_l_u").find(".s_m_l_s").removeClass("disable_li").addClass("s_m_l_s_B");
// 			$(this).attr("checked","");
// 	}else{
//     $(this).parents(".s_m_u_l_u").find(".s_m_l_s").addClass("disable_li").removeClass("s_m_l_s_B");
//     $(this).attr("checked","checked");
//   }
// })
