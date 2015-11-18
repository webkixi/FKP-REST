var libs = require('libs/libs');
var Pt = require('widgets/itemView/f_li');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')
var Uls = require('modules/tabs/_component/uls')('Xby');
var pop = require('modules/pop/index')
var api = require('pages/_common/api');
var store = require('mixins/store');
var router = require('libs/router').router
//全局数据
var service_data=[];
var service_ori_data={}
var service_ori_zero_data={}
var _form = { orderdetail:[] };
var _parts = [];
var footer_item;   //data-reactid  parts列表的P的唯一标示
var service_resault_data;
var _PAGE={
    totalprice: 0,
    discountprice: 0
};

var _l_user;  //定义本地用户信息，非微信用户


//弹窗中的item点击事件
function popItemMethod(){
    //pop li click
    $(this).click(function(){
        var idf = $(this).attr('data-idf');
        var item_pop_li = $(this).attr('data-idf');
        var item_p = _PAGE.thep
        var item_li = _PAGE.theli

        var wanner = libs.extend(true, {}, _parts[idf].body[0]);
        service_ori_data.footer[item_p].v=wanner.o.userprice;
        service_ori_data.footer[item_p].o=wanner.o;
        service_ori_data.footer[item_p].s=wanner.s;

        var dataDom = mixDataAndDom(service_ori_data)
        SA.setter('Pop',{data:{display:'none'}})
        SA.setter('Index',{data:{servicedata: [dataDom], totalprice: _PAGE.totalprice, discountprice: _PAGE.discountprice} })
    })
}


//配件列表dom完成后执行abcd方法
function abcd(){
    router.clear();
    pop({});
    var the = this;
    var the_footer;
    var the_i;
    $(the).find('.hfoot').addClass("u-table")

    //服务li点击获取li的唯一id
    $(the).click(function(){
        //将li idf放入全局变量
        _PAGE.theli = $(the).attr('data-idf');
    });


    //关闭弹窗
    $(".pop_bg").click(function(){
      SA.setter('Pop',{data:{display:'none'}})
    })


    //弹出服务下的配件列表
    $(the).find('.hbody').click(function(){
        the_i = $(this).find('i');
        the_footer = $(the).find('.hfoot');
        the_footer.toggleClass(function(){
            the_i.toggleClass('icon-next');
            the_i.toggleClass('icon-xla');
            return 'u-table'
        });
    });

    //配件列表p点击获取p的唯一id
    $(the).find('.hfoot p').click(function(){
        if($('#checkbox input').val()==0){

          //如果配件列表p的data-src为fixed, 不执行点击事件
          if($(this).attr('data-src')==='fixed')
            return

          //将PID放入全局变量
          _PAGE.thep = $(this).attr('data-pid');
          var pn = { partno: $(this).attr('data-src')}

          //获取配件列表数据
          api.req('parts', pn, function(data){
              if(data.code && data.code===1){
                  _parts = [];
                  data.results.map(function(item, i){
                      _parts.push({
                          body:[
                              {
                                  k: item.partsname,
                                  v: '¥'+item.userprice,
                                  s: item.discountprice,
                                  o: item
                              }
                          ]
                      })
                  })

                  //配件列表item触发点击事件后
                  var listItemClick = popItemMethod;

                  //生成配件列表并render到pop中
                  var kkk = <List data={_parts} itemMethod={listItemClick} listClass={'xxx'} itemClass={'wid-12'} itemView={Pt}/>
                  SA.setter('Pop',{data:{body:kkk, display:'block'}})
              }
          })
        }else{
          SA.setter('Pop',{data:{display:'none'}})
        }
    })
}

//该页配置
var index = {
    mixins: [store('Index'), ItemMixin],
    componentWillMount: function(){
        if(this.props.data){
            var pdata = this.props.data;
            this.setState({
                data: {
                    servicedata: pdata.servicedata,
                    totalprice: pdata.totalprice,
                    discountprice: pdata.discountprice
                }
            })
        }
    },
    render: function () {
        var mycar_data = [];
        // mycar1 = SA.getter('_GLOBAL').data.index;
        var carcar = _l_user.usercar[0];
        var mycar = [
          {
            title : carcar.carbrand+' '+carcar.carseries+' '+carcar.cartype,
            img : '/images/logo/'+carcar.carimage
          }
        ]

        mycar.map(function(item,i){
          mycar_data.push(
            <li key={'mycar'+i}>
              <div className={'hhead'}>
                <img src={mycar[i].img} />
              </div>
              <div className={'hbody'}>
                <p>{mycar[i].title}</p>
                <div className={'dot'}></div>
              </div>
            </li>
          )
        })

        var data = this.state.data;
        s_data = data.servicedata;
        totalprice = data.totalprice;
        discountprice = data.discountprice;
        return(
          <div className={'body'}>
            <div className={'wrapper'}>
              <div className={'row'}>
                <div className={'service_mycar'}>
                  <h2>
                      <i id="back" className={'ifont icon-pre'}></i>我的车辆
                  </h2>
                  <div className={'s_m_list hlist'}>
                    <ul className={'item'}>
                      {mycar_data}
                    </ul>
                  </div>
                </div>
                <div className={'service_mycar srvice_myservice'}>
                  <h2>我的服务项目</h2>
                  <Uls data={s_data} itemDefaultMethod={abcd} listClass={'s_m_list s_m_list_1'} itemClass={'wid-12'} itemView={Pt}/>
                  <div id={'checkbox'}></div>
                </div>
              </div>
            </div>
            <footer>
              <div className={'service_foot'}>
                <div className={'container'}>
                  <ul>
                    <li className={'wid-8'}>
                      <span className={'foot_money'}>{'总价'}<s>{'¥'+totalprice}</s></span>
                      <span>{'¥'+discountprice}</span>
                    </li>
                    <li className={'wid-4'}>
                      <a id='now' className={'btn-link'}>{'下一步'}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </footer>
          </div>
        )
    }
}

//dom写入后，绑定相关的方法
var bindIndex = function(){
    var Checkbox = require('modules/form/checkbox');
    var checkNum = {};
    $('#back').click(function(){
        router('/');
    })

    //选择是否需要提供配件
    checkNum.checkbox = new Checkbox({label:'已有配件只需上门服务'}, 'checkbox',function(self){
        if(self){
            var chk_val = self.value;
            if(chk_val==1){
                var dataDom = mixDataAndDom(service_ori_zero_data)
                //_form.cleanParts = 1
                SA.setter('Index',{data:{servicedata: [dataDom], totalprice: _PAGE.totalprice, discountprice: _PAGE.discountprice} })
            }
            if(chk_val==0){
                var dataDom = mixDataAndDom(service_ori_data)
                //_form.cleanParts = 0
                SA.setter('Index',{data:{servicedata: [dataDom], totalprice: _PAGE.totalprice, discountprice: _PAGE.discountprice} })
            }
        }
    });

    $("#now").click(function(){
        var orderData;
        if(checkNum.checkbox.value==1){
            _form.servicemode = 1;
            _form.cleanParts = 1;
            orderData = service_ori_zero_data
        }
        if(checkNum.checkbox.value==0){
            _form.servicemode = 0;
            _form.cleanParts = 0;
            orderData = service_ori_data
        }
        orderData.footer.map(function(item, i){
            if(item.o){
                var pno = item.o.partstypeno||'';
                _form.orderdetail.push({
                    partsno: item.o.partsno,
                    no: pno,
                    userprice: item.o.discountprice,
                    name: item.k,
                    count: 1
                })
            }
        })

        var form = {};

        //car form
        carData = _l_user
        ? _l_user.usercar[0]
        : SA.getter('_GLOBAL').data.index.form
        form = libs.extend({}, _form)
        form.car = carData;
        //other form
        // form.openid = "wx766666";
        orderData.form = form;
        SA.setter('_GLOBAL', { index: orderData } )
        router("order")
    })
}

var Index = React.createClass(index)

function router2back(){
    router.cb = function(name){
        if( name )
            router('/')
    }
}

function init(ele, param, cb){
    router2back()
    var luser = SA.getter('_LOCAL_USER')
    if(luser.data.error==="-1")
        SA.setter('_LOCAL_USER', getData, [ele, param, cb]);
    else{
        getData(ele, param, cb)
    }
}

function getData(ele, param, cb){
    var index = SA.getter('_GLOBAL').data.index;
    var _l_data  = SA.getter('_LOCAL_USER');    //登陆用户获取的信息
    if(_l_data){
        _l_user = _l_data.data;

        if(_l_user.error){
            _l_user = false;
        }
    }
    if(!_l_user && !index){
        router('addcar');
    }else{
        if(!_l_user.usercar && !index){
            router('addcar');
        }
        // else if(!_l_user.addr && !index){
        //     _l_user = {error: '-4'};
        // }
        else{
            var query = param||{type: 'xby'};
            api.req('service', query, function(data){

                if(data.code && data.code===1){
                    organizeData(data.results[0], ele, cb)
                }
            })
        }
    }
}

function organizeData(oridata, ele, cb){
    var _body=[],
        _footer=[],

        _totalprice=0,
        _discountprice=0;

        service_data = []

    _form.servicetypeno = oridata.servicetypeno;
    _form.servicetypename = oridata.servicetypename;

    oridata.partstype.map(function(item, i){
        _footer.push({
            attr: item.partstypeno,
            k: item.partstypename,
            v: item.userprice,
            s: item.discountprice,
            o: item
        })
    })
    var serviceTimeMoney = oridata.workprice;
    _footer.push({
       attr: 'fixed',
       k: '工时费',
       v: serviceTimeMoney,
       s: serviceTimeMoney
    })

    _body = [
        {
            k: oridata.servicetypename,
            v: _totalprice
        }
    ]

    service_ori_data = {body: _body, footer: _footer}
    var data = mixDataAndDom({
        body: _body,
        footer: _footer
    })

    cleanData({
      body: _body,
      footer: _footer
    })

    service_data.push({
        body: data.body,
        footer: data.footer
    });
    renderDom( ele, cb)
}

function cleanData(ddd){
    var tmp = libs.extend(true, {}, ddd);
    var lD = tmp.footer.pop();
    tmp.footer.map(function(item,i){
      item.v = 0;
      item.s = 0;
    })
    tmp.footer.push(
      lD
    )
    service_ori_zero_data = tmp;
}

function mixDataAndDom( dt){
    var data = libs.extend(true, {}, dt),
        _body = data.body,
        _footer = data.footer,
        _totalprice=0,
        _discountprice=0

    _footer.map(function(item, i){
        _totalprice += item.v;
        _discountprice += item.s;
        if(item.attr && item.attr==='fixed')
            item.v = <span>{'¥'+item.v}<em className="disN">{item.s}</em></span>
        else
            item.v = <span>{'¥'+item.v}<em className="disN">{item.s}</em><i className="ifont icon-next"></i></span>
    })

    _discountprice = _discountprice.toString().split('.')[0]
    _totalprice = _totalprice.toString().split('.')[0]
    _PAGE.totalprice = _totalprice
    _PAGE.discountprice = _discountprice

    _body[0].v = <span><em>¥{_totalprice}</em>¥{_discountprice}<i className="ifont icon-xla"></i></span>

    return data;

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

    var dt = {
        servicedata: service_data,
        totalprice: _PAGE.totalprice,
        discountprice: _PAGE.discountprice
    }

    //SA.setter('_GLOBAL',{index: service_ori_data})

    React.render(
        <Index data={dt} itemDefaultMethod={bindIndex} itemMethod={cb}/>,
        element
    )
}

module.exports = init;
