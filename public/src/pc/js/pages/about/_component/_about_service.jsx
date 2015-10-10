var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')

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
                    <h3>{'车叮咚，养车就上车叮咚'}</h3>
                    <img src="/images/about_service.jpg"/>
                    <div className={'ser_abot'}>
                      <h4>{'提供服务项目'}</h4>
                      <ul className={'hlist'}>
                        <li className={'item wid-4'}>
                          <div className={'hbody'}>
                            <i className={'ifont icon-calendar'}></i>
                            <em>{'小保养'}</em>
                          </div>
                        </li>
                        <li className={'item wid-4'}>
                          <div className={'hbody'}>
                            <i className={'ifont icon-calendar'}></i>
                            <em>{'大保养'}</em>
                          </div>
                        </li>
                        <li className={'item wid-4'}>
                          <div className={'hbody'}>
                            <i className={'ifont icon-calendar'}></i>
                            <em>{'小保养'}</em>
                          </div>
                        </li>
                        <li className={'item wid-4'}>
                          <div className={'hbody'}>
                            <i className={'ifont icon-calendar'}></i>
                            <em>{'小保养'}</em>
                          </div>
                        </li>
                        <li className={'item wid-4'}>
                          <div className={'hbody'}>
                            <i className={'ifont icon-calendar'}></i>
                            <em>{'小保养'}</em>
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
