var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
var FDiv = require('widgets/itemView/f_div');
var api = require('libs/api');
var store = require('mixins/store');
var router = require('libs/router').router

var _order_Date_act = [];
var _form = {};

function getData(ele, param, cb){
  var order_id = SA.getter('_GLOBAL').data.data.orderids;
  var orderid = { orderid : order_id}

  api.req('myorder_info',orderid, function(data){
    orderInfodata(data.results, ele, cb)
  })
}
var order_data;
function orderInfodata(orderInfo, ele, cb){
    var order_status = SA.getter('_GLOBAL').data.data.status;
    // console.log(orderInfo);
    var orderInfo_L = [];
    if(orderInfo[0].paytype == 1){
    orderInfo[0].paytype = '在线支付'
    }
    else if(orderInfo[0].paytype == 0){
    orderInfo[0].paytype = '线下支付'
    }
    if(orderInfo[0].servicemode == 1){
    orderInfo[0].servicemode = '上门保养'
    }
    else if(orderInfo[0].servicemode == 0){
    orderInfo[0].servicemode = '到店保养'
    }
    order_data =
    {
     title: "headerpic",
     img: "/images/getheadimg.jpeg",
     body:[
         {
             k: orderInfo[0].username,
             v: orderInfo[0].mobile
         },
         orderInfo[0].useraddr
     ],
     footer: [
         {
           k: orderInfo[0].servicetypename + "x 1",
           v: '￥' + orderInfo[0].totalprice
         },
         {
             k: "支付方式",
             v: orderInfo[0].paytype
         },
         {
             k: "服务方式",
             v: orderInfo[0].servicemode
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
 var data = {
     statu: order_status,
     detail: order_data
 }
 renderDom( ele, data, cb)
}

var estimate = {
    mixins: [ItemMixin],
    render: function () {
        // console.log(this.props.data);
        return(
            <div className={'index carfinished'}>
                <header>
                    {this.props.data.statu}
                </header>
                <article>
                    <div className="profile order_details">
                        <FDiv data={this.props.data.detail} itemClass={'noclass'}/>
                    </div>
                </article>
            </div>
        )
    }
}

function defaultMethod(){
    router.clear()
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
