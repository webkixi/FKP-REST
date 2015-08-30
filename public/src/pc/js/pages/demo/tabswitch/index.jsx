var tabSwitch_likePConline = require('modules/tabs/like_pconline')
var Tabswitch = require('modules/tabs/like_jd');
var Tabswitch2 = require('modules/tabs/like_table');
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





/*
* 仿京东nav数据
*/
var jd_nav_data = [
    '家用电器',
    ['手机', '数码','京东通信'],
    ['电脑', '办公'],
    ['家居', '家具','家装','厨具'],
    ['男装', '女装','内衣','珠宝'],
]

var jd_images_data = [
    {img:'/images/jd/1.jpg', title:'hahah'},
    {img:'/images/jd/2.jpg', title:'fdsfdsf'},
    {img:'/images/jd/3.jpg', title:'ggggggg'},
    {img:'/images/jd/4.jpg', title:'eeeeeeee'},
    {img:'/images/jd/5.jpg', title:'yyyyyyy'},
    {img:'/images/jd/6.jpg', title:'aaaaaaaaa'},
    {img:'/images/jd/7.jpg', title:'nnnnnnnn'},
    {img:'/images/jd/8.jpg', title:'kkkkkkk'}
]


//表格
var tab_head=[
    '商品编号',
    '类别',
    '品名',
    '品牌',
    '仓库',
    '挂牌量',
    '起订量',
    '单价（元)',
    '点价截止时间',
    '发布时间',
    '编辑/详情'
];

var tab_head_width = [0,50,0,0,185,0,60,0,105,100,80];//单列宽度，0表示自动

var adom = <a>编辑</a>;
var tab_body_data=[
    [111,'铜','铁','宝钢','华南仓',12,1,'￥120.00','00:00','00:00',adom],
    [111,'铜','铁','宝钢','华南仓',12,1,'￥120.00','00:00','00:00',adom],
    [111,'铜','铁','宝钢','华南仓',12,1,'￥120.00','00:00','00:00',adom],
    [111,'铜','铁','宝钢','华南仓',12,1,'￥120.00','00:00','00:00',adom],
    [111,'铜','铁','宝钢','华南仓',12,1,'￥120.00','00:00','00:00',adom]
];






// 仿太平洋的多属性选择框
// Tabswitch( '导航数据', '分类详细数据', '页面容器id' )
tabSwitch_likePConline( tab_nav_data, tab_cnt_data, 'tab-switch')



//仿幕课网
// Mooc( '导航数据', '分类详细数据', '热点数据', '页面容器id' )
Mooc( tab_mc_data, mc_cnt_data, mc_select_bar, "tab-switch-mooc" )



// 仿京东首页详细分类导航
// Tabswitch( '导航数据', '分类详细数据', '热点数据', '品牌图片数据', '页面容器id' )
Tabswitch( jd_nav_data, tab_cnt_data, tab_nav_data, jd_images_data, "tab-switch2" )


// 表格
// Tabswitch( '表格数据', '表头数据', '表格宽度',  '页面容器id' )
Tabswitch2( tab_body_data, tab_head, tab_head_width, "tab-switch-table" )
