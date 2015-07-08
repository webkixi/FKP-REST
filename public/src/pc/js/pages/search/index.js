 require('../_common/header');
$(function() {
  $(".search_buttom").click(function(){
    var text = $(".search_text").val();
    var type = 0;
    var data = {
      'st': type,
      'sc':text
    }
    $.post("/search",data,function(result){
        console.log(result)
    })
  })
})

module.exports = {};


//参考
// from http://jsfiddle.net/aabeL/1/
// https://github.com/jeroencoumans/react-scroll-components
// https://github.com/guillaumervls/react-infinite-scroll
// http://levi.cg.am/archives/3099   //getBoundingClientRect
//
// http://www.cnblogs.com/dingyingsi/archive/2013/09/24/3337813.html   scrollHeight
