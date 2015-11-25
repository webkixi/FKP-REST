var table = require('modules/table/table');

//引入模块
var pagination = require('modules/pagination/pagi');
// var data = require('../_json/mall_list.json')

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



// 表格
// Tabswitch( '表格数据', '表头数据', '表格宽度',  '页面容器id' )
table( tab_body_data, tab_head, tab_head_width, "tab-switch-table" )


// 根据总的文章数和每页文章数算出分页总数，并配好链接
var pagi = {
        total: 300,   //文章总数
        per:   10,    //每页文章数
        url:   '/xxx/yyy.html',  //文章url
        query: 'abc="slime"&xyz="pack"&curentPage='  //文章query
    },

    //分页条有几个分页标签
    begin = {
        start: 0,
        off: 10
    }


pagination( pagi, begin, 'pagi')
