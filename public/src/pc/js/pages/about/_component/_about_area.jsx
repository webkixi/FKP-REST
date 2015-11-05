var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')

var myabout = [
    {
        body:[
            '越秀区'
        ]
    },
    {
        body:[
            '荔湾区'
        ]
    },
    {
        body:[
            '海珠区'
        ]
    },
    {
        body:[
            '天河区'
        ]
    },
    {
        body:[
            '白云区'
        ]
    },
    {
        body:[
            '黄埔区'
        ]
    },
    {
        body:[
            '番禺区'
        ]
    },
    {
        body:[
            '花都区'
        ]
    },
    {
        body:[
            '南沙区'
        ]
    },
    {
        body:[
            '增城区'
        ]
    },
    {
        body:[
            '从化区'
        ]
    }
]
var myabout_data = []
myabout.map(function(item,i){
  myabout_data.push(
    <li className={'item wid-4'}>
      <div className={'hbody'}>
        <p>{myabout[i].body[0]}</p>
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
                  <h2>{'服务区域'}</h2>
                  <div className={'about_zw area_about'}>
                    <h3>{'河马云汽服务范围'}<em>{'有您的地方就有河马云汽'}</em></h3>
                    <div className={'ser_abot'}>
                      <h4>{'目前河马云汽养车已经覆盖全广州'}</h4>
                      <ul className={'hlist'}>
                        {myabout_data}
                        <li className={'item wid-4 del-wz'}>
                          <div className={'hbody'}>
                            <p>更多</p>
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
