var List = require('widgets/listView/list')
var Pt = require('widgets/itemView/pic_title');
var render = React.render;

var imgs = [
    {title: 'aaaaaa', img:'/images/demo/aclass/11.png',body:[{caption: '学习',url:'http://www.163.com'}]},
    {title: 'bbbb',  img:'/images/demo/aclass/22.png',body:[{caption: '学习'}]},
    {title: 'cccccc', img:'/images/demo/aclass/33.png',body:[{caption: '学习'}]},
    {title: 'dddd',  img:'/images/demo/aclass/44.png',body:[{caption: '学习'}]},
    {title: 'eeeee', img:'/images/demo/aclass/55.png',body:[{caption: '学习'}]},
    {title: 'fffff', img:'/images/demo/aclass/66.png',body:[{caption: '学习'}]},
    {title: 'ggggg', img:'/images/demo/aclass/77.png',body:[{caption: '学习'}]},
    {title: 'vvvvv', img:'/images/demo/aclass/88.png',body:['好好学习']},
    {title: 'qqqqqq', img:'/images/demo/aclass/99.png',body:[{caption: '学习'}]},
    {title: 'tttttt', img:'/images/demo/aclass/999.png',body:[{caption: '学习'}]}
]

var goods = [
    {
        title: 'aaaaaa',
        img:'/images/demo/aclass/p1.jpg',
        body:[
            {
                text: '高效记忆法大揭密',
                url:'http://www.163.com'
            },
            {
                k: 'abc',
                v: '2-5岁'
            },
            {
                k: '截止报名日期：',
                v: '2015-08-23 24:00'
            }
        ]
    },
    {
        title: 'aaaaaa',
        img:'/images/demo/aclass/p2.jpg',
        body:[
            {
                text: '高效记忆法大揭密',
                url:'http://www.163.com'
            },
            {
                k: 'abc',
                v: '2-5岁'
            },
            {
                k: '截止报名日期：',
                v: '2015-08-23 24:00'
            }
        ]
    },
    {
        title: 'aaaaaa',
        img:'/images/demo/aclass/p2.jpg',
        body:[
            {
                text: '高效记忆法大揭密',
                url:'http://www.163.com'
            },
            {
                k: 'abc',
                v: '2-5岁'
            },
            {
                k: '截止报名日期：',
                v: '2015-08-23 24:00'
            }
        ]
    },
    {
        title: 'aaaaaa',
        img:'/images/demo/aclass/p1.jpg',
        body:[
            {
                text: '高效记忆法大揭密',
                url:'http://www.163.com'
            },
            {
                k: 'abc',
                v: '2-5岁'
            },
            {
                k: '截止报名日期：',
                v: '2015-08-23 24:00'
            }
        ]
    }
]

render(
    <List data={imgs} listClass={'gally_caption'} itemClass={'span10-2 item shadows'} itemView={Pt}/>,
    document.getElementById('test')
)


render(
    <List data={goods} listClass={'gally_shop'} itemClass={'span12 item'} itemView={Pt}/>,
    document.getElementById('test1')
)
