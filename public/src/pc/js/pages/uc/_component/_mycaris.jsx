var libs = require('libs/libs');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')


var mycaris_data = [
    {
        body:[
            '1',
            '前刹车片',
            '2015/6/16',
            '3',
            '2.5',
            '正常'
        ]
    },
    {
      body:[
          '2',
          '前刹车片',
          '2015/6/16',
          '3',
          '2.5',
          '正常'
      ]
    },
    {
      body:[
          '3',
          '前刹车片',
          '2015/6/16',
          '3',
          '2.5',
          '正常'
      ]
    },
    {
      body:[
          '4',
          '前刹车片',
          '2015/6/16',
          '3',
          '2.5',
          '正常'
      ]
    }
]
mycaris_data.unshift(
  {
    body:[
        '序号',
        '易损件',
        '更换日期',
        '最大值',
        '当前值',
        '检测结果'
    ]
  }
)

var estimate = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index mycaris'}>
                <header>
                    {'我的车况'}
                </header>
                <article>
                  <div className={'order_table_mycar'}>
                    <List data={mycaris_data}  listClass={'foot_order_table_mycar'}  itemClass={'wid-2'} itemView={Pt}/>
                  </div>
                </article>
            </div>
        )
    }
}

var Esti = React.createClass(estimate)

function defaultMethod(){
    $('.profile .carlog .hbody p').each(function(i, item){
        if(i%2===0){
            $(item).css({
                position: "absolute",
                left: "0",
                top: i*2+"rem"
            })
            $(item).addClass('left')
            if(i===0){
                $(item).addClass('left-first')
            }
        }else{
            $(item).css({
                position: "absolute",
                right: "0",
                top: i*2+"rem"
            })
            $(item).addClass('right')
            if(i===1){
                $(item).addClass('right-first')
            }
        }
    })
}

function renderDom(ele, data, cb){

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
        <Esti data={data} itemDefaultMethod={defaultMethod} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
