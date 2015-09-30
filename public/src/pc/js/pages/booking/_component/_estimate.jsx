var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')

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
                {
                    text: '东风本田君华店'
                },
                {
                    text: '直接收购'
                }
            ],
            dot:[
                <i><a href="http://www.163.com">{'免费精准报价'}</a></i>
            ]
        },
        {
            title: '￥1000',
            body:[
                {
                    text: 'xxxxyyyy'
                },
                {
                    text: '直接收购'
                }
            ],
            dot:[
                <i><a href='http://www.163.com'>{'免费精准报价'}</a></i>
            ]
        }
    ]
}

var tan = function(){
    $(this).click(function(){
        var dview = libs.getOffset();
        $('.sidepop').css({'height':dview.width})
        $('.sidepop').toggleClass('active')         
    })
}

var index = {
    mixins: [ItemMixin],
    render: function () {
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
        <Index data={data} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
