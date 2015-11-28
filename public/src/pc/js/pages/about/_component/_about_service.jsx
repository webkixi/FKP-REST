var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')
var router = require('libs/router').router

var myabout = []

var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'about'}>
              <div className={'about_zw service_about'}>
                <div className={'ser_abot'}>
                  <ul className={'hlist'}>
                    <li className={'item'}>
                      <div className={'hbody'}>
                        <i className={'ifont icon-car_oil'}></i>
                        <div className={'ser_abot_wz'}>
                            <em><i>01\</i><a>{'小保养'}</a></em>
                            <p>更换机油和机油滤芯并且免费赠送全车检测。</p>
                        </div>
                      </div>
                    </li>
                    <li className={'item'}>
                      <div className={'hbody'}>
                        <i className={'ifont icon-car_fixed'}></i>
                        <div className={'ser_abot_wz'}>
                            <em><i>02\</i><a>{'大保养'}</a></em>
                            <p>更换机油和机油滤芯、空气滤芯、汽油滤芯并且免费赠送全车检测。</p>
                        </div>
                      </div>
                    </li>
                    <li className={'item'}>
                      <div className={'hbody'}>
                        <i className={'ifont icon-car_repaire'}></i>
                        <div className={'ser_abot_wz'}>
                            <em><i>03\</i><a>{'全车检测'}</a></em>
                            <p>车辆的电器设备、发动机、传动系、行驶系、转向系等九大类全部检测。</p>
                        </div>
                      </div>
                    </li>

                    <li className={'item ser_abot_ifontleft'}>
                      <div className={'hbody'}>
                        <i className={'ifont icon-05iconaichegujia'}></i>
                        <div className={'ser_abot_wz'}>
                            <em><i>04\</i><a>{'爱车估价'}</a></em>
                            <p>在线车辆实时估价。</p>
                        </div>
                      </div>
                    </li>

                  </ul>
                </div>
                <div className={'ser_abot_img'}>
                    <img src="/images/about_service_pic.jpg"/>
                </div>
              </div>
            </div>
        )
    }
}

// <li className={'item'}>
//   <div className={'hbody'}>
//     <i className={'ifont icon-car_wash'}></i>
//     <em><a>{'洗车'}</a></em>
//   </div>
// </li>

// <li className={'item'}>
//   <div className={'hbody'}>
//     <i className={'ifont icon-car_more'}></i>
//     <em><a>{'更多'}</a></em>
//   </div>
// </li>

var Index = React.createClass(index)

function bindIndex(){
    router.clear()
}

function router2back(){
    router.cb = function(name){
        WeixinJSBridge.call('closeWindow')
    }
}

function renderDom(ele, cb){
    router2back()
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

module.exports = renderDom;
