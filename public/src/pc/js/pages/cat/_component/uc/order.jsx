var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');
var api = require('libs/api');
var valide = libs.formValide;
var VTabs = require('modules/list/tabs_list');
var _page = {}


//当前页公共变量
var _page = {}

//菜单列表数据
var menus = [
    // {id: '111', title: "苹果", 'data-api': "/xxx?id=111"},
    {id: '111', title: "苹果"},
    {id: '112', title: "三星"},
    {id: '113', title: "华为"},
    {id: '111', title: "苹果"},
    {id: '112', title: "三星"},
    {id: '113', title: "华为"},
    {id: '111', title: "苹果"},
    {id: '112', title: "三星"},
    {id: '113', title: "华为"},
    {id: '111', title: "苹果"},
    {id: '112', title: "三星"},
    {id: '113', title: "华为"},
    {id: '111', title: "苹果"},
    {id: '112', title: "三星"},
    {id: '113', title: "华为"},
    {id: '111', title: "苹果"},
    {id: '112', title: "三星"},
    {id: '113', title: "华为"},
    {id: '111', title: "苹果"},
    {id: '112', title: "三星"},
    {id: '113', title: "华为"},
    {id: '111', title: "苹果"},
    {id: '112', title: "三星"},
    {id: '113', title: "华为"},
    {id: '114', title: "小米"}
]

var list_pagenum = 1;
//第一页数据
var lists = [
    {id: '111', title: "苹果的手机11111"},
    {id: '112', title: "三星的手机"},
    {id: '113', title: "华为的手机"},
    {id: '114', title: "小米的手机"},
    {id: '114', title: "小米的手机"},
    {id: '114', title: "小米的手机"},
    {id: '114', title: "小米的手机"},
    {id: '111', title: "苹果的手机"}
]

//第二页数据
var lists2 = [
    {id: '114', title: "小米的手机", img: "/images/demo/cat/h5_full_1.jpg"},
    {id: '114', title: "小米的手机", img: "/images/demo/cat/h5_full_2.jpg"},
    {id: '111', title: "苹果的手机", img: "/images/demo/cat/h5_full_3.jpg"},
    {id: '112', title: "三星的手机", img: "/images/demo/cat/h5_full_4.jpg"},
    {id: '113', title: "华为的手机", img: "/images/demo/cat/h5_full_5.jpg"},
    {id: '114', title: "小米的手机", img: "/images/demo/cat/h5_full_6.jpg"},
    {id: '113', title: "华为的手机"},
    {id: '114', title: "小米的手机"}
]


//定义菜单事件
var menu_funs = {
    // 菜单项点击事件
    item: function(){
        $(this).click(function(){
            $(this).addClass('active').siblings().removeClass('active')
        })
    },
    // 菜单项滚动到底促发事件
    scrollEnd: function(_name, _next){
        alert('333')
    }
}

// 定义列表页事件
var list_funs = {
    // 列表项点击事件
    item: function(){
        $(this).click(function(){
            // alert(456)
        })
    },
    // 列表滚动到最低促发事件
    // 加载下一页数据
    // @_name {String} 列表页redux的名称
    // @_next {Function} 加载页方法
    scrollEnd: function(_name, _next){
        list_pagenum++
        console.log('============== next');
        //加载分页数据
        setTimeout(function(){
            // _next为加载下一页数据方法
            // @_name {String} 触发某一项redux的名称，默认为list自身
            // @_data [Array] 下一页数据
            _next(_name, lists2)
            if (list_pagenum>3)  //只加载3页
                lists2=[]
        }, 500)
    }
}


// 页面加载初始化
function start(name){
    return pages.new({
        boot: function(self){

        },
        trigger:function(){
            libs.changeTitle('我的订单');    //更改当前页面标题
            this.main()
        },
        ready: function(){
        },
        main: function(self, data){
            VTabs(menus, lists, {
                container: name,
                globalName: {
                    menu: 'catMenus',
                    list: 'catLists'
                },
                itemMethod: {
                    menu: menu_funs.item,
                    list: list_funs.item
                },
                scrollEnd: {
                    menu: menu_funs.scrollEnd,
                    list: list_funs.scrollEnd
                }
            })
        },
        end: function(){
            React.unmountComponentAtNode(document.getElementById(name))
        }
    })
}

module.exports = start;
