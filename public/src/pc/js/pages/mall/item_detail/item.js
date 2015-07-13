$(function(){

    /*数量的增减*/
    $(".amount-btn").click(function(){
        var dj=$(this).parents(".ty-p-content dl").siblings(".scj").find(".n_price i").html();
        var i=$(this).attr("class").split(" ");
        var t=$(this).siblings("input");
        var minval = $(this).attr("data-minval");
        var increase = $(this).attr("data-increase");
        if(minval) {
            minval = Math.round(parseFloat(minval) * 10000) / 10000;
        } else {
            minval = 1;
        }
        if(increase) {
            increase = Math.round(parseFloat(increase) * 10000) / 10000;
        } else {
            increase = 1;
        }
        if(i[0]=="minus"&&parseFloat(t.val())>minval){
        	if(parseFloat(t.val())-increase < minval) {
                t.val(minval);
        	} else {
                t.val(Math.round((parseFloat(t.val())-increase) * 10000) / 10000 );
        	}
        }
        else if(i[0]=="plus"){
            t.val(Math.round((parseFloat(t.val())+increase) * 10000) / 10000);
        }
        // t.parents(".ty-p-content dl").siblings(".scj").find(".n_price i").html(t.val()*dj);
    });
    $(".o-amount input").keyup(function(){
        var dj=$(this).parents(".ty-p-content dl").siblings(".scj").find(".n_price i").html();
        //var reg=/^(-|\+)?\d+$/;
        var reg=/^-?\d+(\.\d*)?$/;
        if(reg.test($(this).val())==false) {
        	var minval = $(this).attr("data-minval");
        	$(this).val(minval);
        }
        $(this).parents(".ty-p-content dl").siblings(".scj").find(".n_price i").html($(this).val()*dj);
    }); 
    $('.sort .col li.select').click(function(){
        $(this).toggleClass("dropUp").siblings().removeClass("dropUp");
        
        if(setOrder) {
            orderField = $(this).attr("data-param");
            orderDirection = "";
            if($(this).hasClass("dropUp")) {
                orderDirection = "desc";
            }
            setOrder(orderField, orderDirection);
        }
        if(doQuery) {
            doQuery();
        }
    });
    $('.sort .col li.select').hover(function(){$(this).addClass("active").siblings().removeClass("active")});
    
    //为每个筛选条件添加属性
    $(".tab-pane").each(function(i,item){
        var items =  $(".tab-pane").eq(i).find(".filter-items")
           items.each(function(index,element){
                items.eq(index).find(".filter-name").attr("filter","filter"+index);
            })
    });


/*产品筛选 end*/

    //     $("#thumblist li a").click(function(){
    //     $(".ty-grid-galleryShow img").attr({"src":$(this).data('src'),"jqimg":$(this).data('src'));
    //     属性名一: “属性值一” , 属性名二: “属性值二”
    // });
})
function pos_top(a,pos){
    if($(window).scrollTop()>pos){
        $(a).css({position:"fixed",top:"0",zindex:"99999"})
    }
    else{
        $(a).css({position:"relative"})
    }
}