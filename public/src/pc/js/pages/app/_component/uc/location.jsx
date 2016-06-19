var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');
var api = require('libs/api');
var valide = libs.formValide;
var VTabs = require('modules/list/tabs_list');


//当前页公共变量
var _page = {}

var menus = [
    // {id: '111', key: "abc", title: "苹果", 'data-api': "/xxx?id=111"},
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
    {id: '114', key: "rrr", title: "小米的手机", url: "http://www.163.com"},
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
            alert(123)
        })
    }
}

var list_funs = {
    item: function(){
        $(this).click(function(){
            alert(456)
        })
    },
    scrollEnd: function(_name, _next){

    }
}

var Location = React.createClass({
    mixins: [ItemMixin],
    render: function(){
        return(
            <div id="location" className="location">
                <div className="defalut_search">
                    <input className="defalut_search_input box-shadow" type="text" placeholder="搜索关链字"/>
                    <div className="defalut_search_btn"></div>
                </div>
                <div id='location_tab' style={{height:"100%"}}></div>
            </div>
        )
    }
})
function bindEventLocation(){
    VTabs(menus, lists, {
        container: 'location_tab',
        itemMethod: {
            menu: menu_funs.item,
            list: list_funs.item
        },
        scrollEnd: {
            list: list_funs.scrollEnd
        }
    })
}

function start(name){
    return pages.new({
        boot:function(){},
        trigger:function(){
            this.libs.changeTitle('手动定位');    //更改当前页面标题
            this.main()
        },
        ready: function(){
        },
        main: function(){
            this.render(
                <Location itemMethod={bindEventLocation}/>,
                document.getElementById(name)
            )
            // VTabs(menus, lists, {
            //     container: name,
            //     itemMethod: {
            //         menu: menu_funs.item,
            //         list: list_funs.item
            //     },
            //     scrollEnd: {
            //         list: list_funs.scrollEnd
            //     }
            // })
        },
        end: function(){
        }
    })
}

module.exports = start;
