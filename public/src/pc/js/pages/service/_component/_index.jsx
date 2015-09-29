var libs = require('libs/libs');
var ItemMixin = require('mixins/item')

var mycar = [
  {
    title : '宝马7系（进口）760 Li 6.0T 2009-2014',
    img : '/images/service/bmw_icon.png'
  }
]
var mycar_data = []
mycar.map(function(item,i){
  mycar_data.push(
    <li>
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
var mycar_service_b = [
  {
    title : "小保养",
    old_money : "600",
    now_moeny : "480"
  },
  {
    title : "全车检测",
    old_money : "600",
    now_moeny : "480"
  }
]
var mycar_service_m = [
  [
  {
    title : "机油",
    money : "380"
  },
  {
    title : "机油滤清器",
    money : "140"
  },
  {
    title : "工时费",
    money : "60"
  }
  ],
  []
]
var mycar_service_s = [
  {
    title : "蓝桶专用机油 (4L,5W-30)",
    money : "188"
  },
  {
    title : "绿桶专用机油 (4L,5W-30)",
    money : "380"
  },
  {
    title : "全合成专用机油 (4L,5W-30)",
    money : "60"
  }
]
var mycar_service_data = []
var mycar_service_m_data = []

mycar_service_b.map(function(item,i){
  mycar_service_m.map(function(unit,j){
    if(unit.length){
      mycar_service_m_data.push(
        <li className={'s_m_l_s s_m_l_s_B'}>
          <div className={'hbody'}>
            <p>{mycar_service_m[j].title}</p>
            <span>{'￥'}{mycar_service_m[j].money}</span>
            <div className={'dot'}><i className={'className icon-next'}></i></div>
          </div>
        </li>
      )
    }
  })
  mycar_service_data.push(
    <li>
      <div className={'hbody'}>
        <p>{mycar_service_b[i].title}</p>
        <span><i>{'￥'}{mycar_service_b[i].old_money}</i>{'￥'}{mycar_service_b[i].now_moeny}</span>
        <div className={'dot'}><i className={'ifont icon-next'}></i></div>
      </div>
      <ul className={'s_m_u_l_u'}>
        {mycar_service_m_data[i]}
      </ul>
    </li>
  )
})
var mycar_service_s_data = []
mycar_service_s.map(function(item,i){
  mycar_service_s_data.push(
    <li>
      <div className={'hbody'}>
        <p>{mycar_service_s[i].title}</p>
        <span>¥{mycar_service_s[i].money}</span>
      </div>
    </li>
  )
})
var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
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
                  <div className={'s_m_list s_m_list_1 hlist'}>
                    <ul className={'item'}>
                      {mycar_service_data}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        )
    }
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

module.exports = renderDom;
