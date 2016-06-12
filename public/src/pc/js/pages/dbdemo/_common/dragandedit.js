var libs = require('libs/libs')
var req = libs.api.req

//是否登陆
var _user = SA.get('USER')
var _is_login = _user.error ? false : _user
var is_touch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch

function startDrag(){
    libs.inject()
    .js(['/js/t/jq/draggabilly.pkgd.min.js', '_Draggabilly'], lm)
}

function lm(){
    if (_is_login){
        _lm()
    }

    //拖动事件检测，拖动事件
    function _lm(){
        var pointerdown = false;
        if(is_touch) {
            var startX,
                startY,
                endTx,
                endTy;
            
            $(document).bind('touchstart', function(e){
                if ($(e.target).hasClass('lg_item')){
                    $(pointerdown).css({'background-color': '#f5faf4'})
                    if (pointerdown !== e.target){
                        pointerdown = e.target
                        $('.lg_item').css({'background-color': '#fff'})
                        $(pointerdown).css({'background-color': '#f5faf4'})
                        start(pointerdown, 'touch')
                    }
                }
            })
        }
        else {
            pointerdown = true
            start('.lg_item')
        }

        var has_draggabilly,
            $draggabilly

        //开始绑定拖动事件
        function start(ele, stat){
            if (pointerdown){
                var wait = 17;
                if (stat === 'touch')
                    wait = 50;

                setTimeout(function(){
                    if (has_draggabilly && $draggabilly){
                        $draggabilly.draggabilly('destroy')
                        has_draggabilly = false;
                    }
                    $draggabilly = _lmm(ele)
                    has_draggabilly = true;
                }, wait)
            }
        }
    }

    function _lmm(ele){

        //添加一个动画提示效果
        $('.lg_item')
        .append('<div class="dragstat del">删除</div>')
        .prepend('<div class="dragstat edit">修改</div>')

        var $draggable = $(ele).draggabilly({
            axis: 'x'
        })

        var startX,
            startY,
            endX,
            endY,
            item_width,
            item_height,
            threshold,          //临界点
            topic_id;

        $draggable.on( 'dragStart', function( event, pointer ) {
            startX = $(this).offset().left;
            item_width = $(this).width();
            threshold = item_width/3+50;
            topic_id = $(this).find('a').attr('href').replace('?topic=', '')
        })

        $draggable.on( 'dragMove', function( event, pointer, moveVector ) {
            if (moveVector.x<0){
                $(this).css({'background-color': '#F2DEDE'})
                $(this).find('.del').css({right: '-4.04em'})
            }
            else {
                $(this).css({'background-color': '#FCF8E3'})
                $(this).find('.edit').css({left: '-4.04em'})
            }
        })

        $draggable.on( 'dragEnd', function( event, pointer ) {
            var _item = this;
            endX = $(this).offset().left;
            var diff = endX - startX
            //向左滑
            if (diff < 0){
                var _diff = -diff;
                if (_diff<threshold){
                    $(_item).css({left: 0})
                    $(_item).find('.del').css({right: '-5.5em', left: 'auto'})
                    $(_item).css({'background-color': '#f5faf4'})
                }
                else {
                    req('/$deletetopic', {topic: topic_id}, function(data){
                        if (data.error){
                            $(_item).css({left: 0})
                            $(_item).css({'background-color': '#f5faf4'})
                            $(_item).find('.del').css({right: '-5.5em', left: 'auto'})
                            libs.msgtips(data.message)
                        }
                        else {
                            libs.msgtips('删除完成')
                            $(_item).remove()
                        }
                    })
                }
            }
            //向右滑
            else{
                var _diff = diff;
                if (_diff<threshold){
                    $(this).css({left: 0})
                    $(this).find('.edit').css({left: '-5.5em'})
                    $(this).css({'background-color': '#f5faf4'})
                }
                else {
                    $(this).css({left: 0})
                    $(this).find('.edit').css({left: '-5.5em'})
                    $(this).css({'background-color': '#f5faf4'})
                    req('/$detailtopic', {topic: topic_id, auth: true}, function(data){
                        if (data.error){
                            libs.msgtips(data.message)
                        }
                        else{
                            //在index.js中定义
                            // console.log(data);
                            $('body').trigger('openEditor', data[0])
                        }
                    })
                }
            }
        })

        return $draggable;
    }
}


module.exports = startDrag //listmethod
