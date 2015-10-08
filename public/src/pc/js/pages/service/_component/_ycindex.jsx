var libs = require('libs/libs');
var Uls = require('modules/tabs/_component/uls')('Fours');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')
var pop = require('modules/pop/index')

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
                k: '小保养',
                v: <span>￥{'800'}<i className="ifont icon-next"></i></span>
            }
        ],
        footer: [
            {
                k: '机油',
                v: <span>￥{'380'}<i className="ifont icon-next"></i></span>
            },
            {
                k: '机油滤清器',
                v: <span>￥{'38'}<i className="ifont icon-next"></i></span>
            },
            {
                attr: 'fixed',
                k: '工时费',
                v: <span>￥{'68'}<i className="ifont icon-next"></i></span>
            }
        ]
    },
    {
        attr: 'fixed',
        body:[
            {
                k: '全车检测',
                v: <span>￥{'600'}<i className="ifont icon-roundcheck"></i></span>
            }
        ]
    }
]

var mycar_service_s = [
    {
        body:[
            {
                k: '蓝桶专用机油 (4L,5W-30)',
                v: "￥188"
            }
        ]
    },
    {
        body:[
            {
                k: '绿桶专用机油 (4L,5W-30)',
                v: "￥380"
            }
        ]
    },
    {
        body:[
            {
                k: '全合成专用机油 (4L,5W-30)',
                v: "￥60"
            }
        ]
    }
]

function popItemMethod(){
    $(this).click(function(){
        SA.setter('Pop',{data:{display:'none'}})
    })
}

function abcd(){
    pop({});
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
    $(the).find('.hfoot p').click(function(){
        if($(this).attr('data-src')==='fixed') return
        var kkk = <List data={mycar_service_s} itemMethod={popItemMethod} listClass={'xxx'} itemClass={'wid-12'} itemView={Pt}/>
        SA.setter('Pop',{data:{body:kkk, display:'block'}})
    })
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
                  <List data={mycar_service_b} itemDefaultMethod={abcd} listClass={'s_m_list s_m_list_1'} itemClass={'wid-12'} itemView={Pt}/>
                  <div className="ihaved">
                      <input value="0" ref="chkb" className="chk_1" type="checkbox"/>
                      <span ref="chkspan" className="chk_span" onClick={this.chkClick}></span>
                      <span>{"已有配件只需上门服务"}</span>
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
