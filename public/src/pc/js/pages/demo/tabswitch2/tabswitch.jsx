// require compoent
var Tabswitch = require('modules/tabs/tabswitch2');
// var data = require('../_json/mall_list.json')

//标签切换标题
var tab_nav_data = [
    '前端开发',
    '后端开发',
    '移动开发',
    '数据处理',
    '图像处理'
]



//标签切换内容
var tab_cnt_data = [
    //0
    [
        {attr: 'first', title: '前端开发'},
        'HTML/CSS' ,
        'JavaScript'  ,
        'CSS3'  ,
        'Html5'  ,
        'jQuery'  ,
        'AngularJS',
        'Node.js'  ,
        'Bootstrap' ,
        'WebApp',
        '前端工具'
    ],
    //1
    [
        {attr: 'first', title: '后端开发'},
        'PHP' ,
        'JAVA' ,
        'Linux' ,
        'Python' ,
        'C'       ,
        'C++'      ,
        'Go'
    ],
    //2
    [
        {attr: 'first', title: '移动端开发'},
        'Android',
        'iOS'     ,
        'Unity 3D' ,
        'Cocos2d-x'
    ],
    //3
    [
        {attr: 'first', title: '数据处理'},
        'MySQL'       ,
        'MongoDB'      ,
        '云计算'         ,
        'Oracle'       ,
        '大数据'         ,
        'SQL Server'
    ],
    //4
    [
        {attr: 'first', title: '图像处理'},
        'Photoshop' ,
        'Maya' ,
        'Premiere'
    ]
]

// Tabswitch
//      ->  List

// Uls
//      -> List

Tabswitch(tab_nav_data,tab_cnt_data,"tab-switch2")


/*var tabItemMethod = function(){
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
)*/

//react LoadList实例
// var
// ItemVIEW = require('widgets/itemView/itemView'),
// LoadList = require('modules/list/loadlist'),
// LazyList = require('modules/list/lazylist'),
// render = React.render;


/********
* 回调函数
**********/

//循环数据
// var loops = function(item){
//     return <ItemVIEW id={'test'+item.id} data-id={item.id} className="span6">
//               <div className="home-good__img __home-img-x2">
//                   <a href="#"><img src={item.src} alt=""/></a>
//               </div>
//               <div className="home-good__text">
//                   <h3 className="home-good__title"><a href="#">MANDA L曼德尔床架</a></h3>
//                   <div className="home-good__description">
//                       胡桃木饰面+茶镜 1200*500*1800
//                   </div>
//                   <div className="home-good__price">
//                       ¥ 3,999
//                   </div>
//                   <div className="home-good__action">
//                       <a href="#" className="btn btn-primary">查看详情</a>
//                   </div>
//               </div>
//           </ItemVIEW>
// };
//
//
// // scroll结束调用函数
// function gunOver(){
//     test_goods = test_goods.concat(second_goods);
//     this.setState({
//       datas:test_goods
//     })
// }
//
// render(
// 	<LoadList
// 		loop={loops}   //循环item
//     datas={test_goods}   //用于更新的数据
// 		span={6}
// 		onscrollend={gunOver}    //scroll over 方法
// 	> </LoadList>
// 	,document.getElementById('good')
// );
//
// module.exports = {};



//参考
// from http://jsfiddle.net/aabeL/1/
// https://github.com/jeroencoumans/react-scroll-components
// https://github.com/guillaumervls/react-infinite-scroll
// http://levi.cg.am/archives/3099   //getBoundingClientRect
//
// http://www.cnblogs.com/dingyingsi/archive/2013/09/24/3337813.html   scrollHeight
