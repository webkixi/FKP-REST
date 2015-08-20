var tabSwitch_likePConline = require('modules/tabs/like_pconline')
var Tabswitch = require('modules/tabs/tabswitch2');

var css = require('../_css/tabswitch.less')
// var data = require('../_json/mall_list.json')

//标签切换标题
var tab_nav_data = [
    '前端开发',
    '后端开发',
    '移动开发',
    '数据处理',
    '图像处理'
]

//标签切换内容
var tab_cnt_data = [
    //0
    [
        [
            {attr: 'first', title: '前端开发'},
            {attr: 'second', title: '不限'},
            {url: 'http://www.163.com', title: 'HTML/CSS'},
            'JavaScript'  ,
            'CSS3'  ,
            'Html5'  ,
            'jQuery'  ,
            'AngularJS',
            'Node.js'  ,
            'Bootstrap' ,
            'WebApp',
            '前端工具',
            'HTML/CSS' ,
            'JavaScript'  ,
            'CSS3'  ,
            'Html5'  ,
            'jQuery'  ,
            'AngularJS',
            'Node.js'  ,
            'Bootstrap' ,
            'WebApp',
            '前端工具'
        ],
        [
            {attr: 'first', title: '后端开发'},
            {attr: 'second', catName: '不限'},
            'PHP' ,
            'JAVA' ,
            'Linux' ,
            'Python' ,
            'C'       ,
            'C++'      ,
            'Go'
        ]
    ],
    //1
    [
        {attr: 'first', title: '后端开发'},
        {attr: 'second', catName: '不限'},
        'PHP' ,
        'JAVA' ,
        'Linux' ,
        'Python' ,
        'C'       ,
        'C++'      ,
        'Go'
    ],
    //2
    [
        {attr: 'first', title: '移动端开发'},
        {attr: 'second', catName: '不限'},
        'Android',
        'iOS'     ,
        'Unity 3D' ,
        'Cocos2d-x'
    ],
    //3
    [
        {attr: 'first', title: '数据处理'},
        {attr: 'second', title: '不限'},
        'MySQL'       ,
        'MongoDB'      ,
        '云计算'         ,
        'Oracle'       ,
        '大数据'         ,
        'SQL Server'
    ],
    //4
    [
        {attr: 'first', title: '图像处理'},
        {id: 'unlimit', attr: 'second', title: '不限'},
        'Photoshop' ,
        'Maya' ,
        'Premiere'
    ]
]

// 仿太平洋的多属性选择框
tabSwitch_likePConline( tab_nav_data, tab_cnt_data, 'tab-switch')

// 仿京东
Tabswitch( tab_nav_data, tab_cnt_data, "tab-switch2" )
