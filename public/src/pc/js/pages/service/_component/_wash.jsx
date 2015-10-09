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


var wash_service_mycar = [
    {
        body:[
            {
                  k: '外观清洗',
                v: <span>￥{'5'}<i className="ifont icon-next"></i></span>
            }
        ],
        footer: [
            {
                k: '洗车工时费',
                v: <span>￥{'5'}</span>
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
    chkClick: function(){
        var chkspan = React.findDOMNode(this.refs.chkspan);
        $(chkspan).toggleClass('active');

        var chkb = React.findDOMNode(this.refs.chkb);
        if($(chkspan).hasClass('active'))
            chkb.value="1"
        else {
            chkb.value="0"
        }
    },
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
                  <List data={wash_service_mycar} itemDefaultMethod={abcd} listClass={'s_m_list s_m_list_1'} itemClass={'wid-12'} itemView={Pt}/>
                </div>
              </div>
            </div>
            <footer>
              <div className={'service_foot'}>
                <div className={'container'}>
                  <ul>
                    <li className={'wid-8'}>
                      <span className={'foot_money'}>{'总价'}<i>{'￥35'}</i></span>
                      <span>{'￥5'}</span>
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
