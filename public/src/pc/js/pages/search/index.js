
var laypage = require('../_common/laypage.dev');

   laypage({
        cont: $("#page"), //容器。值支持id名、原生dom对象，jquery对象,
        pages: page.pageCount, //总页数
        curr: page.currentPage,
        skip: true, //是否开启跳页
        skin: '#ff6600',
        groups: 5, //连续显示分页数
        jump: function(obj, first){ //触发分页后的回调
            if(!first){ //一定要加此判断，否则初始时会无限刷新
                $('#pageCurrent').val(obj.curr);
                $("#searchForm").submit();
            }
        }
    });

module.exports = {};


//参考
// from http://jsfiddle.net/aabeL/1/
// https://github.com/jeroencoumans/react-scroll-components
// https://github.com/guillaumervls/react-infinite-scroll
// http://levi.cg.am/archives/3099   //getBoundingClientRect
//
// http://www.cnblogs.com/dingyingsi/archive/2013/09/24/3337813.html   scrollHeight
