/*
* Auth: lgh
* 粗仿 幕课网分类导航
* http://www.imooc.com/course/list
*/

// require compoent
var Tabswitch = require('./_component/tabswitch')('mc_tab');
var List = require('widgets/listView/list');
var Pt = require('widgets/itemView/pic_title');
var render = React.render;


/*
* cntData {Array}   二维数组
* ele     {String}  页面元素的ID
* {return}  渲染结构到指定ID
*/
function likeImooc( navData, ele, opts ){
    // 绑定tab的item元素的方法
    var tabItemDefaultMethod = function(){
        $(this).click(function(e){
            if($(this).attr('data-cls')=="first") return false;
            // if($(this).attr('data-cls')=="second") return false;
            if($(this).hasClass('active')){
                $(this).parent().find('li[data-cls="second"]').addClass('active')
            }else{
                $(this).siblings().removeClass('active')
            }
            $(this).toggleClass('active')

            // var idf = $(this).attr('data-idf');
            // SA.setter('mc_uls', { data: cntData[idf-1] })
        })
    }
    // 渲染结构到页面
    render(
        <div>
            <Tabswitch data={navData} listClass={'fox'} itemDefaultMethod={tabItemDefaultMethod}/>
            <List data={listData} listClass={'like_xg_list'} itemClass={'span12'} itemView={Pt}/>
        </div>
        ,document.getElementById(ele)
    )
}

module.exports = likeImooc
