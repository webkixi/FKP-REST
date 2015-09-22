var Mooc = require('modules/tabs/coupons');

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
var coupons = [
    // 未使用
    [
        {
            title: '100',
            body:[
                {
                    text: '组成拼班获得'
                },
                {
                    k: '优惠编码',
                    v: 'LKSDJFDF'
                },
                {
                    k: '过期时间',
                    v: '2015-11-23'
                }       
            ],
            dot:[
                <i>{'马上使用'}</i>
            ]
        },
        {
           title: '1000',
            body:[
                {
                    text: '组成拼班获得'
                },
                {
                    k: '优惠编码',
                    v: 'LKSDJFDF'
                },
                {
                    k: '过期时间',
                    v: '2015-11-23'
                }
            ],
            dot:[
                <i>{'马上使用'}</i>
            ]
        }
    ],
    // 已使用
    [
        {
            title: '2000',
            body:[
                {
                    text: '组成拼班获得'
                },
                {
                    k: '优惠编码',
                    v: 'LKSDJFDF'
                },
                {
                    k: '过期时间',
                    v: '2015-11-23'
                }       
            ],
            dot:[
                <i>{'已使用'}</i>
            ]
        },
        {
           title: '1000',
            body:[
                {
                    text: '组成拼班获得'
                },
                {
                    k: '优惠编码',
                    v: 'LKSDJFDF'
                },
                {
                    k: '过期时间',
                    v: '2015-11-23'
                }
            ],
            dot:[
                <i>{'已使用'}</i>
            ]
        }
    ],
    // 已过期
    [
        {
            title: '300',
            body:[
                {
                    text: '组成拼班获得'
                },
                {
                    k: '优惠编码',
                    v: 'LKSDJFDF'
                },
                {
                    k: '过期时间',
                    v: '2015-11-23'
                }       
            ],
            dot:[
                <i>{'已过期'}</i>
            ]
        },
        {
           title: '1000',
            body:[
                {
                    text: '组成拼班获得'
                },
                {
                    k: '优惠编码',
                    v: 'LKSDJFDF'
                },
                {
                    k: '过期时间',
                    v: '2015-11-23'
                }
            ],
            dot:[
                <i>{'已过期'}</i>
            ]
        }
    ]
]
//仿幕课网
// Mooc( '导航数据', '分类详细数据', '热点数据', '页面容器id' )
Mooc( tab_mc_data, coupons, "tab-switch-mooc" )