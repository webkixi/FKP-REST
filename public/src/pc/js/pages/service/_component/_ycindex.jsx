var libs = require('libs/libs');
var Pt = require('widgets/itemView/f_li');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')
var Uls = require('modules/tabs/_component/uls')('Xby');
var pop = require('modules/pop/index')
var api = require('pages/_common/api');
var store = require('mixins/store');

//全局数据
var service_data=[];
var service_ori_data={}
var service_ori_zero_data={}
var _parts = [];
var footer_item;   //data-reactid  parts列表的P的唯一标示
var service_resault_data;
var _PAGE={
    totalprice: 0
};

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

function popItemMethod(){
    //pop li click
    $(this).click(function(){
        var idf = $(this).attr('data-idf');
        var item_pop_li = $(this).attr('data-idf');
        var item_p = _PAGE.thep
        var item_li = _PAGE.theli

        var wanner = _parts[idf].body[0].v;
        service_ori_data.footer[item_p].v=wanner;

        var dataDom = mixDataAndDom(service_ori_data)
        SA.setter('Pop',{data:{display:'none'}})
        SA.setter('Index',{data:{servicedata: [dataDom], totalprice: _PAGE.totalprice} })
    })
}

function abcd(){
    pop({});
    var the = this;
    var the_footer;
    var the_i;
    $(the).find('.hfoot').addClass("u-table")
    $(the).click(function(){
        //将li idf放入全局变量
        _PAGE.theli = $(the).attr('data-idf');
    });
    $(the).find('.hbody').click(function(){
        the_i = $(this).find('i');
        the_footer = $(the).find('.hfoot');
        the_footer.toggleClass(function(){
            the_i.toggleClass('icon-next');
            the_i.toggleClass('icon-xla');
            return 'u-table'
        });
    });
    $(".pop_bg").click(function(){
      SA.setter('Pop',{data:{display:'none'}})
    })
    $(the).find('.hfoot p').click(function(){
        if($('#checkbox input').val()==0){
          if($(this).attr('data-src')==='fixed') return
          //将PID放入全局变量
          _PAGE.thep = $(this).attr('data-pid');
          var pn = { partno: $(this).attr('data-src')}
          api.req('parts', pn, function(data){
              if(data.code && data.code===1){
                  _parts = [];
                  data.results.map(function(item, i){
                      _parts.push({
                          body:[
                              {
                                  k: item.name,
                                  v: item.userprice
                              }
                          ]
                      })
                  })
                  var kkk = <List data={_parts} itemMethod={popItemMethod} listClass={'xxx'} itemClass={'wid-12'} itemView={Pt}/>
                  SA.setter('Pop',{data:{body:kkk, display:'block'}})
              }
          })
        }else{
          SA.setter('Pop',{data:{display:'none'}})
        }
    })
}

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
var bindIndex = function(){
    var Checkbox = require('modules/form/checkbox');

    // var abc = new Checkbox(true)
    // var opts = {label:"abc"}
    // abc({data:opts,
    //   itemMethod:ccbb,
    //   listClass:'form checkbox'
    // })
    // var yyy = <abc data={opts} itemMethod={ccbb} listClass={'form checkbox'}/>;
    //是否选择
    new Checkbox({label:'已有配件只需上门服务'}, 'checkbox',function(){
        $(this).click(function(){
          var chkspan = $(this).find(".chk_span");
          chkspan.toggleClass('active');
          var chkb = $(this).find(".chk_1");
          if(chkspan.hasClass('active')){
              chkb.val("1")
              var dataDom = mixDataAndDom(service_ori_zero_data)
              SA.setter('Index',{data:{servicedata: [dataDom], totalprice: _PAGE.totalprice} })
          }
          else {
              chkb.val("0")
              var dataDom = mixDataAndDom(service_ori_data)
              SA.setter('Index',{data:{servicedata: [dataDom], totalprice: _PAGE.totalprice} })
          }
        })
    });
}


var Index = React.createClass(index)

function getData(ele, param, cb){
    var query = param||{type: 'xby'};
    api.req('service', query, function(data){
        if(data.code && data.code===1){
            organizeData(data.results[0], ele, cb)
        }
    })
}

function organizeData(oridata, ele, cb){
    var _body,
        _footer=[],

        _totalprice=0,
        _discountprice=0;

    oridata.partstype.map(function(item, i){
        _footer.push({
            attr: item.partstypeno,
            k: item.partstypename,
            v: item.price,
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
    // service_data.map(function(item,i){
    //   item.footer.push({
    //         k: "工时",
    //         v: <span>￥{"99"}<i className="ifont icon-next"></i></span>
    //
    //   });
    // })

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

    SA.setter('_GLOBAL',{index: service_ori_data})

    React.render(
        <Index data={dt} itemDefaultMethod={bindIndex} itemMethod={cb}/>,
        element
    )
}

module.exports = getData;
