var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')


var mycar_service_order = [
    {
        body:[
            '机油',
            '1',
            '￥380'
        ]
    },
    {
      body:[
          '机油滤清器',
          '1',
          '￥38'
      ]
    },
    {
      body:[
          '工时',
          '1',
          '￥68'
      ]
    },
    {
      body:[
          '全车检测',
          '1',
          '￥0'
      ]
    }
]
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
        '4',
        '￥1000'
    ]
  }
)

var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'wrapper'}>
              <div className={'row'}>
                <div className={'service_mycar'}>
                  <h2>{'个人信息'}</h2>
                </div>
                <div className={'srvice_myorder'}>
                    <ul className={'message_over_order_mycar'}>
                      <li className={'item'}>
                        <div className={'hheader'}>
                          <img src="/images/tx_pic.png" />
                        </div>
                        <div className={'hbody'}>
                          <div className={'hbody_div'}>
                            <em>林小姐</em>
                            <span>13839487654</span>
                          </div>
                          <p>亲，暂无您地址信息，<a>请点击获取</a></p>
                        </div>
                      </li>
                    </ul>
                    <div className={'obtain_info'}>
                      <a className={'btn-link btn-link2'}><i className={'ifont icon-add'}></i>获取当前位置</a>
                      <a className={'btn-link btn-link2'}><i className={'ifont icon-add'}></i>添加地址</a>
                    </div>
                    <div id="timer" className="layout">
                        <label>预约时间</label>
                        <div className="box">
                            <p>2015年8月18日上午</p>
                        </div>
                    </div>
                </div>
                <div className={'service_mycar srvice_myservice'}>
                  <h2>我的订单</h2>
                  <div className={'order_table_mycar'}>
                    <List data={mycar_service_order}  listClass={'foot_order_table_mycar'}  itemClass={'wid-12'} itemView={Pt}/>
                  </div>
                </div>
                <div className={'service_mycar pay_mycar'}>
                  <div className={'title_pay_mycar'}>
                    <h2>选择支付方式</h2>
                    <ul className={'pay_icon_mycar'}>
                      <li>
                        <input type='radio'/>
                        <i className={'ifont icon-roundcheckfill'}></i>
                        <span>微信</span>
                      </li>
                      <li>
                        <input type='radio'/>
                        <i className={'ifont icon-roundcheck'}></i>
                        <span>支付宝</span>
                      </li>
                    </ul>
                  </div>
                  <a id="now" className={'btn-link'}>{'支付'}</a>
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
