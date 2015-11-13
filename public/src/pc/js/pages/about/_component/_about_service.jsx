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
          <div className={'body'}>
            <div className={'wrapper'}>
              <div className={'row'}>
                <div className={'about'}>
                  <h2>{'服务项目'}</h2>
                  <div className={'about_zw service_about'}>
                    <h3>{'河马云汽，养车就上河马云汽'}</h3>
                    <img src="/images/about_service.jpg"/>
                    <div className={'ser_abot'}>
                      <h4>{'提供服务项目'}</h4>
                      <ul className={'hlist'}>
                        <li className={'item wid-4'}>
                          <div className={'hbody'}>
                            <i className={'ifont icon-car_oil'}></i>
                            <em><a>{'小保养'}</a></em>
                          </div>
                        </li>
                        <li className={'item wid-4'}>
                          <div className={'hbody'}>
                            <i className={'ifont icon-car_fixed'}></i>
                            <em><a>{'大保养'}</a></em>
                          </div>
                        </li>
                        <li className={'item wid-4'}>
                          <div className={'hbody'}>
                            <i className={'ifont icon-car_repaire'}></i>
                            <em><a>{'全车检测'}</a></em>
                          </div>
                        </li>

                        <li className={'item wid-4'}>
                          <div className={'hbody'}>
                            <i className={'ifont icon-05iconaichegujia'}></i>
                            <em><a>{'爱车估价'}</a></em>
                          </div>
                        </li>

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

// <li className={'item wid-4'}>
//   <div className={'hbody'}>
//     <i className={'ifont icon-car_wash'}></i>
//     <em><a>{'洗车'}</a></em>
//   </div>
// </li>

// <li className={'item wid-4'}>
//   <div className={'hbody'}>
//     <i className={'ifont icon-car_more'}></i>
//     <em><a>{'更多'}</a></em>
//   </div>
// </li>

var Index = React.createClass(index)

function bindIndex(){
    router.clear()
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

module.exports = renderDom;
