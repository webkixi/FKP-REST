var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
var Pt = require('widgets/itemView/pic_title');
var List = require('widgets/listView/list');
var pop = require('modules/pop/index');
var api = require('libs/api');
var store = require('mixins/store');
var router = require('libs/router').router

var mycarlist_data = [];
var ori_data_results = [];
var xx =[];
var mycar_list =[]


var index = {
    mixins: [store('Index'),ItemMixin],
    render: function () {
      var fdiv;
      var footer_div;
      if(mycarlist_data.length)
        fdiv = <List data={mycarlist_data} listClass={'like_app_list like_app_list_mycar'} itemMethod={abc} itemClass={'wid-12'} itemView={Pt}/>
      else
        footer_div = <a id="now" className={'btn-link'}>{'添加新车辆'}</a>
        return(
            <div className={'index mycar'}>
                <header>
                    {'我的车'}
                </header>
                <article id="content">
                      {fdiv}
                </article>
                <footer>
                    {footer_div}
                </footer>
            </div>
        )
    }
}
function abc(){
  $(this).find('.icon-deletefill').click(function(){
    var ymli_data = $(this).attr("data-liid");
    var yma_data = $(this).attr("data-aid");
    console.log(yma_data);

    ori_data_results.splice( yma_data,1 )
    organizeData( ori_data_results )
      SA.setter('Index',{data: mycarlist_data});

    // mycarlist_data.splice(yma_data,1)

    var usercarid = { usercarid : ymli_data}

    console.log(usercarid);
    api.req('mycar_del',{type: 'delete',data:usercarid},function(data){
      console.log(data);
      //router('mycar')
    })
  })
}
var bindIndex = function(){
    router.clear()
    $('body').delegate('#now','click',function(){
        router('addcar')
    })
}

function init(ele, param, cb){
    // SA.setter('_LOCAL_USER', [getData], [[ele, param, cb]]);
    var luser = SA.getter('_LOCAL_USER')
    if(luser.data.error==="-1")
        SA.setter('_LOCAL_USER', [getData], [[ele, param, cb]]);
    else{
        getData(ele, param, cb)
    }
}

function getData(ele, param, cb){
  var _l_data  = SA.getter('_LOCAL_USER');    //登陆用户获取的信息
  if(_l_data){
      _l_user = _l_data.data;
      console.log('-----my car----');
      console.log(_l_user);

      if(_l_user.error){
          _l_user = false;
      }

      if(!_l_user.uid){
          _l_user = false;
      }
      var uid;
      if(_l_user){
          uid = { uid: _l_user.uid}
      }
      if(uid){
        api.req('mycarlist',uid,function(data){
          console.log(data);
          if(data.results){
              ori_data_results = data.results;
              organizeData(data.results, ele, cb)
              renderDom( ele, cb)
          }else{
            renderDom( ele, cb)
          }
        })
      }else{
          router('reg_log')
      }
  }else{
      router('reg_log')
  }
}

function organizeData(oridata){
    console.log('yyyyyy');
    mycarlist_data = [];
  oridata.map(function(item,i){
    mycar_list = {
      //title: item.usercarid,
      attr: item.usercarid,
      img: "/images/demo/aclass/b2.jpg",
      body:[
          item.carseries + item.cartype,
          {
              k: "车牌号：",
              v: item.plateno
          }
      ],
      dot: <div><a data-liid={item.usercarid} data-aid={i} className="ifont icon-deletefill"></a></div>
    }
    mycarlist_data.push( mycar_list )
  })
}

//dot: <div><a className="ifont icon-next"></a><a data-liid={item.usercarid} data-aid={i} className="ifont icon-deletefill"></a></div>




var Index = React.createClass(index);
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
        <Index data={data}  itemDefaultMethod={bindIndex} itemMethod={cb}/>,
        element
    )
}

module.exports = init;
