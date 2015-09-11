var List = require('widgets/listView/list')
var Pt = require('widgets/itemView/pic_title');
var render = React.render;


function applist(data, ele){
    render(
        <List data={data} listClass={'like_app_list'} itemClass={'span12'} itemView={Pt}/>,
        document.getElementById(ele)
    )
}

module.exports = applist;
