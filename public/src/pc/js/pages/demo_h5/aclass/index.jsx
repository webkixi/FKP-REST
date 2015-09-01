var List = require('widgets/listView/list')
var Pt = require('widgets/itemView/pic_title');
var render = React.render;

var imgs = [
    {title: 'aaaaaa', img:'/images/demo/aclass/11.png',body:[{title: '好好学习',url:'http://www.163.com'}]},
    {title: 'bbbb',  img:'/images/demo/aclass/22.png',body:[{title: '好好学习'}]},
    {title: 'cccccc', img:'/images/demo/aclass/33.png',body:[{title: '好好学习'}]},
    {title: 'dddd',  img:'/images/demo/aclass/44.png',body:[{title: '好好学习'}]},
    {title: 'eeeee', img:'/images/demo/aclass/55.png',body:[{title: '好好学习'}]},
    {title: 'fffff', img:'/images/demo/aclass/66.png',body:[{title: '好好学习'}]},
    {title: 'ggggg', img:'/images/demo/aclass/77.png',body:[{title: '好好学习'}]},
    {title: 'vvvvv', img:'/images/demo/aclass/88.png',body:[{title: '好好学习'}]},
    {title: 'qqqqqq', img:'/images/demo/aclass/99.png',body:[{title: '好好学习'}]},
    {title: 'tttttt', img:'/images/demo/aclass/999.png',body:[{title: '好好学习'}]}
]

render(
    <List data={imgs} listClass={'pro_ul'} itemClass={'span10-2 item shadows'} itemView={Pt}/>,
    document.getElementById('test')
)
