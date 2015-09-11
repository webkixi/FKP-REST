var List = require('./_component/_loadlist')()
var Pt = require('widgets/itemView/pic_title');
var render = React.render;


function applist(data, ele){

    loM = function(){
        var tmpData = SA.getter('LDL')
        if(!tmpData.data){
            SA.setter('LDL', {data:data})
        }else{
            var td = tmpData.data.data;
            td = td.concat(data);
            // SA.setter('LDL', {data:td})
        }
    }

    render(
        <List data={data} loadMethod={loM} listClass={'like_app_list'} itemClass={'span12'} itemView={Pt}/>,
        document.getElementById(ele)
    )
}

module.exports = applist;
