/*
* Auth: lgh
* 粗仿 京东/天猫 产品分类导航
*/

var Tabswitch = require('./_component/tabswitch')('Jd_tab');
var Uls = require('./_component/uls')('Jd_uls');
var render = React.render;


//react tabswitch
function tabswitch(tab_nav_data,tab_cnt_data,ele,opts){
    var tabItemMethod = function(){
        $(this).hover(function(e){
            $("#"+ele+" .tab-cnt").show();
            $(this).addClass('active').siblings().removeClass("active");
            var idf = $(this).attr('data-idf');
            SA.setter('Jd_uls', { data: [ tab_cnt_data[idf] ] })
        },function(){
            $("#"+ele+" .tab-cnt").hide();
        });
        $("#"+ele+" .tab-cnt").hover(function(){
            $(this).show();
        },function(){
            $(this).hide();
        });
        $(".tabswitch").hover(function(){
        },function(){
            $("#"+ele+" .tab-cnt").prev(".vlist").children("li").removeClass("active");
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
