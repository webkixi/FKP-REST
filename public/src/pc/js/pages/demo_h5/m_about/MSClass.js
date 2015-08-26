(function($){
    $.fn.extend({
        "slideUp":function(value){
            
            var docthis = this;
            //默认参数
            value=$.extend({
                 "li_h":"36",
                 "time":2000,
                 "movetime":1000
            },value)
            
            //向上滑动动画
            function autoani(){
            	//$("#about_sul").width($("#about_sul li").length * $("#about_sul li").width());
                $("li:first",docthis).animate({"margin-top":-value.li_h},value.movetime,function(){
                    $(this).css("margin-top",0).appendTo("#about_sul");
                })
            }
            
            //自动间隔时间向上滑动
            var anifun = setInterval(autoani,value.time);
            
            //悬停时停止滑动，离开时继续执行
            $(docthis).hover(function(){
                clearInterval(anifun);            //清除自动滑动动画
            },function(){
                setInterval(autoani,value.time);    //继续执行动画
            })
        }    
    })
})(jQuery)