var libs = require('libs/libs');
var ItemMixin = require('mixins/item');
var FLi = require('widgets/itemView/f_li');
var List = require('widgets/listView/list');
var api = require('libs/api');
var store = require('mixins/store');
var router = require('libs/router').router


var myaddress;
var _ComData = [];
var _ori_results_data = []
// var json = require('./_myaddress.json');
// myaddress = {
//     body:[
//         json.username,
//         json.phone
//     ],
//     footer: [],
//     dot: [
//         <a className="ifont icon-next" style={{right: "0.4rem", top: "0.7rem"}}></a>,
//     ]
// }
//
// json.address.map(function(item, i){
//     myaddress.footer.push(
//         {
//             k: item,
//             v: <a className="ifont icon-deletefill"></a>
//         }
//     )
// })

var index = {
    mixins: [store('Index'),ItemMixin],
    render: function () {
        var fdiv;
        var footer_div;
        if(_ComData.length)
          fdiv = <List data={_ComData} itemClass={'noclass'} itemMethod={abc} itemView={FLi}/>
        else
          footer_div = <a id="now" className={'btn-link'}>{'添加新地址'}</a>

        return(
            <div className={'index myaddress'}>
                <header>
                    {'我的地址'}
                </header>
                <article id="content">
                    <div className="addr_list">
                        {fdiv}
                    </div>
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
    var myaddressId = $(this).attr("data-id");
    var myaddressIdf = $(this).parents('li').attr("data-idf");

    console.log(myaddressIdf);
    _ori_results_data.splice( myaddressIdf, 1 )
    myaddressDate( _ori_results_data )

    var id = { id : myaddressId}

    api.req('order_deladdr',{type: 'delete',data: id},function(data){
      SA.setter('Index',{data: _ComData} );
    })
  })
}

function init(ele, param, cb){
    SA.setter('_LOCAL_USER', [getData], [[ele, param, cb]]);
}

function getData(ele, param, cb){
    console.log('aaaaaaa');
  var _l_data  = SA.getter('_LOCAL_USER');    //登陆用户获取的信息
  if(_l_data){
      _l_user = _l_data.data;
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
        api.req('order_addr',uid,function(data){
          if(data.results){
              _ori_results_data = data.results;
              myaddressDate(data.results)
              renderDom( ele, cb )
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

  // var mobile = { mobile: '13424804857'};
  // _ComData = [];
  // api.req('order_addr',mobile,function(data){
  //   if(data.results)
  //     myaddressDate(data.results, ele, cb)
  //   else
  //     renderDom( ele, cb)
  // })
}

function myaddressDate(myaddrDate){
    console.log('hhhhhhh');
    console.log(myaddrDate);
        _ComData=[]
        myaddrDate.map(function(itme, i){
        myaddress = {
                body:[
                    {
                      k:itme.username,
                      v:itme.mobile
                    }
                ],
                footer: [
                  {
                      k: itme.province + itme.county + itme.city + itme.street,
                      v: <a className="ifont icon-next"></a>
                  }
                ],
                dot: [
                    <a className="ifont icon-deletefill" style={{right: "0.4rem", top: "0.7rem"}} data-id={itme.id} data-aid={i}></a>,
                ]
        }
        _ComData.push(myaddress)
      })
      if(_ComData.length){
        console.log("xxx");
        $('#now').hide();
      }
      console.log(_ComData);

}


var bindIndex = function(){
  $('body').delegate('#now','click',function(){
      router('addaddress')
  })
}

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
        <Index data={data} itemDefaultMethod={bindIndex} itemMethod={cb}/>,
        element
    )
}

module.exports = init;
