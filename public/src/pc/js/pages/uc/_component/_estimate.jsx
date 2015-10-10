var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var side_pop = require('modules/pop/sidepop')
var List = require('widgets/listView/list')


//虚拟数据结构
var data = {
    profile:{
        province: '湖南',
        price: '34000',
        model: 'abcdkslfiel',
        license: 'abc1111111',
        mileage: '10000'
    },
    store:[
        {
            title: '￥100',
            body:[
                '东风本田君华店',
                '直接收购'
            ],
            dot:[
                <i className="price">{'免费精准报价'}</i>
            ]
        },
        {
            title: '￥1000',
            body:[
                'xxxxyyyy',
                '直接收购'                
            ],
            dot:[
                <i className="price">{'免费精准报价'}</i>
            ]
        }
    ]
}


var testdata = [
    {
        body:[
            {
                k: '店名',
                v: '广州东本君华'
            },
            {
                k: '地址',
                v: '广州市广州大道南1398号'
            }
        ]
    },
    {
        body:[
            {
                k: '店名',
                v: '深圳东本车友'
            },
            {
                k: '地址',
                v: '深圳市南山区宝安大道嘉进隆前海汽车城A05-1'
            }
        ]
    }
]

//填充结构到sidepop中
var struct = <div>
    <header>
        直接收购
    </header>
    <article>
        <p>东风本田君华店</p>
        <p>
            <h3 className="gray">收车方式</h3>
            <h3>直接收购</h3>
        </p>
        <div className="dot">
            <i className="price">免费精准报价</i>
        </div>
    </article>
    <footer>
        <List data={testdata} listClass={'like_xg_list'} itemClass={'span12'} itemView={Pt}/>,
    </footer>
</div>

//弹出侧边栏
var tan = function(){
    $(this).click(function(){
        var dview = libs.getOffset();
        SA.setter('Sidepop',{data:{body:struct,display:'block'}})
    })
}



var estimate = {
    mixins: [ItemMixin],
    render: function () {
        //注入侧边栏目

        var fills = data.store;
        return(
            <div className={'esti'}>
                <header>
                    {'评估结果'}
                </header>
                <article>
                    <div className="btn-circle">
                        <div className='title'>评估参考价</div>
                        <span>5000</span>
                        <div className='province'>{'(湖南)'}</div>
                    </div>
                    <div className="profile">
                        <p>该评估参考价由车虫网提供</p>
                        <section>东风日产小可 2012款1.6自动</section>
                        <section>首次上牌 2013.1.1  行驶里程 10000公里</section>
                    </div>
                </article>
                <footer>
                    <Uls data={fills} listClass={'like_app_list coupons_list'} itemView={Pt} itemMethod={tan}/>
                </footer>
            </div>
        )
    }
}

var Esti = React.createClass(estimate)

function renderDom(ele, data, cb){
    //初始化侧边弹框
    side_pop({});

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
        <Esti data={data} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
