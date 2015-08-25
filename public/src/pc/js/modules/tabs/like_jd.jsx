/*
* Auth: lgh
* 粗仿 京东/天猫 产品分类导航
*/

var Tabswitch = require('./_component/tabswitch')('Jd_tab');
var Uls = require('./_component/uls')('Jd_uls');
var render = React.render;


/*
* tab_nav_data {Array}   一维数组
* tab_cnt_data {Array}   二维数组
* ele     {String}  页面元素的ID
* {return}  渲染结构到指定ID
*/
function tabswitch(tab_nav_data,tab_cnt_data,ele,opts){
    var tabItemMethod = function(){
        $(this).hover(function(e){
            $("#"+ele+" .tab-uls").show();
            $(this).addClass('active').siblings().removeClass("active");
            var idf = $(this).attr('data-idf');
            SA.setter('Jd_uls', { data: tab_cnt_data[idf] })
        },function(){
            $("#"+ele+" .tab-uls").hide();
        });
        $("#"+ele+" .tab-uls").hover(function(){
            $(this).show();
        },function(){
            $(this).hide();
        });
        $(".tabswitch").hover(function(){
        },function(){
            $("#"+ele+" .tab-uls").prev(".vlist").children("li").removeClass("active");
        })
    }

    render(
        <Tabswitch data={tab_nav_data} listClass={'vlist tiger2'} itemDefaultMethod={tabItemMethod} itemClass={'xxx'} itemIcon={'true'}>
            <Uls data={tab_cnt_data} listClass={'vlist fox'} itemClass={'xxx'}/>
        </Tabswitch>
        ,document.getElementById(ele)
    )
}
module.exports = tabswitch;
