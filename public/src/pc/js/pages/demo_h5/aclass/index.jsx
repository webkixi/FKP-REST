var List = require('widgets/listView/list')
var Pt = require('widgets/itemView/pic_title');
var render = React.render;

var imgs = [
    {title: 'aaaaaa', img:'/images/demo/aclass/11.png'},
    {title: 'bbbb',  img:'/images/demo/aclass/22.png'},
    {title: 'cccccc', img:'/images/demo/aclass/33.png'},
    {title: 'dddd',  img:'/images/demo/aclass/44.png'},
    {title: 'eeeee', img:'/images/demo/aclass/55.png'},
    {title: 'fffff', img:'/images/demo/aclass/66.png'},
    {title: 'ggggg', img:'/images/demo/aclass/77.png'},
    {title: 'vvvvv', img:'/images/demo/aclass/88.png'},
    {title: 'qqqqqq', img:'/images/demo/aclass/99.png'},
    {title: 'tttttt', img:'/images/demo/aclass/999.png'}
]

render(
    <List data={imgs} listClass={'pro_ul'} itemClass={'span10-2 item shadows'} itemView={Pt}/>,
    document.getElementById('test')
)
