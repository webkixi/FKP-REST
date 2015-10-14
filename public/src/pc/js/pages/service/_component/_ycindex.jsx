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
var _parts = [];
var footer_item;   //data-reactid  parts列表的P的唯一标示
var service_resault_data;
var _PAGE={
    totalprice: 0
};


var mycar = [
  {
    title : '宝马7系（进口）760 Li 6.0T 2009-2014',
    img : '/images/service/bmw_icon.png'
  }
]
var mycar_data = []
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

//
// var mycar_service_b = [
//     {
//         body:[
//             {
//                 k: '小保养',
//                 v: <span>￥{'800'}<i className="ifont icon-next"></i></span>
//             }
//         ],
//         footer: [
//             {
//                 k: '机油',
//                 v: <span>￥{'380'}<i className="ifont icon-next"></i></span>
//             },
//             {
//                 k: '机油滤清器',
//                 v: <span>￥{'38'}<i className="ifont icon-next"></i></span>
//             },
//             {
//                 attr: 'fixed',
//                 k: '工时费',
//                 v: <span>￥{'68'}<i className="ifont icon-next"></i></span>
//             }
//         ]
//     },
//     {
//         attr: 'fixed',
//         body:[
//             {
//                 k: '全车检测',
//                 v: <span>￥{'600'}<i className="ifont icon-next"></i></span>
//             }
//         ]
//     }
// ]

// var mycar_service_s = [
//     {
//         body:[
//             {
//                 k: '蓝桶专用机油 (4L,5W-30)',
//                 v: "￥188"
//             }
//         ]
//     },
//     {
//         body:[
//             {
//                 k: '绿桶专用机油 (4L,5W-30)',
//                 v: "￥380"
//             }
//         ]
//     },
//     {
//         body:[
//             {
//                 k: '全合成专用机油 (4L,5W-30)',
//                 v: "￥60"
//             }
//         ]
//     }
// ]

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
    })
}

var index = {
    mixins: [store('Index'), ItemMixin],
    chkClick: function(){
        var chkspan = React.findDOMNode(this.refs.chkspan);
        $(chkspan).toggleClass('active');

        var chkb = React.findDOMNode(this.refs.chkb);
        if($(chkspan).hasClass('active'))
            chkb.value="1"
        else {
            chkb.value="0"
        }
    },
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
                  <div className="ihaved">
                      <input value="0" ref="chkb" className="chk_1" type="checkbox"/>
                      <span ref="chkspan" className="chk_span" onClick={this.chkClick}></span>
                      <span>{"已有配件只需上门服务"}</span>
                  </div>
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

var Index = React.createClass(index)

function getData(ele, cb){
    api.req('service', {}, function(data){
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

    _body = [
        {
            k: oridata.servicetypename,
            v: _totalprice
        }
    ]

    var data = mixDataAndDom({
        body: _body,
        footer: _footer
    })

    service_data.push({
        body: data.body,
        footer: data.footer
    });

    renderDom( ele, cb)
}

function mixDataAndDom( dt){
    service_ori_data = dt;

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

    _body[0].v = <span>￥{_totalprice}<i className="ifont icon-next"></i></span>

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
        <Index data={dt} itemMethod={cb}/>,
        element
    )
}

module.exports = getData;
