var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')
var api = require('libs/api');
var store = require('mixins/store');
var router = require('libs/router').router

var wash_service_mycar = [
    {
        body:[
            {
                  k: '外观清洗',
                v: <span>￥{'30'}<i className="ifont icon-next"></i></span>
            }
        ],
        footer: [
            {
                k: '洗车工时费',
                v: <span>￥{'30'}</span>
            }
        ]
    }
]


function abcd(){
    var the = this;
    var the_footer;
    var the_i;
    $(the).find('.hfoot').addClass("u-table")
    $(the).find('.hbody').click(function(){
        the_i = $(this).find('i');
        the_footer = $(the).find('.hfoot');
        the_footer.toggleClass(function(){
            the_i.toggleClass('icon-next');
            the_i.toggleClass('icon-xla');
            return 'u-table'
        });
    });
}

var index = {
    mixins: [ItemMixin],
    render: function () {
        var mycar_data = [];
        // mycar1 = SA.getter('_GLOBAL').data.index;
        var carcar = _l_user.usercar[0];
        var mycar = [
          {
            title : carcar.carbrand+' '+carcar.carseries+' '+carcar.cartype,
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
                  <List data={wash_service_mycar} itemDefaultMethod={abcd} listClass={'s_m_list s_m_list_1'} itemClass={'wid-12'} itemView={Pt}/>
                </div>
              </div>
            </div>
            <footer>
              <div className={'service_foot'}>
                <div className={'container'}>
                  <ul>
                    <li className={'wid-8'}>
                      <span className={'foot_money'}>{'总价'}<i>{'￥50'}</i></span>
                      <span>{'￥30'}</span>
                    </li>
                    <li className={'wid-4'}>
                      <a  className={'btn-link'}>{'下一步'}</a>
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

    $("#now").click(function(){
        var orderData;
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

function init(ele, param, cb){
    SA.setter('_LOCAL_USER', getData, [ele, param, cb]);
}

function getData(ele, param, cb){
    var index = SA.getter('_GLOBAL').data.index;
    console.log(index);
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
        else{
            var caridData = index.form.carid;
            var carid = { carid: caridData}
            api.req('washcar', carid, function(data){
                console.log(data);
                if(data.code && data.code===1){
                    organizeData(data.results[0], ele, cb)
                }
            })
        }
    }
}

function organizeData(oridata, ele, cb){
    // _totolpic =carcheck_data[0].workprice;
    // carcheck_Title = {
    //     body:[
    //       {
    //         k: '全车检测',
    //         v: <p>￥{_totolpic}<i className="ifont icon-next"></i></p>
    //       }
    //     ],
    //     footer: []
    // }
    // var z = Object.keys(tmp);
    // var ggg = []
    // z.map(function(item, i){
    //   ggg = ggg.concat(tmp[item])
    //
    // })
    //
    // carcheck_Title.body = ggg
    // carcheck_Title.footer.push(
    //   {
    //     k: '工时费',
    //     v: <span>￥{_totolpic}</span>,
    //     s: _totolpic
    //   }
    // )
    renderDom( ele, cb)
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
        <Index itemDefaultMethod={bindIndex} itemMethod={cb}/>,
        element
    )
}

module.exports = init;
