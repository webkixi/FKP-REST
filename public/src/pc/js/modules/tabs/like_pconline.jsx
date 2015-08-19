
// require compoent
var Tabswitch = require('./_component/tabswitch');
var Uls = require('./_component/uls');
var SelectBar = require('./_component/select_bar');
var render = React.render;


/*
* navData {Array}   一维数组
* cntData {Array}   二维数组
* ele     {String}  页面元素的ID
* {return}  渲染结构到指定ID
*/
function likePConline( navData, cntData, ele, opts ){

    // 绑定tab的item元素的方法
    var tabItemDefaultMethod = function(){
        $(this).click(function(e){
            $(this).addClass('active')
            $(this).siblings().removeClass('active')
            $('.tab-cnt li').removeClass('active')
            $('.tabswitch li[data-cls="second"]').addClass('active');

            var idf = $(this).attr('data-idf');
            SA.setter('Uls', { data: cntData[idf] })
        })
    }

    // 绑定所有的attr的item元素的方法
    var ulItemDefaultMethod = function(){
        $(this).click(function(e){
            if($(this).attr('data-cls')=="first") return false;
            if($(this).hasClass('active')){
                $(this).parent().find('li[data-cls="second"]').addClass('active')
            }else{
                $(this).siblings().removeClass('active')
            }
            $(this).toggleClass('active')
        })
    }

    var options = {

    }


    // 渲染结构到页面
    render(
        <Tabswitch data={navData} listClass={'tab-nav'} itemStyle={{width:'150px'}} itemDefaultMethod={tabItemDefaultMethod}>
            <Uls data={cntData} listClass={'fox'} itemDefaultMethod={ulItemDefaultMethod}/>
        </Tabswitch>
        ,document.getElementById(ele)
    )
}

module.exports = likePConline





//参考
// from http://jsfiddle.net/aabeL/1/
// https://github.com/jeroencoumans/react-scroll-components
// https://github.com/guillaumervls/react-infinite-scroll
// http://levi.cg.am/archives/3099   //getBoundingClientRect
//
// http://www.cnblogs.com/dingyingsi/archive/2013/09/24/3337813.html   scrollHeight
