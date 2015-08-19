var Tabswitch = require('./_component/tabswitch2');
var Uls = require('./_component/uls');
var SelectBar = require('./_component/select_bar');
var render = React.render;


//react tabswitch
function tabswitch(tab_nav_data,tab_cnt_data,ele,opts){
    var tabItemMethod = function(){
        $(this).hover(function(e){
            $(".tab-cnt2").show();
            $(this).addClass('active').siblings().removeClass("active");     
            var idf = $(this).attr('data-idf');
            SA.setter('Uls', { data: [ tab_cnt_data[idf] ] })
        },function(){
            $(".tab-cnt2").hide();
        });
        $(".tab-cnt2").hover(function(){
            $(this).show();
        },function(){
            $(this).hide();
        });
        $(".tabswitch").hover(function(){
            console.log("dd")
        },function(){
            $(".tab-cnt2").prev(".vlist").children("li").removeClass("active"); 
        })
    }

    render(
        <Tabswitch data={tab_nav_data} listClass={'tiger2'} itemMethod={tabItemMethod}>
            <Uls data={tab_cnt_data} listClass={'fox'}/>
        </Tabswitch>
        ,document.getElementById('tab-switch2')
    )
    
}

console.log(tabswitch)
module.exports = tabswitch;
