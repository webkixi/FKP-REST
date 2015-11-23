var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')
var router = require('libs/router').router

var myabout = [];

var index = {
    mixins: [ItemMixin],
    checkWx: function(){
        var wx = SA.getter('_WEIXIN').data;
        console.log('微信用户数据');
        console.log(wx);
        if(wx.user.openid){
            return true;
        }
        else {
            return false;
        }
    },
    render: function () {
        var wx = this.checkWx();
        var gujia = <div className={'hbody'}>
          <i className={'ifont icon-05iconaichegujia'}></i>
          <em><a>{'爱车估价'}</a></em>
        </div>
        if(!wx){
            gujia = <div className={'hbody'}>
              <i className={'ifont icon-05iconaichegujia'}></i>
              <em><a>{'爱车估价.'}</a></em>
            </div>
        }

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

                <li className={'item'} data-check={'car_fixed'}>
                  {gujia}
                </li>
              </ul>
            </div>
        )
    }
}

// <li className={'item'} data-check={'service.html#wash'}>
//   <div className={'hbody'}>
//     <i className={'ifont icon-car_wash'}></i>
//     <em><a>{'洗车'}</a></em>
//   </div>
// </li>

// <li className={'item'} data-check={'index.html'}>
//   {more}
// </li>


// var aaa = function(){
//     var abc = SA.getter('_WEIXIN').data.user;
//     console.log(abc);
//     if(abc)
//         alert('您好：'+abc.nickname)
// }
//
// var test = function(){
//     aaa();
// }

var Index = React.createClass(index)

function bindIndex(){
    router.clear()
}

function router2back(){
    router.cb = function(name){
        WeixinJSBridge.call('closeWindow')
    }
}

function  init( ele, cb ){
    router2back()
    var wx = SA.getter('_WEIXIN')
    if(!wx.data.user)
        SA.setter('_WEIXIN', renderDom, [ele, cb]);
    else{
        renderDom(ele, cb)
    }
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

module.exports = init;
