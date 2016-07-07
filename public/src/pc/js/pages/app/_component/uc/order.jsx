var router = require('libs/router').router;
var pages = require('libs/pages');
var libs = require('libs/libs');
var _user = SA.get('USER')
var VTabs = require('modules/list/tabs_list');

//当前页公共变量
var _page = {}

var menus = [
    // {id: '111', key: "abc", title: "苹果", 'data-api': "/xxx?id=111"},
    {id: '111', key: "abc", title: "苹果"},
    {id: '112', key: "bcd", title: "三星"},
    {id: '113', key: "cde", title: "华为"},
    {id: '111', key: "abc", title: "苹果"},
    {id: '112', key: "bcd", title: "三星"},
    {id: '113', key: "cde", title: "华为"},
    {id: '111', key: "abc", title: "苹果"},
    {id: '112', key: "bcd", title: "三星"},
    {id: '113', key: "cde", title: "华为"},
    {id: '111', key: "abc", title: "苹果"},
    {id: '112', key: "bcd", title: "三星"},
    {id: '113', key: "cde", title: "华为"},
    {id: '111', key: "abc", title: "苹果"},
    {id: '112', key: "bcd", title: "三星"},
    {id: '113', key: "cde", title: "华为"},
    {id: '111', key: "abc", title: "苹果"},
    {id: '112', key: "bcd", title: "三星"},
    {id: '113', key: "cde", title: "华为"},
    {id: '111', key: "abc", title: "苹果"},
    {id: '112', key: "bcd", title: "三星"},
    {id: '113', key: "cde", title: "华为"},
    {id: '111', key: "abc", title: "苹果"},
    {id: '112', key: "bcd", title: "三星"},
    {id: '113', key: "cde", title: "华为"},
    {id: '114', key: "rrr", title: "小米"}
]

var lists = [
    {id: '111', key: "abc", title: "苹果的手机", url: "http://www.163.com"},
    {id: '112', key: "bcd", title: "三星的手机", url: "http://www.163.com"},
    {id: '113', key: "cde", title: "华为的手机", url: "http://www.163.com"},
    {id: '114', key: "rrr", title: "小米的手机", url: "http://www.163.com"},
    {id: '111', key: "abc", title: "苹果的手机", url: "http://www.163.com"},
    {id: '112', key: "bcd", title: "三星的手机", url: "http://www.163.com"},
    {id: '113', key: "cde", title: "华为的手机", url: "http://www.163.com"},
    {id: '114', key: "rrr", title: "小米的手机", url: "http://www.163.com"}
]

var lists2 = [
    {id: '111', key: "abc", title: "苹果的手机", url: "http://www.163.com"},
    {id: '112', key: "bcd", title: "三星的手机", url: "http://www.163.com"},
    {id: '113', key: "cde", title: "华为的手机", url: "http://www.163.com"},
    {id: '114', key: "rrr", title: "小米的手机", url: "http://www.163.com"},
    {id: '111', key: "abc", title: "苹果的手机", url: "http://www.163.com"},
    {id: '112', key: "bcd", title: "三星的手机", url: "http://www.163.com"},
    {id: '113', key: "cde", title: "华为的手机", url: "http://www.163.com"},
    {id: '114', key: "rrr", title: "小米的手机", url: "http://www.163.com"},
    {id: '111', key: "abc", title: "苹果的手机", url: "http://www.163.com"},
    {id: '112', key: "bcd", title: "三星的手机", url: "http://www.163.com"},
    {id: '113', key: "cde", title: "华为的手机", url: "http://www.163.com"},
    {id: '114', key: "rrr", title: "小米的手机", url: "http://www.163.com"}
]

var menu_funs = {
    item: function(){
        $(this).click(function(){
            $(this).addClass('active').siblings().removeClass('active')
        })
    },
    scrollEnd: function(_name, _next){
        alert('333')
    }
}

var list_funs = {
    item: function(){
        $(this).click(function(){
            alert(456)
        })
    },
    scrollEnd: function(_name, _next){
        setTimeout(function(){
            _next(_name, lists2)
            lists2=[]
        }, 1000)
    }
}



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
                    menu: 'ordersMenus',
                    list: 'ordersLists'
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
            // React.unmountComponentAtNode(document.getElementById(name))
        }
    })
}

module.exports = start;
