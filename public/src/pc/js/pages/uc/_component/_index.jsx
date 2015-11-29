var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
var Mooc = require('modules/tabs/coupons');
var api = require('pages/_common/api');
var store = require('mixins/store');
var router = require('libs/router').router

var _coupons = [];
var _order_form = {};

var tab_mc_data = [
    /*{attr: 'first', title: '方向'},*/
    {id: 'unlimit', attr: 'first', title: '全部'},
    '未完成',
    '已完成'
]


var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index'}>
                <header>
                    {'我的订单'}
                </header>
                <article id="content"></article>
            </div>
        )
    }
}

function bcd(){

    if($(this).find('.hheader a').hasClass('hui') == false){
        $(this).click(function(){
            $(this).addClass('active').siblings().removeClass('active');
          _order_form.orderids = $(this).find(".hheader a").html();
          _order_form.status = $(this).find(".hbody span").html();
          SA.setter('_GLOBAL',{data: _order_form} );
          router('carfinished')
        })
    }

}

function insertContent(){
    router.clear()
    //仿幕课网
    // Mooc( '导航数据', '分类详细数据', '热点数据', '页面容器id' )
    Mooc( tab_mc_data, _coupons, "content", {
        navItemClass: 'wid-4',
        listcb: bcd
    } )
}

function init(ele, param, cb){
    // SA.setter('_LOCAL_USER', getData, [ele, param, cb]);
    var luser = SA.getter('_LOCAL_USER')
    if(luser.data.error==="-1")
        SA.setter('_LOCAL_USER', [getData], [[ele, param, cb]]);
    else{
        getData(ele, param, cb)
    }
}

function getData(ele, param, cb){
  var _l_data  = SA.getter('_LOCAL_USER');    //登陆用户获取的信息
  if(_l_data){
      _l_user = _l_data.data;

      if(_l_user.error){
          _l_user = false;
       }
      if(!_l_user.uid){
          _l_user = false;
      }
      var uid;
      if(_l_user){
          uid = {uid: _l_user.uid};
      }
      if(uid){
          api.req('order_list',uid,function(data){
            // console.log(data);
            if(data.results){
                orderlistdata(data.results, ele, cb)
                // if(data.results && data.results.length)
                //   orderlistdata(data.results, ele, cb)
                // else {
                //     alert('您还没有任何订单')
                // }
            }
            // else{
            //   renderDom( ele, cb)
            // }
          })
      }else{
          router('reg_log');
      }
  }else{
      router('reg_log')
  }

}
var order_data_list_D0 =[];
var order_data_list_D1 =[];
var order_data_list_D2 =[];
var order_data_list_D3 =[];
function orderlistdata(orderdata,  ele, cb){
  var order_data_list = [];
  order_data_list_D0 =[];
  order_data_list_D1 =[];
  order_data_list_D2 =[];
  order_data_list_D3 =[];
  // console.log(orderdata);
  orderdata.map(function(item,i){
    item.createtime = item.createtime*1000;
    //转时间戳
    var a = new Date(parseInt(item.createtime));
    var month = parseInt(a.getMonth())+1
    var ordertime = a.getFullYear() +'-'+ month +'-'+ a.getDate() +' '+ a.getHours() +':'+ a.getMinutes() +':'+ a.getSeconds();
    //截取订单号
    var orderno = 'Y'+item.orderno.substring(3,16);
    //状态赋值
    var i_cls = 'ifont icon-car_oil'
    switch (item.servicetypeno) {
        case 'FW0002':
            i_cls = i_cls+' dby'
            break;
        case 'FW0001':
            i_cls = i_cls+' xby'
            break;
        case 'FW0003':
            i_cls = i_cls+' qc'
            break;
        default:
            i_cls = i_cls+ ' hui'

    }
    var title = <a className={i_cls}>{item.orderid}</a>
    var stateVal = item.status;
    if(stateVal == '0'){
      stateVal = '未完成';
      order_data_list =
      [
        {
            attr: 'sss',
            title: title,
            body:[
                {
                  k: item.servicetypename,
                  v: stateVal
                }
            ],
            footer:[

                {
                    k: '单号:',
                    v: orderno
                },
                {
                    k: '时间:',
                    v: ordertime
                }
            ]
            // dot:[
            //     <i>{'马上使用'}</i>
            // ]
        }
      ]
      order_data_list_D0.push(order_data_list)
    //   console.log(order_data_list_D0);
    }
    else if(stateVal == 1){
      stateVal = '已完成';
      order_data_list =
      [
        {
            // title: item.orderid,
            title: title,
            body:[
                {
                  k: item.servicetypename + ' ¥' + item.amount,
                  v: stateVal
                }
            ],
            footer:[

                {
                    k: '单号:',
                    v: orderno
                },
                {
                    k: '时间:',
                    v: ordertime
                }
            ]
            // dot:[
            //     <i>{'马上使用'}</i>
            // ]
        }
      ]
      order_data_list_D1.push(order_data_list)
    }
    else if(stateVal == 2){
      stateVal = '退款中';
      order_data_list =
      [
        {
            title: title,
            body:[
                {
                  k: item.servicetypename + ' ¥' + item.amount,
                  v: stateVal
                }
            ],
            footer:[

                {
                    k: '单号:',
                    v: orderno
                },
                {
                    k: '时间:',
                    v: ordertime
                }
            ]
            // dot:[
            //     <i>{'马上使用'}</i>
            // ]
        }
      ]
      order_data_list_D2.push(order_data_list)
    }
    else if(stateVal == 3){
      stateVal = '已退款';
      order_data_list =
      [
        {
            title: title,
            body:[
                {
                  k: item.servicetypename + ' ¥' + item.amount,
                  v: stateVal
                }
            ],
            footer:[

                {
                    k: '单号:',
                    v: orderno
                },
                {
                    k: '时间:',
                    v: ordertime
                }
            ]
            // dot:[
            //     <i>{'马上使用'}</i>
            // ]
        }
      ]
      order_data_list_D3.push(order_data_list)
    }
  })
  // _coupons = libs.extend(xxx,xxx1,xxx2,xxx3)
  _coupons = [order_data_list_D0, order_data_list_D1, order_data_list_D2, order_data_list_D3]
  renderDom( ele, _coupons, cb)
}


var Index = React.createClass(index);
function router2back(){
    router.cb = function(name){
        WeixinJSBridge.call('closeWindow')
    }
}
function renderDom(ele, data, cb){
    router2back();
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

module.exports = init;
