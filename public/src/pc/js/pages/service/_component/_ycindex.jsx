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
var _form = { parts:[] };
var _parts = [];
var footer_item;   //data-reactid  parts列表的P的唯一标示
var service_resault_data;
var _PAGE={
    totalprice: 0
};

//弹窗中的item点击事件
function popItemMethod(){
    //pop li click
    $(this).click(function(){
        var idf = $(this).attr('data-idf');
        var item_pop_li = $(this).attr('data-idf');
        var item_p = _PAGE.thep
        var item_li = _PAGE.theli

        var wanner = libs.extend(true, {}, _parts[idf].body[0]);
        service_ori_data.footer[item_p].v=wanner.v;
        service_ori_data.footer[item_p].o=wanner.o;

        var dataDom = mixDataAndDom(service_ori_data)
        SA.setter('Pop',{data:{display:'none'}})
        SA.setter('Index',{data:{servicedata: [dataDom], totalprice: _PAGE.totalprice} })
    })
}


//配件列表dom完成后执行abcd方法
function abcd(){
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
                                  k: item.name,
                                  v: item.userprice,
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
                    totalprice: pdata.totalprice
                }
            })
        }
    },
    render: function () {
        var mycar_data = []
        mycar1 = SA.getter('_GLOBAL').data.index;
        var mycar = [
          {
            title : mycar1[1].body.k+mycar1[2].body.k,
            img : '/images/service/bmw_icon.png'
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
                <div className={'dot'}><i className={'ifont icon-next'}></i></div>
              </div>
            </li>
          )
        })

        var data = this.state.data;
        s_data = data.servicedata;
        totalprice = data.totalprice;
        return(
          <div className={'body'}>
            <div className={'wrapper'}>
              <div className={'row'}>
                <div className={'service_mycar'}>
                  <h2>{'我的车辆'}</h2>
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
                      <span className={'foot_money'}>{'总价'}<i>{totalprice}</i></span>
                      <span>{'￥480'}</span>
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

    //选择是否需要提供配件
    checkNum.checkbox = new Checkbox({label:'已有配件只需上门服务'}, 'checkbox',function(self){
        if(self){
            var chk_val = self.value;
            if(chk_val==1){
                var dataDom = mixDataAndDom(service_ori_zero_data)
                //_form.cleanParts = 1
                SA.setter('Index',{data:{servicedata: [dataDom], totalprice: _PAGE.totalprice} })
            }
            if(chk_val==0){
                var dataDom = mixDataAndDom(service_ori_data)
                //_form.cleanParts = 0
                SA.setter('Index',{data:{servicedata: [dataDom], totalprice: _PAGE.totalprice} })
            }
        }
    });

    $("#now").click(function(){
        var carData = SA.getter('_GLOBAL').data;
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
                _form.parts.push({
                    no: pno,
                    name: item.k,
                    count: 1
                })
            }
        })
        // console.log(orderData);
        var form = libs.extend(carData.index.form, _form)
        form.openid = "wx766666";
        orderData.form = form;

        SA.setter('_GLOBAL',{index: orderData})
        router("order")
    })
}


var Index = React.createClass(index)

function getData(ele, param, cb){

    var mycar = SA.getter('_GLOBAL').data.index;
    if(!mycar){
        router('addcar');
    }else{
        var query = param||{type: 'xby'};
        api.req('service', query, function(data){
            if(data.code && data.code===1){
                organizeData(data.results[0], ele, cb)
            }
        })
    }
}

function organizeData(oridata, ele, cb){
    var _body,
        _footer=[],

        _totalprice=0,
        _discountprice=0;

    _form.servicetypeno = oridata.servicetypeno;
    _form.servicetypename = oridata.servicetypename;

    oridata.partstype.map(function(item, i){
        _footer.push({
            attr: item.partstypeno,
            k: item.partstypename,
            v: item.defpartsprice,
            o: item
        })
    })
    var serviceTimeMoney = oridata.workprice;
    _footer.push({
       attr: 'fixed',
       k: '工时费',
       v: serviceTimeMoney
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
        _discountprice=0;

    _footer.map(function(item, i){
        _totalprice += item.v;
        item.v = <span>￥{item.v}<i className="ifont icon-next"></i></span>
    })

    _PAGE.totalprice = _totalprice;

    _body[0].v = <span>￥{_totalprice}<i className="ifont icon-xla"></i></span>

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
        totalprice: _PAGE.totalprice
    }

    //SA.setter('_GLOBAL',{index: service_ori_data})

    React.render(
        <Index data={dt} itemDefaultMethod={bindIndex} itemMethod={cb}/>,
        element
    )
}

module.exports = getData;
