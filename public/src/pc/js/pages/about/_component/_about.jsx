var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')
var router = require('libs/router').router

var myabout = [

]

var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
          <div className={'body'}>
            <div className={'wrapper'}>
              <div className={'row'}>
                <div className={'about'}>
                  <h2>{'关于河马云汽'}</h2>
                  <div className={'about_zw about_zw'}>
                    <img src="/images/about.jpg"/>
                    <div className={'about_p'}>
                      <p>河马云汽是中国领先的<span style={{color:'#fdc450'}}>“互联网+汽车服务”</span>企业，依托线下汽车4S实体店，开创性地建立了一揽子面向用户的互联网服务产品，<span style={{color:'#fdc450'}}>打造汽车全服务链条的O2O平台。</span></p>
                      <p><img src="/images/car/about01.png"></img></p>
                      <hr></hr>
                      <p>{'在前汽车市场，公司为消费者提供线上线下一体化的整车销售及平行进口车销售服务。'}</p>
                      <p><img src="/images/car/about02.png"></img></p>
                      <p>在后汽车市场，公司为车主提供覆盖上门洗车、上门保养、上门保险及上门二手车评估等全链条的汽车管家服务。</p>
                    </div>
                    <ul className={'about_ul'}>
                        <li>电话：020-38911638</li>
                        <li>传真：020-38911618</li>
                        <li>邮箱：cheqianchehou@kingvision.com.cn</li>
                        <li>地址：广州市白云区广州大道北1618号君华香柏广场F4</li>
                        <li>邮编：510510</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

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
