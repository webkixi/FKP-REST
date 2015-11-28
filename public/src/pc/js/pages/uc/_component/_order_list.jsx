/**
*
* 优惠买单-我的订单列表
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


var createDom = {
    mixins: [ItemMixin],
    render:function(){
        router.clear();
        return (
          <div className={'index discountbx'}>
                <header>
                    我的订单
                </header>
                <article>
					<List data={this.props.data}  listClass={'car_linkage car_linkage2 discount_order_list'} itemClass={'wid-12'} itemView={Pt}/>
                </article>
            </div>
        )
    }
};

var OrderList = React.createClass(createDom);

function router2back(){
    router.cb = function(name){
        router('/uc#discount_order')
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

function preRender(ele,cb){
    var luser = SA.getter('_LOCAL_USER')
    if(luser.data.error)
        router('reg_log');
    else
        organizeDate(ele, cb);
}

function organizeDate(ele, cb){

    //测试数据
//	 var data = [
//	 	{
//	 		title:'aaa',
//	 		img:'/images/service/icon_yhq.png',
//	 		body:[
//	 			{
//	 				k:<span className={'title'}><span>优惠买单</span>￥<span>200</span></span>
//	 			},
//	 			{
//	 				k:<span>商户：<span className={'shop'}>东风本田广州君华4S店</span></span>
//	 			},
//	 			{
//	 				k:<span className={'no'}>单号：100001</span>
//	 			},
//	 			{
//	 				k:<span className={'no'}>时间：2015-12-10</span>
//	 			}
//
//	 		]
//	 	},
//	 	{
//	 		title:'bbb',
//	 		img:'/images/service/icon_yhq.png',
//	 		body:[
//	 			{
//	 				k:<span className={'title'}><span>优惠买单</span>￥<span>1500</span></span>
//	 			},
//	 			{
//	 				k:<span>商户：宝马广州君华4S店</span>
//	 			},
//	 			{
//	 				k:<span className={'no'}>单号：100086</span>
//	 			},
//	 			{
//	 				k:<span className={'no'}>时间：2015-12-10</span>
//	 			}
//
//	 		]
//	 	}
//	 ];

    var luser = SA.getter('_LOCAL_USER').data
    var postdata = {
        comm: {
            type: "2"
        },
        user: {
            id: luser.uid
            ,token: luser.token
        },
        order: {
            type: "1"
            ,start_id: "0"
            ,count: "20"
        }
    }

    console.log('uuuuuuu7777777');
    console.log(postdata);


    function formatDate(timer){
        timer = timer*1000;
        var tt = new Date(timer);
        var year = tt.getFullYear();
        var date = tt.getDate();
        var month = tt.getMonth();
        var hours = tt.getHours();
        var min = tt.getMinutes();
        var sec = tt.getSeconds();
        console.log(timer);
        // return {
        //     year: year,
        //     month: month+1,
        //     date: date
        // }
        return year+'/'+month+'/'+date+'   '+hours+':'+min+':'+sec
    }

    api.req('discountlist', postdata, function(dat){
        console.log(dat);
        if(dat.c=='1'){
            var rst = []
            if(dat.d){
                var tmpdata = dat.d.order;
                tmpdata.map(function(item, i){
                    var ordertime = formatDate(item.create_time);
                    rst.push({
                        title: '优惠买单'
                        ,img:'/images/service/icon_yhq.png'
                        ,body: [
                            {
            					k:<span className={'title'}><span>优惠买单</span>￥<span>{item.amount}</span></span>
            				},
            				{
            					k:<span>商户：<span className={'shop'}>{item.dealer.name}</span></span>
            				},
            				{
            					k:<span className={'no'}>单号：{item.no}</span>
                         },
                            {
                                k:<span className={'no'}>时间：{ordertime}</span>
                            }
                        ]
                    })
                })
            }
            renderDom(rst,ele,cb);
        }
    })
}

function renderDom(data,ele, cb){
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
        <OrderList data={data} />,
        element
    )
}

module.exports = init;
