var List = require('./_component/_loadlist')()
var ITEM = require('widgets/itemView/f_li');
var render = React.render;


function applist(data, ele, opts){

    var evt;
    if( opts && opts.evt)
        evt = opts.evt;

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
        <List data={data} onscrollend={scrollEndMethod} listClass={'like_app_list'} itemClass={'span12'} itemView={ITEM}/>,
        document.getElementById(ele)
    )
}

module.exports = applist;
