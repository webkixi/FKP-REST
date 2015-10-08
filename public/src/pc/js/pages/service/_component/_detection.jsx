var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')

var mycar = [
  {
    title : '宝马7系（进口）760 Li 6.0T 2009-2014',
    img : '/images/service/bmw_icon.png'
  }
]
var mycar_data = []
mycar.map(function(item,i){
  mycar_data.push(
    <li key={'mycar'+i}>
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
        body:[
            {
                k: '全车检测',
                v: <span>￥{'800'}<i className="ifont icon-next"></i></span>
            }
        ],
        footer: [
            {
                text: <em><i className="ifont icon-creative"></i>{'电气设备'}</em>
            },
            {
                k: '检查车内外照明及信号装置工况',
                v: '1'
            },
            {
                k: '检查车内外后视镜工况',
                v: '1'
            },
            {
                k: '检查雨刮工况',
                v: '1'
            },
            {
                k: '检查喇叭',
                v: '1'
            },
            {
                k: '检查仪表',
                v: '1'
            },
            {
                k: '检查音响',
                v: '1'
            },
            {
                k: '检查空调',
                v: '1'
            },
            {
                k: '检查发动机是否有异响',
                v: '1'
            }
        ]
    }
]

function abcd(){
    var the = this;
    var the_footer;
    var the_i;
    $(the).find('.hbody').click(function(){
        the_i = $(this).find('i');
        the_footer = $(the).find('.hfoot');
        the_footer.toggleClass(function(){
            the_i.toggleClass('icon-next');
            the_i.toggleClass('icon-xla');
            return 'u-table'
        });
    });
}

var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
          <div className={'body'}>
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
                  <List data={mycar_service_b} itemDefaultMethod={abcd} listClass={'s_m_list s_m_list_1 detection_mycar'} itemClass={'wid-12 '} itemView={Pt}/>
                </div>
              </div>
            </div>
            <footer>
              <div className={'service_foot'}>
                <div className={'container'}>
                  <ul>
                    <li className={'wid-8'}>
                      <span className={'foot_money'}>{'总价'}<i>{'￥790'}</i></span>
                      <span>{'￥480'}</span>
                    </li>
                    <li className={'wid-4'}>
                      <a  className={'btn-link'}>{'下一步'}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </footer>
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
