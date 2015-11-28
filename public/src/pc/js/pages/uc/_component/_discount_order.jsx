/**
*
* 优惠买单
*
*/

var libs = require('libs/libs');
var Pt = require('widgets/itemView/f_li');
var ItemMixin = require('mixins/item');
var List = require('widgets/listView/list');
var api = require('libs/api');
// var pop = require('modules/pop/index');
// var store = require('mixins/store');
 var router = require('libs/router').router
 var ping_pp = require('../../_common/pingpp')


var createDom = {
    mixins: [ItemMixin],
    render:function(){
        router.clear();
        return (
          <div className={'index addcar discountOrder'}>
                <header className={'user-order'}>
                    优惠买单
                    {/*<i className={'ifont icon-people'}></i>*/}
                </header>
                <article>
                		<div className={'inpbox'}>
                    		<div id="shop" className={'carform'}></div>
                    		<div id="money" className={'carform'}></div>
                    </div>
                    <div className={'wxpayBox'}>
                        <h2>支付方式</h2>
                        <div className={'wxpay ifont icon-weixin1'}><i className={'ifont icon-roundcheckfill'}></i></div>
                    </div>
                    <a id="now_addcar" className={'btn-link unSubmit'}>确认支付</a>
                </article>
            </div>
        )
    }
};

var DiscountOrder = React.createClass(createDom);

var formData = {};

function router2back(){
    router.cb = function(name){
        WeixinJSBridge.call('closeWindow')
    }
}

function init(ele, cb){
    router2back()
    var luser = SA.getter('_LOCAL_USER')
    if(luser.data.error==="-1")
        SA.setter('_LOCAL_USER', [preRender], [[ele, cb]]);
    else{
        preRender(ele, cb)
    }
}

function preRender(ele, cb){
  var luser = SA.getter('_LOCAL_USER')
    if(luser.data.error)
        router('reg_log');
    else
        renderDom(ele, cb);
}

function bindEvent(){
	//用户登陆校验


    var Select = require('modules/form/select');
    var Number = require('modules/form/number');

	//选择4S店
    formData.shop = new Select({label:'', popclose: true, placeholder:'请选择商户'}, 'shop',function(){
    		$(this).find('input').before('<i class="ifont icon-location pos"></i>');
        $(this).click(function(){
            var postdata = {
                "comn": {
                    "type": "2"
                },
                "locat": {
                	"lat": "0",
                	"lng": "0",
                	"region": "0"
                }
            }
            api.req('getshoplist',postdata,function(data){
                getShopList(data);
            });
            return false;
        })
    });

	//输入金额
    formData.money = new Number({placeholder:'请输入付款金额'},'money',function(){
    		var oInput = $(this).find('input');
    		$(this).find('input').before('<i class="sign">￥</i>');
		oInput.click(function(){
			var isChooseShop = $('#shop').find('input').val(); //获取选中的4S店
			if(!isChooseShop){
				oInput.blur();
				SA.setter('Pop',{data:{body:'请选择商户', display:'block'}});
			}
			return false;
		});

		oInput.on('input',function(){
			var val = $(this).val();
			if(/^[\d]{1,8}(\.\d{1,2})?$/.test(val)){
            // if(formData.money.stat)
				$('#now_addcar').removeClass('unSubmit');
			}else{
				$('#now_addcar').addClass('unSubmit');
			}
		});
    });

	//跳转至我的订单
	$('.icon-people').click(function(){
		router('order_list');
	});

    //提交
    $('#now_addcar').click(function(){
    		if($(this).hasClass('unSubmit'))return;
    		checkValue();
    });

}

function checkValue(){

    //form 提交数据
    l_user = SA.getter('_LOCAL_USER').data;
    _wx_userinfo = SA.getter('_WEIXIN').data.user;

    console.log(l_user);
    console.log(_wx_userinfo);

    var params = {
        comm: {
            type: "2"
        },
        user: {
            name: l_user.name||'',
            id: l_user.uid,
            token: l_user.token,
            userinfo: _wx_userinfo
        },
        dealer: {
            no: formData.shop.value
        },
        goods: {
            type: "1",
            no: "0",
            amount: formData.money.value,
            currency: "cny"
        },
        paych: "wx_pub"
    }

    var postdata = {
        type: "insert_v2",
        params: params
    }
    console.log('111111111');
    console.log(postdata);



    api.req('order',postdata,function(data){
        // router('/uc.html#payok');
        console.log(data);
        if( data.c == "1")
            payment(data.d.order[0])
    });

    function payment(charge){
        console.log('aaaabbbbbb');
        console.log(charge.charge);
        // console.log(charge);
        ping_pp.createPayment(charge.charge, function(result, err) {
            // console.log(result);
            if (result=="success") {
                // payment succeed
                SA.setter('Pop',{data:{body:'已成功下订单',display:'block'}} )
                router('index');
                //router('order_list');
                // router('payok');
            } else if (result == "fail") {
                // alert('charge不对')
                SA.setter('Pop',{data:{body:result.toString(),display:'block'}} )
                // charge 不正确或者微信公众账号支付失败时会在此处返回
            } else if (result == "cancel") {
                SA.setter('Pop',{data:{body:'支付取消',display:'block'}} )
                submit_stat = false;
                console.log('微信公众账号支付取消支付');
                // 微信公众账号支付取消支付
            } else {
                console.log(result+" "+err.msg+" "+err.extra);
            }

        });

        //node的方式
        // api.req('payment', {charge}, function(data){
        //     alert(data.message);
        // })

    }
}

//获取4S店列表
function getShopList(data){
    var results = [];
    var rtnDom;
	// var locat = {
	// 	"lat":"12.98888",
	// 	"lng":"15,99991",
	// 	"region":"10"
	// }
	// var data = {
	// 		"code": 1,
	// 		"m":"Success",
	// 		"results":[
	// 				{
	// 					"no": "D0001",
	// 					"name": "东风本田君华店",
	// 					"addr": "广州市广州大道南888号",
	// 					"mobile": "020-88888888",
	// 					"lat": "15.122333",
	// 					"lng": "12.566666",
	// 					"level": "1"
	// 				}
	// 		]
	// };


      if(data.c && data.c==1){

        data.d.dealer.map(function(item,i){
            results.push({
                footer:{
                    attr: 'select',
                    k: item.name,
                    v: item.no
                }
            })
        })
        console.log(results);
        rtnDom = <List data={results}  listClass={'car_linkage car_linkage2'} itemClass={'wid-12'} itemView={Pt}/>

      }
      SA.setter('Pop',{data:{body:rtnDom, display:'block'}});
      // 测试一下

//	navigator.geolocation.getCurrentPosition(function(position){
//		//获取经纬度
//		locat.lat = position.coords.latitude;
//		locat.lng = position.coords.longitude;
//
//		api.req('getshoplist',locat, function(data){
//		      if(data.code && data.code===1){
//		        data.results.map(function(item,i){
//		            results.push({
//		                footer:{
//		                    attr: 'select',
//		                    k: item.name,
//		                    v: item.no
//		                }
//		            })
//		        })
//		        rtnDom = <List data={results}  listClass={'car_linkage car_linkage2'} itemClass={'wid-12'} itemView={Pt}/>
//
//		      }
//		      SA.setter('Pop',{data:{body:rtnDom, display:'block'}});
//	    });
//
//	});

    return rtnDom;
}

function renderDom(ele, cb){
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
        <DiscountOrder itemDefaultMethod={bindEvent} itemMethod={cb} />,
        element
    )
}

module.exports = init;
