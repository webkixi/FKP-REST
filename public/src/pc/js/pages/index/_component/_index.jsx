var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')

var myabout = [];

var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'com_index'}>
              <ul className={'hlist'}>
                <li className={'item'} data-check={'service.html#index'}>
                  <div className={'hbody'}>
                    <i className={'ifont icon-car_oil'}></i>
                    <em><a>{'小保养'}</a></em>
                  </div>
                </li>
                <li className={'item'} data-check={'service.html#dby'}>
                  <div className={'hbody'}>
                    <i className={'ifont icon-car_fixed'}></i>
                    <em><a>{'大保养'}</a></em>
                  </div>
                </li>
                <li className={'item'} data-check={'service.html#detection'}>
                  <div className={'hbody'}>
                    <i className={'ifont icon-car_repaire'}></i>
                    <em><a>{'全车检测'}</a></em>
                  </div>
                </li>
                <li className={'item'} data-check={'service.html#wash'}>
                  <div className={'hbody'}>
                    <i className={'ifont icon-car_wash'}></i>
                    <em><a>{'洗车'}</a></em>
                  </div>
                </li>
                <li className={'item'} data-check={'booking.html'}>
                  <div className={'hbody'}>
                    <i className={'ifont icon-car_fixed'}></i>
                    <em><a>{'爱车估价'}</a></em>
                  </div>
                </li>
                <li className={'item'} data-check={'index.html'}>
                  <div className={'hbody'}>
                    <i className={'ifont icon-car_more'}></i>
                    <em><a>{'更多'}</a></em>
                  </div>
                </li>
              </ul>
            </div>
        )
    }
}


var aaa = function(){
    var abc = SA.getter('_WEIXIN').data.user;
    if(abc)
        alert('您好：'+abc.nickname)
}

var test = function(){
    aaa();
}

var Index = React.createClass(index)

function renderDom(ele, cb){
    SA.setter('_WEIXIN',[aaa])
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
        <Index itemDefaultMethod={test} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
