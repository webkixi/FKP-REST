var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
var Mooc = require('modules/tabs/coupons');


/* ============
  仿幕克网数据
============= */
var tab_mc_data = [
    /*{attr: 'first', title: '方向'},*/
    {id: 'unlimit', attr: 'first', title: '全部'},
    '未完成',
    '已完成'
]
var coupons = [
    // 未使用
    [
        {
            title: '￥100',
            body:[
                '小保养'
            ],
            footer:[
                {
                    k: '单号:',
                    v: '3534568'
                },
                {
                    k: '时间:',
                    v: '2015/11/23'
                }
            ],
            dot:[
                <i>{'马上使用'}</i>
            ]
        },
        {
            title: '￥1000',
            body:[
                '小保养'
            ],
            footer:[
                {
                    k: '单号:',
                    v: '3534568'
                },
                {
                    k: '时间:',
                    v: '2015/11/23'
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
            title: '￥2000',
            body:[
                '小保养'
            ],
            footer:[
                {
                    k: '单号:',
                    v: '3534568'
                },
                {
                    k: '时间:',
                    v: '2015/11/23'
                }
            ],
            dot:[
                <i>{'已完成'}</i>
            ]
        },
        {
           title: '￥1000',
            body:[
                '小保养'
            ],
            footer:[
                {
                    k: '单号:',
                    v: '3534568'
                },
                {
                    k: '时间:',
                    v: '2015/11/23'
                }
            ],
            dot:[
                <i>{'已完成'}</i>
            ]
        }
    ]
]


var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index'}>
                <header>
                    {'用户中心'}
                </header>
                <article id="content"></article>
            </div>
        )
    }
}

function insertContent(){
    //仿幕课网
    // Mooc( '导航数据', '分类详细数据', '热点数据', '页面容器id' )
    Mooc( tab_mc_data, coupons, "content", {
        navItemClass: 'wid-4'
    } )
}

var Index = React.createClass(index);
function renderDom(ele, data, cb){
    var element;
    if(typeof ele==='string')
        element = document.getElementById(ele)
    else
        if(typeof ele === 'object')
            if(ele.nodeType)
                element = ele
    else
        return;

    React.render(
        <Index data={data} itemDefaultMethod={insertContent} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
