// 分页演示demo
// 该demo为同构分页效果
// node端代码，请查看 root/pages/pagi.js

var Pagi = require('modules/pagination/pagi'),
    // 初始化分页数据
    // 这个要与服务端数据一致，不然react会出警告
    pageData = {
    	total: 200,
     	per:   20,
    	url:   '/',
     	query: 'page='
    }

Pagi(pageData, {
    container: 'pagi',
    begin: { start: 0, off: 5 },
    listMethod: bindList
})

function bindList(){
    // list的结构 this
    console.log(this);
    $('.item').click(function(){
        alert(2)
    })
}
