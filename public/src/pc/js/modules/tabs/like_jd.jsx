/*
* Auth: lgh
* 粗仿 京东/天猫 产品分类导航
*/

var libs = require('libs/libs');
var TabNav = require('./_component/tabswitch')('Jd_tab');
// var TabNav = require('./_component/uls')('Jd_tab');
var TabList = require('./_component/uls')('Jd_uls');
var Ant2 = require('widgets/itemView/ant2');
var PopCat = require('./_component/tabswitch')('Jd_pop_cat');
var PopImage = require('./_component/tabswitch')('Jd_pop_image');
var render = React.render;

// libs.addSheet(['\
// .catFilter .popBox{margin-left:210px;background-color: #f7f7f7;}\
// .catFilter .pobLeft{float: left; width:80%}\
// .catFilter .pobLeft .leftTop{ background-color:#efefef;height:60px; padding:15px 27px 0}\
// .catFilter .pobLeft .leftTop .tabswitch{}\
// .catFilter .popRight{float: left; width:20%;padding-left:5px;}\
// .ul-fox{padding-left: 100px}\
// .catFilter .tab-uls{ height: auto;}\
// .catFilter .tab-uls li[data-cls="first"]{font-weight:bold;padding: 5px 0 5px 20px;}\
// .catFilter .tab-uls li[data-cls="second"]{display: none;}\
// ', 'catfilter']);

libs.addSheet(['/css/t/tabs/like_jd.css','catfilter'])

/*
* nav_data {Array}   一维数组
* cnt_data {Array}   二维数组
* cnt_top_data {Array}   一维数组
* ele     {String}  页面元素的ID
* {return}  渲染结构到指定ID
*/
function tabswitch(nav_data, cnt_data, cnt_top_data, img_data, ele, opts){
    var tabItemMethod = function(){
        $(this).hover(function(e){
            $("#"+ele+" .popBox").show();
            $(this).addClass('active').siblings().removeClass("active");
            var idf = $(this).attr('data-idf');
            SA.setter('Jd_uls', { data: cnt_data[idf] })
        },function(){
            $("#"+ele+" .popBox").hide();
        });
        $("#"+ele+" .popBox").hover(function(){
            $(this).show();
        },function(){
            $(this).hide();
        });
        $(".tabswitch").hover(function(){
        },function(){
            $("#"+ele+" .popBox").prev(".vlist").children("li").removeClass("active");
        })
    }

    /* TabNav
    * data  {Array} 一维数组/二维数组
    * itemView  {view}  自定义itemView，默认会使用ant
    * listClass {String} <ul>的样式
    * itemClass {String} <li>的样式
    * style {Object}  json对象，TabNav会返回一个DIV的结构，style会自动应用到此div上
    * itemIcon {Boolean}  itemView会返回一个li，在此结构中的后面插入一个<i>用于显示小图标
    * inline {String/Boolean}  原则上每个ITEM返回都为(li>a)结构，inline返回的为(li>a*n)结构，
      分隔符为inline的值(String)，一个li中存在多个a,因此传入的数据应为二维数组
    */
    render(
        <div className={'catFilter'}>
            <TabNav data={nav_data}
                    itemView={Ant2}
                    inline={true}
                    listClass={'vlist tiger2'}
                    itemDefaultMethod={tabItemMethod}
                    itemClass={'xxx'}
                    style={{position:'absolute'}}
                    itemIcon={'true'}
            />
            <div style={{display:'none'}} className={'popBox u-clearfix'}>
                <div className={'pobLeft'}>
                    <div className={'leftTop'}>
                        <PopCat data={cnt_top_data} listClass={'fox2'} itemView={Ant2}/>
                    </div>
                    <TabList data={cnt_data} listClass={'fox ul-fox'} itemView={Ant2}  itemClass={'xxx'}/>
                </div>
                <div className={'popRight'}>
                    <PopImage data={jd_images_data} listClass={'fox2'} itemStyle={{padding:'1px'}} itemView={Ant2}/>
                </div>
            </div>
        </div>
        ,document.getElementById(ele)
    )
}
module.exports = tabswitch;
