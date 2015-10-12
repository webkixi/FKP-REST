var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
var FDiv = require('widgets/itemView/f_div');


var headerdata = {
    title: "headerpic",
    img: "/images/demo/aclass/b2.jpg",
    body:[
        {
            k: "赵云非",
            v: "18617323269"
        },
        "广州市白云区京溪南方医院地铁"
    ],
    footer: [
        {
            k: "小保养套餐 x 1",
            v: "￥480"
        },
        {
            k: "支付方式",
            v: "在线支付"
        },
        {
            k: "服务方式",
            v: "上门保养"
        },
        {
            k: "我的服务员",
            v: "工号:10001"
        }
    ],
    dot:[
        "订单号： A00012015091800001"
    ]
}

var estimate = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index carfinished'}>
                <header>
                    {'已完成'}
                </header>
                <article>
                    <div className="profile like_app_list">
                        <FDiv data={headerdata} itemClass={'noclass'}/>
                    </div>
                </article>
            </div>
        )
    }
}

var Esti = React.createClass(estimate)

function defaultMethod(){
    $('.profile .carlog .hbody p').each(function(i, item){
        if(i%2===0){
            $(item).css({
                position: "absolute",
                left: "0",
                top: i*2+"rem"
            })
            $(item).addClass('left')
            if(i===0){
                $(item).addClass('left-first')
            }
        }else{
            $(item).css({
                position: "absolute",
                right: "0",
                top: i*2+"rem"
            })
            $(item).addClass('right')
            if(i===1){
                $(item).addClass('right-first')
            }
        }
    })
}

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
        <Esti data={data} itemDefaultMethod={defaultMethod} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
