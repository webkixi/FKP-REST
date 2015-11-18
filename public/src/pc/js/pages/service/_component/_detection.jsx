var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')
var api = require('libs/api');
var store = require('mixins/store');
var router = require('libs/router').router

var carcheck_Title;
var _totolpic;
var _form = {}

var index = {
    mixins: [ItemMixin],
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

      var cc_title = this.props.data;

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
        return(
          <div className={'body'}>
            <div className={'wrapper'}>
              <div className={'row'}>
                <div className={'service_mycar'}>
                  <h2>
                      <i id="back" className={'ifont icon-pre'}></i>
                      我的车辆
                  </h2>
                  <div className={'s_m_list hlist'}>
                    <ul className={'item'}>
                      {mycar_data}
                    </ul>
                  </div>
                </div>
                <div className={'service_mycar srvice_myservice'}>
                  <h2>我的服务项目</h2>
                  <List data={cc_title} itemDefaultMethod={abcd} listClass={'s_m_list s_m_list_1 detection_mycar'} itemClass={'wid-12 '} itemView={Pt}/>
                </div>
              </div>
            </div>
            <footer>
              <div className={'service_foot'}>
                <div className={'container'}>
                  <ul>
                    <li className={'wid-8'}>
                      <span className={'foot_money'}>{'总价'}<s>{'￥790'}</s></span>
                      <span>{'¥'+_totolpic}</span>
                    </li>
                    <li className={'wid-4'}>
                      <a id={'now'} className={'btn-link'}>{'下一步'}</a>
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
    router.clear()
    $("#now").click(function(){
        var detectionDate = carcheck_Title

        var form = {};

        //car form
        carData = _l_user
        ? _l_user.usercar[0]
        : SA.getter('_GLOBAL').data.index.form
        form = libs.extend({}, _form)
        form.car = carData;
        detectionDate.form = form;
        SA.setter('_GLOBAL', { index: detectionDate })
        router("order")
    })

    $('#back').click(function(){
        router('/');
    })
}

function init(ele, param, cb){
    var luser = SA.getter('_LOCAL_USER')
    if(luser.data.error && luser.data.error==="-1"){
        SA.setter('_LOCAL_USER', getData, [ele, param, cb]);
    }
    else{
        getData(ele, param, cb)
    }
}

function getData(ele, param, cb){

  var mycar = SA.getter('_GLOBAL').data.index;
  var _l_data  = SA.getter('_LOCAL_USER');    //登陆用户获取的信息
  if(_l_data){
      _l_user = _l_data.data;

      if(_l_user.error){
          _l_user = false;
      }
  }
  if(!_l_user && !mycar){
      router('addcar');
  }else{
      if(!_l_user.usercar && !mycar){
          router('addcar');
      }else{
          api.req('carchecking',{},function(data){
              if(data.code && data.code===1){
                  carcheckData(data.results, ele, cb)
              }else{
                  console.log('获取数据出错');
              }
          })
      }
  }


}
var ss =[];
function carcheckData(carcheck_data, ele, cb){
  _form.servicetypeno = carcheck_data[0].servicetypeno   //服务类型
  _form.servicetypename = carcheck_data[0].servicetypename   //服务类型
  _totolpic =carcheck_data[0].workprice;
  var tmp = {};
  var tmp_carcheck_Title = {
      title:[
        {
          k: '全车检测',
          v: <p>{'¥'+_totolpic}<i className="ifont icon-xla"></i></p>
        }
      ]
  }
  tmp_carcheck_Title.body = []
  tmp_carcheck_Title.footer = []
  carcheck_data[0].carcheckinglist.map(function(item, i){
    if(!tmp[item.car_checking_type]){
      tmp[item.car_checking_type]= []
      tmp[item.car_checking_type].push(
        {
          title: <p><em className={'title_detection_mycar'}><i className="ifont icon-creative"></i>{item.car_checking_type}</em></p>
        }
      )
      tmp[item.car_checking_type].push({
          k: item.car_checking_name
      })
    }else{
      tmp[item.car_checking_type].push({
            k: item.car_checking_name
        })
    }
  })
  var z = Object.keys(tmp);
  var ggg = []
  z.map(function(item, i){
    ggg = ggg.concat(tmp[item])

  })

  tmp_carcheck_Title.body = ggg
  tmp_carcheck_Title.footer.push(
    {
      k: '工时费',
      v: <span>{'¥'+_totolpic}</span>,
      s: _totolpic
    }
  )
  carcheck_Title = tmp_carcheck_Title;
  renderDom( ele, cb)
}

function abcd(){
    var the = this;
    var the_footer;
    var the_i;
    $(the).find('.hbody').addClass('u-table')
    $(the).find('.hheader').click(function(){
        the_i = $(this).find('i');
        the_footer = $(the).find('.hbody');
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
        <Index data={carcheck_Title} itemDefaultMethod={bindIndex} itemMethod={cb}/>,
        element
    )
}

module.exports = init;
