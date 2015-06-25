
var
test_goods = [
  {'id':1,'title':'haha'},
  {'id':2,'title':'good'},
  {'id':3,'title':'ni mei a'},
  {'id':4,'title':'ni mei a'},
  {'id':5,'title':'ni mei a'},
  {'id':6,'title':'ni mei a'},
  {'id':7,'title':'ni mei a'},
  {'id':8,'title':'ni mei a'},
  {'id':9,'title':'ni mei a'},
  {'id':10,'title':'ni mei a'}
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
LoadList = require('./loadlist'),
LazyList = require('./lazylist'),
ItemVIEW = require('./item'),
render = React.render;


/********
* 回调函数
**********/

// //循环数据
// var loops = function(){
//     return <ItemVIEW className="span3">
//               <div className="home-good__img __home-img-x2">
//                   <a href="#"><img src="/images/index/1F_01.jpg" alt=""/></a>
//               </div>
//               <div className="home-good__text">
//                   <h3 className="home-good__title"><a href="#">MANDA L曼德尔床架</a></h3>
//                   <div className="home-good__description">
//                       胡桃木饰面+茶镜 1200*500*1800
//                   </div>
//                   <div className="home-good__price">
//                       ¥ 3,999
//                   </div>
//                   <div className="home-good__action">
//                       <a href="#" className="btn btn-primary">查看详情</a>
//                   </div>
//               </div>
//           </ItemVIEW>
// };
//
//
// //scroll结束调用函数
// function gunOver(){
//     test_goods = test_goods.concat(second_goods);
//     this.setState({
//       datas:test_goods
//     })
// }
//
// render(
// 	<LoadList
// 		loop={loops}   //循环item
//     datas={test_goods}   //用于更新的数据
// 		span={3}
// 		onscrollend={gunOver}    //scroll over 方法
// 	> </LoadList>
// 	,document.getElementById('good')
// );





function lazyFun(){
    // alert('aaaaaaaaaaaaaaaa');
    var imgs = document.getElementsByTagName('img');
    lazyLoad(imgs);
}

render(
	<LazyList
		loop={loops}   //循环item
    datas={test_goods}   //用于更新的数据
		span={6}
    lazy={lazyFun}
	> </LazyList>
	,document.getElementById('good')
)

module.exports = {};


var
lazyLoad = function(elements){
  getOffset = libs.getOffset;
  DocmentView = libs.DocmentView;
  elements = libs.arg2arr(elements);


  var settings = {
      threshold       : 0,
      failure_limit   : 0,
      event           : "scroll",
      effect          : "show",
      container       : window,
      data_attribute  : "original",
      skip_invisible  : true,
      appear          : null,
      load            : null,
      error           : null,
      complete        : null,
      placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
  };

  function update() {
      var counter = 0;
      elements.forEach(function(element) {
          // var $this = $(this);
          // if (settings.skip_invisible && !$this.is(":visible")) {
          //     return;
          // }
          if (abovethetop(element, settings) ||
              leftofbegin(element, settings)) {
                  /* Nothing. */
          } else if (!belowthefold(element, settings) &&
              !rightoffold(element, settings)) {
                  // $this.trigger("appear");
                  /* if we found an image we'll load, reset the counter */
                  counter = 0;
          } else {
              if (++counter > settings.failure_limit) {
                  return false;
              }
          }
      });
  }


  elements.forEach(function(element) {
      var self = element;
      // var $self = $(self);

      self.loaded = false;

      /* If no src attribute given use data:uri. */
      if ($self.attr("src") === undefined || $self.attr("src") === false) {
          $self.attr("src", settings.placeholder);
      }

      /* When appear is triggered load original image. */
      $self.one("appear", function() {
          if (!this.loaded) {
              if (settings.appear) {
                  var elements_left = elements.length;
                  settings.appear.call(self, elements_left, settings);
              }
              $("<img />")
                  .bind("load", function() {
                      var original = $self.data(settings.data_attribute);
                      $self.hide();
                      if ($self.is("img")) {
                          $self.attr("src", original);
                      } else {
                          $self.css("background-image", "url('" + original + "')");
                      }
                      $self[settings.effect](settings.effect_speed);

                      self.loaded = true;

                      /* Remove image from array so it is not looped next time. */
                      elements = elements.not(self);

                      if (settings.load) {
                          var elements_left = elements.length;
                          settings.load.call(self, elements_left, settings);
                      }

                      if (settings.complete && elements.length === 0) {
                          settings.complete.call();
                      }
                  })
                  .bind("error", function() {
                      /* Remove image from array so it is not looped next time. */
                      elements = elements.not(self);
                      var elements_left = elements.length;

                      if (settings.complete && elements_left === 0) {
                          settings.complete.call();
                      }

                      if (settings.error) {
                          settings.error.call(self, elements_left, settings);
                      }
                  })
                  .attr("src", $self.data(settings.data_attribute));
          }
      });

      /* When wanted event is triggered load original image */
      /* by triggering appear.                              */
      if (0 !== settings.event.indexOf("scroll")) {
          $self.bind(settings.event, function() {
              if (!self.loaded) {
                  $self.trigger("appear");
              }
          });
      }
  });


  belowthefold = function(element, settings) {
      var fold;
      if (settings.container === undefined || settings.container === window) {
          fold = (window.innerHeight ? window.innerHeight : DocmentView().height) + getOffset().top;
      } else {
          fold = getOffset(settings.container).top + getOffset(settings.container).height;
      }
      return fold <= getOffset(element).top - settings.threshold;
  };

  rightoffold = function(element, settings) {
      var fold;

      if (settings.container === undefined || settings.container === window) {
          fold = DocmentView().width + getOffset().left;
      } else {
          fold = getOffset(settings.container).left + getOffset(settings.container).width;
      }

      return fold <= getOffset(element).left - settings.threshold;
  };

  abovethetop = function(element, settings) {
      var fold;

      if (settings.container === undefined || settings.container === window) {
          fold = getOffset().top;
      } else {
          fold = getOffset(settings.container).top;
      }

      return fold >= getOffset(element).top + settings.threshold  + getOffset(element).height;
  };
  leftofbegin = function(element, settings) {
      var fold;

      if (settings.container === undefined || settings.container === window) {
          fold = getOffset().left;
      } else {
          fold = getOffset(settings.container).left;
      }
      return fold >= getOffset(element).left + settings.threshold + getOffset(element).width;
  };
  inviewport = function(element, settings) {
      return !rightoffold(element, settings) && !leftofbegin(element, settings) &&
        !belowthefold(element, settings) && !abovethetop(element, settings);
  };

  update();
}

/*
$.belowthefold = function(element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
        fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
    } else {
        fold = $(settings.container).offset().top + $(settings.container).height();
    }

    return fold <= $(element).offset().top - settings.threshold;
};

$.rightoffold = function(element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
        fold = $window.width() + $window.scrollLeft();
    } else {
        fold = $(settings.container).offset().left + $(settings.container).width();
    }

    return fold <= $(element).offset().left - settings.threshold;
};

$.abovethetop = function(element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
        fold = $window.scrollTop();
    } else {
        fold = $(settings.container).offset().top;
    }

    return fold >= $(element).offset().top + settings.threshold  + $(element).height();
};

$.leftofbegin = function(element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
        fold = $window.scrollLeft();
    } else {
        fold = $(settings.container).offset().left;
    }

    return fold >= $(element).offset().left + settings.threshold + $(element).width();
};

$.inviewport = function(element, settings) {
     return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
            !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
 };
*/




//参考
// from http://jsfiddle.net/aabeL/1/
// https://github.com/jeroencoumans/react-scroll-components
// https://github.com/guillaumervls/react-infinite-scroll
// http://levi.cg.am/archives/3099   //getBoundingClientRect
//
// http://www.cnblogs.com/dingyingsi/archive/2013/09/24/3337813.html   scrollHeight
