var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')
var api = require('pages/_common/api');
var store = require('mixins/store');
var router = require('libs/router').router

// var mycar = [
//   {
//     title : '宝马7系（进口）760 Li 6.0T 2009-2014',
//     img : '/images/service/bmw_icon.png'
//   }
// ]
// var mycar_data = []
// mycar.map(function(item,i){
//   mycar_data.push(
//     <li key={'mycar'+i}>
//       <div className={'hhead'}>
//         <img src={mycar[i].img} />
//       </div>
//       <div className={'hbody'}>
//         <p>{mycar[i].title}</p>
//         <div className={'dot'}><i className={'ifont icon-next'}></i></div>
//       </div>
//     </li>
//   )
// })


// var mycar_service_b = [
//     {
//         body:[
//             {
//                 k: '全车检测',
//                 v: <span>￥{'800'}<i className="ifont icon-next"></i></span>
//             }
//         ],
//         footer: [
//             {
//                 text: <em className={'title_detection_mycar'}><i className="ifont icon-creative"></i>{'电气设备'}</em>
//             },
//             {
//                 k: '检查车内外照明及信号装置工况',
//                 v: '1'
//             },
//             {
//                 k: '检查车内外后视镜工况',
//                 v: '1'
//             },
//             {
//                 k: '检查雨刮工况',
//                 v: '1'
//             },
//             {
//                 k: '检查喇叭',
//                 v: '1'
//             },
//             {
//                 k: '检查仪表',
//                 v: '1'
//             },
//             {
//                 k: '检查音响',
//                 v: '1'
//             },
//             {
//                 k: '检查空调',
//                 v: '1'
//             },
//             {
//                 text: <em className={'title_detection_mycar'}><i className="ifont icon-creative"></i>{'发动机'}</em>
//             },
//             {
//                 k: '检查发动机是否有异响',
//                 v: '1'
//             },
//             {
//               k:'工时费',
//               v:'￥100'
//             }
//         ]
//     }
// ]

var carcheck_Title;
var tmp = {}

var index = {
    mixins: [ItemMixin],
    render: function () {
    //   var mycar_data = []
    //   mycar1 = SA.getter('_GLOBAL').data.index;
    //   var mycar = [
    //     {
    //       title : mycar1[1].body.k+mycar1[2].body.k,
    //       img : '/images/service/bmw_icon.png'
    //     }
    //   ]

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
                  <List data={carcheck_Title} itemDefaultMethod={abcd} listClass={'s_m_list s_m_list_1 detection_mycar'} itemClass={'wid-12 '} itemView={Pt}/>
                </div>
              </div>
            </div>
            <footer>
              <div className={'service_foot'}>
                <div className={'container'}>
                  <ul>
                    <li className={'wid-8'}>
                      <span className={'foot_money'}>{'总价'}<i>{'￥790'}</i></span>
                      <span>{'￥480'}</span>
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

function init(ele, param, cb){
    SA.setter('_LOCAL_USER', getData, [ele, param, cb]);
}

function getData(ele, param, cb){

  var mycar = SA.getter('_GLOBAL').data.index;
  var _l_data  = SA.getter('_LOCAL_USER');    //登陆用户获取的信息
  if(_l_data){
      _l_user = _l_data.data;
      console.log(_l_user);

      if(_l_user.error){
          _l_user = false;
      }

      if(!_l_user.usercar && !index){
          _l_user = false;
      }

      if(!_l_user.addr && !index){
          _l_user = false;
      }

  }
  if(!_l_user && !mycar){
      router('addcar');
  }else{
      api.req('carchecking',{},function(data){
        console.log(data);
        carcheckData(data.results, ele, cb)
      })
  }


}
var ss =[];
function carcheckData(carcheck_data, ele, cb){
  console.log(carcheck_data);
  carcheck_Title = {
      body:[
        {
          k: '全车检测',
          v: <span>￥{carcheck_data[0].workprice}<i className="ifont icon-next"></i></span>
        }
      ],
      footer: []
  }
  carcheck_data[0].carcheckinglist.map(function(item, i){
    if(!tmp[item.car_checking_type]){
      tmp[item.car_checking_type]= []
      tmp[item.car_checking_type].push(
        {
          title: <em className={'title_detection_mycar'}><i className="ifont icon-creative"></i>{item.car_checking_type}</em>
        }
      )
      tmp[item.car_checking_type].push({
          k: item.car_checking_name,
          v: item.car_checking_status
      })
    }else{
      tmp[item.car_checking_type].push({
            k: item.car_checking_name,
            v: item.car_checking_status
        })
    }
  })
  var z = Object.keys(tmp);
  var ggg = []
  z.map(function(item, i){
    ggg = ggg.concat(tmp[item])

    // carcheck_Title
    // console.log(tmp[item][i]);
    // carcheck_Title.footer.push(
    //     {
    //       text: <em className={'title_detection_mycar'}><i className="ifont icon-creative"></i>{item}</em>
    //     },
    //     {
    //       k: tmp[item][i].kk,
    //       v: tmp[item][i]
    //     }
    // )
  })

  carcheck_Title.footer = ggg
  carcheck_Title.footer.push(
    {
      k: '工时费：',
      v: carcheck_data[0].workprice
    }
  )
  renderDom( ele, cb)
}

function abcd(){
    var the = this;
    var the_footer;
    var the_i;
    $(the).find('.hfoot').addClass('u-table')
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

var Index = React.createClass(index)

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
        <Index itemMethod={cb}/>,
        element
    )
}

module.exports = init;
