var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')
var Pt = require('widgets/itemView/pic_title');

var testdata = [
    {
        body:[
            {
                text: "日产丽威2013款1.6XL手动豪华版"
            },
            {
                k: '首次上牌',
                v: '2012年3月'
            },
            {
                k: '行驶里程',
                v: '50000公里'
            },
            {
                k: '所在区域',
                v: '湖南 益阳 桃江县'
            },
            {
                k: '预约单号',
                v: '158978954568'
            },
            {
                k: '在线估价日期',
                v: '2015-09-25'
            },
            {
                k: '在线评估参考价',
                v: '10万'
            },
            {
                k: '报价车商',
                v: '广州东本君华店'
            },
            {
                k: '精准报价',
                v: '待评估'
            }
        ]
    }
]

var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index'}>
                <header>
                    {'我的预约'}
                </header>
                <article>
                    <List data={this.props.data} listClass={'like_xg_list'} itemClass={'span12'} itemView={Pt}/>,
                </article>
                <footer>
                    <a id="now" className={'btn-link'}>{'等待商家报价'}</a>
                </footer>
            </div>
        )
    }
}


var Index = React.createClass(index)

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
        <Index data={testdata} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
