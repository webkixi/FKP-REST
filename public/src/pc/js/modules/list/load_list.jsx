var List = require('./_component/_loadlist')()
var Pt = require('widgets/itemView/pic_title');
var render = React.render;


function applist(data, ele){

    loM = function(){
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
        $(this).find('li[data-cls="loadbar"]').click(function(){
            SA.setter('LDL', {data:td});
        })
    }

    render(
        <List data={data} onscrollend={loM} listClass={'like_app_list'} itemClass={'span12'} itemView={Pt}/>,
        document.getElementById(ele)
    )
}

module.exports = applist;
