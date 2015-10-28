var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
var FDiv = require('widgets/itemView/f_div');
var api = require('pages/_common/api');
var store = require('mixins/store');
var router = require('libs/router').router


var myaddress;

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

function getData(ele, param, cb){
  var mobile = { mobile: '13424804857'};
  api.req('order_addr',mobile,function(data){
    console.log(data);
    myaddressDate(data.results, ele, cb)
  })
}
function myaddressDate(myaddrDate,ele, cb){
  console.log(myaddrDate);
  myaddress = {
      body:[
          //myaddrDate[0].username,

          '林小姐',
          myaddrDate[0].mobile
      ],
      footer: [
        {
            k: myaddrDate[0].province + myaddrDate[0].county + myaddrDate[0].city + myaddrDate[0].street,
            v: <a className="ifont icon-next"></a>
        }
      ],
      dot: [
          <a className="ifont icon-deletefill" style={{right: "0.4rem", top: "0.7rem"}} data-id={myaddrDate[0].id}></a>,
      ]
  }
  renderDom( ele, cb)
}


var index = {
    mixins: [ItemMixin],
    render: function () {
        var fdiv;
        if(myaddress.footer.length)
            fdiv = <FDiv data={myaddress} itemClass={'noclass'} itemDefaultMethod={abc}/>
        return(
            <div className={'index myaddress'}>
                <header>
                    {'我的地址'}
                </header>
                <article id="content">
                    <div className="like_app_list">
                        {fdiv}
                    </div>
                </article>
                <footer>
                    <a id="now" className={'btn-link'}>{'添加新地址'}</a>
                </footer>
            </div>
        )
    }
}

// function abc(){
//   $(this).find('.icon-deletefill').click(function(){
//     var myaddressId = $(this).attr("data-id");
//     myaddress.splice(myaddressId,1)
//     var id = { id : myaddressId}
//     api.req('order_deladdr',{type: 'delete',data: id},function(data){
//       SA.setter('Index',{data: myaddress} );
//       //router('mycar')
//     })
//   })
// }

var bindIndex = function(){
  $("#now").click(function(){
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

module.exports = getData;
