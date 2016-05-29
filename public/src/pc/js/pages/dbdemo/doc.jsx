// doc.jsx
// 处理dom的交互部分


// responsive
//自适应页面
$(window).scroll(function(){
    var _top = $(window).scrollTop()
    var _width = $(window).width()
    if (_top>140){
        $('.topper').addClass('fixed_top')
        if (_width>1023){
            $('.topper').css({'width': '68%'})
        }
        else {
            $('.topper').css({'width': '98%'})
        }
        $('.side-menu').css({top: '3.5em'})
    }
    else {
        $('.side-menu').css({top: '10.5em'})
        $('.topper').removeClass('fixed_top')
        $('.topper').css({'width': '100%'})
        // if (_width>1023){
        //     $('.topper').css({'width': '100%'})
        // }
        // else {
        //     $('.topper').css({'width': '100%'})
        // }
    }
})

//打开/关闭编辑框
$('.box_close').click(function(){
    $('body').trigger('openEditor')
})

//弹出编辑框
$('body').on('openEditor', function(jqevent, opts){
    //打开输入框
    $('.box').toggle()

    if (opts && opts.content){
      require('./_common/epic')(opts)   //类似seajs，按需异步请求
    }
    else{
      //插入编辑器
      //必须后置打开，不然编辑器的宽高不对
      require('./_common/epic')()       //类似seajs，按需异步请求
    }
})
