var libs = require('libs/libs')
var oquery = libs.queryString(location.href);
oquery = Object.keys(oquery)[0]

$('li.category a').click(function(e){
    e.stopPropagation()
})

$('li.category').find('h4').click(function(){
    $(this).find('.iconfont').toggleClass('icon-xiala').toggleClass('icon-sanjiao')
    $(this).next('ul').toggle()
})

$('li[data-pos] a').click(function(e){
  e.preventDefault();
  $('li[data-pos]').removeClass('selected')
  $(this).parent().addClass('selected')

  var href = this.href;
  var query = libs.queryString(this.href);
  require('libs/api').req('/docs',{md: query.md})
  .then(function(data){
    $('.demo').hide();
    $('#md-content').show();
    if (data.mdcontent.css){
      window.location.href = href;
    }
    else {
      $('#md-content-title').html(data.mdcontent.title);
      $('#md-content-author').html(data.mdcontent.author);
      $('#md-content-cnt').html(data.mdcontent.cnt);
      $('#md-content-menu').html(data.mdcontent.mdmenu);
      setTimeout(function(){
        $("pre").addClass("prettyprint");
        prettyPrint();
      }, 300)
      history.replaceState(null, null, "/docs?"+oquery);
    }
  })
})

var query = libs.queryString(location.search);
if (query.pos){
  $('li[data-pos='+query.pos+']').addClass('selected')
}



//英文目录映射中文
var cl_json = require('./catalog.json')  //目录英文名，中文名映射json文件
var tmp = Object.keys(cl_json)
$('.catalog').each(function(i, item){
    var title = $(item).html()
    if (_.indexOf(tmp, title)>-1){
        $(item).html(cl_json[title])
    }
})
