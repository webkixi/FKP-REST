var libs = require('libs/libs')

$('li.category a').click(function(e){
    e.stopPropagation()
})

$('li.category').find('h4').click(function(){
    $(this).find('.iconfont').toggleClass('icon-xiala').toggleClass('icon-sanjiao')
    $(this).next('ul').toggle()
})

$('.showbooks li .img').hover(function(){
  $(this).toggleClass('active')
})

$('li[data-pos] a').click(function(e){
  e.preventDefault();
  $('li[data-pos]').removeClass('selected')
  $(this).parent().addClass('selected')

  var href = this.href;
  var query = libs.queryString(this.href);
  require('libs/api').req('/demoindex',{md: query.md})
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
      history.replaceState(null, null, "/");
    }

  })
})

var query = libs.queryString(location.search);
if (query.pos){
  $('.demo').hide();
  $('#md-content').show();
  $('li[data-pos='+query.pos+']').addClass('selected')
}


function mkQrCode(elem,content){
    if(!elem) return;
    if(!content) return;
    console.log(content);
    var qrcode = new QRCode(elem, {
       width : 80,//设置宽高
       height : 80
    });
    qrcode.makeCode(content);
}


//二维码生成
$('.qrcode').each(function(){
     $(this).html("");
    var cnt = $(this).attr('value');
    mkQrCode(this, cnt);
})

// $('.qrcode').on('click', function(){
//     if($(this).find('canvas').length){
//         $(this).html('二维码');
//     }else{
//         var cnt = $(this).attr('value');
//         mkQrCode(this, cnt);
//     }
// })


//英文目录映射中文
var cl_json = require('./catalog.json')  //目录英文名，中文名映射json文件
var tmp = Object.keys(cl_json)
$('.catalog').each(function(i, item){
    var title = $(item).html()
    if (_.indexOf(tmp, title)>-1){
        $(item).html(cl_json[title])
    }
})
