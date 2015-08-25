var tabSwitch_likePConline = require('modules/tabs/like_pconline')
var Tabswitch = require('modules/tabs/like_jd');
var Mooc = require('modules/tabs/like_muke');

// var data = require('../_json/mall_list.json')


/* ============
  仿太平洋网数据
============= */
//仿太平洋网，标签切换标题
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
            {attr: 'second', title: '全部'},
            {url: 'http://www.pconline.com.cn', title: '我是链接'},
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
            {attr: 'second', catName: '全部'},
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
        {attr: 'second', catName: '全部'},
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
        {attr: 'second', catName: '全部'},
        'Android',
        'iOS'     ,
        'Unity 3D' ,
        'Cocos2d-x'
    ],
    //3
    [
        {attr: 'first', title: '数据处理'},
        {attr: 'second', title: '全部'},
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



/* ============
  仿幕克网数据
============= */
var tab_mc_data = [
    {attr: 'first', title: '方向'},
    {id: 'unlimit', attr: 'second', title: '全部'},
    '前端开发',
    '后端开发',
    '移动开发',
    '数据处理',
    '图像处理'
]

//仿幕课网数据
var mc_cnt_data = [
    //0
    [
        {attr: 'first', title: '分类'},
        {attr: 'second', title: '全部'},
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
        '前端工具',
        'PHP' ,
        'JAVA' ,
        'Linux' ,
        'Python' ,
        'C'       ,
        'C++'      ,
        'Go',
        'Android',
        'iOS'     ,
        'Unity 3D' ,
        'Cocos2d-x',
        'MySQL'       ,
        'MongoDB'      ,
        '云计算'         ,
        'Oracle'       ,
        '大数据'         ,
        'SQL Server',
        'Photoshop' ,
        'Maya' ,
        'Premiere'

    ],
    [
        {attr: 'first', title: '前端开发'},
        {attr: 'second', title: '全部'},
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
    //1
    [
        {attr: 'first', title: '后端开发'},
        {attr: 'second', catName: '全部'},
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
        {attr: 'second', catName: '全部'},
        'Android',
        'iOS'     ,
        'Unity 3D' ,
        'Cocos2d-x'
    ],
    //3
    [
        {attr: 'first', title: '数据处理'},
        {attr: 'second', title: '全部'},
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

var mc_select_bar = [
    {attr: 'first', title: '难度'},
    {attr: 'second', title: '全部'},
    '初级',
    '中级',
    '高级'
]




// 仿太平洋的多属性选择框
tabSwitch_likePConline( tab_nav_data, tab_cnt_data, 'tab-switch')

//仿幕课网
Mooc( tab_mc_data, mc_cnt_data, mc_select_bar, "tab-switch-mooc" )

// 仿京东
Tabswitch( tab_nav_data, tab_cnt_data, "tab-switch2" )
