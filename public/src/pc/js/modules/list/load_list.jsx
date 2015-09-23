var List = require('./_component/_loadlist')()
var ITEM = require('widgets/itemView/pic_title');
var render = React.render;


function applist(data, ele, opts){

    var evt;
    if( opts && opts.evt)
        evt = opts.evt;

    var scrollEndMethod = (opts && opts.sem) || function(){
        var td;
        var tmpData = SA.getter('LDL')
        if(!tmpData.data){
            td = data;
            SA.setter('LDL', {data:data})
        }else{
            td = tmpData.data.data;
            td = td.concat(data);
            // SA.setter('LDL', {data:td})
        }

        if(!evt){
            $(this).find('li[data-cls="loadbar"]').click(function(){
                SA.setter('LDL', {data:td});
            })
        }
        else
            if(evt === 'auto')
                SA.setter('LDL', {data:td});

    }

    render(
        <List data={data} onscrollend={scrollEndMethod} listClass={'like_app_list'} itemClass={'span12'} itemView={ITEM}/>,
        document.getElementById(ele)
    )
}

module.exports = applist;
