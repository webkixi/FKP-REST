var List = require('widgets/listView/list')
var Pt = require('widgets/itemView/pic_title');
var render = React.render;


//密集图相册列表
var imgs = [
    {title: 'aaaaaa', img:'/images/demo/xg/b1.jpg',body:[{caption: '学习',url:'http://www.163.com'}]},
    {title: 'bbbb',  img:'/images/demo/xg/b2.jpg',body:[{caption: '学习'}]},
    {title: 'cccccc', img:'/images/demo/xg/b3.jpg',body:[{caption: '学习'}]},
    {title: 'dddd',  img:'/images/demo/xg/b4.jpg',body:[{caption: '学习'}]},
    {title: 'eeeee', img:'/images/demo/xg/b5.jpg',body:[{caption: '学习'}]},
    {title: 'fffff', img:'/images/demo/xg/b6.jpg',body:[{caption: '学习'}]},
    {title: 'ggggg', img:'/images/demo/xg/b7.jpg',body:[{caption: '学习'}]},
    {title: 'vvvvv', img:'/images/demo/xg/b8.jpg',body:['好好学习']}
]

// 大图相册列表
var goods = [
    {
        title: 'aaaaaa',
        img: ['/images/demo/aclass/p1.jpg','/images/demo/aclass/p1.jpg','/images/demo/aclass/p1.jpg'],
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
        ],
        dot: [
            <a href={'http://www.pconline.com.cn'} style={{right:'0',top:'7.58rem'}}>{'￥38000元'}<s>{'1234'}</s></a>
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

// 类博客列表
var blogs = [
    {
        title: 'aaaaaa',
        img: ['/images/demo/aclass/p1.jpg','/images/demo/aclass/p1.jpg','/images/demo/aclass/p1.jpg'],
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
        ],
        dot: [
            <a href={'http://www.pconline.com.cn'} style={{right:'0',top:'7.58rem'}}>{'￥38000元'}<s>{'1234'}</s></a>
        ]
    },
    {
        title: 'aaaaaa',
        img:'/images/demo/aclass/b2.jpg',
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
        img:'/images/demo/aclass/b2.jpg',
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
        img:'/images/demo/aclass/b1.jpg',
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
];

function mulitifyData(num){
    var tmpData = []
    if(num){
        for(var i = 0; i < num; i++){
            tmpData = tmpData.concat(blogs)
        }
    }
    return tmpData;
}
var listData = [];
listData = mulitifyData(4);

render(
    <List data={listData} listClass={'like_xg_list'} itemClass={'span12'} itemView={Pt}/>,
    document.getElementById('test')
)

render(
    <List data={listData} listClass={'like_app_list'} itemClass={'span12'} itemView={Pt}/>,
    document.getElementById('test1')
)
