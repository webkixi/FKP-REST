
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

//密集图相册列表
var imgs = [
    {title: 'aaaaaa', img:'/images/demo/aclass/11.png'},
    {title: 'bbbb',  img:'/images/demo/aclass/22.png'},
    {title: 'cccccc', img:'/images/demo/aclass/33.png'},
    {title: 'dddd',  img:'/images/demo/aclass/44.png'}
]




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


// var AppList = require('modules/list/applist');
var AppList = require('modules/list/load_list');
AppList(listData, 'test1');
