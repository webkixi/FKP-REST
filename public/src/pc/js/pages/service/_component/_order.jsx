var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Xby');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')
var api = require('libs/api');
var router = require('libs/router').router
require('../../_common/pingpp')

var _form = {
    user: {},
    car:  {},
    addr: {}
};
var bodys = [];
var heji = {
  count: 0,
  totalprice: 0
};
var _wx_userinfo = SA.getter('_WEIXIN').data.user;
// console.log(_wx_userinfo);

var _l_user;
var _l_data  = SA.getter('_LOCAL_USER');    //登陆用户获取的信息
if(_l_data){
    _l_user = _l_data.data;

    if(_l_user.error){
        _l_user = false;
    }

    if(!_l_user.uid){
        _l_user = false;
    }
}

var footer = SA.getter('_GLOBAL').data.index.footer;
if(SA.getter('_GLOBAL').data.index.form.cleanParts ==1){
  var a = footer.pop();
  heji.count==1;
  heji.totalprice+=a.s;
  bodys.push({
    body:[
      a.k,
      1,
      '￥'+a.s
    ]
  })
}else{
  footer.map(function(item, i){
    // heji.count+=item.o.count;
    heji.count++;
    heji.totalprice+=item.s;
    bodys.push({
      // body:[
      //   item.k,
      //   item.o.count,
      //   '￥'+item.v
      // ]
      body:[
        item.k,
        1,
        '￥'+item.s
      ]
    })
  })
}
heji.totalprice = Math.round(heji.totalprice)

var mycar_service_order = bodys;

// var mycar_service_order = [
//     {
//         body:[
//             '机油',
//             '1',
//             '￥380'
//         ]
//     }
// ]
mycar_service_order.unshift(
  {
    body:[
        '保养项目',
        '单位',
        '价格'
    ]
  }
)

mycar_service_order.push(
  {
    body:[
        '合计',
        heji.count,
        '￥'+heji.totalprice
    ]
  }
)

var index = {
    mixins: [ItemMixin],
    //插入真实 DOM之前
	willMount: function(){
		if(!_l_user){
            return <div className={'service_myorder'}>
                <div id="name"></div>
                <div id="phone"></div>
                <div className="layout">
                    <label></label>
                    <div className="box">
                        <div id="code"></div>
                        <div id="verify_btn">获取验证码</div>
                    </div>
                </div>

                <div className="layout">
                    <label>地址</label>
                    <div className="box">
                        <div id="city"></div>
                        <div id="district"></div>
                        <div id="address"></div>
                    </div>
                </div>

                <div className="layout">
                    <label>预约时间</label>
                    <div className="box">
                        <div id="date"></div>
                        <div id="ampm"></div>
                    </div>
                </div>

            </div>
        }
        else{
            var addr, address;
            if(_l_user.addr){
                // console.log(_l_user);
                var tmp_addr = _l_user.addr[0];
                console.log(tmp_addr);
                addr = tmp_addr.province + tmp_addr.city + tmp_addr.county + tmp_addr.street||''
            }else{
                address = <div className="layout">
                    <label>地址</label>
                    <div className="box">
                        <div id="city"></div>
                        <div id="district"></div>
                        <div id="address"></div>
                    </div>
                </div>
            }
            return <div className={'service_myorder'}>
                <ul className={'message_over_order_mycar'}>
                  <li className={'item'}>
                    <div className={'hheader'}>
                      <img src="/images/tx_pic.png" />
                    </div>
                    <div className={'hbody'}>
                      <div className={'hbody_div'}>
                        <em>{_l_user.nick}</em>
                        <span>{_l_user.mobile}</span>
                      </div>
                      <p>{addr}</p>
                    </div>
                  </li>
                </ul>
                {address}
                <div className="layout">
                    <label>预约时间</label>
                    <div className="box">
                        <div id="date"></div>
                        <div id="ampm"></div>
                    </div>
                </div>
            </div>
        }
	},
    render: function() {
        var inner = this.willMount();
        return(
            <div className={'wrapper'}>
              <div className={'row'}>
                <div className={'service_mycar'}>
                  <h2>{'个人信息'}</h2>
                </div>
                {inner}
                <div className={'service_mycar srvice_myservice'}>
                  <h2>我的订单</h2>
                  <div className={'order_table_mycar'}>
                    <Uls data={mycar_service_order}  listClass={'foot_order_table_mycar'}  itemClass={'wid-12'} itemView={Pt}/>
                  </div>
                </div>
                <div className={'service_mycar pay_mycar'}>
                  <div className={'title_pay_mycar'}>
                    <h2>选择支付方式</h2>
                    <ul className={'pay_icon_mycar radioInput'}>
                      <li id='wechat'></li>
                      <li id='alipay'></li>
                    </ul>
                  </div>
                  <a id="now" className={'btn-link'}>{'支付'}</a>
                </div>
              </div>
            </div>
        )
    }
}
var _payway=0;
var bindIndex = function(){
    var Select = require('modules/form/select');
    var Text = require('modules/form/text');
    var Number = require('modules/form/number');
    var Radio = require('modules/form/radio');
    var u = {};

    function userAddress(){
        // //城市
        u.city = new Select({}, 'city',function(){
            var parents = [];
            api.req('region', function(data){
                if(data && data.code===1){
                    if(data.results.length){
                        data.results.map(function(item, i){
                            parents.push({
                                body:[
                                    {
                                        attr: 'select',
                                        k: item.address_name,
                                        v: item.region_id
                                    }
                                ]
                            })
                        })
                    }
                }
            })
            $(this).click(function(){
                console.log('hhhhhhggggg');           
                var xx = <List data={parents} listClass={'xxx'} itemClass={'wid-12'} itemView={Pt}/>
                SA.setter('Pop',{data:{body:xx,display:'block'}} )
            })
        });

        u.city.selected = function(txt, val){
            if(this.txt !== txt)
                u.district.empty()
        }
        //
        // 地区
        u.district = new Select({}, 'district',function(){
            $(this).click(function(){
                if(!u.city.stat){
                    SA.setter('Pop',{data:{body:'请先选择城市', display:'block'}})
                }else{
                    districts = [];
                    var kkk = $('#city').find('input').val();
                    api.req('region',{parent_id: kkk}, function(data){
                        if(data && data.code===1){
                            if(data.results.length){
                                data.results.map(function(item, i){
                                    districts.push({
                                        body:[
                                            {
                                                attr: 'select',
                                                k: item.address_name,
                                                v: item.region_id
                                            }
                                        ]
                                    })
                                })
                            }
                            var yy = <List data={districts} listClass={'xxx'} itemClass={'wid-12'} itemView={Pt}/>
                            SA.setter('Pop',{data:{body:yy,display:'block'}} )
                        }
                    })
                }
            })
        });

        //详细地址
        u.address = new Text({placeholder:'请输入您的详细地址', valide: 'username'}, 'address',function(){
            $(this).click(function(){

            })
        });
    }



    if(!_l_user){

        //电话
        u.name = new Text({label:'姓名',valide: 'username'}, 'name',function(){
            $(this).click(function(){

            })
        })

        //电话
        u.phone = new Number({label:'手机号码', valide: 'mobile'}, 'phone',function(){
            $(this).click(function(){

            })
        });

        //验证码
        u.verify = new Number({valide: 'verify_m'}, 'code',function(){
            $(this).click(function(){

            })
        });

        var btn_stat = 0;
        $('#verify_btn').click(function(){
                var btn = this;
                if(u.phone.stat){
                    if(btn_stat===0){
                        btn_stat = 1;
                        api.req('getmms', {mobile: u.phone.value}, function(data){
                            if(data.code===1){
                                SA.setter('Pop',{data:{body:'请输入短信验证码',display:'block'}} );
                                libs.countDown(btn, 61, function(){
                                    btn_stat = 0;
                                    $(btn).html('重新发送')
                                })
                            }
                        })
                    }
                }
                // else{
                //     SA.setter('Pop',{data:{body:'请输入手机号码',display:'block'}} );
                // }
        })

        userAddress()


    }

    //用户存在 但没有地址
    if(_l_user && !_l_user.addr){

        userAddress()

    }

    new Radio({label:'微信',value:'wx_pub',name: 'payment'},'wechat',function(){
      $(this).click(function(){
        _payway = "wx_pub";
      })
    })

    new Radio({label:'支付宝',value:'alipay',name: 'payment'},'alipay',function(){
      $(this).click(function(){
        _payway = "alipay";
      })
    })

    function formatDate(timer){
        var tt = new Date(timer);
        var year = tt.getFullYear();
        var date = tt.getDate();
        var month = tt.getMonth();
        return {
            year: year,
            month: month+1,
            date: date
        }
    }

    function organizeDate(timer){
        var ttt = formatDate(timer);
        var rtn = []
        for(var i=0; i < 3; i++){
            rtn.push({
                body:[
                    {
                        attr: 'select',
                        k: ttt.year+'-'+ttt.month+'-'+(ttt.date+i),
                        v: ttt.year+'-'+ttt.month+'-'+(ttt.date+i)
                    }
                ]
            })
        }
        return <List data={rtn} listClass={'xxx'} itemClass={'wid-12'} itemView={Pt}/>
    }

    //预约时间 年月日
    u.date = new Select({}, 'date',function(){
        var tt;
        api.req('getservtime', function(data){
            tt = data;
        })
        $(this).click(function(){
            if(tt){
                var ttt = organizeDate(tt.timer);
                SA.setter('Pop',{data:{body:ttt,display:'block'}} )
            }
        })
    });

    //预约时间 上午下午
    u.ampm = new Select({}, 'ampm',function(){
        $(this).click(function(){
            var ttt = [
                { body:[
                    {
                        attr: 'select',
                        k: '上午',
                        v: 'am'
                    } ]
                },
                { body:[
                    {
                        attr: 'select',
                        k: '下午',
                        v: 'pm'
                    }
                ] }
            ];
            var amtmp = <List data={ttt} listClass={'xxx'} itemClass={'wid-12'} itemView={Pt}/>
            SA.setter('Pop',{data:{body:amtmp,display:'block'}} )
        })
    });

    $('#now').click(function(){
        var stat = checkValue(u);
        if(stat){
            if(!_l_user){
                _form.user.name = u.name.value;
                _form.user.mobile = u.phone.value;

                _form.addr.username = u.name.value;
                _form.addr.mobile = u.phone.value;
                _form.addr.province = "广东"
                _form.addr.city = u.city.text
                _form.addr.county = u.district.text
                _form.addr.street = u.address.value
                _form.zip = '440000'
                _form.code = u.verify.value
            }else{
                if(u.city){
                    _form.addr.province = "广东"
                    _form.addr.city = u.city.text
                    _form.addr.county = u.district.text
                    _form.addr.street = u.address.value
                }else{
                    _form.addr = _l_user.addr[0];
                }
                _form.uid = _l_user.uid;

                _form.addr.mobile = _l_user.mobile;
            }
            _form.paych = _payway
            _form.totalprice = heji.totalprice
            _form.subscribetime = u.date.value + u.ampm.text

            // console.log(_l_user.name);
            _form.user.name = _l_user.name||'河马';
            _form.user.mobile = _l_user.mobile;
            _form.user.userinfo = _wx_userinfo;

            var form = SA.getter('_GLOBAL').data.index.form;
            var fff = libs.extend(_form, form);
            delete fff.cleanParts
            // console.log(fff);
            api.req('order',{type: 'insert', data:fff}, function(data){
                console.log(data);
                if(data && data.code===1){
                    // console.log(data.results[0]);
                    payment(data.results[0])
                }
            })
        }
    })

    function payment(charge){
        // console.log(charge);
        pingpp.createPayment(charge.charge, function(result, err) {
            if (result=="success") {
                // payment succeed
                // alert('ok')
                router('/uc.html');
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

function checkValue(ele){
    var items = Object.keys(ele);
    var stat = true;
    items.map(function(item, i){
        if(!ele[item].stat){
            $(ele[item].ipt).addClass('error')
            // alert('校验出错')
            stat = false;
        }
    })
    if(stat === false){
        alert('验证出错，请检查填写信息!')
        return false;
    }else
        return true;

}


var Index = React.createClass(index)

var ipts =[];
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
        <Index itemMethod={cb} itemDefaultMethod={bindIndex}/>,
        element
    )
}

module.exports = renderDom;
