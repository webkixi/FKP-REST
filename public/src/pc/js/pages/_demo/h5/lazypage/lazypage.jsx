

var
test_goods = [
  {'id':1,'title':'haha','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':2,'title':'good','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':3,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':4,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':5,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':6,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':7,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':8,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':9,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':10,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':11,'title':'haha','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':12,'title':'good','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':13,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':14,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':15,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':16,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':17,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':18,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':19,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'},
  {'id':20,'title':'ni mei a','lsrc':'/images/index/mn.jpg','src':'/images/index/1F_01.jpg'}
];


var
second_goods = [
  {'id':11,'title':'haha'},
  {'id':12,'title':'good'},
  {'id':13,'title':'ni mei a'},
  {'id':14,'title':'ni mei a'},
  {'id':15,'title':'ni mei a'},
  {'id':16,'title':'ni mei a'},
  {'id':17,'title':'ni mei a'},
  {'id':18,'title':'ni mei a'},
  {'id':19,'title':'ni mei a'},
  {'id':20,'title':'ni mei a'}
];



//react LoadList实例

var
ItemVIEW = require('widgets/itemView/itemView'),
LoadList = require('modules/list/loadlist'),
LazyList = require('modules/list/lazylist'),
render = React.render;


/********
* 回调函数
**********/

//循环数据
var loops = function(item){
    return <ItemVIEW id={'test'+item.id} data-id={item.id} className="span6">
              <div className="home-good__img __home-img-x2">
                  <a href="#"><img src={item.src} alt=""/></a>
              </div>
              <div className="home-good__text">
                  <h3 className="home-good__title"><a href="#">MANDA L曼德尔床架</a></h3>
                  <div className="home-good__description">
                      胡桃木饰面+茶镜 1200*500*1800
                  </div>
                  <div className="home-good__price">
                      ¥ 3,999
                  </div>
                  <div className="home-good__action">
                      <a href="#" className="btn btn-primary">查看详情</a>
                  </div>
              </div>
          </ItemVIEW>
};



function lazyFun(){
    var imgs = document.getElementsByTagName('img');
    return {
      'elements': imgs,
      'datas': test_goods
    }
    // lazyLoad.call(this,imgs,test_goods);
}

render(
  <LazyList
    loop={loops}   //循环item
    datas={test_goods}   //用于更新的数据
    span={6}
    lazy={lazyFun}
  > </LazyList>
  ,document.getElementById('good')
);



module.exports = {};


//参考
// from http://jsfiddle.net/aabeL/1/
// https://github.com/jeroencoumans/react-scroll-components
// https://github.com/guillaumervls/react-infinite-scroll
// http://levi.cg.am/archives/3099   //getBoundingClientRect
//
// http://www.cnblogs.com/dingyingsi/archive/2013/09/24/3337813.html   scrollHeight
