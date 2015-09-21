var tabSwitch_likePConline = require('modules/tabs/like_pconline')
var Tabswitch = require('modules/tabs/like_jd');
var Tabswitch2 = require('modules/tabs/like_table');
var Mooc = require('modules/tabs/like_muke');

// var data = require('../_json/mall_list.json')


/* ============
  仿幕克网数据
============= */
var tab_mc_data = [
    /*{attr: 'first', title: '方向'},*/
    {id: 'unlimit', attr: 'first', title: '全部'},
    '未使用',
    '已使用',
    '已过期'
]
//仿幕课网数据
var mc_cnt_data = [
    //0
    [
        {attr: 'unused',coupons: '100', title: '组成拼班获得',number:'LKSDJFDF',time:'2015-11-23',state:'未使用'},
        {attr: 'unused',coupons: '100', title: '组成拼班获得',number:'LKSDJFDF',time:'2015-11-23',state:'未使用'},
        {attr: 'hasused',coupons: '100', title: '组成拼班获得',number:'LKSDJFDF',time:'2015-11-23',state:'已使用'},
        {attr: 'expired',coupons: '100', title: '组成拼班获得',number:'LKSDJFDF',time:'2015-11-23',state:'已过期'}

    ],
    //未使用
    [
        {attr: 'unused',coupons: '100', title: '组成拼班获得',number:'LKSDJFDF',time:'2015-11-23',state:'未使用'},
        {attr: 'unused',coupons: '100', title: '组成拼班获得',number:'LKSDJFDF',time:'2015-11-23',state:'未使用'}
    ],
    //已使用
    [
        {attr: 'hasused',coupons: '100', title: '组成拼班获得',number:'LKSDJFDF',time:'2015-11-23',state:'已使用'}
    ],
    //已过期
    [
        {attr: 'expired',coupons: '100', title: '组成拼班获得',number:'LKSDJFDF',time:'2015-11-23',state:'已过期'}
    ],
]

var mc_select_bar = [
/*    {attr: 'first', title: '难度'},
    {attr: 'second', title: '全部'},
    '初级',
    '中级',
    '高级'*/
]


//仿幕课网
// Mooc( '导航数据', '分类详细数据', '热点数据', '页面容器id' )
Mooc( tab_mc_data, mc_cnt_data, mc_select_bar, "tab-switch-mooc" )