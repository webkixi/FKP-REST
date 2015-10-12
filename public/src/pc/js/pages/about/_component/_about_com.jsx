var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')

var myabout = [
    {
        body:[
            '预约服务',
            '手机微信预约下单。'
        ]
    },
    {
        body:[
            '确定上门时间',
            '客户下单完成后，客服人员会致电客户确认具体的时间和地点、安排服务车上门。'
        ]
    },
    {
        body:[
            '现场准备',
            '服务车抵达目的地后，技师致电与客户沟通见面；做好场地与服务工具准备工作，确认保养项目，准备施工。'
        ]
    },
    {
        body:[
            '全车检测',
            '技师对车辆进行全方位的检测，使用专业设备对蓄电池、发动机油液、轮胎、轮胎、底盘、制动系统等车辆关键部位进行检测，记录检测结果，并与客户确认车辆无需送修后，开始进行保养。'
        ]
    },
    {
        body:[
            '保养作业',
            '技师与客户确认使用配件，按服务项目更换所需部件，进行保养。并对服务过程进行拍照。'
        ]
    },
    {
        body:[
            '客户验收',
            '客户确认服务项目，并对签字确认服务项目。'
        ]
    },
    {
        body:[
            '清理场地',
            '技师完成服务后清理服务场地，整理服务工具后离开。'
        ]
    }
]
var myabout_data = []
myabout.map(function(item,i){
  myabout_data.push(
    <li className={'item'}>
      <div className={'hbody'}>
        <em><i>{i+1}</i>{myabout[i].body[0]}</em>
        <p>{myabout[i].body[1]}</p>
      </div>
    </li>
  )
})

var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
          <div className={'body'}>
            <div className={'wrapper'}>
              <div className={'row'}>
                <div className={'about'}>
                  <h2>{'关于车叮咚'}</h2>
                  <div className={'about_zw com_about'}>
                    <div className={'ser_abot'}>
                      <ul className={'hlist'}>
                        {myabout_data}
                      </ul>
                    </div>
                  </div>
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
