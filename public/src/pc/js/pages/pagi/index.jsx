// 分页演示demo
// 该demo为同构分页效果
// node端代码，请查看 root/pages/pagi.js

var Pagi = require('modules/pagination/pagi'),
    // 初始化分页数据
    pageData = {
    	total: 60,
     	per:   20,
    	url:   '/',
     	query: 'page='
    }

Pagi(pageData, {
    container: 'pagi',
    begin: { start: 0, off: 5 },
    itemMethod: bindItem
})


// 每一个按钮绑定的事件
// @this 为按钮的dom结构
// @_name {String}
function bindItem(_name){
    $(this).click(function(e){
        e.preventDefault();
        // alert(_name)

        // 正常的效果
        var page = $(this).attr("data-page"),
            jump = $(this).attr("data-jump"),   // 这个不能少，否则效果不正常
            tmp = SA.get(_name);

        tmp.begin.start = page-1;
        tmp.begin.jump = jump; //
        SA.setter( _name, tmp );
    })
}
