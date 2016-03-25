/**
 * 仿拉钩列表
 */
var libs = require('libs/libs')
var List = require('./_component/_loadlist')()
var ITEM = require('widgets/itemView/f_li');
var render = React.render;
var inject = libs.inject()
var req = libs.api.req


//注入like_lagou的样式
inject.css(['/css/t/list/lagou.css', 'like_lagou']);
inject.js(['/js/t/jq/draggabilly.pkgd.min.js', 'draggabilly']);


function applist(data, ele, opts){

    var evt;
    if( opts && opts.evt){
        evt = opts.evt;
    }

    var lm = function(){};
    if (opts.callback && typeof opts.callback === 'function'){
        lm = opts.callback
    }

    var scrollEndMethod = function(){
        var td;
        var tmpData = SA.getter('LDL')
        if(!tmpData.data){
            td = data;
            SA.setter('LDL', {data:data})
        }else{
            td = tmpData.data.data;
            if (opts && opts.sem && typeof opts.sem === 'function') {
                var _fun = opts.sem;
                _fun.call(null, td, doneNext)
                // td = tmpData.data.data;
                // td = td.concat(data);
            }
            else {
                doneNext(td)
            }

            // if (!is_touch){
            //     setTimeout(lm, 200)
            // }
            setTimeout(lm, 200)
        }

        function doneNext(ddd){
            if(!evt){
                $(this).find('li[data-cls="loadbar"]').click(function(){
                    SA.setter('LDL', {data:ddd});
                })
            }
            else
            if(evt === 'auto')
                SA.setter('LDL', {data:ddd});
        }

    }



    render(
        <List data={data} onscrollend={scrollEndMethod} listMethod={lm} itemClass={'lg_item'} listClass={'like_lagou'} itemView={ITEM}/>,
        document.getElementById(ele)
    )
}

module.exports = applist;
