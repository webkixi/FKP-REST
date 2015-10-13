var libs = require('libs/libs')
var router = require('libs/router').router
var route = require('libs/router').route

route({
    'index': index
});

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

require.ensure([], function() {
    var url = libs.urlparse(location.href)
    if(!url.hash){
        index()
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
          window.location.href="/" + check_line;
        })
      })
    });
}
