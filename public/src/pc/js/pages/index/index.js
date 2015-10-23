var libs = require('libs/libs')
var wx = require('../_common/weixin')
var router = require('libs/router').router
var route = require('libs/router').route

route({
    'index': index
});

require.ensure([], function() {
    var url = libs.urlparse(location.href)
    if(!url.hash){
        router('index')
    }else{
        var hash = url.hash
        router(hash)
    }
})


function index(){
    require('./_component/_index')('container-box', function(){
      $(".com_index li").each(function(i,item){
        $(item).click(function(){
          var _this = $(item);
          var check_line = _this.attr("data-check");
            // window.location.href="/" + check_line;
          if(check_line == "car_fixed"){
            window.location.href="http://www.che300.com/car_front";
          }else{
            window.location.href="/" + check_line;
          }
        })
      })
    });
}
