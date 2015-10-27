var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
var FDiv = require('widgets/itemView/f_div');
var api = require('pages/_common/api');
var store = require('mixins/store');
var router = require('libs/router').router

var _order_Date_act = [];

var order_status = SA.getter('_GLOBAL').data.data.status;
console.log(order_status);
function getData(ele, param, cb){
  var order_id = SA.getter('_GLOBAL').data.data.orderids;
  var orderid = { orderid : order_id}
  api.req('myorder_info',orderid, function(data){
    orderInfodata(data.results, ele, cb)
  })
}
var order_data;
function orderInfodata(orderInfo, ele, cb){
  var orderInfo_L = [];
   order_data =
  {
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
           k: orderInfo[0].servicetypename + "x 1",
           v: '￥' + orderInfo[0].totalprice
         },
         {
             k: "支付方式",
             v: "在线支付"
         },
         {
             k: "服务方式",
             v: "上门保养"
         }
         // {
         //     k: "我的服务员",
         //     v: "工号:10001"
         // }
     ],
     dot:[
         "订单号：" + orderInfo[0].orderno
     ]
 }
  renderDom( ele, cb)
}

var estimate = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index carfinished'}>
                <header>
                    {order_status}
                </header>
                <article>
                    <div className="profile order_details">
                        <FDiv data={order_data} itemClass={'noclass'}/>
                    </div>
                </article>
            </div>
        )
    }
}

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


var Esti = React.createClass(estimate)
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

module.exports = getData;
