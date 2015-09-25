/*
* Auth: lgh
* 粗仿 幕课网分类导航
* http://www.imooc.com/course/list
*/

// require compoent
var Tabswitch = require('./_component/tabswitch')('mc_tab');
var Uls = require('./_component/uls')('pc_uls');
var List = require('widgets/listView/list');
var Pt = require('widgets/itemView/pic_title');
var render = React.render;

/*
* cntData {Array}   二维数组
* ele     {String}  页面元素的ID
* {return}  渲染结构到指定ID
*/

function likeImooc( navData,listData, ele, opts ){
    // 绑定tab的item元素的方法
    var tabItemDefaultMethod = function(){
        $('.tabswitch li[data-cls="first"]').addClass('active');
        $(this).click(function(e){
            $(this).addClass('active')
            $(this).siblings().removeClass('active')
            var idf = $(this).attr('data-idf');
            if($(this).attr('data-cls')=="first") {
                SA.setter('pc_uls', { data: listData })
            }
            else
                SA.setter('pc_uls', { data: listData[idf-1] })
        })
    }
    // 渲染结构到页面
    render(
        <div>
            <Tabswitch data={navData} listClass={'coupons-nav'} itemDefaultMethod={tabItemDefaultMethod}>
                <Uls data={listData} listClass={'coupons_list like_app_list'} itemView={Pt}/>
            </Tabswitch>
        </div>
        ,document.getElementById(ele)
    )
}

module.exports = likeImooc
